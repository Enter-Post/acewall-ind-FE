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

export function TopNavbarDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="w-5 h-5">
            <AvatarImage src={dummyAvatar} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="text-white">username</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/studentPortal/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Setting</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/login">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
