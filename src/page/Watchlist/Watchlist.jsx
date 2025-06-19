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
      <Table className="border">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right text-red-600">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="z-50 size-7">
                  <AvatarImage src={item.image}></AvatarImage>
                </Avatar>
                <span>{item.name}</span>
              </TableCell>
              <TableCell>{item.symbol}</TableCell>
              <TableCell>{item.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell>{item.price_change_percentage_24h}</TableCell>

              <TableCell className="text-right">
                ${item.current_price}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleRemoveToWatchlist(item.id)}
                >
                  <BookmarkFilledIcon className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
