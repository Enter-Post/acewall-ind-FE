import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatBox = ({ discussionId }) => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(GlobalContext);
  const [sendingComment, setSendingComment] = useState("");
  const [sendingLoading, setSendingLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch comments (paginated)
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
      console.error("Error fetching comments:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchComments();
  }, [discussionId]);

  const fetchReplies = async (pageNum = 1, append = false) => {
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
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  // Load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchComments(nextPage, true);
    setPage(nextPage);
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

  return (
    <section className="w-full min-h-full p-6 bg-gray-100 rounded-lg shadow-lg">
      <div>
        <p className="text-xl font-bold mb-4">Comments</p>
      </div>

      <section className="h-[400px] overflow-y-scroll">
        {comments?.length === 0 ? (
          <p className="text-center text-gray-600">No comments yet</p>
        ) : (
          comments.map((comment) => (
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
                {/* <p className="text-xs text-gray-500 mt-2 ml-1 cursor-pointer">
                  reply
                </p>
                <p className="text-sm text-blue-700 ml-1 cursor-pointer">
                  See replies
                </p> */}
              </div>
            </div>
          ))
        )}

        {hasMore && comments.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="text-blue-500 hover:underline mt-2 text-xs"
          >
            Load more comments
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
