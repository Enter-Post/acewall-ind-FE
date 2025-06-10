import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import acewallshort from "../assets/acewallshort.png";
import Footer from "@/CustomComponent/Footer";
import ReviewsSlider from "@/CustomComponent/LoginComponent/ReviewsSlider";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const { login, checkAuth } = useContext(GlobalContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState(""); // Track password input state

  // Validation schema using zod
  const schema = z.object({
    email: z
      .string()
      .min(1, "This field is required") // Ensure this field is not empty
      .email("Invalid email format"), // Validate email format
    password: z.string().min(1, "This field is required").min(8, "Password must be at least 8 characters"), // Ensure password is not empty and has a minimum length
  });

  // useForm hook setup with zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      setLoginError(""); // clear previous errors
      checkAuth(); // Check if user is authenticated
      // Optionally navigate somewhere on successful login
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      console.error(errorMessage);
      setLoginError(errorMessage);
    }
  };

  // Update the password input state as the user types
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-sm md:text-base">
            Return to Home
          </Link>
          <Link to={"/"} className="text-sm md:text-base">
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-normal mb-8">
            Student Login Page
          </h1>

          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Login Form */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="text-xs text-red-600 inline-block">
                      {errors.email.message} {/* Error message here */}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded pr-10"
                      {...register("password")}
                      value={passwordInput}
                      onChange={handlePasswordChange} // Track the password input
                    />
                    <div
                      className={`absolute inset-y-0 right-2 flex items-center cursor-pointer ${passwordInput ? "" : "opacity-50 cursor-not-allowed"}`}
                      onClick={() => passwordInput && setShowPassword((prev) => !prev)} // Enable click only if passwordInput is not empty
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </div>
                  </div>
                  {errors?.password && (
                    <p className="text-xs text-red-600 inline-block">
                      {errors.password.message} {/* Error message here */}
                    </p>
                  )}
                </div>

                {/* Login Error */}
                {loginError && (
                  <p className="text-sm text-red-500 mb-4">{loginError}</p>
                )}

                {/* Submit Button and Links */}
                <div className="space-y-12">
                  {/* Link to Teacher Login */}
                  <div className="flex justify-between items-center">
                    <Link
                      to="/TeacherLogin"
                      className="text-sm font-semibold text-green-600 hover:underline"
                    >
                      Login as a Teacher
                    </Link>

                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded transition-colors duration-200"
                    >
                      Login
                    </button>
                  </div>

                  {/* Forget Password link */}
                  <div className="text-right">
                    <Link
                      to="/forgetPassword"
                      className="text-xs font-semibold text-green-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* Testimonial Section */}
            <ReviewsSlider />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
