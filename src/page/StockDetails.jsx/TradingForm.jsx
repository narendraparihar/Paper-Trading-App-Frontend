import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import symbolMap from "@/Utils/symbolMap";
const TradingForm = () => {
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState("BUY");
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState();
  const { coin, wallet, asset } = useSelector((store) => store);

  const dispatch = useDispatch();
  const calculateBuyCost = (amount, price) => {
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);

    return volume.toFixed(decimalPlaces);
  };

  useEffect(() => {
    if (coin?.coinDetails?.symbol) {
      setSymbol(coin.coinDetails.symbol);
      setLoading(false);
    }
  }, [coin]);

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails.symbol,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);
  const handleChange = (e) => {
    const amount = e.target.value;
    setAmount(e.target.value);
    const volume = calculateBuyCost(amount, coin.coinDetails?.lastPrice);
    setQuantity(volume);
  };
  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: { coinId: coin.coinDetails.symbol, quantity, orderType },
      })
    );
    alert("Transaction Successfull");
  };
  return (
    <>
      {" "}
      {loading ? (
        "Data Loading"
      ) : (
        <div className="space-y-10 p-5">
          <div>
            <div className="flex gap-4 items-center justify-between">
              <Input
                className="py-7 focus:outlibe-none"
                placeholder="Enter Amount..."
                onChange={handleChange}
                type="number"
                name="amount"
                value={amount}
              />
              <div>
                <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
                  {quantity}
                </p>
              </div>
            </div>
            {wallet.userWallet?.balance <
              calculateBuyCost(amount, coin.coinDetails?.lastPrice) && (
              <h1 className="text-red-600 text-center pt-4">
                Insuffiecient Wallet balance!
              </h1>
            )}
          </div>

          <div className="flex gap-5 items-center">
            <div className="flex gap-5 items-center">
              <div>
                <Avatar>
                  <AvatarImage src={symbolMap[symbol].image}></AvatarImage>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinDetails.symbol}</p>
                  <DotIcon className="text-gray-400" />
                  <p>{symbolMap[symbol].Name}</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {coin.coinDetails?.lastPrice}
                  </p>
                  <p className="text-red-600">
                    <span>{coin.coinDetails?.priceChange}</span>
                    <span>({coin.coinDetails?.priceChangePercent}%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>
              {orderType == "BUY" ? "Available Cash" : "Available Quantity"}
            </p>
            <p>
              {orderType == "BUY"
                ? wallet.userWallet?.balance
                : asset.assetDetails?.quantity || 0}
            </p>
          </div>
          <div>
            <Button
              onClick={handleBuyCrypto}
              className={`w-full py-6 ${
                orderType === "BUY"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {orderType}
            </Button>
            <Button
              onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
              variant="outline"
              className="w-full mt-5"
            >
              {orderType == "BUY" ? "Or Sell" : "Or Buy"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TradingForm;
