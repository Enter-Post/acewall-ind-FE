import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import JoditEditor from "jodit-react";

// // Dynamically import Jodit Editor to avoid SSR issues
// const JoditEditor = dynamic(() => import("jodit-react"), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>,
// });

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  chapter: z.string({ required_error: "Please select a chapter" }),
  lesson: z.string({ required_error: "Please select a lesson" }),
  assessmentType: z.enum(["truefalse", "mcq"], {
    required_error: "Please select an assessment type",
  }),
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters" }),
  // Conditionally validate based on assessment type
  correctAnswer: z.string().optional(),
  options: z.array(z.string()).optional(),
});

// Define the type based on the schema

export default function CreateAssessmentPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editorConfig] = useState({
    readonly: false,
    height: 300,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  });

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      chapter: "",
      lesson: "",
      assessmentType: "mcq",
      question: "",
      correctAnswer: "",
      options: ["", "", "", ""],
    },
  });

  const assessmentType = form.watch("assessmentType");

  // Handle file changes
  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    setSelectedFiles((prevFiles) => {
      const fileNames = new Set(prevFiles.map((f) => f.name));
      const uniqueNewFiles = newFiles.filter((f) => !fileNames.has(f.name));
      return [...prevFiles, ...uniqueNewFiles];
    });

    e.target.value = "";
  };

  // Handle form submission
  const onSubmit = (data) => {
    // Combine form data with files
    const formData = {
      ...data,
      files: selectedFiles,
    };

    console.log("Form submitted:", formData);
    // Here you would typically send the data to your API
  };

  // Handle option changes for MCQ
  const handleOptionChange = (index, value) => {
    const currentOptions = form.getValues("options") || ["", "", "", ""];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    form.setValue("options", newOptions, { shouldValidate: true });
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
                      placeholder="Enter Assessment description and instructions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Chapter and Lesson Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="chapter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chapter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="chapter1">Chapter 1</SelectItem>
                      <SelectItem value="chapter2">Chapter 2</SelectItem>
                      <SelectItem value="chapter3">Chapter 3</SelectItem>
                      <SelectItem value="chapter4">Chapter 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lesson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lesson1">Lesson 1</SelectItem>
                      <SelectItem value="lesson2">Lesson 2</SelectItem>
                      <SelectItem value="lesson3">Lesson 3</SelectItem>
                      <SelectItem value="lesson4">Lesson 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Assessment Type Selection */}
          <FormField
            control={form.control}
            name="assessmentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Assessment Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="truefalse" />
                      </FormControl>
                      <FormLabel className="font-normal">True/False</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mcq" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Multiple Choice
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question Editor */}
          <FormField
            control={form.control}
            name="question"
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

          {/* Conditional Answer Fields */}
          {assessmentType === "truefalse" && (
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">True</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">False</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {assessmentType === "mcq" && (
            <Card>
              <CardContent className="pt-6">
                <FormLabel className="mb-4 block">Answer Options</FormLabel>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[auto_1fr] gap-4 items-center"
                    >
                      <RadioGroup
                        value={form.getValues("correctAnswer")}
                        onValueChange={(value) =>
                          form.setValue("correctAnswer", value)
                        }
                        className="flex"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={index.toString()} />
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                      <div className="border rounded-md">
                        <JoditEditor
                          value={(form.getValues("options") || [])[index] || ""}
                          config={{ ...editorConfig, height: 100 }}
                          onBlur={(content) =>
                            handleOptionChange(index, content)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          /* PDF and DOC Upload Section */}
                <div className="space-y-4 mt-6">
                <Label htmlFor="fileUpload">Upload PDF(s) or DOC(s)</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple
                  onChange={handleFileChange}
                  className="bg-gray-50"
                />

                {selectedFiles.length > 0 && (
                  <ul className="text-sm text-green-600 space-y-1 mt-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>📄 {file.name}</li>
                  ))}
                  </ul>
                )}
                </div>

                {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save Assessment
            </Button>
            <Button type="button" variant="secondary">
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
