"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, ChevronDown, Megaphone, Edit, Trash2 } from "lucide-react"

export default function TeacherAnnoucement() {
  const [currentOpen, setCurrentOpen] = useState(true)
  const [pastOpen, setPastOpen] = useState(true)

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
  ]

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
  ]

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <div className="space-y-4">
        {/* Current Announcements */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <Collapsible open={currentOpen} onOpenChange={setCurrentOpen}>
            <div className="border-b">
              <CollapsibleTrigger className="flex items-center w-full p-4 text-left">
                <ChevronDown
                  className={`h-5 w-5 mr-2 transition-transform ${currentOpen ? "transform rotate-180" : ""}`}
                />
                <h2 className="text-xl font-semibold">Current Announcements ({currentAnnouncements.length})</h2>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-600 w-1/6">Date</th>
                      <th className="text-left p-4 font-medium text-gray-600 w-1/4">Title</th>
                      <th className="text-left p-4 font-medium text-gray-600">Message Summary</th>
                      <th className="p-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAnnouncements.map((announcement) => (
                      <tr key={announcement.id} className="border-b">
                        <td className="p-4 text-gray-700">{announcement.date}</td>
                        <td className="p-4 text-indigo-500 flex items-center">
                          <Megaphone className="h-4 w-4 mr-2 text-indigo-400" />
                          {announcement.title}
                        </td>
                        <td className="p-4 text-gray-700">{announcement.message}</td>
                        <td className="p-4 flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
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
                  className={`h-5 w-5 mr-2 transition-transform ${pastOpen ? "transform rotate-180" : ""}`}
                />
                <h2 className="text-xl font-semibold">Past Announcements ({pastAnnouncements.length})</h2>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-600 w-1/6">Date</th>
                      <th className="text-left p-4 font-medium text-gray-600 w-1/4">Title</th>
                      <th className="text-left p-4 font-medium text-gray-600">Message Summary</th>
                      <th className="p-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastAnnouncements.map((announcement) => (
                      <tr key={announcement.id} className="border-b">
                        <td className="p-4 text-gray-700">{announcement.date}</td>
                        <td className="p-4 text-indigo-500 flex items-center">
                          <Megaphone className="h-4 w-4 mr-2 text-indigo-400" />
                          {announcement.title}
                        </td>
                        <td className="p-4 text-gray-700">{announcement.message}</td>
                        <td className="p-4 flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
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
  )
}

