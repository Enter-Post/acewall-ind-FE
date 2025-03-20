import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function StudentProfile() {
  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
    {
      id: 2,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
    {
      id: 3,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
    {
      id: 4,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
    {
      id: 5,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
    {
      id: 6,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      progress: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20521-Q7snN9c0Q3XyBaUZLPzecKMEWytMg1.png",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d65db1]">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
            alt="Student Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Student Name</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Completed Courses"
          value="30"
          iconColor="bg-green-100"
        />
        <StatCard
          title="Enrolled Courses"
          value="30"
          iconColor="bg-green-100"
          
        />
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, iconColor }) {
  return (
    <Card className="p-6 flex items-center gap-4 shadow-sm">
      <div
        className={`w-14 h-14 ${iconColor} rounded-full flex items-center justify-center`}
      >
        <svg
          className="w-6 h-6 text-green-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 7V12L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-center">{value}</p>
      </div>
    </Card>
  );
}

function CourseCard({course}) {
  return (
    <Card className="p-4 flex flex-col sm:flex-row items-center sm:items-center gap-4 shadow-sm">
      <div className="w-full sm:w-40 h-24 rounded-md overflow-hidden shrink-0">
        <img
          src={course.image}
          alt="Course Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start justify-between w-full gap-4 ">
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-gray-800">{course.title}</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-green-500 font-medium">{course.progress} % Completed</p>
          <Button className="bg-green-500 hover:bg-green-600">
            Grade Book <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
