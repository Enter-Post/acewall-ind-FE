"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";
import JoditEditor from "jodit-react";

// Zod schema remains exactly as provided
const pdfFileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  });

const lessonSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(250000),
  youtubeLinks: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        /^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/)[\w-]{11}(&[^ ]*)?|youtu\.be\/[\w-]{11}(\?[^ ]*)?)$/.test(
          val
        ),
      {
        message: "Enter a valid YouTube video link",
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
    .array(pdfFileSchema)
    .optional()
    .refine(
      (files) =>
        !files || files.reduce((acc, file) => acc + (file?.size || 0), 0) <=
        5 * 1024 * 1024,
      {
        message: "Total file size must not exceed 5MB",
      }
    ),
});

const LessonModal = ({ type, chapterID, fetchQuarterDetail }) => {
  const [open, setOpen] = useState(false);
  const [pdfInputs, setPdfInputs] = useState([{ id: Date.now(), file: null }]);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const MAX_TITLE_LENGTH = 100;

  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [editorConfig] = useState({
    readonly: false,
    height: 200,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  });

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

  const calculateTotalSize = (files) =>
    files.reduce((acc, f) => acc + (f?.size || 0), 0);

  const handleFileChange = (id, file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    const updated = pdfInputs.map((input) =>
      input.id === id ? { ...input, file } : input
    );
    const newSize = calculateTotalSize(updated.map((i) => i.file));
    if (newSize > 5 * 1024 * 1024) {
      toast.error("Total file size exceeds 5MB");
      return;
    }
    setPdfInputs(updated);
    setTotalSize(newSize);
    setValue("pdfFiles", updated.map((i) => i.file).filter(Boolean), {
      shouldValidate: true,
    });
  };

  const handleAddField = () => {
    const currentTotal = calculateTotalSize(pdfInputs.map((i) => i.file));
    if (currentTotal >= 5 * 1024 * 1024) {
      toast.error("Cannot add more files. 5MB limit reached.");
      return;
    }
    setPdfInputs((prev) => [...prev, { id: Date.now(), file: null }]);
  };

  const handleRemoveField = (id) => {
    const updated = pdfInputs.filter((input) => input.id !== id);
    const newSize = calculateTotalSize(updated.map((i) => i.file));
    setPdfInputs(updated);
    setTotalSize(newSize);
    setValue("pdfFiles", updated.map((i) => i.file).filter(Boolean), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("youtubeLinks", data.youtubeLinks || "");
    formData.append("otherLink", data.otherLink || "");
    formData.append("chapter", chapterID);

    pdfInputs
      .map((input) => input.file)
      .filter(Boolean)
      .forEach((file) => {
        formData.append("pdfFiles", file);
      });

    try {
      const res = await axiosInstance.post("/lesson/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      fetchQuarterDetail();
      handleClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setPdfInputs([{ id: Date.now(), file: null }]);
    setTitleValue("");
    setDescValue("");
    setTotalSize(0);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="flex items-center gap-2 border border-blue-200 text-sm text-blue-700 ml-auto w-full bg-white p-2 cursor-pointer hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none rounded-md transition-colors"
          aria-label="Add a new lesson to this chapter"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Lesson
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90%] h-[80dvh] overflow-y-auto" id="lesson-modal-content">
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
          <DialogDescription>
            Fill in the lesson details. Upload only PDF files, max 5MB total.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Lesson Title */}
          <div>
            <Label htmlFor="lesson-title">Lesson Title</Label>
            <Input
              id="lesson-title"
              {...register("title")}
              value={titleValue}
              maxLength={MAX_TITLE_LENGTH}
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : "title-count"}
              onChange={(e) => {
                if (e.target.value.length <= MAX_TITLE_LENGTH) {
                  setTitleValue(e.target.value);
                  setValue("title", e.target.value);
                }
              }}
            />
            <div id="title-count" className="text-sm text-muted-foreground text-right" aria-live="polite">
              {titleValue.length}/{MAX_TITLE_LENGTH} characters
            </div>
            {errors.title && (
              <p id="title-error" className="text-red-500 text-sm" role="alert">{errors.title.message}</p>
            )}
          </div>

          {/* Lesson Description */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="description-editor">Lesson Description</Label>
            <div id="description-editor" className="focus-within:ring-2 focus-within:ring-blue-500 rounded-md">
                <JoditEditor
                  config={editorConfig}
                  value={descValue}
                  onChange={(newContent) => {
                    setDescValue(newContent);
                    setValue("description", newContent);
                  }}
                />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm" role="alert">{errors.description.message}</p>
            )}
          </div>

          {/* YouTube Links */}
          <div>
            <Label htmlFor="youtubeLinks">YouTube Link</Label>
            <Input 
              id="youtubeLinks" 
              {...register("youtubeLinks")} 
              placeholder="https://youtube.com/..."
              aria-invalid={errors.youtubeLinks ? "true" : "false"}
              aria-describedby={errors.youtubeLinks ? "youtube-error" : undefined}
            />
            {errors.youtubeLinks && (
              <p id="youtube-error" className="text-red-500 text-sm" role="alert">
                {errors.youtubeLinks.message}
              </p>
            )}
          </div>

          {/* Other Links */}
          <div>
            <Label htmlFor="otherLink">Other Link (Website)</Label>
            <Input 
              id="otherLink" 
              {...register("otherLink")} 
              placeholder="https://example.com"
              aria-invalid={errors.otherLink ? "true" : "false"}
              aria-describedby={errors.otherLink ? "otherlink-error" : undefined}
            />
            {errors.otherLink && (
              <p id="otherlink-error" className="text-red-500 text-sm" role="alert">{errors.otherLink.message}</p>
            )}
          </div>

          {/* PDF Files Section */}
          <fieldset className="space-y-2 border-t pt-4">
            <legend className="text-sm font-semibold mb-2">Lesson PDF Files <span className="text-xs text-muted-foreground font-normal">(optional)</span></legend>
            {pdfInputs.map((input, index) => (
              <div key={input.id} className="flex items-center gap-2 mt-2">
                <div className="flex-1">
                    <Label htmlFor={`file-${input.id}`} className="sr-only">Upload PDF file {index + 1}</Label>
                    <Input
                      id={`file-${input.id}`}
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        handleFileChange(input.id, e.target.files?.[0])
                      }
                      aria-label={`Select PDF file ${index + 1}`}
                    />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveField(input.id)}
                  disabled={pdfInputs.length === 1}
                  className="text-red-500 hover:bg-red-50 focus:ring-2 focus:ring-red-500"
                  aria-label={`Remove file ${index + 1}`}
                >
                  <Trash className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 focus:ring-2 focus:ring-blue-500"
              onClick={handleAddField}
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Another File
            </Button>

            <p className="text-gray-600 text-sm mt-1" role="status">
              Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB / 5 MB
            </p>

            {errors.pdfFiles && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {errors.pdfFiles.message}
              </p>
            )}
          </fieldset>

          {/* Actions */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Saving..." : "Save Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LessonModal;