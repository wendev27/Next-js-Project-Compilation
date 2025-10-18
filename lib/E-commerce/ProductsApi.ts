import { databases } from "./appwriteEcommerce";
import { ID, Query } from "appwrite";

import { logAction } from "./LogsApi";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const PRODUCTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommercePT!;

// comment and import tha LogsApi.ts
const LOGS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_Logs!;

// start of Product collections
export type Product = {
  $id?: string; //APrwirte document id
  name: string;
  price: number;
  description: string;
  ownerId: string;
};

// these are all the basic CRUD Functionalites for products
export async function listProducts(): Promise<Product[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION
    );
    return response.documents as unknown as Product[];
  } catch (error) {
    console.error("Error listing products:", error);
    throw error;
  }
}

export async function createProduct(payload: Product) {
  try {
    const product = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION,
      ID.unique(),
      payload
    );

    const log = {
      action: "create",
      productId: product.$id,
      userId: payload.ownerId,
    };

    // Log it
    await logAction(log);

    return product;
  } catch (error) {
    console.error("Error creating products: ", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  payload: Partial<Product>,
  userId: string
) {
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION,
      id,
      payload
    );

    const log = {
      action: "update",
      productId: id,
      userId: userId,
    };

    await logAction(log);

    return updated;
  } catch (error) {
    console.error("Error updating products: ", error);
    throw error;
  }
}

// export async function deleteItem(id: string) {
//   return await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION, id);

//   const log = {
//     action: "delete",
//     productId: id,
//     userId: product.ownerId,
//   };

//   await logAction("delete", id, ownerId);
// }

export async function deleteItem(id: string, userId: string) {
  try {
    await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION, id);

    const log = {
      action: "delete",
      productId: id,
      userId: userId,
    };

    await logAction(log);

    return { success: true };
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
}

// After these functions are all custom made for more functionalities

async function getUserProducts(userId: string) {
  try {
    return await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION, [
      Query.equal("ownerId", userId),
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// End for products table in appwrite

// Start of Logs
