"use client";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  userId: string;
  name?: string;
  phone?: string;
  address?: string;
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
  const [filter, setFilter] = useState<"all" | "pending" | "delivered" | "cancelled">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setOrders(data.orders);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      await fetchOrders();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="mb-4">
        <select
          value={filter}
          aria-label="Filter orders"
          onChange={(e) => setFilter(e.target.value as any)}
          className="border rounded px-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {visibleOrders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded-lg">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>User ID:</strong> {order.userId}
          </p>
          <p>
            <strong>Name:</strong> {order.name || "N/A"}
          </p>
          <p>
            <strong>Contact:</strong> {order.phone || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {order.address || "N/A"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <ul className="my-2">
            {order.items.map((i) => (
              <li key={i._id} className="flex items-center gap-2">
                <img src={i.image} alt={i.name} className="w-8 h-8" />
                <span>
                  {i.name} × {i.quantityInCart}
                </span>
                <span className="ml-auto">
                  {i.price * i.quantityInCart}৳
                </span>
              </li>
            ))}
          </ul>

          <p>
            <strong>Total:</strong> {order.total}৳
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span><strong>Status:</strong></span>
            <select
              aria-label="Order Status"
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              disabled={updatingId === order._id}
              className="border px-2 py-1 rounded"
            >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {updatingId === order._id && <span>Updating...</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
