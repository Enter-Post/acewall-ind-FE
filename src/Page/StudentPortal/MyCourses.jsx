import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

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
    },
  ];

  return (
    <section>
      <p className="text-xl pb-10">My Courses</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.course} to={`/studentPortal/Course/${course.id}`}>
            <Card className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={`${course.course} image`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader>
                <CardTitle>{course.course}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Grade: {course.Grade}
                  </p>
                  <p className="text-sm text-muted-foreground">
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
