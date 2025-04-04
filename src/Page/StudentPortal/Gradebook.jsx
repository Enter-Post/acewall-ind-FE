"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { AssessmentTable } from "@/CustomComponent/GradebookCmp.jsx/AssessmentTable"

// Sample data
const subjectsData = [
  {
    id: "env-sci",
    subject: "Environmental Science 101",
    assignments: [
      { id: "env-1", title: "Essay on Climate Change", chapter: 1, marks: 100, obtMarks: 80 },
      { id: "env-2", title: "Research on Renewable Energy", chapter: 2, marks: 100, obtMarks: 85 },
      { id: "env-3", title: "Ecosystem Analysis", chapter: 3, marks: 100, obtMarks: 90 },
    ],
    quizzes: [
      { id: "env-q1", title: "Quiz 1", chapter: 1, marks: 50, obtMarks: 40 },
      { id: "env-q2", title: "Quiz 2", chapter: 2, marks: 50, obtMarks: 45 },
    ],
    finalTest: { id: "env-final", title: "Final Exam", marks: 200, obtMarks: 170 },
  },
  {
    id: "calc",
    subject: "Calculus II",
    assignments: [
      { id: "calc-1", title: "Math Assignment 1", chapter: 1, marks: 100, obtMarks: 75 },
      { id: "calc-2", title: "Math Assignment 2", chapter: 2, marks: 100, obtMarks: 82 },
      { id: "calc-3", title: "Math Assignment 3", chapter: 3, marks: 100, obtMarks: 78 },
    ],
    quizzes: [
      { id: "calc-q1", title: "Quiz 1", chapter: 1, marks: 50, obtMarks: 38 },
      { id: "calc-q2", title: "Quiz 2", chapter: 2, marks: 50, obtMarks: 42 },
    ],
    finalTest: { id: "calc-final", title: "Final Exam", marks: 200, obtMarks: 160 },
  },
  {
    id: "hist",
    subject: "World History",
    assignments: [
      { id: "hist-1", title: "History Essay", chapter: 1, marks: 100, obtMarks: 88 },
      { id: "hist-2", title: "History Presentation", chapter: 2, marks: 100, obtMarks: 92 },
      { id: "hist-3", title: "Historical Analysis", chapter: 3, marks: 100, obtMarks: 85 },
    ],
    quizzes: [
      { id: "hist-q1", title: "Quiz 1", chapter: 1, marks: 50, obtMarks: 44 },
      { id: "hist-q2", title: "Quiz 2", chapter: 2, marks: 50, obtMarks: 47 },
    ],
    finalTest: { id: "hist-final", title: "Final Exam", marks: 200, obtMarks: 180 },
  },
]
const tableHead = ["Subject", "Average", "Grade"];

export default function Gradebook() {
  const [search, setSearch] = useState("")
  const [expandedSubjectId, setExpandedSubjectId] = useState(null)

  // Calculate average for each subject
  const subjectsWithAverage = subjectsData.map((subject) => {
    const totalMarks = subject.assignments.reduce((sum, assignment) => sum + assignment.marks, 0)
    const totalObtained = subject.assignments.reduce((sum, assignment) => sum + assignment.obtMarks, 0)
    const average = (totalObtained / totalMarks) * 100

    // Determine grade
    let grade = "F"
    if (average >= 90) grade = "A"
    else if (average >= 80) grade = "B"
    else if (average >= 70) grade = "C"
    else if (average >= 60) grade = "D"

    return {
      ...subject,
      average,
      grade,
    }
  })

  // Calculate overall average
  const overallTotalMarks = subjectsData.reduce(
    (sum, subject) => sum + subject.assignments.reduce((sum, assignment) => sum + assignment.marks, 0),
    0,
  )

  const overallObtainedMarks = subjectsData.reduce(
    (sum, subject) => sum + subject.assignments.reduce((sum, assignment) => sum + assignment.obtMarks, 0),
    0,
  )

  const overallAverage = (overallObtainedMarks / overallTotalMarks) * 100

  // Determine overall grade
  let overallGrade = "F"
  if (overallAverage >= 90) overallGrade = "A"
  else if (overallAverage >= 80) overallGrade = "B"
  else if (overallAverage >= 70) overallGrade = "C"
  else if (overallAverage >= 60) overallGrade = "D"

  // Filter subjects based on search
  const filteredSubjects = subjectsWithAverage.filter(
    (subject) =>
      subject.subject.toLowerCase().includes(search.toLowerCase()) ||
      subject.assignments.some((assignment) => assignment.title.toLowerCase().includes(search.toLowerCase())),
  )

  const toggleSubjectExpand = (id) => {
    if (expandedSubjectId === id) {
      setExpandedSubjectId(null)
    } else {
      setExpandedSubjectId(id)
    }
  }




  return (
    <div className="container mx-auto space-y-6">
      {/* Overall Performance Card */}
      <p className="text-xl py-4 mb-8 pl-6 rounded-lg font-semibold bg-acewall-main text-white">Grades</p>
      <Card className={""}>
        <CardHeader>
          <CardTitle className={"text-green-500"}>Overall Academic Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Overall Average</span>
                <span className="text-lg font-bold text-green-500">{overallAverage.toFixed(2)}%</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{overallGrade}</div>
                <div className="text-sm text-muted-foreground">Overall Grade</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects and Assignments Table */}
      <div className="border">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search subjects or assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border ">
          {/* <ScrollArea className=""> */}
          <Table className="">
            <TableHeader>
              <TableRow>
                {tableHead.map((item, idx) => {
                  return <TableHead key={idx}>{item}  </TableHead>;
                })}

                {/* <TableHead className="">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody className="p-10">
              {filteredSubjects.map((subject) => (
                <>
                  <TableRow key={subject.id} className="text-xs md:text-sm">
                    <TableCell
                      className="cursor-pointer hover:text-green-600 flex items-center gap-2 font-medium"
                      onClick={() => toggleSubjectExpand(subject.id)}
                    >
                      {expandedSubjectId === subject.id ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                      <span>{subject.subject}</span>
                    </TableCell>
                    <TableCell>{subject.average.toFixed(2)}%</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${subject.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : subject.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : subject.grade === "C"
                                ? "bg-yellow-100 text-yellow-800"
                                : subject.grade === "D"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                      >
                        {subject.grade}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expandedSubjectId === subject.id && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={4} className="p-0">
                        <div className="p-4 space-y-6">
                          <AssessmentTable title="Assignments" items={subject.assignments} />
                          <AssessmentTable title="Quizzes" items={subject.quizzes} />
                          <AssessmentTable title="Final Exam" items={subject.finalTest} isFinal={true} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              {filteredSubjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No subjects or assignments found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* </ScrollArea> */}
        </div>
      </div>
    </div>
  )
}

