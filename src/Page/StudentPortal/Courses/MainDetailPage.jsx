import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Star, Users, BookOpen, Clock, Send } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import LoadingLoader from "@/CustomComponent/LoadingLoader";
import RatingStars from "@/CustomComponent/RatingStars";
import CommentSection from "@/CustomComponent/Student/CommentSection";
import RatingSection from "@/CustomComponent/Student/RatingSection";

export default function CourseOverview() {
  const { id } = useParams() || { id: "68115952b4991f70a28c486f" }; // Default ID or from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  console.log(course, "course");

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/course/get/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        console.log("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingLoader />
      </div>
    );
  }

  if (!course) {
    return <div className="p-6 text-center">Course not found.</div>;
  }

  // Calculate average rating
  const averageRating =
    course.rating && course.rating.length > 0
      ? course.rating.reduce((sum, r) => sum + r.value, 0) /
        course.rating.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Info Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {course.basics.courseTitle}
            </h1>
            <p className="text-gray-600 mb-4">
              {course.basics.courseDescription}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {course.basics.category.title}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {course.basics.language.charAt(0).toUpperCase() +
                  course.basics.language.slice(1)}
              </Badge>
              <div className="flex items-center text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(course.averageRating) ? "fill-yellow-500" : ""
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  ({course.rating.length}{" "}
                  {course.rating.length === 1 ? "rating" : "ratings"})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={course.createdby.profileImg || "/placeholder.svg"}
                  alt={`${course.createdby.firstName} ${course.createdby.lastName}`}
                />
                <AvatarFallback>
                  {course.createdby.firstName.charAt(0)}
                  {course.createdby.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {course.createdby.firstName} {course.createdby.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {course.createdby.pronouns}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs for Course Content, Reviews, etc. */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 bg-transparent border-b border-gray-200 w-full text-green-600">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="pt-6">
              {/* Teaching Points */}
              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-bold">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {course.basics.teachingPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{point.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Requirements</h2>
                <ul className="space-y-2">
                  {course.basics.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-800 mt-2 flex-shrink-0" />
                      <span>{req.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.chapters.length} Chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Self-paced</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.student.length} Students</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.chapters.map((chapter, index) => (
                    <Card key={chapter._id} className="border border-gray-200">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Chapter {index + 1}: {chapter.title}
                            </CardTitle>
                            <CardDescription>
                              {chapter.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-gray-50">
                            {chapter.lessons.length} Lessons
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{lesson.title}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/student/mycourses/chapter/${chapter._id}`}
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full">
                            View Chapter
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                {/* Rating Section */}
                <RatingSection id={id} course={course} />

                {/* Comments Section */}
                <CommentSection id={id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Course Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <Card className="border border-gray-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={course.basics.thumbnail || "/placeholder.svg"}
                  alt={course.basics.courseTitle}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">
                    ${course.basics.price}
                  </span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Continue Learning
                </Button>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{course.chapters.length} chapters</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Access on mobile and desktop</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={course.createdby.profileImg || "/placeholder.svg"}
                      alt={`${course.createdby.firstName} ${course.createdby.lastName}`}
                    />
                    <AvatarFallback>
                      {course.createdby.firstName.charAt(0)}
                      {course.createdby.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {course.createdby.firstName} {course.createdby.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {course.createdby.pronouns}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Email: {course.createdby.email}</p>
                  <p>Courses: {course.createdby.courses.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
