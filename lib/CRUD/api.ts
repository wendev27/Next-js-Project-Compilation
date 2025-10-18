import { databases } from "./appwrite";
import { ID } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION!;

export type Item = {
  $id?: string; //APrwirte document id
  title: string;
  description?: string;
};

export async function listItems(): Promise<Item[]> {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
  return res.documents as unknown as Item[];
}

export async function createItem(payload: Item) {
  return databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    payload
  );
}

export async function updateItem(id: string, payload: Partial<Item>) {
  return databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
}

export async function deleteItem(id: string) {
  return databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
}
