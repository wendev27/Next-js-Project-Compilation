"use client";

// import { useEffect, useState } from "react";
// import { databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const REVIEWS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommerceReviews!;

type Review = {
  $id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [form, setForm] = useState({
    productId: "",
    userId: "",
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        REVIEWS_COLLECTION
      );
      setReviews(res.documents as unknown as Review[]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
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
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await databases.updateDocument(
          DATABASE_ID,
          REVIEWS_COLLECTION,
          editingReview.$id!,
          form
        );
      } else {
        await databases.createDocument(
          DATABASE_ID,
          REVIEWS_COLLECTION,
          ID.unique(),
          {
            ...form,
            createdAt: new Date().toISOString(),
          }
        );
      }
      fetchReviews();
      closeModal();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, REVIEWS_COLLECTION, id);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const openModal = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      setForm({
        productId: review.productId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
      });
    } else {
      setEditingReview(null);
      setForm({ productId: "", userId: "", rating: 0, comment: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-amber-700">Reviews</h1>
          <button
            onClick={() => openModal()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
          >
            + Add Review
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-amber-100 text-left text-sm font-semibold">
                <th className="p-3 border-b">Product ID</th>
                <th className="p-3 border-b">User ID</th>
                <th className="p-3 border-b">Rating</th>
                <th className="p-3 border-b">Comment</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.$id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{r.productId}</td>
                  <td className="p-3 border-b">{r.userId}</td>
                  <td className="p-3 border-b text-center">{r.rating} ⭐</td>
                  <td className="p-3 border-b">{r.comment}</td>
                  <td className="p-3 border-b flex justify-center gap-2">
                    <button
                      onClick={() => openModal(r)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.$id!)}
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
              {editingReview ? "Edit Review" : "Add Review"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="productId"
                value={form.productId}
                onChange={handleChange}
                placeholder="Product ID"
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="User ID"
                required
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="rating"
                min={1}
                max={5}
                value={form.rating}
                onChange={handleChange}
                placeholder="Rating (1-5)"
                required
                className="border p-2 rounded"
              />
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Comment"
                rows={3}
                required
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
                  {editingReview ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
