'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            _id={product._id}
          />
        ))}
      </div>
    </main>
  );
}
