"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>

      <Navbar/>
    <div className="flex min-h-screen items-center justify-center  bg-gradient-to-br from-blue-100 via-white to-pink-300  px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-red-900">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
         {/* Google Auth Button */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex items-center justify-center space-x-2 w-full mt-4 rounded-md
               bg-pink-700 hover:bg-pink-600 text-white cursor-pointer"
              >
                {/* <Image
                  src="/google.svg"
                  alt="google logomark"
                  width={25}
                  height={25}
                /> */}
                <span className="p-2  ">Continue with Google</span>
              </button>
      </div>
    </div>
    </div>
  );
}
