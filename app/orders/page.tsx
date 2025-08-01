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

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (orders.length === 0) return <div>You have no orders yet.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between mb-2">
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
            </div>
            <div className="mb-2 text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </div>

            <ul className="mb-2 space-y-1">
              {order.items.map((item) => (
                <li key={item._id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    {item.name} × {item.quantityInCart} = {item.price * item.quantityInCart}৳
                  </div>
                </li>
              ))}
            </ul>

            <div className="font-bold text-right">Total: {order.total}৳</div>
          </div>
        ))}
      </div>
    </div>
  );
}
