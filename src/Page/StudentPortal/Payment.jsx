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

const Payment = () => {
  const courses = ["Math", "Physics", "Chemistry"];
  const statusOptions = ["Paid", "Unpaid"];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [payment, setPayment] = useState([
    {
      id: 1,
      course: "Math",
      month: "January",
      fee: "$200",
      lastDueDate: "2024-01-10",
      status: "Paid",
    },
    {
      id: 2,
      course: "Math",
      month: "February",
      fee: "$200",
      lastDueDate: "2024-02-10",
      status: "Unpaid",
    },
    {
      id: 3,
      course: "Physics",
      month: "January",
      fee: "$180",
      lastDueDate: "2024-01-12",
      status: "Unpaid",
    },
    {
      id: 4,
      course: "Physics",
      month: "February",
      fee: "$180",
      lastDueDate: "2024-02-12",
      status: "Paid",
    },
    {
      id: 5,
      course: "Chemistry",
      month: "January",
      fee: "$190",
      lastDueDate: "2024-01-15",
      status: "Paid",
    },
    {
      id: 6,
      course: "Chemistry",
      month: "February",
      fee: "$190",
      lastDueDate: "2024-02-15",
      status: "Unpaid",
    },
  ]);

  const [filteredPayment, setFilteredPayment] = useState(payment);

  const handleFilter = () => {
    const filtered = payment.filter(
      (item) =>
        (selectedCourse === "" || item.course === selectedCourse) &&
        (selectedStatus === "" || item.status === selectedStatus)
    );
    setFilteredPayment(filtered);
  };

  const handleRemoveFilter = () => {
    setSelectedCourse("");
    setSelectedStatus("");
    setFilteredPayment(payment);
  };

  return (
    <div>
      <p className="text-xl pb-4">Payment Records</p>
      <div className="flex flex-wrap gap-4 w-full mb-6">
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
            className="bg-green-500 hover:bg-green-600"
            onClick={handleFilter}
          >
            Filter
          </Button>
          <Button variant="outline" onClick={handleRemoveFilter}>
            Remove Filter
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-xs md:text-sm">
            <TableHead>Course</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Last Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayment.map((item) => (
            <TableRow key={item.id} className="text-xs md:text-sm">
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.month}</TableCell>
              <TableCell>{item.fee}</TableCell>
              <TableCell>{item.lastDueDate}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <Button
                  size={"sm"}
                  disabled={item.status === "Paid"}
                  className={
                    item.status === "Paid"
                      ? "bg-gray-300 text-black w-20 "
                      : "bg-green-500 hover:bg-green-600 w-20 "
                  }
                >
                  {item.status === "Paid" ? `Paid` : "Pay"}
                  {/* {item.status === "Paid" && (
                    <TickDouble03Icon className="text-black" />
                  )} */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Payment;
