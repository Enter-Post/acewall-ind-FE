import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgePlus, Plus } from "lucide-react";
import LessonModal from "./LessonModal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreateDiscussionDialog } from "../createDiscussionModal";

const ChapterOptionDropdown = ({
  chapterId,
  fetchChapterDetail,
  quarterId,
  semesterId,
  quarterStart,
  quarterEnd,
  courseId,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-green-200 hover:bg-green-300 cursor-pointer rounded-lg p-2">
            <BadgePlus className="text-green-600" size={20} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuItem> */}
          <LessonModal
            chapterID={chapterId}
            fetchQuarterDetail={fetchChapterDetail}
          />
          {/* </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link
              to={`/teacher/assessments/create/chapter/${chapterId}/${courseId}/${quarterStart}/${quarterEnd}?semester=${semesterId}&quarter=${quarterId}`}
            >
              <div className="text-green-600 bg-transparent flex ">
                <Plus className="h-4 w-4 mr-2" />
                Add Assessment
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to={`/teacher/courses/${courseId}/posts/chapter/${chapterId}`}
              className="flex cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              <p className="text-green-600">Add Page</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to={`/teacher/discussions?type=chapter&&typeId=${chapterId}&&course=${courseId}`}
              className="text-green-600 bg-transparent flex"
            >
              <Plus className="h-4 w-4 mr-2" />
              Discussion
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChapterOptionDropdown;
