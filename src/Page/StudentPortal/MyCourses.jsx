import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { Search } from "lucide-react";
import SearchBox from "@/CustomComponent/SearchBox";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/AxiosInstance";
import oopsImage from "@/assets/oopsimage.png";
import { Button } from "@/components/ui/button";

const CourseCards = () => {
  // const courses = [
  //   {
  //     id: 1,
  //     course: "Math",
  //     Grade: 10,
  //     rating: 5,
  //     NumberOfLecture: 11,
  //     Language: "English",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     teacher: "Mr. John Smith",
  //   },
  //   {
  //     id: 2,
  //     course: "Physics",
  //     Grade: 10,
  //     rating: 3,
  //     NumberOfLecture: 2,
  //     Language: "English",
  //     image:
  //       "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     teacher: "Dr. Emily White",
  //   },
  //   {
  //     id: 3,
  //     course: "Chemistry",
  //     Grade: 10,
  //     rating: 4,
  //     NumberOfLecture: 10,
  //     Language: "English",
  //     image:
  //       "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     teacher: "Ms. Jane Doe",
  //   },
  // ];

  // const courseCategories = [
  //   { id: 1, name: "All Category" },
  //   { id: 2, name: "Development" },
  //   { id: 3, name: "Business" },
  //   { id: 4, name: "Design" },
  //   { id: 5, name: "Marketing" },
  //   { id: 6, name: "Finance" },
  //   { id: 7, name: "Health & Fitness" },
  //   { id: 8, name: "Music" },
  // ];

  // const ratings = [
  //   { id: 1, name: "All Ratings" },
  //   { id: 2, name: "1 Star & Up" },
  //   { id: 3, name: "2 Star & Up" },
  //   { id: 4, name: "3 Star & Up" },
  //   { id: 5, name: "4 Star & Up" },
  //   { id: 6, name: "5 Star Only" },
  // ];

  // const sortByOptions = [
  //   { id: 1, name: "Latest" },
  //   { id: 2, name: "Popularity" },
  //   { id: 3, name: "Highest Rated" },
  //   { id: 4, name: "Lowest Price" },
  //   { id: 5, name: "Highest Price" },
  // ];
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/get");
        // console.log("Raw response:", response); // log full response
        // console.log("Response data:", response.data); // log actual data
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, []);

  return (
    <section className="p-3 md:p-0">
      <div className=" flex flex-col pb-5 gap-5">
        <div className="" >
          <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">
            My Courses
          </p>
        </div>
        <SearchBox />
      </div>
      {courses.length !== 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-3xl font-semibold text-center text-muted-foreground">OOPS ! <br /> YOU ARE NOT LEARNING ANY THING, <br />
            EXPLORE COURSES  AND START LEARNING</h1>
          <Link to="/student/courses">
            <Button className="mt-8 py-2 px-4 rounded-md text-lg bg-green-500 text-white hover:bg-acewall-main/90 flex items-center gap-2">
              Explore Courses
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 font-bold" fill=" none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>

          <img src={oopsImage} alt="No courses" className="w-full h-80 object-contain" />
          <p className="text-lg mt-4 text-muted-foreground">No courses added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.course} to={`/student/myCourseDetail/`}>
              <Card className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={`${course.thumbnail} image`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <CardHeader>
                  <div className="uppercase text-indigo-600 bg-indigo-100 text-xs font-medium mb-2 w-fit px-2">
                    {course.category?.title || "Development"}
                  </div>
                  <CardTitle className="flex justify-between items-center">
                    <span>{course.title}</span>
                    <span className="text-lg font-semibold text-green-500">
                      ${course.price}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Teacher: {course.teacher}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Language: {course.language}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Chapters: {course.chapters.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

    </section>
  );
};

export default CourseCards;
