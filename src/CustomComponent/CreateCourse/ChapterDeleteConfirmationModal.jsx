import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";
import LoadingLoader from "../LoadingLoader";
import { Loader } from "lucide-react";

export function ChapterDeleteConfirmationModal({ chapterID, fetchChapters }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteChapter = () => {
    setLoading(true);
    axiosInstance
      .delete(`chapter/${chapterID}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        fetchChapters();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete chapter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteChapter}>
            {loading ? <Loader className="animate-spin" /> : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
