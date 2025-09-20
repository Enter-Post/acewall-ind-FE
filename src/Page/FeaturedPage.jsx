import React from "react";
import bannerLogo from "../assets/featuredpage2.png";
import { Link } from "react-router-dom";
import { StackedCard } from "./StackedCard";

const FeaturedPage = () => {
const cardsData = [
  {
    id: "card1",
    heading: "For Schools & Institutions",
    text: "Streamline education and improve outcomes with a complete online learning solution. Our platform helps schools move seamlessly to the cloud, making education more accessible, efficient, and scalable—without heavy infrastructure or setup.",
    bulletPoints: [
      "Worldwide access for students and teachers",
      "100% cloud-based – no heavy setup required",
      "Manage courses, teachers, and students all in one place",
      "Centralized grading, announcements, and communication",
      "Secure and reliable platform for every institution",
      "Quick onboarding and easy adoption for schools",
      "Improve overall academic performance and engagement",
      "Automated notifications and reminders",
      "Scalable solution for institutions of any size",
    ],
  },
  {
    id: "card2",
    heading: "For Teachers",
    text: "Simplify teaching and focus on what matters most—your students. Our LMS gives teachers the tools to create engaging courses, track performance, and personalize learning experiences with ease.",
    bulletPoints: [
      "Create and manage courses effortlessly",
      "Assign and grade homework, projects, and exams",
      "Chat with students individually or as a group",
      "Access and manage detailed gradebooks",
      "Customize your profile and teaching style",
      "Track student performance with analytics",
      "Upload video lectures and course materials",
      "Send announcements and reminders instantly",
      "Save time with streamlined teaching workflows",
    ],
  },
  {
    id: "card3",
    heading: "For Students",
    text: "Learn anywhere, anytime—with everything you need at your fingertips. Students can enjoy a smooth learning experience, connect with teachers, and stay on top of assignments—all from one simple platform.",
    bulletPoints: [
      "Enroll in courses and complete assignments easily",
      "Access video lectures, notes, and documents anytime",
      "Communicate directly with teachers through built-in messaging",
      "View grades and progress in real time",
      "24/7 support to help whenever you’re stuck",
      "Access a variety of learning resources in one place",
      "Learn at your own pace with flexible schedules",
      "Stay updated with notifications and announcements",
      "Connect and collaborate with peers worldwide",
    ],
  },
];


return (
    <div>
      {/* Hero Section */}
      <section>
       <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
  <div className="container mx-auto px-4 sm:px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] space-y-10 lg:space-y-0">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 leading-tight">
          Best online platform for education.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Since 2006, Acewall Scholars has helped students master math
          and science while nurturing their growth beyond the classroom.
          With programs that blend academics, wellness, and personal
          development, we empower every learner to reach their fullest
          potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start px-4 sm:px-0">
          <Link to="/home">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="lg:w-1/2 mt-10 lg:mt-0 px-4 sm:px-0 flex justify-center lg:justify-end">
        <img
          src={bannerLogo}
          alt="Educational Platform Banner"
          className="max-w-full h-auto object-contain "
        />
      </div>
    </div>
  </div>
</div>

      </section>

      {/* Featured Cards Section */}
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12  py-12">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-[4vw] font-bold mb-4">
              Who We Serve
            </h1>
            <p className="text-base sm:text-lg font-semibold  leading-relaxed">
              Empowering schools, teachers, and students with one powerful
              platform that makes learning seamless, teaching effortless, and
              school management smarter—anytime, anywhere.
            </p>
          </div>
        </div>

        <StackedCard cardsData={cardsData} />
      </section>
    </div>
  );
};



export default FeaturedPage;