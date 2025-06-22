import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VerifiedIcon } from "lucide-react";
import React from "react";
import AccountVerificationForm from "./AccountVerificationForm";
import { useSelector } from "react-redux";
import { store } from "@/State/Store";

const InfoRow = ({ label, value }) => (
  <div className="flex">
    <p className="w-[9rem] font-medium text-gray-700">{label}:</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

const Profile = () => {
  const { auth } = useSelector((store) => store);

  const handleEnable2StepVerification = () => {
    console.log("2 step verification");
  };
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card className="border border-gray-200 shadow-md rounded-xl bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 text-lg font-semibold">
              Your Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <InfoRow label="Email" value={auth.user?.email} />
                <InfoRow label="Full Name" value={auth.user?.fullName} />
                <InfoRow label="Date of Birth" value="10/10/2001" />
                <InfoRow label="Nationality" value="Indian" />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                <InfoRow label="Mobile Number" value="+91 98765 43210" />
                <InfoRow label="Gender" value="Male" />
                <InfoRow label="PAN Number" value="ABCDE1234F" />
                <InfoRow label="Address" value="Ahmedabad, India" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {true ? (
                  <Badge className="bg-orange-500">Disabled</Badge>
                ) : (
                  <Badge className=" space-x-2 text-white bg-green-500">
                    <VerifiedIcon />
                    Enabled
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <DialogClose>
                      <Button className="bg-white text-black">
                        Enable Two step verification
                      </Button>
                    </DialogClose>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>Verify your account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm
                      auth={auth}
                      handleSubmit={handleEnable2StepVerification}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
