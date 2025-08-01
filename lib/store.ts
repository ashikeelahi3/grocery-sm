import { create } from 'zustand'

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantityInCart: number;
};

type CartStore = {
  items: CartItem[];
  loadCart: (isLoggedIn: boolean) => Promise<void>;
  addToCart: (product: Product, isLoggedIn: boolean) => Promise<void>;
  removeFromCart: (_id: string) => void;
  clearCart: (isLoggedIn: boolean) => Promise<void>;
  updateCartItemQuantity: (_id: string, quantity: number, isLoggedIn: boolean) => Promise<void>;
  initializeCartFromLocalStorage: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  loadCart: async (isSignedIn: boolean) => {
    if (isSignedIn) {
      const res = await fetch("/api/cart");
      const serverCart: CartItem[] = res.ok ? (await res.json()).items : [];

      // Load guest cart (if exists)
      const guestCartString = typeof window !== "undefined" ? sessionStorage.getItem("guest-cart") : null;
      const guestCart: CartItem[] = guestCartString ? JSON.parse(guestCartString) : [];

      // Merge guest and server carts
      const merged: CartItem[] = [...serverCart];

      for (const guestItem of guestCart) {
        const existing = merged.find(i => i._id === guestItem._id);
        if (existing) {
          existing.quantityInCart += guestItem.quantityInCart;
        } else {
          merged.push(guestItem);
        }
      }

      // Save merged cart to server
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: merged }),
      });

      // Clear guest cart from sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("guest-cart");
      }

      set({ items: merged });
    } else {
      // Load from guest cart
      if (typeof window !== "undefined") {
        const local = sessionStorage.getItem("guest-cart");
        set({ items: local ? JSON.parse(local) : [] });
      }
    }
  },


  addToCart: async (item, isLoggedIn: boolean) => {
    const existing = get().items.find((i) => i._id === item._id);
    let updated: CartItem[];

    if (existing) {
      updated = get().items.map((i) =>
        i._id === item._id
          ? { ...i, quantityInCart: (i as CartItem).quantityInCart + item.quantity }
          : i
      );
    } else {
      updated = [...get().items, { ...item, quantityInCart: 1 }];
    }

    set({ items: updated });

    if (isLoggedIn) {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updated }),
      });
    } else {
      sessionStorage.setItem("guest-cart", JSON.stringify(updated));
    }
  },

  removeFromCart: (_id) => {
    set({
      items: get().items.filter((item) => item._id !== _id),
    });
  },

  clearCart: async (isLoggedIn: boolean) => {
    set({ items: [] });
    if (isLoggedIn) {
      await fetch("/api/cart", { method: "DELETE" });
    } else {
      sessionStorage.removeItem("guest-cart");
    }
  },
  updateCartItemQuantity: async (_id, quantity, isLoggedIn) => {
    const updated = get().items.map(item =>
      item._id === _id ? { ...item, quantityInCart: quantity } : item
    );

    set({ items: updated });

    if (isLoggedIn) {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updated }),
      });
    } else {
      sessionStorage.setItem("guest-cart", JSON.stringify(updated));
    }
  },


  initializeCartFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem("guest-cart");
      if (stored) {
        set({ items: JSON.parse(stored) });
      }
    }
  },
}));
