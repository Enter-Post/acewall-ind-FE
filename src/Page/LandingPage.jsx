import React, { useState } from "react";
import logo from "../assets/acewallscholarslogo.webp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LandingPageCard from "@/CustomComponent/LandingPageCard";
import Layout from "./StudentPortal/Layout";
import { TopNavbarDropDown } from "@/CustomComponent/TopNavDropDown";
import { Megaphone02Icon } from "@/assets/Icons/Announcement";
import { Menu, Search } from "lucide-react"; // Using lucide-react for the Search icon
import { Input } from "@/components/ui/input"; // Ensure this import is correct
import acewallscholarslogo from "../assets/acewallscholarslogo.webp";
import acewallshort from "../assets/acewallshort.png";
import Footer from "@/CustomComponent/Footer";
 
const cardData = [
  {
    name: "Academic Tutoring",
    description:
      "Acewall Scholars offers one-on-one tutoring services to support students in their academic journey. Our experienced tutors provide personalized instruction and guidance to help students succeed.",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/AdobeStock_357701907-1920w.jpeg",
    buttonUrl: "https://www.acewallscholars.org/academic-tutoring ",
  },

  {
    name: "Mentoring and Mental Health Support - a 360° approach",
    description:
      "Acewall Scholars offers a 360° approach to mentoring and mental health support. Our experienced mentors and mental health professionals provide personalized support and guidance to help students succeed.",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/AdobeStock_355386233-834697fd-1920w.jpeg",
    buttonUrl: "https://www.acewallscholars.org/mentoring",
  },
  {
    name: "Parent Aide",
    description:
      "Acewall Scholars offers The Holistic Parent Aid program. This program falls within our mentoring department. Our Parenting progam offers Acewall Scholars will assist students with finding summer programs, internships, and/or apprenticeships, ",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/shutterstock_2329065089-1920w.jpg",
    buttonUrl: "https://www.acewallscholars.org/parent-aide",
  },
  {
    name: "Test Prep",
    description:
      "Acewall Scholars offers test preparation services to support students in their academic journey. Our experienced tutors provide personalized instruction and guidance to help students succeed.",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/row-students-doing-exam-1920w.jpg",
    buttonUrl: "https://www.acewallscholars.org/test-prep",
  },
  {
    name: "Internship Support/Placement",
    description:
      "Acewall Scholars offers internship support and placement services to support students in their academic journey. Our experienced mentors and career counselors provide personalized support and guidance to help students succeed.",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/internship+support-placement-1920w.jpg",
    buttonUrl: "https://www.acewallscholars.org/internship-support/placement",
  },

  {
    name: "College Counseling",
    description:
      "Our college counseling service assists and empowers both students and parents by providing the necessary guidance and information to assist in navigating the college process. necessary guidance and information to assist in navigating the college process. ",
    imageUrl:
      "https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/college+counseling-1920w.jpg",
    buttonUrl: "https://www.acewallscholars.org/college-counseling",
  },
];
const topBarTabs = [
  {
    id: 7,
    name: "More Courses",
    icon: <Megaphone02Icon />,
    path: "/student/moreCourses",
  },
  {
    id: 8,
    name: "Support",
    icon: <Megaphone02Icon />,
    path: "/student/support",
  },
];
const LandingPage = () => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      {/* Top Bar */}
      <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer"></div>
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-green-50 w-full">
        <div className="flex h-16 items-center justify-between px-4 border">
         
          {/* <div className="text-xl font-semibold">ScholarNest</div> */}
          <Link
            onClick={() => setselected(1)}
            className="block md:hidden"
            to={"/student"}
          >
            <img
              src={acewallshort}
              alt="Mobile Logo"
              className="w-8 rounded-full h-auto cursor-pointer"
            />
          </Link>
          <Link
            onClick={() => setselected(1)}
            className="hidden md:block"
            to={"/student"}
          >
            <img
              src={acewallscholarslogo}
              alt="Desktop Logo"
              className="w-40 h-auto  cursor-pointer"
            />
          </Link>

          <div className="flex gap-5 text-black text-sm ">
            {topBarTabs.map((tabs, index) => {
              return (
                <Link
                  key={index}
                  to={tabs.path}
                  onClick={() => {
                    setselected(tabs.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`cursor-pointer ${
                    selected == tabs.id && "text-green-500 font-bold"
                  }`}
                >
                  {tabs.name}
                </Link>
              );
            })}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Input type="email" placeholder="Search" />
            <div className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer">
              <Search className="rounded-full" />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col ">
        <div className="h-[70vh] bg-cover bg-center bg-[url('assets/hero.webp')] ">
          <div className="h-full  relative w-full bg-black/50 backdrop-blur- flex items-start  justify-start">
            <div className="flex  flex-col mt-10 justify-center  items-center px-2 text-center">
              <h1 className="text-white text-xl font-semibold tracking-wide">
                Where the vision is realized. Where the dream is achieved
              </h1>
              <div className=" flex items-center justify-center flex-wrap  sm:flex-row flex-col">
                <img
                  src={acewallshort}
                  alt=""
                  className="w-15"
                />
                <h2 className="text-white text-md max-w-lg px-4">
                  Imagine * Believe * Create
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black flex gap-5 items-center justify-evenly p-4 px-10 w-full lg:flex-row flex-col ">
          <h1 className="text-white text-xl">Create an account </h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white rounded p-1"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="bg-white rounded p-1"
          />
          <Link to={"/signup"}>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-3 py-3 md:px-5 md:py-2.5"
            >
              Create Account
            </button>
          </Link>
          <Link to={"/login"}>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-3 py-3 md:px-5 md:py-2.5"
            >
              Login
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-2 p-3">
          {cardData.map((card, index) => (
            <LandingPageCard
              key={index}
              name={card.name}
              description={card.description}
              imageUrl={card.imageUrl}
              buttonUrl={card.buttonUrl}
            />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
