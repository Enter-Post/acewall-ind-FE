import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/CustomComponent/BackButton";
import { Layers, CheckCircle, XCircle, Clock } from "lucide-react"; // Icons for the cards
import { axiosInstance } from "@/lib/AxiosInstance";

export default function AllWithdrawals() {
    const [allWithdrawals, setAllWithdrawals] = useState([]); // State for storing withdrawals
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalWithdrawalsCount: 0,
    }); // Pagination state

    const pageSize = 16; // Number of withdrawals per page

    // Fetch all withdrawals with pagination
    const fetchAllWithdrawals = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("teacher/teacher-payment-stats", {
                params: {
                    page: page,
                    pageSize: pageSize,
                },
            });
            console.log("API Response:", res.data); // Check the structure of the response

            if (res.data?.recentWithdrawals) {
                setAllWithdrawals(res.data.recentWithdrawals); // Set the withdrawals data
                setPagination({
                    currentPage: res.data.pagination.currentPage,
                    totalPages: res.data.pagination.totalPages,
                    totalWithdrawalsCount: res.data.pagination.totalWithdrawalsCount,
                });
            } else {
                setError("No withdrawals found.");
            }
        } catch (error) {
            console.error("Failed to fetch withdrawals", error);
            setError(error?.response?.data?.message || "Failed to fetch withdrawals. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false once the API call is completed
        }
    };

    // Fetch withdrawals when component mounts or when page changes
    useEffect(() => {
        fetchAllWithdrawals(pagination.currentPage); // Fetch withdrawals based on the current page
    }, [pagination.currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, currentPage: newPage });
        }
    };

    // Calculate summary statistics (total approved, pending, rejected, and total withdrawals)
    const calculateWithdrawalStats = () => {
        const stats = {
            approved: 0,
            pending: 0,
            rejected: 0,
        };

        allWithdrawals.forEach((withdrawal) => {
            if (withdrawal.status === "approved") stats.approved++;
            if (withdrawal.status === "pending") stats.pending++;
            if (withdrawal.status === "rejected") stats.rejected++;
        });

        return stats;
    };

    const withdrawalStats = calculateWithdrawalStats();

    return (
        <div className="container mx-auto p-3 md:p-0 max-w-7xl">
            <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
                All Withdrawals
            </p>
            <BackButton className="mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Summary Cards */}
                <Card className="bg-green-50">
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                            <p className="text-lg font-semibold text-green-800">{withdrawalStats.approved}</p>
                        </div>
                        <p className="text-sm text-green-700">Approved Withdrawals</p>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <Clock className="h-8 w-8 text-yellow-500" />
                            <p className="text-lg font-semibold text-yellow-800">{withdrawalStats.pending}</p>
                        </div>
                        <p className="text-sm text-yellow-700">Pending Withdrawals</p>
                    </CardContent>
                </Card>

                <Card className="bg-red-50">
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <XCircle className="h-8 w-8 text-red-500" />
                            <p className="text-lg font-semibold text-red-800">{withdrawalStats.rejected}</p>
                        </div>
                        <p className="text-sm text-red-700">Rejected Withdrawals</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-50">
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <Layers className="h-8 w-8 text-gray-500" />
                            <p className="text-lg font-semibold text-gray-800">{pagination.totalWithdrawalsCount}</p>
                        </div>
                        <p className="text-sm text-gray-700">Total Withdrawals</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 mb-6 justify-end text-end">
                <Link to="/teacher/wallet/withdraw">
                    <Button className="bg-acewall-main hover:bg-acewall-main/90 text-white">
                        Request Withdrawal
                    </Button>
                </Link>
            </div>

            {/* Show loading spinner if data is still loading */}
            {loading ? (
                <div className="text-center text-muted-foreground mb-8">Loading withdrawals...</div>
            ) : error ? (
                <div className="text-center text-red-500 mb-8">{error}</div> // Show error message if there's an issue
            ) : (
                allWithdrawals.length > 0 && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Withdrawal History</h3>
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
                                        {allWithdrawals.map((withdrawal, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="p-2 text-green-600 font-semibold">
                                                    ${withdrawal?.amount?.toFixed(2) || "N/A"}
                                                </td>
                                                <td className="p-2 capitalize">{withdrawal?.method || "N/A"}</td>
                                                <td className="p-2">
                                                    {new Date(withdrawal?.processedAt || withdrawal?.requestedAt).toLocaleDateString() || "N/A"}
                                                </td>
                                                <td className="p-2">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${withdrawal?.status === "approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : withdrawal?.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {withdrawal?.status || "N/A"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination controls */}
                            <div className="mt-10 flex justify-center items-center space-x-4">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md shadow-md hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                                >
                                    Previous
                                </button>

                                {/* Page Indicator */}
                                <span className="text-sm font-medium text-gray-600">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md shadow-md hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                                >
                                    Next
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                )
            )}
        </div>
    );
}
