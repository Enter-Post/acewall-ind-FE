import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  PlayCircle,
  Star,
  StarHalf,
  User,
} from "lucide-react";

const courseDetails = {
  title:
    "Complete Website Responsive Design: from Figma to Webflow to Website Design",
  subtitle:
    "In 5 hours+ Learn to design websites with Webflow, and make it a living masterpiece",
  instructor: {
    name: "John Doe",
    profileImage: "instructor.jpg",
    role: "Web Designer",
    bio: "Experienced Web Designer with a passion for modern UI/UX.",
    rating: 4.8,
    students: 1200,
  },
  price: {
    original: "$199",
    discounted: "$99",
  },
  rating: 4.8,
  reviews: [
    {
      student: "Alice Johnson",
      rating: 5,
      comment: "Great course! Helped me improve my design skills.",
    },
    {
      student: "Michael Smith",
      rating: 4.5,
      comment: "Well-structured and informative.",
    },
  ],
  curriculum: [
    {
      section: "Introduction",
      lessons: [
        { title: "Welcome to the Course", duration: "5 min" },
        { title: "Understanding Web Design Principles", duration: "10 min" },
      ],
    },
    {
      section: "UI/UX Basics",
      lessons: [
        { title: "Typography and Color Theory", duration: "15 min" },
        { title: "Creating Wireframes", duration: "20 min" },
      ],
    },
  ],
  description:
    "Learn how to create and design websites with Webflow, and make it a living masterpiece...",
  requirements: [
    "Basic HTML/CSS knowledge (helpful, but not required)",
    "No coding required (everything can be done visually in Webflow)",
    "A computer with internet connection",
    "Free Webflow account (we'll create one during the course)",
  ],
  whatYouWillLearn: [
    "Understand core UI/UX principles",
    "Create modern website layouts",
    "Master responsive design techniques",
    "Use Figma, Adobe XD, and Sketch",
  ],
  relatedCourses: [
    {
      title: "Advanced Webflow Techniques: Video Editing in Premiere",
      price: "$19.99",
      rating: 4.5,
      image: "/placeholder.svg?height=120&width=240",
    },
    {
      title: "Mastering Web Design with Sketch",
      price: "$29.99",
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=240",
    },
  ],
};

const courses = [
  {
    id: 4,
    course: "Biology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 12,
    Language: "English",
    Prise: 101,
    image:
      "https://plus.unsplash.com/premium_photo-1681399991680-b2be2e767b32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Michael Brown",
  },
  {
    id: 5,
    course: "History",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 15,
    Language: "English",
    Prise: 110,
    image:
      "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. Richard Adams",
  },
  {
    id: 6,
    course: "English Literature",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 8,
    Language: "English",
    Prise: 75,
    image:
      "https://images.unsplash.com/photo-1506513083865-434a8a207e11?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Olivia Green",
  },
  {
    id: 7,
    course: "Computer Science",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 18,
    Language: "English",
    Prise: 89,
    image:
      "https://plus.unsplash.com/premium_photo-1661872817492-fd0c30404d74?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. Samuel Turner",
  },
  {
    id: 8,
    course: "Geography",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 10,
    Language: "English",
    Prise: 48,
    image:
      "https://plus.unsplash.com/premium_photo-1681488098851-e3913f3b1908?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Clara Foster",
  },
  {
    id: 9,
    course: "Art",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 5,
    Prise: 94,
    Language: "English",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Sarah Collins",
  },
  {
    id: 10,
    course: "Physical Education",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 6,
    Language: "English",
    Prise: 78,
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. David Martin",
  },
  {
    id: 11,
    course: "Music",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 9,
    Language: "English",
    Prise: 76,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Ms. Linda Lee",
  },
  {
    id: 12,
    course: "Economics",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 7,
    Language: "English",
    Prise: 98,
    image:
      "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Charles Young",
  },
  {
    id: 13,
    course: "Philosophy",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 5,
    Language: "English",
    Prise: 82,
    image:
      "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Daniel Harris",
  },
  {
    id: 14,
    course: "Psychology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 14,
    Language: "English",
    Prise: 91,
    image:
      "https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Sophia King",
  },
  {
    id: 15,
    course: "Sociology",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 11,
    Language: "English",
    Prise: 98,
    image:
      "https://plus.unsplash.com/premium_photo-1681079526863-7ba34e838026?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Laura White",
  },
  {
    id: 16,
    course: "Statistics",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 13,
    Language: "English",
    Prise: 40,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Mr. William Scott",
  },
  {
    id: 17,
    course: "Engineering",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 10,
    Language: "English",
    Prise: 189,
    image:
      "https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Prof. Steven Carter",
  },
  {
    id: 18,
    course: "Environmental Science",
    Grade: 10,
    rating: 3,
    NumberOfLecture: 12,
    Language: "English",
    Prise: 200,
    image:
      "https://plus.unsplash.com/premium_photo-1661540998860-da104459c959?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Alice Green",
  },
  {
    id: 19,
    course: "Political Science",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 8,
    Language: "English",
    Prise: 45,
    image:
      "https://images.unsplash.com/photo-1526615735835-530c611a3d8a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Brian Hall",
  },
  {
    id: 20,
    course: "Anthropology",
    Grade: 10,
    rating: 5,
    NumberOfLecture: 11,
    Language: "English",
    Prise: 99,
    image:
      "https://plus.unsplash.com/premium_photo-1661906977668-ece2c96385c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Henry Black",
  },
  {
    id: 21,
    course: "Astronomy",
    Grade: 10,
    rating: 4,
    NumberOfLecture: 9,
    Language: "English",
    Prise: 53,
    image:
      "https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: "Dr. Nathan Allen",
  },
];

