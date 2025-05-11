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
import { axiosInstance } from "@/lib/AxiosInstance";

const fileInstance = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must not exceed 5MB",
  });

const lessonSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  youtubeLinks: z.string().optional(),
  otherLink: z.string().optional(),
  pdfFiles: z.array(fileInstance).optional(),
});

const LessonModal = ({ chapterID }) => {
  const [open, setOpen] = useState(false);

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
    },
  });

  const handleLessonPDFChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setValue("pdfFiles", filesArray);
    console.log(filesArray);
  };

  console.log(errors, "errors");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("youtubeLinks", data.youtubeLinks);
    formData.append("otherLink", data.otherLink);
    formData.append("chapter", chapterID);
    data.pdfFiles.forEach((file) => {
      formData.append("pdfFiles", file);
    });

    await axiosInstance
      .post(`/lesson/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
          {errors.pdfFiles && (
            <p className="text-red-500 text-sm">{errors.pdfFiles.message}</p>
          )}
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

export default LessonModal;
