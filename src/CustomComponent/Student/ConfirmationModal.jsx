import { useState, useContext } from "react";
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
import { CheckCircle2, Lock, Loader2 } from "lucide-react"; // Added Loader2
import { axiosInstance } from "@/lib/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalContext } from "@/Context/GlobalProvider";

export default function PurchaseConfirmationModal({
  courseID,
  coursePrice,
  studentID,
  isEnrolled,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get both user AND Authloading from your GlobalContext
  const { user, Authloading } = useContext(GlobalContext);

  // Derive authentication status
  const isAuthenticated = !!user; 

  const handleConfirm = async () => {
    setOpen(false);

    if (coursePrice === 0) {
      try {
        const res = await axiosInstance.post(`/enrollment/create/${courseID}`);
        toast.success(res.data.message || "Enrolled successfully!");
        navigate("/student/mycourses");
      } catch (err) {
        toast.error(err?.response?.data?.error || "Enrollment failed");
      }
    } else {
      try {
        const res = await axiosInstance.post("/stripe/create-checkout-session", {
          courseId: courseID,
          studentId: studentID,
        });

        if (res.data?.url) {
          window.location.href = res.data.url;
        } else {
          toast.error("Stripe session failed.");
        }
      } catch (err) {
        toast.error("Payment initiation failed.");
      }
    }
  };

  const handleAction = (e) => {
    if (Authloading) return; // Do nothing if still checking auth
    
    if (!isAuthenticated) {
      e.preventDefault();
      toast.info("Please login to purchase this course");
      navigate("/login");
    }
  };

  return (
    <Dialog open={open} onOpenChange={isAuthenticated ? setOpen : undefined}>
      <DialogTrigger asChild>
        <Button
          className={`w-full text-white text-sm py-2 rounded-xl transition-all duration-300 ${
            Authloading 
              ? "bg-slate-400 cursor-not-allowed" 
              : !isAuthenticated 
                ? "bg-slate-800 hover:bg-slate-900" 
                : "bg-green-600 hover:bg-green-700"
          }`}
          variant="default" 
          disabled={isEnrolled || Authloading}
          onClick={handleAction}
        >
          {/* 1. Show Loading State */}
          {Authloading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking...
            </span>
          ) : isEnrolled ? (
            "Enrolled"
          ) : !isAuthenticated ? (
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Login to Purchase
            </span>
          ) : (
            "Buy Now"
          )}
        </Button>
      </DialogTrigger>
      
      {isAuthenticated && !Authloading && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              {coursePrice === 0 ? "Enroll for Free" : "Confirm Purchase"}
            </DialogTitle>
            <DialogDescription>
              {coursePrice === 0
                ? "Click below to enroll in this free course immediately."
                : `You'll be redirected to Stripe's secure payment page to complete your purchase.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {!isEnrolled && (
              <Button variant="default" onClick={handleConfirm}>
                {coursePrice === 0 ? "Enroll Now" : `Pay $${coursePrice}`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}