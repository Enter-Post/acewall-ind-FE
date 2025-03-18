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
  BadgePlus,
  DollarSign,
  MessageCircleDashed,
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
import { TeacherTopNavbarDropDown } from "@/CustomComponent/TeacherTopNavDropDown";

const sideBarTabs = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/teacherPortal",
  },
  {
    id: 2,
    name: "My Courses",
    icon: <Book02Icon />,
    path: "/teacherPortal/courses",
  },
  {
    id: 6,
    name: "Create Course ",
    icon: <BadgePlus />,
    path: "/teacherPortal/courses/createCourses",
  },
  {
    id: 3,
    name: "Assessments",
    icon: <AssignmentsIcon />,
    path: "/teacherPortal/assessment",
  },
  {
    id: 5,
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/teacherPortal/announcements",
  },
  {
    id: 11,
    name: "My Earning",
    icon: <DollarSign />,
    path: "/teacherPortal/earning",
  },
  {
    id: 12,
    name: "Messages",
    icon: <MessageCircleDashed />,
    path: "/teacherPortal/messages",
  },
];

const topBarTabs = [
  // {
  //   id: 7,
  //   name: "More Courses",
  //   icon: <Megaphone02Icon />,
  //   path: "/studentPortal/moreCourses",
  // },
  // {
  //   id: 8,
  //   name: "Support",
  //   icon: <Megaphone02Icon />,
  //   path: "/studentPortal/support",
  // },
];

export default function TeacherPortalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const savedTabinLS = localStorage.getItem("selectedTab");
  const [selected, setselected] = React.useState(
    savedTabinLS ? parseInt(savedTabinLS) : 1
  );

  React.useEffect(() => {
    localStorage.setItem("selectedTab", selected);
  }, [selected]);

  return (
    <div className="flex flex-col w-screen">
      <header className="sticky top-0 z-10 bg-green-50">
        <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer">
          <TeacherTopNavbarDropDown
            selected={selected}
            setselected={setselected}
          />
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
            {topBarTabs.map((tabs, index) => {
              return (
                <Link
                  key={index}
                  to={tabs.path}
                  onClick={() => setselected(tabs.id)}
                  className={`cursor-pointer ${
                    selected == tabs.id && "text-green-500 font-bold"
                  }`}
                >
                  {tabs.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
            <Input type="email" placeholder="Search" />
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
            <div className={`flex items-center space-x-3 pb-4 cursor-pointer`}>
              <Avatar className="w-10 ">
                <AvatarImage
                  className="rounded-full"
                  src={
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="@user"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <p className={`font-medium`}>User Name</p>
                <p className="text-sm text-gray-600">user@email.com</p>
              </div>
            </div>
            <nav className="space-y-2">
              {sideBarTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setselected(tab.id);
                  }}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
                    selected == tab.id
                      ? "bg-green-500 hover:bg-green-600"
                      : "hover:bg-gray-200"
                  } `}
                >
                  {tab.icon}
                  <span
                    className={` ${
                      selected == tab.id ? "text-white" : "text-green-600"
                    }`}
                  >
                    {tab.name}
                  </span>
                </Link>
              ))}
            </nav>
            <div className=" rounded-full flex flex-col items-center justify-between mt-10 w-full dark:bg-violet-600">
              <img src={acewallshort} alt="" className="w-1/2" />
              <Link
                to="https://www.acewallscholars.org/contact-Us"
                className="text-center font-semibold text-sm mt-4 text-acewall-main"
              >
                Need Tutoring .Contact us
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-2 md:p-4 hide-scrollbar overflow-y-scroll w-full">
          <Outlet selected={selected} setselected={setselected} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
