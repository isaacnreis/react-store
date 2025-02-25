import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (prodcutId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),
}));
