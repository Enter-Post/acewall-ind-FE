"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, ChevronDown, Megaphone, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeacherAnnoucement() {
  const [currentOpen, setCurrentOpen] = useState(true);
  const [pastOpen, setPastOpen] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  const currentAnnouncements = [
    {
      id: 1,
      date: "Oct 10, 2024",
      title: "Live Q&A Session Tomorrow!",
      message: "Join us for a live Q&A on October 11th to discuss module 3",
    },
    {
      id: 2,
      date: "Oct 8, 2024",
      title: "Assignment 1 Deadline Reminder",
      message: "Reminder: The first assignment is due on October 15, 2024",
    },
    {
      id: 3,
      date: "Oct 5, 2024",
      title: "New Module Released: Instagram",
      message: "Module 2 on Instagram marketing is now available",
    },
    {
      id: 4,
      date: "Oct 1, 2024",
      title: "Course Introduction Webinar",
      message: "Catch up with the course introduction on our webinar replay",
    },
  ];

  const pastAnnouncements = [
    {
      id: 5,
      date: "Oct 10, 2024",
      title: "Welcome to the Course!",
      message: "Introduction to the course, its structure, and resources",
    },
    {
      id: 6,
      date: "Sep 15, 2024",
      title: "Course Registration Closing Soon",
      message: "Reminder that the course registration closes in 3 days",
    },
  ];

  return (
    <div className="mx-auto p-3 md:p-0">
      <div className="flex flex-col mb-2 justify-between ">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Announcements
        </p>
        <div className="flex justify-end">
          <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement for your students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="title">Announcement Title</Label>
                <Input id="title" placeholder="Enter announcement title" />

                <Label htmlFor="course">Select Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter announcement message"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowNewDialog(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-green-500 hover:bg-green-600">
                  Create Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-4">
        {/* Current Announcements */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <Collapsible open={currentOpen} onOpenChange={setCurrentOpen}>
            <div className="border-b">
              <CollapsibleTrigger className="flex items-center w-full p-4 text-left">
                <ChevronDown
                  className={`h-5 w-5 mr-2 transition-transform ${
                    currentOpen ? "transform rotate-180" : ""
                  }`}
                />
                <h2 className="text-md font-semibold">
                  Current Announcements ({currentAnnouncements.length})
                </h2>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-600 w-1/6">
                        Date
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600 w-1/4">
                        Title
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Message Summary
                      </th>
                      <th className="p-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAnnouncements.map((announcement) => (
                      <tr key={announcement.id} className="border-b">
                        <td className="p-4 text-gray-700">
                          {announcement.date}
                        </td>
                        <td className="p-4 text-indigo-500 flex items-center">
                          <Megaphone className="h-4 w-4 mr-2 text-indigo-400" />
                          {announcement.title}
                        </td>
                        <td className="p-4 text-gray-700">
                          {announcement.message}
                        </td>
                        <td className="p-4 flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Past Announcements */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <Collapsible open={pastOpen} onOpenChange={setPastOpen}>
            <div className="border-b">
              <CollapsibleTrigger className="flex items-center w-full p-4 text-left">
                <ChevronDown
                  className={`h-5 w-5 mr-2 transition-transform ${
                    pastOpen ? "transform rotate-180" : ""
                  }`}
                />
                <h2 className="text-md font-semibold">
                  Past Announcements ({pastAnnouncements.length})
                </h2>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-600 w-1/6">
                        Date
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600 w-1/4">
                        Title
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Message Summary
                      </th>
                      <th className="p-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastAnnouncements.map((announcement) => (
                      <tr key={announcement.id} className="border-b">
                        <td className="p-4 text-gray-700">
                          {announcement.date}
                        </td>
                        <td className="p-4 text-indigo-500 flex items-center">
                          <Megaphone className="h-4 w-4 mr-2 text-indigo-400" />
                          {announcement.title}
                        </td>
                        <td className="p-4 text-gray-700">
                          {announcement.message}
                        </td>
                        <td className="p-4 flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
