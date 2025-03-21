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
import TeacherDashboard from "./Page/TeacherPortal/Dashboard";
import Messages from "./Page/StudentPortal/Messages";
import TermsandCondition from "./Page/Termsandcondition";
import PrivacyPolicy from "./Page/Priactpolicy";

import CreateCourses from "./Page/TeacherPortal/Courses/CreateCourses";
import TeacherCourses from "./Page/TeacherPortal/Courses/TeacherCourses";
import CoursesChapter from "./Page/TeacherPortal/Courses/CourseChapters";
import TeacherCourseDetails from "./Page/TeacherPortal/Courses/CourseDetail";
import TeacherGradebook from "./Page/TeacherPortal/Courses/Gradebook";
import Earning from "./Page/TeacherPortal/Earning";
import TeacherAccount from "./Page/TeacherPortal/Account";
import TeacherMessages from "./Page/TeacherPortal/Messages";
import Teacherrassessment from "./Page/TeacherPortal/TeacherAssignment";
import TeacherAnnoucement from "./Page/TeacherPortal/TeacherAnnoucement";
import TeacherLogin from "./Page/TeacherLogin";
import CreateAssessment from "./Page/TeacherPortal/CreateAssessment";
import AllStudent from "./Page/TeacherPortal/AllStudent";
import StudentProfile from "./Page/TeacherPortal/studentProfile";
import School from "./Page/School";
import GeneralCourses from "./Page/GeneralCourses";
import GeneralSupport from "./Page/GeneralSupport";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/School" element={<School />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/TeacherLogin" element={<TeacherLogin />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/Home" element={<MainLayout />}></Route>
        <Route path="/Courses" element={<GeneralCourses />}></Route>
        <Route path="/Support" element={<GeneralSupport />}></Route>
        <Route
          path="/TermsandCondition"
          element={<TermsandCondition />}
        ></Route>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
        {/* Student Routes */}
        <Route path="/student" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="mycourses" element={<Mycourses />}></Route>
          <Route path="myCourseDetail" element={<MyCourseDetail />}></Route>
          <Route path="assignment" element={<Assignment />}></Route>
          <Route path="gradebook" element={<Gradebook />}></Route>
          <Route path="announcements" element={<Announcement />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="Course" element={<CoursesDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="allCourseDetails" element={<AllCoursesDetail />} />
          <Route path="moreCourses" element={<AllCourses />} />
          <Route path="payment" element={<Payment />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        {/* Teachers Routes */}

        <Route path="/teacherPortal" element={<TeacherPortalLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="earning" element={<Earning />} />
          <Route path="account" element={<TeacherAccount />} />
          <Route path="messages" element={<TeacherMessages />} />
          <Route path="assignment">
          <Route index element={<Teacherrassessment />}/>
            <Route path="create" element={<CreateAssessment />} />
          </Route>
          <Route path="Announcements" element={<TeacherAnnoucement />} />
          <Route path="allStudent" element={<AllStudent />} />
          <Route path="studentProfile" element={<StudentProfile />} />
          <Route path="courses">
            <Route index element={<TeacherCourses />} />
            <Route path="courseDetail" element={<TeacherCourseDetails />} />
            <Route path="createCourses">
              <Route index element={<CreateCourses />} />
              <Route path="addchapters" element={<CoursesChapter />} />
              <Route path="courseDetail" element={<TeacherCourseDetails />} />
              <Route path="gradebook" element={<TeacherGradebook />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
