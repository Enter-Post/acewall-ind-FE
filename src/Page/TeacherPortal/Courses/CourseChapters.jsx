"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Plus, Edit, Eye, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Youtube } from "lucide-react"

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
          videos: [],
        },
        {
          id: 2,
          title: "Key Trends in Social Media",
          status: "Unpublish",
          videos: [],
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
          videos: [],
        },
        {
          id: 2,
          title: "Creating Engaging Facebook Content",
          status: "Unpublish",
          videos: [],
        },
        {
          id: 3,
          title: "Facebook Ad Types & Objectives",
          status: "Unpublish",
          videos: [],
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
          videos: [],
        },
        {
          id: 2,
          title: "Instagram Stories for Engagement",
          status: "Unpublish",
          videos: [],
        },
        {
          id: 3,
          title: "Instagram Stories & Reels for Business",
          status: "Unpublish",
          videos: [],
        },
        {
          id: 4,
          title: "Instagram Ads: Formats & Targeting",
          status: "Unpublish",
          videos: [],
        },
      ],
    },
  ])

  const [videoInputs, setVideoInputs] = useState({})
  const [showVideoInput, setShowVideoInput] = useState({})

  const toggleChapter = (chapterId) => {
    setChapters(
      chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, isOpen: !chapter.isOpen } : chapter)),
    )
  }

  const handleAddVideoInput = (chapterId, lessonId) => {
    setShowVideoInput({
      ...showVideoInput,
      [`${chapterId}-${lessonId}`]: true,
    })
  }

  const handleVideoInputChange = (chapterId, lessonId, value) => {
    setVideoInputs({
      ...videoInputs,
      [`${chapterId}-${lessonId}`]: value,
    })
  }

  const handleAddVideo = (chapterId, lessonId) => {
    if (!videoInputs[`${chapterId}-${lessonId}`]) return

    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const updatedLessons = chapter.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return {
              ...lesson,
              videos: [...(lesson.videos || []), videoInputs[`${chapterId}-${lessonId}`]],
            }
          }
          return lesson
        })
        return { ...chapter, lessons: updatedLessons }
      }
      return chapter
    })

    setChapters(updatedChapters)
    setVideoInputs({
      ...videoInputs,
      [`${chapterId}-${lessonId}`]: "",
    })
  }

  const handleRemoveVideo = (chapterId, lessonId, index) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const updatedLessons = chapter.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            const updatedVideos = [...lesson.videos]
            updatedVideos.splice(index, 1)
            return {
              ...lesson,
              videos: updatedVideos,
            }
          }
          return lesson
        })
        return { ...chapter, lessons: updatedLessons }
      }
      return chapter
    })

    setChapters(updatedChapters)
  }

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
            <Collapsible open={chapter.isOpen} onOpenChange={() => toggleChapter(chapter.id)}>
              <div className="flex items-center justify-between p-4">
                <CollapsibleTrigger className="flex items-center text-left w-full">
                  {chapter.isOpen ? (
                    <ChevronDown className="h-5 w-5 mr-2 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0" />
                  )}
                  <span className="font-semibold">
                    Chapter {chapter.id} : {chapter.title} ({chapter.lessons.length} Lessons)
                  </span>
                </CollapsibleTrigger>
                <Button variant="ghost" size="sm" className="text-violet-600 flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </div>

              <CollapsibleContent>
                <div className="border rounded-lg mx-4 mb-4 bg-white">
                  {chapter.lessons.map((lesson) => (
                    <div key={`${chapter.id}-${lesson.id}`} className="flex flex-col border-b last:border-b-0">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                          <span className="text-violet-600">Lesson {lesson.id}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-1 ml-4">
                          <File className="h-5 w-5 text-gray-400" />
                          <span>{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={lesson.status === "Published" ? "outline" : "secondary"}
                            className={cn(
                              "rounded-md px-3 py-1 font-normal",
                              lesson.status === "Published"
                                ? "text-green-600 bg-green-50 border-green-200"
                                : "bg-gray-100",
                            )}
                          >
                            {lesson.status}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                  <Youtube className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem onClick={() => handleAddVideoInput(chapter.id, lesson.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add YouTube Video
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                              <Edit className="h-4 w-4" />
                            </Button>
                  
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Videos section */}
                      {lesson.videos && lesson.videos.length > 0 && (
                        <div className="px-12 pb-3">
                          <h4 className="text-sm font-medium mb-2">YouTube Videos:</h4>
                          <div className="space-y-2">
                            {lesson.videos.map((video, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Youtube className="h-4 w-4 text-red-600" />
                                <span className="text-sm truncate flex-1">{video}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleRemoveVideo(chapter.id, lesson.id, index)}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Video input */}
                      {showVideoInput[`${chapter.id}-${lesson.id}`] && (
                        <div className="px-12 pb-4 flex gap-2">
                          <Input
                            placeholder="Enter YouTube video link"
                            value={videoInputs[`${chapter.id}-${lesson.id}`] || ""}
                            onChange={(e) => handleVideoInputChange(chapter.id, lesson.id, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddVideo(chapter.id, lesson.id)}
                            className="bg-violet-600 hover:bg-violet-700"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      )}
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
  )
}

