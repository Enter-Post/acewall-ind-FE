"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Star,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import LoadingLoader from "@/CustomComponent/LoadingLoader";

export default function ChapterDetail() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [instructor, setInstructor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/course/get/chapter/${id}`)
        .then((res) => {
          setChapter(res.data.chapter);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCourseDetails();
  }, [id]);

  function getYouTubeVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingLoader />
      </div>
    );
  }

  if (!chapter) {
    return <div className="p-6 text-center">Chapter not found.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left side - Video and Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 border-b flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{courseTitle}</h1>
            <p className="text-sm text-gray-500">Chapter: {chapter.title}</p>
          </div>
        </div>

        {activeLesson && (
          <div className="mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold p-4">
                Lesson: {activeLesson.title}
              </h3>

              {/* Video Player */}
              {activeLesson.youtubeLinks ? (
                <div
                  className="relative w-full h-0"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      activeLesson.youtubeLinks
                    )}`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="p-4 bg-gray-100 text-center rounded-md mx-4">
                  <p>No YouTube link available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full p-5">
          <TabsList className="grid grid-cols-3 bg-transparent border-b border-gray-200 w-full text-green-600">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
            >
              Attached Files
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
            >
              Instructor
            </TabsTrigger>
          </TabsList>

          {/* Description */}
          <TabsContent value="description" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold">{chapter.title}</h3>
              <p className="text-gray-600 mt-4">{chapter.description}</p>

              {activeLesson && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-medium">
                    Current Lesson: {activeLesson.title}
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {activeLesson.description}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Files */}
          <TabsContent value="files" className="p-6">
            <div className="space-y-4">
              {activeLesson &&
              activeLesson.pdfFiles &&
              activeLesson.pdfFiles.length > 0 ? (
                activeLesson.pdfFiles.map((pdf, index) => (
                  <a
                    key={index}
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-blue-600">PDF {index + 1}</span>
                  </a>
                ))
              ) : (
                <div className="text-sm text-gray-500">
                  No PDF files available for this lesson
                </div>
              )}

              {activeLesson &&
                activeLesson.lessonAssessment &&
                activeLesson.lessonAssessment.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3">
                      Lesson Assessment Materials
                    </h3>
                    {activeLesson.lessonAssessment.map((assessment, i) => (
                      <div key={i} className="space-y-3">
                        <h4 className="font-medium text-sm">
                          {assessment.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {assessment.description}
                        </p>

                        {assessment.pdfFiles &&
                          assessment.pdfFiles.length > 0 && (
                            <div className="space-y-2 pl-2">
                              {assessment.pdfFiles.map((pdf, pdfIndex) => (
                                <a
                                  key={pdfIndex}
                                  href={pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                  <span className="text-blue-600 text-sm">
                                    Assessment PDF {pdfIndex + 1}
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

              {chapter.assessment && chapter.assessment.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Chapter Assessment</h3>
                  {chapter.assessment.map((assessment, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-medium text-sm">
                        {assessment.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {assessment.description}
                      </p>

                      {assessment.pdfFiles &&
                        assessment.pdfFiles.length > 0 && (
                          <div className="space-y-2 pl-2">
                            {assessment.pdfFiles.map((pdf, pdfIndex) => (
                              <a
                                key={pdfIndex}
                                href={pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                              >
                                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                <span className="text-blue-600 text-sm">
                                  Chapter Assessment PDF {pdfIndex + 1}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Instructor */}
          <TabsContent value="instructor" className="p-6">
            {instructor ? (
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={instructor.profileImg || "/placeholder.svg"}
                    alt={`${instructor.firstName} ${instructor.lastName}`}
                  />
                  <AvatarFallback>
                    {instructor.firstName?.charAt(0)}
                    {instructor.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">
                    {instructor.firstName} {instructor.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{instructor.pronouns}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm font-medium">Instructor</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <PlayCircle size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {instructor.courses?.length || 0} Courses
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">
                    Email: {instructor.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Instructor information not available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right side - Course Contents */}
      <div className="w-full lg:w-80 border-l bg-gray-50 overflow-auto max-h-screen">
        <div className="p-4 border-b">
          <h2 className="font-medium">Chapter Content</h2>
        </div>
        <div className="max-h-[calc(100vh-64px)]">
          <div className="border-b">
            <button
              className="flex items-center justify-between w-full p-4 text-left"
              onClick={() => toggleSection(chapter.title)}
            >
              {expandedSections[chapter.title] ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              <span className="flex-1 ml-2 font-medium text-sm">
                {chapter.title}
              </span>
              <span className="text-xs text-gray-500">
                {chapter.lessons.length} lessons
              </span>
            </button>
            {(expandedSections[chapter.title] || true) && (
              <div className="pl-10 pr-4 pb-2">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lessonIndex}
                    className={`py-2 px-2 flex items-center text-sm w-full text-left rounded-md ${
                      activeLesson && activeLesson._id === lesson._id
                        ? "bg-green-50 text-green-700"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    <PlayCircle
                      className={`h-4 w-4 mr-2 ${
                        activeLesson && activeLesson._id === lesson._id
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span>{lesson.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
