import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { Cross, CrossIcon, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinsList } from "@/State/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotRelease, setIsBotRelease] = React.useState(false);
  const dispatch = useDispatch();
  const { coin } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTop50CoinsList());
  }, [category]);
  useEffect(() => {
    dispatch(getCoinList(1));
  }, [dispatch]);
  console.log(coin);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("Input value", inputValue);
    }
  };
  const handleBotRelease = () => {
    setIsBotRelease(!isBotRelease);
  };
  const handleCategory = (value) => {
    setCategory(value);
  };
  return (
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
          <AssetTable
            coin={category == "all" ? coin.coinList : coin.top50}
            category={category}
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="hidden lg:block lg:w-[50%] p-5">
          <StockChart coinId="bitcoin" />

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
                <p className="text-xl font-bold">102000</p>
                <p>
                  {" "}
                  <span className="text-red-600">-1919219.578</span>{" "}
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

            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
              <div className="self-start pb-5 w-auto">
                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 text-white w-auto">
                  <p>Hi, Ram Arora</p>
                  <p>You can ask crypto related any quetion</p>
                  <p>like, price, market cap etc.....</p>
                </div>
              </div>
              {[1, 1, 1, 1, 1].map((item, i) => (
                <div
                  className={` ${
                    i % 2 == 0 ? "self-end" : "self-start"
                  } "pb-5 w-auto"`}
                >
                  <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 text-white w-auto">
                    <p>Prompt who re you</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[12%] border-t text-white">
              <Input
                className="w-full h-full outline-none"
                placeholder="write prompt"
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}
        <div className="relative w-[10rem] cursor-pointer group">
          <Button
            variant={"outline"}
            className={"w-full h-[3-rem] gap-2 items-center"}
            onClick={() => handleBotRelease()}
          >
            <MessageCircle
              size={30}
              className="fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]"
            />
            <span className="text 2xl">Chat Bot</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
