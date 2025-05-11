import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const Navigate = useNavigate();

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

  // console.log(course.createdby._id, "course");

  const handleConversation = async () => {
    await axiosInstance
      .post("conversation/create", {
        memberId: course?.createdby._id,
      })
      .then((res) => {
        console.log(res);
        Navigate("/student/messages");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Course Header */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {course.basics.courseTitle}
        </h1>

        <p className="text-gray-600 text-base  leading-relaxed">
          {course.basics.courseDescription}
        </p>

        {/* Tags and Info */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
          {/* Category */}
          <div className="flex items-center gap-2">
            <h3 className="text-gray-600 text-sm font-semibold mb-1">
              Category
            </h3>
            <Badge className="bg-green-100 text-green-800 text-sm border-none">
              {course.basics.category.title}
            </Badge>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2">
            <h3 className="text-gray-600 text-sm font-semibold mb-1">
              Language
            </h3>
            <Badge className="bg-blue-100 text-blue-800 text-sm border-none capitalize">
              {course.basics.language}
            </Badge>
          </div>
        </div>

      
        {/* Instructor Info */}
        <section className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarImage
                src={course.createdby.profileImg || "/placeholder.svg"}
                alt={`${course.createdby.firstName} ${course.createdby.lastName}`}
                className="ring-2 ring-black ring-offset-2 rounded-full "
              />
              <AvatarFallback>
                {course.createdby.firstName.charAt(0)}
                {course.createdby.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">
                {course.createdby.firstName} {course.createdby.lastName}
              </p>
              <p className="text-sm text-gray-500">{course.createdby.email}</p>
            </div>
          </div>
          <div>
            <Button
              className="bg-green-500"
              onClick={() => handleConversation()}
            >
              Message
            </Button>
          </div>
        </section>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-12 bg-white z-10"
      >
        {/* Tab List */}
        <TabsList className="flex flex-wrap justify-center gap-4 w-full  sm:gap-10  bg-white p-1 shadow-inner">
          {["Overview", "Content", "Reviews"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="px-3 py-2 text-base font-medium  capitalize transition-all duration-300  
              text-gray-700 hover:text-green-600 hover:bg-gray-50 
              data-[state=active]:bg-gray-100 data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="py-8 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.basics.teachingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <span>{point.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.basics.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <span>{req.value}</span>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="py-8 space-y-6">
          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
              <Card
                key={chapter._id}
                className="border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-y-2">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Chapter {index + 1}: {chapter.title}
                      </CardTitle>
                      <CardDescription>{chapter.description}</CardDescription>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 self-start">
                      {chapter.lessons.length} Lessons
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {chapter.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
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
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews" className="py-8 space-y-8">
          <RatingSection id={id} course={course} />
          <CommentSection id={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
