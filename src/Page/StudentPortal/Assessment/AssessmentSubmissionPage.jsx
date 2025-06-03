"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Loader } from "lucide-react"
import { axiosInstance } from "@/lib/AxiosInstance"
import AssessmentResultCard from "@/CustomComponent/Assessment/AssessmentResultCard"

const AssessmentSubmissionPage = () => {
  const { id } = useParams()
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axiosInstance.get(`/assessment/${id}`)
        setAssessment(res.data.assessment)

        // If there's already a submission, set it and mark as submitted
        if (res.data.submission) {
          setResult(res.data.submission)
          setSubmitted(true)
        }
      } catch (err) {
        setError("Failed to load assessment. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchAssessment()
  }, [id])

  const createValidationSchema = (assessment) => {
    if (!assessment || !assessment.questions) return z.object({})
    const schemaShape = {}
    assessment.questions.forEach((question) => {
      const key = `question-${question._id}`
      if (question.type === "mcq" || question.type === "truefalse") {
        schemaShape[key] = z.string().min(1, "Please select an answer")
      } else if (question.type === "qa") {
        schemaShape[key] = z.string().min(1, "Answer cannot be empty")
      }
    })
    return z.object(schemaShape)
  }

  const form = useForm({
    resolver: zodResolver(createValidationSchema(assessment)),
    defaultValues: { studentId: "" },
  })

  const onSubmit = async (data) => {
    if (submitting) return
    setSubmitting(true)

    const answers = assessment.questions.map((question) => ({
      questionId: question._id,
      selectedAnswer: data[`question-${question._id}`],
    }))

    try {
      const res = await axiosInstance.post(`/assessmentSubmission/submission/${assessment._id}`, answers)

      // Check if the submission was auto-graded
      const submission = res.data.submission
      const isGraded = submission.graded

      setSubmitted(true)
      setResult(submission)

      if (isGraded) {
        toast.success("Assessment graded and submitted successfully!")
      } else {
        toast.success("Submission recorded. Awaiting manual review.")
      }

      navigate(`/student/assessment`)
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed")
      setSubmitting(false)
    }
  } 


  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show error if assessment couldn't be loaded
  if (error && !assessment) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Show error if assessment not found
  if (!assessment && !result) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>Assessment not found</AlertDescription>
      </Alert>
    )
  }

  // Render the result card if we have a result
  if (submitted && result) {
    return <AssessmentResultCard submission={result} />
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <section>
              {assessment.files && assessment.files.length > 0 && (
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
                        <CardTitle className="text-base">Question {index + 1}</CardTitle>
                        <span className="text-sm text-muted-foreground">Points: {question.points}</span>
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
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option} id={`q${question._id}-opt${optIndex}`} />
                                      <Label htmlFor={`q${question._id}-opt${optIndex}`}>{option}</Label>
                                    </div>
                                  ))}
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
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id={`q${question._id}-true`} />
                                    <Label htmlFor={`q${question._id}-true`}>True</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id={`q${question._id}-false`} />
                                    <Label htmlFor={`q${question._id}-false`}>False</Label>
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
                                <Textarea placeholder="Type your answer here..." className="min-h-[120px]" {...field} />
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
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Assessment"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default AssessmentSubmissionPage
