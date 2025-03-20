import { Assignment, DeshBoardCard } from "@/CustomComponent/DeshboardCard";
import React from "react";

const Deshboard = () => {
  const courses = [
    { title: "Web Development" },
    { title: "Graphic Designing" },
    { title: "Digital Marketing" },
  ];
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
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 2,
      title: "New Course: Advanced Graphic Design",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 3,
      title: "Digital Marketing Project Guidelines",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 4,
      title: "Guest Lecture on UX/UI Design",
      date: "25-jan-2025",
      time: "02:50",
    },
    {
      id: 5,
      title: "Mid-Term Exams Schedule",
      date: "25-jan-2025",
      time: "02:50",
    },
  ];

  return (
    <>
      <div className="">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Dashboard
        </p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4">
          <DeshBoardCard
            mainHeading="Announcements"
            data={announcements}
            width="max-w-1/2"
            height={"h-[390px]"}
            link={"announcements"}
          />
          <Assignment
            width
            mainHeading="Assignments Due"
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
