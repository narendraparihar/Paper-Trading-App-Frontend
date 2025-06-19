import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/State/watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchList";
import Watchlist from "../Watchlist/Watchlist";
const StockDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { coin, watchlist } = useSelector((store) => store);
  console.log("coind id", id);
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [id]);

  const handleAddToWatchList = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  };
  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image?.large}></AvatarImage>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.id}</p>
              <DotIcon className="text-gray-400" />
              <p>{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                {coin.coinDetails?.market_data.current_price.usd}
              </p>
              <p className="text-red-600">
                <span>
                  {coin.coinDetails?.market_data.market_cap_change_24h}
                </span>
                <span>
                  (
                  {
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  }
                  )
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex item-center gap-4">
          <Button
            onClick={handleAddToWatchList}
            className="h-10 w-10 mt-2 bg-black text-white"
          >
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkIcon className="h-16 w-16" />
            ) : (
              <BookmarkFilledIcon className="h-16 w-16" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button size="lg" className="text-white bg-black">
                Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white">
              <DialogHeader>
                <DialogTitle>How Much Do you want to spend?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-14">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetail;
