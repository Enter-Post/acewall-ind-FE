import React from "react";
import bannerLogo from "../assets/featuredpage2.png";
import teacherpic from "../assets/TeacherPic.png";
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
      heading: "For Students K-12 / College Level",
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
      <section className="bg-[#eafdf2]">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-green-800 leading-tight">
                Best online platform for education.
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Since 2006, <span className="font-semibold text-green-800">Acewall Scholars</span>
                has helped students master math and science while nurturing growth beyond the classroom. 
                With programs that blend academics, wellness, and personal development, we empower every learner 
                to reach their fullest potential.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/home">
                  <button className="bg-green-600 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-green-700 transition">
                    Get Started Today
                  </button>
                </Link>
                <Link to="/login">
                  <button className="border border-green-600 text-green-600 bg-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-green-50 transition">
                    Login
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src={bannerLogo}
                alt="Educational Platform Banner"
                className="w-80 h-80 object-cover rounded-full shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 mb-20">
            {/* Card 1 */}
            <div
              id="schools"
              onClick={() => document.getElementById("card1")?.scrollIntoView({ behavior: "smooth" })}
              className="relative bg-blue-900 text-white text-center rounded-lg p-6 shadow-lg overflow-visible cursor-pointer hover:bg-blue-800 transition"
            >
              <h3 className="text-lg font-bold mb-20">Schools/Institutions</h3>
              <img
                src="https://imgs.search.brave.com/CADB44w2NE-4yBTcKGt32WI63tXzFpozkZ_HJXPYN4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvc2Nob29s/LWJ1aWxkaW5nLWls/bHVzdHJhdGlvbi1k/b3dubG9hZC1pbi1z/dmctcG5nLWdpZi1m/aWxlLWZvcm1hdHMt/LXVuaXZlcnNpdHkt/cGFjay1lZHVjYXRp/b24taWxsdXN0cmF0/aW9ucy04NzQ2NjUw/LnBuZw"
                alt="Schools"
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 w-full h-full object-contain"
              />
            </div>

            {/* Card 2 */}
            <div
              id="teachers"
              onClick={() => document.getElementById("card2")?.scrollIntoView({ behavior: "smooth" })}
              className="relative bg-blue-900 text-white text-center rounded-lg p-6 shadow-lg overflow-visible cursor-pointer hover:bg-blue-800 transition"
            >
              <h3 className="text-lg font-bold mb-20">Teachers</h3>
              <img
                src={teacherpic}
                alt="Teachers"
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 w-full h-full object-contain"
              />
            </div>

            {/* Card 3 */}
            <div
              id="students"
              onClick={() => document.getElementById("card3")?.scrollIntoView({ behavior: "smooth" })}
              className="relative bg-blue-900 text-white text-center rounded-lg p-6 shadow-lg overflow-visible cursor-pointer hover:bg-blue-800 transition"
            >
              <h3 className="text-lg font-bold mb-20">Students K-12 / College Level</h3>
              <img
                src="https://imgs.search.brave.com/a-KUWna3VD1pkg_ROq62sv2ReqUI0muRKlvD_RFjd1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvNy9Hcm91/cC1Db2xsZWdlLVN0/dWRlbnQtUE5HLUZy/ZWUtRG93bmxvYWQu/cG5n"
                alt="Students"
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-[4vw] font-bold mb-4">
              Who We Serve
            </h1>
            <p className="text-base sm:text-lg font-semibold leading-relaxed">
              Empowering schools, teachers, and students with one powerful platform that makes learning seamless, 
              teaching effortless, and school management smarter—anytime, anywhere.
            </p>
          </div>
        </div>

        <StackedCard cardsData={cardsData} />
      </section>
    </div>
  );
};

export default FeaturedPage;
