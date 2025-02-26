import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  GraduationCap,
  PlayCircle,
  Award,
  Users,
  Download,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbarDropDown } from "@/CustomComponent/TopNavDropDown";
import { Input } from "@/components/ui/input";
import { ArrowDown01Icon } from "@/assets/Icons/ArrowDown";
import { Link, useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    course: "Math",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 11,
    Language: "English",
    image:
      "https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://youtu.be/094y1Z2wpJg",
  },
  {
    id: 2,
    course: "Physics",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 2,
    Language: "English",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://youtu.be/ZAqIoDhornk",
  },
  {
    id: 3,
    course: "Chemistry",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 10,
    Language: "English",
    image:
      "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://youtu.be/5iTOphGnCtg",
  },
];

const CoursesDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);

  const getelectedCourse = courses.filter((data) => {
    return data.id == id;
  });

  useEffect(() => {
    if (id) {
      setCurrentCourse(getelectedCourse);
    }
  }, [id]);

  console.log(currentCourse);

  return (
    <div>
      <div className="container mx-auto p-6">
        <Card className="bg-gray-100 ">
          <CardContent className="p-6">
            {currentCourse ? (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <CardHeader className="p-0">
                    <CardTitle className="text-3xl font-bold mb-4">
                      {currentCourse[0]?.course}
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="mr-2">Course Reviews</span>
                      {[...Array(currentCourse[0]?.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>Languages: {currentCourse[0].Language}</span>
                    </div>
                    <div className="flex items-center">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      <span>Lectures: {currentCourse[0].NumberOfLecture}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>Free Certificate After Course Completion</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <img
                    src={currentCourse[0]?.image}
                    alt={currentCourse[0]?.courseName}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            ) : (
              <p>Loading course details...</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4 justify-start p-6">
            <a
              href={currentCourse && currentCourse[0]?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-400 hover:bg-green-500 text-black transition-colors">
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CoursesDetail;
