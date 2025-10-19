import { databases } from "./appwriteEcommerce";
import { ID, Query } from "appwrite";
import { logAction } from "./LogsApi"; // ✅ Import LogsApi

// ✅ Environment variables
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const PRODUCTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommercePT!;
const LOGS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_Logs!; // optional if used inside LogsApi

// ✅ Product type
export type Product = {
  $id?: string; // Appwrite document ID
  name: string;
  price: number;
  description: string;
  ownerId: string;
};

// ✅ List all products
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

// ✅ Create new product + log
export async function createProduct(payload: Product) {
  try {
    const product = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION,
      ID.unique(),
      payload
    );

    await logAction({
      action: "create",
      productId: product.$id,
      userId: payload.ownerId,
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// ✅ Update product + log
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

    await logAction({
      action: "update",
      productId: id,
      userId,
    });

    return updated;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// ✅ Delete product + log
export async function deleteItem(id: string, userId: string) {
  try {
    await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION, id);

    await logAction({
      action: "delete",
      productId: id,
      userId,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// ✅ Get all products belonging to one user
export async function getUserProducts(userId: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION,
      [Query.equal("ownerId", userId)]
    );
    return response.documents as unknown as Product[];
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
}
