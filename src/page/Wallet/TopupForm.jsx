import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentHandler } from "@/State/Wallet/Action";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const TopupForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZOPAY");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(paymentMethod, amount, "payment");
  };
  return (
    <div className="text-white pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          className="py-7 text-lg"
          placeholder="$9999"
          value={amount}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h1 className="pb-1">Select Payment Method</h1>
        <RadioGroup
          className="flex"
          defaultValue="RAZORPAY"
          onValueChange={(value) => setPaymentMethod(value)}
        >
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className="bg-white text-black rounded-md px-5 py-2 w-32">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  alt=""
                />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2">
              <div className="bg-white text-black items-center rounded-md px-5 py-2 w-25">
                <img
                  className="h-7"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1920px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt="stripe logo"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        className="w-full py-7 bg-white text-black"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default TopupForm;
