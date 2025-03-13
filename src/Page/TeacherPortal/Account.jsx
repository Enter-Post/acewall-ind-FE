"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Users, BookOpen, Facebook, Twitter, Instagram, Youtube, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TeacherAccount() {
  const [activeTab, setActiveTab] = useState("courses")

  const instructor = {
    name: "Vako Shvili",
    isTopRated: true,
    title: "Web Designer & Best Selling Instructor",
    rating: 4.8,
    reviews: 214633,
    students: 430117,
    courses: 7,
    website: "https://www.vakoshvili.com",
    socialLinks: ["facebook", "twitter", "instagram", "youtube"],
    about: `One day Vako had enough with the 9-to-5 grind, or more like the 8-to-8 in his case, and said to job "where the get out" and never looked back.

He decided to work on his dream: be his own boss, travel the world, only do the work he enjoys, and make a lot more money in the process. No more begging for raises, vacation days, or having to deal with annoying bosses.

After trying everything from e-commerce stores to freelance design, Vako fell in love with the idea when he started teaching design. Vako fell in love with the idea that gives him the liberty of his dreams.

Vako realizes that people who take courses on Udemy want to transform their lives. Today with his courses and coaching programs, he helps people to transform their lives, just like he did once.`,
    courseCount: 12,
  }

  const courses = [
    {
      id: 1,
      title: "Machine Learning A-Z™: Hands-On Python & R in Data Science",
      category: "DEVELOPMENT",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Selenium WebDriver with Java -Basics to Advanced+Frameworks",
      category: "BUSINESS",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms Essentials (2023)",
      category: "DEVELOPMENT",
      price: 57,
      rating: 5.0,
      students: 265712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 4,
      title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
      category: "DEVELOPMENT",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 5,
      title: "Graphic Design Masterclass - Learn GREAT Design",
      category: "DEVELOPMENT",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 6,
      title: "Digital Marketing Masterclass - 23 Courses in 1",
      category: "BUSINESS",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 7,
      title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
      category: "DEVELOPMENT",
      price: 57,
      rating: 5.0,
      students: 266712,
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-xl font-bold mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-pink-100">
              <img
                src="/placeholder.svg?height=128&width=128"
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{instructor.name}</h2>
              {instructor.isTopRated && (
                <Badge variant="outline" className="bg-orange-50 text-orange-500 border-orange-200 font-medium">
                  Top Rated
                </Badge>
              )}
            </div>

            <p className="text-gray-600 mb-3">{instructor.title}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="font-medium">{instructor.rating}</span>
                <span className="text-gray-500 text-sm">({formatNumber(instructor.reviews)} reviews)</span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{formatNumber(instructor.students)}</span>
                <span className="text-gray-500 text-sm">students</span>
              </div>

              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{instructor.courses}</span>
                <span className="text-gray-500 text-sm">courses</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={instructor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                {instructor.website}
              </a>

              <div className="flex gap-2">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-pink-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold uppercase mb-4">About Me</h3>
        <div className="whitespace-pre-line text-gray-700">{instructor.about}</div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="courses" className="mb-8">
        <div className="border-b">
          <TabsList className="bg-transparent h-auto p-0 mb-[-1px]">
            <TabsTrigger
              value="courses"
              className={cn(
                "px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none font-medium",
                "data-[state=active]:bg-transparent",
              )}
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className={cn(
                "px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none font-medium",
                "data-[state=active]:bg-transparent",
              )}
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Vako Courses ({instructor.courseCount})</h3>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  <h4 className="font-medium mb-3 line-clamp-2">{course.title}</h4>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-3 w-3" />
                      <span>{formatNumber(course.students)} students</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t">
                  <div className="text-right">
                    <span className="text-orange-500 font-bold">${course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">Reviews will appear here</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

