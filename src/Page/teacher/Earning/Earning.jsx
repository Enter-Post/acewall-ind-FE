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
import { Button } from "@/components/ui/button";

export default function Earning() {
  const [paymentStats, setPaymentStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentWithdrawals, setRecentWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch payment statistics and withdrawal data
  const fetchPaymentStats = async () => {
    try {
      const res = await axiosInstance.get("teacher/teacher-payment-stats");
      setPaymentStats(res.data.stats); // the aggregate card data
      setChartData(res.data.revenueOverTime); // the chart data
      setRecentWithdrawals(res.data.recentWithdrawals); // Set withdrawals
    } catch (error) {
      console.error("Failed to load payment stats", error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <div className="text-center text-muted-foreground mb-8">Loading stats...</div>
      ) : (
        <>
          {paymentStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {cardDetails.map((data, index) => (
                <div key={index}>
                  <EarningStateCard data={data} />
                </div>
              ))}
            </div>
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

          {recentWithdrawals.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-medium mb-4">Recent Withdrawals</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <Link to="/teacher/wallet/withdraw">
                      <Button className="bg-acewall-main hover:bg-acewall-main/90 text-white">
                        Withdraw Funds
                      </Button>
                    </Link>
                    <Link to="/teacher/wallet/allwithdrawals">
                      <Button className=" bg-gray-400  hover:bg-acewall-main/90 text-white">
                        View All Withdrawals
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-2">Amount</th>
                        <th className="p-2">Method</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Display only the latest 4 withdrawals */}
                      {recentWithdrawals.slice(0, 4).map((withdrawal, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-green-600 font-semibold">
                            ${withdrawal.amount.toFixed(2)}
                          </td>
                          <td className="p-2 capitalize">
                            {withdrawal.method || 'N/A'}
                          </td>
                          <td className="p-2">
                            {new Date(withdrawal.processedAt || withdrawal.requestedAt).toLocaleDateString()}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${withdrawal.status === 'approved'
                                ? 'bg-green-100 text-green-700'
                                : withdrawal.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                                }`}
                            >
                              {withdrawal.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}


          {/* Button to view all withdrawals */}

        </>
      )}
    </div>
  );
}