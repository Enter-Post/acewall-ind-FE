import { Route, Routes } from "react-router-dom";
import Layout from "./Page/StudentPortal/Layout";
import Deshboard from "./Page/StudentPortal/Deshboard";
import Mycourses from "./Page/StudentPortal/Courses/MyCourses";
import Assignment from "./Page/StudentPortal/Assignment";
import Login from "./Page/Login";
import Announcement from "./Page/StudentPortal/Announcement";
import Account from "./Page/StudentPortal/Account";
import Gradebook from "./Page/StudentPortal/Gradebook";
import SignupPage from "./Page/signup";
import AllCourses from "./Page/AllCourses";
import AllCoursesDetail from "./Page/allCourseDetail";
import MainLayout from "./Page/MainLayout";
import Support from "./Page/Support";
import LandingPage from "./Page/LandingPage";
import Messages from "./Page/StudentPortal/Messages";

import GeneralCourses from "./Page/GeneralCourses";
import GeneralSupport from "./Page/GeneralSupport";
import GeneralCoursesDetail from "./Page/GeneralCourseDetail";
import TeacherDashboard from "./Page/teacher/Dashboard";
import TeacherLayout from "./Page/teacher/Layout";
import TeacherAccount from "./Page/teacher/Account";
import TeacherrAssessment from "./Page/teacher/TeacherAssignment";
import TeacherAnnoucement from "./Page/teacher/TeacherAnnoucement";
import AllStudent from "./Page/teacher/AllStudent";
import StudentProfile from "./Page/teacher/studentProfile";
import TeacherCourses from "./Page/teacher/Courses/TeacherCourses";
import TeacherCourseDetails from "./Page/teacher/Courses/CourseDetail";
import CreateCourses from "./Page/teacher/Courses/CreateCourses";
import CoursesChapter from "./Page/teacher/Courses/CourseChapters";
import TeacherGradebook from "./Page/teacher/Courses/Gradebook";
import TeacherLogin from "./Page/TeacherLogin";
import CreateAssessmentPage from "./Page/teacher/CreateAssessment";
import AdditionalServices from "./Page/AdditionalServices";
import About from "./Page/About";
import ScrollToTop from "./lib/scrolltop";
import ContactUs from "./Page/ContactUs";
import { PrivateRoute, PublicRoute } from "./lib/PrivateRoutes";

import CoursesBasis from "./Page/teacher/Courses/CoursesBasics";
import { useEffect, useState } from "react";
import { GlobalContext } from "./Context/GlobalProvider";
import { useContext } from "react";
import { Loader } from "lucide-react";
import LoadingLoader from "./CustomComponent/LoadingLoader";
import MainDetailPage from "./Page/StudentPortal/Courses/MainDetailPage";
import ChapterDetail from "./Page/StudentPortal/Courses/MyCourseDetail";
import NotFoundPage from "./Page/NotFoundPage";
import { io } from "socket.io-client";
import ChatWindow from "./CustomComponent/MessagesCmp.jsx/chat-window";

function App() {
  const { checkAuth, user, Authloading, socket, setSocket, setOnlineUser } =
    useContext(GlobalContext);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    return () => {
      connectsocket();
    };
  }, [user]);

  if (Authloading) {
    return <LoadingLoader />;
  }

  const connectsocket = () => {
    console.log(user, "user");

    const newSocket = io("http://localhost:5050", {
      query: { userId: user?._id || "" },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (usersIds) => {
      setOnlineUser(usersIds);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <PublicRoute
              user={user}
              redirectTo={
                user?.role === "teacher" ? "/teacher" : "/student/mycourses"
              }
            />
          }
        >
          <Route path="/login" element={<Login />}></Route>
          <Route path="/TeacherLogin" element={<TeacherLogin />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/Courses">
              <Route index element={<GeneralCourses />}></Route>
              <Route
                path="detail/:id"
                element={<GeneralCoursesDetail />}
              ></Route>
              <Route path="culinaryArts" element={<AllCoursesDetail />} />
            </Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/Support" element={<GeneralSupport />}></Route>
            <Route path="/contactUs" element={<ContactUs />}></Route>
            <Route path="/*" element={<NotFoundPage />} />
            <Route
              path="/AdditionalServices"
              element={<AdditionalServices />}
            ></Route>
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<PrivateRoute user={user} allowedRole="student" />}>
          <Route path="/student" element={<Layout />}>
            <Route path="mycourses">
              <Route index element={<Mycourses />} />
              <Route path=":id" element={<MainDetailPage />} />
              <Route path="chapter/:id" element={<ChapterDetail />} />
            </Route>
            <Route index element={<Deshboard />} />

            <Route path="assignment" element={<Assignment />}></Route>
            <Route path="gradebook" element={<Gradebook />}></Route>
            <Route path="announcements" element={<Announcement />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="support" element={<Support />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="courses">
              <Route index element={<AllCourses />} />
              <Route path="detail/:id" element={<AllCoursesDetail />} />
            </Route>
            <Route path="messages">
              <Route index element={<Messages />} />
              <Route path=":id" element={<ChatWindow />} />
            </Route>
          </Route>
        </Route>

        {/* Teachers Routes */}
        <Route element={<PrivateRoute user={user} allowedRole="teacher" />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="account" element={<TeacherAccount />} />
            {/* <Route path="messages" element={<TeacherMessages />} /> */}
            <Route path="assignment">
              <Route index element={<TeacherrAssessment />} />
              <Route path="create/:type/:id" element={<CreateAssessmentPage />} />
            </Route>
            <Route path="Announcements" element={<TeacherAnnoucement />} />
            <Route path="allStudent" element={<AllStudent />} />
            <Route path="studentProfile/:id" element={<StudentProfile />} />
            <Route path="messages">
              <Route index element={<Messages />} />
              <Route path=":id" element={<ChatWindow />} />
            </Route>
            <Route path="courses">
              <Route index element={<TeacherCourses />} />
              <Route
                path="courseDetail/:id"
                element={<TeacherCourseDetails />}
              />
              <Route path="createCourses">
                <Route index element={<CoursesBasis />} />
                <Route path="addChapter/:id" element={<CoursesChapter />} />
                <Route path="gradebook" element={<TeacherGradebook />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
