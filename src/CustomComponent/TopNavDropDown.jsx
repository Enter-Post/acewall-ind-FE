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
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";

export function TopNavbarDropDown({ selected, setselected }) {
  const { checkAuth, user, logout, setAuthLoading } = useContext(GlobalContext);

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
    // logout();
    // checkAuth();
    logout();
    checkAuth();
    location.reload();
    // setAuthLoading(true);
    // await axiosInstance
    //   .post("auth/logout")
    //   .then((res) => {
    //     console.log(res);
    //     setAuthLoading(false);
    //     toast.success(res.data.message);
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setAuthLoading(false);
    //     toast.error(err.response.data.message);
    //   });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="w-5 h-5">
            <AvatarImage src={user.profileImg} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="text-white flex items-center">{user.firstName}</p>
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
