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
  title: "Complete Biology Masterclass: From Cells to Systems",
  subtitle: "Understand the foundations of life and living organisms with real-world applications.",
  instructor: {
    name: "Dr. Samantha Lee",
    profileImage: "instructor-biology.jpg",
    role: "Biology Educator & Researcher",
    bio: "PhD in Molecular Biology with over 10 years of experience teaching biology at high school and college levels.",
    rating: 4.8,
    students: 2800,
  },
  price: {
    original: "$179",
    discounted: "$79",
  },
  rating: 4.8,
  reviews: [
    {
      student: "Daniel Kim",
      rating: 5,
      comment: "This course helped me prep for my AP Bio exam. Super clear explanations!",
    },
    {
      student: "Sofia Martinez",
      rating: 4.6,
      comment: "Love the visuals and the depth. Great for beginners and refreshers alike.",
    },
  ],
  curriculum: [
    {
      section: "Introduction to Biology",
      lessons: [
        { title: "What is Biology?", duration: "6 min" },
        { title: "Scientific Method & Experimentation", duration: "12 min" },
      ],
    },
    {
      section: "Cell Biology",
      lessons: [
        { title: "Prokaryotic vs. Eukaryotic Cells", duration: "15 min" },
        { title: "Organelles and Their Functions", duration: "20 min" },
      ],
    },
    {
      section: "Human Body Systems",
      lessons: [
        { title: "The Nervous System", duration: "25 min" },
        { title: "The Circulatory System", duration: "18 min" },
      ],
    },
  ],
  description:
    "Dive into the science of life in this detailed biology course. From the microscopic world of cells to complex human systems, this course equips you with a deep understanding of how living organisms function, evolve, and interact.",
  requirements: [
    "Basic understanding of science is helpful but not required",
    "Notebook or device for taking notes",
    "Curiosity about how life works",
  ],
  whatYouWillLearn: [
    "Master the basics of cell structure and function",
    "Understand DNA, genetics, and heredity",
    "Explore how body systems work together",
    "Learn ecological relationships and evolution concepts",
  ],
  relatedCourses: [
    {
      title: "Human Anatomy & Physiology Essentials",
      price: "$27.99",
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=240",
    },
    {
      title: "Genetics: From Mendel to Modern Science",
      price: "$22.99",
      rating: 4.9,
      image: "/placeholder.svg?height=120&width=240",
    },
  ],
};

// AllCoursesDetail Component
const Biology = () => {
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
                    src="https://plus.unsplash.com/premium_photo-1681399991680-b2be2e767b32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                      className="data-[state=active]:border-b-2 text-xs data-[state=active]:border-gray-800 rounded-none"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="curriculum"
                      className="data-[state=active]:border-b-2 text-xs data-[state=active]:border-gray-800 rounded-none"
                    >
                      Curriculum
                    </TabsTrigger>
                    <TabsTrigger
                      value="instructor"
                      className="data-[state=active]:border-b-2 text-xs data-[state=active]:border-gray-800 rounded-none"
                    >
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:border-b-2 text-xs data-[state=active]:border-gray-800 rounded-none"
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
                        "https://plus.unsplash.com/premium_photo-1681399991680-b2be2e767b32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default Biology;
