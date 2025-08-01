"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  userId: string;
  items: {
    _id: string;
    name: string;
    price: number;
    quantityInCart: number;
    image: string;
  }[];
  total: number;
  status: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdminOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) throw new Error("Unauthorized or Error fetching orders");
        const data = await res.json();
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message || "Failed to load admin orders");
      }
    }

    fetchAdminOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 All Orders (Admin)</h1>

      {error && <div className="text-red-500">{error}</div>}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <div><strong>Order ID:</strong> {order._id}</div>
            <div><strong>User ID:</strong> {order.userId}</div>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            Date: {new Date(order.createdAt).toLocaleString()}
          </div>

          <ul className="space-y-1">
            {order.items.map((item) => (
              <li key={item._id} className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                <span>{item.name} × {item.quantityInCart}</span>
                <span className="ml-auto">{item.price * item.quantityInCart}৳</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-between">
            <strong>Total:</strong> <span>{order.total}৳</span>
          </div>

          <div className="mt-1"><strong>Status:</strong> {order.status}</div>
        </div>
      ))}
    </div>
  );
}
