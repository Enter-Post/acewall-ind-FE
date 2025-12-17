"use client";

import { useEffect, useState } from "react";
import { Loader, Pen, Trash2 } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.png";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const maxSize = 5 * 1024 * 1024;
const MAX_DOCS = 4;

const Account = () => {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);

  const fetchUser = () => {
    axiosInstance
      .get("auth/getUserInfo")
      .then((res) => setUser(res.data.user))
      .catch(console.log);
  };

  useEffect(() => {
    fetchUser();
  }, [loading]);

  const handleImgUpload = async () => {
    if (!profileImg || !allowedTypes.includes(profileImg.type) || profileImg.size > maxSize) {
      toast.error("Invalid image. Use JPG/PNG/WebP under 5MB.");
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
      fetchUser();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoc = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    setDocsLoading(true);
    try {
      await axiosInstance.delete(`/documents/${docId}`);
      toast.success("Document deleted successfully");
      fetchUser();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setDocsLoading(false);
    }
  };

  const displayField = (label, value) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-900 dark:text-white">{value || "—"}</p>
    </div>
  );

  const docCount = user?.documents?.length || 0;
  const isUploadDisabled = docCount >= MAX_DOCS;

  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
        {user?.role === "teacher" && user?.isVarified !== undefined && (
          <span
            className={`text-sm px-3 py-1 rounded-full ${user.isVarified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            aria-label={user.isVarified ? "Verified" : "Not Verified"}
          >
            {user.isVarified ? "Verified" : "Not Verified"}
          </span>
        )}
      </div>

      {/* Profile Image Section */}
      <section aria-labelledby="profile-image-section" className="space-y-4">
        <h3 id="profile-image-section" className="text-lg font-semibold text-gray-800">Profile Image</h3>
        <div className="relative w-32 h-32 border border-gray-300 rounded-full overflow-hidden">
          <img
            src={profileImg ? URL.createObjectURL(profileImg) : user?.profileImg?.url ?? avatar}
            alt="User profile"
            className="w-full h-full object-cover rounded-full shadow-sm"
          />
          <label
            tabIndex={0}
            htmlFor="profile-img-input"
            className="absolute bottom-5 right-4 bg-white border rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Upload Profile Image"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("profile-img-input").click();
              }
            }}
          >
            <Pen className="w-4 h-4 text-gray-600" />
            <input
              type="file"
              id="profile-img-input"
              className="hidden"
              accept={allowedTypes.join(",")}
              onChange={(e) => setProfileImg(e.target.files[0])}
            />
          </label>
        </div>
        {profileImg && (
          <div className="flex gap-2">
            <Button
              onClick={handleImgUpload}
              className="bg-green-500 text-white hover:bg-green-600"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin w-4 h-4 mr-2" aria-label="Uploading" /> : "Save Changes"}
            </Button>
          </div>
        )}
      </section>

      {/* Edit Buttons */}
      <section className="flex gap-2 justify-end">
        <Link to={`/${user.role}/account/editGeneralInfo`}>
          <Button className="bg-green-500 text-white hover:bg-green-600">Edit Info</Button>
        </Link>
        <Link to={`/${user.role}/account/editCredentials`}>
          <Button className="bg-green-500 text-white hover:bg-green-600">Edit Credentials</Button>
        </Link>
      </section>

      {/* Personal Info */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayField("First Name", user?.firstName)}
          {displayField("Middle Name", user?.middleName)}
          {displayField("Last Name", user?.lastName)}
        </div>
      </section>

      {/* Identity Info */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Identity Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Preferred Pronouns", user?.pronoun)}
          {displayField("Gender Identity", user?.gender)}
        </div>
      </section>

      {/* Contact Info */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Email Address", user?.email)}
          {displayField("Phone Number", user?.phone)}
        </div>
      </section>

      {/* Address Info */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayField("Home Address", user?.homeAddress)}
          {displayField("Mailing Address", user?.mailingAddress)}
        </div>
      </section>

      {/* Teacher Documents */}
      {user?.role === "teacher" && (
        <section aria-labelledby="teacher-documents-section" className="space-y-4">
          <h3 id="teacher-documents-section" className="text-lg font-semibold">Teacher Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.documents?.map((doc) => (
              <div
                key={doc._id}
                tabIndex={0}
                className="flex items-center justify-between p-4 border rounded shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`Document: ${doc.title}. Press Enter or Space to view. Delete with Delete key`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.open(doc.url, "_blank");
                  } else if (e.key === "Delete") {
                    handleDeleteDoc(doc._id);
                  }
                }}
              >
                <span className="truncate">{doc.title}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  aria-label={`Delete document ${doc.title}`}
                  onClick={() => handleDeleteDoc(doc._id)}
                  disabled={docsLoading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {user.documents?.length < MAX_DOCS && (
              <label
                tabIndex={0}
                htmlFor="doc-upload-input"
                className="flex items-center justify-center p-4 border border-dashed rounded shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Upload new document"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    document.getElementById("doc-upload-input").click();
                  }
                }}
              >
                + Add Document
                <input
                  id="doc-upload-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    // handle document upload logic here
                  }}
                />
              </label>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Account;
