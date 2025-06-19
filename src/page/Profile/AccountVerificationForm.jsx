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
const AccountVerificationForm = () => {
  const [otp, setOtp] = useState();
  const handleSubmit = () => {
    console.log(otp);
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center">
        <p>Email :</p>
        <p>Knight@king.com</p>
        <Dialog>
          <DialogTrigger>
            <Button>Send OTP</Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white ">
            <DialogHeader>
              <DialogTitle className="text-center">Enter OTP</DialogTitle>
              <div className="py-5 flex gap-10 justify-center items-center">
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
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
