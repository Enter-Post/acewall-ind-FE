"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseContext } from "@/Context/CoursesProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const lessonAssessmentSchema = z.object({
  title: z.string().min(5, "Assessment title must be at least 5 characters"),
  description: z
    .string()
    .min(5, "Assessment description must be at least 5 characters"),
  pdfFiles: z.any().optional(),
});

const lessonSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  youtubeLinks: z.string().optional(),
  otherLink: z.string().optional(),
  pdfFiles: z.any().optional(),
  lessonAssessment: lessonAssessmentSchema.optional(),
});

const LessonDialog = ({ id }) => {
  const { course, setCourse } = useContext(CourseContext);
  const [open, setOpen] = useState(false);
  //   const [lessonPdf, setLessonPdf] = useState();
  //   const [assessmentPdf, assessementPdf] = useState();

  console.log(course, "course in lesson");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      youtubeLinks: "",
      otherLink: "",
      pdfFiles: [],
      lessonAssessment: {
        title: "",
        description: "",
        pdfFiles: [],
      },
    },
  });

  const handleLessonPDFChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setValue("pdfFiles", filesArray);
    console.log(filesArray);
  };

  const handleAssessmentPDFChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setValue("lessonAssessment.pdfFiles", filesArray);
    console.log(filesArray);
  };

  console.log(errors, "errors");

  const onSubmit = (data) => {
    setCourse((prev) => {
      const updatedChapters = prev.chapters.map((chapter) => {
        if (chapter.id === id) {
          return {
            ...chapter,
            lessons: [...(chapter.lessons || []), data],
          };
        }
        return chapter;
      });
      return {
        ...prev,
        chapters: updatedChapters,
      };
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Lesson</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              placeholder="Lesson Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Lesson Description</Label>
            <Textarea
              id="description"
              placeholder="Lesson Description"
              className="w-full"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="youtubeLinks">YouTube Links</Label>
            <Input
              id="youtubeLinks"
              placeholder="YouTube URLs"
              {...register("youtubeLinks")}
            />
          </div>

          <div>
            <Label htmlFor="otherLink">Other Links</Label>
            <Input
              id="otherLink"
              placeholder="Other URLs"
              {...register("otherLink")}
            />
          </div>

          <div>
            <Label htmlFor="lessonPdf">Lesson PDF Files</Label>
            <Input
              id="lessonPdf"
              type="file"
              multiple
              accept="application/pdf"
              onChange={(e) => handleLessonPDFChange(e)}
            />
          </div>

          <div className="border rounded-md p-4 bg-gray-50 space-y-2">
            <h4 className="font-semibold text-lg">Lesson Assessment</h4>

            <div>
              <Label htmlFor="assessmentTitle">Assessment Title</Label>
              <Input
                id="assessmentTitle"
                placeholder="Assessment Title"
                {...register("lessonAssessment.title")}
              />
              {errors.lessonAssessment?.title && (
                <p className="text-red-500 text-sm">
                  {errors.lessonAssessment.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="assessmentDescription">
                Assessment Description
              </Label>
              <Textarea
                id="assessmentDescription"
                placeholder="Assessment Description"
                {...register("lessonAssessment.description")}
              />
              {errors.lessonAssessment?.description && (
                <p className="text-red-500 text-sm">
                  {errors.lessonAssessment.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="assessmentPdf">Assessment PDF Files</Label>
              <Input
                id="assessmentPdf"
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => handleAssessmentPDFChange(e)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Lesson</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialog;
