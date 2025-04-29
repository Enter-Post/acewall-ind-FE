import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowRight, School } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StudentProfileCourseCard,
  StudentProfileStatCard,
} from "@/CustomComponent/Card";

export default function StudentProfile() {
  // Sample data for courses
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await axiosInstance
        .get(`course/getSingleStudentCourses/${id}`)
        .then((res) => {
          console.log(res);
          setStudentInfo(res.data.student);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d65db1]">
          <img
            src={studentInfo?.profileImg}
            alt="Student Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-1">
          <p className="text-2xl font-bold text-gray-800">
            {studentInfo?.firstName}
          </p>
          {studentInfo?.middleName && (
            <p className="text-2xl font-bold text-gray-800">
              studentInfo?.firstName
            </p>
          )}
          <p className="text-2xl font-bold text-gray-800">
            {studentInfo?.lastName}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StudentProfileStatCard
          icon={<School />}
          title={"Enrolled Courses"}
          value={studentInfo?.purchasedCourse.length}
        />
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {studentInfo?.purchasedCourse.map((course, index) => (
          <StudentProfileCourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}
