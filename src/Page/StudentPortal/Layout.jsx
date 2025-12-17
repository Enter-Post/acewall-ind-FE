import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import acewallscholarslogo from "../../assets/acewallscholarslogo.webp";
import acewallshort from "../../assets/acewallshort.png";
import avatar from "../../assets/avatar.png";

import {
  Bot,
  Coffee,
  Menu,
  MessageCircleDashed,
  MessagesSquareIcon,
  Search,
  Loader,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { TopNavbarDropDown } from "../../CustomComponent/TopNavDropDown";
import { Input } from "../../components/ui/input";

import { DashboardCircleAddIcon } from "@/assets/Icons/deshboard";
import { Book02Icon } from "@/assets/Icons/mycoursesIcon";
import { AssessmentIcon } from "@/assets/Icons/AssignmentIcon";
import { Megaphone02Icon } from "@/assets/Icons/Announcement";
import { Target02Icon } from "@/assets/Icons/grades";

import Footer from "@/CustomComponent/Footer";
import MoreCoursesDropdown from "@/CustomComponent/MoreCoursesDropdown";
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Sidebar tabs configuration
const sideBarTabs = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardCircleAddIcon />,
    path: "/student",
    allowedAsPreview: true,
  },
  {
    id: 2,
    name: "My Courses",
    icon: <Book02Icon />,
    path: "/student/mycourses",
    allowedAsPreview: true,
  },
  {
    id: 3,
    name: "My Assessment",
    icon: <AssessmentIcon />,
    path: "/student/assessment",
    allowedAsPreview: true,
  },
  {
    id: 4,
    name: "Gradebook",
    icon: <Target02Icon />,
    path: "/student/gradebook",
    allowedAsPreview: true,
  },
  {
    id: 5,
    name: "Spill the Tea",
    icon: <Coffee aria-hidden="true" />,
    path: "/student/social",
  },
  {
    id: 6,
    name: "Announcements",
    icon: <Megaphone02Icon />,
    path: "/student/announcements",
    allowedAsPreview: true,
  },
  {
    id: 7,
    name: "Discussion Rooms",
    icon: <MessagesSquareIcon />,
    path: "/student/discussions",
    allowedAsPreview: true,
  },
  {
    id: 8,
    name: "Messages",
    icon: <MessageCircleDashed aria-hidden="true" />,
    path: "/student/messages",
    allowedAsPreview: false,
  },
  {
    id: 9,
    name: "AI Assistant",
    icon: <Bot aria-hidden="true" />,
    path: "/student/ai",
    allowedAsPreview: false,
  },
];

