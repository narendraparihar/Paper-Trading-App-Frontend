import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

import { API_BASE_URL } from "@/config/api";
const AccountVerificationForm = (auth) => {
  const [otp, setOtp] = useState();
  const [message, setMessage] = useState();
  const handleSubmit = () => {
    console.log(otp);
  };

  const sendOTP = async () => {
    try {
      // const res = await axios.post(
      //   API_BASE_URL + "/api/user/verification/EMAIL/send-otp",
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //     },
      //   }
      // );
      // console.log(res);
      // setIsOTPSent(true);
      // setMessage("OTP sent to your registered email.");
    } catch (err) {
      setMessage("Failed to send OTP. Try again.", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center">
        <p>Email :</p>
        <p>{auth.auth.user?.email}</p>
        <Dialog>
          <DialogTrigger>
            <Button onClick={sendOTP}>Send OTP</Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white ">
            <DialogHeader>
              <DialogTitle className="text-center">
                2FA will be added soon...
              </DialogTitle>
              {/* <div className="py-5 flex gap-10 justify-center items-center">
                <InputOTP
                  maxLength={6}
                  onChange={(value) => setOtp(value)}
                  value={otp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button className="w-[10rem]" onClick={() => handleSubmit()}>
                    submit
                  </Button>
                </DialogClose>
              </div> */}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
