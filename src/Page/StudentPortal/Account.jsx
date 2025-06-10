"use client";

import { use, useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Loader, Pen } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.png";

const Account = () => {
  const [user, setUser] = useState({});
  const [profileImg, setprofileImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUserInfo = async () => {
      try {
        const res = await axiosInstance.get("auth/getUserInfo");
        console.log(res);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    setUserInfo();
  }, [loading]);
  const handleImg = async () => {
    if (!profileImg) return;

    // Limit file size to 5MB
    if (profileImg.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      profileImg(null);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("profileImg", profileImg);

    await axiosInstance
      .put(`auth/updateProfileImg`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        setprofileImg(null);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Something went wrong.");
        setprofileImg(null);
      });
  };

  const displayField = (label, value) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-900 dark:text-white">{value || "—"}</p>
    </div>
  );

  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Account Information
        </h2>
      </div>
      <section className="space-y-4 w-full">
        <h3 className="text-lg font-semibold text-gray-800">Profile Image</h3>

        <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 border border-gray-300 rounded-full ">
          <img
            src={
              profileImg
                ? URL.createObjectURL(profileImg)
                : user?.profileImg?.url ?? avatar
            }
            alt={user?.name}
            className="w-full h-full rounded-full object-cover shadow-sm"
          />

          <label className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-100 transition">
            <Pen className="w-4 h-4 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setprofileImg(e.target.files[0])}
            />
          </label>
        </div>

        {profileImg && (
          <div className="flex gap-2">
            <Button
              onClick={handleImg}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader className="animate-spin mr-2" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              onClick={() => {
                setprofileImg(null);
              }}
              variant="outline"
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        )}
      </section>
      <section className="flex gap-2 justify-end">
        <Link to={`/${user.role}/account/editGeneralInfo`}>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Edit general Info
          </Button>
        </Link>
        <Link to={`/${user.role}/account/editCredentials`}>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Edit Credencials
          </Button>
        </Link>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayField("First Name", user?.firstName)}
          {displayField("Middle Name", user?.middleName)}
          {displayField("Last Name", user?.lastName)}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Identity Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Preferred Pronouns", user?.pronoun)}
          {displayField("Gender Identity", user?.gender)}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Email Address", user?.email)}
          {displayField("Phone Number", user?.phone)}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Home Address", user?.homeAddress)}
          {displayField("Mailing Address", user?.mailingAddress)}
        </div>
      </section>
    </div>
  );
};

export default Account;
