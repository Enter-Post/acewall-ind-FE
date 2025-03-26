import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function DatePicker() {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        <Input
          id="birth-date"
          type="text"
          placeholder="mm/dd/yyyy"
          className=" placeholder:text-gray-500 rounded-md h-8"
        />
      </div>
    </div>
  );
}
