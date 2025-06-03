"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  pronoun: z.string().optional(),
  gender: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  homeAddress: z.string().min(1, "Home address is required"),
  mailingAddress: z.string().optional(),
});

const EditGeneralInfo = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      pronoun: "",
      gender: "",
      email: "",
      phone: "",
      homeAddress: "",
      mailingAddress: "",
    },
  });

  // Populate form with user data when available
  useEffect(() => {
    setValue("firstName", user.firstName || "");
    setValue("middleName", user.middleName || "");
    setValue("lastName", user.lastName || "");
    setValue("pronoun", user.pronoun || "");
    setValue("gender", user.gender || "");
    setValue("email", user.email || "");
    setValue("phone", user.phone || "");
    setValue("homeAddress", user.homeAddress || "");
    setValue("mailingAddress", user.mailingAddress || "");
  }, [user, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("pronoun", data.pronoun);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("homeAddress", data.homeAddress);
    formData.append("mailingAddress", data.mailingAddress);

    try {
      const response = await axiosInstance.put(`/auth/updateuser`, formData);
      toast.success(response.data.message);
      navigate(`/${user.role}/account`)
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Account Information
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Personal Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-sm font-medium">
                  Middle Name
                </Label>
                <Input
                  id="middleName"
                  placeholder="Enter your middle name"
                  {...register("middleName")}
                />
              </div>

              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Pronouns & Gender Selection */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">Identity Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Pronouns */}
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Preferred Pronoun
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {["He/Him", "She/Her", "They/Them", "Others"].map(
                    (pronoun, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pronoun-${pronoun.toLowerCase()}`}
                          value={pronoun.toLowerCase()}
                          {...register("pronoun")}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <label
                          htmlFor={`pronoun-${pronoun.toLowerCase()}`}
                          className="text-sm text-gray-900 dark:text-white"
                        >
                          {pronoun}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Gender Identity
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {["Male", "Female", "Non-binary", "Other"].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`gender-${gender.toLowerCase()}`}
                        value={gender.toLowerCase()}
                        {...register("gender")}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <label
                        htmlFor={`gender-${gender.toLowerCase()}`}
                        className="text-sm text-gray-900 dark:text-white"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Address Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="homeAddress" className="text-sm font-medium">
                  Home Address
                </Label>
                <Textarea
                  id="homeAddress"
                  placeholder="Enter your home address"
                  {...register("homeAddress")}
                />
                {errors.homeAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.homeAddress.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mailingAddress" className="text-sm font-medium">
                  Mailing Address (Optional)
                </Label>
                <Textarea
                  id="mailingAddress"
                  placeholder="Enter your mailing address"
                  {...register("mailingAddress")}
                />
              </div>
            </div>
          </section>
          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGeneralInfo;
