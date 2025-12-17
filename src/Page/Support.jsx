import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/AxiosInstance";
import { Loader } from "lucide-react"; // Import Loader for visual feedback

const Support = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axiosInstance.post("/support/send", formData);
      setMessage(res.data.message);
      setFormData({ fullName: "", email: "", feedback: "" });
      // Log for developer use
      console.log(res.data.message);
      
    } catch (error) {
      // Use role="alert" in the JSX for error messages
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" role="main" aria-labelledby="support-heading">
      <div className="bg-white dark:bg-muted rounded-2xl p-8 space-y-8">
        <div className="text-center">
          {/* H2 for the main section title */}
          <h2 className="text-3xl font-extrabold text-foreground" id="support-heading">Contact Support</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            We're here to help. Please fill out the form and our team will get back to you soon.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} aria-label="Support and Feedback Form">
          
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name <span aria-hidden="true">*</span></Label>
            <Input 
              name="fullName" 
              id="fullName" // Essential: Linked to Label
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              aria-required="true"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email <span aria-hidden="true">*</span></Label>
            <Input 
              type="email" 
              name="email" 
              id="email" // Essential: Linked to Label
              value={formData.email} 
              onChange={handleChange} 
              required 
              aria-required="true"
            />
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback <span aria-hidden="true">*</span></Label>
            <Textarea 
              name="feedback" 
              id="feedback" // Essential: Linked to Label
              value={formData.feedback} 
              onChange={handleChange} 
              required 
              aria-required="true"
            />
          </div>

          {/* Submission Status/Message */}
          {message && (
            <p 
              className={`text-sm text-center ${message.includes("error") || message.includes("wrong") ? "text-red-600" : "text-green-600"}`}
              role="status" // Use role="status" for announcements
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full"
            aria-live="polite" // Announce the loading state change
            aria-label={loading ? "Sending support message" : "Submit support request"}
          >
            {loading ? (
                <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                    Sending...
                </>
            ) : (
                "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Support;