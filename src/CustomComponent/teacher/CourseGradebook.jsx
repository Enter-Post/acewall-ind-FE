"use client";

import { useEffect, useState, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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

const CourseGradebook = () => {
  const { courseId } = useParams();
  const [gradebook, setGradebook] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchGradebook = async () => {
      try {
        const { data } = await axiosInstance.get(`gradebook/course/${courseId}`);
        setGradebook(data.gradebook);
      } catch (error) {
        console.error("Failed to fetch gradebook", error);
      }
    };
    fetchGradebook();
  }, [courseId]);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Card className="p-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Gradebook</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-4" />
              <TableHead>Student</TableHead>
              <TableHead className="text-center">Final Grade</TableHead>
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
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell className="text-center">
                    {student.finalGrade}%
                  </TableCell>
                  <TableCell className="text-center">{student.gpa}</TableCell>
                </TableRow>

                {expanded[student.studentId] && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-muted/20 px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Assessments
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-center">Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {student.assessments.map((a) => (
                              <TableRow key={a.assessmentId}>
                                <TableCell>{a.assessmentTitle}</TableCell>
                                <TableCell>{a.category}</TableCell>
                                <TableCell className="text-center">
                                  {a.studentPoints}/{a.maxPoints}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
  );
};

export default CourseGradebook;
