import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CommentSection = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getCourseComments = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/comment/${id}`)
        .then((res) => {
          console.log(res);
          setComments(res.data.comments);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getCourseComments();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    axiosInstance
      .post(`/comment/sendComment/${id}`, { text: comment })
      .then((response) => {
        const newComment = response.data.comment;
        setComments((prev) => [...prev, newComment]);
        toast.success(response.data.message);

        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <div className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <div key={comment?._id} className="border-b pb-6">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={comment?.createdby?.profileImg || "/placeholder.svg"}
                    alt={comment?.createdby?.firstName}
                  />
                  <AvatarFallback>
                    {comment?.createdby?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {comment?.createdby?.firstName} {comment?.user?.lastName}
                    </p>
                    <span className="text-xs text-gray-500">
                      {comment?.updatedAt}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment?.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
