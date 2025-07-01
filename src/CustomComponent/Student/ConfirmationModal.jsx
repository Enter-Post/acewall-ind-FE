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
  courseName = "Course",
  teacherID = "683478d9acb146b00ea23906",
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const createCheckoutSession = async () => {
    try {
      const response = await axiosInstance.post("/stripe/create-checkout-session", {
        courseId: courseID,
        studentId: studentID,
        teacherId: teacherID,
        amount: coursePrice,
        courseName,
      });

      const data = response.data;
      console.log(data, 'data')
      if (data.success) {
        localStorage.setItem("pending_stripe_session", data.sessionId);
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message || "Error initiating payment process."
      );
    }
  };

  const handleConfirm = async () => {
    setOpen(false);

    if (coursePrice === 0) {
      // Free course: enroll directly
      try {
        const res = await axiosInstance.post(`enrollment/create/${courseID}`);
        toast.success(res.data.message || "Successfully enrolled!");
        navigate("/student/mycourses");
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    } else {
      // Paid course: initiate Stripe
      await createCheckoutSession();
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
              : `You'll be redirected to Stripe's secure payment page to complete your purchase of $${coursePrice}.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700"
          >
            {coursePrice === 0 ? "Enroll Now" : `Pay $${coursePrice}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
