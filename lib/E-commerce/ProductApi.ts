import { databases, storage } from "./appwriteEcommerce";

import { ID, Query } from "appwrite";

import { logAction } from "./LogsApi";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const PRODUCTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommercePT!;

export type Product = {
  $id?: string;
  name: string;
  price: number;
  description: string;
  sellerId: string;
  image: unknown;
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
    
    const uploaded = await 

  } catch (error) {
    console.error("Error on creating product with image", error);
    throw error;
  }
}
