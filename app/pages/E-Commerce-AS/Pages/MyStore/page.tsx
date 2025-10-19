"use client";

import { useEffect, useState } from "react";
import { Client, Databases, Storage, ID, Models } from "appwrite";
import Image from "next/image";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const STORE_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommerceStore!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceBucket!;

type StoreDocument = Models.Document & {
  name: string;
  description: string;
  address: string;
  contact: string;
  hours: string;
  logoUrl?: string;
};

export default function StorePage() {
  const [store, setStore] = useState<StoreDocument | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    contact: "",
    hours: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          STORE_COLLECTION
        );
        if (res.documents.length > 0) {
          const doc = res.documents[0] as unknown as StoreDocument;

          setStore(doc);
          setForm({
            name: doc.name,
            description: doc.description,
            address: doc.address,
            contact: doc.contact,
            hours: doc.hours,
          });
        }
      } catch (err) {
        console.error("Failed to fetch store:", err);
      }
    };
    fetchStore();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let logoUrl = store?.logoUrl;

      if (logo) {
        const upload = await storage.createFile(BUCKET_ID, ID.unique(), logo);
        logoUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
      }

      if (store) {
        await databases.updateDocument(
          DATABASE_ID,
          STORE_COLLECTION,
          store.$id,
          {
            ...form,
            logoUrl,
          }
        );
      } else {
        await databases.createDocument(
          DATABASE_ID,
          STORE_COLLECTION,
          ID.unique(),
          {
            ...form,
            logoUrl,
            ownerId: "admin",
          }
        );
      }

      alert("✅ Store details saved successfully!");
    } catch (err) {
      console.error("Failed to save store:", err);
      alert("❌ Failed to save store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🏪 Store Management</h1>

      <div className="flex flex-col items-center mb-6">
        {store?.logoUrl ? (
          <Image
            src={store.logoUrl}
            alt="Store Logo"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center">
            No Logo
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="mt-4"
          onChange={handleLogoChange}
        />
      </div>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="hours"
          placeholder="Business Hours"
          value={form.hours}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
