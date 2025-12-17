import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader, LibraryBig } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import RatingSection from "@/CustomComponent/Student/RatingSection";
import CommentSection from "@/CustomComponent/Student/CommentSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import avatar from "@/assets/avatar.png";
import { format } from "date-fns";
import { CourseContext } from "@/Context/CoursesProvider";
import { GlobalContext } from "@/Context/GlobalProvider";

export default function CourseOverview() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const { user, checkAuth } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { setQuarters } = useContext(CourseContext);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/enrollment/studentCourseDetails/${id}`);
        setCourse(res.data.enrolledCourse.courseDetails);
        setQuarters(res.data.enrolledCourse.courseDetails.quarter);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCourseDetails();
  }, [id, setQuarters]);

  const handleConversation = async () => {
    try {
      await axiosInstance.post("conversation/create", {
        memberId: course?.createdby._id,
      });
      navigate("/student/messages");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnenroll = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/enrollment/unenroll/${course?._id}`);
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Unenrollment failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewSignOut = async () => {
    try {
      await axiosInstance.post("auth/previewSignOut");
      checkAuth();
      navigate(`/teacher/courses/courseDetail/${course._id}`);
    } catch (error) {
      console.error("Preview signin failed:", error);
    }
  };

  if (loading) {
    return (
      <main aria-busy="true" className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" aria-label="Loading" />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="p-6 text-center" role="alert">
        Course not found.
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="course-title">
      {/* Teacher Preview Button */}
      {user?.role === "teacherAsStudent" && (
        <Button
          className="mb-4 bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
          onClick={handlePreviewSignOut}
          aria-label="View course as teacher"
        >
          View As Teacher
        </Button>
      )}

      {/* Course Header */}
      <section
        className="space-y-6 bg-cover bg-center bg-no-repeat px-6 py-10 rounded-lg"
        style={{ backgroundImage: `url(${course.thumbnail?.url})` }}
        aria-label="Course header"
      >
        <div className="bg-[#ffffffa0] backdrop-filter backdrop-blur-xs bg-backdrop-blur-md p-6 rounded-lg space-y-6">
          <h1
            id="course-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black"
          >
            {course.courseTitle}
          </h1>

          <p className="text-gray-900 font-medium leading-relaxed">{course.courseDescription}</p>

          <div className="flex items-center gap-10 mt-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900 text-sm font-semibold mb-1">Topic</h3>
              <Badge className="bg-green-100 text-green-800 text-sm border-none">
                {course?.category?.title}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Info */}
      <section className="mt-6" aria-label="Instructor information">
        {course.createdby && Object.keys(course.createdby).length === 0 ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <Avatar className="h-15 w-15 rounded-full bg-cover bg-center">
              <AvatarImage src={avatar} alt="Instructor not available" />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="text-center my-10">Instructor information not available.</div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <Avatar className="h-15 w-15 rounded-full bg-cover bg-center">
                <AvatarImage
                  src={course?.createdby?.profileImg?.url || avatar}
                  alt={`${course.createdby.firstName} ${course.createdby.lastName}`}
                  className="h-full w-full bg-cover bg-center rounded-full"
                />
                <AvatarFallback>
                  {course.createdby.firstName} {course.createdby.lastName}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">
                  {course.createdby.firstName} {course.createdby.middleName}{" "}
                  {course.createdby.lastName}
                </p>
                <p className="text-sm text-gray-500">{course.createdby.email}</p>
              </div>
            </div>
            <Button
              className="bg-green-500"
              onClick={handleConversation}
              aria-label={`Message instructor ${course.createdby.firstName}`}
            >
              Message
            </Button>
          </div>
        )}
      </section>

      {/* Course Semester */}
      <section className="mt-8" aria-label="Course semesters and chapters">
        {course.semesterbased ? (
          course?.semester?.map((semester) => (
            <Link
              key={semester._id}
              to={`/student/mycourses/${course._id}/semester/${semester._id}`}
            >
              <div
                className="mb-4 border border-gray-200 p-5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Go to semester ${semester.title}`}
              >
                <h3 className="font-semibold text-md">Semester: {semester.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(semester.startDate), "MMMM do, yyyy")} -{" "}
                  {format(new Date(semester.endDate), "MMMM do, yyyy")}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <Link
            to={`/student/mycourses/${id}/chapters?semesterbased=false&courseId=${course._id}`}
            className="block"
            aria-label="Go to course chapters"
          >
            <Card className="shadow-sm mt-10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <LibraryBig className="w-6 h-6" />
                  Course Chapters
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
      </section>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-12 bg-white z-10"
      >
        <TabsList
          className="flex flex-wrap justify-center gap-4 w-full sm:gap-10 bg-white p-1 shadow-inner"
          role="tablist"
        >
          {["Overview", "Reviews"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="px-3 py-2 text-base font-medium capitalize transition-all duration-300 text-gray-700 hover:text-green-600 hover:bg-gray-50 data-[state=active]:bg-gray-100 data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
              role="tab"
              aria-selected={activeTab === tab.toLowerCase()}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="py-8 space-y-10" role="tabpanel">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course?.teachingPoints?.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course?.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" aria-hidden="true" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Unenroll */}
          {user?.role !== "teacherAsStudent" && (
            <section>
              <Button
                className="bg-green-500"
                onClick={() => setShowModal(true)}
                aria-haspopup="dialog"
              >
                Unenroll
              </Button>
            </section>
          )}

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="unenroll-title"
              aria-describedby="unenroll-description"
            >
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <DialogHeader>
                  <DialogTitle id="unenroll-title">Confirm Unenrollment</DialogTitle>
                  <DialogDescription id="unenroll-description">
                    To confirm, type <strong>unenroll</strong> below. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <Input
                  placeholder="Type 'unenroll' to confirm"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  className="mt-4"
                  aria-label="Type 'unenroll' to confirm unenrollment"
                />

                <DialogFooter className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 text-white"
                    disabled={confirmationText.trim().toLowerCase() !== "unenroll" || loading}
                    onClick={handleUnenroll}
                  >
                    {loading ? "Unenrolling..." : "Unenroll"}
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="py-8 space-y-8" role="tabpanel">
          <RatingSection id={id} course={course} />
          <CommentSection id={course._id} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
