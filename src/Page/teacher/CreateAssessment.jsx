"use client";

import { useEffect, useState } from "react";
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
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
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
import { useParams } from "react-router-dom";

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
    .min(2, { message: "At least 2 options are required" }),
  correctAnswer: z
    .string()
    .min(1, { message: "Please select the correct answer" }),
});

const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("truefalse"),
  correctAnswer: z.enum(["true", "false"], {
    required_error: "Please select the correct answer",
  }),
});

const qaQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("qa"),
  correctAnswer: z
    .string()
    .min(1, { message: "Please provide a model answer" }),
});

const questionSchema = z.discriminatedUnion("type", [
  mcqQuestionSchema,
  trueFalseQuestionSchema,
  qaQuestionSchema,
]);

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  questions: z
    .array(questionSchema)
    .min(1, { message: "At least one question is required" }),
});

export default function CreateAssessmentPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const [editorConfig] = useState({
    readonly: false,
    height: 200,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  });

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      chapter: "",
      course: "",
      lesson: "",
      questions: [
        {
          type: "mcq",
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  });

  const submitting = form.formState.isSubmitting;

  if(submitting) {
    toast.loading("Submitting...");
  }

  console.log(form.formState.errors, "form");

  // Use fieldArray to handle the dynamic questions array
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).filter((file) => {
      const isValidType =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB in bytes

      if (!isValidType) {
        toast.error(`File type must be PDF, DOC, or DOCX.`);
      }

      if (!isValidSize) {
        toast.error(`File exceeds the 5MB size limit.`);
      }

      return isValidType && isValidSize;
    });

    setSelectedFiles((prevFiles) => {
      const fileNames = new Set(prevFiles.map((f) => f.name));
      const uniqueNewFiles = newFiles.filter((f) => !fileNames.has(f.name));
      return [...prevFiles, ...uniqueNewFiles];
    });

    e.target.value = "";
  };

  const addQuestion = () => {
    append({
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      id: Date.now(),
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
    form.setValue(`questions.${questionIndex}.options`, [
      ...currentOptions,
      "",
    ]);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const currentOptions =
      form.getValues(`questions.${questionIndex}.options`) || [];
    if (currentOptions.length <= 2) return;

    const newOptions = [...currentOptions];
    newOptions.splice(optionIndex, 1);
    form.setValue(`questions.${questionIndex}.options`, newOptions);
  };

  const onSubmit = async (data) => {
    console.log(selectedFiles, "selectedFiles");
    console.log("ma chal raha ho");

    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append(params.type, params.id);
    formdata.append("questions", JSON.stringify(data.questions));
    selectedFiles.forEach((file) => {
      formdata.append("files", file);
    });

    await axiosInstance
      .post("assessment/create", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Create New Assessment</h2>
      <p className="text-gray-600 mb-6">
        Upload a new Assessment for students.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Assessment title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description and instructions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
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
                            <SelectItem value="mcq">Multiple Choice</SelectItem>
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

                  {form.watch(`questions.${questionIndex}.type`) === "mcq" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Answer Options</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(questionIndex)}
                          className="h-7 text-xs"
                        >
                          Add Option
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {form
                          .watch(`questions.${questionIndex}.options`)
                          ?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center gap-3"
                            >
                              <FormField
                                control={form.control}
                                name={`questions.${questionIndex}.correctAnswer`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value={optionIndex.toString()}
                                            id={`option-${question.id}-${optionIndex}`}
                                          />
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`questions.${questionIndex}.options.${optionIndex}`}
                                render={({ field }) => (
                                  <FormItem className="flex-1 space-y-0">
                                    <FormControl>
                                      <Input
                                        placeholder={`Option ${
                                          optionIndex + 1
                                        }`}
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
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
                                  ).length <= 2
                                }
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          ))}
                      </div>
                      <FormMessage>
                        {
                          form.formState.errors.questions?.[questionIndex]
                            ?.options?.message
                        }
                      </FormMessage>
                    </div>
                  )}

                  {form.watch(`questions.${questionIndex}.type`) === "qa" && (
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.correctAnswer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Model Answer (for teacher reference)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the expected answer"
                              {...field}
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
            {form.formState.errors.questions?.message && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.questions.message}
              </p>
            )}
          </div>

          {/* PDF and DOC Upload Section */}
          <div className="space-y-4 mt-6">
            <Label htmlFor="fileUpload">Upload PDF or DOC files</Label>
            <Input
              id="fileUpload"
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
              <div>
                <Label>Selected Files:</Label>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center">
                      <span className="truncate">{file.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-6">
            Submit Assessment
          </Button>
        </form>
      </Form>
    </div>
  );
}
