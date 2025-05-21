import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AllSubmission = () => {
  const [submission, setSubmission] = useState(null);
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

  if (!submission) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (submission.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-bold text-gray-800">
          No submission found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {submission.map((item) => (
        <Link
          key={item._id}
          className="w-full"
          to={`/teacher/assessments/${item._id}`}
        >
          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={item?.studentId?.profileImg}
                  alt="Profile Picture"
                />
                <AvatarFallback>
                  {item?.studentId?.firstName?.charAt(0)}
                  {item?.studentId?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {item?.studentId?.firstName} {item?.studentId?.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {item?.studentId?.email}
                </p>
              </div>
            </div>
            <CardContent className="space-y-2 px-0">
              <p>
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
              </p>
              <p className="">
                <span className="text-sm">Submitted At:</span>{" "}
                <p className="text-sm">
                  {new Date(item?.submittedAt).toLocaleString()}
                </p>
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AllSubmission;
