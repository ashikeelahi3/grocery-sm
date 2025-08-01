'use client';

import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function CheckoutPage() {
  const { isSignedIn } = useAuth();
  const { items, clearCart } = useCartStore();

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // UI states
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantityInCart,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null); // Reset error on new submit

    if (!name || !phone || !address) {
      alert('Please fill all fields');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!isSignedIn) {
      alert('You must be signed in to place an order');
      return;
    }

    setLoading(true);

    try {
      // Send order data to API
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          items,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to place order');
      }

      // On success
      setSuccess(true);
      clearCart(!!isSignedIn);

      // Optional: reset form fields
      setName('');
      setPhone('');
      setAddress('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {success ? (
        <div className="bg-green-100 text-green-700 p-4 rounded">
          ✅ Order placed successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              aria-label="Full Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              aria-label="Phone Number"
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              aria-label="Shipping Address"
              className="w-full border p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold mb-2">Cart Summary</h2>
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Cart is empty.</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-1">
                {items.map((item) => (
                  <li key={item._id}>
                    {item.name} × {item.quantityInCart} ={' '}
                    {item.price * item.quantityInCart}৳
                  </li>
                ))}
              </ul>
            )}
            <div className="font-bold text-right mt-2">Total: {total}৳</div>
          </div>

          {error && (
            <div className="text-red-600 font-semibold">{error}</div>
          )}

          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </form>
      )}
    </div>
  );
}
