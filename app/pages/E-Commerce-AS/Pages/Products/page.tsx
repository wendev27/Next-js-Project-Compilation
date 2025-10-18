"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  listProducts,
  updateProduct,
  deleteItem,
} from "../../../../../lib/E-commerce/ProductsApi";
import { Product } from "../../../../../lib/E-commerce/ProductsApi";
import { ID } from "appwrite";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.$id!, form, editingProduct.ownerId);
      } else {
        await createProduct({
          ...form,
          ownerId: "admin", // replace this with actual logged-in user ID
        });
      }
      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteItem(id, "admin");
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    } else {
      setEditingProduct(null);
      setForm({ name: "", price: 0, description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-amber-700">Products</h1>
          <button
            onClick={() => openModal()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-amber-100 text-left text-sm font-semibold">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.$id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{product.name}</td>
                  <td className="p-3 border-b">₱{product.price}</td>
                  <td className="p-3 border-b">{product.description}</td>
                  <td className="p-3 border-b flex justify-center gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.$id!)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="border p-2 rounded"
              ></textarea>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                >
                  {editingProduct ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
