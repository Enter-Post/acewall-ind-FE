import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCmp = ({ data, title }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[80%] md:w-[180px]">
          <SelectValue placeholder={title} value={selectedValue} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCmp;
