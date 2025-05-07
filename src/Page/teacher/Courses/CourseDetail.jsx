"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader, Play, Users } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { CheckCircle } from "lucide-react";
import CommentSection from "@/CustomComponent/Student/CommentSection";

export default function TeacherCourseDetails() {
  const { id } = useParams() || { id: "68115952b4991f70a28c486f" }; // Default ID or from URL
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [openChapter, setOpenChapter] = useState(null); // Default to no chapter open

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [openLessons, setOpenLessons] = useState({});

  const toggleLesson = (lessonId) => {
    setOpenLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleDeleteCourse = async () => {

    try {
      await axiosInstance.delete(`/course/delete/${id}`);
      setConfirmOpen(false);
      setSuccessOpen(true);

      // Wait 2 seconds before redirecting
      setTimeout(() => {
        setSuccessOpen(false);
        window.location.href = "/teacher/courses";
      }, 2000);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      await axiosInstance
        .get(`course/get/${id}`)
        .then((res) => {
          setCourse(res.data.course);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // Set the course data in state
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
              <div className="flex mt-10 justify-end space-x-2">
                {/* Delete Confirmation Modal */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-150"
                      onClick={() => setConfirmOpen(true)}
                    >
                      Delete Course
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        This will permanently delete the course and all related data.
                        Are you sure?
                      </p>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex flex-col-reverse justify-end gap-2">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={handleDeleteCourse}
                      >
                        Yes, Delete
                      </Button>
                      <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* ✅ Success Confirmation Modal */}
                <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                  <DialogContent className="flex flex-col items-center justify-center text-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <h3 className="text-lg font-semibold mt-2">
                      Course deleted successfully!
                    </h3>
                  </DialogContent>
                </Dialog>
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


          <StatCard
            icon={<Play className="h-5 w-5 text-orange-500" />}
            value={
              course.chapters.reduce(
                (total, chapter) => total + chapter.lessons?.length,
                0
              ) || 0
            }
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


        {/* chapter detail */}




        <Accordion type="multiple" className="w-full space-y-4">
          {course?.chapters.map((chapter, chapterIndex) => (
            <AccordionItem
              key={chapter._id}
              value={`chapter-${chapterIndex}`}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-semibold px-6 py-3  hover:bg-gray-50 transition-all">
                Chapter {chapterIndex + 1}: {chapter.title}
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6 space-y-4 bg-white">
                <p className="text-sm text-gray-700 leading-relaxed">{chapter.description}</p>

                {/* Chapter Assessments */}
                {Array.isArray(chapter.assessment) && chapter.assessment.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-semibold text-base text-gray-900">Chapter Assessment</p>
                    {chapter.assessment.map((assess, aIdx) => (
                      <div key={aIdx} className="pl-4 border-l-2 border-orange-400">
                        <ul className="list-disc pl-4 mb-3">
                          <li>
                            <p className="text-base font-medium mb-3 text-gray-700">{assess.title}</p>
                            <p className="text-sm text-gray-700">{assess.description}</p>
                          </li>
                        </ul>
                        {assess.pdfFiles?.map((pdf, i) => (
                          <a
                            key={i}
                            href={pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline block"
                          >
                            View Assessment PDF {i + 1}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Lessons */}
                {chapter.lessons?.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-semibold text-base text-gray-900">Lessons</p>
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson._id}
                        className="border rounded-md p-4 bg-gray-50 shadow-sm"
                      >
                        <div
                          onClick={() => toggleLesson(lesson._id)}
                          className="flex justify-between items-center cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            Lesson {lessonIndex + 1}: {lesson.title}
                          </p>
                          <span className="text-blue-500 text-sm">
                            {openLessons[lesson._id] ? "Hide" : "Show"} Details
                          </span>
                        </div>

                        {openLessons[lesson._id] && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              {lesson.description || "No description available."}
                            </p>

                            {/* PDFs */}
                            {lesson.pdfFiles?.map((pdf, i) => (
                              <a
                                key={i}
                                href={pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm hover:underline block"
                              >
                                View Lesson PDF {i + 1}
                              </a>
                            ))}

                            {lesson.youtubeLinks && (
                              <a
                                href={lesson.youtubeLinks}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm hover:underline block"
                              >
                                Watch on YouTube
                              </a>
                            )}

                            {lesson.otherLink && (
                              <a
                                href={lesson.otherLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm hover:underline block"
                              >
                                Additional Resource
                              </a>
                            )}

                            {/* Lesson Assessment */}
                            {Array.isArray(lesson.lessonAssessment) &&
                              lesson.lessonAssessment.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  <p className="font-semibold text-sm">Lesson Assessment:</p>
                                  {lesson.lessonAssessment.map((assess, idx) => (
                                    <div key={idx} className="pl-4 border-l-2 border-green-400">
                                      <p className="text-sm font-medium text-gray-700 mb-3 ">
                                        {assess.title}
                                      </p>
                                      <p className="text-sm text-gray-700 mb-1">
                                        {assess.description}
                                      </p>
                                      {assess.pdfFiles?.map((pdf, j) => (
                                        <a
                                          key={j}
                                          href={pdf}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm hover:underline block"
                                        >
                                          View Assessment PDF {j + 1}
                                        </a>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>






        {/* Rating */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Overall Course Rating</h3>
          <div className="bg-green-50 p-8 rounded-lg flex flex-col items-center">
            {course.rating && course.rating.length > 0 ? (
              <>
                <div className="text-5xl font-semibold mb-4">
                  {/* Format the averageRating to 1 decimal place */}
                  {(course.averageRating || 4.8).toFixed(1)}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star, index) => {
                    const fullStar = index + 1 <= Math.floor(course.averageRating || 5);
                    const halfStar =
                      index + 1 === Math.floor(course.averageRating || 5) + 0.5;
                    return (
                      <svg
                        key={index}
                        className={`w-6 h-6 ${fullStar
                          ? "text-orange-400"
                          : halfStar
                            ? "text-yellow-500"
                            : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d={
                            halfStar
                              ? "M10 2L8.618 6.268L4 7.618L7.09 10.118L6 14L10 11.5L14 14L12.91 10.118L16"
                              : "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          }
                        />
                      </svg>
                    );
                  })}
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
      <CommentSection id={id} />



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
