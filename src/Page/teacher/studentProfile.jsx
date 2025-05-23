import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  StudentProfileCourseCard,
  StudentProfileStatCard,
} from "@/CustomComponent/Card";
import { Mail, Calendar, School } from "lucide-react";

export default function StudentProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const student = state?.student;

  if (!student) {
    // Fallback if user directly visits the URL without navigation state
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Student data not found.</p>
        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 bg-white rounded-xl shadow-md">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <Avatar className="w-24 h-24 rounded-full overflow-hidden ring-3 ring-gray-500 shadow-sm">
          <AvatarImage
            src={student?.profileImg}
            alt={student?.firstName}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full bg-gray-200 text-gray-600 text-xl font-semibold flex items-center justify-center rounded-full">
            {student?.firstName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1">
            <p className="text-2xl font-bold text-gray-800">{student?.firstName}</p>
            {student?.middleName && (
              <p className="text-2xl font-bold text-gray-800">{student.middleName}</p>
            )}
            <p className="text-2xl font-bold text-gray-800">{student?.lastName}</p>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{student?.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Joined: {new Date(student?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex items-center justify-center mb-10">
        <StudentProfileStatCard
          className="max-w-xs"
          icon={<School />}
          title="Enrolled Courses"
          value={student?.courses?.length || 0}
        />
      </div>

      {/* Course List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enrolled Courses</h2>
        <div className="flex flex-row gap-8 items-center flex-wrap justify-center md:justify-start">
          {student?.courses?.map((course, index) => (
            <StudentProfileCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
