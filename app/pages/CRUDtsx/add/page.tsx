"use client"; // 👈 needed at the very top since you’re using hooks

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createItem } from "../../../../lib/CRUD/api";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createItem({ title, description });
      router.push("/");
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button disabled={saving} type="submit">
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
