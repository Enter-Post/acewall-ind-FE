import * as React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
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
import { Target02Icon } from "@/assets/Icons/grades";
import Footer from "@/CustomComponent/Footer";
import { MultiLevelDropdown } from "@/CustomComponent/MultilevelDropdown";
import { useContext } from "react";
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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

];


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { user } = useContext(GlobalContext);

  const location = useLocation().pathname;

   const [searchQuery, setSearchQuery] = React.useState("");
    const [dropdownCourses, setDropdownCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
  
    // Function to handle search on button click
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setDropdownCourses([]);
        return;
      }
  
      setLoading(true);
      try {
        const res = await axiosInstance.get("/course/get", {
          params: { search: searchQuery },
        });
        setDropdownCourses(res.data.courses || []);
      } catch (error) {
        console.error("Search error:", error);
        setDropdownCourses([]);
      }
      setLoading(false);
    };


  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-white">
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
          <Link className="block md:hidden" to={"/student"}>
            <img
              src={acewallshort}
              alt="Mobile Logo"
              className="w-8 rounded-full h-auto cursor-pointer"
            />
          </Link>
          <Link className="hidden md:block" to={"/student"}>
            <img
              src={acewallscholarslogo}
              alt="Desktop Logo"
              className="w-40 h-auto  cursor-pointer"
            />
          </Link>
          <div className="flex justify-between items-center">
            {/* <div className="flex gap-5 text-xs md:text-md lg:text-base font-medium text-gray-700">
              {topBarTabs.map((category, index) => (
                <MultiLevelDropdown
                  key={index}
                  label={category.label}
                  items={category.items}
                />
              ))}
            </div> */}
            <div className="flex gap-6">
              <Link
                to="/student/Courses"
                className="text-xs md:text-md lg:text-base font-medium text-gray-700"
              >
                MORE COURSES
              </Link>
              <Link
                to="/student/support"
                className="text-xs md:text-md lg:text-base font-medium text-gray-700"
              >
                SUPPORT
              </Link>
              <Link
                to="/student/contactUs"
                className="text-xs md:text-md lg:text-base font-medium text-gray-700"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses and lessons"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={handleSearch}
                  className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer"
                >
                  <Search className="rounded-full" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white p-2 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                {loading ? (
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-700">Searching...</span>
                  </DropdownMenuItem>
                ) : dropdownCourses.length > 0 ? (
                  dropdownCourses.map((course) => (
                    <DropdownMenuItem key={course._id} asChild>
                      <Link to={`/student/myCourseDetail/`}>
                        {course.basics?.courseTitle || "Untitled Course"}
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-500">No results found</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-white ${isSidebarOpen ? "block" : "hidden"
            } w-screen md:w-64 flex-shrink-0 overflow-y-auto md:block`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 pb-4">
              <Link to={"/student/account"} className={`w-10`}>
                <Avatar>
                  <AvatarImage
                    className={`rounded-full `}
                    src={user.profileImg}
                    alt="@user"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-medium">{user.firstName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
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
                  }}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${location == tab.path ? "bg-green-500" : "text-black"
                    } `}
                >
                  <p>{tab.icon}</p>
                  <span
                    className={`${location == tab.path ? "text-white" : "text-green-600"
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
        <main className="flex-1 p-2 md:p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
