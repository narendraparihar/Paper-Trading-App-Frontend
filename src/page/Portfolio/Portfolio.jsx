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
import { getUserAsset } from "@/State/Asset/Action";
import symbolMap from "@/Utils/symbolMap";
const Portfolio = () => {
  const dispatch = useDispatch();
  const { asset } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUserAsset({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="px-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5 ">Portfolio</h1>
      <Table className="border border-gray-200 rounded-xl shadow-sm bg-white">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-[160px]">Asset</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Units</TableHead>
            <TableHead className="text-center">Profit/Loss</TableHead>
            <TableHead>24H %</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {asset?.userAsset.map((item, index) => {
            const change = item?.coin?.price_change_24h;
            const profit =
              (item?.coin?.current_price - item?.buyPrice) * item?.quantity;
            const isProfit = profit >= 0;
            return (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <TableCell className="flex items-center gap-3 font-medium py-3">
                  <Avatar className="size-7">
                    <AvatarImage
                      src={item.coin.image || symbolMap[item.coin.symbol].image}
                      alt={item.coin.name}
                    />
                  </Avatar>
                  <span>
                    {item.coin.name || symbolMap[item.coin.symbol].Name}
                  </span>
                </TableCell>

                <TableCell className="uppercase text-gray-700">
                  {item.coin.symbol}
                </TableCell>

                <TableCell className="text-gray-800">{item.quantity}</TableCell>
                <TableCell className="text-center font-semibold">
                  <span
                    className={`${
                      isProfit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profit.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change.toFixed(2)}
                </TableCell>

                {/* <TableCell
                  className={`font-semibold ${
                    changePercent >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {changePercent.toFixed(2)}%
                </TableCell> */}

                <TableCell className="text-right text-gray-800">
                  {item.coin.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
