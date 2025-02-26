import { AnnouncementCard, DeshBoardCard } from "@/CustomComponent/DeshboardCard";
import React from "react";

const Announcement = () => {

  const announcements = [
    {
      id: 1,
      title: "Assignment Submission Deadline Extended",
      course: "Web Development",
      date: "2025-02-20",
      message: "The submission deadline for the 'Responsive Website Design' assignment has been extended to 2025-03-05. Please ensure all work is submitted by this date."
    },
    {
      id: 2,
      title: "New Course: Advanced Graphic Design",
      course: "Graphic Designing",
      date: "2025-02-15",
      message: "We are excited to announce a new course, 'Advanced Graphic Design,' starting from 2025-03-01. Enroll now to deepen your skills in graphic design!"
    },
    {
      id: 3,
      title: "Digital Marketing Project Guidelines",
      course: "Digital Marketing",
      date: "2025-02-18",
      message: "Please refer to the updated project guidelines for the 'Develop a Marketing Strategy' assignment. The new guidelines include additional resources and examples."
    },
    {
      id: 4,
      title: "Guest Lecture on UX/UI Design",
      course: "Graphic Designing",
      date: "2025-02-22",
      message: "Join us for a guest lecture on UX/UI Design by industry expert Jane Doe. The lecture will be held on 2025-02-28 at 10:00 AM. Don't miss it!"
    },
    {
      id: 5,
      title: "Mid-Term Exams Schedule",
      course: "Web Development",
      date: "2025-02-17",
      message: "The mid-term exams for the Web Development course are scheduled from 2025-03-10 to 2025-03-15. Please check the course portal for the detailed exam timetable."
    }
  ];

  return  (
    <div>
      <p className="text-xl pb-4">Announcement</p>
      <div className="overflow-hidden">
        <AnnouncementCard mainHeading={"Announcement"} data={announcements} />
      </div>
    </div>
  );  
};

export default Announcement;
