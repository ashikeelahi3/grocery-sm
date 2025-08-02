"use client";

import { useEffect, useState, useRef } from "react";

// Types
type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantityInCart: number;
  image: string;
};

type Order = {
  _id: string;
  userId: string;
  name?: string;
  phone?: string;
  address?: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "delivered" | "cancelled">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Setup WebSocket URL depending on protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://${window.location.host}/ws`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // Check message type (customize as per your backend message format)
        if (msg.type === "order_update" && msg.order) {
          const updatedOrder: Order = msg.order;
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o._id === updatedOrder._id ? { ...o, status: updatedOrder.status } : o
            )
          );
        } else if (msg.type === "new_order" && msg.order) {
          const newOrder: Order = msg.order;
          setOrders((prevOrders) => [newOrder, ...prevOrders]);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on unmount
    return () => {
      ws.current?.close();
    };
  }, []);

  // Update order status via API (with optimistic UI)
  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    // Optimistically update UI
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));

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
      // You can optionally fetch orders here to sync again, but WS should handle it
    } catch (e: any) {
      alert(e.message);
      await fetchOrders(); // rollback on error
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter orders based on selected filter
  const visibleOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders Dashboard</h1>

      <div className="mb-6 flex justify-center">
        <label htmlFor="filter" className="mr-2 font-semibold self-center">
          Filter Orders:
        </label>
        <select
          id="filter"
          value={filter}
          aria-label="Filter orders"
          onChange={(e) => setFilter(e.target.value as any)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 mb-6 text-center font-medium">{error}</div>
      )}

      {visibleOrders.length === 0 && (
        <div className="text-center text-gray-600 font-medium">
          No orders found for the selected filter.
        </div>
      )}

      <div className="space-y-6">
        {visibleOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            aria-live="polite"
          >
            <div className="flex justify-between mb-3 flex-wrap gap-2">
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>User ID:</strong> {order.userId}
                </p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Name:</strong> {order.name || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {order.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {order.address || "N/A"}
                </p>
              </div>
            </div>

            <p className="mb-2 text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>

            <ul className="mb-4 space-y-2 border-t border-b py-2">
              {order.items.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-4 border-b last:border-none pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-grow font-medium">{item.name}</div>
                  <div>
                    {item.quantityInCart} × {item.price}৳ ={" "}
                    <span className="font-semibold">
                      {item.price * item.quantityInCart}৳
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total: {order.total}৳</p>

              <div className="flex items-center gap-3">
                <label htmlFor={`status-${order._id}`} className="font-semibold">
                  Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  aria-label="Change order status"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  disabled={updatingId === order._id}
                  className={`border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                    ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                  `}
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {updatingId === order._id && (
                  <span className="text-gray-600 italic">Updating...</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
