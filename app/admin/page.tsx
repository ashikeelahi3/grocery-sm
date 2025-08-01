"use client";

import { useState } from "react";

export default function AdminPage() {

  

  // Form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
  });

  // Handle input changes for controlled form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit product data to backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");

      setForm({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        image: "",
      });
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Admin: Add Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50"
              placeholder="e.g. Fresh Apples"
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={form.price}
                onChange={handleChange}
                required
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50"
                placeholder="e.g. 120"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          {/* Category and Image URL */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50"
                placeholder="e.g. Fruits"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none bg-gray-50 min-h-[80px]"
              placeholder="Product details, origin, etc."
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}