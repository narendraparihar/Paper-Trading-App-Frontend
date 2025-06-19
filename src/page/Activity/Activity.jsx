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
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForUser } from "@/State/Order/Action";
import { calculteProfit } from "@/Utils/calculateProfit";
const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllOrderForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="px-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>
      <Table className="border">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Sell Price</TableHead>
            <TableHead className="text-center">Order Type</TableHead>
            <TableHead className="text-center">Profit/Loss</TableHead>
            <TableHead className="text-center text-red-600">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orders.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p> 2025/13/06</p>
                <p className="text-gray-400"> 12:30:34</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="z-50 size-7">
                  <AvatarImage src={item.orderItem.coin.image}></AvatarImage>
                </Avatar>
                <span>{item.orderItem.coin.name}</span>
              </TableCell>
              {/* <TableCell>BTC</TableCell> */}
              <TableCell>{item.orderItem.buyPrice}</TableCell>
              <TableCell>{item.orderItem.sellPrice}</TableCell>
              <TableCell className="text-center">{item.orderType}</TableCell>
              <TableCell className="text-center">
                {calculteProfit(item)}
              </TableCell>
              <TableCell className="text-center">345</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
