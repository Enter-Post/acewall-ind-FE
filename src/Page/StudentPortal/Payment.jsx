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
  const tableHead = ["Course", "Fee", "Transaction Data"];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [payment, setPayment] = useState([
    {
      id: 1,
      course: "Algorithm",
      fee: "$200",
      transactionDetail: "2024-01-10",
    },
    {
      id: 2,
      course: "Math",
      fee: "$200",
      transactionDetail: "2024-02-10",
    },
    {
      id: 3,
      course: "Physics",
      month: "January",
      fee: "$180",
      transactionDetail: "2024-01-12",
      status: "Unpaid",
    },
    {
      id: 4,
      course: "Physics",
      fee: "$180",
      transactionDetail: "2024-02-12",
    },
    {
      id: 5,
      course: "Chemistry",

      fee: "$190",
      transactionDetail: "2024-01-15",

    },
    {
      id: 6,
      course: "Chemistry",

      fee: "$190",
      transactionDetail: "2024-02-15",

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
          <TableRow>
            {tableHead.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
            {/* <TableHead className="">Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredPayment.map((item) => (
            <TableRow key={item.id} className="text-xs md:text-sm">
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.fee}</TableCell>
              <TableCell>{item.transactionDetail}</TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Payment;
