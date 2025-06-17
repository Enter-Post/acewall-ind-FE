import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Loader, Send, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ChatBox = ({ discussionId }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const { user } = useContext(GlobalContext);
  const [sendingComment, setSendingComment] = useState("");
  const [sendingReply, setSendingReply] = useState("");
  const [sendingLoading, setSendingLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [replyPage, setreplyPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRepleying, setIsReplying] = useState({ status: "false", id: null });
  const [hasMoreReplies, setHasMoreReplies] = useState({
    id: null,
    status: false,
  });
  const [refreshReplies, setRefreshReplies] = useState(false);

  console.log(replies, "replies");

  const fetchComments = async (pageNum = 1, append = false) => {
    try {
      const res = await axiosInstance.get(
        `discussionComment/get/${discussionId}?page=${pageNum}&limit=5`
      );
      const data = res.data;

      setHasMore(data.discussionComments.length === 5);

      setComments((prev) =>
        append ? [...prev, ...data.discussionComments] : data.discussionComments
      );

      if (!append) setPage(1);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchComments();
  }, [discussionId]);

  const fetchReplies = async (pageNum = 1, append = false, commentId) => {
    try {
      const res = await axiosInstance.get(
        `replyDiscussion/get/${commentId}?page=${pageNum}&limit=5`
      );
      const data = res.data;

      setHasMoreReplies((prev) => ({
        ...prev,
        [commentId]: data.replies.length === 5,
      }));

      setReplies((prev) => ({
        ...prev,
        [commentId]:
          append && pageNum > 1
            ? [
                ...(prev[commentId] || []),
                ...data.replies.filter(
                  (reply) =>
                    !(prev[commentId] || []).some((r) => r._id === reply._id)
                ),
              ]
            : data.replies,
      }));

      if (!append) setreplyPage(1);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  // Load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchComments(nextPage, true);
    setPage(nextPage);
  };
  const handleLoadReplyMore = (commentId) => {
    const nextPage = replyPage + 1;
    fetchReplies(nextPage, true, commentId);
    setreplyPage(nextPage);
  };

  // Send new comment
  const sendComment = async () => {
    if (!sendingComment.trim()) return;

    try {
      setSendingLoading(true);
      await axiosInstance.post(
        `discussionComment/sendComment/${discussionId}`,
        {
          text: sendingComment,
        }
      );
      setSendingComment("");
      fetchComments(); // Refresh comments to show new one
    } catch (err) {
      console.error("Error sending comment:", err);
    } finally {
      setSendingLoading(false);
    }
  };

  const sendReply = async (commentId) => {
    setRefreshReplies(true);
    await axiosInstance
      .post(`replyDiscussion/send/${commentId}`, {
        text: sendingReply,
      })
      .then((res) => {
        setRefreshReplies(false);
        console.log(res);
        fetchReplies(1, true, commentId);
      })
      .catch((err) => {
        setRefreshReplies(false);
        console.log(err);
      });
    setSendingReply("");
  };

  return (
    <section className="w-full min-h-full p-6 bg-gray-100 rounded-lg shadow-lg">
      <div>
        <p className="text-xl font-bold mb-4">Comments</p>
      </div>

      <section className="h-[400px] overflow-y-scroll">
        {comments?.length === 0 ? (
          <p className="text-center text-gray-600">No comments yet</p>
        ) : (
          comments?.map((comment) => (
            <div key={comment._id} className="flex items-start gap-2 mb-4">
              <Avatar>
                <AvatarImage src={comment?.createdby?.profileImg?.url} alt="" />
                <AvatarFallback>
                  {comment?.createdby?.firstName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="bg-white px-4 py-2 rounded-lg shadow text-sm w-full">
                  <p className="font-medium">
                    {comment?.createdby?.firstName}{" "}
                    {comment?.createdby?.lastName}
                  </p>
                  <p>{comment?.text}</p>
                </div>
                <p
                  onClick={() => {
                    setSendingReply("");
                    setIsReplying({ status: true, id: comment._id });
                  }}
                  className="text-xs text-gray-500 mt-2 ml-1 cursor-pointer"
                >
                  reply
                </p>
                {isRepleying.status && isRepleying.id === comment._id && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar>
                      <AvatarImage src={user?.profileImg?.url} alt="" />
                      <AvatarFallback>
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={sendingReply}
                      onChange={(e) => setSendingReply(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <Button
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => sendReply(comment._id)}
                    >
                      <Send className="text-green-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsReplying({ status: false, id: null })}
                      className="cursor-pointer"
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  </div>
                )}

                <p
                  className="text-sm text-blue-700 ml-1 cursor-pointer"
                  onClick={() => fetchReplies(1, false, comment._id)}
                >
                  See replies
                </p>

                {(replies[comment._id] || []).map((reply) => (
                  <div key={reply._id} className="flex items-start gap-2 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={reply?.createdby?.profileImg?.url}
                        alt=""
                      />
                      <AvatarFallback>
                        {reply?.createdby?.firstName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full">
                      <div className="bg-white px-4 py-2 rounded-lg shadow text-sm w-full">
                        <p className="font-medium">
                          {reply?.createdby?.firstName}{" "}
                          {reply?.createdby?.lastName}
                        </p>
                        <p>{reply?.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {hasMoreReplies && hasMoreReplies[comment._id] && (
                  <p
                    className="text-xs text-gray-500 mt-2 ml-1 cursor-pointer"
                    onClick={() => handleLoadReplyMore(comment._id)}
                  >
                    more replies
                  </p>
                )}
                {replies[comment._id]?.length > 0 && (
                  <p
                    className="text-sm text-blue-700 ml-1 cursor-pointer"
                    onClick={() => {
                      setReplies("");
                      setHasMoreReplies({});
                    }}
                  >
                    Hide replies
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        {hasMore && comments?.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="text-blue-500 hover:underline mt-2 text-xs"
          >
            more comments
          </button>
        )}
      </section>

      <div className="flex items-center gap-2 mt-10">
        <Avatar>
          <AvatarImage src={user?.profileImg?.url} alt="" />
          <AvatarFallback>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={sendingComment}
          onChange={(e) => setSendingComment(e.target.value)}
          placeholder="Write a comment..."
          disabled={sendingLoading}
        />
        <button
          onClick={sendComment}
          className="flex items-center justify-center gap-2 rounded-full bg-green-600 text-white p-2"
          disabled={sendingLoading}
        >
          <Send size={16} />
        </button>
      </div>
    </section>
  );
};

export default ChatBox;
