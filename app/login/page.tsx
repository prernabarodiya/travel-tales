"use client";
import Navbar from "@/components/Navbar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import google from "@/public/google.svg"
import Image from "next/image";
import { error } from "console";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();


  useEffect(() => {
    if (session) {
      router.push("/explore");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error(result.error);
      alert(result.error)
    } else {
      router.push("/");
    }
  };

  return (
    <div>

      <Navbar />
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-100 via-white to-pink-300  px-4">
        <div className="w-full max-w-md p-8 bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4 text-red-900">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-700 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </div>
          {/* Google Auth Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/explore" })}
            className="flex items-center justify-center space-x-2 w-full mt-4 rounded-xl
                       bg-pink-700 hover:bg-pink-600 text-white cursor-pointer"
          >
            <Image
              src={google}
              alt="Google logomark"
              width={25}
              height={25}
            />
            <span className="p-2">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
