import { Assignment, DeshBoardCard } from "@/CustomComponent/DeshboardCard";
import React from "react";

const Deshboard = () => {
  const courses = ["Web Development", "Graphic Designing", "Digital Marketing"];
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

  return (
    <>
      <div>
        <p className="text-xl pb-4">Deshboard</p>
        <div className="flex flex-wrap gap-4">
          <DeshBoardCard
            mainHeading="My courses"
            data={courses}
            width="max-w-1/2"
          />
          <Assignment
            width
            mainHeading="Assignments Due"
            data={AssignmentDue}
            bgcolor={"bg-red-200"}
            bordercolor={"border-black"}
          />
        </div>
      </div>
    </>
  );
};

export default Deshboard;
