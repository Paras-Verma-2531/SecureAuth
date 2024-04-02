"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import axiosConfig from "@/helpers/axiosHelper";
export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function onLogin() {
    try {
      setLoading(true);
      const response = await axiosConfig.post("/login",user);
      const { message, error } = response.data;
      if (error) toast.error(error);
      else {
        toast.success(message);
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
      });
    }
  }
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      {loading ? (
        <ClipLoader color="B4B4B8" loading={loading} size={40} />
      ) : (
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            buttonDisabled
              ? "cursor-not-allowed border-gray-200"
              : "cursor-pointer"
          }`}
        >
          Login
        </button>
      )}
      {!loading && <Link href="/signup">Visit Signup page</Link>}
    </div>
  );
}
