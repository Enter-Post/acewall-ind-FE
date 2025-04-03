"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnnouncementList from "../../CustomComponent/teacher/Announcement/AnnouncementList";
import AnnouncementDialog from "../../CustomComponent/teacher/Announcement/AnnouncementDialog";

export default function TeacherAnnouncement() {
  const [showNewDialog, setShowNewDialog] = useState(false);

  const currentAnnouncements = [
    { id: 2, date: "Oct 8, 2024", title: "Assignment 1 Deadline Reminder", message: "Reminder: The first assignment is due on October 15, 2024" },
    { id: 3, date: "Oct 5, 2024", title: "New Module Released: Instagram", message: "Module 2 on Instagram marketing is now available" },
    { id: 4, date: "Oct 1, 2024", title: "Course Introduction Webinar", message: "Catch up with the course introduction on our webinar replay" },
  ];

  const pastAnnouncements = [
    { id: 5, date: "Oct 10, 2024", title: "Welcome to the Course!", message: "Introduction to the course, its structure, and resources" },
    { id: 6, date: "Sep 15, 2024", title: "Course Registration Closing Soon", message: "Reminder that the course registration closes in 3 days" },
  ];

  return (
    <div className="mx-auto p-3 md:p-0">
      <div className="flex flex-col mb-2">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Announcements
        </p>
        <div className="flex justify-end">
          <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowNewDialog(true)}>
            + Add New
          </Button>
        </div>
      </div>

      {/* Announcement Sections */}
      <AnnouncementList title="Current Announcements" announcements={currentAnnouncements} />
      <AnnouncementList title="Past Announcements" announcements={pastAnnouncements} />

      {/* Dialog for Adding Announcements */}
      <AnnouncementDialog open={showNewDialog} onOpenChange={setShowNewDialog} />
    </div>
  );
}
