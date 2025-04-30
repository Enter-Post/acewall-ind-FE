import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/Context/GlobalProvider';
import { axiosInstance } from '@/lib/AxiosInstance';

const Account = () => {
  const { user } = useContext(GlobalContext);

  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    pronoun: "",
    gender: "",
    email: "",
    phone: "",
    homeAddress: "",
    mailingAddress: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        pronoun: user.pronouns || "",
        gender: user.gender || "",
        email: user.email || "",
        phone: user.phone || "",
        homeAddress: user.homeAddress || "",
        mailingAddress: user.mailingAddress || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name || id]: value,
    }));
  };


  const handleSave = async () => {
    // Log the entire user object to ensure it's available
    console.log("User object:", user);

    // Check if user._id exists before proceeding
    if (user && user._id) {
      try {
        // Use the correct API URL
        const response = await axiosInstance.put(`/auth/updateuser/${user._id}`, userData);

        // Log the user ID for debugging
        console.log("User ID:", user._id);

        // Show success message
        alert("Profile updated successfully!");
        console.log("Server response:", response.data);
      } catch (error) {
        // Handle error
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    } else {
      console.error("User ID not found");
      alert("User ID is not available. Please try again later.");
    }
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={userData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName" className="text-sm font-medium">Middle Name</Label>
              <Input
                id="middleName"
                placeholder="Enter your middle name"
                value={userData.middleName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={userData.lastName}
                onChange={handleChange}
              />
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
                Preferred Pronouns
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {["He/Him", "She/Her", "They/Them", "Others"].map((pronoun) => (
                  <div key={pronoun} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`pronoun-${pronoun.toLowerCase()}`}
                      name="pronoun"
                      value={pronoun.toLowerCase()}
                      checked={userData.pronoun === pronoun.toLowerCase()}
                      onChange={handleChange}
                      className="w-4 h-4  accent-blue-600"
                    />
                    <label
                      htmlFor={`pronoun-${pronoun.toLowerCase()}`}
                      className="text-sm text-gray-900 dark:text-white"
                    >
                      {pronoun}
                    </label>
                  </div>
                ))}
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
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={userData.gender === gender.toLowerCase()}
                      onChange={handleChange}
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

        {/* Contact Information */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Address Information */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeAddress" className="text-sm font-medium">Home Address</Label>
              <Textarea
                id="homeAddress"
                placeholder="Enter your home address"
                rows={3}
                value={userData.homeAddress}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mailingAddress" className="text-sm font-medium">Mailing Address</Label>
              <Textarea
                id="mailingAddress"
                placeholder="Enter your mailing address (if different from home address)"
                rows={3}
                value={userData.mailingAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
