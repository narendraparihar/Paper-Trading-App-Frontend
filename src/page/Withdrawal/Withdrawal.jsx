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
      <Table className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="py-4 px-6">Date & Time</TableHead>
            <TableHead className="px-6">Method</TableHead>
            <TableHead className="px-6 text-right">Amount</TableHead>
            <TableHead className="px-6">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {withdrawal.history.map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <TableCell className="px-6 py-3">
                <p className="text-sm text-gray-800">
                  {new Date(item?.date).toLocaleString()}
                </p>
              </TableCell>

              <TableCell className="px-6 py-3 font-medium flex items-center gap-2">
                <span>🏦</span> Bank Transfer
              </TableCell>

              <TableCell className="px-6 py-3 text-right font-semibold text-gray-900">
                {parseFloat(item?.amount).toLocaleString()}
              </TableCell>

              <TableCell className="px-6 py-3">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full
              ${
                item?.status === "Success"
                  ? "bg-green-100 text-green-700"
                  : item?.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
                >
                  {item?.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
