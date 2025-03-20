import { create } from "zustand";

interface FavoriteProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discount?: string;
  oldPrice?: number;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface FavoritesState {
  favorites: FavoriteProduct[];
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),

  toggleFavorite: (product) => {
    const { favorites } = get();
    const isFav = favorites.some((fav) => fav.id === product.id);
    const updatedFavorites = isFav
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];

    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  },

  isFavorite: (id) => get().favorites.some((fav) => fav.id === id),
}));
