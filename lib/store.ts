import { create } from 'zustand';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItem = Product & { quantityInCart: number };

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const existing = get().items.find((item) => item._id === product._id);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item._id === product._id
            ? { ...item, quantityInCart: item.quantityInCart + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...get().items, { ...product, quantityInCart: 1 }],
      });
    }
  },
  removeFromCart: (_id) => {
    set({
      items: get().items.filter((item) => item._id !== _id),
    });
  },
  clearCart: () => set({ items: [] }),
}));
