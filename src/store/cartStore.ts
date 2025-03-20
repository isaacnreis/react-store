import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Omit<Product, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (prodcutId: number) => void;
  clearCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  priceFilter: { min: number; max: number };
  setPriceFilter: (min: number, max: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),

  categoryFilter: "",
  setCategoryFilter: (category) => set({ categoryFilter: category }),

  priceFilter: { min: 0, max: 1000 },

  setPriceFilter: (min, max) => set({ priceFilter: { min, max } }),
}));
