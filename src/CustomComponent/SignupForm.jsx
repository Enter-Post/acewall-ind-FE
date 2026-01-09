import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeClosed } from "lucide-react";

import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number is required"),
  smsConsent: z.boolean().default(false),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Requires one uppercase")
    .regex(/[a-z]/, "Requires one lowercase")
    .regex(/\d/, "Requires one number")
    .regex(/[#?!@$%^&*-]/, "Requires one special character")
    .regex(/^\S*$/, "No spaces allowed"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Agreement is required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignupForm = () => {
  const navigate = useNavigate();
  const { signUpdata, setAuthLoading, Authloading } = useContext(GlobalContext);

  // Password Visibility States
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      smsConsent: false,
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors }, control } = methods;
  const passwordVal = watch("password", "");

  useEffect(() => {
    if (!signUpdata?.email && !signUpdata?.role) {
      navigate("/");
    }
  }, [signUpdata, navigate]);

  const onSubmit = async (data) => {
    setAuthLoading(true);
    try {
      const res = await axiosInstance.post("auth/register", { ...signUpdata, ...data });
      toast.success(res.data.message);
      navigate(`/verifyOTP/${signUpdata.email}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const getRuleClass = (regex) => 
    `text-xs font-medium ${regex.test(passwordVal) ? "text-green-600" : "text-red-500"}`;

  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-fixed">
      <div className="bg-black/60 backdrop-blur-sm min-h-screen py-10 flex items-center">
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create your account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>First Name <span className="text-red-600">*</span></Label>
                  <Input {...register("firstName")} placeholder="John" className="mt-1" />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label>Middle Name</Label>
                  <Input {...register("middleName")} placeholder="M." className="mt-1" />
                </div>
                <div>
                  <Label>Last Name <span className="text-red-600">*</span></Label>
                  <Input {...register("lastName")} placeholder="Doe" className="mt-1" />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label>Phone Number <span className="text-red-600">*</span></Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      country={"us"}
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      inputClass="!w-full !h-10 !rounded-md !border-gray-300"
                    />
                  )}
                />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              </div>

              {/* SMS Consent - Fixed Left Alignment */}
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <input
                  type="checkbox"
                  id="smsConsent"
                  {...register("smsConsent")}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="smsConsent" className="text-[11px] leading-tight text-gray-600 dark:text-gray-300">
                  I agree to receive SMS notifications from Acewall Scholars (codes, academic updates, etc). 
                  Msg/data rates apply. Reply STOP to opt-out.
                </label>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Label>Password *</Label>
                  <Input 
                    type={showPass ? "text" : "password"} 
                    {...register("password")} 
                    className="mt-1 pr-10" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-9 text-gray-400"
                  >
                    {showPass ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <Label>Confirm Password *</Label>
                  <Input 
                    type={showConfirm ? "text" : "password"} 
                    {...register("confirmPassword")} 
                    className="mt-1 pr-10" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-9 text-gray-400"
                  >
                    {showConfirm ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}

              {/* Password Validation List */}
              <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900/30">
                <p className={getRuleClass(/.{8,}/)}>• 8+ Characters</p>
                <p className={getRuleClass(/[A-Z]/)}>• Uppercase</p>
                <p className={getRuleClass(/[a-z]/)}>• Lowercase</p>
                <p className={getRuleClass(/\d/)}>• One Number</p>
                <p className={getRuleClass(/[#?!@$%^&*-]/)}>• Special Char</p>
                <p className={getRuleClass(/^\S*$/)}>• No Spaces</p>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  {...register("agreeToTerms")}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <Label htmlFor="agreeToTerms" className="text-xs">
                  I agree to the <a href="#" className="text-blue-600 underline">Terms</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>}

              <button
                type="submit"
                disabled={Authloading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-400 shadow-md"
              >
                {Authloading ? "Registering..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;