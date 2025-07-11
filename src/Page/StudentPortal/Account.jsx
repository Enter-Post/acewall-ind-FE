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

const badgeClass = (status) => ({
  verified: "bg-green-100 text-green-800",
  not_verified: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
}[status]);

const Account = () => {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, doc: null });
  const [deletingId, setDeletingId] = useState(null);

  const fetchUser = () => {
    axiosInstance
      .get("auth/getUserInfo")
      .then((res) => setUser(res.data.user))
      .catch(console.log);
  };

  useEffect(() => {
    fetchUser();
  }, [loading]);

  const handleImg = async () => {
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
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    const doc = deleteModal.doc;
    if (!doc) return;
    setDeletingId(doc._id);

    try {
      const res = await axiosInstance.delete(`/auth/teacher/document/${doc._id}`);
      toast.success(res.data.message);
      setUser((prev) => ({ ...prev, documents: res.data.documents }));
      setDeleteModal({ show: false, doc: null });
      setLoading(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
        {user?.role === "teacher" && user?.isVarified !== undefined && (
          <span
            className={`text-sm px-3 py-1 rounded-full ${user.isVarified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
          >
            {user.isVarified ? "Verified" : "Not Verified"}
          </span>
        )}
      </div>

      {/* Profile Image */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Profile Image</h3>

        <div className="relative w-32 h-32">
  {/* Profile Image */}
  <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
    <img
      src={
        profileImg
          ? URL.createObjectURL(profileImg)
          : user?.profileImg?.url ?? avatar
      }
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Edit Icon - NOT inside the clipped circle anymore */}
  <label className="absolute bottom-0 right-0 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition">
    <Pen className="w-4 h-4 text-gray-600" />
    <input
      type="file"
      className="hidden"
      accept={allowedTypes.join(",")}
      onChange={(e) => setProfileImg(e.target.files[0])}
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
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button onClick={() => setProfileImg(null)} variant="outline">
              Cancel
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
          <Button className="bg-green-500 text-white hover:bg-green-600">Edit Login Details</Button>
        </Link>
      </section>

      {/* Info Sections */}
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

      {/* Teacher Documents */}
      {user?.role === "teacher" && (
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Uploaded Documents</h3>
          <p className="text-sm text-gray-600">{docCount} of {MAX_DOCS} documents uploaded</p>

          {/* Upload Form - only if not verified */}
          {!user?.isVarified && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                const file = e.target.document.files[0];
                const name = e.target.name.value;

                if (!file || !name) return toast.error("Provide name and file");

                formData.append("document", file);
                formData.append("name", name);
                setUploading(true);

                try {
                  const res = await axiosInstance.post("/auth/uploadDocument", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  toast.success(res.data.message);
                  setUser((prev) => ({ ...prev, documents: res.data.documents }));
                  setLoading(true);
                  e.target.reset();
                } catch (err) {
                  toast.error(err?.response?.data?.message || "Upload failed");
                } finally {
                  setUploading(false);
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Document Name" className="border p-2 rounded" required disabled={isUploadDisabled} />
                <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png" className="border p-2 rounded" required disabled={isUploadDisabled} />
              </div>
              <Button
                type="submit"
                disabled={uploading || isUploadDisabled}
                className={`text-white ${isUploadDisabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
              >
                {uploading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : "Upload Document"}
              </Button>
            </form>
          )}

          <div className="space-y-2">
            {user?.documents?.length > 0 ? user.documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="font-medium">{doc.name}</span>
                  {doc.url ? (
                    <a href={doc.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                  ) : <span className="text-gray-400">No URL</span>}
                  {doc.verificationStatus && (
                    <span className={`text-xs px-2 py-1 rounded-full ${badgeClass(doc.verificationStatus)}`}>
                      {doc.verificationStatus.replace("_", " ")}
                    </span>
                  )}
                </div>

                {/* Delete button - only if not verified */}
                {!user?.isVarified && (
                  <Button size="sm" variant="destructive" onClick={() => setDeleteModal({ show: true, doc })}>
                    {deletingId === doc._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            )) : <p className="text-gray-500">No documents uploaded yet.</p>}
          </div>
        </section>
      )}

      {/* Delete Confirmation Modal - only if not verified */}
      {!user?.isVarified && deleteModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h2 className="text-lg font-semibold">Delete Document</h2>
            <p>Are you sure you want to delete <strong>{deleteModal.doc.name}</strong>?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteModal({ show: false, doc: null })}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={deletingId === deleteModal.doc._id}>
                {deletingId === deleteModal.doc._id ? <Loader className="w-4 h-4 animate-spin" /> : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
