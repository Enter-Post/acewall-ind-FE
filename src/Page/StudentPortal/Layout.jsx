import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import dummyAvatar from "../../assets/avatar.png";
import acewallscholarslogo from "../../assets/acewallscholarslogo.webp";
import acewallshort from "../../assets/acewallshort.png";

import {
  Menu,
  Search,
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
      id: 1,
      name: "Dashboard",
      icon: <DashboardCircleAddIcon />,
      path: "/studentPortal",
    },
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/studentPortal",
  },
  {
    id: 2,
    name: "My Courses",
    icon: <Book02Icon />,
    path: "/studentPortal/mycourses",
  },
  {
    id: 5,
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/announcements",
  },
  {
    id: 3,
    name: "My Assignments",
    icon: <AssignmentsIcon />,
    path: "/studentPortal/assignment",
  },
  {
    id: 4,
    name: "Gradebook",
    icon: <Target02Icon />,
    path: "/studentPortal/gradebook",
  },

];

const topBarTabs = [
  {
    id: 7,
    name: "More Courses",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/moreCourses",
  },
  {
    id: 8,
    name: "Support",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/support",
  },
];

const topBarTabs = [
  {
    id: 7,
    name: "More Courses",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/moreCourses",
  },
  {
    id: 8,
    name: "Support",
    icon: <Megaphone02Icon />,
    path: "/studentPortal/support",
  },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const savedTabinLS = localStorage.getItem("selectedTab");
  const [selected, setselected] = React.useState(
    savedTabinLS ? parseInt(savedTabinLS) : 1
  );

  React.useEffect(() => {
    localStorage.setItem("selectedTab", selected);
  }, [selected]);   

  return (
    <div className="flex h-screen flex-col w-screen ">
      <header className="sticky top-0 z-10 bg-green-50">
        <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer">
          <TopNavbarDropDown selected={selected} setselected={setselected} />
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
          <Link onClick={() => setselected(1)} className="block md:hidden" to={"/studentPortal"}>
            <img
              src={acewallshort}
              alt="Mobile Logo"
              className="w-8 rounded-full h-auto cursor-pointer"
            />
          </Link>
          <Link onClick={() => setselected(1)} className="hidden md:block" to={"/studentPortal"}>
            <img
              src={acewallscholarslogo}
              alt="Desktop Logo"
              className="w-40 h-auto  cursor-pointer"
            />
          </Link>

          <div className="flex gap-5 text-black text-sm ">
            {topBarTabs.map((tabs, index) => {
              return (
                <Link
                  key={index}
                  to={tabs.path}
                  onClick={() => {
                    setselected(tabs.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`cursor-pointer ${selected == tabs.id && "text-green-500 font-bold"
                    }`}
                >
                  {tabs.name}
                </Link>
              );
            })}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Input
              type="email"
              placeholder="Search"
            />
            <div
              className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer"
            >
              <Search className="rounded-full" />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-green-50 ${isSidebarOpen ? "block" : "hidden"
            } w-screen md:w-64 flex-shrink-0 overflow-y-auto md:block`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 pb-4">
              <Link to={"/studentPortal/account"} onClick={() => setselected(9)} className={`${selected == 9 ? "w-13" : "w-10"}`}>
                <Avatar >
                  <AvatarImage className={`rounded-full ${selected == 9 && "border-3 border-green-500"}`} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="@user" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-medium">John</p>
                <p className="text-sm text-gray-600">john@email.com</p>
              </div>
            </div>
            <div className="flex md:hidden items-center space-x-4 mb-5">
              <Input
                type="email"
                placeholder="Search"
              />
              <div
                className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer"
              >
                <Search className="rounded-full" />
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
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${selected == tab.id
                    ? "bg-green-500 hover:bg-green-600"
                    : "hover:bg-gray-200"
                    } `}
                >
                  {tab.icon}
                  <span
                    className={`${selected == tab.id ? "text-white" : "text-green-600"
                      }`}
                  >
                    {tab.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 md:p-4 hide-scrollbar overflow-y-scroll">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
