import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Loader2 } from "lucide-react";

const Pages = ({ onCreated, courseId, type, typeId }) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [pageData, setPageData] = useState({
    title: "",
    description: "",
    image: null,
    files: [],
  });

  const handleCreatePage = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    const formData = new FormData();
    formData.append("title", pageData.title);
    formData.append("description", pageData.description);
    if (pageData.image) formData.append("image", pageData.image);
    pageData.files.forEach((file) => formData.append("files", file));

    try {
      await axiosInstance.post(
        `/pages/createpage/${courseId}/${type}/${typeId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Page created successfully!");
      setOpen(false);
      setPageData({ title: "", description: "", image: null, files: [] });
      if (onCreated) onCreated();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create page");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-green-600 text-white hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500"
            aria-label="Open create new page dialog"
          >
            + Create Page
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg" aria-describedby="create-page-description">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <p id="create-page-description" className="sr-only">
              Form to create a new informational page with title, description, and optional file uploads.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreatePage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Title <span className="text-red-600">*</span></Label>
              <Input
                id="page-title"
                type="text"
                required
                value={pageData.title}
                onChange={(e) =>
                  setPageData({ ...pageData, title: e.target.value })
                }
                placeholder="Enter page title"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-desc">Description <span className="text-red-600">*</span></Label>
              <Textarea
                id="page-desc"
                required
                value={pageData.description}
                onChange={(e) =>
                  setPageData({ ...pageData, description: e.target.value })
                }
                placeholder="Enter page details"
                className="min-h-[100px]"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-image">Upload Image <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                id="page-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPageData({ ...pageData, image: e.target.files[0] })
                }
                aria-label="Upload an image for the page"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-files">Upload Files <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                id="page-files"
                type="file"
                multiple
                onChange={(e) =>
                  setPageData({
                    ...pageData,
                    files: Array.from(e.target.files),
                  })
                }
                aria-label="Upload documents for the page"
              />
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700 min-w-[120px]"
                disabled={isCreating}
              >
                {isCreating ? (
                  <span className="flex items-center gap-2" role="status" aria-live="polite">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Creating...
                  </span>
                ) : (
                  "Create Page"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Loading Overlay for Screen Readers */}
      {isCreating && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center"
          role="alert"
          aria-busy="true"
          aria-live="assertive"
        >
          <div className="bg-white rounded-lg shadow-xl px-8 py-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600 mb-4" aria-hidden="true" />
            <p className="text-lg font-semibold text-gray-900">
              Creating Page 
            </p>
            <p className="text-sm text-gray-600">Please wait while the page is being created...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Pages;