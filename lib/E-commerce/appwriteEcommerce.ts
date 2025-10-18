import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // ✅ use the correct variable
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
