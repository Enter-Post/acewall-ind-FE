import { useState } from "react";
import { Plus, Pencil, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import ConfirmationModal from "@/CustomComponent/CreateCourse/ConfirmationModal";

export default function TeacherGradebook() {
  const [categories, setCategories] = useState([
    { name: "Assignments", weight: 40 },
    { name: "Final Project", weight: 40 },
  ]);

  const [gradingScale, setGradingScale] = useState([
    { letter: "A", range: "90% - 100%" },
    { letter: "B", range: "80% - 89%" },
    { letter: "C", range: "70% - 79%" },
    { letter: "D", range: "60% - 69%" },
    { letter: "F", range: "Below 60%" },
  ]);

  const addNewCategory = () => {
    setCategories([...categories, { name: "", weight: 0 }]);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg">
      <div className="mb-6 border-b">
        <h2 className="text-2xl font-semibold flex items-center">
          <div className="w-1 h-8 bg-green-500 mr-2"></div>
          Grades
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Grading Method
          </h3>
          <Select defaultValue="points-based">
            <SelectTrigger className="w-full bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select grading method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points-based">Points-Based</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="letter-grade">Letter Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Total Course Points
          </h3>
          <div className="flex items-center">
            <span className="text-lg font-medium mr-4">70</span>
            <span className="text-gray-500 italic">
              Auto-calculated based on assignments, quizzes
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Grade Distribution
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Minimum Passing Grade
          </h3>
          <Input
            type="text"
            defaultValue="60%"
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Late Submission Penalty
          </h3>
          <Input
            type="text"
            defaultValue="-10 %"
            className="bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <Card className="mb-6 border-gray-200">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 bg-gray-50 p-4 border-b border-gray-200">
            <div className="text-gray-600 font-medium">Category</div>
            <div className="text-gray-600 font-medium">Weight (%)</div>
          </div>

          {categories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-2 p-4 border-b border-gray-200"
            >
              <div>{category.name}</div>
              <div>
                <Input
                  type="number"
                  value={category.weight}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[index].weight = Number.parseInt(
                      e.target.value
                    );
                    setCategories(newCategories);
                  }}
                  className="w-32 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-4"
            onClick={addNewCategory}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Category</span>
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Grading Scale
      </h2>

      <Card className="mb-6 border-gray-200">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 bg-gray-50 p-4 border-b border-gray-200">
            <div className="text-gray-600 font-medium">Letter Grade</div>
            <div className="text-gray-600 font-medium">Percentage Range</div>
          </div>

          {gradingScale.map((grade, index) => (
            <div
              key={index}
              className="grid grid-cols-2 p-4 border-b border-gray-200"
            >
              <div>{grade.letter}</div>
              <div className="flex justify-between items-center">
                <span>{grade.range}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Link to={"/teacherPortal/courses/createCourses/addchapters"}>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* <Link to="/teacherPortal/courses">
          <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white">
            Create Course
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link> */}

        <ConfirmationModal />
      </div>
    </div>
  );
}
