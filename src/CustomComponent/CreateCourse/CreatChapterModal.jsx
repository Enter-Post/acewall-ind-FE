import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { Plus, Trash, Youtube, FileText, LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CourseContext } from "@/Context/CoursesProvider";
import { Label } from "@/components/ui/label";
import axios from "axios";

// Zod Schema
const lessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  youtubeLinks: z.string().optional(),
  pdfFiles: z.any(),
});

const assessmentSchema = z.object({
  title: z.string().min(3, "Assessment title is required"),
  description: z.string().min(10, "Assessment description is required"),
  pdfFiles: z.any(),
});

const chapterSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  lessons: z.array(lessonSchema).min(1, "Minimun one Lessons is required"),
  assessments: z
    .array(assessmentSchema)
    .length(1, "Minimun one assessment is required"),
});

export default function ChapterCreationModal({ chapters, setChapters }) {
  const [isOpen, setIsOpen] = useState(false);
  const { course, setCourse } = useContext(CourseContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
      description: "",
      lessons: [
        {
          title: "",
          description: "",
          youtubeLinks: "",
          pdfFiles: [],
        },
      ],
      assessments: [
        {
          title: "",
          description: "",
          pdfFiles: [],
        },
      ],
    },
  });

  console.log(errors, "errors");

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "lessons",
  });

  const {
    fields: assessmentfields,
    append: assessmentappend,
    remove: assessmentremove,
    update: assessmentupdate,
  } = useFieldArray({
    control,
    name: "assessments",
  });

  const handleLessonPDF = async (e, index, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/auto/upload`,
          data
        );

        console.log(res.data, "cloudinary");
        uploadedUrls.push(res.data.url);
      } catch (error) {
        console.error("Upload failed for file:", file.name, error);
      }
    }

    // Set all uploaded file URLs in the field
    setValue(`${type}.${index}.pdfFiles`, uploadedUrls, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    const newChapter = {
      title: data.title,
      description: data.description,
      lessons: data.lessons,
      assessment: data.assessments,
    };

    // setChapters((prev) => [...prev, newChapter]);
    setCourse((prev) => ({
      ...prev,
      chapters: [...(prev.chapters || []), newChapter],
    }));

    reset();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white">Create New Chapter</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Chapter Info */}
          <div>
            <Input placeholder="Chapter Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Chapter Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Lessons</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    youtubeLinks: [],
                    pdfFiles: [],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Lesson
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg p-4 space-y-3 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Lesson {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <Input
                  placeholder="Lesson Title"
                  {...register(`lessons.${index}.title`)}
                />
                {errors.lessons?.[index]?.title && (
                  <p className="text-red-500 text-sm">
                    {errors.lessons[index].title.message}
                  </p>
                )}

                <Textarea
                  placeholder="Lesson Description"
                  {...register(`lessons.${index}.description`)}
                />
                {errors.lessons?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors.lessons[index].description.message}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium">
                    YouTube Links
                  </label>
                  <Input
                    placeholder="YouTube URLs"
                    {...register(`lessons.${index}.youtubeLinks`)}
                  />
                  {errors.lessons?.[index]?.youtubeLinks && (
                    <p className="text-red-500 text-sm">
                      {errors.lessons[index].youtubeLinks.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">PDF Files</label>
                  <Input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => handleLessonPDF(e, index, "lessons")}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Section */}

          <section>
            <div className="mx-auto p-2 bg-white rounded-lg">
              <h2 className="text-xl font-bold mb-4">Create New Assessment</h2>
              <p className="text-gray-600 mb-6">
                Upload a new Assessment for students.
              </p>

              {assessmentfields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md mb-4">
                  <div className="grid gap-4">
                    <Label htmlFor={`assessment.${index}.title`}>
                      Assessment Title
                    </Label>
                    <Input
                      id={`assessment.${index}.title`}
                      placeholder="Enter Assessment title"
                      {...register(`assessments.${index}.title`)}
                    />
                    {errors.assessments?.[index]?.title && (
                      <p className="text-red-500 text-sm">
                        {errors.assessments[index].title.message}
                      </p>
                    )}

                    <Label htmlFor={`assessments.${index}.description`}>
                      Description
                    </Label>
                    <Textarea
                      id={`assessment.${index}.description`}
                      placeholder="Enter Assessment description and instructions"
                      {...register(`assessments.${index}.description`)}
                    />
                    {errors.assessments?.[index]?.description && (
                      <p className="text-red-500 text-sm">
                        {errors.assessments[index].description.message}
                      </p>
                    )}

                    <Label htmlFor={`assessments.${index}.pdfFiles`}>
                      PDF Files
                    </Label>
                    <Input
                      id={`assessments.${index}.pdfFiles`}
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={(e) => handleLessonPDF(e, index, "assessments")}
                    />

                    {/* You can also preview selected files here */}
                    <button
                      type="button"
                      onClick={() => assessmentremove(index)}
                      className="text-red-600 text-sm mt-2"
                    >
                      Remove Assessment
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  assessmentappend({
                    title: "",
                    description: "",
                    pdfFiles: [],
                  })
                }
                className="mt-4 text-blue-600 font-semibold"
              >
                ➕ Add Assessment
              </button>
            </div>
          </section>

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
