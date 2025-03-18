import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
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
              <p className="mt-4">Phone: (804) 464-7926</p>

              <p>Email: contact@acewallscholars.org</p>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="https://www.acewallscholars.org/" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="https://www.acewallscholars.org/about" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> About us
                </Link>
              </li>
              <li>
                <Link to="https://www.acewallscholars.org/academic-tutoring" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Services
                </Link>
              </li>
              <li>
                <Link  to="/TermsandCondition" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Terms of
                  service
                </Link>
              </li>
              <li>
                <Link to="/Privacypolicy" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Courses */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="http://localhost:5173/student/allCourseDetails" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Biology
                </Link>
              </li>
              <li>
                <Link to="http://localhost:5173/student/allCourseDetails" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Algebra 
                </Link>
              </li>
              <li>
                <Link to="http://localhost:5173/student/allCourseDetails" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> English
                </Link>
              </li>
              <li>
                <Link to="http://localhost:5173/student/allCourseDetails" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Maths
                </Link>
              </li>
              <li>
                <Link to="http://localhost:5173/student/allCourseDetails" className="flex items-center hover:text-white">
                  <span className="text-green-500 mr-2">›</span> Physics
                </Link>
              </li>
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
                placeholder=""
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
                <span className="text-green-500 font-bold">Acewall Scholars.</span>
              </a>
              {" "}
              All Rights Reserved
            </p>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Link
                to="https://twitter.com/AcewallScholars"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                to="https://www.facebook.com/acewallscholars"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                to="https://www.instagram.com/acewallscholarsonline/"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                to="https://youtube.com/channel/UCR7GG6Dvnuf6ckhTo3wqSIQ"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link
                to="contact@acewallscholars.org"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
              >
                <Mail className="h-4 w-4" />
              </Link>
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
