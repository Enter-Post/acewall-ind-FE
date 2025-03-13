"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, FileText, MessageSquare, Play, Trophy, Users } from "lucide-react"

export default function TeacherCourseDetails() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>

      <div className="space-y-8">
        {/* Course Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Image */}
          <div className="md:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Course thumbnail"
              className="w-full h-auto rounded-md object-cover aspect-video"
            />
          </div>

          {/* Course Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Uploaded: Jan 21, 2020</span>
                <span>Last Updated: Sep 11, 2021</span>
              </div>

              <h2 className="text-2xl font-semibold">2021 Complete Python Bootcamp From Zero to Hero in Python</h2>
              <p className="text-muted-foreground">
                3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.
              </p>
            </div>

            <div className="flex items-center justify-between">
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">$13.99</div>
                <div className="text-sm text-muted-foreground">Course prices</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$131,800.00</div>
                <div className="text-sm text-muted-foreground">USD dollar revenue</div>
              </div>
            </div>

            {/* <div className="flex justify-between items-center">
              <Button className="bg-green-500 hover:bg-green-600 text-white">Withdraw Money</Button>
              <Button variant="ghost" size="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div> */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Play className="h-5 w-5 text-orange-500" />}
            value="1,957"
            label="Lectures"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<MessageSquare className="h-5 w-5 text-indigo-500" />}
            value="51,429"
            label="Total Comments"
            bgColor="bg-indigo-50"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-rose-500" />}
            value="9,419,418"
            label="Students enrolled"
            bgColor="bg-rose-50"
          />
          <StatCard
            icon={
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9H21M9 21V9M7 3H17M5 3H19V21H5V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            value="Beginner"
            label="Course level"
            bgColor="bg-green-50"
          />
      
          <StatCard
            icon={<FileText className="h-5 w-5 text-amber-500" />}
            value="142"
            label="Attach File"
            bgColor="bg-amber-50"
          />
        </div>

        {/* Rating Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Overall Course Rating</h3>
          </div>

          <div className="bg-green-50 p-8 rounded-lg flex flex-col items-center justify-center">
            <div className="text-5xl font-bold mb-4">4.8</div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${index < 4 ? "text-orange-400" : "text-orange-400"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {/* Half star for 4.8 rating */}
              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#halfStar)"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <div className="text-sm text-muted-foreground">Course Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, bgColor }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className={`p-4 flex items-center gap-4 ${bgColor}`}>
        <div className="p-2 rounded-md bg-white">{icon}</div>
        <div>
          <div className="font-bold text-lg">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}

