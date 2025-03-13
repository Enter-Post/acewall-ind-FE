import { useState } from "react";
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
import { Link } from "react-router-dom";

export default function CoursesChapter() {
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Introduction to Social Media Marketing",
      isOpen: true,
      lessons: [
        {
          id: 1,
          title: "Overview of Social Media Platforms",
          status: "Published",
        },
        {
          id: 2,
          title: "Key Trends in Social Media",
          status: "Unpublish",
        },
      ],
    },
    {
      id: 2,
      title: "Introduction to Social Media Marketing",
      isOpen: true,
      lessons: [
        {
          id: 1,
          title: "Setting Up a Facebook Business Page",
          status: "Published",
        },
        {
          id: 2,
          title: "Creating Engaging Facebook Content",
          status: "Unpublish",
        },
        {
          id: 3,
          title: "Facebook Ad Types & Objectives",
          status: "Unpublish",
        },
      ],
    },
    {
      id: 3,
      title: "Introduction to Social Media Marketing",
      isOpen: true,
      lessons: [
        {
          id: 1,
          title: "Optimizing Your Instagram Profile",
          status: "Published",
        },
        {
          id: 2,
          title: "Instagram Stories for Engagement",
          status: "Unpublish",
        },
        {
          id: 3,
          title: "Instagram Stories & Reels for Business",
          status: "Unpublish",
        },
        {
          id: 4,
          title: "Instagram Ads: Formats & Targeting",
          status: "Unpublish",
        },
      ],
    },
  ]);

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
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold flex items-center">
          <div className="w-1 h-8 bg-green-500 mr-2"></div>
          Chapters
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {chapters.map((chapter, index) => (
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
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-violet-600">
                          Lesson {lesson.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 flex-1 ml-4">
                        <File className="h-5 w-5 text-gray-400" />
                        <span>{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            lesson.status === "Published"
                              ? "outline"
                              : "secondary"
                          }
                          className={cn(
                            "rounded-md px-3 py-1 font-normal",
                            lesson.status === "Published"
                              ? "text-green-600 bg-green-50 border-green-200"
                              : "bg-gray-100"
                          )}
                        >
                          {lesson.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>

      <div className="p-4 flex justify-between">
        <Link to="/teacherPortal/courses/createCourses/">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back
          </Button>
        </Link>
        <Link to="/teacherPortal/courses/createCourses/gradebook">
          <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
