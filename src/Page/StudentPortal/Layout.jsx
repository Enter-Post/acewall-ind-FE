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
import { AssessmentIcon } from "@/assets/Icons/AssignmentIcon";
import { Megaphone02Icon } from "@/assets/Icons/Announcement";
import { Target02Icon } from "@/assets/Icons/grades";
import Footer from "@/CustomComponent/Footer";
import { MultiLevelDropdown } from "@/CustomComponent/MultilevelDropdown";
import { useContext } from "react";
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import MoreCoursesDropdown from "@/CustomComponent/MoreCoursesDropdown";

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
    name: "My Assessment",
    icon: <AssessmentIcon />,
    path: "/student/assessment",
  },
  {
    id: 4,
    name: "Gradebook",
    icon: <Target02Icon />,
    path: "/student/gradebook",
  },
  {
    id: 12,
    name: "Messages",
    icon: <MessageCircleDashed />,
    path: "/student/messages",
  },

];


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { user } = useContext(GlobalContext);

  const location = useLocation().pathname;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [dropdownCourses, setDropdownCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  // Function to handle search on button click
  const handleSearch = async () => {
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setOpenDropdown(false); // Close while fetching

    try {
      const res = await axiosInstance.get("/course/get", {
        params: { search: searchQuery },
      });

      const courses = res.data.courses || [];
      setDropdownCourses(courses);
    } catch (error) {
      console.error("Search error:", error);
      setDropdownCourses([]);
    } finally {
      setLoading(false);
      setOpenDropdown(true); // Show dropdown after data is ready
    }
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

            <div className="flex gap-6">
              <MoreCoursesDropdown />

              <Link
                to="/student/support"
                className="text-xs md:text-md lg:text-base font-medium text-gray-700"
              >
                SUPPORT
              </Link>
              <Link
                to="/student/ContactUs"
                className="text-xs md:text-md lg:text-base font-medium text-gray-700"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          {/* Search Dropdown */}
          <div className="relative w-64 hidden md:flex flex-col">
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown} modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="relative flex gap-6 w-full">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    placeholder="Search courses and lessons"
                    className="w-full pr-10 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent rounded-md transition-all"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border border-gray-200 shadow-md rounded-md mt-2 max-h-60 overflow-y-auto z-50 w-64">
                {loading ? (
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-700">Searching...</span>
                  </DropdownMenuItem>
                ) : dropdownCourses.length > 0 ? (
                  dropdownCourses.map((course) => (
                    <DropdownMenuItem asChild key={course._id}>
                      <Link
                        to={`/student/mycourses/${course._id}`}
                        onClick={() => setOpenDropdown(false)}
                        className="w-full block text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                      >
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
              <Link to="/student/account" className="block">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={user.profileImg}
                    alt={user.firstName}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
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
