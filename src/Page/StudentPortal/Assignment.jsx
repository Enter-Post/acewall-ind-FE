import { Button } from "@/components/ui/button";
import SelectCmp from "@/CustomComponent/SelectCmp";
import React from "react";

const Assignment = () => {
  const courses = ["Web-development", "Graphic designing", "Digital Marketing"];
  const status = ["Completed", "Due"];

  return (
    <div>
      <p className="text-xl">Assignment</p>
      <div className="flex gap-4 mt-5">
        <SelectCmp data={courses} title="Course" />
        <SelectCmp data={status} title="Status" />
        <Button>Filter</Button>
        <Button>Remove filter</Button>
      </div>
      <section>
      <Assignment/>
      </section>
    </div>
  );
};

export default Assignment;
