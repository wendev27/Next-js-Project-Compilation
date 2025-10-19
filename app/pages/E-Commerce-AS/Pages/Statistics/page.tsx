"use client";

import { useEffect, useState } from "react";
import { Client, Databases, Models } from "appwrite";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

// ✅ Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

// ✅ Constants
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_EcommerceDB!;
const PRODUCTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommercePT!;
const ORDERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommerceOrders!;
const REVIEWS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_EcommerceReviews!;
const LOGS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_Logs!;

// ✅ Define types
interface MonthlyOrderData {
  month: string;
  orders: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface Stats {
  products: number;
  orders: number;
  reviews: number;
  logs: number;
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    orders: 0,
    reviews: 0,
    logs: 0,
  });

  const [orderData, setOrderData] = useState<MonthlyOrderData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const [productsRes, ordersRes, reviewsRes, logsRes] = await Promise.all(
          [
            databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION),
            databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION),
            databases.listDocuments(DATABASE_ID, REVIEWS_COLLECTION),
            databases.listDocuments(DATABASE_ID, LOGS_COLLECTION),
          ]
        );

        setStats({
          products: productsRes.total,
          orders: ordersRes.total,
          reviews: reviewsRes.total,
          logs: logsRes.total,
        });

        // ✅ Mock data for charts
        setOrderData([
          { month: "Jan", orders: 20 },
          { month: "Feb", orders: 35 },
          { month: "Mar", orders: 40 },
          { month: "Apr", orders: 25 },
          { month: "May", orders: 50 },
          { month: "Jun", orders: 45 },
          { month: "Jul", orders: 60 },
          { month: "Aug", orders: 30 },
          { month: "Sep", orders: 55 },
          { month: "Oct", orders: 70 },
          { month: "Nov", orders: 80 },
          { month: "Dec", orders: 90 },
        ]);

        setCategoryData([
          { name: "Food", value: 45 },
          { name: "Drinks", value: 30 },
          { name: "Desserts", value: 15 },
          { name: "Add-ons", value: 10 },
        ]);
      } catch (error) {
        console.error("Error loading statistics:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

  // ✅ Properly typed Pie label
  const renderPieLabel = (props: PieLabelRenderProps): string => {
    const { name, percent } = props;
    if (!name || percent === undefined) return "";
    return `${name} ${((percent as number) * 100).toFixed(0)}%`;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-amber-700">
        📊 Statistics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Products",
            value: stats.products,
            color: "bg-amber-100 text-amber-700",
          },
          {
            title: "Orders",
            value: stats.orders,
            color: "bg-blue-100 text-blue-700",
          },
          {
            title: "Reviews",
            value: stats.reviews,
            color: "bg-green-100 text-green-700",
          },
          {
            title: "Logs",
            value: stats.logs,
            color: "bg-red-100 text-red-700",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`rounded-xl p-6 text-center font-semibold shadow-md ${card.color}`}
          >
            <h2 className="text-lg mb-2">{card.title}</h2>
            <p className="text-3xl">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Product Category Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🍔 Product Category Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={
                categoryData as unknown as Record<string, string | number>[]
              }
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={renderPieLabel}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
