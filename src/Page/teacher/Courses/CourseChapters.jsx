"use client";

import { useContext, useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Plus,
  Edit,
  Eye,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Youtube } from "lucide-react";
import CourseCreationModal from "@/CustomComponent/CreateCourse/CreatChapterModal";
import { CourseContext } from "@/Context/CoursesProvider";

export default function CoursesChapter() {
  const navigate = useNavigate();
  const { course, setCourse } = useContext(CourseContext);

  useEffect(() => {
    const isEmptyBasics = Object.keys(course.basics).length === 0;

    if (isEmptyBasics) {
      navigate("/teacher/courses/createCourses", { replace: true });
    }
  }, []);

  const toggleChapter = (chapterId) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  };

  return (
    <div className="border rounded-lg ">
      <section className="flex justify-between items-center border-b p-4">
        <div className="">
          <h2 className="text-2xl font-semibold flex items-center">
            <div className="w-1 h-8 bg-green-500 mr-2"></div>
            Chapters
          </h2>
        </div>
        <div>
          <CourseCreationModal />
        </div>
      </section>

      <div className="p-4 space-y-6">
        {course?.chapters &&
          course.chapters.map((chapter, index) => (
            <div key={chapter.id} className="bg-gray-50 rounded-lg">
              <Collapsible
                open={chapter.isOpen}
                onOpenChange={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center justify-between p-4">
                  <CollapsibleTrigger className="flex items-center text-left w-full">
                    {chapter.isOpen ? (
                      <ChevronDown className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <span className="font-semibold">
                      Chapter {chapter.id} : {chapter.title} (
                      {chapter.lessons.length} Lessons)
                    </span>
                  </CollapsibleTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-violet-600 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Lesson
                  </Button>
                </div>

                <CollapsibleContent>
                  <div className="border rounded-lg mx-4 mb-4 bg-white">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={`${chapter.id}-${lesson.id}`}
                        className="flex flex-col border-b last:border-b-0"
                      >
                        {/* ...existing lesson rendering code... */}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
      </div>

      <div className="p-4 flex justify-between">
        <Link to="/teacher/courses/createCourses/">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back
          </Button>
        </Link>
        <Link to="/teacher/courses/createCourses/addgrade">
          <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
