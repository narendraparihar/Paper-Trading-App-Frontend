import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import PaymentDetailsForm from "./PaymentDetailForm";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  const { withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>
      {withdrawal.paymentDetails ? (
        <Card className="border border-gray-200 shadow-md rounded-xl p-4 bg-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-700">
              🏦 SBI Bank
            </CardTitle>
            <CardDescription className="text-gray-500">
              A/C No: {withdrawal.paymentDetails.accountNumber}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 mt-2">
            <div className="flex items-center">
              <p className="w-32 font-medium text-gray-700">A/C Holder</p>
              <p className="text-gray-600">
                {withdrawal.paymentDetails.accountHolderName}
              </p>
            </div>

            <div className="flex items-center">
              <p className="w-32 font-medium text-gray-700">IFSC</p>
              <p className="text-gray-600">{withdrawal.paymentDetails.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="py-6 px-5 mt-5 bg-black text-white">
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
