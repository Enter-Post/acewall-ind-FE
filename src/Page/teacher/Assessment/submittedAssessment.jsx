"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, Loader } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useParams } from "react-router-dom";

const AssessmentReview = () => {
  const { id } = useParams();
  const [manualGrades, setManualGrades] = useState({});
  const [submission, setSubmission] = useState(null);
  const [totalScore, setTotalScore] = useState(
    submission?.answers?.reduce(
      (total, answer) => total + (answer.pointsAwarded || 0),
      0
    )
  );
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(manualGrades, "manualGrades");

  useEffect(() => {
    const fetchSubmission = async () => {
      await axiosInstance
        .get(`/assessmentSubmission/submission/${id}`)
        .then((response) => {
          console.log(response.data);
          setSubmission(response.data.submission);
        })
        .catch((error) => {
          console.error("Error fetching submission:", error);
        });
    };
    fetchSubmission();
  }, [loading]);

  const handleGradeChange = (questionId, points, maxPoints) => {
    const newGrades = {
      ...manualGrades,
      [questionId]: {
        awardedPoints: Number(points),
        maxPoints: Number(maxPoints),
      },
    };
    setManualGrades(newGrades);

    const newTotal = submission.answers.reduce((total, answer) => {
      if (answer.requiresManualCheck) {
        return total + (newGrades[answer.questionId]?.awardedPoints || 0);
      }
      return total + (answer.pointsAwarded || 0);
    }, 0);

    setTotalScore(newTotal);
  };

  const handleSubmitGrades = async () => {
    setLoading(true);
    await axiosInstance
      .put(`/assessmentSubmission/teacherGrading/${id}`, manualGrades)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting grades:", error);
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={submission?.studentId?.profileImg || "/placeholder.svg"}
                  alt={`${submission?.studentId?.firstName} ${submission?.studentId?.lastName}`}
                />
                <AvatarFallback>
                  {submission?.studentId?.firstName[0]}
                  {submission?.studentId?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>
                  {submission?.studentId?.firstName}
                  {submission?.studentId?.lastName}
                </CardTitle>
                <CardDescription>
                  {submission?.studentId?.email}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    submission?.status === "before due date"
                      ? "success"
                      : "destructive"
                  }
                >
                  {submission?.status}{" "}
                </Badge>
                <Badge variant={submission?.graded ? "outline" : "secondary"}>
                  {submission?.graded ? "Graded" : "Needs Grading"}
                </Badge>
              </div>
              <CardDescription>
                Submitted on: {formatDate(submission?.createdAt)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Assessment Summary</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Assessment ID</p>
                <p className="font-medium">{submission?.assessment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Current {submission?.totalScore > 0 ? "Points" : "Point"}
                </p>
                <p className="font-medium">{submission?.totalScore} points</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Questions ({submission?.answers?.length})
              </TabsTrigger>
              <TabsTrigger value="manual">
                Needs Grading (
                {
                  submission?.answers?.filter((a) => a.requiresManualCheck)
                    .length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="auto">
                Graded (
                {
                  submission?.answers?.filter((a) => !a.requiresManualCheck)
                    .length
                }
                )
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-6">
                {submission?.answers?.map((answer, index) => (
                  <QuestionCard
                    key={answer._id || index}
                    answer={answer}
                    index={index}
                    manualGrades={manualGrades}
                    onGradeChange={handleGradeChange}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="manual">
              <div className="space-y-6">
                {submission?.answers
                  ?.filter((a) => a.requiresManualCheck)
                  .map((answer, index) => (
                    <QuestionCard
                      key={answer._id || index}
                      answer={answer}
                      index={index}
                      manualGrades={manualGrades}
                      onGradeChange={handleGradeChange}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="auto">
              <div className="space-y-6">
                {submission?.answers
                  ?.filter((a) => !a.requiresManualCheck)
                  .map((answer, index) => (
                    <QuestionCard
                      key={answer._id || index}
                      answer={answer}
                      index={index}
                      manualGrades={manualGrades}
                      onGradeChange={handleGradeChange}
                      setError={setError}
                      error={error}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6">
          <div className="text-lg font-semibold">
            Total Score: {totalScore} points
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handleSubmitGrades()}
            disabled={
              submission?.answers?.filter((a) => a.requiresManualCheck)
                .length === 0
            }
          >
            {loading ? <Loader className="animate-spin" /> : "Submit Grades"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const QuestionCard = ({
  answer,
  index,
  manualGrades,
  onGradeChange,
  setError = () => {},
  error = {},
}) => {
  const questionType = answer?.questionDetails?.type || "unknown";
  const maxPoints = answer?.questionDetails?.points || 0;

  const handleError = (questionId, message) => {
    setError((prevErrors) => {
      if (!message) {
        const { [questionId]: _, ...rest } = prevErrors;
        return rest;
      }
      return {
        ...prevErrors,
        [questionId]: message,
      };
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">Question {index + 1}</CardTitle>
            <CardDescription>
              {questionType === "mcq"
                ? "Multiple Choice"
                : questionType === "truefalse"
                ? "True/False"
                : questionType === "qa"
                ? "Question & Answer"
                : "Unknown Type"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {answer?.requiresManualCheck ? (
              <Badge
                variant="warning"
                className="bg-amber-100 text-amber-800 hover:bg-amber-100"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Needs Manual Grading
              </Badge>
            ) : answer?.isCorrect ? (
              <Badge
                variant="success"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Correct
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="bg-red-100 text-red-800 hover:bg-red-100"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Incorrect
              </Badge>
            )}
            <Badge variant="outline">
              {`${answer?.pointsAwarded || 0}/${maxPoints} points`}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Question:</h4>
            <div
              className="p-3 bg-slate-50 rounded-md"
              dangerouslySetInnerHTML={{
                __html: answer?.questionDetails?.question || "",
              }}
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Student's Answer:</h4>
            <div className="p-3 bg-slate-50 rounded-md">
              {questionType === "truefalse" ? (
                <span className="font-medium">
                  {answer?.selectedAnswer === "true" ? "True" : "False"}
                </span>
              ) : questionType === "mcq" ? (
                <span className="font-medium">
                  Option: {answer?.selectedAnswer}
                </span>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: answer?.selectedAnswer || "",
                  }}
                />
              )}
            </div>
          </div>

          {answer.requiresManualCheck && (
            <div className="pt-2">
              <h4 className="font-medium mb-2">Assign Points:</h4>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max={maxPoints}
                  value={manualGrades[answer?.questionId]?.awardedPoints || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value > maxPoints) {
                      handleError(
                        answer?.questionId,
                        `Points cannot exceed ${maxPoints}`
                      );
                      return;
                    } else if (value < 0) {
                      handleError(
                        answer?.questionId,
                        `Points cannot be negative`
                      );
                      return;
                    } else {
                      handleError(answer?.questionId, null); // Clear error
                    }

                    onGradeChange(
                      answer?.questionId,
                      e.target.value,
                      maxPoints
                    );
                  }}
                />
                {error?.[answer?.questionId] && (
                  <p className="text-sm text-red-600">
                    {error[answer?.questionId]}
                  </p>
                )}
                <span className="text-sm text-muted-foreground">
                  out of {maxPoints} points
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentReview;
