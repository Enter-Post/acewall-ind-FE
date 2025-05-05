"use client";

import { useEffect, useState } from "react";
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

export default function TeacherDashboard() {
  const [courses, setCourses] = useState();
  const [students, setStudents] = useState();
  const [recentActivity, setRecentActivity] = useState([]);

  console.log(courses);

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
    const getTeacherCourse = async () => {
      await axiosInstance("/course/getpurchaseCourse")
        .then((res) => {
          setStudents(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTeacherCourse();
  }, []);

  useEffect(() => {
    const getRecentComments = async () => {
      try {
        const res = await axiosInstance.get("/comment/getTeacherAllCourseComments");
        const comments = res.data.comments;

        const formatted = comments.map((comment) => ({
          user: "You",
          action: "commented on",
          target: comment.course?.basics?.courseTitle || "a course",
          time: new Date(comment.createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        }));

        setRecentActivity(formatted);
      } catch (err) {
        console.error("Error fetching recent comments:", err);
      }
    };

    getRecentComments();
  }, []);



  const metrics = [
    {
      title: "Sales",
      value: "$5,600",
      icon: (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M18.5 6.5a3 3 0 0 0-4.242 0L12 8.757l-2.257-2.257a3 3 0 0 0-4.242 4.242L12 17.243l6.5-6.5a3 3 0 0 0 0-4.242z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Courses",
      value: courses?.length,
      icon: (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <BookOpen size={16} className="text-green-600" />
        </div>
      ),
    },
    {
      title: "Students",
      value: students?.length,
      icon: (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <Users size={16} className="text-green-600" />
        </div>
      ),
    },

  ];

  // const recentActivity = Array(3).fill({
  //   user: "Kevin",
  //   action: "comments on your lecture",
  //   target: "What is ux 2021 UI/UX design with figma",
  //   time: "Just now",
  // });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
          {metrics.map((metric, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg border"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                        <span className="text-gray-800 font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent activity to show.</p>
              )}
            </div>
          </div>


          {/* Recent Sales */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Sales</h2>
            </div>
            <div className="space-y-4">
              {recentSales.map((sale, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg border"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{sale.user}</span>{" "}
                      {sale.action}{" "}
                      <span className="text-gray-500">{sale.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{sale.time}</p>
                  </div>
                </div>
              ))}
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
                    src={course.basics.thumbnail || "/placeholder.svg"}
                    alt={course.basics.courseTitle}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-sm mb-1">
                      {course.basics.courseTitle}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">
                        {course?.basics?.category?.title}
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
