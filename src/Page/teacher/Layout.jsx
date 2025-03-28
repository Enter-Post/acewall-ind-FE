import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import acewallscholarslogo from "../../assets/acewallscholarslogo.webp";
import acewallshort from "../../assets/acewallshort.png";
import {
  Menu,
  MessageCircleDashed,
  Search,
  BadgePlus,
  DollarSign,
  GraduationCap,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { TeacherTopNavbarDropDown } from "@/CustomComponent/TeacherTopNavDropDown";
import { Input } from "../../components/ui/input";
import { DashboardCircleAddIcon } from "@/assets/Icons/deshboard";
import { Book02Icon } from "@/assets/Icons/mycoursesIcon";
import { AssignmentsIcon } from "@/assets/Icons/AssignmentIcon";
import { Megaphone02Icon } from "@/assets/Icons/Announcement";
import Footer from "@/CustomComponent/Footer";

const sideBarTabs = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/teacher",
  },
  { id: 2, name: "My Courses", icon: <Book02Icon />, path: "/teacher/courses" },
  {
    id: 6,
    name: "Create Course",
    icon: <BadgePlus />,
    path: "/teacher/courses/createCourses",
  },
  {
    id: 3,
    name: "Assessments",
    icon: <AssignmentsIcon />,
    path: "/teacher/assignment",
  },
  {
    id: 5,
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/teacher/announcements",
  },
  {
    id: 11,
    name: "Wallet",
    icon: <Wallet />,
    path: "/teacher/wallet",
  },
  {
    id: 12,
    name: "Messages",
    icon: <MessageCircleDashed />,
    path: "/teacher/messages",
  },
  {
    id: 13,
    name: "Students",
    icon: <GraduationCap />,
    path: "/teacher/allStudent",
  },
];

export default function TeacherLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation().pathname;

  return (
    <div className="flex flex-col w-screen">
      <header className="sticky top-0 z-10 bg-green-50">
        <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer">
          <TeacherTopNavbarDropDown />
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
          <Link to="/teacher" className="block md:hidden">
            <img
              src={acewallshort}
              alt="Mobile Logo"
              className="w-8 rounded-full h-auto cursor-pointer"
            />
          </Link>
          <Link to="/teacher" className="hidden md:block">
            <img
              src={acewallscholarslogo}
              alt="Desktop Logo"
              className="w-40 h-auto cursor-pointer"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Input type="text" placeholder="Search" />
            <div className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer">
              <Search className="rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-green-50 ${
            isSidebarOpen ? "block" : "hidden"
          } w-screen md:w-64 flex-shrink-0 overflow-y-auto md:block`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 pb-4">
              <Link to="/teacher/account" className="w-10">
                <Avatar>
                  <AvatarImage
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop"
                    alt="@user"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-600">john@email.com</p>
              </div>
            </div>
            <nav className="space-y-2">
              {sideBarTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
                    location == tab.path ? "bg-green-500" : "text-black"
                  } `}
                >
                  <p>{tab.icon}</p>
                  <span
                    className={`${
                      location == tab.path ? "text-white" : "text-green-600"
                    }`}
                  >
                    {tab.name}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="rounded-full flex flex-col items-center justify-between mt-10 w-full">
              <img src={acewallshort} alt="" className="w-1/2" />
              <Link
                to="https://www.acewallscholars.org/contact-Us"
                className="text-center font-semibold text-sm mt-4 text-acewall-main"
              >
                Need Tutoring? Contact us
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-2 md:p-4 hide-scrollbar overflow-y-scroll w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
