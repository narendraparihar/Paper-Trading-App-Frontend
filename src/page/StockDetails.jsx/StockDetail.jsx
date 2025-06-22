import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import symbolMap from "../../Utils/symbolMap";
import Watchlist from "../Watchlist/Watchlist";
const StockDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { coin, watchlist } = useSelector((store) => store);
  const [symbol, setSymbol] = useState();
  const [loading, setLoading] = useState(true);
  console.log("coind id", coin);
  useEffect(() => {
    FetchCoinDetails();
  }, [id]);

  useEffect(() => {
    if (coin?.coinDetails?.symbol) {
      setSymbol(coin.coinDetails.symbol);
      setLoading(false);
    }
  }, [coin]);

  const FetchCoinDetails = async () => {
    await dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  const handleAddToWatchList = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.symbol,
        jwt: localStorage.getItem("jwt"),
      })
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  };
  return (
    <>
      {loading ? (
        <>" Data Fetching "</>
      ) : (
        <div className="p-5 mt-5">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <div>
                <Avatar>
                  <AvatarImage src={symbolMap[symbol].image}></AvatarImage>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinDetails?.symbol}</p>
                  <DotIcon className="text-gray-400" />
                  <p>{symbolMap[symbol].Name}</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {Number(coin.coinDetails?.lastPrice).toFixed(2)}
                  </p>
                  <p className="text-red-600">
                    <span>
                      {Number(coin.coinDetails?.priceChange).toFixed(2)}
                    </span>
                    <span>
                      ({Number(coin.coinDetails?.priceChangePercent).toFixed(2)}
                      %)
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
                  <BookmarkFilledIcon className="h-16 w-16" />
                ) : (
                  <BookmarkIcon className="h-16 w-16" />
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
            <StockChart coinId={coin.coinDetails?.symbol} />
          </div>
        </div>
      )}
    </>
  );
};

export default StockDetail;
