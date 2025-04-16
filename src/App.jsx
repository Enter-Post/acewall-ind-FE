import { Route, Routes } from "react-router-dom";
import Layout from "./Page/StudentPortal/Layout";
import Deshboard from "./Page/StudentPortal/Deshboard";
import Mycourses from "./Page/StudentPortal/MyCourses";
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
import Payment from "./Page/StudentPortal/Payment";
import MyCourseDetail from "./Page/StudentPortal/MyCourseDetail";
import Messages from "./Page/StudentPortal/Messages";

import GeneralCourses from "./Page/GeneralCourses";
import GeneralSupport from "./Page/GeneralSupport";
import GeneralCoursesDetail from "./Page/GeneralCourseDetail";
import TeacherDashboard from "./Page/teacher/Dashboard";
import TeacherLayout from "./Page/teacher/Layout";
import Earning from "./Page/teacher/Earning/Earning";
import TeacherAccount from "./Page/teacher/Account";
import TeacherMessages from "./Page/teacher/Messages";
import Teacherrassessment from "./Page/teacher/TeacherAssignment";
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
import EarningDetail from "./Page/teacher/Earning/EarningDetail";
import AdditionalServices from "./Page/AdditionalServices";
import About from "./Page/About";
import ScrollToTop from "./lib/scrolltop";
import ContactUs from "./Page/ContactUs";
import { useState } from "react";
import { PrivateRoute, PublicRoute } from "./lib/PrivateRoutes";

import CoursesBasis from "./Page/teacher/Courses/CoursesBasics";
import CreateCourse from "./Page/teacher/Courses/CreateCourses";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { GlobalContext } from "./Context/GlobalProvider";
import { useContext } from "react";

function App() {
  const { checkAuth, user } = useContext(GlobalContext);
  console.log(user, "user in app.jsx");

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <PublicRoute
              user={user}
              redirectTo={user?.role === "teacher" ? "/teacher" : "/student"}
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
              <Route path="detail" element={<GeneralCoursesDetail />}></Route>
              <Route path="culinaryArts" element={<AllCoursesDetail />} />
            </Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/Support" element={<GeneralSupport />}></Route>
            <Route path="/contactUs" element={<ContactUs />}></Route>
            <Route
              path="/AdditionalServices"
              element={<AdditionalServices />}
            ></Route>
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<PrivateRoute user={user} allowedRole="student" />}>
          <Route path="/student" element={<Layout />}>
            <Route index element={<Deshboard />} />
            <Route path="mycourses" element={<Mycourses />}></Route>
            <Route path="myCourseDetail" element={<MyCourseDetail />}></Route>
            <Route path="assignment" element={<Assignment />}></Route>
            <Route path="gradebook" element={<Gradebook />}></Route>
            <Route path="announcements" element={<Announcement />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="support" element={<Support />} />
            <Route path="courses">
              <Route index element={<AllCourses />} />
              <Route path="detail" element={<AllCoursesDetail />} />
            </Route>
            <Route path="payment" element={<Payment />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Route>

        {/* Teachers Routes */}
        <Route element={<PrivateRoute user={user} allowedRole="teacher" />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="wallet">
              <Route index element={<Earning />} />
              <Route path="detail" element={<EarningDetail />} />
            </Route>
            <Route path="account" element={<TeacherAccount />} />
            <Route path="messages" element={<TeacherMessages />} />
            <Route path="assignment">
              <Route index element={<Teacherrassessment />} />
              <Route path="create" element={<CreateAssessmentPage />} />
            </Route>
            <Route path="Announcements" element={<TeacherAnnoucement />} />
            <Route path="allStudent" element={<AllStudent />} />
            <Route path="studentProfile" element={<StudentProfile />} />
            <Route path="courses">
              <Route index element={<TeacherCourses />} />
              <Route path="courseDetail/:id" element={<TeacherCourseDetails />} />
              <Route path="createCourses">
                <Route index element={<CoursesBasis />} />
                <Route path="addchapters" element={<CoursesChapter />} />
                <Route path="gradebook" element={<TeacherGradebook />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
