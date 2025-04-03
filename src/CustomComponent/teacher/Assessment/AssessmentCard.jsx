import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlignLeft, Pencil, Eye, Trash2, Calendar } from "lucide-react";

export default function AssessmentCard({ assessment }) {
  return (
    <div className="flex items-center p-4 hover:bg-gray-50">
      <div className="flex items-center w-16">
        <AlignLeft className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-1">
        <div className="text-blue-500 font-medium">Quiz {assessment.id}</div>
        <div className="font-medium text-lg">{assessment.title}</div>
        <div className="text-sm text-gray-500">
          {assessment.questions} questions | {assessment.points} pts
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
  );
}
