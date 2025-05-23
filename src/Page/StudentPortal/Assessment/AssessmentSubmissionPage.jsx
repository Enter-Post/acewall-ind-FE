import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Loader } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import AssessmentResultCard from "@/CustomComponent/Assessment/AssessmentResultCard";

const AssessmentSubmissionPage = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  console.log(result, "result");

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axiosInstance.get(`/assessment/${id}`);
        setAssessment(res.data.assessment);
        setResult(res.data.submission);
      } catch (err) {
        setError("Failed to load assessment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  const createValidationSchema = (assessment) => {
    if (!assessment || !assessment.questions) return z.object({});
    const schemaShape = {};
    assessment.questions.forEach((question) => {
      const key = `question-${question._id}`;
      if (question.type === "mcq" || question.type === "truefalse") {
        schemaShape[key] = z.string().min(1, "Please select an answer");
      } else if (question.type === "qa") {
        schemaShape[key] = z.string().min(1, "Answer cannot be empty");
      }
    });
    return z.object(schemaShape);
  };

  const form = useForm({
    resolver: zodResolver(createValidationSchema(assessment)),
    defaultValues: { studentId: "" },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const answers = assessment.questions.map((question) => ({
      questionId: question._id,
      selectedAnswer: data[`question-${question._id}`],
    }));
    console.log(answers, "answers");

    try {
      const res = await axiosInstance.post(
        `/assessmentSubmission/submission/${assessment._id}`,
        answers
      );
      setResult(res.data);
      setSubmitted(true);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !assessment) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!assessment && !result) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>Assessment not found</AlertDescription>
      </Alert>
    );
  }

  if (result) {
    return <AssessmentResultCard submission={result} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {submitted ? (
        <Card className="w-full">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <CardTitle className="text-center">
              Assessment Submitted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {result.submission.totalScore === 0 ? (
              <>
                {" "}
                <p className="text-amber-600 text-center dark:text-amber-400 italic text-lg font-bold mt-4">
                  Thankyou for your submission your final score will be updated
                  soon
                </p>
              </>
            ) : (
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  Total Score: {result.submission.totalScore}
                </p>
                <p className="text-sm text-muted-foreground">
                  Submission Date:{" "}
                  {new Date(result.submission.submittedAt).toLocaleString()}
                </p>
                {!result.submission.graded && (
                  <p className="text-amber-600 dark:text-amber-400 italic text-sm mt-4">
                    Some of your answers require manual grading. Your final
                    score will be updated soon.
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="mt-4"
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{assessment.title}</CardTitle>
                <CardDescription>{assessment.description}</CardDescription>
              </CardHeader>
              <section>
                {assessment.files.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 border rounded-lg w-40 p-4 ml-5">
                    <FileText className="text-green-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {assessment.files.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {file.filename}
                        </a>
                      ))}
                    </span>
                  </div>
                )}
              </section>
              <CardContent>
                <div className="space-y-6 ">
                  {assessment?.questions?.map((question, index) => (
                    <Card key={question._id} className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            Question {index + 1}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            Points: {question.points}
                          </span>
                        </div>
                        <p
                          className="text-sm font-medium text-gray-800 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: ` ${question.question}`,
                          }}
                        />
                        <CardDescription className="text-base font-medium text-foreground mt-2">
                          {question.text}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {question.type === "mcq" && (
                          <FormField
                            control={form.control}
                            name={`question-${question._id}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="space-y-2"
                                  >
                                    {question.options.map(
                                      (option, optIndex) => (
                                        <div
                                          key={optIndex}
                                          className="flex items-center space-x-2"
                                        >
                                          <RadioGroupItem
                                            value={option}
                                            id={`q${question._id}-opt${optIndex}`}
                                          />
                                          <Label
                                            htmlFor={`q${question._id}-opt${optIndex}`}
                                          >
                                            {option}
                                          </Label>
                                        </div>
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {question.type === "truefalse" && (
                          <FormField
                            control={form.control}
                            name={`question-${question._id}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="true"
                                        id={`q${question._id}-true`}
                                      />
                                      <Label htmlFor={`q${question._id}-true`}>
                                        True
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="false"
                                        id={`q${question._id}-false`}
                                      />
                                      <Label htmlFor={`q${question._id}-false`}>
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

                        {question.type === "qa" && (
                          <FormField
                            control={form.control}
                            name={`question-${question._id}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Type your answer here..."
                                    className="min-h-[120px]"
                                    {...field}
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
                </div>
              </CardContent>
              {error && (
                <Alert variant="destructive" className="mx-6 mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <CardFooter className="flex justify-between">
                <Button type="submit">Submit Assessment</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AssessmentSubmissionPage;
