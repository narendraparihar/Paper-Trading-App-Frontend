import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transferMoney } from "@/State/Wallet/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferForm = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleSubmit = () => {
    console.log(formData.amount, formData.purpose, formData.walletId);
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="text-white pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          className="py-7"
          name="amount"
          type="number"
          onChange={handleChange}
          value={FormData.amount}
          placeholder="$9999"
        />
      </div>
      <div>
        <h1 className="pb-1">Enter Wallet Id</h1>
        <Input
          className="py-7"
          name="walletId"
          onChange={handleChange}
          value={FormData.walletId}
          placeholder="#ADRES46"
        />
      </div>
      <div>
        <h1 className="pb-1">Enter Purpose</h1>
        <Input
          className="py-7"
          name="purpose"
          onChange={handleChange}
          value={FormData.purpose}
          placeholder="gift for friend"
        />
      </div>
      <DialogClose className="w-full">
        <Button
          className="w-full py-7 bg-white text-black"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