// AllCoursesDetail Component
const AllCoursesDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6">
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {courseDetails.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{courseDetails.subtitle}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={courseDetails.instructor.profileImage}
                          alt="Instructor"
                        />
                        <AvatarFallback>IN</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <div className="text-sm font-medium">
                          {courseDetails.instructor.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {courseDetails.instructor.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <StarHalf
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {courseDetails.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      (1,234 ratings)
                    </span>
                  </div>
                </div>

                <div className="relative aspect-video">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                    alt="Course preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 shadow-lg cursor-pointer">
                      <PlayCircle size={32} className="text-gray-800" />
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-4 bg-transparent border-b border-gray-200 border w-full text-green-600">
                    <TabsTrigger
                      value="overview"
                      className="px-6 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none rounded-none h-full"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="curriculum"
                      className="px-6 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none rounded-none h-full"
                    >
                      Curriculum
                    </TabsTrigger>
                    <TabsTrigger
                      value="instructor"
                      className="px-6 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none rounded-none h-full"
                    >
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="px-6 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none rounded-none h-full"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700 mb-4">
                      {courseDetails.description}
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">
                      What you will learn in this course
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {courseDetails.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2
                            size={20}
                            className="text-green-500 mt-0.5"
                          />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-4">
                      Course requirements
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      {courseDetails.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="curriculum" className="p-6 ">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-sm font-medium">
                          {courseDetails.curriculum.length} Chapters
                        </span>
                        <span className="text-sm text-gray-500 ml-4">
                          Total time: 3h 20m
                        </span>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {courseDetails.curriculum.map((section, index) => (
                        <AccordionItem key={index} value={`section-${index}`}>
                          <AccordionTrigger className="py-4 text-base font-medium">
                            {section.section}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-6">
                              {section.lessons.map((lesson, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between py-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <PlayCircle
                                      size={16}
                                      className="text-gray-500"
                                    />
                                    <span className="text-sm">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {lesson.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="instructor" className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={courseDetails.instructor.profileImage}
                          alt="Instructor"
                        />
                        <AvatarFallback>VS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold">
                          {courseDetails.instructor.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {courseDetails.instructor.role}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Star
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          <span className="text-sm font-medium">
                            {courseDetails.instructor.rating} Instructor Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <User size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-500">
                            {courseDetails.instructor.students} Students
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <PlayCircle size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-500">
                            5 Courses
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-4">
                          {courseDetails.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="p-6">
                    <div className="flex flex-col gap-8">
                      <div className="">
                        <div className="text-center">
                          <div className="text-4xl font-bold">
                            {courseDetails.rating}
                          </div>
                          <div className="flex justify-center my-2">
                            {[...Array(4)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-yellow-400 fill-yellow-400"
                              />
                            ))}
                            <StarHalf
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          </div>
                          <div className="text-sm text-gray-500">
                            Course Rating
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <h3 className="text-lg font-bold mb-4">
                          Students Feedback
                        </h3>
                        <div className="space-y-6">
                          {courseDetails.reviews.map((review, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-200 pb-6"
                            >
                              <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40&text=S${index}`}
                                    alt="Student"
                                  />
                                  <AvatarFallback>S{index}</AvatarFallback>
                                </Avatar>
                                <div>  
                                  <div className="font-medium">
                                    {review.student}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    {/* {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))} */}
                                  </div>
                                  <p className="text-sm mt-2">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-md p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold">
                    {courseDetails.price.discounted}
                  </div>
                  <div className="text-sm line-through text-gray-500">
                    {courseDetails.price.original}
                  </div>
                </div>
                <div className="text-sm text-red-500 font-medium mb-4">
                  5 days left at this price!
                </div>
                <Button className="w-full mb-4 bg-green-600 hover:bg-green-700">
                  Add to cart
                </Button>
                <div className="text-center text-sm text-gray-500 mb-6">
                  30-Day Money-Back Guarantee
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">
                    This course includes:
                  </div>
                  <div className="flex items-start gap-2">
                    <PlayCircle size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">5 hours on-demand video</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">Full lifetime access</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">Access on mobile and TV</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">Certificate of completion</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">Projects included</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-gray-700 mt-0.5" />
                    <div className="text-sm">Beginner level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseDetails.relatedCourses.map((relatedCourse, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <img
                      src={
                        "https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      }
                      alt={`Related course ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">
                      {relatedCourse.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs">(234)</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium">
                        {relatedCourse.price}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                      >
                        Start Learning
                      </Button>
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
};

export default AllCoursesDetail;
