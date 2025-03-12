import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div>
      <section className="flex justify-between items-center gap-4 w-full p-3 md:p-0">
        <Input type="text" placeholder="Search" className="w-[95%]" />
        <div className="bg-green-200 hover:bg-green-300 rounded-full p-2 cursor-pointer">
          <Search className="rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default SearchBox;
