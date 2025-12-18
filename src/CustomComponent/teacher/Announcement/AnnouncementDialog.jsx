"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { toast } from "sonner";


// ✅ Zod Schema for validation
const AnnouncementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  courseId: z.string().trim().min(1, "Course is required"),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});

export default function AnnouncementDialog({ open, onOpenChange, onCreated }) {
  const { user } = useContext(GlobalContext);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [messageCharCount, setMessageCharCount] = useState(0);

  const titleRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: "",
      courseId: "",
      message: "",
    },
  });

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/course/getVerifiedCourses");
        setAllCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setAllCourses([]);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const onSubmit = async (data) => {
    if (!user?._id) return;

    const payload = {
      ...data,
      teacherId: user._id,
    };

    try {
      const res = await axiosInstance.post(
        "/announcements/createannouncement",
        payload
      );

      toast.success("Announcement created and emails sent to students.");

      if (onCreated) onCreated(res.data.announcement);

      onOpenChange(false);
      reset();
      setTitleCharCount(0);
      setMessageCharCount(0);
    } catch (err) {
      console.error("Error creating announcement:", err);
      toast.error("Failed to create announcement. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-labelledby="create-announcement-title"
        aria-describedby="create-announcement-desc"
      >
        <DialogHeader>
          <DialogTitle id="create-announcement-title">
            Create New Announcement
          </DialogTitle>
          <DialogDescription id="create-announcement-desc">
            Create a new announcement for your students.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          {/* Title */}
          <div>
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              ref={titleRef}
              maxLength={100}
              {...register("title")}
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : "title-help"}
              onChange={(e) => {
                setTitleCharCount(e.target.value.length);
                setValue("title", e.target.value, { shouldValidate: true });
              }}
              placeholder="Enter title"
              className="focus-visible:outline focus-visible:outline-green-500"
            />
            <div
              id="title-help"
              className="text-sm text-gray-500 text-right mt-1"
            >
              {titleCharCount}/100 characters
            </div>
            {errors.title && (
              <p id="title-error" className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Course Selection */}
          <div>
            <Label htmlFor="course">Select Course</Label>
            <Select
              onValueChange={(value) =>
                setValue("courseId", value, { shouldValidate: true })
              }
              disabled={loading}
              aria-invalid={errors.courseId ? "true" : "false"}
              aria-describedby={errors.courseId ? "course-error" : undefined}
            >
              <SelectTrigger
                id="course"
                className="focus-visible:outline focus-visible:outline-green-500"
              >
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem disabled>Loading courses...</SelectItem>
                ) : allCourses.length === 0 ? (
                  <SelectItem disabled>No courses available</SelectItem>
                ) : (
                  allCourses.map((courseData) => (
                    <SelectItem key={courseData._id} value={courseData._id}>
                      {courseData.courseTitle || "Untitled Course"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.courseId && (
              <p id="course-error" className="text-sm text-red-500">
                {errors.courseId.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Announcement Message</Label>
            <Textarea
              id="message"
              maxLength={500}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : "message-help"}
              onChange={(e) => {
                setMessageCharCount(e.target.value.length);
                setValue("message", e.target.value, { shouldValidate: true });
              }}
              placeholder="Enter message"
              className="focus-visible:outline  focus-visible:outline-green-500"
            />
            <div
              id="message-help"
              className="text-sm text-gray-500 text-right mt-1"
            >
              {messageCharCount}/500 characters
            </div>
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setTitleCharCount(0);
                setMessageCharCount(0);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
