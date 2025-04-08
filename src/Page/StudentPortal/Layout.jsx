import * as React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import dummyAvatar from "../../assets/avatar.png";
import acewallscholarslogo from "../../assets/acewallscholarslogo.webp";
import acewallshort from "../../assets/acewallshort.png";

import { Menu, MessageCircleDashed, Search } from "lucide-react";
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
import { MultiLevelDropdown } from "@/CustomComponent/MultilevelDropdown";

const sideBarTabs = [
  {
    id: 2,
    name: "My Courses",
    icon: <Book02Icon />,
    path: "/student/mycourses",
  },
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/student",
  },
  {
    id: 5,
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/student/announcements",
  },
  {
    id: 3,
    name: "My Assignments",
    icon: <AssignmentsIcon />,
    path: "/student/assignment",
  },
  {
    id: 4,
    name: "Gradebook",
    icon: <Target02Icon />,
    path: "/student/gradebook",
  },
  {
    id: 10,
    name: "Messages",
    icon: <MessageCircleDashed />,
    path: "/student/messages",
  },
];

const topBarTabs = [
  {
    label: "MORE COURSE",
    items: [
      {
        label: "History",
        link: "/student/courses",
        subItems: [
          { label: "World History", link: "/student/courses" },
          { label: "US History", link: "/student/courses" },
          {
            label: "African American History",
            link: "/student/courses",
          },
          { label: "European History", link: "/student/courses" },
          { label: "Government", link: "/student/courses" },
        ],
      },
      {
        label: "Physics",
        link: "/student/courses",
        subItems: [
          { label: "Classical Mechanics", onClick: () => {} },
          { label: "Electromagnetism", onClick: () => {} },
          { label: "Thermodynamics", onClick: () => {} },
          { label: "Quantum Mechanics", onClick: () => {} },
          { label: "Relativity", onClick: () => {} },
        ],
      },
      {
        label: "Mathematics",
        link: "/student/courses",
        subItems: [
          { label: "Algebra 1", link: "/student/courses" },
          { label: "Algebra 2", link: "/student/courses" },
          { label: "Pre-Algebra", link: "/student/courses" },
          { label: "Geometry", link: "/student/courses" },
          { label: "Pre-Calculus", link: "/student/courses" },
          { label: "Trigonometry", link: "/student/courses" },
          { label: "Calculus", link: "/student/courses" },
        ],
      },
      {
        label: "English",
        link: "/student/courses",
        subItems: [
          { label: "American Literature", link: "/student/courses" },
          { label: "World Literature", link: "/student/courses" },
          { label: "British Literature", link: "/student/courses" },
        ],
      },
      {
        label: "Culinary Arts",
        link: "/student/courses",
        subItems: [
          { label: "Baking", link: "/student/courses" },
          { label: "Sauces", link: "/student/courses" },
          { label: "Italian Cuisine", link: "/student/courses" },
          { label: "French Cuisine", link: "/student/courses" },
          { label: "Asian Cuisine", link: "/student/courses" },
        ],
      },
      {
        label: "Mental Wellness",
        link: "/student/courses",

        subItems: [
          { label: "Breath Work", link: "/student/courses" },
          { label: "Meditation/Yoga", link: "/student/courses" },
        ],
      },
      {
        label: "Engineering",
        link: "/student/courses",
        subItems: [
          { label: "Audio Engineering", link: "/student/courses" },
        ],
      },
    ],
  },
  {
    label: "SUPPORT",
    items: [
      { label: "Contact Us", link: "/contactUs" },
      { label: "FAQ", link: "/Courses/" },
    ],
  },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const location = useLocation().pathname;

  const savedTabinLS = localStorage.getItem("selectedTab");
  const [selected, setselected] = React.useState(
    savedTabinLS ? parseInt(savedTabinLS) : 1
  );

  React.useEffect(() => {
    localStorage.setItem("selectedTab", selected);
  }, [selected]);

  return (
    <div className="flex w-screen flex-col">
      <header className="sticky top-0 z-10 bg-white w-full">
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
          <Link className="block md:hidden" to={"/student"}>
            <img
              src={acewallshort}
              alt="Mobile Logo"
              className="w-8 rounded-full h-auto cursor-pointer"
            />
          </Link>
          <Link
            onClick={() => setselected(1)}
            className="hidden md:block"
            to={"/student"}
          >
            <img
              src={acewallscholarslogo}
              alt="Desktop Logo"
              className="w-40 h-auto  cursor-pointer"
            />
          </Link>

          <div className={`flex gap-5 text-sm`}>
            {topBarTabs.map((category, index) => (
              <MultiLevelDropdown
                key={index}
                label={category.label}
                items={category.items}
              />
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Input type="email" placeholder="Search" />
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
              <Link
                to={"/student/account"}
                onClick={() => setselected(9)}
                className={`w-10`}
              >
                <Avatar>
                  <AvatarImage
                    className={`rounded-full `}
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="@user"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-medium">John</p>
                <p className="text-sm text-gray-600">john@email.com</p>
              </div>
            </div>
            <div className="flex md:hidden items-center space-x-4 mb-5">
              <Input type="email" placeholder="Search" />
              <div className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer">
                <Search className="rounded-full" />
              </div>
            </div>
            <nav className="space-y-2 ">
              {sideBarTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setselected(tab.id);
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
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
