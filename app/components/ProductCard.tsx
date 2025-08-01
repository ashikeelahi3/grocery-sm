import { useCartStore } from '@/lib/store';
type ProductProps = {
  name: string;
  price: number;
  image: string;
  description: string;
  _id: string;
};

export default function ProductCard({ name, price, image, description, ...rest }: ProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="mt-2 font-bold text-green-600">{price}৳</div>
      <button
        onClick={() => {
          addToCart({ name, price, image, _id: rest._id, quantity: 1 })
          console.log(`Added ${name} to cart`);
        }}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
}
