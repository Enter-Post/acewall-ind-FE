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
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbarDropDown } from "@/CustomComponent/TopNavDropDown";
import { Input } from "@/components/ui/input";
import { ArrowDown01Icon } from "@/assets/Icons/ArrowDown";
import { Link, useParams } from "react-router-dom";

const courses = [
  {
    id: 4,
    course: "Biology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 12,
    Language: "English",
    Prise: 101,
    image:
      "https://plus.unsplash.com/premium_photo-1681399991680-b2be2e767b32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Michael Brown",
  },
  {
    id: 5,
    course: "History",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 15,
    Language: "English",
    Prise: 110,
    image:
      "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. Richard Adams",
  },
  {
    id: 6,
    course: "English Literature",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 8,
    Language: "English",
    Prise: 75,
    image:
      "https://images.unsplash.com/photo-1506513083865-434a8a207e11?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Olivia Green",
  },
  {
    id: 7,
    course: "Computer Science",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 18,
    Language: "English",
    Prise: 89,
    image:
      "https://plus.unsplash.com/premium_photo-1661872817492-fd0c30404d74?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. Samuel Turner",
  },
  {
    id: 8,
    course: "Geography",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 10,
    Language: "English",
    Prise: 48,
    image:
      "https://plus.unsplash.com/premium_photo-1681488098851-e3913f3b1908?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Clara Foster",
  },
  {
    id: 9,
    course: "Art",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 5,
    Prise: 94,
    Language: "English",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Sarah Collins",
  },
  {
    id: 10,
    course: "Physical Education",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 6,
    Language: "English",
    Prise: 78,
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. David Martin",
  },
  {
    id: 11,
    course: "Music",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 9,
    Language: "English",
    Prise: 76,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Linda Lee",
  },
  {
    id: 12,
    course: "Economics",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 7,
    Language: "English",
    Prise: 98,
    image:
      "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Charles Young",
  },
  {
    id: 13,
    course: "Philosophy",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 5,
    Language: "English",
    Prise: 82,
    image:
      "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Daniel Harris",
  },
  {
    id: 14,
    course: "Psychology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 14,
    Language: "English",
    Prise: 91,
    image:
      "https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Sophia King",
  },
  {
    id: 15,
    course: "Sociology",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 11,
    Language: "English",
    Prise: 98,
    image:
      "https://plus.unsplash.com/premium_photo-1681079526863-7ba34e838026?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Laura White",
  },
  {
    id: 16,
    course: "Statistics",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 13,
    Language: "English",
    Prise: 40,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. William Scott",
  },
  {
    id: 17,
    course: "Engineering",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 10,
    Language: "English",
    Prise: 189,
    image:
      "https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Prof. Steven Carter",
  },
  {
    id: 18,
    course: "Environmental Science",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 12,
    Language: "English",
    Prise: 200,
    image:
      "https://plus.unsplash.com/premium_photo-1661540998860-da104459c959?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Alice Green",
  },
  {
    id: 19,
    course: "Political Science",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 8,
    Language: "English",
    Prise: 45,
    image:
      "https://images.unsplash.com/photo-1526615735835-530c611a3d8a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Brian Hall",
  },
  {
    id: 20,
    course: "Anthropology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 11,
    Language: "English",
    Prise: 99,
    image:
      "https://plus.unsplash.com/premium_photo-1661906977668-ece2c96385c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Henry Black",
  },
  {
    id: 21,
    course: "Astronomy",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 9,
    Language: "English",
    Prise: 53,
    image:
      "https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Nathan Allen",
  },
];

const AllCoursesDetail = () => {
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
    <div className="h-screen flex justify-center">
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
                      <span>Teacher: {currentCourse[0].teacher}</span>
                    </div>
                    <div className="flex items-center">
                      <Languages className="w-5 h-5 mr-2" />
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
                    <p className="font-bold text-xl text-green-500 pt-4">
                      ${currentCourse[0].Prise}{" "}
                      <span className="text-sm text-muted-foreground">
                        per month
                      </span>{" "}
                    </p>
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
                {/* <PlayCircle className="w-4 h-4 mr-2" /> */}
                Get Enroll
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AllCoursesDetail;
