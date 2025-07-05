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
import { CheckCircle2 } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PurchaseConfirmationModal({
  courseID,
  coursePrice = 10,
  studentID,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setOpen(false);

    if (coursePrice === 0) {
      try {
        const res = await axiosInstance.post(`/enrollment/create/${courseID}`);
        toast.success(res.data.message || "Enrolled successfully!");
        navigate("/student/mycourses");
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.error || "Enrollment failed");
      }
    } else {
      // 💳 PAID COURSE: redirect to Stripe
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
        console.log(err);
        toast.error("Payment initiation failed.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full text-white text-sm py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-colors duration-300"
          variant="default"
        >
          Enroll Now
        </Button>
      </DialogTrigger>
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            {coursePrice === 0 ? "Enroll Now" : `Pay $${coursePrice}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
