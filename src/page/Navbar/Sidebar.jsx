import {
  ActivityLogIcon,
  BookmarkIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  CreditCardIcon,
  LandmarkIcon,
  Wallet,
  Wallet2Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/State/Auth/Action";
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },
  {
    name: "WatchList",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <ExitIcon className="h-6 w-6" />,
  },
];
export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="mt-10 space-y-5">
      {menu.map((item, index) => (
        <div key={index}>
          <SheetClose className="w-full">
            <Button
              className="w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl  text-white hover:bg-gray-700 shadow transition-all duration-200 h-[3%]"
              onClick={() => {
                navigate(item.path);
                if (item.name == "Logout") {
                  handleLogout();
                }
              }}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
              <p className="text-base font-medium">{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};
