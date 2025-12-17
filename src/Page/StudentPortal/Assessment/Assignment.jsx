"use client";

import React, { useEffect, useState } from "react";
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
import {
  ChevronDown,
  ChevronRight,
  Upload,
  FileText,
  Calendar,
  Clock,
  Loader,
} from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const tableHead = ["Assessment Name", "Course", "Due Date", "Status", "Type"];

const Assessment = () => {
  const [search, setSearch] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [expandedAssessmentId, setExpandedAssessmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      setLoading(true);
      await axiosInstance
        .get("assessment/getAllassessmentforStudent")
        .then((res) => {
          setAssessments(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch assessments");
          setLoading(false);
        });
    };

    fetchAssessment();
  }, []);

  const formatDueDate = (date, time) => {
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) throw new Error("Invalid date");
      return `${format(dateObj, "MMM dd, yyyy")} at ${time || "N/A"}`;
    } catch {
      return "Invalid date";
    }
  };

  const filteredAssessments = Array.isArray(assessments)
    ? assessments.filter((assessment) =>
        assessment?.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleAssessmentExpand = (assessmentId) => {
    setExpandedAssessmentId(
      expandedAssessmentId === assessmentId ? null : assessmentId
    );
  };

  const handleKeyToggle = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAssessmentExpand(id);
    }
  };

  const getStatusLabel = (isSubmitted) =>
    isSubmitted ? "Submitted" : "Pending";

  const getStatusClass = (isSubmitted) =>
    isSubmitted
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  if (loading) {
    return (
      <div
        className="flex items-center justify-center w-full h-screen"
        role="status"
        aria-live="polite"
      >
        <Loader className="animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading assessments</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-red-500 p-8"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  return (
    <div aria-labelledby="assessment-heading">
      <p
        id="assessment-heading"
        className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg"
      >
        Assessment
      </p>

      {/* Search */}
      <div className="flex items-center py-4">
        <Input
          aria-label="Search assessments by title"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div
        className="rounded-md border"
        role="region"
        aria-label="Student assessments list"
      >
        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table role="table">
            <TableHeader>
              <TableRow role="row">
                {tableHead.map((item, idx) => (
                  <TableHead key={idx} role="columnheader">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => {
                  const isExpanded =
                    expandedAssessmentId === assessment._id;

                  return (
                    <React.Fragment key={assessment._id}>
                      <TableRow role="row" className="text-xs md:text-sm">
                        <TableCell role="cell">
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            aria-controls={`assessment-${assessment._id}`}
                            aria-label={`Toggle details for ${assessment.title}`}
                            onClick={() =>
                              toggleAssessmentExpand(assessment._id)
                            }
                            onKeyDown={(e) =>
                              handleKeyToggle(e, assessment._id)
                            }
                            className="cursor-pointer hover:text-blue-600 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          >
                            {isExpanded ? (
                              <ChevronDown
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronRight
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                              />
                            )}
                            <span className={isExpanded ? "font-medium" : ""}>
                              {assessment.title}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell role="cell">
                          {assessment?.course?.courseTitle || "N/A"}
                        </TableCell>

                        <TableCell role="cell">
                          {formatDueDate(
                            assessment?.dueDate?.date,
                            assessment?.dueDate?.time
                          )}
                        </TableCell>

                        <TableCell role="cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                              assessment.isSubmitted
                            )}`}
                            aria-label={`Status: ${getStatusLabel(
                              assessment.isSubmitted
                            )}`}
                          >
                            {getStatusLabel(assessment.isSubmitted)}
                          </span>
                        </TableCell>

                        <TableCell role="cell">
                          <span className="capitalize">
                            {assessment.type?.replace("-", " ") || "N/A"}
                          </span>
                        </TableCell>
                      </TableRow>

                      {isExpanded && (
                        <TableRow
                          id={`assessment-${assessment._id}`}
                          role="row"
                          className="bg-gray-50 border"
                        >
                          <TableCell colSpan={5} role="cell" className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">
                                  Description
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {assessment.description ||
                                    "No description provided."}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">
                                    Course
                                  </h4>
                                  <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FileText aria-hidden="true" />
                                    {assessment?.course?.courseTitle || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium mb-2">
                                    Due Date
                                  </h4>
                                  <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <Calendar aria-hidden="true" />
                                    {assessment?.dueDate?.date &&
                                    !isNaN(
                                      new Date(
                                        assessment.dueDate.date
                                      ).getTime()
                                    )
                                      ? format(
                                          new Date(assessment.dueDate.date),
                                          "MMMM dd, yyyy"
                                        )
                                      : "Invalid date"}
                                  </p>
                                  <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <Clock aria-hidden="true" />
                                    {assessment?.dueDate?.time || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <Link
                                to={
                                  assessment.source === "assessment"
                                    ? `/student/assessment/submission/${assessment._id}`
                                    : assessment.source === "discussion"
                                    ? `/student/discussions/${assessment._id}`
                                    : "#"
                                }
                              >
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  aria-label={
                                    assessment.isSubmitted
                                      ? "View assessment results"
                                      : "Submit assessment"
                                  }
                                >
                                  <Upload aria-hidden="true" className="mr-2" />
                                  {assessment.isSubmitted
                                    ? "See Results"
                                    : "Submit Assessment"}
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <TableRow role="row">
                  <TableCell
                    colSpan={5}
                    role="cell"
                    className="text-center py-8"
                  >
                    {search
                      ? "No assessments found matching your search."
                      : "No assessments available."}
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

export default Assessment;