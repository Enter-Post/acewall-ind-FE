import React from "react";
import { Link } from "react-router-dom";

const DiscussionTabContent = ({ discussions, loading }) => {
  return (
    <div>
      <div className="w-full flex justify-center">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : discussions.length === 0 ? (
          <p className="text-center">No Discussions</p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {!loading &&
          discussions.map((item) => (
            <Link
              key={item._id}
              to={`/student/discussions/${item._id}`}
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
              <div
                className={`border w-fit px-2 py-1 rounded-full border-gray-200 m-2 ${
                  item?.type === "public" ? "bg-green-600" : "bg-indigo-600"
                }`}
              >
                <p className={`text-xs text-white`}>{item?.type}</p>
              </div>

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

export default DiscussionTabContent;
