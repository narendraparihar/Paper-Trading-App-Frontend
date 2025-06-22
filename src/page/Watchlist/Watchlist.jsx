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
import { addItemToWatchlist, getUserWatchlist } from "@/State/watchlist/Action";
import symbolMap from "@/Utils/symbolMap";
const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, []);

  const handleRemoveToWatchlist = (value) => {
    console.log(value);
    dispatch(
      addItemToWatchlist({
        jwt: localStorage.getItem("jwt"),
        coinId: value,
      })
    );
  };
  return (
    <div className="px-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
      <Table className="border border-gray-200 rounded-lg shadow-sm bg-white">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="py-5">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Volume</TableHead>
            {/* <TableHead>Market Cap</TableHead> */}
            <TableHead className="text-center">24H</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right text-red-600">Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {watchlist.items.map((item, index) => {
            const change24h = parseFloat(item.price_change_percentage_24h);

            return (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <TableCell className="font-medium flex items-center gap-3 py-4">
                  <Avatar className="size-7 rounded-full">
                    <AvatarImage
                      src={item.image || symbolMap[item.symbol].image}
                    />
                  </Avatar>
                  <span>{item.name || symbolMap[item.symbol].Name}</span>
                </TableCell>

                <TableCell className="uppercase text-gray-600">
                  {item.symbol}
                </TableCell>

                <TableCell>{item.total_volume?.toLocaleString()}</TableCell>

                {/* <TableCell>
                  {item.market_cap?.toLocaleString() || item?.total_volume}
                </TableCell> */}

                <TableCell className="text-center">
                  <span
                    className={`${
                      change24h >= 0 ? "text-green-600" : "text-red-600"
                    } font-semibold`}
                  >
                    {change24h.toFixed(2)}%
                  </span>
                </TableCell>

                <TableCell className="text-right font-medium text-gray-800">
                  {item.current_price?.toLocaleString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-100"
                    onClick={() => handleRemoveToWatchlist(item.id)}
                  >
                    <BookmarkFilledIcon className="w-6 h-6 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
