import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import acewallscholarslogo from "../assets/acewallscholarslogo.webp";
import acewallshort from "../assets/acewallshort.png";

import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import Footer from "@/CustomComponent/Footer";
import { MultiLevelDropdown } from "@/CustomComponent/MultilevelDropdown";

const topBarTabs = [
  {
    label: "MORE COURSE",
    items: [
      {
        label: "History",
        subItems: [
          { label: "World History", onClick: () => {} },
          { label: "US History", onClick: () => {} },
          { label: "African American History", onClick: () => {} },
          { label: "European History", onClick: () => {} },
          { label: "Government", onClick: () => {} },
        ],
      },
      {
        label: "Science",
        subItems: [
          { label: "Biology", onClick: () => {} },
          { label: "Chemistry", onClick: () => {} },
          { label: "Physics", onClick: () => {} },
          { label: "Earth Science", onClick: () => {} },
          { label: "Geology", onClick: () => {} },
        ],
      },
      {
        label: "Mathematics",
        subItems: [
          { label: "Algebra 1", onClick: () => {} },
          { label: "Algebra 2", onClick: () => {} },
          { label: "Pre-Algebra", onClick: () => {} },
          { label: "Geometry", onClick: () => {} },
          { label: "Pre-Calculus", onClick: () => {} },
          { label: "Trigonometry", onClick: () => {} },
          { label: "Calculus", onClick: () => {} },
        ],
      },
      {
        label: "English",
        subItems: [
          { label: "American Literature", onClick: () => {} },
          { label: "World Literature", onClick: () => {} },
          { label: "British Literature", onClick: () => {} },
        ],
      },
      {
        label: "Culinary Arts",
        subItems: [
          { label: "Baking", onClick: () => {} },
          { label: "Sauces", onClick: () => {} },
          { label: "Italian Cuisine", onClick: () => {} },
          { label: "French Cuisine", onClick: () => {} },
          { label: "Asian Cuisine", onClick: () => {} },
        ],
      },
      {
        label: "Mental Wellness",
        subItems: [
          { label: "Breath Work", onClick: () => {} },
          { label: "Meditation/Yoga", onClick: () => {} },
        ],
      },
      {
        label: "Engineering",
        subItems: [{ label: "Audio Engineering", onClick: () => {} }],
      },
    ],
  },
  {
    label: "SUPPORT",
    items: [
      { label: "Contact Us", onClick: () => {} },
      { label: "FAQ", onClick: () => {} },
      { label: "Help Center", onClick: () => {} },
    ],
  },
];

const MainLayout = () => {
  return (
    <>
      <div className="flex h-screen flex-col w-screen">
        <div className="h-8 bg-green-600 flex justify-end items-end px-5 cursor-pointer" />
        {/* Header Navigation */}
        <header className="sticky top-0 z-10 bg-white w-full">
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
              {topBarTabs.map((category, index) => (
                <MultiLevelDropdown
                  key={index}
                  label={category.label}
                  items={category.items}
                />
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Input
                type="email"
                placeholder="Search for courses and lessons"
              />
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
