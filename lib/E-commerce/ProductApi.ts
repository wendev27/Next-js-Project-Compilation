import { databases, storage } from "./appwriteEcommerce";
import { ID, Query } from "appwrite";
import { logAction } from "./LogsApi";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const PRODUCTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommercePT!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceBucket!;

export type Product = {
  $id?: string;
  name: string;
  price: number;
  description: string;
  sellerId: string;
  image: File | null; // file from input
};

export async function listProducts(): Promise<Product[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION
    );
    return response.documents as unknown as Product[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createProduct(payload: Product) {
  try {
    let imageUrl = "";

    // ✅ Upload image if provided
    if (payload.image) {
      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        payload.image
      );
      imageUrl = uploaded.$id;
    }

    // ✅ Create product document
    const response = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION,
      ID.unique(),
      {
        name: payload.name,
        price: payload.price,
        description: payload.description,
        sellerId: payload.sellerId,
        image: imageUrl,
      }
    );

    // ✅ Log action
    // await logAction(`Created product: ${payload.name}`);

    return response;
  } catch (error) {
    console.error("Error creating product with image:", error);
    throw error;
  }
}
