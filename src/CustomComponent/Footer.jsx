import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TermsModal from "@/CustomComponent/Termsandcondition";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import PrivacyPolicy from "./PrivacePolicy";

export default function Footer() {
  const usefulLinks = [
    { name: "Home", url: "http://localhost:5173/" },
    { name: "About us", url: "/about" },
    { name: "Additional Services", url: "/AdditionalServices" },
    {
      name: "https://www.acewallscholars.org",
      url: "https://www.acewallscholars.org/",
    },
  ];

  const popularCourses = [
    { name: "Biology", url: "http://localhost:5173/Courses/detail" },
    { name: "Algebra", url: "http://localhost:5173/Courses/detail" },
    { name: "English", url: "http://localhost:5173/Courses/detail" },
    { name: "Maths", url: "http://localhost:5173/Courses/detail" },
    { name: "Physics", url: "http://localhost:5173/Courses/detail" },
  ];

  const socialLinks = [
    { Icon: Twitter, url: "https://twitter.com/AcewallScholars" },
    { Icon: Facebook, url: "https://www.facebook.com/acewallscholars" },
    {
      Icon: Instagram,
      url: "https://www.instagram.com/acewallscholarsonline/",
    },
    {
      Icon: Youtube,
      url: "https://youtube.com/channel/UCR7GG6Dvnuf6ckhTo3wqSIQ",
    },
    { Icon: Mail, url: "mailto:contact@acewallscholars.org" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Acewall Scholars */}
          <div>
            <h3 className="font-semibold text-white mb-4">Acewall Scholars</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Acewall Scholars</p>
              <p>P.O. Box 445</p>
              <p>Powhatan, VA 23139</p>
              <p>Email: contact@acewallscholars.org</p>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="flex items-center hover:text-white"
                  >
                    <span className="text-green-500 mr-2">›</span>{" "}
                    <p>{link.name}</p>
                  </Link>
                </li>
              ))}

              <li className="flex cursor-pointer">
                <span className="text-green-500 mr-2 ">›</span> <TermsModal />
              </li>
              <li className="flex cursor-pointer">
                <span className="text-green-500 mr-2 ">›</span> <PrivacyPolicy />
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Courses */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {popularCourses.map((course, index) => (
                <li key={index}>
                  <Link
                    to={course.url}
                    className="flex items-center hover:text-white"
                  >
                    <span className="text-green-500 mr-2">›</span> {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Stay updated with our latest news and offers.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-l-md rounded-r-none border-gray-700 bg-black text-white focus:ring-0 focus:border-gray-600"
              />
              <Button className="rounded-l-none bg-green-500 hover:bg-green-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Social Media */}
      <div className="bg-[#0c0c0c] py-4 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © Copyright{" "}
              <a target="#" to="https://www.acewallscholars.org/">
                <span className="text-green-500 font-bold">
                  Acewall Scholars.
                </span>
              </a>{" "}
              All Rights Reserved
            </p>
            <div className="flex space-x-2 mt-4 md:mt-0">
              {socialLinks.map(({ Icon, url }, index) => (
                <Link
                  key={index}
                  to={url}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <Link
          to="#"
          className="absolute right-4 bottom-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ArrowUp className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  );
}
