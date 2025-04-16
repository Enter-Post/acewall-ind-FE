import { Toaster } from "@/components/ui/sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [signUpdata, setSignupData] = useState({});

  console.log(user, "user in context");

  const signup = async (completeData) => {
    await axiosInstance
      .post("auth/register", completeData)
      .then((res) => {
        setUser(res.data.user);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  const login = async (formdata) => {
    await axiosInstance
      .post("auth/login", formdata)
      .then((res) => {
        console.log(res, "res");
        setUser(res.data.user);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("auth/checkAuth");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      // toast.error(error.response?.data?.message);
    }
  };

  const logout = async () => {
    console.log("click");
    
    await axiosInstance
      .post("auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <GlobalContext.Provider
      value={{
        signUpdata,
        setSignupData,
        checkAuth,
        signup,
        login,
        logout,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
