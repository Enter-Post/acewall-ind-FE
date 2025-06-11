import React, { useState, useRef, useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Key, Loader, XIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { useNavigate } from "react-router-dom";

const VerifyOTPDialog = ({
  open,
  onOpenChange,
  onVerify,
  setOpen,
  type,
  sendingOTP,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  console.log(sendingOTP, "sendingOTP");

  useEffect(() => {
    if (!open) {
      setOtp(["", "", "", "", "", ""]);
    }
  }, [open]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    if (type == "password") {
      await axiosInstance
        .put("auth/updatePassword", {
          email: user.email,
          otp: enteredOtp,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setOpen(false);
          setLoading(false);
          navigate(`/${user.role}/account`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err?.response?.data?.message || "Something went wrong.");
        });
    } else if (type == "email") {
      await axiosInstance
        .put("auth/updateEmail", {
          email: user.email,
          otp: enteredOtp,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setOpen(false);
          setLoading(false);
          navigate("/student/account");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOtp(["", "", "", "", "", ""]);
          toast.error(err?.response?.data?.message || "Something went wrong.");
        });
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const res = await axiosInstance.post("auth/resendOTP", {
        email: user.email,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={onVerify}
          type="submit"
          disabled={sendingOTP}
          className="bg-green-500 hover:bg-green-600"
        >
          {sendingOTP ? (
            <Loader className="mr-2 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <div className="flex justify-between">
            <section>
              <div className="flex items-center gap-2">
                <Key />
                <DialogTitle>Verify OTP</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                We have sent a 6-digit OTP to your email.
              </p>
            </section>
            <XIcon onClick={() => setOpen(false)} size={15} />
          </div>
        </DialogHeader>

        <div className="flex justify-center gap-2">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>

        <DialogFooter className="flex justify-between items-center w-full gap-2">
          <Button
            className=" bg-green-500 hover:bg-green-600 text-white"
            onClick={handleSubmit}
            disabled={loading || otp.join("").length < 6}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" />
                Verifying
              </span>
            ) : (
              "Verify"
            )}
          </Button>

          <Button
            onClick={handleResend}
            variant={"link"}
            className="text-sm text-blue-600 self-center cursor-pointer"
            disabled={resendLoading}
          >
            {resendLoading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" />
                Resending
              </span>
            ) : (
              "Resend OTP"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOTPDialog;
