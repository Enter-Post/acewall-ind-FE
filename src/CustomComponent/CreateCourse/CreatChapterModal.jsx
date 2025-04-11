import { useContext, useState } from "react";
import { Plus, Trash, Youtube, FileText } from "lucide-react";
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
import { z } from "zod";
import { CourseContext } from "@/Context/CoursesProvider";

// Zod schema for validation
const lessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  youtubeLinks: z
    .array(
      z
        .string()
        .url("Must be a valid URL")
        .regex(/youtube|youtu\.be/, "Must be a YouTube URL")
    )
    .optional(),
  pdfFiles: z
    .array(
      z.instanceof(File).refine((file) => file.type === "application/pdf", {
        message: "File must be a PDF",
      })
    )
    .optional(),
});

const chapterSchema = z.object({
  title: z.string().min(5, "Chapter title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

const CourseCreationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState([
    { id: 1, title: "", description: "", youtubeLinks: [], pdfFiles: [] },
  ]);
  const [errors, setErrors] = useState({});

  const { course, setCourse } = useContext(CourseContext);

  const handleAddLesson = () => {
    const newId =
      lessons.length > 0
        ? Math.max(...lessons.map((lesson) => lesson.id)) + 1
        : 1;
    setLessons([
      ...lessons,
      { id: newId, title: "", description: "", youtubeLinks: [], pdfFiles: [] },
    ]);
  };

  const handleRemoveLesson = (id) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const handleLessonChange = (id, field, value) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const handleAddYoutubeLink = (lessonId) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          return {
            ...lesson,
            youtubeLinks: [...lesson.youtubeLinks, ""],
          };
        }
        return lesson;
      })
    );
  };

  const handleYoutubeLinkChange = (lessonId, index, value) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedLinks = [...lesson.youtubeLinks];
          updatedLinks[index] = value;
          return {
            ...lesson,
            youtubeLinks: updatedLinks,
          };
        }
        return lesson;
      })
    );
  };

  const handleRemoveYoutubeLink = (lessonId, index) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedLinks = [...lesson.youtubeLinks];
          updatedLinks.splice(index, 1);
          return {
            ...lesson,
            youtubeLinks: updatedLinks,
          };
        }
        return lesson;
      })
    );
  };

  const handleFileUpload = (lessonId, e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    setLessons(
      lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          return {
            ...lesson,
            pdfFiles: [...lesson.pdfFiles, ...files],
          };
        }
        return lesson;
      })
    );
  };

  const handleRemoveFile = (lessonId, index) => {
    setLessons(
      lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedFiles = [...lesson.pdfFiles];
          updatedFiles.splice(index, 1);
          return {
            ...lesson,
            pdfFiles: updatedFiles,
          };
        }
        return lesson;
      })
    );
  };

  const validateForm = () => {
    try {
      chapterSchema.parse({
        title,
        description,
        lessons: lessons.map(
          ({ title, description, youtubeLinks, pdfFiles }) => ({
            title,
            description,
            youtubeLinks,
            pdfFiles,
          })
        ),
      });
      setErrors({});
      return true;
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path.join(".")] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleCreateChapter = () => {
    let Singlecourse = {
      title,
      description,
      lessons: lessons.map(
        ({ title, description, youtubeLinks, pdfFiles }) => ({
          title,
          description,
          youtubeLinks,
          pdfFiles: pdfFiles.map((file) => file.name),
        })
      ),
    };

    if (validateForm()) {
      console.log("Chapter created:");
      setCourse((prev) => ({
        ...prev,
        chapters: [...prev.chapters, Singlecourse],
      }));
      console.log(course, "course chapters");

      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setLessons([
        { id: 1, title: "", description: "", youtubeLinks: [], pdfFiles: [] },
      ]);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          Create New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Course Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium text-gray-700">
              Course Title
            </label>
            <Input
              id="title"
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors["title"] ? "border-red-500" : ""}
            />
            {errors["title"] && (
              <p className="text-red-500 text-sm">{errors["title"]}</p>
            )}
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium text-gray-700">
              Course Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors["description"] ? "border-red-500" : ""}
              rows={4}
            />
            {errors["description"] && (
              <p className="text-red-500 text-sm">{errors["description"]}</p>
            )}
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Lessons</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddLesson}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Lesson
              </Button>
            </div>

            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="border rounded-lg p-4 space-y-4 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Lesson {index + 1}</h4>
                  {lessons.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLesson(lesson.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Lesson Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lesson Title
                  </label>
                  <Input
                    placeholder="Enter lesson title"
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "title", e.target.value)
                    }
                    className={
                      errors[`lessons.${index}.title`] ? "border-red-500" : ""
                    }
                  />
                  {errors[`lessons.${index}.title`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`lessons.${index}.title`]}
                    </p>
                  )}
                </div>

                {/* Lesson Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lesson Description
                  </label>
                  <Textarea
                    placeholder="Enter lesson description"
                    value={lesson.description}
                    onChange={(e) =>
                      handleLessonChange(
                        lesson.id,
                        "description",
                        e.target.value
                      )
                    }
                    className={
                      errors[`lessons.${index}.description`]
                        ? "border-red-500"
                        : ""
                    }
                    rows={3}
                  />
                  {errors[`lessons.${index}.description`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`lessons.${index}.description`]}
                    </p>
                  )}
                </div>

                {/* YouTube Links */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      YouTube Videos
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddYoutubeLink(lesson.id)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Youtube className="h-3 w-3" /> Add Link
                    </Button>
                  </div>

                  {lesson.youtubeLinks.length > 0 ? (
                    <div className="space-y-2">
                      {lesson.youtubeLinks.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          className="flex items-center gap-2"
                        >
                          <Input
                            placeholder="Enter YouTube link"
                            value={link}
                            onChange={(e) =>
                              handleYoutubeLinkChange(
                                lesson.id,
                                linkIndex,
                                e.target.value
                              )
                            }
                            className={
                              errors[
                                `lessons.${index}.youtubeLinks.${linkIndex}`
                              ]
                                ? "border-red-500"
                                : ""
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveYoutubeLink(lesson.id, linkIndex)
                            }
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No YouTube videos added yet
                    </p>
                  )}
                </div>

                {/* PDF Files */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    PDF Files
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(lesson.id, e)}
                      className="text-sm"
                      multiple
                    />
                  </div>

                  {lesson.pdfFiles && lesson.pdfFiles.length > 0 ? (
                    <div className="space-y-2 mt-2">
                      {lesson.pdfFiles.map((file, fileIndex) => (
                        <div
                          key={fileIndex}
                          className="flex items-center gap-2 bg-white p-2 rounded border"
                        >
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-sm truncate flex-1">
                            {file.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveFile(lesson.id, fileIndex)
                            }
                            className="h-6 w-6 text-red-500"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No PDF files uploaded yet
                    </p>
                  )}
                </div>
              </div>
            ))}

            {errors["lessons"] && (
              <p className="text-red-500 text-sm">{errors["lessons"]}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleCreateChapter}
          >
            Create Chapter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCreationModal;
