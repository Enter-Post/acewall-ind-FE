import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import AnnouncementList from "../../CustomComponent/teacher/Announcement/AnnouncementList";
import AnnouncementDialog from "../../CustomComponent/teacher/Announcement/AnnouncementDialog";
import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { Loader } from "lucide-react";

export default function TeacherAnnouncement() {
  const { user } = useContext(GlobalContext);

  const [showNewDialog, setShowNewDialog] = useState(false);
  const [currentAnnouncements, setCurrentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/announcements/getbyteacher/${user._id}`);
      const rawAnnouncements = res.data.announcements;

      const formatted = rawAnnouncements.map((item) => ({
        _id: item._id,
        date: new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        title: item.title,
        message: item.message,
      }));

      setCurrentAnnouncements(formatted);
    } catch (error) {
      console.error(
        "Error fetching teacher announcements:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAnnouncements();
  }, [user?._id]);

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncementToDelete(announcementId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAnnouncement = async () => {
    if (!announcementToDelete) return;
    try {
      await axiosInstance.delete(`/announcements/${announcementToDelete}`);
      setCurrentAnnouncements((prev) =>
        prev.filter((a) => a._id !== announcementToDelete)
      );
    } catch (error) {
      console.error("Failed to delete announcement:", error.response?.data || error.message);
    } finally {
      setShowDeleteDialog(false);
      setAnnouncementToDelete(null);
    }
  };

  const handleAnnouncementCreated = () => {
    fetchAnnouncements();
    setShowNewDialog(false);
  };

  return (
    <main className="mx-auto p-3 md:p-0" role="main" aria-labelledby="announcements-heading">
      <section className="flex flex-col mb-2">
        <h1
          id="announcements-heading"
          className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg"
        >
          Announcements
        </h1>

        <div className="flex justify-end">
          <Button
            className="bg-green-500 hover:bg-green-600 mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400"
            onClick={() => setShowNewDialog(true)}
            aria-label="Add new announcement"
          >
            + Add New
          </Button>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-10" role="status" aria-live="polite">
          <Loader className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading announcements...</span>
        </div>
      ) : currentAnnouncements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 text-lg">No announcements found</p>
        </div>
      ) : (
        <AnnouncementList
          title="Announcements"
          announcements={currentAnnouncements}
          onDelete={handleDeleteAnnouncement}
        />
      )}

      {/* Add/Edit Announcement Dialog */}
      <AnnouncementDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onCreated={handleAnnouncementCreated}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        aria-labelledby="delete-announcement-title"
        role="alertdialog"
        aria-modal="true"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle id="delete-announcement-title">Delete Announcement</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this announcement? This action cannot be undone.
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400"
              onClick={confirmDeleteAnnouncement}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
