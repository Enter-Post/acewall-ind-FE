"use client"

import { useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Users, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlobalContext } from "@/Context/GlobalProvider"

export default function TeacherAccount() {
  const { user } = useContext(GlobalContext);

  const formatNumber = (num) => num?.toLocaleString();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-xl font-bold mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-pink-100">
              <img
                src={user?.profileImg}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{`${user?.firstName} ${user?.middleName || ""} ${user?.lastName}`}</h2>
              {user?.isTopRated && (
                <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200 font-medium">
                  Top Rated
                </Badge>
              )}
            </div>

            <p className="text-gray-600 mb-3">{user?.role?.toUpperCase()}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="font-medium">{user?.rating || "N/A"}</span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{formatNumber(user?.students || 0)}</span>
                <span className="text-gray-500 text-sm">students</span>
              </div>

              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{user?.courses || 0}</span>
                <span className="text-gray-500 text-sm">courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8 space-y-4">
        <h3 className="text-lg font-bold uppercase border-b border-gray-200 pb-2">About Me</h3>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          <dt className="text-sm font-medium text-gray-500">Pronouns</dt>
          <dd className="text-sm text-gray-700">{user?.pronouns || "N/A"}</dd>
          <dt className="text-sm font-medium text-gray-500">Gender</dt>
          <dd className="text-sm text-gray-700">{user?.gender || "N/A"}</dd>
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="text-sm text-gray-700">{user?.email || "N/A"}</dd>
          <dt className="text-sm font-medium text-gray-500">Phone</dt>
          <dd className="text-sm text-gray-700">{user?.phone || "N/A"}</dd>
          <dt className="text-sm font-medium text-gray-500">Address</dt>
          <dd className="text-sm text-gray-700">{user?.homeAddress || "N/A"}</dd>
        </dl>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="courses" className="mb-8">
        <div className="border-b">
          <TabsList className="bg-transparent h-auto p-0 mb-[-1px]">
            <TabsTrigger value="courses" className={cn("px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 font-medium")}>
              Courses
            </TabsTrigger>
            <TabsTrigger value="reviews" className={cn("px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 font-medium")}>
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="mt-6">
          <div className="text-gray-500">Courses will be listed here</div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">Reviews will appear here</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
