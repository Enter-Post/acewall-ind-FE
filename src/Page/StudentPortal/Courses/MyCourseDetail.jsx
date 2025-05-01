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
  const [isLessonVisible, setIsLessonVisible] = useState(false);
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [instructor, setInstructor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);



  // Toggle the visibility of the lesson content
  const toggleLessonVisibility = () => {
    setIsLessonVisible((prevState) => !prevState);
  };
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
        <div className="p-5 border-b bg-white shadow-sm flex items-center gap-3 ">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-black"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{courseTitle}</h1>
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
              {activeLesson?.youtubeLinks ? (
                <div className="mt-6 flex  justify-center">
                  <div className="w-full max-w-screen-md rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(activeLesson.youtubeLinks)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Lesson Video"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 p-6 bg-gray-100 text-center text-sm text-gray-500 rounded-md">
                  No YouTube link available
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full p-5">
          <TabsList className="flex flex-wrap justify-center gap-4 w-full  sm:gap-10  bg-white p-1 shadow-inner">
            {["description", "files"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-3 py-2 text-base font-medium  capitalize transition-all duration-300 
              text-gray-700 hover:text-green-600 hover:bg-gray-50 
              data-[state=active]:bg-gray-100 data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>


          {/* Description */}
          <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-6">
              {/* Chapter Title and Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{chapter.title}</h3>
                <p className="text-gray-700 mt-4 text-sm">{chapter.description}</p>
              </div>

              {/* Active Lesson Toggle */}
              {activeLesson && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={toggleLessonVisibility}
                    className="text-xl font-semibold text-gray-800 w-full text-left flex justify-between items-center focus:outline-none"
                  >
                    <span>Current Lesson: <br /> {activeLesson.title}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${isLessonVisible ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isLessonVisible && (
                    <div className="text-gray-600 mt-3 text-sm">
                      <p>{activeLesson.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>


          {/* Files */}
          <TabsContent value="files" className="p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-6">
              {/* PDF Files */}
              {activeLesson && activeLesson.pdfFiles && activeLesson.pdfFiles.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">PDF Files</h3>
                  {activeLesson.pdfFiles.map((pdf, index) => (
                    <a
                      key={index}
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-blue-600 text-sm">PDF {index + 1}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  No PDF files available for this lesson
                </div>
              )}

              {/* Lesson Assessment */}
              {activeLesson && activeLesson.lessonAssessment && activeLesson.lessonAssessment.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Lesson Assessment Materials</h3>
                  {activeLesson.lessonAssessment.map((assessment, i) => (
                    <div key={i} className="space-y-4">
                      <h4 className="font-medium text-sm text-gray-800">{assessment.title}</h4>
                      <p className="text-sm text-gray-600">{assessment.description}</p>

                      {assessment.pdfFiles && assessment.pdfFiles.length > 0 && (
                        <div className="space-y-3 pl-4">
                          {assessment.pdfFiles.map((pdf, pdfIndex) => (
                            <a
                              key={pdfIndex}
                              href={pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <FileText className="h-4 w-4 text-blue-500 mr-3" />
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

              {/* Chapter Assessment */}
              {chapter && chapter.assessment && chapter.assessment.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Chapter Assessment</h3>
                  {chapter.assessment.map((assessment, i) => (
                    <div key={i} className="space-y-4">
                      <h4 className="font-medium text-sm text-gray-800">{assessment.title}</h4>
                      <p className="text-sm text-gray-600">{assessment.description}</p>

                      {assessment.pdfFiles && assessment.pdfFiles.length > 0 && (
                        <div className="space-y-3 pl-4">
                          {assessment.pdfFiles.map((pdf, pdfIndex) => (
                            <a
                              key={pdfIndex}
                              href={pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <FileText className="h-4 w-4 text-blue-500 mr-3" />
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
        </Tabs>
      </div>

      {/* Right side - Course Contents */}
      <div className="w-full lg:w-80 border-l bg-gray-50 overflow-auto max-h-screen">
        {/* Header */}
        <div className="p-4 border-b bg-white ">
          <h2 className="text-sm font-semibold text-gray-700">Chapter Content</h2>
        </div>

        {/* Chapter Toggle Section */}
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="border-b">
            <button
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 transition"
              onClick={() => toggleSection(chapter.title)}
            >
              <div className="flex items-center gap-2">
                {expandedSections[chapter.title] ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-800">{chapter.title}</span>
              </div>
              <span className="text-xs text-gray-500">{chapter.lessons.length} lessons</span>
            </button>

            {(expandedSections[chapter.title] || true) && (
              <div className="pl-6 pr-4 pb-2">
                {chapter.lessons.map((lesson, lessonIndex) => {
                  const isActive = activeLesson && activeLesson._id === lesson._id;
                  return (
                    <button
                      key={lessonIndex}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
                  ${isActive ? "bg-green-100 text-green-700 font-medium" : "hover:bg-gray-100 text-gray-700"}`}
                    >
                      <PlayCircle
                        className={`h-4 w-4 ${isActive ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span>{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
