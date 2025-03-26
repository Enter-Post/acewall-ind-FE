import { TransactionCard } from "@/CustomComponent/Card";

export default function EarningDetail() {
  const earnings = [
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
  ];

  const withdrawals = [
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
    { date: "21 Sep, 2021", time: "2:14 AM", amount: "200$" },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransactionCard
          title={"Earnings"}
          data={earnings}
        />
        <TransactionCard
          title={"Withdrawal"}
          data={withdrawals}
        />
      </div>
    </div>
  );
}
