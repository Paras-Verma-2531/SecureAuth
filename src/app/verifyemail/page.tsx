"use client";
import axiosConfig from "@/helpers/axiosHelper";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function verifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const searchParams=useSearchParams()
  async function onButtonClick() {
    try {
      // make a call to the verifyemail API
      const response: any = await axiosConfig.post("/verifyemail", { token });
      const { message, error } = response.data;
      if (message) {
        toast.success("Account Verified");
        setVerified(true);
      }
      if (error) {
        toast.error("Invalid Token");
        setError(true);
      }
    } catch (error: any) {
      setError(true);
      toast.error(error.message);
    }
  }
  //useEffect
  useEffect(() => {
    //token fetching use core javascript concept
    // const urlToken = window.location.search.split("=")[1];
    // setToken(urlToken);
    if (typeof window !== 'undefined') {
    const urlToken=searchParams.get("token");
    setToken(urlToken||"")
    }
  }, []);
  useEffect(() => {
    if (token.length > 0) onButtonClick();
  }, [token]);
 return (
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
     <h1 className="text-4xl">Verify Email</h1>
     <h2 className="p-2 bg-orange-500 text-black">
       {token ? `${token}` : "no token"}
     </h2>

     {verified && (
       <div>
         <h2 className="text-2xl">Email Verified</h2>
         <Link href={"/login"}>Visit Login Page</Link>
       </div>
     )}
     {error && (
       <div>
         <h2 className="text-2xl bg-red-500 text-black">Error</h2>
       </div>
     )}
   </div>
 );
}
