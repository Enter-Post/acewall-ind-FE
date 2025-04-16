import * as React from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Use ShadCN's Avatar
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/Context/GlobalProvider";
import { useContext } from "react";

export function TopNavbarDropDown({ selected, setselected }) {
  const { logout, checkAuth } = useContext(GlobalContext);
  const tabs = [
    {
      id: 9,
      title: "Account",
      path: "/student/account",
    },
    {
      id: 10,
      title: "Payment",
      path: "/student/payment",
    },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    checkAuth();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="w-5 h-5">
            <AvatarImage
              src={
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="text-white flex items-center">John</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        {tabs.map((tab, index) => {
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => setselected(tab.id)}
              className={
                selected == tab.id &&
                "bg-green-500 hover:bg-green-600 text-white"
              }
              asChild
            >
              <Link to={tab.path}>{tab.title}</Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem asChild>
          <button onClick={() => handleLogout()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
