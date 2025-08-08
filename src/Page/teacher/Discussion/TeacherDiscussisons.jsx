import { CreateDiscussionDialog } from "@/CustomComponent/createDiscussionModal";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const TeacherDiscussion = () => {
  const [discussion, setDiscussion] = useState([]);
  const [loading, setloading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("course");

  useEffect(() => {
    const fetchDiscussions = async () => {
      setloading(true);
      try {
        const res = await axiosInstance.get("/discussion/");
        setDiscussion(res.data.discussions);
        console.log("public discussions", publicDiscussions);
      } catch (err) {
        // handle error if needed
      } finally {
        setloading(false);
      }
    };
    fetchDiscussions();
  }, [refresh]);

  // Separate discussions by type
  const publicDiscussions = discussion.filter((d) => d.type === "public");
  const courseDiscussions = discussion.filter((d) => d.type !== "public");

  return (
    <div>
      <div className="flex flex-col pb-2 gap-5">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Discussions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <section className="flex justify-between">
          <TabsList>
            <TabsTrigger
              value="course"
              className={cn(
                "px-4 py-2 rounded-lg",
                activeTab === "course" ? "bg-green-600 text-black" : ""
              )}
            >
              Course Discussions
            </TabsTrigger>
            <TabsTrigger
              value="public"
              className={cn(
                "px-4 py-2 rounded-lg",
                activeTab === "public" ? "bg-green-600 text-black" : ""
              )}
            >
              Public Discussions
            </TabsTrigger>
          </TabsList>
          <div className="flex justify-end pb-5">
            <CreateDiscussionDialog setRefresh={setRefresh} refresh={refresh} />
          </div>
        </section>

        <TabsContent value="course" className="mt-10">
          <div className="w-full flex justify-center">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : courseDiscussions.length === 0 ? (
              <p className="text-center">No Course Discussions</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {!loading &&
              courseDiscussions.map((item) => (
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
                  <div
                    className={`border w-fit px-2 py-1 rounded-full border-gray-200 m-2 bg-indigo-600`}
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
        </TabsContent>

        <TabsContent value="public">
          <div className="w-full flex justify-center">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : publicDiscussions.length === 0 ? (
              <p className="text-center">No Public Discussions</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {!loading &&
              publicDiscussions.map((item) => (
                <Link
                  key={item._id}
                  to={`/teacher/discussions/${item._id}`}
                  className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 p-4 bg-white group"
                >
                  {/* Show Files First */}
                  {item.files.map((file) =>
                    file.type.startsWith("image/") ? (
                      <img
                        key={file._id}
                        src={file.url}
                        alt={file.filename}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    ) : file.type === "application/pdf" ? (
                      <div
                        key={file._id}
                        className="w-full h-40 mb-2 rounded-lg overflow-hidden border border-gray-200"
                      >
                        <iframe
                          src={file.url}
                          title={file.filename}
                          className="w-full h-full"
                        />
                      </div>
                    ) : null
                  )}

                  {/* Optional: Course Thumbnail if available */}
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
                    className={`border w-fit px-2 py-1 rounded-full border-gray-200 m-2 bg-green-600`}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDiscussion;
