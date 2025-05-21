import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Upload, FileText } from "lucide-react";


const tableHead = ["Assessment Name", "Course", "Due Date", "Status"];
const Assignment = () => {
  const [search, setSearch] = useState("");
  const [Assessment, setAssessment] = useState(initialAssessment);
  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);

  const filteredAssessment = Assessment.filter((assignment) =>
    assignment.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAssignmentExpand = (assignmentId) => {
    setExpandedAssignmentId(
      expandedAssignmentId === assignmentId ? null : assignmentId
    );
  };

  const handleSubmitAssignment = (assignmentId) => {
    console.log(`Submitting assignment ${assignmentId}`);
  };

  return (
    <div className="">
      <div className="">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">
          Assessment
        </p>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Assessment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border ">
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHead.map((item, idx) => {
                  return <TableHead key={idx}>{item} </TableHead>;
                })}

                {/* <TableHead className="">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessment?.map((assignment) => (
                <>
                  <TableRow
                    key={assignment.id}
                    className={"text-xs md:text-sm"}
                  >
                    <TableCell
                      className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                      onClick={() => toggleAssignmentExpand(assignment.id)}
                    >
                      {expandedAssignmentId === assignment.id ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                      <span
                        className={
                          expandedAssignmentId === assignment.id
                            ? "font-medium"
                            : ""
                        }
                      >
                        {assignment.title}
                      </span>
                    </TableCell>
                    <TableCell>{assignment.course}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          assignment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expandedAssignmentId === assignment.id && (
                    <TableRow className="bg-gray-50 border">
                      <TableCell colSpan={5} className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Description
                            </h4>
                            <p className="text-sm text-gray-600">
                              {assignment.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Documents
                            </h4>
                            <div className="space-y-2">
                              {assignment.documents.map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center gap-2 text-sm border"
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <a
                                    href="#"
                                    className="text-blue-600 hover:underline"
                                  >
                                    {doc.name}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                          {assignment.status !== "Completed" && (
                            <div className="pt-2">
                              <Button
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() =>
                                  handleSubmitAssignment(assignment.id)
                                }
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Add Assessment
                              </Button>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              {filteredAssessment.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No Assessment found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Assignment;
