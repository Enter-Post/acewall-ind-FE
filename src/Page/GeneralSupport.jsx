import React from "react";
import { Link } from "react-router-dom";
import acewallscholarslogo from "../assets/acewallscholarslogo.webp";
import acewallshort from "../assets/acewallshort.png";
import Footer from "@/CustomComponent/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Support from "./Support";

const GeneralSupport = () => {
  const topBarTabs = [
    {
      id: 12,
      name: "Home",
      path: "/",
    },
    {
      id: 7,
      name: "More Courses",
      path: "/Courses",
    },
    {
      id: 8,
      name: "Support",
      path: "/Support",
    },
  ];

  return (
    <div>
      <header className="sticky top-0 z-10 bg-green-50 w-full mb-10">
        <div className="h-auto py-1 bg-green-600 flex justify-end items-end px-5 cursor-pointer">
          <Link to={"/School "}>
            <button
              type="submit"
              className="text-white bg-acewall-main hover:bg-green-700 font-medium rounded-lg text-sm px-2 py-3 md:px-2 md:py-2"
            >
              For School's Teachers and Students
            </button>
          </Link>
        </div>
        <div className="flex h-16 items-center justify-between px-4 border">
          {/* <div className="text-xl font-semibold">ScholarNest</div> */}
          <Link
            // onClick={() => setselected(1)}
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
            // onClick={() => setselected(1)}
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
                  // onClick={() => {
                  //   setselected(tabs.id);
                  //   setIsSidebarOpen(false);
                  // }}
                  //   className={`cursor-pointer ${
                  //     selected == tabs.id && "text-green-500 font-bold"
                  //   }`
                  // }
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

      <Support/>


      <Footer />
    </div>
  );
};

export default GeneralSupport;
