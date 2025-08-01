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
import { File, Image, Loader } from "lucide-react";
import { toast } from "sonner";

export function CreateDiscussionDialog({ refresh, setRefresh }) {
  const [open, setOpen] = useState(false);
  const [courses, setcourse] = useState([]);
  const [files, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  console.log(type, "type");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handlefilechange = (e) => {
    const file = e.target.files;
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB

    for (let i = 0; i < file.length; i++) {
      if (!allowedTypes.includes(file[i].type)) {
        toast.error("Only PNG, JPEG, JPG, and PDF files are allowed.");
        return;
      }
      if (file[i].size > maxSize) {
        toast.error("File size must not exceed 2MB.");
        return;
      }
      if (files.length >= 5) {
        toast.error("You can only upload a maximum of 5 files.");
        return;
      }
    }
    setFile((prev) => [...prev, ...file]);
  };

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/course/getVerifiedCourses");
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
    formData.append("type", type);
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    setRefresh(true);
    axiosInstance
      .post("/discussion/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        setRefresh(false);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        setRefresh(false);
        console.log(err);
      });
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
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="">Select a type</option>
              <option value="course">Course</option>
              <option value="public">Public</option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>
          {type === "course" && (
            <div>
              <Label htmlFor="course">Course</Label>
              <select
                id="course"
                {...register("course", {
                  validate: (value) => {
                    if (type === "course" && !value) {
                      return "Course is required";
                    }
                  },
                })}
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
          )}

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
            <Label htmlFor="file">
              Attach File (Only PNG, JPEG, JPG, and PDF files are allowed.)
            </Label>
            <Input
              type="file"
              id="file"
              onChange={(e) => handlefilechange(e)}
            />

            <div className="flex flex-col gap-2 mt-3">
              {files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="border p-3 rounded-lg border-gray-300 flex items-center gap-2"
                  >
                    {" "}
                    {file.type === "application/pdf" ? (
                      <File className="text-green-500" />
                    ) : (
                      <Image className="text-green-500" />
                    )}
                    <p className="text-sm">{file.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={refresh}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {refresh ? (
                <Loader className="animate-spin" />
              ) : (
                "Create Discussion"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
