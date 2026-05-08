import { create } from 'zustand';
import type { Dish } from '@domain/entities';

interface FavoritesState {
    favorites: Dish[];
    toggle: (dish: Dish) => void;
    isFavorite: (id: string) => boolean;
    clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
    favorites: [],
    isFavorite: (id) => get().favorites.some(d => d.id === id),
    toggle: (dish) => set((state) => {
        const exists = state.favorites.some(d => d.id === dish.id);
        return {
            favorites: exists
                ? state.favorites.filter(d => d.id !== dish.id)
                : [...state.favorites, dish],
        };
    }),
    clear: () => set({ favorites: [] }),
}));
