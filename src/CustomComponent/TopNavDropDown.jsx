import * as React from "react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ArrowDown01Icon } from "@/assets/Icons/ArrowDown";
import { Logout03Icon } from "@/assets/Icons/Logout";

export function TopNavbarDropDown() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu className="bg-white">
      <DropdownMenuTrigger asChild>
        <p>usename</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuCheckboxItem>Account</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Setting</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 px-3 py-2 text-gray-700 "
          >
            <Logout03Icon />
            <span>Logout</span>
          </Button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
