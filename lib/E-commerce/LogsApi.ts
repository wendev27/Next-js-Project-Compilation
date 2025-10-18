import { databases } from "./appwriteEcommerce";
import { ID, Query } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const LOGS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_Logs!;

export type Logs = {
  $id?: string; // APPwrite document id
  action: string;
  productId: string;
  userId: string;
};

// Get logs
export async function getLogs(userId?: string) {
  const queries = userId ? [Query.equal("userId", userId)] : [];
  const response = await databases.listDocuments(
    DATABASE_ID,
    LOGS_COLLECTION,
    queries
  );
  return response.documents;
}

// Log helper
export async function logAction(payload: Logs) {
  await databases.createDocument(
    DATABASE_ID,
    LOGS_COLLECTION,
    ID.unique(),
    payload
  );
}
