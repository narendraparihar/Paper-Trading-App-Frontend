import React from "react";
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
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import symbolMap from "@/Utils/symbolMap";
const AssetTable = (coin, category) => {
  const navigate = useNavigate();
  return (
    <Table className="rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
      <ScrollArea className={`h-[${category === "all" ? "74vh" : "1vh"}]`}>
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-24">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-center">Price</TableHead>
            {/* <TableHead className="text-right">High</TableHead> */}
            <TableHead className="text-center">24H</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coin?.coin?.coinList.map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-200 ease-in-out cursor-pointer"
              onClick={() => navigate(`market/${item.symbol}`)}
            >
              <TableCell className="flex items-center gap-3 font-medium">
                <Avatar className="size-8">
                  <AvatarImage src={symbolMap[item.symbol].image} />
                </Avatar>
                <div className="flex flex-col">
                  <span>{symbolMap[item.symbol].Name}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              </TableCell>

              <TableCell className="uppercase">{item?.symbol}</TableCell>

              <TableCell className="text-center font-semibold">
                ${Number(item?.lastPrice).toFixed(2)}
              </TableCell>

              {/* <TableCell className="text-right">{item?.market_cap}</TableCell> */}

              <TableCell
                className={`text-center font-semibold ${
                  item?.priceChangePercent > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {Number(item?.priceChange).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {Number(item?.quoteVolume).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
};

export default AssetTable;
