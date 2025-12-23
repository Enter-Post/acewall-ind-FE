import React, { useState, useEffect, useRef } from "react";
import { X, Image, Video } from "lucide-react";
import gsap from "gsap";
import { axiosInstance } from "@/lib/AxiosInstance";
import JoditEditor from "jodit-react";

const MODAL_ID = "create-post-modal";
const EDITOR_ID = "post-editor";

const CreatePostModal = ({ onClose, onCreate }) => {
  // We use a ref to hold the Jodit instance/configuration
  const editor = useRef(null); 
  
  // State to hold the final content for submission
  const [content, setContent] = useState(""); 
  
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  
  // ADA Compliance: Configuration for Jodit
  const config = React.useMemo(() => ({
      placeholder: "What's on your mind?",
      // Ensure the editor doesn't re-render on every change.
      // We manage the 'content' state through the handleUpdate function instead of 'value' prop.
      // This config is stable and won't cause re-renders.
  }), []);


  useEffect(() => {
    const modalElement = modalRef.current;
    
    // ... [Original GSAP animation and media cleanup logic remains here] ...

    if (modalElement) {
        // GSAP Animation
        gsap.fromTo(
          modalElement,
          { y: 12, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" }
        );
        
        modalElement.focus();
    }
    
    return () => {
      if (image) URL.revokeObjectURL(image);
      if (video) URL.revokeObjectURL(video);
    };
  }, []);
  
  // New handler function to update the content state without forcing a parent re-render
  // Jodit calls this function directly, and the state update happens after rendering.
  const handleEditorChange = (newContent) => {
      setContent(newContent);
  };


  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image) URL.revokeObjectURL(image);
    setImage(file);
    setVideo(null);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (video) URL.revokeObjectURL(video);
    setVideo(file);
    setImage(null);
  };

  const handleSubmit = async () => {
    // Check content state, which is updated by the editor's change handler
    const isTextEmpty = !content.trim() || content.replace(/<[^>]*>/g, '').trim() === '';

    if (isTextEmpty && !image && !video) {
      alert("Add some content first!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", content); // Use 'content' state here
      if (image) formData.append("assets", image);
      if (video) formData.append("assets", video);

      const response = await axiosInstance.post("posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        onCreate && onCreate(response.data.post || {});
        alert("Post created successfully!");
        setContent(""); // Reset content
        setImage(null);
        setVideo(null);
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ADA Compliance: Determine if text content is empty for validation/button state
  const isTextEmpty = !content.trim() || content.replace(/<[^>]*>/g, '').trim() === '';
  const isSubmitDisabled = loading || (isTextEmpty && !image && !video);


  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
      tabIndex="-1" 
    >
      <div
        ref={modalRef}
        id={MODAL_ID}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-5 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
        tabIndex={0}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Close create post dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <h2 className="text-lg font-semibold mb-3" id="create-post-title">Create Post</h2>

        {/* 📝 Post Text Editor - FIX APPLIED HERE */}
        <div className="mb-3">
          <JoditEditor
            ref={editor} // Use a ref to hold the Jodit instance
            value={content} // Pass content state
            config={config} // Pass memoized config
            onBlur={newContent => setContent(newContent)} // Optional: Update state on blur
            onChange={handleEditorChange} // FIX: Use a dedicated handler that updates state directly
            aria-label="Post content editor"
            id={EDITOR_ID}
          />
        </div>

        {/* 📸 Media Preview */}
        {(image || video) && (
          <div className="mt-2" role="region" aria-label="Media preview">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt={`Image preview: ${image.name}`}
                className="rounded-lg max-h-[200px] object-cover mb-2 w-full"
              />
            )}
            {video && (
              <video
                controls
                className="rounded-lg max-h-[200px] object-cover mb-2 w-full"
                aria-label={`Video preview: ${video.name}`}
              >
                <source src={URL.createObjectURL(video)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* 📂 Upload Buttons */}
        <div className="flex items-center gap-4 mt-3 text-gray-700" role="group" aria-label="Media upload controls">
          <label 
            htmlFor="image-upload-input" 
            className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
          >
            <Image className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload-input" 
              onChange={handleImageUpload}
              aria-label="Upload photo"
            />
          </label>

          <label 
            htmlFor="video-upload-input" 
            className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
          >
            <Video className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="video-upload-input" 
              onChange={handleVideoUpload}
              aria-label="Upload video"
            />
          </label>
        </div>

        {/* ✅ Post Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-60"
          aria-live="polite"
          aria-label={loading ? "Posting content" : "Post content"}
          role="status"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;