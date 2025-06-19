import React, { Component } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ColorWheelIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { store } from "@/State/Store";
const Navbar = () => {
  const { auth } = useSelector((store) => store);

  return (
    <div className="px-2 py-3 border-b z-50 bg-gray-900 text-white sticky top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet className="bg-gray-800 text-white">
          <SheetTrigger>
            {/* <Button variant="ghost" size="icon" className="rounded-full h-11 w-11"> */}
            <DragHandleHorizontalIcon className="h-7 w-7" />
            {/* </Button> */}
          </SheetTrigger>
          <SheetContent
            className="w-72 border-r-0 flex flex-col justify-center  bg-gray-900 text-white"
            side="left"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/crypto bnb.png" />
                  </Avatar>
                  <div>
                    {" "}
                    <span className="font-bold text-green-700">Safe</span> Trade
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <p className="text-sm lg:text-base cursor-pointer">Safe Trade</p>
        <div className="p-0 ml-9">
          <Button variant="outline" className="flex items-center gap-3">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div className="text-2xl">
        <Avatar>
          <AvatarFallback>
            {auth.user?.fullName?.[0].toUpperCase() || "K"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
