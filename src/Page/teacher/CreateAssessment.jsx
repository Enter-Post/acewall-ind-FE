"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";
import JoditEditor from "jodit-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import DueDatePicker from "@/CustomComponent/Assessment/DueDatePicker";
import CategoryDropdown from "@/CustomComponent/Assessment/Assessment-category-dropdown";

// Define the form schema with Zod
const optionSchema = z.string().min(1, { message: "Option cannot be empty" });

const baseQuestionSchema = z.object({
  type: z.enum(["mcq", "truefalse", "qa"], {
    required_error: "Please select a question type",
  }),
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters" }),
});

const mcqQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("mcq"),
  options: z
    .array(optionSchema)
    .min(2, { message: "At least 2 options are required" })
    .max(4, { message: "Maximum 4 options are allowed" }),
  correctAnswer: z
    .string()
    .min(1, { message: "Please select the correct answer" }),
  points: z
    .number({
      required_error: "Points are required",
      invalid_type_error: "Points must be a number",
    })
    .min(1, { message: "Points must be at least 1" })
    .max(9, { message: "Points must not exceed 9" }),
});

const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("truefalse"),
  correctAnswer: z.enum(["true", "false"], {
    required_error: "Please select the correct answer",
  }),
  points: z
    .number({
      required_error: "Points are required",
      invalid_type_error: "Points must be a number",
    })
    .min(1, { message: "Points must be at least 1" })
    .max(9, { message: "Points must not exceed 9" }),
});

const qaQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("qa"),
  points: z
    .number({
      required_error: "Points are required",
      invalid_type_error: "Points must be a number",
    })
    .min(1, { message: "Points must be at least 1" })
    .max(9, { message: "Points must not exceed 9" }),
});

const questionSchema = z.discriminatedUnion("type", [
  mcqQuestionSchema,
  trueFalseQuestionSchema,
  qaQuestionSchema,
]);

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(120, { message: "Title cannot exceed 120 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),

  category: z.string().min(1, { message: "Please select a category" }),

  questions: z
    .array(questionSchema)
    .refine(
      (questions) => {
        // allow empty array
        if (questions.length === 0) return true;
        // validate all questions
        return questions.every((q) => questionSchema.safeParse(q).success);
      },
      {
        message: "Invalid question data",
      }
    ),

  dueDate: z.object({
    date: z.string().min(1, { message: "Please select a date" }),
    time: z.string().min(1, { message: "Please select a time" }),
    dateTime: z
      .string()
      .min(1, { message: "Selected time must be in the future" })
      .nullable(),
  }),
});


