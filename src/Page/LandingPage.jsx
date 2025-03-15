import React from "react";
import logo from "../assets/acewallscholarslogo.webp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen bg-cover bg-center bg-[url('assets/hero.webp')]">
      <div className="h-full w-full bg-black/50 backdrop-blur- flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <h1 className="text-white text-5xl font-extrabold tracking-wide">
            Welcome to <span className="text-green-400">Acewall Scholars</span>
          </h1>
          <p className="text-white text-lg max-w-lg px-4">
            Empowering minds, shaping futures. Join our vibrant community of
            learners and achievers today!
          </p>
          <Link to={"/signup"} >
            <Button className="bg-green-400 hover:bg-green-500 px-6 py-3 text-lg font-semibold">
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
