"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosConfig from "@/helpers/axiosHelper";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const getUserDetails=async ()=>
  {
     const response=await axiosConfig.get("/me");
     const userData=response.data.data;
     setData(userData._id)
  }
  const logout = async () => {
    try {
      await axiosConfig.get("/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
