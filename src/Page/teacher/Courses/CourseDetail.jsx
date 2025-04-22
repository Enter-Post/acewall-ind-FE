"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Play } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Assuming you're using shadcn/ui

import {
  ChevronDown,
  FileText,
  Loader,
  MessageSquare,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";

export default function TeacherCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [openChapter, setOpenChapter] = useState(null); // Default to no chapter open



  console.log(id);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axiosInstance.post(`course/get/${id}`);
        setCourse(response.data.course); // Set the course data in state
        console.log("response>>>>>>>>>", response);
        console.log("Course detail:", response.data.course);
      } catch (error) {
        console.error("Error fetching course detail:", error);
      }
    };
    fetchCourseDetail();
  }, [id]); // Added id as a dependency to refetch when the id changes

  if (!course)
    return (
      <div>
        <section className="flex justify-center items-center h-full w-full">
          <Loader size={48} className={"animate-spin"} />
        </section>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-8">My Courses</h1>

      <div className="space-y-8">
        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={
                course.basics.thumbnail ||
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80"
              }
              alt="Course thumbnail"
              className="w-full  rounded-md object-cover  aspect-video"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Uploaded: {course.createdAt?.split("T")[0] || "N/A"}
                </span>
                <span>
                  Last Updated: {course.updatedAt?.split("T")[0] || "N/A"}
                </span>
              </div>
              <h2 className="text-2xl uppercase font-semibold">
                {course.basics.courseTitle || "Course Title"}
              </h2>
              <p className="text-muted-foreground">
                {course.basics.courseDescription ||
                  "Course description goes here..."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <div className="text-xl uppercase text-green-500 font-bold">
                  ${course.basics.price || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Course Price
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <StatCard
            icon={<Play className="h-5 w-5  text-orange-500" />}
            value={course.basics.language?.toUpperCase()}
            label="Language"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<Play className="h-5 w-5 text-orange-500" />}
            value={course.basics.category.title?.toUpperCase()}
            label="Category"
            bgColor="bg-orange-50"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div onClick={() => setOpen(true)}>
                <StatCard
                  icon={<Play className="h-5 w-5 text-orange-500" />}
                  value={course.chapters?.length || 0}
                  label="Chapters"
                  bgColor="bg-orange-50"
                />
              </div>
            </DialogTrigger>

            <DialogContent>

              <DialogHeader>
                <DialogTitle>Course Chapters & Lessons</DialogTitle>
                <DialogDescription>
                  This course has <strong>{course.chapters.length}</strong> chapters and{" "}
                  <strong>
                    {course.chapters.reduce((total, chapter) => total + (chapter.lessons?.length || 0), 0)}
                  </strong>{" "}
                  lessons.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {course.chapters.map((chapter, index) => (
                  <div key={index} className="border p-4 rounded-md bg-t-50 shadow-sm">
                    <div className="mb-2   ">
                      <button
                        onClick={() => setOpenChapter(index)}
                        className="w-full text-left font-semibold text-md flex justify-between items-center"
                      >
                        <span className="w-80">Chapter {index + 1}: {chapter.title}</span>
                        <span className="text-xs">{openChapter === index ? "Hide" : "Show"} Lessons</span>
                      </button>
                    </div>

                    {openChapter === index && (
                      <div className="space-y-4 mt-2 ">
                        {chapter.lessons && chapter.lessons.length > 0 ? (
                          chapter.lessons.map((lesson, i) => (
                            <div key={i} className="border-t border-gray-200 pt-2">
                              <div className="font-medium text-sm">
                                Lesson {i + 1}: {lesson.title}
                              </div>
                              <p className="text-sm text-gray-600">
                                {lesson.description || "No description available."}
                              </p>

                              {/* Show assignments if any */}
                              {lesson.assignments && lesson.assignments.length > 0 ? (
                                <div className="mt-2 space-y-2">
                                  <p className="font-semibold text-sm">Assignments:</p>
                                  {lesson.assignments.map((assignment, aIndex) => (
                                    <div key={aIndex} className="bg-gray-100 p-3 rounded-md">
                                      <p className="font-semibold">{assignment.title}</p>
                                      <p className="text-sm text-gray-700">{assignment.details || "No details provided."}</p>
                                      <p className="text-xs text-muted-foreground">{assignment.dueDate || "No due date"}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="italic text-sm text-muted-foreground">No assignments for this lesson.</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm italic text-muted-foreground">No lessons in this chapter.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </DialogContent>
          </Dialog>

          <StatCard
            icon={<Play className="h-5 w-5 text-orange-500" />}
            value={course.chapters.reduce((total, chapter) => total + chapter.lessons?.length, 0) || 0}
            label="Lessons"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-rose-500" />}
            value={course.student.length}
            label="Students Enrolled"
            bgColor="bg-rose-50"
          />
        </div>

        {/* Rating */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Overall Course Rating</h3>
          <div className="bg-green-50 p-8 rounded-lg flex flex-col items-center">
            {course.rating && course.rating.length > 0 ? (
              <>
                <div className="text-5xl font-semibold mb-4">
                  {course.averageRating || "4.8"}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 ${index + 1 <= Math.floor(course.averageRating || 5)
                        ? "text-orange-400"
                        : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Course Rating
                </div>
              </>
            ) : (
              <div className="text-lg font-medium text-gray-500">
                No ratings available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, bgColor }) {
  return (
    <Card className={`border-0 shadow-sm ${bgColor}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 rounded-md bg-white">{icon}</div>
        <div>
          <div className="font-semibold text-lg">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
