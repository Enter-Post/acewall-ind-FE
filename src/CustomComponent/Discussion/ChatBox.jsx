import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Send, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const ChatBox = ({ discussionId }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyCounts, setReplyCounts] = useState({});
  const { user } = useContext(GlobalContext);
  const [sendingComment, setSendingComment] = useState("");
  const [sendingReply, setSendingReply] = useState("");
  const [sendingLoading, setSendingLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [replyPage, setreplyPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRepleying, setIsReplying] = useState({ status: "false", id: null });
  const [hasMoreReplies, setHasMoreReplies] = useState({});
  const [refreshReplies, setRefreshReplies] = useState(false);

  const formatDate = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const fetchReplyCount = async (commentId) => {
    try {
      const res = await axiosInstance.get(`/replyDiscussion/replycount/${commentId}`);
      setReplyCounts((prev) => ({
        ...prev,
        [commentId]: res.data.replyCount,
      }));
    } catch (error) {
      console.error("Error fetching reply count:", error);
    }
  };

  const fetchComments = async (pageNum = 1, append = false) => {
    try {
      const res = await axiosInstance.get(
        `discussionComment/get/${discussionId}?page=${pageNum}&limit=5`
      );
      const data = res.data;

      setHasMore(data.discussionComments.length === 5);

      const updatedComments = append
        ? [...comments, ...data.discussionComments]
        : data.discussionComments;

      setComments(updatedComments);

      data.discussionComments.forEach((comment) => {
        fetchReplyCount(comment._id);
      });

      if (!append) setPage(1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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
      fetchComments();
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
        fetchReplies(1, true, commentId);
        fetchReplyCount(commentId);
      })
      .catch((err) => {
        setRefreshReplies(false);
        console.log(err);
      });
    setSendingReply("");
  };

  return (
    <section className="w-full min-h-full p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">Comments</h2>

      <div className="h-[400px] overflow-y-auto space-y-6 pr-2">
        {comments?.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          comments?.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={comment?.createdby?.profileImg?.url} alt="" />
                <AvatarFallback>
                  {comment?.createdby?.firstName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className=" bg-gray-50 px-4 py-2 rounded-lg shadow-sm text-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {comment?.createdby?.firstName}{" "}
                      {comment?.createdby?.lastName}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>

                  </div>
                  <p className="mt-1">{comment?.text}</p>
                </div>

                <div className="text-xs mt-1 flex gap-4 text-blue-600 mb-4 font-medium cursor-pointer">
                  <span
                    onClick={() => {
                      setSendingReply("");
                      setIsReplying({ status: true, id: comment._id });
                    }}
                  >
                    Reply
                  </span>

                  <span onClick={() => fetchReplies(1, false, comment._id)}>
                    {replyCounts[comment._id] > 0
                      ? `Show replies (${replyCounts[comment._id]})`
                      : "No replies"}
                  </span>
                </div>

                {isRepleying.status && isRepleying.id === comment._id && (
                  <div className="flex items-center gap-2 mt-3">
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
                      className="text-green-600"
                      onClick={() => sendReply(comment._id)}
                    >
                      <Send size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => setIsReplying({ status: false, id: null })}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                )}

                {(replies[comment._id] || []).map((reply) => (
                  <div key={reply._id} className="flex items-start gap-2 mb-4  ml-10 w-[90%]">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={reply?.createdby?.profileImg?.url} alt="" />
                      <AvatarFallback>
                        {reply?.createdby?.firstName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col  w-50">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm max-w-[700px]">
                        <p className="font-medium text-xs">
                          {reply?.createdby?.firstName} {reply?.createdby?.lastName}
                        </p>
                        <p className="text-sm">{reply?.text}</p>
                      </div>
                    </div>
                  </div>

                ))}

                {hasMoreReplies[comment._id] && (
                  <p
                    className="text-xs text-blue-600 ml-6 mt-1 cursor-pointer"
                    onClick={() => handleLoadReplyMore(comment._id)}
                  >
                    Load more replies
                  </p>
                )}

                {replies[comment._id]?.length > 0 && (
                  <p
                    className="text-xs text-gray-600 ml-6 mt-1 cursor-pointer"
                    onClick={() => {
                      setReplies((prev) => ({
                        ...prev,
                        [comment._id]: [],
                      }));
                      setHasMoreReplies((prev) => ({
                        ...prev,
                        [comment._id]: false,
                      }));
                    }}
                  >
                    Hide replies
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        {hasMore && comments.length > 0 && (
          <p
            onClick={handleLoadMore}
            className="text-xs text-blue-600 text-center mt-3 cursor-pointer"
          >
            Load more comments
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-6 pt-4 border-t">
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