import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TickDouble03Icon } from "@/assets/Icons/Tick";
import { InputFile } from "./SelectInput";

const assignment = [
  {
    id: 1,
    title: "Create a responsive website",
    course: "Web-development",
    dueDate: "2024-03-01",
    status: "Due",
  },
  {
    id: 2,
    title: "Design a logo",
    course: "Graphic designing",
    dueDate: "2024-02-25",
    status: "Completed",
  },
  {
    id: 3,
    title: "Develop a marketing strategy",
    course: "Digital Marketing",
    dueDate: "2024-03-10",
    status: "Due",
  },
  {
    id: 4,
    title: "Build a React component",
    course: "Web-development",
    dueDate: "2024-02-28",
    status: "Completed",
  },
];

export function CustomDrawer({ assignment }) {
  const [selectedAssignment, setSelectedAssignment] = React.useState({
    id: 4,
    title: "Build a React component",
    course: "Web-development",
    dueDate: "2024-02-28",
    status: "Completed",
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Open Drawer</Button> */}
        <Button
          size={"sm"}
          disabled={assignment.status == "Completed" ? true : false}
          className={
            assignment.status == "Completed"
              ? "bg-gray-300 text-black hover:bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }
        >
          {assignment.status == "Completed" ? `Submited` : "Submit"}
          {assignment.status == "Completed" ? (
            <TickDouble03Icon className="text-black" />
          ) : null}
        </Button>
      </DrawerTrigger>

      <DrawerContent className={"bg-gray-100"}>
        <div className="mx-auto w-full md:max-w-[60%] ">
          <DrawerHeader>
            <DrawerTitle className={"text-2xl font-bold"}>
              Submit Assignment
            </DrawerTitle>
            <DrawerDescription className={"text-lg font-bold"}>
              {selectedAssignment.course}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="">
              <ResponsiveContainer width="100%" height="100%">
                <p>{selectedAssignment.title}</p>
                <section className="flex items-center flex-wrap justify-around h-20">
                  <div className="h-[60px] w-screen md:w-[60%] border text-gray-600 border-gray-600 m-2 border-dashed flex justify-center items-center">
                    assignment
                  </div>
                  <div>
                    <InputFile />
                  </div>
                </section>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
