'use client';

import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantityInCart,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert('Please fill all fields');
      return;
    }

    // 🔐 Later: Send order to backend here
    console.log({
      name,
      phone,
      address,
      items,
      total,
    });

    clearCart();
    setSuccess(true);
  };

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
              aria-label='Full Name'
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              aria-label='Phone Number'
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              aria-label='Shipping Address'
              className="w-full border p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
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
            <div className="font-bold text-right mt-2">
              Total: {total}৳
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}
