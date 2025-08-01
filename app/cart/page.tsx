'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantityInCart,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.quantityInCart} × {item.price}৳
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6">
            <div className="text-xl font-bold text-right">
              Total: {total}৳
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="inline-block mt-6 text-blue-600 hover:underline text-sm"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}
