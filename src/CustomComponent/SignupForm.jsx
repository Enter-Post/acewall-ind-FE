"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PersonalInfo from "./PersonalInfo"
import ContactInfo from "./ContactInfo"
import AddressInfo from "./AddressInfo"

const steps = ["Personal Information", "Contact Information", "Address Information"]

const SignupForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
    // For now, we'll just navigate to a success page
    navigate("/signup-success")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo formData={formData} handleInputChange={handleInputChange} />
      case 1:
        return <ContactInfo formData={formData} handleInputChange={handleInputChange} />
      case 2:
        return <AddressInfo formData={formData} handleInputChange={handleInputChange} />
      default:
        return null
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white border border-gray-300 rounded-lg shadow-md dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <h1 className="block mb-2 font-medium text-gray-900 dark:text-white">
              {steps[currentStep]}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {renderStep()}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  Previous
                </button>
                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create Account
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm

