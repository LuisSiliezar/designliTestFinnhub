import { create } from 'zustand';

export type SocialPlatform = 'instagram' | 'tiktok' | 'x';

interface ReviewDraftState {
    photoUri: string | null;
    dishName: string;
    restaurantName: string;
    score: number;
    note: string;
    location: string;
    sharedTo: SocialPlatform[];
    setPhoto: (uri: string | null) => void;
    setDishName: (v: string) => void;
    setRestaurantName: (v: string) => void;
    setScore: (s: number) => void;
    setNote: (v: string) => void;
    setLocation: (v: string) => void;
    toggleShare: (p: SocialPlatform) => void;
    reset: () => void;
}

const initial = {
    photoUri: null,
    dishName: '',
    restaurantName: '',
    score: 8.0,
    note: '',
    location: '',
    sharedTo: [] as SocialPlatform[],
};

export const useReviewDraftStore = create<ReviewDraftState>()((set) => ({
    ...initial,
    setPhoto: (uri) => set({ photoUri: uri }),
    setDishName: (v) => set({ dishName: v }),
    setRestaurantName: (v) => set({ restaurantName: v }),
    setScore: (s) => set({ score: s }),
    setNote: (v) => set({ note: v }),
    setLocation: (v) => set({ location: v }),
    toggleShare: (p) => set((state) => ({
        sharedTo: state.sharedTo.includes(p)
            ? state.sharedTo.filter(x => x !== p)
            : [...state.sharedTo, p],
    })),
    reset: () => set(initial),
}));
