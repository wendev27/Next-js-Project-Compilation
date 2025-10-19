"use client"; // 👈 needed since you’re using useState/useEffect

import { useEffect, useState } from "react";
import Link from "next/link";
import { listItems, deleteItem, Item } from "../../../lib/CRUD/api";

import { account } from "../../../lib/CRUD/appwrite";
import type { Models } from "appwrite";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // after importing the account make sure you make a usestate for the account
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    load();
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const current = await account.get(); // check current session
      setUser(current);
    } catch (error) {
      setUser(null);
    }
  }

  async function load() {
    setLoading(true);
    try {
      const docs = await listItems();
      setItems(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.$id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  console.log("Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
  console.log("Project:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <Link href="/pages/CRUDtsx/dashboard">Check+ Account</Link>
      ) : (
        <Link href="/pages/CRUDtsx/login">Login Account</Link>
      )}

      <h1 className="text-amber-600">Items</h1>
      <Link href="/pages/CRUDtsx/add">Add item</Link>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.$id}>
              <strong>{item.title}</strong>
              <div>{item.description}</div>
              <Link href={`/pages/edit/${item.$id}`}>Edit</Link>
              {" | "}
              <button onClick={() => handleDelete(item.$id!)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
