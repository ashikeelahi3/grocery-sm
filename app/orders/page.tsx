"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantityInCart: number;
  image: string;
};

type Order = {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // poll every 15 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (orders.length === 0) return <div>You have no orders yet.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Order History</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-6 bg-white"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-mono text-sm text-gray-600">
                <strong>Order ID:</strong> {order._id}
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "delivered"
                    ? "bg-green-200 text-green-800"
                    : order.status === "cancelled"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="mb-2 text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </div>

            <ul className="mb-4 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-grow font-medium">{item.name}</div>
                  <div className="font-semibold">
                    {item.quantityInCart} × {item.price}৳ ={" "}
                    {item.price * item.quantityInCart}৳
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right font-bold text-lg">
              Total: {order.total}৳
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
