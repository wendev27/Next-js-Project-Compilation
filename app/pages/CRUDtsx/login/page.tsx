"use client";

import { loginWithGoogle } from "../../../../lib/CRUD/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
