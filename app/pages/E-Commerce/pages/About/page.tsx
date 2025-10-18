"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { storage } from "../../../../../lib/E-commerce/appwriteEcommerce";
import { ID } from "appwrite";

export default function ProductImageUploader() {
  const bucketId = "68db3a22003c3b171785"; // your bucket id
  const projectId = "68ceee36003a8626a21b"; // your Appwrite project id

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch all files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await storage.listFiles(bucketId);

        // Map files to public URLs
        const urls = result.files.map(
          (file) =>
            `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file.$id}/view?project=${projectId}`
        );

        setImages(urls);
      } catch (error) {
        console.error("Failed to list files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Upload to Appwrite
      const response = await storage.createFile(bucketId, ID.unique(), file);

      // Construct public image URL
      const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${response.$id}/view?project=${projectId}`;

      // Add new image to list
      setImages((prev) => [url, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Display all images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="w-32 h-32 relative">
            <Image
              src={src}
              alt={`Uploaded image ${index}`}
              fill
              className="object-cover rounded-lg border"
            />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        {uploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}
