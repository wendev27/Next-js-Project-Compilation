// Example: upload file and make it public
import { Client, Storage, ID, Permission, Role } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const storage = new Storage(client);

// fileInput is from e.g. <input type="file" /> or FormData
await storage.createFile(
  "BUCKET_ID",
  ID.unique(),
  fileInput,
  [Permission.read(Role.any())] // public read
);

const imageUrl = storage.getFilePreview(
  "68db3a22003c3b171785",
  "68db4c40001373903549"
);
