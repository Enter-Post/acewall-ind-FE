import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../lib/AxiosInstance";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Optionally, confirm the payment on your backend or display a success message
      toast.success("Payment not successful!");
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p>Thank you for your purchase. You can now access your course.</p>
      </div>
    </div>
  );
}
