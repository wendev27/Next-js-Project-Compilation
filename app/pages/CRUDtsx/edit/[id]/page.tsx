"use client";

import { useParams, useRouter } from "next/navigation"; // 👈 use next/navigation in App Router
import { useEffect, useState } from "react";
import { listItems, updateItem, Item } from "@/lib/api";

export default function EditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>(); // 👈 grab dynamic param
  const id = params.id;

  const [item, setItem] = useState<Item | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        // quick approach: fetch all and find the one with id
        const docs = await listItems();
        const found = docs.find((d) => d.$id === id);
        if (found) {
          setItem(found);
          setTitle(found.title);
          setDescription(found.description || "");
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      await updateItem(id, { title, description });
      router.push("/");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  if (!item) return <p>Loading item…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Item</h1>
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
