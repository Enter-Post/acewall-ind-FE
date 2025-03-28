import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  AlignLeft,
  Pencil,
  Eye,
  Trash2,
  Calendar,
} from "lucide-react";
import { AssessmentUploadDialog } from "./AssessmentUploadDialog";
import { Link } from "react-router-dom";

export default function Teacherrassessment() {
  const [currentExpanded, setCurrentExpanded] = useState(true);
  const [completedExpanded, setCompletedExpanded] = useState(true);

  const currentAssessments = [
    {
      id: 4,
      title: "Create a Facebook Marketing Plan",
      questions: 2,
      points: 10,
      dueDate: "Oct 30, 2024",
    },
    {
      id: 5,
      title: "Instagram Story Strategy Analysis",
      questions: 10,
      points: 10,
      dueDate: "Nov 15, 2024",
    },
    {
      id: 6,
      title: "Analyze a Social Media Campaign",
      questions: 10,
      points: 10,
      dueDate: "Nov 25, 2024",
    },
    {
      id: 7,
      title: "Final Project: Build a Marketing Campaign",
      questions: 10,
      points: 10,
      dueDate: "Dec 10, 2024",
    },
  ];

  const completedAssessments = [
    {
      id: 1,
      title: "Social Media Audit Report",
      questions: 10,
      points: 10,
      dueDate: "Sep 30, 2024",
    },
    {
      id: 2,
      title: "SEO Optimization Strategy P1",
      questions: 10,
      points: 10,
      dueDate: "Aug 15, 2024",
    },
    {
      id: 3,
      title: "SEO Optimization Strategy P2",
      questions: 10,
      points: 10,
      dueDate: "Aug 15, 2024",
    },
  ];

  return (
    <div className="container p-3 md:p-0">
      <div className="flex flex-col mb-2 justify-between ">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Assessments
        </p>
        <div className="flex justify-end">
          {/* <AssessmentUploadDialog /> */}
          <Link to="/teacher/assignment/create">
            <Button variant={"ghost"} className="text-green-600">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border rounded-lg bg-gray-50 p-4 border-red-500">
          <Collapsible
            open={currentExpanded}
            onOpenChange={setCurrentExpanded}
            className="space-y-4"
          >
            <CollapsibleTrigger className="flex items-center w-full text-left">
              <div className="flex items-center">
                {currentExpanded ? (
                  <ChevronDown className="h-5 w-5 mr-2" />
                ) : (
                  <ChevronUp className="h-5 w-5 mr-2" />
                )}
                <h2 className="text-md font-semibold">
                  Current Assessment (4)
                </h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="border rounded-lg bg-white overflow-hidden">
                {currentAssessments.map((assessment, index) => (
                  <React.Fragment key={assessment.id}>
                    <div className="flex items-center p-4 hover:bg-gray-50">
                      <div className="flex items-center w-16">
                        <AlignLeft className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-blue-500 font-medium">
                          Quiz {assessment.id}
                        </div>
                        <div className="font-medium text-lg">
                          {assessment.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assessment.questions} questions | {assessment.points}{" "}
                          pts
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded">
                          <Calendar className="h-4 w-4 mr-1" />
                          {assessment.dueDate}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-5 w-5 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                    {index < currentAssessments.length - 1 && (
                      <div className="border-t" />
                    )}
                  </React.Fragment>
                ))}
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        
        <Card className="border rounded-lg bg-gray-50 p-4  border-red-500 ">
          <Collapsible
            open={completedExpanded}
            onOpenChange={setCompletedExpanded}
            className="space-y-4"
          >
            <CollapsibleTrigger className="flex items-center w-full text-left">
              <div className="flex items-center">
                {completedExpanded ? (
                  <ChevronDown className="h-5 w-5 mr-2" />
                ) : (
                  <ChevronUp className="h-5 w-5 mr-2" />
                )}
                <h2 className="text-md font-semibold">
                  Completed Assessment (3)
                </h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="border rounded-lg bg-white overflow-hidden">
                {completedAssessments.map((assessment, index) => (
                  <React.Fragment key={assessment.id}>
                    <div className="flex items-center p-4 hover:bg-gray-50">
                      <div className="flex items-center w-16">
                        <AlignLeft className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-blue-500 font-medium">
                          Quiz {assessment.id}
                        </div>
                        <div className="font-medium text-lg">
                          {assessment.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assessment.questions} questions | {assessment.points}{" "}
                          pts
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded">
                          <Calendar className="h-4 w-4 mr-1" />
                          {assessment.dueDate}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-5 w-5 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                    {index < completedAssessments.length - 1 && (
                      <div className="border-t" />
                    )}
                  </React.Fragment>
                ))}
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
}
