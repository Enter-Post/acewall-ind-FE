import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/AxiosInstance";

export function CreateDiscussionDialog({ setRefresh }) {
  const [open, setOpen] = useState(false);
  const [courses, setcourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/course/getindividualcourse");
        setcourse(response.data.courses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setcourse([]);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("courseId", data.course);
    formData.append("topic", data.topic);
    formData.append("description", data.description);
    if (data.file && data.file[0]) {
      formData.append("files", data.file[0]);
    }
    setRefresh(true);
    axiosInstance
      .post("/discussion/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        setRefresh(false);
        setOpen(false);
      })
      .catch((err) => {
        setRefresh(false);
        console.log(err);
      });

    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-green-500 hover:bg-green-600"}>
          Create Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="course">Course</Label>
            <select
              id="course"
              {...register("course", { required: "Course is required" })}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="">Select a course</option>
              {courses?.map((course) => (
                <option key={course.id} value={course._id}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-xs text-red-500">{errors.course.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              {...register("topic", { required: "Topic is required" })}
            />
            {errors.topic && (
              <p className="text-xs text-red-500">{errors.topic.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="file">Attach File</Label>
            <Input type="file" id="file" {...register("file")} />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
