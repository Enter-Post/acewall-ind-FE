import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Files, Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDiscussionChat = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    const fetchdiscussion = async () => {
      setLoading(true);
      await axiosInstance
        .get(`discussion/${id}`)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setDiscussion(res.data.discussion);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchdiscussion();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <section className="w-full p-6 bg-white rounded-xl shadow-md">
        <div className="py-4 mb-6 pl-6 rounded-lg bg-green-600 text-white">
          <p className="text-2xl font-bold">Discussion</p>
        </div>

        <p className="text-2xl font-semibold mb-2">{discussion.topic}</p>
        <p className="text-lg text-gray-600 mb-6">{discussion.description}</p>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {discussion?.files?.map((file, index) => (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50 hover:bg-white"
              key={index}
            >
              {file.type === "application/pdf" ? (
                <>
                  <Files className="h-6 w-6 text-red-500" />
                  <span className="text-sm font-medium text-blue-700 truncate">
                    {file.filename}
                  </span>
                </>
              ) : (
                <>
                  <img
                    src={file.url}
                    alt={`File ${index}`}
                    className="h-10 w-10 object-cover rounded-md"
                  />
                  <span className="text-sm font-medium text-blue-700 truncate">
                    {file.filename}
                  </span>
                </>
              )}
            </a>
          ))}
        </section>
      </section>
      <section className="w-full min-h-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="">
          <p className="text-xl font-bold">Comments</p>
        </div>
        <section>
          {discussion?.comments?.length === 0 && (
            <p className="text-center text-gray-600">No comments yet</p>
          )}
          {discussion?.comments?.map((comment) => (
            <p>{comment.text}</p>
          ))}
        </section>
        <div className="flex items-center gap-2 mt-10">
          <img
            src={user?.profileImg.url}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <div className="flex items-center justify-center gap-2 rounded-full bg-green-600 text-white p-2">
            <Send />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDiscussionChat;
