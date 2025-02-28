import { useState } from "react";
import { Button } from "@/components/ui/button";
import SelectCmp from "@/CustomComponent/SelectCmp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TickDouble03Icon } from "@/assets/Icons/Tick";
import { CustomDrawer } from "@/CustomComponent/Drawer";

const Assignment = () => {
  const courses = ["Math", "Physics", "Chemistry"];
  const statusOptions = ["Completed", "Due"];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Solve calculus problems",
      course: "Math",
      dueDate: "2024-03-01",
      status: "Due",
    },
    {
      id: 2,
      title: "Experiment on Newton's Laws",
      course: "Physics",
      dueDate: "2024-02-25",
      status: "Completed",
    },
    {
      id: 3,
      title: "Analyze chemical reactions",
      course: "Chemistry",
      dueDate: "2024-03-10",
      status: "Due",
    },
    {
      id: 4,
      title: "Graph quadratic functions",
      course: "Math",
      dueDate: "2024-02-28",
      status: "Completed",
    },
  ]);

  const [filteredAssignments, setFilteredAssignments] = useState(assignments);

  const handleFilter = () => {
    const filtered = assignments.filter(
      (assignment) =>
        (selectedCourse === "" || assignment.course === selectedCourse) &&
        (selectedStatus === "" || assignment.status === selectedStatus)
    );
    setFilteredAssignments(filtered);
  };

  const handleRemoveFilter = () => {
    setSelectedCourse("");
    setSelectedStatus("");
    setFilteredAssignments(assignments);
  };

  return (
    <>
      <div>
        <p className="text-xl pb-4">Assignments</p>
        <div className="flex flex-wrap gap-4 w-full mb-6 ">
          <SelectCmp
            data={courses}
            title="Course"
            value={selectedCourse}
            onChange={(value) => setSelectedCourse(value)}
          />
          <SelectCmp
            data={statusOptions}
            title="Status"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          />
          <div className="flex gap-3">
            <Button
              className={"bg-green-500 hover:bg-green-600 "}
              onClick={handleFilter}
            >
              Filter
            </Button>
            <Button variant="outline" onClick={handleRemoveFilter}>
              Remove filter
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className={"text-xs md:text-sm"}>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id} className={"text-xs md:text-sm"}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.status}</TableCell>
                <TableCell>
                  <CustomDrawer assignment={assignment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Assignment;
