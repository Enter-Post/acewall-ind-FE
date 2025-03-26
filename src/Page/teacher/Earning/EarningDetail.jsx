import { Button } from "@/components/ui/button";
import { TransactionCard } from "@/CustomComponent/Card";
import { DatePicker } from "@/CustomComponent/datepicker";

export default function EarningDetail() {
  const transactions = [
    {
      date: "29 Sep, 2021",
      time: "3:00 PM",
      amount: 300,
      type: "Withdrawal",
      balance: 3200,
    },
    {
      date: "28 Sep, 2021",
      time: "7:10 AM",
      amount: 700,
      type: "Earning",
      balance: 3500,
    },
    {
      date: "27 Sep, 2021",
      time: "4:20 PM",
      amount: 100,
      type: "Withdrawal",
      balance: 2800,
    },
    {
      date: "26 Sep, 2021",
      time: "11:50 AM",
      amount: 250,
      type: "Earning",
      balance: 2900,
    },
    {
      date: "25 Sep, 2021",
      time: "9:15 PM",
      amount: 400,
      type: "Withdrawal",
      balance: 2650,
    },
    {
      date: "24 Sep, 2021",
      time: "8:00 AM",
      amount: 600,
      type: "Earning",
      balance: 3050,
    },
    {
      date: "23 Sep, 2021",
      time: "1:30 PM",
      amount: 150,
      type: "Withdrawal",
      balance: 2450,
    },
    {
      date: "22 Sep, 2021",
      time: "6:45 PM",
      amount: 300,
      type: "Earning",
      balance: 2600,
    },
    {
      date: "21 Sep, 2021",
      time: "2:14 AM",
      amount: 200,
      type: "Withdrawal",
      balance: 2300,
    },
    {
      date: "20 Sep, 2021",
      time: "10:30 AM",
      amount: 500,
      type: "Earning",
      balance: 2500,
    },
  ];

  return (
    <div className="container mx-auto">
      <p className="text-xl py-4 mb-4 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
        Transaction
      </p>

      <div className="flex flex-wrap gap-4 ">
        <div className="flex justify-center items-center gap-2">
          <p className="text-xs font-bold text-green-500 ml-2">froms</p>
          <DatePicker />
        </div>
        <div className="flex justify-center items-center gap-2">
          <p className="text-xs font-bold text-green-500 ml-2">to</p>
          <DatePicker />
        </div>
        <Button className={"bg-green-400"}>Apply filter </Button>
      </div>
      <div className="">
        <TransactionCard title={"Earnings"} data={transactions} />
      </div>
    </div>
  );
}
