import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { EarningStateCard } from "@/CustomComponent/Card";
import { axiosInstance } from "@/lib/AxiosInstance";
import {
  Layers,
  Wallet,
  Receipt,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Earning() {
  const [paymentStats, setPaymentStats] = useState(null);
const [chartData, setChartData] = useState([]); 

 const fetchPaymentStats = async () => {
  try {
    const res = await axiosInstance.get("teacher/teacher-payment-stats");
    setPaymentStats(res.data.stats); // the aggregate card data
    setChartData(res.data.revenueOverTime); // the chart data
  } catch (error) {
    console.error("Failed to load payment stats", error);
  }
};


  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const cardDetails = paymentStats
    ? [
        {
          icon: <Layers className="h-6 w-6 text-orange-500" />,
          bgColor: "bg-orange-50",
          value: `$${paymentStats.totalRevenue.toFixed(2)}`,
          description: "Total Revenue",
        },
        {
          icon: <Wallet className="h-6 w-6 text-indigo-500" />,
          bgColor: "bg-indigo-50",
          value: `$${paymentStats.currentBalance.toFixed(2)}`,
          description: "Current Balance",
        },
        {
          icon: <Receipt className="h-6 w-6 text-indigo-500" />,
          bgColor: "bg-red-50",
          value: `$${paymentStats.totalWithdrawals.toFixed(2)}`,
          description: "Total Withdrawals",
        },
        {
          icon: <Wallet className="h-6 w-6 text-green-500" />,
          bgColor: "bg-green-50",
          value: `$${paymentStats.todayRevenue.toFixed(2)}`,
          description: "Today Revenue",
        },
      ]
    : [];

  return (
    <div className="container mx-auto p-3 md:p-0 max-w-7xl">
      <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
        My Earnings
      </p>

      {paymentStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cardDetails.map((data, index) => (
            <div key={index}>
              <EarningStateCard data={data} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground mb-8">Loading stats...</div>
      )}

      {chartData.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Statistic</h3>
              <Link to="/teacher/wallet/detail">
                <p className="text-sm font-bold text-green-500 cursor-pointer">
                  More Details
                </p>
              </Link>
            </div>

            <div className="ml-5 h-80 w-full">
              <ResponsiveContainer width="95%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
