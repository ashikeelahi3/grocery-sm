import { useCartStore } from '@/lib/store';
import { useUser } from '@clerk/nextjs';  // <-- import useUser hook

type ProductProps = {
  name: string;
  price: number;
  image: string;
  description: string;
  _id: string;
};

type CartProduct = ProductProps & {
  quantityInCart: number;
  quantity: number;
};

export default function ProductCard({ name, price, image, description, _id }: ProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { isSignedIn = false } = useUser();  // <-- get sign-in status

  const handleAddToCart = () => {
    const product: CartProduct = {
      _id,
      name,
      price,
      image,
      description,
      quantityInCart: 1,
      quantity: 1, // Default to 1 when adding to cart
    };

    // Pass isSignedIn boolean to the store function!
    addToCart(product, isSignedIn);
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="mt-2 font-bold text-green-600">{price}৳</div>
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
