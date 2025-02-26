import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import dummyAvatar from "../../assets/avatar.png";
import acewallscholarslogo from "../../assets/acewallscholarslogo.webp";
import acewallshort from "../../assets/acewallshort.png";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { TopNavbarDropDown } from "../../CustomComponent/TopNavDropDown";
import { Input } from "../../components/ui/input";
import { DashboardCircleAddIcon } from "@/assets/Icons/deshboard";
import { Book02Icon } from "@/assets/Icons/mycoursesIcon";
import { AssignmentsIcon } from "@/assets/Icons/AssignmentIcon";
import { Megaphone02Icon } from "@/assets/Icons/Announcement";
import { TeacherIcon } from "@/assets/Icons/Classroom";
import { Logout03Icon } from "@/assets/Icons/Logout";
import { ArrowDown01Icon } from "@/assets/Icons/ArrowDown";
import { Target02Icon } from "@/assets/Icons/grades";
import Footer from "@/CustomComponent/Footer";

const sideBarTabs = [
  {
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/studentPortal",
  },
  {
    name: "My Courses",
    icon: <Book02Icon />,
    path: "/studentPortal/mycourses",
  },
  {
    name: "My Assignments",
    icon: <AssignmentsIcon />,
    path: "/studentPortal/assignment",
  },
  {
    name: "Gradebook",
    icon: <Target02Icon />,
    path: "/studentPortal/gradebook",
  },
  {
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/announcements",
  },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen flex-col w-screen ">
      <header className="sticky top-0 z-10 bg-gray-100">
        <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer">
          <TopNavbarDropDown />
        </div>
        <div className="flex h-16 items-center justify-between px-4 border">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          {/* <div className="text-xl font-semibold">ScholarNest</div> */}
          <img
            src={acewallshort}
            alt="Mobile Logo"
            className="w-8 rounded-full h-auto block md:hidden"
          />
          <img
            src={acewallscholarslogo}
            alt="Desktop Logo"
            className="w-40 h-auto hidden md:block"
          />
          <div className="hidden md:flex gap-5 text-black text-sm ">
            <Link to="/studentPortal/moreCourses" className="cursor-pointer">
              More Courses
            </Link>
            <Link to="/studentPortal/support" className="cursor-pointer">Support</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Input type="email" placeholder="Search" />
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-gray-100 ${
            isSidebarOpen ? "block" : "hidden"
          } w-screen md:w-64 flex-shrink-0 overflow-y-auto md:block`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 pb-4">
              <Avatar className="w-10">
                <AvatarImage src={dummyAvatar} alt="@user" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">User Name</p>
                <p className="text-sm text-gray-600">user@email.com</p>
              </div>
            </div>
            <nav className="space-y-2">
              {sideBarTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {tab.icon}
                  <span className="text-green-600">{tab.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 hide-scrollbar overflow-y-scroll">
          <Outlet />
          <Footer/>
        </main>
      </div>
    </div>
  );
}
