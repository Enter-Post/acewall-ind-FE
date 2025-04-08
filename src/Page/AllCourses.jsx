import * as React from "react";
import { CoursesCard } from "@/CustomComponent/Card";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchBox from "@/CustomComponent/SearchBox";

const AllCourses = () => {
  const allCourses = [
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
      link: "/student/courses/detail",
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
    <div>
      <main>
        <SearchBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {allCourses.map((course) => {
            return (
              <div key={course.id}>
                <CoursesCard course={course} link={course.link} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
