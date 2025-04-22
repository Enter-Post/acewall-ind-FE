import { Toaster } from "@/components/ui/sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [Authloading, setAuthLoading] = useState(false);
  const [signUpdata, setSignupData] = useState({});

  const signup = async (completeData) => {
    setAuthLoading(true);
    await axiosInstance
      .post("auth/register", completeData)
      .then((res) => {
        setUser(res.data.user);
        setAuthLoading(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setAuthLoading(false);
        toast.error(error.response?.data?.message);
      });
  };

  const login = async (formdata) => {
    setAuthLoading(true);
    await axiosInstance
      .post("auth/login", formdata)
      .then((res) => {
        console.log(res, "res");
        setUser(res.data.user);
        toast.success(res.data.message);
        setAuthLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAuthLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const res = await axiosInstance.get("auth/checkAuth");
      setUser(res.data.user);
      setAuthLoading(false);
    } catch (error) {
      setAuthLoading(false);
      console.log(error);
      // toast.error(error.response?.data?.message);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    await axiosInstance
      .post("auth/logout")
      .then((res) => {
        console.log(res);
        checkAuth();
        setAuthLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setAuthLoading(false);
        toast.error(err.response.data.message);
      });
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
        Authloading,
        setAuthLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
