import React, { useEffect, useState, useRef } from "react";
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
import { FormProvider, useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/AxiosInstance";
import { File, Image, Loader, X } from "lucide-react";
import { toast } from "sonner";
import StrictDatePicker from "./Assessment/DueDatePicker";
import { useSearchParams } from "react-router-dom";
import CategoryDropdown from "./Assessment/Assessment-category-dropdown";

export function CreateDiscussionDialog({
  refresh,
  setRefresh,
  semester,
  quarter,
}) {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const fileInputRef = useRef(null);

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const typeId = searchParams.get("typeId");
  const courseId = searchParams.get("course");

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  const minDate =
    parsedStartDate < parsedEndDate ? parsedStartDate : parsedEndDate;
  const maxDate =
    parsedEndDate > parsedStartDate ? parsedEndDate : parsedStartDate;

  const form = useForm({
    defaultValues: {
      topic: "",
      description: "",
      totalPoints: "",
      category: "",
      dueDate: null,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPEG, JPG, and PDF files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must not exceed 2MB.");
      return;
    }

    if (files.length >= 5) {
      toast.error("You can only upload a maximum of 5 files.");
      return;
    }

    setFiles((prev) => [...prev, file]);
    // Reset input so the same file can be selected again if removed
    e.target.value = "";
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const fetchQuarterDate = async () => {
    await axiosInstance
      .get(`quarter/getDatesofQuarter/${quarter}`)
      .then((res) => {
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchQuarterDate();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/course/getVerifiedCourses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    form.register("category", { required: "Category is required" });
  }, [form]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("course", courseId);
    formData.append("topic", data.topic);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("type", type);
    formData.append("dueDate", JSON.stringify(data.dueDate));
    formData.append("totalMarks", data.totalPoints);
    if (semester !== "undefined" && quarter !== "undefined") {
      formData.append("semester", semester);
      formData.append("quarter", quarter);
    }
    if (type === "chapter") {
      formData.append("chapter", typeId);
    }
    if (type === "lesson") {
      formData.append("lesson", typeId);
    }
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
        setRefresh(false);
        form.reset();
        setFiles([]);
        setOpen(false);
        toast.success("Discussion created successfully");
      })
      .catch((err) => {
        setRefresh(false);
        console.log(err);
        toast.error("Failed to create discussion");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-haspopup="dialog"
        >
          Create Discussion
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-3xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
        aria-describedby="discussion-form-description"
      >
        <DialogHeader>
          <DialogTitle id="discussion-dialog-title">Create New Discussion</DialogTitle>
          <p id="discussion-form-description" className="sr-only">
            Fill out the form below to create a new discussion topic for your students.
          </p>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Topic Field */}
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                {...form.register("topic", { required: "Topic is required" })}
                className="w-full focus:ring-2 focus:ring-green-500"
                aria-invalid={form.formState.errors.topic ? "true" : "false"}
                aria-describedby={form.formState.errors.topic ? "topic-error" : undefined}
              />
              {form.formState.errors.topic && (
                <p id="topic-error" role="alert" className="text-xs text-red-500">
                  {form.formState.errors.topic.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                maxLength={2000}
                {...form.register("description", {
                  required: "Description is required",
                })}
                className="w-full focus:ring-2 focus:ring-green-500"
                aria-invalid={form.formState.errors.description ? "true" : "false"}
                aria-describedby="description-char-count description-error"
              />
              <div className="flex justify-between items-center mt-1">
                {form.formState.errors.description ? (
                  <p id="description-error" role="alert" className="text-xs text-red-500">
                    {form.formState.errors.description.message}
                  </p>
                ) : <span />}
                <p id="description-char-count" className="text-xs text-gray-500" aria-live="polite">
                  {`Characters left: ${2000 - (form.watch("description")?.length || 0)}`}
                </p>
              </div>
            </div>

            {/* Points, Category, and Due Date */}
            <section className="flex flex-col md:flex-row gap-4" aria-label="Discussion Settings">
              <div className="flex-1 space-y-2">
                <Label htmlFor="totalPoints">Total Points</Label>
                <Input
                  type="number"
                  id="totalPoints"
                  {...form.register("totalPoints", {
                    required: "Total Points is required",
                    validate: (value) =>
                      value >= 0 || "Total Points must be greater than 0",
                  })}
                  className="w-full focus:ring-2 focus:ring-green-500"
                  aria-invalid={form.formState.errors.totalPoints ? "true" : "false"}
                />
                {form.formState.errors.totalPoints && (
                  <p role="alert" className="text-xs text-red-500">
                    {form.formState.errors.totalPoints.message}
                  </p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="category">Category</Label>
                <CategoryDropdown
                  courseId={courseId}
                  value={form.watch("category")}
                  onValueChange={(val) =>
                    form.setValue("category", val, { shouldValidate: true })
                  }
                  error={form.formState.errors.category}
                  className="w-full"
                />
                {form.formState.errors.category && (
                  <p role="alert" className="text-xs text-red-500">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label id="due-date-label" className="font-semibold">Due Date</Label>
                <div aria-labelledby="due-date-label">
                  <StrictDatePicker
                    name="dueDate"
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </div>
              </div>
            </section>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file-upload">
                Attach File <span className="text-xs font-normal text-gray-500">(PNG, JPEG, JPG, PDF up to 2MB)</span>
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full focus:ring-2 focus:ring-green-500"
                  accept=".png,.jpg,.jpeg,.pdf"
                  aria-describedby="file-upload-instructions"
                />
                <p id="file-upload-instructions" className="sr-only">
                  Max 5 files. Each file must be under 2MB.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-3" role="list" aria-label="Uploaded files">
                {files.map((file, index) => (
                  <div
                    key={index}
                    role="listitem"
                    className="border p-3 rounded-lg border-gray-300 flex items-center justify-between bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      {file.type === "application/pdf" ? (
                        <File className="text-green-500 w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Image className="text-green-500 w-4 h-4" aria-hidden="true" />
                      )}
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={refresh}
                className="w-full bg-green-500 hover:bg-green-600 py-6 text-lg focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                aria-live="assertive"
              >
                {refresh ? (
                  <>
                    <Loader className="animate-spin mr-2" aria-hidden="true" />
                    Creating...
                  </>
                ) : (
                  "Create Discussion"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}