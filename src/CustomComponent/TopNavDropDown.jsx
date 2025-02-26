import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Use ShadCN's Avatar
import dummyAvatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { ArrowDown01Icon } from "@/assets/Icons/ArrowDown";
import { CircleArrowDown } from "lucide-react";

export function TopNavbarDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="w-5 h-5">
            <AvatarImage src={dummyAvatar} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="text-white flex items-center">
          User Name
            {/* <ArrowDown01Icon /> */}
            {/* <CircleArrowDown className="w-10" /> */}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
       
        <DropdownMenuItem asChild>
          <Link to="/studentPortal/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/login">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
