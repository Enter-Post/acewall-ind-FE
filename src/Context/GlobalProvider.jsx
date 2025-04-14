import { Toaster } from "@/components/ui/sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [signUpdata, setSignupData] = useState({});

  const signup = async (completeData) => {
    await axiosInstance
      .post("auth/register", completeData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  return (
    <GlobalContext.Provider value={{ signUpdata, setSignupData, signup }}>
      {children}
    </GlobalContext.Provider>
  );
};
