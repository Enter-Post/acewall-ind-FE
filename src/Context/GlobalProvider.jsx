import { axiosInstance } from "@/lib/AxiosInstance";
import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [signUpdata, setSignupData] = useState({});

  console.log(signUpdata, "signUpdata");

  const signup = async () => {
    const res = await axiosInstance.post("auth/register", signUpdata);
    console.log(res);
    
  };

  return (
    <GlobalContext.Provider value={{ signUpdata, setSignupData, signup }}>
      {children}
    </GlobalContext.Provider>
  );
};
