import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import acewallscholarslogo from "../assets/acewallscholarslogo.webp";
import acewallshort from "../assets/acewallshort.png";

import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import Footer from "@/CustomComponent/Footer";

const topBarTabs = [
  {
    id: 7,
    name: "Courses",
    path: "/Courses",
  },
  {
    id: 8,
    name: "Support",
    path: "/Support",
  },
];

const MainLayout = () => {
  return (
    <>
      <div className="flex h-screen flex-col w-screen">
        <div className="h-8 bg-green-600 flex justify-end items-end px-5 cursor-pointer" />
        {/* Header Navigation */}
        <header className="sticky top-0 z-10 bg-green-50 w-full">
          <div className="flex h-16 items-center justify-between px-4">
            {/* <div className="text-xl font-semibold">ScholarNest</div> */}
            <Link className="block md:hidden" to={"/"}>
              <img
                src={acewallshort}
                alt="Mobile Logo"
                className="w-8 rounded-full h-auto cursor-pointer"
              />
            </Link>
            <Link className="hidden md:block" to={"/"}>
              <img
                src={acewallscholarslogo}
                alt="Desktop Logo"
                className="w-40 h-auto  cursor-pointer"
              />
            </Link>

            <div className="flex gap-5 text-black text-sm ">
              {topBarTabs.map((tabs, index) => {
                return (
                  <Link key={index} to={tabs.path}>
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
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 hide-scrollbar overflow-y-scroll">
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
