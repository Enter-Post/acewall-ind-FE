// EarningDetail Component
import * as React from "react";

import { Button } from "@/components/ui/button";
import { TransactionCard } from "@/CustomComponent/Card";
import { CustomDatePicker } from "@/CustomComponent/teacher/wallet/datepicker";

export default function EarningDetail() {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const transactions = [
    { date: "29 Sep, 2021", time: "3:00 PM", amount: 300, type: "Withdrawal", balance: 3200 },
    { date: "28 Sep, 2021", time: "7:10 AM", amount: 700, type: "Earning", balance: 3500 },
    { date: "27 Sep, 2021", time: "4:20 PM", amount: 100, type: "Withdrawal", balance: 2800 },
  ];

  return (
    <div className="container mx-auto">
      <p className="text-xl py-4 mb-4 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
        Transaction
      </p>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold text-green-500 ml-2">From</p>
          <CustomDatePicker selectedDate={fromDate} onChange={setFromDate} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold text-green-500 ml-2">To</p>
          <CustomDatePicker selectedDate={toDate} onChange={setToDate} />
        </div>
        <Button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white">Apply Filter</Button>
      </div>
      
      <div className="mt-6">
        <TransactionCard title="Earnings" data={transactions} />
      </div>
    </div>
  );
}
