"use client"; // specifically to state that it is frontend part and needs to be rendered on browser
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  async function onSignup() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      const { message, error } = response.data;
      if (error) toast.error(error);
      else {
        toast.success(message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
        username: "",
      });
    }
  }
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
          onClick={onSignup}
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            buttonDisabled ? "cursor-not-allowed border-gray-200" : "cursor-pointer"
          }`}
        >
          Signup
        </button>
      )}
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}
