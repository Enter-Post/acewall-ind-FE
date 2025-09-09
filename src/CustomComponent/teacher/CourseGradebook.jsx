"use client";

import { useEffect, useState, Fragment } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";

const CourseGradebook = () => {
  const { courseId } = useParams();
  const [gradebook, setGradebook] = useState([]);
  const [hasSemesterStructure, setHasSemesterStructure] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [semesterExpanded, setSemesterExpanded] = useState({});
  const [quarterExpanded, setQuarterExpanded] = useState({});

  console.log(gradebook, "gradebook");
  console.log(hasSemesterStructure, "hasSemesterStructure");

  useEffect(() => {
    const fetchGradebook = async () => {
      try {
        const { data } = await axiosInstance.get(
          `gradebook/course/${courseId}`
        );
        setGradebook(data.gradebook);
        setHasSemesterStructure(data.hasSemesterStructure);
      } catch (error) {
        console.error("Failed to fetch gradebook", error);
      }
    };
    fetchGradebook();
  }, [courseId]);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSemesterExpand = (studentId, semesterId) => {
    const key = `${studentId}-${semesterId}`;
    setSemesterExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleQuarterExpand = (studentId, semesterId, quarterId) => {
    const key = `${studentId}-${semesterId}-${quarterId}`;
    setQuarterExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasGradeData = (student) => {
    if (hasSemesterStructure) {
      return student.semesters && student.semesters.length > 0;
    } else {
      return student.assessments && student.assessments.length > 0;
    }
  };

  const renderAssessmentTable = (assessments) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Assessment</TableHead>
          <TableHead className="text-xs">Category</TableHead>
          <TableHead className="text-center text-xs">Score</TableHead>
          <TableHead className="text-center text-xs">Percentage</TableHead>
          <TableHead className="text-center text-xs">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment) => (
          <TableRow key={assessment.assessmentId}>
            <TableCell className="text-sm">
              {assessment.assessmentTitle}
            </TableCell>
            <TableCell className="text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {assessment.category}
              </span>
            </TableCell>
            <TableCell className="text-center text-sm font-medium">
              {assessment.studentPoints}/{assessment.maxPoints}
            </TableCell>
            <TableCell className="text-center text-sm">
              {assessment.maxPoints > 0
                ? `${((assessment.studentPoints / assessment.maxPoints) * 100).toFixed(1)}%`
                : "N/A"}
            </TableCell>
            <TableCell className="text-center text-sm">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                assessment.isDiscussion 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {assessment.isDiscussion ? 'Discussion' : 'Assessment'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderSemesterStructure = (student) => (
    <>
      {student.semesters.length === 0 ? (
        <p className="text-xs text-gray-400 mt-4">
          No academic performance data available
        </p>
      ) : (
        student.semesters.map((semester) => (
          <div
            key={semester.semesterId}
            className="border rounded-lg p-4 bg-white"
          >
            <div className="flex items-center gap-2 mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toggleSemesterExpand(student.studentId, semester.semesterId)
                }
                className="p-1 h-6 w-6"
              >
                {semesterExpanded[`${student.studentId}-${semester.semesterId}`] ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
              <h4 className="font-semibold text-lg">{semester.semesterTitle}</h4>
            </div>

            {semesterExpanded[`${student.studentId}-${semester.semesterId}`] && (
              <div className="ml-6 space-y-3">
                {semester.quarters.map((quarter) => (
                  <div
                    key={quarter.quarterId || 'no-quarter'}
                    className="border-l-2 border-gray-200 pl-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toggleQuarterExpand(
                            student.studentId,
                            semester.semesterId,
                            quarter.quarterId || 'no-quarter'
                          )
                        }
                        className="p-1 h-5 w-5"
                      >
                        {quarterExpanded[
                          `${student.studentId}-${semester.semesterId}-${quarter.quarterId || 'no-quarter'}`
                        ] ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </Button>
                      <h5 className="font-medium">{quarter.quarterTitle}</h5>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm font-medium">
                          {quarter.grade}%
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {quarter.letterGrade}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          GPA: {quarter.gpa}
                        </span>
                      </div>
                    </div>

                    {quarterExpanded[
                      `${student.studentId}-${semester.semesterId}-${quarter.quarterId || 'no-quarter'}`
                    ] && (
                      <div className="mt-3">
                        {renderAssessmentTable(quarter.assessments)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </>
  );

  const renderCourseStructure = (student) => (
    <>
      {!student.assessments || student.assessments.length === 0 ? (
        <p className="text-xs text-gray-400 mt-4">
          No assessment data available
        </p>
      ) : (
        <div className="border rounded-lg p-4 bg-white">
          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-2">Course Assessments</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Overall Grade: <span className="font-medium text-foreground">{student.finalGrade}%</span></span>
              <span>Letter Grade: 
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-1">
                  {student.letterGrade}
                </span>
              </span>
              <span>GPA: <span className="font-medium text-foreground">{student.gpa}</span></span>
            </div>
          </div>
          {renderAssessmentTable(student.assessments)}
        </div>
      )}
    </>
  );

  return (
    <>
      <BackButton label="Back" className="mb-4" />
      <Card className="p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Gradebook
            {!hasSemesterStructure && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (Course-level grading)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4" />
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Final Grade</TableHead>
                <TableHead className="text-center">Letter Grade</TableHead>
                <TableHead className="text-center">GPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradebook.map((student) => (
                <Fragment key={student.studentId}>
                  <TableRow>
                    <TableCell className="w-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpand(student.studentId)}
                      >
                        {expanded[student.studentId] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.studentName}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {!hasGradeData(student) ? "--" : `${student.finalGrade}%`}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {!hasGradeData(student) ? "--" : student.letterGrade}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {!hasGradeData(student) ? "--" : student.gpa}
                    </TableCell>
                  </TableRow>

                  {expanded[student.studentId] && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted/20 px-6 py-4">
                        <div className="space-y-4">
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            {hasSemesterStructure 
                              ? "Academic Performance Breakdown" 
                              : "Assessment Performance"}
                          </p>

                          {hasSemesterStructure 
                            ? renderSemesterStructure(student)
                            : renderCourseStructure(student)
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseGradebook;