"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Loader,
  Pen,
  Play,
  Users,
  Languages,
  ChartBarStacked,
  LibraryBig,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  BookOpen,
  Settings,
  Archive,
} from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { CheckCircle } from "lucide-react";
import CommentSection from "@/CustomComponent/Student/CommentSection";
import DeleteCourseModal from "@/CustomComponent/CreateCourse/DeleteCourseModal";
import ChapterCreationModal from "@/CustomComponent/CreateCourse/CreatChapterModal";
import ChapterDetail from "@/Page/teacher/Courses/QuarterDetail";
import { FinalCourseAssessmentCard } from "@/CustomComponent/CreateCourse/FinalCourseAssessmentCard";
import { toast } from "sonner";
import AssessmentCategoryDialog from "@/CustomComponent/teacher/AssessmentCategoryDialog";
import RatingSection from "@/CustomComponent/teacher/RatingSection";
import { format } from "date-fns";
import { CourseContext } from "@/Context/CoursesProvider";
import { SelectSemAndQuarDialog } from "@/CustomComponent/CreateCourse/SelectSemAndQuarDialog";
import Pages from "@/CustomComponent/teacher/Pages";
import ViewCoursePosts from "@/Page/teacher/ViewCoursePosts";
import { cn } from "@/lib/utils";
import ArchiveDialog from "@/CustomComponent/teacher/ArchivedModal";
import { ApplyReverificationDialog } from "@/CustomComponent/ApplyReverificationDialog";

export default function TeacherCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quarters, setQuarters } = useContext(CourseContext);
  const [Prevthumbnail, setPrevThumbnail] = useState(null);
  const [newthumbnail, setNewThumbnail] = useState(null);
  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [semesterbased, setSemesterBased] = useState();

  console.log(course, "course");

  console.log(semesterbased, "semesterbased");

  const handleDeleteAssessment = (assessmentID) => {
    setLoading(true);
    axiosInstance
      .delete(`/assessment/delete/${assessmentID}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        fetchCourseDetail();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message || "Error deleting assessment");
      });
  };

  const fetchCourseDetail = async () => {
    await axiosInstance
      .get(`course/details/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setQuarters(res.data.course.quarter);
        setSemesterBased(res.data.course.semesterbased === "true");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourseDetail();
  }, [id]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      toast.error("Only JPEG and PNG images are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPrevThumbnail(reader.result);
    };
    reader.readAsDataURL(file);

    setNewThumbnail(file);
  };

  const confirmChange = async () => {
    setLoadingThumbnail(true);
    await axiosInstance
      .put(
        `course/thumbnail/${id}`,
        { thumbnail: newthumbnail },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message || "Thumbnail updated successfully!");
        fetchCourseDetail();
        setPrevThumbnail(null);
        setNewThumbnail(null);
        setLoadingThumbnail(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingThumbnail(false);
      });
  };

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );

  const hasDocuments =
    course.documents &&
    (course.documents.governmentId ||
      course.documents.resume ||
      course.documents.certificate ||
      course.documents.transcript);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <div className="flex items-center gap-2">
            <VerificationBadge
              status={course.isVerified}
              course={course}
              fetchCourseDetail={fetchCourseDetail}
            />
            {course.isAppliedReverified?.status && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>
                  You have applied for reverification. Please wait for the admin
                  to verify.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Archive Warning */}
      {!course.published && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">
              This course is archived and not visible to new students.
            </p>
          </div>
        </div>
      )}
      {!course.isVerified === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">
              This course is archived and not visible to new students.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Main Course Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Thumbnail */}
          <div className="lg:col-span-4">
            <Card className="overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <img
                  src={
                    Prevthumbnail ||
                    course.thumbnail?.url ||
                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80"
                  }
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {Prevthumbnail ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        onClick={confirmChange}
                        disabled={loadingThumbnail}
                      >
                        {loadingThumbnail ? (
                          <Loader className="animate-spin w-4 h-4" />
                        ) : (
                          "Confirm"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setPrevThumbnail(null);
                          setNewThumbnail(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        id="thumbnail"
                        onChange={handleThumbnailChange}
                      />
                      <label
                        htmlFor="thumbnail"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Pen className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Edit Thumbnail
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Course Details */}
          <div className="lg:col-span-5">
            <Card className="shadow-sm h-full">
              <CardContent className="p-6">
                {/* Course Metadata */}
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Created: {formatDate(course.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Updated: {formatDate(course.updatedAt)}
                  </span>
                </div>

                {/* Course Title & Description */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase">
                    {course.courseTitle || "Untitled Course"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {course.courseDescription || "No description available."}
                  </p>

                  {/* Price Display */}
                  {course.price && (
                    <div className="flex items-center gap-2 mt-3">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">
                        {course.price}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Documents (Only show if documents exist) */}
          {hasDocuments && (
            <div className="lg:col-span-3">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between gap-2">
                    <div>
                      <FileText className="w-5 h-5" />
                      Course Documents
                    </div>
                    {course.isVerified === "pending" ||
                    course.isVerified === "rejected" ? (
                      <Link
                        to={`/teacher/courses/editCourseDocument/${course._id}`}
                      >
                        <Pen size={20} className="cursor-pointer" />
                      </Link>
                    ) : (
                      ""
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.documents?.governmentId && (
                    <DocumentLink
                      label="Government ID"
                      document={course.documents.governmentId}
                    />
                  )}
                  {course.documents?.resume && (
                    <DocumentLink
                      label="Resume"
                      document={course.documents.resume}
                    />
                  )}
                  {course.documents?.certificate && (
                    <DocumentLink
                      label="Certificate"
                      document={course.documents.certificate}
                    />
                  )}
                  {course.documents?.transcript && (
                    <DocumentLink
                      label="Transcript"
                      document={course.documents.transcript}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Management Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Course Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <AssessmentCategoryDialog courseId={id} />
              <Button
                variant="outline"
                onClick={() => navigate(`/teacher/courses/gradescale/${id}`)}
              >
                Manage GradeScale
              </Button>

              {semesterbased === true && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/teacher/courses/semester/${id}`)}
                >
                  Manage Semesters & Quarters
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => navigate(`/teacher/courses/gpa/${id}`)}
              >
                Manage GPA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Play className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate(`/teacher/courses/stdPreview2/${id}`)}
              >
                <Eye className="w-4 h-4" />
                Preview as Student
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate(`/teacher/gradebook/${id}`)}
              >
                <BookOpen className="w-4 h-4" />
                Gradebook
              </Button>
              <Button
                className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700"
                onClick={() => navigate(`/teacher/courses/edit/${id}`)}
              >
                <Pen className="w-4 h-4" />
                Edit Course Info
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<ChartBarStacked className="h-5 w-5 text-purple-500" />}
            value={course.category?.title?.toUpperCase() || "N/A"}
            label="Category"
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<LibraryBig className="h-5 w-5 text-green-500" />}
            value={course.semester?.length || 0}
            label="Semesters"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-orange-500" />}
            value={course.enrollments?.length || 0}
            label="Students Enrolled"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Semesters Section */}

        {semesterbased === true ? (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <LibraryBig className="w-6 h-6" />
                Course Semesters
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course?.semester?.length > 0 ? (
                <div className="grid gap-4">
                  {course.semester.map((semester, index) => (
                    <Link
                      key={semester._id}
                      to={`/teacher/courses/${id}/semester/${semester._id}`}
                      className="block"
                    >
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                        <h3 className="font-semibold text-lg text-gray-900">
                          Semester {index + 1}: {semester.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(
                            new Date(semester.startDate),
                            "MMMM do, yyyy"
                          )}{" "}
                          -{" "}
                          {format(new Date(semester.endDate), "MMMM do, yyyy")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <LibraryBig className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No semesters found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Create your first semester to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <LibraryBig className="w-6 h-6" />
                Course Chapters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link
                  to={`/teacher/courses/${id}/chapters?semesterbased=false`}
                  className="block"
                >
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Chapter
                    </h3>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final Assessment Cards */}
        {Array.isArray(course.Assessments) &&
          course.CourseAssessments?.map((assessment) => (
            <FinalCourseAssessmentCard
              key={assessment._id}
              assessment={assessment}
              handleDeleteAssessment={handleDeleteAssessment}
            />
          ))}

        {/* Rating Section */}
        <RatingSection courseId={id} />

        {/* Comment Section */}
        <CommentSection id={id} />

        {/* Archive Dialog */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <ArchiveDialog
            course={course}
            fetchCourseDetail={fetchCourseDetail}
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, value, label, bgColor }) {
  return (
    <Card
      className={`border-0 shadow-sm ${bgColor} hover:shadow-md transition-shadow`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white shadow-sm">{icon}</div>
          <div>
            <div className="font-bold text-xl text-gray-900">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentLink({ label, document }) {
  return (
    <a
      href={document.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
    >
      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
          {label}
        </div>
        <div className="text-xs text-gray-600 truncate">
          {document.filename}
        </div>
      </div>
    </a>
  );
}

function VerificationBadge({ status, course, fetchCourseDetail }) {
  if (!status) return null;

  const config = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      message: "Course verification is pending admin review",
    },
    approved: {
      color: "bg-green-100 text-green-800 border-green-200",
      message: "Course is verified and approved",
    },
    rejected: {
      color: "bg-red-100 text-red-800 border-red-200",
      message: "Course verification was rejected",
    },
  };

  const { color, message } = config[status] || config.pending;

  return (
    <section className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 p-3 rounded-lg border shadow-sm bg-white">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${color} shadow`}
        >
          <CheckCircle
            className={`w-4 h-4 ${
              status === "approved"
                ? "text-green-600"
                : status === "pending"
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          />
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{message}</span>
          {status === "rejected" && course.remarks && (
            <span className="text-xs text-red-500 font-semibold mt-1">
              Reason: {course.remarks}
            </span>
          )}
        </div>
      </div>

      {course.isVerified === "rejected" &&
        !course.isAppliedReverified?.status && (
          <ApplyReverificationDialog
            courseID={course._id}
            fetchCourseDetail={fetchCourseDetail}
          />
        )}
    </section>
  );
}

// Helper Functions
function formatDate(dateString) {
  return dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
    : "N/A";
}
