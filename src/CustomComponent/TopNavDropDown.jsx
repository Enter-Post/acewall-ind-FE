import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function TopNavbarDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-white cursor-pointer">username</p>
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
