"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";
import PasswordInfo from "./PasswordInfo";

const steps = [
  "Personal Information",
  "Contact Information",
  "Address Information",
  "Set Password",
];

const SignupForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/signup-success");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <ContactInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <AddressInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <PasswordInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className=" bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] dark:bg-gray-900">
      <div className="bg-black/50 backdrop-blur-md h-screen ">

      
      <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white border border-gray-300 rounded-lg shadow-md sm:max-w-2xl dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <h2 className="mb-2 font-medium text-gray-900 dark:text-white">
              {steps[currentStep]}
            </h2>
            <div className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {renderStep()}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-3 md:px-5 md:py-2.5 ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  Previous
                </button>
                {currentStep === steps.length - 1 ? (
                  <Link to={"/login"}>
                    <button
                      type="submit"
                      className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-3 md:px-5 md:py-2.5"
                    >
                      Create Account
                    </button>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default SignupForm;
