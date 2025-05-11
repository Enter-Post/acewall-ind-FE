import { Assignment, DeshBoardCard } from "@/CustomComponent/Card";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";

const Deshboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const AssignmentDue = [
    {
      course: "Web Development",
      Assignment: "Create Website Layout",
      dueDate: "17-Feb-2025",
    },
    {
      course: "Graphic Designing",
      Assignment: "Create a logo for a brand",
      dueDate: "11-Feb-2025",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Assignment Submission Deadline Extended",
      course: "Web Development",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 2,
      title: "New Course: Advanced Graphic Design",
      course: "Graphic Designing",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 3,
      title: "Digital Marketing Project Guidelines",
      course: "Digital Marketing",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 4,
      title: "Guest Lecture on UX/UI Design",
      course: "Graphic Designing",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 5,
      title: "Mid-Term Exams Schedule",
      course: "Web Development",
      date: "25-jan-2025",
      time: "02:50",
    },
  ];

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/course/getMyCourses`);
        const courseList = res.data.purchasedCourses || [];

        // Sort by createdAt descending and take the latest 5
        const recentCourses = [...courseList]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setCourses(recentCourses);
        console.log("Recent courses:", recentCourses); // Optional debug log
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <>
      <div>
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Dashboard
        </p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-6 ">
          <DeshBoardCard
            mainHeading="Announcements"
            data={announcements}
            width="max-w-1/2"
            height={"h-auto"}
            link={"announcements"}
          />
          <Assignment
            width
            mainHeading="Assessment Due"

            data={AssignmentDue}
          />
          <DeshBoardCard
            mainHeading="My courses"
            data={courses}
            link={"mycourses"}
            width="max-w-1/2"
          />
        </div>
      </div>
    </>
  );
};

export default Deshboard;
