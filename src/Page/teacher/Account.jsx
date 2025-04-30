"use client"

import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { axiosInstance } from "@/lib/AxiosInstance";

export default function TeacherAccount() {
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
    Bio: "",
    profileImg: "",
    // documents: [], // Array to store uploaded PDFs
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
        Bio: user.Bio || "",
        profileImg: user.profileImg || "",
        // documents: user.documents || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name || id]: value,
    }));
  };

  // Handle file upload for PDF fields
  // const handleFileChange = (e, index) => {
  //   const files = Array.from(e.target.files);
  //   const validFiles = files.filter((file) => file.type === "application/pdf");

  //   if (validFiles.length > 0) {
  //     const newDocuments = [...userData.documents];
  //     newDocuments[index] = validFiles[0]; // Only allow one file per field
  //     setUserData((prev) => ({
  //       ...prev,
  //       documents: newDocuments,
  //     }));
  //   }
  // };

  // Add a new file upload field
  // const addFileField = () => {
  //   if (userData.documents.length < 10) {
  //     setUserData((prev) => ({
  //       ...prev,
  //       documents: [...prev.documents, ""], // Add an empty field for PDF
  //     }));
  //   } else {
  //     alert("You can only add up to 10 PDF files.");
  //   }
  // };

  // // Remove a file upload field
  // const removeFileField = (index) => {
  //   const newDocuments = [...userData.documents];
  //   newDocuments.splice(index, 1); // Remove the PDF at the specified index
  //   setUserData((prev) => ({
  //     ...prev,
  //     documents: newDocuments,
  //   }));
  // };

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
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8 max-w-5xl">
      <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>

      {/* Profile Image */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Profile Image</h3>
        <div className="flex items-center gap-4">
          {userData.profileImg && (
            <img
              src={userData.profileImg}
              alt="Profile Image"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <Label htmlFor="profileImg" className="block">Upload New Image</Label>
            <Input
              id="profileImg"
              type="file"
              onChange={(e) => handleChange(e)}
              accept="image/*"
              className="mt-2"
            />
          </div>
        </div>
      </section>

      {/* Name Fields */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={userData.firstName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" value={userData.middleName} onChange={handleChange} />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={userData.lastName} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* Bio Field */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Bio</h3>
        <div className="space-y-2">
          <Label htmlFor="Bio">Tell us about yourself</Label>
          <Textarea
            id="Bio"
            rows={5}
            value={userData.Bio}
            onChange={handleChange}
            placeholder="Write a short Bio..."
          />
        </div>
      </section>
      {/* Pronouns and Gender */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Identity Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pronouns */}
          <div className="space-y-2">
            <Label>Preferred Pronouns</Label>
            <div className="space-y-2">
              {["he/him", "she/her", "they/them", "others"].map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="pronoun"
                    value={p}
                    checked={userData.pronoun === p}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <label htmlFor={`pronoun-${p}`} className="text-sm capitalize">{p}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender Identity</Label>
            <div className="space-y-2">
              {["male", "female", "non-binary", "other"].map((g) => (
                <div key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={userData.gender === g}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <label htmlFor={`gender-${g}`} className="text-sm capitalize">{g}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={userData.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={userData.phone} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homeAddress">Home Address</Label>
            <Textarea id="homeAddress" rows={3} value={userData.homeAddress} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mailingAddress">Mailing Address</Label>
            <Textarea id="mailingAddress" rows={3} value={userData.mailingAddress} onChange={handleChange} />
          </div>
        </div>
      </section>



      {/* Document Upload Fields */}
      {/* <section className="space-y-6">
        <h3 className="text-lg font-semibold">Upload PDFs (1 to 10 files)</h3>
        {userData.documents.map((_, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, index)}
            />
            <button
              type="button"
              onClick={() => removeFileField(index)}
              className="text-red-600 hover:text-red-800"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        {userData.documents.length < 10 && (
          <button
            type="button"
            onClick={addFileField}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaPlus className="mr-2" /> Add Another PDF
          </button>
        )}
      </section> */}

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
