import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
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

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/Home" element={<MainLayout />}>
        </Route>
        <Route path="/studentPortal" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="mycourses" element={<Mycourses />}></Route>
          <Route path="assignment" element={<Assignment />}></Route>
          <Route path="gradebook" element={<Gradebook />}></Route>
          <Route path="announcements" element={<Announcement />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="Course/:id" element={<CoursesDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="allCourseDetails/:id" element={<AllCoursesDetail />} />
          <Route path="moreCourses" element={<AllCourses />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
