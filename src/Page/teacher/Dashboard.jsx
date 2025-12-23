"use client";

import { useContext, useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState();
  const [students, setStudents] = useState();
  const [recentComments, setRecentComments] = useState([]);

  const { user } = useContext(GlobalContext);
  const teacherId = user._id;

  // Courses
  useEffect(() => {
    const getTeacherCourse = async () => {
      await axiosInstance("course/getTeacherCoursesForDesboard")
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err, "courses error");
        });
    };
    getTeacherCourse();
  }, []);

  // Students
  useEffect(() => {
    const getTeacherstudents = async () => {
      await axiosInstance("/course/getallCoursesforTeacher")
        .then((res) => {
          setStudents(res.data.students);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTeacherstudents();
  }, []);

  // Recent comments
  useEffect(() => {
    const getRecentComments = async () => {
      await axiosInstance("comment/teacher/allComment")
        .then((res) => {
          setRecentComments(res.data.recentComments);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRecentComments();
  }, []);

  const metrics = [
    {
      title: "Total Courses",
      value: courses?.total || 0,
      icon: (
        <div
          className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
          aria-hidden="true"
        >
          <BookOpen size={16} className="text-green-600" />
        </div>
      ),
    },
    {
      title: "Students",
      value: students?.length || 0,
      icon: (
        <div
          className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
          aria-hidden="true"
        >
          <Users size={16} className="text-blue-600" />
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen"
      role="main"
      aria-labelledby="dashboard-heading"
    >
      <h1
        id="dashboard-heading"
        className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg"
      >
        Dashboard
      </h1>

      {/* Metrics */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Dashboard metrics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, i) => (
            <Card key={i} role="region" aria-label={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold text-gray-800"
                  aria-live="polite"
                >
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <section aria-labelledby="recent-activity-heading">
          <h2
            id="recent-activity-heading"
            className="text-lg font-semibold mb-4"
          >
            Recent Activity
          </h2>

          <div className="space-y-4" aria-live="polite">
            {recentComments.length > 0 ? (
              recentComments.map((comment, i) => (
                <Link
                  key={i}
                  to={`/teacher/courses/courseDetail/${comment.course}`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                  aria-label={`View course comment from ${comment?.createdby?.firstName}`}
                >
                  <article className="flex items-start gap-4 bg-white p-4 rounded-lg border">
                    <div
                      className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"
                      aria-hidden="true"
                    >
                      <MessageSquare size={18} />
                    </div>

                    <div className="flex justify-between w-full">
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">
                            {`${comment?.createdby?.firstName} ${comment?.createdby?.middleName || ""} ${comment?.createdby?.lastName}`}
                          </span>{" "}
                          {comment.action}
                        </p>

                        <span className="text-gray-800 font-medium mt-1 block">
                          {comment.text}
                        </span>
                      </div>

                      <time
                        className="text-xs text-gray-500 mt-2"
                        dateTime={comment.createdAt}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500" role="status">
                No recent activity to show.
              </p>
            )}
          </div>
        </section>

        {/* Recent Courses */}
        <section aria-labelledby="recent-courses-heading">
          <h2
            id="recent-courses-heading"
            className="text-lg font-semibold mb-4"
          >
            Recent Courses
          </h2>

          <div className="space-y-4" aria-live="polite">
            {courses?.published.slice(0, 3).map((course) => (
              <Link
                key={course._id}
                to={`/teacher/courses/courseDetail/${course._id}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                aria-label={`View course ${course.courseTitle}`}
              >
                <article className="flex items-start gap-4 bg-white p-4 rounded-lg border hover:shadow">
                  <img
                    src={course?.thumbnail.url || "/placeholder.svg"}
                    alt={`Thumbnail for ${course?.courseTitle}`}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-sm mb-1">
                      {course?.courseTitle}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {course?.category?.title}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
