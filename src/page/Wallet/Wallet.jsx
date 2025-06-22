import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DialogHeader } from '@/components/ui/dialog'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon, UpdateIcon, WidthIcon } from "@radix-ui/react-icons";
import {
  CopyIcon,
  DollarSign,
  DollarSignIcon,
  ShuffleIcon,
  UploadIcon,
  WalletIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import TopupForm from "./TopupForm";
import Withdrawal from "../WithdrawalAdmin/Withdrawal";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { depositeMoney, getUserWallet } from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";
// import { Avatar } from "@radix-ui/react-avatar";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Wallet = () => {
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  useEffect(() => {
    if (orderId) {
      dispatch(
        depositeMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId,
          navigate,
        })
      );
    }
  }, [orderId, paymentId, razorpayPaymentId]);
  useEffect(() => {
    handleFetchUserWallet();
  }, []);
  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };
  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div>
                <WalletIcon size={30} />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-sm">
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon
                      size={15}
                      className="cursor-pointer hover:text-slate-300"
                    />
                  </div>
                </div>
              </div>
              <ReloadIcon
                onClick={handleFetchUserWallet}
                className="w-6 h-6 cursor-pointer hover:text-gray-400"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSignIcon />
              <span className="text-2xl font-semibold">
                {wallet.userWallet.balance}
              </span>
            </div>
            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                   flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md"
                  >
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Top up your wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

              <Dialog className="text-white">
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                   flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md"
                  >
                    <WidthIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                   flex flex-col items-center justify-center  rounded-md shadow-slate-800 shadow-md"
                  >
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Transfer to other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        {/* <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400"></UpdateIcon>
          </div>
        </div>
        <div className="space-y-5">
          {[1, 1, 1, 1, 1].map((item, i) => (
            <Card key={i} className="flex justify-between px-5 py-2">
              <div className="flex justify-between items-center gap-5">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0 pl-5">
                    <h1>Buy Asset</h1>
                    <p className="text-sm text-gray-500">2025-14-06</p>
                  </div>
                </div>
                <div>
                  <p className="text-green-600 ">999 USD</p>
                </div>
              </div>
            </Card>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Wallet;