export default function Layout() {
  const { user, checkAuth, UpdatedUser, setUpdatedUser } =
    React.useContext(GlobalContext);
  const location = useLocation().pathname;

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dropdownCourses, setDropdownCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setOpenDropdown(false);

    try {
      const res = await axiosInstance.get("/enrollment/studentCourses", {
        params: { search: searchQuery },
      });

      // Use enrolledCourses array from response
      setDropdownCourses(res.data.enrolledCourses || []);
    } catch (error) {
      console.error("Search error:", error);
      setDropdownCourses([]);
    } finally {
      setLoading(false);
      setOpenDropdown(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top header */}
      <header className="sticky top-0 z-10 bg-white" role="banner">
        <div className="h-8 bg-green-600 flex justify-end items-center px-5" aria-label="Utility Links">
          {user && user.role === "teacherAsStudent" ? (
            <div className="flex items-center justify-between space-x-4 w-full">
              {/* Added descriptive text for screen readers */}
              <div>
                <p className="text-white text-sm" role="status">
                  {`Viewing as Student - ${user.firstName} ${user.lastName}`}
                </p>
              </div>
              <Button
                variant="outline"
                size="xs"
                className="px-3 text-xs border border-gray-300"
                onClick={async () => {
                  await axiosInstance.post("auth/previewSignOut").then(() => {
                    checkAuth();
                    navigate("/teacher");
                  });
                }}
                aria-label="Switch back to Teacher view"
              >
                Switch to Teacher
              </Button>
            </div>
          ) : (
            <TopNavbarDropDown />
          )}
        </div>

        <div className="flex h-16 items-center justify-between px-4 border">
          {/* Sidebar toggle (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            // Explicitly describe the action for screen readers
            aria-controls="student-sidebar"
            aria-expanded={isSidebarOpen}
            aria-label="Toggle student navigation sidebar"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          {/* Logos */}
          <Link className="block md:hidden" to="/student" aria-label="Go to Student Dashboard Home">
            <img
              src={acewallshort}
              alt="Acewall Scholars Mobile Logo"
              className="w-8 h-auto rounded-full"
            />
          </Link>
          <Link className="hidden md:block" to="/student" aria-label="Go to Student Dashboard Home">
            <img
              src={acewallscholarslogo}
              alt="Acewall Scholars Desktop Logo"
              className="w-40 h-auto"
            />
          </Link>

          {/* Navigation links */}
          {/* Added navigation role for semantic structure */}
          <nav className="hidden md:flex gap-6 items-center" aria-label="Main Student Navigation">
            <MoreCoursesDropdown />
            <Link
              to="/student/support"
              className="text-sm font-medium text-gray-700"
            >
              SUPPORT
            </Link>
            <Link
              to="/student/ContactUs"
              className="text-sm font-medium text-gray-700"
            >
              CONTACT US
            </Link>
          </nav>

          {/* Search bar (desktop only) */}
          <div className="relative w-64 hidden md:flex flex-col">
            <DropdownMenu
              open={openDropdown}
              onOpenChange={setOpenDropdown}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <div className="relative flex gap-2 w-full">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search courses and lessons"
                    className="w-full"
                    id="course-search-input" // Added ID for explicit label/aria-label
                    aria-label="Search courses and lessons"
                    aria-autocomplete="list"
                    aria-controls="search-results-list"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                    aria-label="Perform course search"
                  >
                    <Search className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border mt-2 max-h-60 overflow-y-auto z-50 w-64" id="search-results-list">
                {loading ? (
                  <DropdownMenuItem disabled>
                    <Loader className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span className="text-sm text-gray-700" role="status">Searching...</span>
                  </DropdownMenuItem>
                ) : dropdownCourses.length > 0 ? (
                  dropdownCourses.map((enrollment) => (
                    <DropdownMenuItem
                      key={enrollment._id}
                      asChild
                      onSelect={(e) => {
                        e.preventDefault(); // prevent dropdown closing from being interrupted
                      }}
                    >
                      <Link
                        to={`/student/mycourses/${enrollment._id}`}
                        className="w-full text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 block"
                        onClick={() => setOpenDropdown(false)}
                        aria-label={`Go to course: ${enrollment.course.courseTitle || "Untitled Course"}`}
                      >
                        {enrollment.course.courseTitle || "Untitled Course"}
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-500" role="status">
                      No results found
                    </span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* Added role="complementary" or role="navigation" and id for aria-controls */}
        <aside
          id="student-sidebar"
          className={`bg-white ${
            isSidebarOpen ? "fixed inset-0 z-20 md:static" : "hidden"
          } w-screen md:w-64 flex-shrink-0 overflow-y-auto md:block border-r`}
          role="navigation"
          aria-label="Student primary sidebar menu"
        >
          {/* Close button for mobile sidebar (hidden in original, added for accessibility on mobile) */}
          {isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
          )}

          <div className="p-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b">
              <Link to="/student/account" className="block" aria-label="Go to My Account settings">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={UpdatedUser?.profileImg?.url || avatar}
                    alt={`${UpdatedUser?.firstName || "Student"} profile picture`} // Descriptive alt text
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </Link>
              <div>
                <p className="font-medium" id="user-name">
                  {UpdatedUser?.firstName || "username "}
                </p>
                <p
                  className="text-sm text-gray-600 w-full max-w-[150px] break-words"
                  title={UpdatedUser?.email || "email"}
                  aria-labelledby="user-name"
                >
                  {UpdatedUser?.email || "email"}
                </p>{" "}
              </div>
            </div>

            {/* Mobile search (Updated to be more accessible, though functionality is limited in the snippet) */}
            <div className="flex md:hidden items-center space-x-4 mb-5 pt-4">
              <Input 
                type="text" 
                placeholder="Search" 
                className="flex-grow" 
                aria-label="Search student modules (mobile)"
                id="mobile-search-input" 
              />
              <button 
                onClick={() => { /* Mobile search logic here */ }}
                className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer"
                aria-label="Perform mobile search"
              >
                <Search className="rounded-full" aria-hidden="true" />
              </button>
            </div>

            {/* Sidebar navigation links */}
            <nav className="space-y-2 pt-4" aria-label="Student feature links">
              {sideBarTabs.map((tab) => {
                const isPreviewDisabled = user.role === "teacherAsStudent" && tab.allowedAsPreview === false;
                const linkClassName = `flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                  location === tab.path 
                    ? "bg-green-500" 
                    : isPreviewDisabled ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-100"
                }`;
                const textClassName = `${
                  location === tab.path
                    ? "text-white font-medium"
                    : "text-green-600 font-medium"
                }`;

                // Using a conditional rendering approach based on accessibility and logic
                return (
                  <div 
                    key={tab.id}
                    // Apply visual styling for disabled state when in preview mode
                    className={isPreviewDisabled ? "pointer-events-none opacity-50" : ""}
                  >
                    {/* If disabled, render a span or div instead of a clickable link for semantics */}
                    {isPreviewDisabled ? (
                      <div className={linkClassName} role="link" aria-disabled="true" title={`Unavailable in preview mode: ${tab.name}`}>
                        <p aria-hidden="true">{tab.icon}</p>
                        <span className={textClassName}>
                          {tab.name}
                          <span className="sr-only"> (Disabled in preview mode)</span>
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={tab.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={linkClassName}
                        aria-current={location === tab.path ? "page" : undefined}
                      >
                        <p aria-hidden="true">{tab.icon}</p>
                        <span className={textClassName}>
                          {tab.name}
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Promo image */}
            <div className="flex flex-col items-center justify-between mt-10 w-full">
              <img src={acewallshort} alt="Acewall logo promoting tutoring services" className="w-1/2" />
              <Link
                to="https://www.acewallscholars.org/contact-Us"
                className="text-center font-semibold text-sm mt-4 text-acewall-main hover:underline"
                aria-label="Need tutoring? Contact us for more information"
              >
                Need Tutoring? Contact us
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Outlet */}
        {/* Added role="main" for semantic main content area */}
        <main className="flex-1 p-2 md:p-4 overflow-y-auto" role="main">
          <Outlet />
        </main>
      </div>

      {/* Footer is assumed to be accessible internally */}
      <Footer />
    </div>
  );
}