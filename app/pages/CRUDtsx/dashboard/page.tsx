"use client";

import { useEffect, useState } from "react";
import { account } from "../../../../lib/CRUD/appwrite";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const current = await account.get();
        setUser(current);
      } catch (err) {
        console.error("Not logged in", err);
      }
    }
    getUser();
  }, []);

  async function logout() {
    try {
      await account.deleteSession("current"); // end session like php
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  function goToMainPage() {
    try {
      window.location.href = "/pages/CRUDtsx";
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.$id}</p>
      <button
        onClick={goToMainPage}
        className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-red-700"
      >
        Main Page
      </button>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
