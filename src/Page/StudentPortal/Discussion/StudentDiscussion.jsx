import { CreateDiscussionDialog } from "@/CustomComponent/createDiscussionModal";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentDiscussion = () => {
  const [discussion, setDiscussion] = useState([]);
  const [loading, setloading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchDiscussions = async () => {
      setloading(true);
      await axiosInstance
        .get("/discussion/")
        .then((res) => {
          setloading(false);
          setDiscussion(res.data.discussions);
        })
        .catch((err) => {
          setloading(false);
        });
    };
    fetchDiscussions();
  }, [refresh]);

  return (
    <div>
      <div className="flex flex-col pb-2 gap-5">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Discussions
        </p>
      </div>
      <div className="flex justify-end pb-5">
        <CreateDiscussionDialog setRefresh={setRefresh} refresh={refresh} />
      </div>
      <div className="w-full flex justify-center">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : discussion.length === 0 ? (
          <p className="text-center">No Discussions</p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {!loading &&
          discussion.map((item) => (
            <Link
              key={item._id}
              to={`/teacher/discussions/${item._id}`}
              className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 p-4 bg-white group"
            >
              {item?.course?.thumbnail?.url && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={item.course.thumbnail.url}
                    alt={item.topic || "Course Thumbnail"}
                    className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
                  />
                </div>
              )}

              <div className="flex justify-between items-center mt-3">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {item?.topic}
                </h2>
                <span className="text-xs text-gray-500">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-indigo-700 font-medium">
                {item?.course?.courseTitle}
              </p>

              <p className="text-sm text-gray-700 line-clamp-2">
                {item?.description}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default StudentDiscussion;
