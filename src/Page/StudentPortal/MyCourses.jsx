import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { Search } from "lucide-react";
import SearchBox from "@/CustomComponent/SearchBox";

const CourseCards = () => {
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
      teacher: "Mr. John Smith",
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
      teacher: "Dr. Emily White",
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
      teacher: "Ms. Jane Doe",
    },
  ];

  const courseCategories = [
    { id: 1, name: "All Category" },
    { id: 2, name: "Development" },
    { id: 3, name: "Business" },
    { id: 4, name: "Design" },
    { id: 5, name: "Marketing" },
    { id: 6, name: "Finance" },
    { id: 7, name: "Health & Fitness" },
    { id: 8, name: "Music" },
  ];

  const ratings = [
    { id: 1, name: "All Ratings" },
    { id: 2, name: "1 Star & Up" },
    { id: 3, name: "2 Star & Up" },
    { id: 4, name: "3 Star & Up" },
    { id: 5, name: "4 Star & Up" },
    { id: 6, name: "5 Star Only" },
  ];

  const sortByOptions = [
    { id: 1, name: "Latest" },
    { id: 2, name: "Popularity" },
    { id: 3, name: "Highest Rated" },
    { id: 4, name: "Lowest Price" },
    { id: 5, name: "Highest Price" },
  ];

  return (
    <section className="">
      <div className="pb-5">
        <div className="">
          <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">My Courses</p>
        </div>
        <SearchBox />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.course} to={`/student/myCourseDetail/`}>
            <Card className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={`${course.course} image`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader>
                <div className="uppercase text-indigo-600 bg-indigo-100 text-xs font-medium mb-2 w-fit px-2">
                  {course.category || "Developments"}
                </div>
                <CardTitle>{course.course}</CardTitle>
                <p className="text-sm font-medium">Teacher: {course.teacher}</p>
              </CardHeader>
              <CardContent>
                <div className="">
                  {/* <p className="text-sm text-muted-foreground">
                    Grade: {course.Grade}
                  </p> */}

                  <p className="text-md text-muted-foreground font-semibold">
                    Lecture: {course.NumberOfLecture}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CourseCards;
