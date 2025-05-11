import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChapterDeleteConfirmationModal } from "./ChapterDeleteConfirmationModal";
import LessonModal from "./LessonModal";

const ChapterDetail = ({ courseId, chapters, setChapters }) => {
  const [lessons, setLessons] = useState([]);

  const fetchChapters = async () => {
    try {
      const res = await axiosInstance.get(`chapter/${courseId}`);
      setChapters(res.data.chapters);
    } catch (err) {
      console.error("Error fetching chapters:", err);
    }
  };

  const fetchLessons = async () => {
    await axiosInstance
      .get(`lesson/${chapters._id}`)
      .then((res) => {
        setLessons(res.data.lessons);
      })
      .catch((err) => {
        console.error("Error fetching lessons:", err);
      });
  };

  useEffect(() => {
    if (courseId) {
      fetchChapters();
      fetchLessons();
    }
  }, [courseId]);

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {chapters?.map((chapter, chapterIndex) => (
        <AccordionItem
          key={chapter._id}
          value={`chapter-${chapterIndex}`}
          className="border rounded-xl overflow-hidden shadow-sm"
        >
          <AccordionTrigger className="text-left text-lg font-semibold px-6 py-3 hover:bg-gray-50 transition-all">
            Chapter {chapterIndex + 1}: {chapter.title}
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 space-y-4 bg-white">
            <p className="text-sm text-gray-700 leading-relaxed">
              {chapter.description}
            </p>
            <div className="flex items-center gap-4">
              <ChapterDeleteConfirmationModal
                chapterID={chapter._id}
                fetchChapters={fetchChapters}
              />
              {/* <Button>add lesson</Button> */}
              <LessonModal chapterID={chapter._id} />
            </div>

            {Array.isArray(chapter.assessment) &&
              chapter.assessment.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-base text-gray-900">
                    Chapter Assessment
                  </p>
                  {chapter.assessment.map((assess, aIdx) => (
                    <div
                      key={aIdx}
                      className="pl-4 border-l-2 border-orange-400"
                    >
                      <ul className="list-disc pl-4 mb-3">
                        <li>
                          <p className="text-base font-medium mb-3 text-gray-700">
                            {assess.title}
                          </p>
                          <p className="text-sm text-gray-700">
                            {assess.description}
                          </p>
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

            {lessons?.length > 0 && (
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

                        {Array.isArray(lesson.lessonAssessment) &&
                          lesson.lessonAssessment.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="font-semibold text-sm">
                                Lesson Assessment:
                              </p>
                              {lesson.lessonAssessment.map((assess, idx) => (
                                <div
                                  key={idx}
                                  className="pl-4 border-l-2 border-green-400"
                                >
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
  );
};

export default ChapterDetail;
