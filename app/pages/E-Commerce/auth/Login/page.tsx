"use client";

import { loginWithGoogle } from "../../../../../lib/E-commerce/GoogleAuth/auth";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center py- bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl  text-black font-semibold text-center mb-6">
          Login
        </h1>

        {/* Email/Password Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border  text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
          >
            Sign in with Email
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span className=" text-black">Sign in with Google</span>
        </button>

        {/* Signup Redirect */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/pages/E-Commerce/auth/Register"
            className="text-amber-500 hover:underline"
          >
            Sign up
          </Link>
        </p>

        <p className="text-center text-gray-500 text-sm mt-6">
          Log in as{" "}
          <Link
            href="/pages/E-Commerce/Home"
            className="text-amber-500 hover:underline"
          >
            Employee
          </Link>
        </p>
      </div>
    </div>
  );
}
