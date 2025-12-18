"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import CategoryDropdown from "@/CustomComponent/Assessment/Assessment-category-dropdown";
import StrictDatePicker from "@/CustomComponent/Assessment/DueDatePicker";
import { Pen, Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  category: z.string().min(1, "Please select a category"),
  dueDate: z.object({
    dateTime: z
      .preprocess(
        (val) =>
          typeof val === "string" || val instanceof Date ? new Date(val) : val,
        z.date({ required_error: "Due date is required" })
      )
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: "Please select a valid due date",
      }),
  }),
});

export default function EditAssessmentDialog({ assessment, fetchAssessment }) {
  const { type, id } = useParams();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchQuarterDate = async () => {
      try {
        const res = await axiosInstance.get(
          `quarter/getDatesofQuarter/${assessment.quarter}`
        );
        setStartDate(new Date(res.data.startDate));
        setEndDate(new Date(res.data.endDate));
      } catch (err) {
        console.error("Error fetching dates:", err);
      }
    };
    fetchQuarterDate();
  }, [open, assessment.quarter]);

  const minDate = startDate < endDate ? startDate : endDate;
  const maxDate = endDate > startDate ? endDate : startDate;

  const combineDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    const combinedStr = `${dateStr.split("T")[0]}T${timeStr}`;
    const dateTime = new Date(combinedStr);
    return isNaN(dateTime.getTime()) ? null : dateTime;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: assessment.title || "",
      description: assessment.description || "",
      category: assessment.category?._id || "",
      dueDate: {
        dateTime: combineDateTime(
          assessment.dueDate?.date,
          assessment.dueDate?.time
        ),
      },
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Updating assessment...");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append(type, id);

      const dueDate = new Date(data.dueDate.dateTime);
      if (dueDate >= minDate && dueDate <= maxDate) {
        formData.append("dueDate", dueDate.toISOString());
      } else {
        toast.error("Due date must be within the quarter range", { id: toastId });
        setIsSubmitting(false);
        return;
      }

      const res = await axiosInstance.put(
        `assessment/editAssessment/${assessment._id}`,
        formData
      );

      toast.success(res.data.message || "Updated successfully", { id: toastId });
      fetchAssessment();
      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 text-blue-600 hover:text-blue-700" 
          aria-label="Edit Assessment"
        >
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Assessment</DialogTitle>
          <DialogDescription>
            Update the assessment details and ensure the due date falls within the quarter.
          </DialogDescription>
        </DialogHeader>

        

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-assessment-title">Title</FormLabel>
                  <FormControl>
                    <Input id="edit-assessment-title" {...field} placeholder="Enter Assessment Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-assessment-desc">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      id="edit-assessment-desc"
                      {...field} 
                      placeholder="Describe what students need to do..." 
                      className="min-h-[120px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Category</FormLabel>
                  <FormControl>
                    <CategoryDropdown
                      assessmentId={assessment._id}
                      courseId={assessment.course}
                      value={field.value}
                      onValueChange={field.onChange}
                      error={form.formState.errors.category?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label id="due-date-label">Due Date and Time</Label>
              <StrictDatePicker
                name="dueDate"
                minDate={minDate}
                maxDate={maxDate}
                aria-labelledby="due-date-label"
              />
              {form.formState.errors?.dueDate?.dateTime && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.dueDate.dateTime.message}
                </p>
              )}
            </div>

            <DialogFooter className="sticky bottom-0 bg-white pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}