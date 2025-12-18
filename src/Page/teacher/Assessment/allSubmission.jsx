import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import avatar from "@/assets/avatar.png";
import BackButton from "@/CustomComponent/BackButton";

const AllSubmission = () => {
  const [submission, setSubmission] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [gradedFilter, setGradedFilter] = useState("all");

  const { id } = useParams();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axiosInstance.get(
          `/assessmentSubmission/submission_for_Teacher/${id}`
        );
        setSubmission(response.data.submissions);
      } catch (error) {
        console.error("Error fetching submission:", error);
        setSubmission([]);
      }
    };

    fetchSubmission();
  }, [id]);

  /* Loading */
  if (!submission) {
    return (
      <div
        className="flex items-center justify-center w-full h-screen"
        role="status"
        aria-live="polite"
      >
        <Loader
          className="w-6 h-6 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">Loading submissions</span>
      </div>
    );
  }

  const filteredSubmissions = submission.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchGraded =
      gradedFilter === "all" ||
      (gradedFilter === "graded" && item.graded) ||
      (gradedFilter === "not_graded" && !item.graded);
    return matchStatus && matchGraded;
  });

  /* Empty state */
  if (filteredSubmissions.length === 0) {
    return (
      <main
        className="w-full min-h-screen"
        role="main"
        aria-labelledby="no-submissions-heading"
      >
        <BackButton />

        <div className="flex flex-col items-center justify-center w-full h-screen space-y-6">
          <section aria-labelledby="filters-heading">
            <h2 id="filters-heading" className="sr-only">
              Submission filters
            </h2>

            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="w-[180px]"
                  aria-label="Filter by submission status"
                >
                  {statusFilter === "all"
                    ? "All Statuses"
                    : statusFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="before due date">
                    Before Due Date
                  </SelectItem>
                  <SelectItem value="after due date">
                    After Due Date
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={gradedFilter} onValueChange={setGradedFilter}>
                <SelectTrigger
                  className="w-[180px]"
                  aria-label="Filter by grading status"
                >
                  {gradedFilter === "all"
                    ? "All Grading"
                    : gradedFilter === "graded"
                    ? "Graded"
                    : "Not Graded"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grading</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="not_graded">Not Graded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <h1
            id="no-submissions-heading"
            className="text-2xl font-bold text-gray-800"
            role="status"
          >
            No submissions found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main
      className="p-6 space-y-6"
      role="main"
      aria-labelledby="submissions-heading"
    >
      <BackButton className="mb-10" />

      <h1 id="submissions-heading" className="sr-only">
        Assessment submissions
      </h1>

      {/* Filters */}
      <section aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="sr-only">
          Submission filters
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-[180px]"
              aria-label="Filter by submission status"
            >
              {statusFilter === "all"
                ? "All Statuses"
                : statusFilter}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="before due date">
                Before Due Date
              </SelectItem>
              <SelectItem value="after due date">
                After Due Date
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={gradedFilter} onValueChange={setGradedFilter}>
            <SelectTrigger
              className="w-[180px]"
              aria-label="Filter by grading status"
            >
              {gradedFilter === "all"
                ? "All Grading"
                : gradedFilter === "graded"
                ? "Graded"
                : "Not Graded"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grading</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
              <SelectItem value="not_graded">Not Graded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Submissions */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-live="polite"
        aria-label="Submission list"
      >
        {filteredSubmissions.map((item) => (
          <Link
            key={item._id}
            to={`/teacher/assessments/${item._id}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
            aria-label={`View submission from ${item?.studentId?.firstName} ${item?.studentId?.lastName}`}
          >
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={item?.studentId?.profileImg?.url || avatar}
                    alt={`Profile picture of ${item?.studentId?.firstName} ${item?.studentId?.lastName}`}
                  />
                  <AvatarFallback aria-hidden="true">
                    {item?.studentId?.firstName?.charAt(0)}
                    {item?.studentId?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-lg font-semibold">
                    {item?.studentId?.firstName}{" "}
                    {item?.studentId?.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {item?.studentId?.email}
                  </p>
                </div>
              </div>

              <CardContent className="space-y-2 px-0">
                <div>
                  <span className="text-sm">Status:</span>
                  <p
                    className={`${
                      item?.status === "before due date"
                        ? "text-green-500"
                        : "text-red-500"
                    } text-sm font-medium`}
                  >
                    {item?.status}
                  </p>
                </div>

                <div>
                  <span className="text-sm">Grading:</span>
                  <p
                    className={`${
                      item?.graded
                        ? "text-green-600"
                        : "text-yellow-500"
                    } text-sm font-medium`}
                  >
                    {item?.graded ? "Graded" : "Not Graded"}
                  </p>
                </div>

                <div>
                  <span className="text-sm">Submitted At:</span>
                  <time
                    className="text-sm"
                    dateTime={item?.submittedAt}
                  >
                    {new Date(item?.submittedAt).toLocaleString()}
                  </time>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default AllSubmission;
