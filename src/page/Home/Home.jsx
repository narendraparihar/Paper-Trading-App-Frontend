import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { Cross, CrossIcon, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinsList } from "@/State/Coin/Action";

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotRelease, setIsBotRelease] = React.useState(false);
  const dispatch = useDispatch();
  const { coin } = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  // useEffect(() => {
  //   dispatch(getTop50CoinsList());
  // }, [category]);
  useEffect(() => {
    dispatch(getCoinList(1));
    setLoader(false);
  }, [dispatch]);

  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };
  // const handleKeyPress = (e) => {
  //   if (e.key == "Enter") {
  //     console.log("Input value", inputValue);
  //   }
  // };
  const handleBotRelease = () => {
    setIsBotRelease(!isBotRelease);
  };
  const handleCategory = (value) => {
    setCategory(value);
  };
  return (
    <>
      {loader ? (
        "Data Loading"
      ) : (
        <div className="relative">
          <div className="lg:flex">
            <div className="lg:w-[50%] lg:border-r">
              <div className="p-3 flex items-center gap-4">
                <Button
                  variant={category == "all" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategory("all")}
                >
                  All
                </Button>
                <Button
                  variant={category == "top50" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategory("top50")}
                >
                  Top 50
                </Button>
                <Button
                  variant={category == "topGainers" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategory("topGainers")}
                >
                  Top gainers
                </Button>
                <Button
                  variant={category == "topLoosers" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategory("topLoosers")}
                >
                  Top Loosers
                </Button>
              </div>
              <AssetTable coin={coin} category={category} />
            </div>
            <div className="hidden lg:block lg:w-[50%] p-5">
              <StockChart coinId="BTCUSDT" />

              <div className="flex gap-5 items-center">
                <div>
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png"
                      }
                    />
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p>BTC</p>
                    <DotIcon className="text-gray-400" />
                    <p className="text-gray-400">Bitcoin</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-xl font-bold">
                      {Number(coin?.coinList[0]?.lastPrice).toFixed(2)}
                    </p>
                    <p>
                      {" "}
                      <span className="text-red-600">
                        {Number(coin.coinList?.[0]?.priceChangePercent).toFixed(
                          2
                        )}
                        %
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
            {isBotRelease && (
              <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
                <div className="flex justify-between items-center border-b px-6 h-[12%] text-white">
                  <p className="text-#FFFFFF-600">Chat Bot</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBotRelease()}
                  >
                    <Cross1Icon />
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
