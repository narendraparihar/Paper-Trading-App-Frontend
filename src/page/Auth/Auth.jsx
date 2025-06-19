import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Signinform from "./Signinform";
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="relative w-full h-screen authContainer">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col justify-center items-center h-[35rem] w-[30rem]
               rounded-md bg-black/50 backdrop-blur-xs shadow-2xl shadow-white"
      >
        <h1 className="text-6xl font-bold pb-9">
          <span className="text-green-500">Safe</span> Trades
        </h1>
        {location.pathname == "/signup" ? (
          <section className="w-full">
            <SignupForm />
            <div className="flex items-center justify-center">
              <span>have already account?</span>
              <Button onClick={() => navigate("/signin")}>Signin</Button>
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          <section className="w-full">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center">
              <span>back to login?</span>
              <Button onClick={() => navigate("/signin")} variant="ghost">
                Sign in
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <Signinform />
            <div className="flex items-center justify-center">
              <span>Don't have account?</span>
              <Button onClick={() => navigate("/signup")} variant="ghost">
                Sign Up
              </Button>
            </div>
            <div className="flex items-center justify-center">
              {/* <span>Don't have account?</span> */}
              <Button
                className="w-[50%] mt-5 py-5"
                onClick={() => navigate("/forgot-password")}
                variant="outline"
              >
                Forgot Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
