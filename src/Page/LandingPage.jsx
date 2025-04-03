import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobalContext } from "@/Context/GlobalProvider";
import { LandingPageCard } from "@/CustomComponent/Card";

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

const LandingPage = () => {
  const [selected, setSelected] = useState(null);
  const [usertype, setusertype] = useState("");

  const { user, setUser } = useContext(GlobalContext);

  const handleUserType = (value) => {
    setUser(value);
    console.log("Selected User type:", value); // Replace this with theme logic
  };

  return (
    <>
      {/* Top Bar */}

      <div className="flex flex-col ">
        <div className="h-[70vh] bg-cover bg-start bg-[url('assets/hero.webp')] ">
          <div className="h-full  relative w-full bg-black/50 backdrop-blur- flex items-start  justify-start">
            <div className="flex  flex-col mt-10 justify-center  items-center px-2 text-center">
              <h1 className="text-white text-xl font-semibold tracking-wide mx-10">
                Where the vision is realized. Where the dream is achieved
              </h1>
              <div className="flex items-center justify-center flex-wrap sm:flex-row flex-col gap-x-2 text-white ml-2">
                <div className="flex items-center text-md whitespace-nowrap">
                  <p>Imagine</p>
                  <Dot size={28} strokeWidth={3} className="-mx-1.5" />
                  <p>Believe</p>
                  <Dot size={28} strokeWidth={3} className="-mx-1.5" />
                  <p>Create</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black flex flex-col lg:flex-row items-center gap-4 lg:gap-5 p-6 lg:p-4 w-full justify-center">
          <h1 className="text-white text-2xl font-semibold text-center">
            Create an account
          </h1>

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black rounded-lg px-4 py-2 w-full lg:w-[250px] focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <Select onValueChange={handleUserType}>
            <SelectTrigger className="w-full lg:w-[180px] bg-white rounded-lg px-4 py-5">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
            <Link to="/signup">
              <button
                onClick={() => {
                  setUser(usertype);
                }}
                className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-6 py-3 w-full"
              >
                Create Account
              </button>
            </Link>

            <Link to="/login">
              <button
                onClick={() => {
                  localStorage.setItem("UserRole", usertype);
                }}
                className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-6 py-3 w-full"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
        <section className="flex justify-center">
          <div
            id="additionalServices"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-2 p-3 w-[80%]"
          >
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
        </section>
      </div>
    </>
  );
};

export default LandingPage;
