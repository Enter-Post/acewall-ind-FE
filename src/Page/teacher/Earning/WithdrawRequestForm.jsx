import { useState } from "react";
import { axiosInstance } from "../../../lib/AxiosInstance";

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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Request Withdrawal</h2>

      <div className="mb-4">
        <label className="block text-sm mb-1">Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* <div className="mb-4">
        <label className="block text-sm mb-1">Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div> */}

      {/* Only show if Stripe is selected */}
      {method === "stripe" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">Stripe Account ID</label>
          <input
            type="text"
            value={stripeAccountId}
            onChange={(e) => setStripeAccountId(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="acct_123ABC456XYZ"
          />
        </div>
      )}

      {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}

      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Submitting..." : "Submit Withdrawal Request"}
      </button>
    </div>
  );
}
