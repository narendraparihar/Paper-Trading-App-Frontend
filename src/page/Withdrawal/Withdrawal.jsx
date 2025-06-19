import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);
  console.log(withdrawal);
  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="px-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
      <Table className="border">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>

            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{item?.date.toString()}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                Bank Transfer
              </TableCell>
              {/* <TableCell>BTC</TableCell> */}
              <TableCell>{item?.amount}</TableCell>
              <TableCell>{item?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
