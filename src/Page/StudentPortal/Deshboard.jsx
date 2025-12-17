import {
  Assignment,
  DeshboardAnnouncementCard,
  DeshBoardCourseCard,
} from "@/CustomComponent/Card";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react"; // Import Loader icon for accessibility (if needed)

// Note: The 'user' prop should be passed from the parent Layout/Provider context.
const Deshboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true

  const AssignmentDue = [
    {
      course: "Web Development",
      Assignment: "Create Website Layout",
      dueDate: "17-Feb-2025",
    },
    {
      course: "Graphic Designing",
      Assignment: "Create a logo for a brand",
      dueDate: "11-Feb-2025",
    },
  ];

  const getCourses = async () => {
    try {
      const res = await axiosInstance.get("enrollment/studentCourses");
      setCourses(res.data.enrolledCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchAnnouncements = async () => {
    if (!user?._id) return; // Guard against missing user ID
    
    try {
      const res = await axiosInstance.get(`/announcements/getbystudent/${user._id}`);
      setAnnouncements(res.data.announcements || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getCourses(), fetchAnnouncements()]);
      setLoading(false);
    };
    
    fetchData();
  }, [user?._id]); // Dependency on user ID

  // --- Start of JSX/Return ---

  // Handle Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-64" role="status" aria-live="polite">
        <Loader className="animate-spin h-8 w-8 text-acewall-main" aria-hidden="true" />
        <span className="sr-only">Loading dashboard content...</span>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Replaced <p> with <h1> for correct semantic heading hierarchy */}
        <h1 className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg" id="dashboard-heading">
          Dashboard
        </h1>
        
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-6">
          {/* Announcements Card */}
          {/* Added role="region" and aria-labelledby for clear section context */}
          <div role="region" aria-labelledby="announcements-heading">
            <h2 id="announcements-heading" className="sr-only">Announcements Summary</h2>
            <DeshboardAnnouncementCard
              mainHeading="Announcements"
              data={announcements}
              width="max-w-1/2"
              height={"h-auto"}
              link={"announcements"}
              aria-label="Latest Announcements"
            />
          </div>
          
          {/* Courses Card */}
          {/* Added role="region" and aria-labelledby for clear section context */}
          <div role="region" aria-labelledby="courses-heading">
            <h2 id="courses-heading" className="sr-only">Enrolled Courses List</h2>
            <DeshBoardCourseCard
              mainHeading="My courses"
              data={courses}
              link={"mycourses"}
              width="max-w-1/2"
              aria-label="Enrolled Courses"
            />
          </div>
          
        
        </div>
      </div>
    </>
  );
};

export default Deshboard;