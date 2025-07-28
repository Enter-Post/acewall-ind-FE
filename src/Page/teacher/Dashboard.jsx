"use client";

import { useContext, useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bell,
  GraduationCap,
  MessageSquare,
  Users,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState();
  const [students, setStudents] = useState();
  const [recentComments, setRecentComments] = useState([]);

  console.log(recentComments, "recentComments");

  // console.log(courses);
  const { user } = useContext(GlobalContext);
  const teacherId = user._id;

  ///courses
  useEffect(() => {
    const getTeacherCourse = async () => {
      await axiosInstance("/course/getindividualcourse")
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTeacherCourse();
  }, []);

  //students
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

  useEffect(() => {
    const getRecentComments = async () => {
      await axiosInstance("comment/teacher/allComment")
        .then((res) => {
          console.log(res, "commments");
          setRecentComments(res.data.recentComments);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRecentComments();
  }, []); // Don't forget to include teacherId in the dependency array

  const metrics = [
    {
      title: "Courses",
      value: courses?.length || 0,
      icon: (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <BookOpen size={16} className="text-green-600" />
        </div>
      ),
    },
    {
      title: "Students",
      value: students?.length || 0,
      icon: (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Users size={16} className="text-blue-600" />
        </div>
      ),
    },
  ];

  const recentSales = Array(3).fill({
    user: "Kevin",
    action: "purchased on your lecture",
    target: "What is ux 2021 UI/UX design with figma",
    time: "Just now",
  });

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="">
        <h1 className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">
          Dashboard
        </h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentComments.length > 0 ? (
                recentComments.map((comment, i) => (
                  <Link key={i} to={`/teacher/courses/courseDetail/${comment.course}`} className="flex flex-col gap-1">
                    <div
                      className="flex items-start gap-4 bg-white p-4 rounded-lg border"
                    >
                      {/* User Avatar */}
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <MessageSquare size={18} />
                      </div>

                      {/* Comment Content */}
                      <div className="flex justify-between w-full">
                        {/* User Name and Action */}
                        <div className="">
                          <p className="text-sm">
                            <span className="font-sm text-gray-700">
                              {`${comment.createdby.firstName} ${comment.createdby.middleName} ${comment.createdby.lastName}`}
                            </span>{" "}
                            {comment.action}
                          </p>

                          {/* Comment Text */}
                          <span className="text-gray-800 font-medium mt-1 block">
                            {comment.text}
                          </span>
                        </div>

                        {/* Timestamp */}
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No recent activity to show.
                </p>
              )}
            </div>
          </div>

          {/* Recent Courses */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Courses</h2>
            <div className="space-y-4">
              {courses?.slice(0, 3).map((course, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg border"
                >
                  <img
                    src={course?.thumbnail.url || "/placeholder.svg"}
                    alt={course?.courseTitle}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-sm mb-1">
                      {course?.courseTitle}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">
                        {course?.category?.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