export default function CreateAssessmentPage() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const params = useParams();
  const TITLE_LIMIT = 120;
  const DESC_LIMIT = 1000;
  const [editorConfig] = useState({
    readonly: false,
    height: 200,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  });

  const [startingdate, setstartingdate] = useState()
  const [endingdate, setendingdate] = useState()

  const courseId = params.courseId;

  useEffect(() => {
    axiosInstance
      .get(`course/getcourseDueDate/${courseId}`)
      .then((res) => {
        setstartingdate(new Date(res.data.startingDate));
        setendingdate(new Date(res.data.endingDate));
        const start = new Date(res.data.startingDate);
        const end = new Date(res.data.endingDate);

        const formattedStartDate = start.toISOString().split("T")[0];
        const formattedEndDate = end.toISOString().split("T")[0];

        console.log("Start Date:", formattedStartDate); // "2025-06-05"
        console.log("End Date:", formattedEndDate);
      })
      .catch((err) => {
        console.error("Failed to fetch due date:", err);
      });
  }, [courseId]);



  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  // Add this near the top of the component, after the useState declarations
  const handleOptionChange = useCallback((e, field) => {
    field.onChange(e.target.value);
  }, []);

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      chapter: "",
      course: "",
      lesson: "",
      category: "",
      questions: [],
      dueDate: {
        date: "",
        time: "",
        dateTime: null,
      },
    },
  });

  console.log(form.formState.errors, "form");

  // Use fieldArray to handle the dynamic questions array
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      const isValidType =
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "image/jpeg";
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast.error("Some files were invalid or too large.");
    }

    setSelectedFiles(validFiles);
  };


  const addQuestion = () => {
    append({
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const removeQuestion = (index) => {
    if (fields.length <= 1) return;
    remove(index);
  };

  const moveQuestion = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    ) {
      return;
    }
    const newIndex = direction === "up" ? index - 1 : index + 1;
    move(index, newIndex);
  };

  const addOption = (questionIndex) => {
    const currentOptions =
      form.getValues(`questions.${questionIndex}.options`) || [];
    // Only add if less than 4 options
    if (currentOptions.length < 4) {
      form.setValue(`questions.${questionIndex}.options`, [
        ...currentOptions,
        "",
      ]);
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    const currentOptions =
      form.getValues(`questions.${questionIndex}.options`) || [];
    // Only remove if more than 2 options
    if (currentOptions.length > 2) {
      const newOptions = [...currentOptions];
      newOptions.splice(optionIndex, 1);
      form.setValue(`questions.${questionIndex}.options`, newOptions);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // prevent double submission

    setIsSubmitting(true);
    const toastId = toast.loading("Creating assessment...");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      const dueDate = new Date(data.dueDate.dateTime);
      if (dueDate >= startingdate && dueDate < endingdate) {

        formData.append("dueDate", data.dueDate.dateTime);
      }

      console.log(formData.endingdate, "dueDate")
      console.log(data.dueDate);

      formData.append(params.type, params.id);
      formData.append("questions", JSON.stringify(data.questions));
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });
      }
      const res = await axiosInstance.post("assessment/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message, { id: toastId });
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to create assessment", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };






  const { watch, control, formState } = form;




  return (
    <div className="mx-auto p-6 bg-white rounded-lg max-w-4xl">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Create New Assessment</h2>
      <p className="text-gray-600 mb-6">
        Upload a new Assessment for students.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={TITLE_LIMIT}
                      onChange={(e) => {
                        if (e.target.value.length <= TITLE_LIMIT) {
                          field.onChange(e);
                        }
                      }}
                      placeholder="Enter Assessment title"
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground text-right">
                    {field.value.length}/{TITLE_LIMIT}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      maxLength={DESC_LIMIT}
                      onChange={(e) => {
                        if (e.target.value.length <= DESC_LIMIT) {
                          field.onChange(e);
                        }
                      }}
                      placeholder="Enter description and instructions"
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground text-right">
                    {field.value.length}/{DESC_LIMIT}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoryDropdown
                    courseId={params.courseId}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={form.formState.errors.category?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="text-lg font-semibold mb-2">Due Date</h3>
            <DueDatePicker
              name="dueDate"
              minDate={startingdate}
              maxDate={endingdate}
            />
          </div>

          {/* Questions Section */}
          {fields.length > 0 && (
            <div className="space-y-6">
              {fields.map((question, questionIndex) => (
                <Card key={question.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        Question {questionIndex + 1}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveQuestion(questionIndex, "up")}
                          disabled={questionIndex === 0}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronUp size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveQuestion(questionIndex, "down")}
                          disabled={questionIndex === fields.length - 1}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronDown size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(questionIndex)}
                          disabled={fields.length <= 1}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Question Type */}
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mcq">
                                Multiple Choice
                              </SelectItem>
                              <SelectItem value="truefalse">
                                True/False
                              </SelectItem>
                              <SelectItem value="qa">
                                Question & Answer
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question Points */}
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.points`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Points</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={1}
                              max={9}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value >= 1 && value <= 9) {
                                  field.onChange(value);
                                } else {
                                  field.onChange(""); // optional: clear or block invalid input
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question Content */}
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <div className="border rounded-md">
                              <JoditEditor
                                value={field.value}
                                config={editorConfig}
                                onBlur={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question-specific answer fields */}
                    {form.watch(`questions.${questionIndex}.type`) ===
                      "truefalse" && (
                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.correctAnswer`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Correct Answer</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex space-x-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="true"
                                      id={`true-${question.id}`}
                                    />
                                    <Label
                                      htmlFor={`true-${question.id}`}
                                      className="font-normal"
                                    >
                                      True
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="false"
                                      id={`false-${question.id}`}
                                    />
                                    <Label
                                      htmlFor={`false-${question.id}`}
                                      className="font-normal"
                                    >
                                      False
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    {/* MCQs */}
                    {form.watch(`questions.${questionIndex}.type`) ===
                      "mcq" && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Answer Options</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(questionIndex)}
                              disabled={
                                form.watch(`questions.${questionIndex}.options`)
                                  ?.length >= 4
                              }
                              className="h-7 text-xs"
                            >
                              Add Option
                            </Button>
                          </div>

                          {form.watch(`questions.${questionIndex}.options`)
                            ?.length >= 4 && (
                              <p className="text-xs text-muted-foreground">
                                Maximum of 4 options allowed.
                              </p>
                            )}

                          <RadioGroup
                            value={form.watch(
                              `questions.${questionIndex}.correctAnswer`
                            )}
                            onValueChange={(val) => {
                              // console.log(val, "val");
                              form.setValue(
                                `questions.${questionIndex}.correctAnswer`,
                                val
                              );
                            }}
                            className="space-y-3"
                          >
                            {form
                              .watch(`questions.${questionIndex}.options`)
                              ?.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center gap-3"
                                >
                                  <RadioGroupItem
                                    value={
                                      form.watch(
                                        `questions.${questionIndex}.options.${optionIndex}`
                                      ) || ""
                                    }
                                    id={`option-${questionIndex}-${optionIndex}`}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`questions.${questionIndex}.options.${optionIndex}`}
                                    render={({ field }) => (
                                      <Input
                                        {...field}
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className="flex-1"
                                        onChange={(e) => {
                                          field.onChange(e.target.value);
                                        }}
                                      />
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeOption(questionIndex, optionIndex)
                                    }
                                    disabled={
                                      form.watch(
                                        `questions.${questionIndex}.options`
                                      )?.length <= 2
                                    }
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              ))}
                          </RadioGroup>

                          <FormMessage>
                            {
                              form.formState.errors.questions?.[questionIndex]
                                ?.options?.message
                            }
                          </FormMessage>
                          <FormMessage>
                            {
                              form.formState.errors.questions?.[questionIndex]
                                ?.correctAnswer?.message
                            }
                          </FormMessage>
                        </div>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {form.formState.errors.questions?.message && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.questions.message}
            </p>
          )}

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button
              type="button"
              onClick={addQuestion}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add Question
            </Button>
          </div>



          {/* PDF and DOC Upload Section */}
          <div className="space-y-4 mt-6">
            <Label htmlFor="fileUpload">Upload PDF, DOCX, or JPEG file</Label>
            <Input
              id="fileUpload"
              type="file"
              multiple
              accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg"
              onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
              <div>
                <Label>Selected Files:</Label>
                <div className="space-y-4 mt-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="border p-3 rounded relative">
                      <p className="text-sm text-gray-700 truncate">{file.name}</p>

                      {file.type === "application/pdf" ? (
                        <iframe
                          src={URL.createObjectURL(file)}
                          title={`PDF Preview ${idx}`}
                          className="w-full h-64 border rounded mt-2"
                        />
                      ) : file.type === "image/jpeg" ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`JPEG Preview ${idx}`}
                          className="w-full max-h-64 object-contain border rounded mt-2"
                        />
                      ) : (
                        <a
                          href={URL.createObjectURL(file)}
                          download={file.name}
                          className="text-blue-600 underline mt-2 inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download/View DOCX
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>


          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assessment"}
          </Button>

        </form>
      </Form>
    </div >
  );
}
