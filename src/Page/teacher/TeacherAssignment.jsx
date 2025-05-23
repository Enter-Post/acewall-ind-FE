"use client";

import { useEffect, useState } from "react";
import { BadgePlus, BookOpen, GraduationCap, Library, Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Link } from "react-router-dom";

export default function TeacherAssessment() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axiosInstance.get("assessment/allAssessmentByTeacher");
        setAssessments(response.data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  return (
    <div className="flex w-full min-h-screen p-6">
      <div className="w-full mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Assessments</h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="animate-spin " />
          </div>
        ) : assessments.length === 0 ? (
          <p className="text-center text-gray-500">No assessments available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessments.map((assessment) => (
              <Link
                key={assessment._id}
                to={`/teacher/assessments/allsubmissions/${assessment._id}`}
              >
                <Card className="w-full border-gray-200 hover:border-green-300 transition-all duration-200 hover:shadow-md cursor-pointer">
                  <CardContent className="p-4">
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <BadgePlus className="h-5 w-5 text-green-600" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {assessment?.course?.courseTitle}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <BookOpen className="h-3 w-3 text-green-600" />
                      </div>
                      <h2 className="text-sm  text-gray-800 line-clamp-1">
                        {assessment?.title}
                      </h2>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {assessment?.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      

                      {assessment?.chapter && (
                        <div className="flex items-center gap-1.5">
                          <Library className="h-3.5 w-3.5 text-green-500" />
                          <p className="text-xs text-gray-700 truncate">
                            {assessment?.chapter?.title}
                          </p>
                        </div>
                      )}

                      {assessment?.lesson && (
                        <div className="flex items-center gap-1.5">
                          <Library className="h-3.5 w-3.5 text-green-500" />
                          <p className="text-xs text-gray-700 truncate">
                            {assessment?.lesson?.title}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      Created: {format(new Date(assessment.createdAt), "MMM d, yyyy")}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
