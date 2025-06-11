"use client";

import { useEffect, useState } from "react";
import { Loader, Pen } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.png";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const maxSize = 5 * 1024 * 1024; // 5MB

const Account = () => {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUserInfo = async () => {
      try {
        const res = await axiosInstance.get("auth/getUserInfo");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    setUserInfo();
  }, [loading]);

  const handleImg = async () => {
    if (!profileImg) return;

    if (!allowedTypes.includes(profileImg.type)) {
      toast.error("Only JPG, JPEG, PNG, or WEBP images are allowed.");
      setProfileImg(null);
      return;
    }

    if (profileImg.size > maxSize) {
      toast.error("Image size must be less than 5MB.");
      setProfileImg(null);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("profileImg", profileImg);

    try {
      const res = await axiosInstance.put("auth/updateProfileImg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      setProfileImg(null);
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
      setProfileImg(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, or WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setProfileImg(file);
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
        <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
      </div>

      <section className="space-y-4 w-full">
        <h3 className="text-lg font-semibold text-gray-800">Profile Image</h3>

        <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 border border-gray-300 rounded-full overflow-hidden">
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
              accept="image/jpeg, image/png, image/webp, image/jpg"
              className="hidden"
              onChange={handleFileChange}
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
              onClick={() => setProfileImg(null)}
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
            Edit Credentials
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
