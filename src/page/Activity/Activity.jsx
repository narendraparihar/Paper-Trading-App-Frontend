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
import symbolMap from "@/Utils/symbolMap";
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
        <Table className="border border-gray-200 rounded-lg shadow-md bg-white">
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow>
              <TableHead className="py-4 px-4">Date & Time</TableHead>
              <TableHead>Trading Pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead className="text-center">Order Type</TableHead>
              <TableHead className="text-center">Profit/Loss</TableHead>
              <TableHead className="text-center text-red-600">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orders.map((item, index) => {
              const profit = calculteProfit(item);
              const isProfit = profit > 0;
              const value =
                item?.orderItem.coin?.current_price * item.orderItem?.quantity;
              return (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <TableCell className="px-4 py-3">
                    <p className="font-medium text-gray-800">2025/06/13</p>
                    <p className="text-xs text-gray-500">12:30:34</p>
                  </TableCell>

                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage
                        src={
                          item.orderItem.coin.image ||
                          symbolMap[item.orderItem.coin.symbol].image
                        }
                      />
                    </Avatar>
                    <span>
                      {item.orderItem.coin.name ||
                        symbolMap[item.orderItem.coin.symbol].Name}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.orderItem.buyPrice.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {item.orderItem.sellPrice == 0
                      ? "-"
                      : item.orderItem.sellPrice}
                  </TableCell>

                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        item.orderType === "BUY"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.orderType}
                    </span>
                  </TableCell>

                  <TableCell className="text-center font-semibold">
                    <span
                      className={`${
                        isProfit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {profit.toLocaleString()}
                    </span>
                  </TableCell>

                  <TableCell className="text-center text-gray-900 font-semibold">
                    {value.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Table>
    </div>
  );
};

export default Activity;
