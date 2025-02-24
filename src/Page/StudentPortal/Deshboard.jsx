import { Assignment, DeshBoardCard } from "@/CustomComponent/DeshboardCard";
import React from "react";

const Deshboard = () => {
  const courses = [{ title: "Web Development" }, { title: "Graphic Designing" }, { title: "Digital Marketing" }];
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
    },
    {
      id: 2,
      title: "New Course: Advanced Graphic Design",
    },
    {
      id: 3,
      title: "Digital Marketing Project Guidelines",
    },
    {
      id: 4,
      title: "Guest Lecture on UX/UI Design",
    },
    {
      id: 5,
      title: "Mid-Term Exams Schedule",
    }
  ];

  return (
    <>
      <div>
        <p className="text-xl pb-4">Deshboard</p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4">
          <DeshBoardCard
            mainHeading="My courses"
            data={courses}
            link={"mycourses"}
            width="max-w-1/2"
          />
          <Assignment
            width
            mainHeading="Assignments Due"
            data={AssignmentDue}
          />

          <DeshBoardCard
            mainHeading="Annoncements"
            data={announcements}
            width="max-w-1/2"
            link={"announcements"}
          />

        </div>
      </div>
    </>
  );
};

export default Deshboard;
