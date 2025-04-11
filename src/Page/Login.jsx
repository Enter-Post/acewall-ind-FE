import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import acewallshort from "../assets/acewallshort.png";
import Footer from "@/CustomComponent/Footer";
import LandingPage from "./LandingPage";
import ReviewsSlider from "@/CustomComponent/LoginComponent/ReviewsSlider";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/AxiosInstance";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const Login = () => {
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8).regex(passwordValidation, {
      message: "Your password is not valid",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   const fetching = async () => {
  //     const { data } = await axiosInstance.get("auth/users");
  //     console.log(data);
  //   };
  //   fetching();
  // }, []);

  const onSubmit = (data) => {};

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-sm md:text-base">
            Return to Home
          </Link>
          <Link to={"/"} className="text-sm  md:text-base">
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-2xl  md:text-3xl text-gray-800 font-normal mb-8">
            Student Log-in Page
          </h1>

          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Login Form */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue=""
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("password")}
                    defaultValue=""
                  />
                  {errors?.password && (
                    <p className="text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={"/TeacherLogin"}
                    className="text-sm font-bold text-green-500"
                  >
                    Log in as Teacher
                  </Link>
                  {/* <Link to={"/student"}> */}
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded transition-colors"
                  >
                    Login
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>

            {/* Testimonial Section */}
            <ReviewsSlider />
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Login;
