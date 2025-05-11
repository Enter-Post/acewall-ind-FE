import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CourseContext } from "@/Context/CoursesProvider";
import axios from "axios";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";

// Zod Schema (no array)
const chapterSchema = z.object({
  title: z.string().min(5, "Chapter title is required"),
  description: z.string().min(5, "Chapter description is required"),
});

export default function ChapterCreationModal({ courseId, setChapters }) {
  const [isOpen, setIsOpen] = useState(false);
  const { course, setCourse } = useContext(CourseContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);

    await axiosInstance
      .post(`/chapter/create/${courseId}`, formdata)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setChapters((prev) => [...prev, res.data.chapter]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white">Create New Chapter</Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Chapter Title */}
          <div>
            <Input placeholder="Chapter Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Chapter Description */}
          <div className="w-[28rem]">
            <Textarea
              placeholder="Chapter Description"
              className="w-full"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 text-white">
              Create Chapter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
