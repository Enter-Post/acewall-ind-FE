import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Loader, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { axiosInstance } from "@/lib/AxiosInstance";

const AssessmentTable = ({ title, items = [], isFinal = false }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No {title.toLowerCase()} available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm text-gray-700">{title}</h4>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs">Assessment</TableHead>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs">Score</TableHead>
              <TableHead className="text-xs">Max Points</TableHead>
              <TableHead className="text-xs">Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const percentage =
                item.maxPoints > 0
                  ? ((item.studentPoints / item.maxPoints) * 100).toFixed(1)
                  : 0;
              return (
                <TableRow key={index} className="text-xs">
                  <TableCell className="font-medium">
                    {item.assessmentTitle}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.studentPoints}</TableCell>
                  <TableCell>{item.maxPoints}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        percentage >= 90
                          ? "bg-green-100 text-green-800"
                          : percentage >= 80
                          ? "bg-blue-100 text-blue-800"
                          : percentage >= 70
                          ? "bg-yellow-100 text-yellow-800"
                          : percentage >= 60
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {percentage}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const tableHead = ["Course", "Average", "Grade"];

export default function Gradebook() {
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);
  const [gradeData, setGradeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch grade data from API
  useEffect(() => {
    const fetchGradeData = async () => {
      setLoading(true);

      await axiosInstance
        .get("gradebook/getOverallGradeReport")
        .then((res) => {
          console.log(res.data);
          setGradeData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    fetchGradeData();
  }, []);

  const toggleSubjectExpand = (courseId) => {
    if (expandedSubjectId === courseId) {
      setExpandedSubjectId(null);
    } else {
      setExpandedSubjectId(courseId);
    }
  };

  // Group assessments by category for display
  const groupAssessmentsByCategory = (assessments) => {
    const grouped = {};
    assessments.forEach((assessment) => {
      const category = assessment.category || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(assessment);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="justify-center items-center flex h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto space-y-6">
        <p className="text-xl py-4 mb-8 pl-6 rounded-lg font-semibold bg-acewall-main text-white">
          Grades
        </p>
        <Alert variant="destructive">
          <AlertDescription>Error loading grade data: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!gradeData) {
    return (
      <div className="container mx-auto space-y-6">
        <p className="text-xl py-4 mb-8 pl-6 rounded-lg font-semibold bg-acewall-main text-white">
          Grades
        </p>
        <Alert>
          <AlertDescription>No grade data available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* Overall Performance Card */}
      <p className="text-xl py-4 mb-8 pl-6 rounded-lg font-semibold bg-acewall-main text-white">
        Grades
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-green-500">
            Overall Academic Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Overall GPA</span>
                <span className="text-lg font-bold text-green-500">
                  {gradeData.overallGPA.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  {gradeData.courses.length} Course
                  {gradeData.courses.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects and Assessment Table */}
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHead.map((item, idx) => (
                  <TableHead key={idx}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeData?.courses?.map((course) => (
                <>
                  <TableRow
                    key={course.courseId}
                    className="text-xs md:text-sm"
                  >
                    <TableCell
                      className="cursor-pointer hover:text-green-600 flex items-center gap-2 font-medium"
                      onClick={() => toggleSubjectExpand(course.courseId)}
                    >
                      {expandedSubjectId === course.courseId ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                      <span>{course.courseName}</span>
                    </TableCell>
                    <TableCell>{course.grade.toFixed(2)}%</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.letterGrade === "A" ||
                          course.letterGrade === "A-" ||
                          course.letterGrade === "A+"
                            ? "bg-green-100 text-green-800"
                            : course.letterGrade === "B" ||
                              course.letterGrade === "B-" ||
                              course.letterGrade === "B+"
                            ? "bg-blue-100 text-blue-800"
                            : course.letterGrade === "C" ||
                              course.letterGrade === "C-" ||
                              course.letterGrade === "C+"
                            ? "bg-yellow-100 text-yellow-800"
                            : course.letterGrade === "D" ||
                              course.letterGrade === "D-" ||
                              course.letterGrade === "D+"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.letterGrade}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expandedSubjectId === course.courseId && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={3} className="p-0">
                        <div className="p-4 space-y-6">
                          {(() => {
                            const groupedAssessments =
                              groupAssessmentsByCategory(course.assessments);
                            return Object.entries(groupedAssessments).map(
                              ([category, assessments]) => (
                                <AssessmentTable
                                  key={category}
                                  title={category}
                                  items={assessments}
                                  isFinal={category
                                    .toLowerCase()
                                    .includes("final")}
                                />
                              )
                            );
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              {gradeData?.courses?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No courses or assessments found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
