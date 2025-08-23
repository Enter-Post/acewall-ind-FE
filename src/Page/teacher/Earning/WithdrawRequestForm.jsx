import { useState } from "react";
import { axiosInstance } from "../../../lib/AxiosInstance";
import BackButton from "@/CustomComponent/BackButton";

export default function WithdrawRequestForm() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("stripe"); // default to stripe
  const [stripeAccountId, setStripeAccountId] = useState(""); // NEW
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    if (method === "stripe" && !stripeAccountId.trim()) {
      setMessage("Please enter your Stripe Account ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/teacher/withdraw", {
        amount: parseFloat(amount),
        method,
        stripeAccountId: method === "stripe" ? stripeAccountId.trim() : undefined, // Only send if using Stripe
      });

      setMessage(res.data.message);
      setAmount("");
      setStripeAccountId(""); // clear after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to request withdrawal");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
  <BackButton className="mt-2  mb-6 " />
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg space-y-6">

      {/* Heading Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Request Your Withdrawal</h2>
        <p className="text-sm text-gray-600">
          Enter the amount you'd like to withdraw. Make sure to provide your correct Stripe Account ID.
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-green-500"
          >
            <option value="stripe">Stripe</option>
            {/* Add more options as necessary */}
          </select>
        </div>

        {/* Stripe Account ID (only visible when Stripe is selected) */}
        {method === "stripe" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Account ID</label>
            <input
              type="text"
              value={stripeAccountId}
              onChange={(e) => setStripeAccountId(e.target.value)}
              className="w-full border rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-green-500"
              placeholder="Enter your Stripe account ID (e.g., acct_123ABC456XYZ)"
            />
          </div>
        )}

        {/* Message */}
        {message && (
          <p className={`text-sm mt-2 ${message.includes("failed") ? "text-red-600" : "text-blue-600"}`}>
            {message}
          </p>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Submitting..." : "Submit Withdrawal Request"}
          </button>
        </div>
      </div>
    </div>

  </>
  );
}