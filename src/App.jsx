import { Route, Routes } from "react-router-dom";
import Layout from "./Page/StudentPortal/Layout";
import Deshboard from "./Page/StudentPortal/Deshboard";
import Mycourses from "./Page/StudentPortal/MyCourses";
import Assignment from "./Page/StudentPortal/Assignment";
import Login from "./Page/Login";
import Announcement from "./Page/StudentPortal/Announcement";
import Account from "./Page/StudentPortal/Account";
import Gradebook from "./Page/StudentPortal/Gradebook";
import CoursesDetail from "./Page/StudentPortal/CoursesDetail";
import SignupPage from "./Page/signup";
import AllCourses from "./Page/AllCourses";
import AllCoursesDetail from "./Page/allCourseDetail";
import MainLayout from "./Page/MainLayout";
import Support from "./Page/Support";
import LandingPage from "./Page/LandingPage";
import Payment from "./Page/StudentPortal/Payment";
import TeacherPortalLayout from "./Page/TeacherPortal/Layout";
import MyCourseDetail from "./Page/StudentPortal/MyCourseDetail";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/Home" element={<MainLayout />}></Route>
        {/* Student Routes */}
        <Route path="/studentPortal" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="mycourses" element={<Mycourses />}></Route>
          <Route path="myCourseDetail" element={<MyCourseDetail />}></Route>
          <Route path="assignment" element={<Assignment />}></Route>
          <Route path="gradebook" element={<Gradebook />}></Route>
          <Route path="announcements" element={<Announcement />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="Course/:id" element={<CoursesDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="allCourseDetails/:id" element={<AllCoursesDetail />} />
          <Route path="moreCourses" element={<AllCourses />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        {/* Teachers Routes */}
        <Route path="/tseacherPortal" element={<TeacherPortalLayout />}>
        <Route path="/teacherPortal" element={<TeacherPortalLayout />}>
          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default App;
