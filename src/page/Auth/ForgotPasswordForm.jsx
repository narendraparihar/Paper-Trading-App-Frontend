import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config/api";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState();
  const form = useForm({
    resolver: "",
    defaultValues: {
      Email: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/reset-password/send-otp`, {
      email: data.Email,
    });

    setSession(res.data.session);
    setMessage(res.data.message);
    alert("OTP Sent Successfully");
    // setToggleOTP(true);
  };
  return (
    <div className="px-10 py-2">
      <h1 className="text-xl font-bold text-center mb-5">Forgot Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter mail"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full py-5 bg-white text-black">Submit</Button>{" "}
        </form>
      </Form>
      {session != null && <ResetPasswordForm session={session} />}
    </div>
  );
};

const ResetPasswordForm = ({ session }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const resetPassword = async () => {
    const res = await axios.post(`${API_BASE_URL}/reset-password/verify`, {
      session,
      otp,
      newPassword,
    });

    setMsg(res.data);
    navigate("/signin");
  };

  return (
    <div>
      <h3>Enter OTP and New Password</h3>
      <input onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
      <input
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={resetPassword}>Reset Password</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
