"use client";

import { useState } from "react";
import { LogOut, Package, ShoppingCart, FileText, Star } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "logs", label: "Logs", icon: FileText },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-amber-700 mb-6">
            Admin Dashboard
          </h1>

          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 mt-6">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab}</h2>

        {/* Content based on active tab */}
        {activeTab === "logs" && <LogsTable />}
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "products" && <ProductsTable />}
        {activeTab === "reviews" && <ReviewsTable />}
      </main>
    </div>
  );
}

/* 👇 Dummy components for now – replace later with actual data tables */

function LogsTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Recent Logs</h3>
      <p className="text-gray-500 text-sm">No logs available yet.</p>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Orders Summary</h3>
      <p className="text-gray-500 text-sm">No orders found.</p>
    </div>
  );
}

function ProductsTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Product List</h3>
      <p className="text-gray-500 text-sm">No products available.</p>
    </div>
  );
}

function ReviewsTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Customer Reviews</h3>
      <p className="text-gray-500 text-sm">No reviews yet.</p>
    </div>
  );
}
