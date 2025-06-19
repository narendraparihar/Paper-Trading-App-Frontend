import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WithdrawalForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZOPAY");
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);
  const handleChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
    console.log(paymentMethod, amount, "payment");
  };
  return (
    <div className="text-white pt-10 space-y-5">
      <div
        className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold
        px-5 py-4"
      >
        <p>Available balance</p>
        <p>$9900</p>
      </div>
      <div className="flex flex-col items-center">
        <h1>Enter Withdrawal Amount</h1>
        <div className="flex items-center justify-center">
          <Input
            value={amount}
            onChange={(e) => handleChange(e)}
            className="withdrawalInput py-7 border-none outline-none 
                    focus:outline-none px-5 text-2xl w-full"
            placeholder="$9990"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap- border px-5 border px-5 py-2 rounded-md">
          <img
            className="h-8 w-8"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg"
            alt=""
          />
          <div className="text-xl font-bold pl-2">
            <p>{withdrawal.paymentDetails?.bankName} </p>
            <p>{withdrawal.paymentDetails?.accountNumber}</p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button
          className="w-full py-7 text-xl bg-white text-black"
          onClick={handleSubmit}
        >
          Withdraw
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
