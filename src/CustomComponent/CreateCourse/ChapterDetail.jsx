"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LessonModal from "./LessonModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Youtube,
  Link2,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DeleteModal } from "./DeleteModal";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Link } from "react-router-dom";

const ChapterDetail = ({ courseId, chapters, fetchCourseDetail }) => {
  const [openLessons, setOpenLessons] = useState({});
  const [activeTab, setActiveTab] = useState("chapters");
  const [loading, setLoading] = useState(false);

  console.log(chapters, "chapters");

  const toggleLesson = (lessonId) => {
    setOpenLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleDeleteChapter = (chapterID) => {
    setLoading(true);
    axiosInstance
      .delete(`chapter/${chapterID}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        fetchCourseDetail();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message || "Error deleting chapter");
      });
  };

  const handleDeleteLesson = (lessonID) => {
    setLoading(true);
    axiosInstance
      .delete(`lesson/${lessonID}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        fetchCourseDetail();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message || "Error deleting lesson");
      });
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="chapters"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="chapters" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Chapters & Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chapters" className="mt-4">
          <Accordion type="multiple" className="w-full space-y-4">
            {chapters?.map((chapter, chapterIndex) => (
              <AccordionItem
                key={chapter._id}
                value={`chapter-${chapterIndex}`}
                className="border rounded-xl overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold px-6 py-4 hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Chapter {chapterIndex + 1}
                    </span>
                    {chapter.title}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 space-y-5 bg-white">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {chapter.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Chapter
                    </Button>

                    <DeleteModal
                      deleteFunc={() => handleDeleteChapter(chapter._id)}
                    />

                    <LessonModal
                      chapterID={chapter._id}
                      fetchCourseDetail={fetchCourseDetail}
                    />
                    <Link
                      to={`/teacher/assignment/create/chapter/${chapter._id}`}
                    >
                      <Button variant="outline" className="text-green-600">
                        + Add Assessment
                      </Button>
                    </Link>
                  </div>

                  {Array.isArray(chapter.chapterAssessments) &&
                    chapter.chapterAssessments.length > 0 && (
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Badge variant="outline" className="bg-orange-50">
                              Chapter Assessment
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          {chapter.chapterAssessments.map((assess, aIdx) => (
                            <div
                              key={aIdx}
                              className="pl-4 border-l-2 border-orange-400 mb-4 last:mb-0"
                            >
                              <div className="mb-2">
                                <div className="flex items-center justify-between">
                                  <p className="text-base font-medium mb-1 text-gray-800">
                                    {assess.title}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-gray-500 hover:text-blue-600"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-gray-500 hover:text-red-600"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {assess.description}
                                </p>
                              </div>

                              {assess?.files?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {assess?.files?.map((pdf, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2"
                                    >
                                      <a
                                        href={pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                      >
                                        <FileText className="h-4 w-4" />
                                        PDF {i + 1}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                  {chapter.lessons?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          Lessons
                        </Badge>
                      </h3>

                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <section key={lesson._id}>
                          <Card className="overflow-hidden">
                            <div
                              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => toggleLesson(lesson._id)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Lesson {lessonIndex + 1}
                                </span>
                                <h4 className="font-medium text-gray-800">
                                  {lesson.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-gray-500 hover:text-blue-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Open edit lesson modal
                                  }}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <DeleteModal
                                  deleteFunc={() =>
                                    handleDeleteLesson(lesson._id)
                                  }
                                />

                                <Link
                                  to={`/teacher/assignment/create/lesson/${lesson._id}`}
                                >
                                  <Button
                                    variant="outline"
                                    className="text-green-600 text-xs"
                                  >
                                    + Add Assessment
                                  </Button>
                                </Link>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1 ml-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLesson(lesson._id);
                                  }}
                                >
                                  {openLessons[lesson._id] ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {openLessons[lesson._id] && (
                              <CardContent className="border-t pt-4">
                                {lesson.description && (
                                  <p className="text-sm text-gray-600 mb-4">
                                    {lesson.description}
                                  </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-gray-700">
                                      Resources
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {lesson.pdfFiles?.map(
                                        (pdf, i) =>
                                          pdf?.url &&
                                          pdf?.filename && (
                                            <a
                                              key={i}
                                              href={pdf.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                              <FileText className="h-4 w-4" />
                                              {pdf.filename}
                                            </a>
                                          )
                                      )}
                                    </div>

                                    {lesson.youtubeLinks && (
                                      <a
                                        href={lesson.youtubeLinks}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
                                      >
                                        <Youtube className="h-4 w-4" />
                                        Watch on YouTube
                                      </a>
                                    )}

                                    {lesson.otherLink && (
                                      <a
                                        href={lesson.otherLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                      >
                                        <Link2 className="h-4 w-4" />
                                        Visit Link
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        </section>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterDetail;
