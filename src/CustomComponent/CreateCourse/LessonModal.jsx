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
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const fileInstance = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must not exceed 5MB",
  });

const lessonSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must be less than 200 characters"),

 youtubeLinks: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(val),
      {
        message: "Must be a valid YouTube link",
      }
    ),
  otherLink: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || /^https?:\/\/.+$/.test(val), {
      message: "Must be a valid URL",
    }),

  pdfFiles: z
    .array(fileInstance)
    .optional()
    .refine(
      (arr) =>
        arr.every(
          (file) => file instanceof File && file.size <= 5 * 1024 * 1024
        ),
      { message: "All uploaded files must be PDF files and less than 5MB" }
    ),
});

const LessonModal = ({ chapterID, fetchCourseDetail }) => {
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
    const filesArray = Array.from(e.target.files || []);
    setValue("pdfFiles", filesArray, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  console.log(errors, "errors");

  const onSubmit = async (data) => {
    if (!data.youtubeLinks) data.youtubeLinks = undefined;
    if (!data.otherLink) data.otherLink = undefined;
    console.log(data, "Lesson Data");
    console.log(data.otherLink, "otherLink");
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("youtubeLinks", data.youtubeLinks);
    formData.append("otherLink", data.otherLink);
    formData.append("chapter", chapterID);
    data.pdfFiles.forEach((file) => {
      formData.append("pdfFiles", file);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value} form data`);
    }

    await axiosInstance
      .post(`/lesson/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        fetchCourseDetail();
        setOpen(false);
        toast.success(res.data.message);
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 ml-auto"
        >
          <Plus className="h-4 w-4" />
          Add Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
          <DialogDescription>
            Fill in the lesson details below. You can leave optional fields
            empty.
          </DialogDescription>
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
            {errors.youtubeLinks && (
              <p className="text-red-500 text-sm">
                {errors.youtubeLinks.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="otherLink">Other Links</Label>
            <Input
              id="otherLink"
              placeholder="Other URLs"
              {...register("otherLink")}
            />
            {errors.otherLink && (
              <p className="text-red-500 text-sm">{errors.otherLink.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lessonPdf">Lesson PDF Files</Label>
            <Input
              id="lessonPdf"
              type="file"
              multiple
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleLessonPDFChange}
            />
            {errors.pdfFiles && (
              <p className="text-red-500 text-sm">
                {errors?.pdfFiles?.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                reset();
              }}
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
