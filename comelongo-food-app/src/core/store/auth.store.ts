import { create } from 'zustand';
import { MockDataService } from '@infrastructure/services';
import type { User } from '@domain/entities';

interface AuthState {
    user: User | null;
    hasOnboarded: boolean;
    login: (email: string, _password: string) => Promise<void>;
    register: (name: string, email: string, _password: string) => Promise<void>;
    logout: () => void;
    completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    hasOnboarded: false,
    completeOnboarding: () => set({ hasOnboarded: true }),
    login: async (email) => {
        const user = { ...MockDataService.currentUser(), email };
        set({ user });
    },
    register: async (name, email) => {
        const base = MockDataService.currentUser();
        set({ user: { ...base, name, email, handle: '@' + name.toLowerCase().replace(/\s+/g, '.') } });
    },
    logout: () => set({ user: null }),
}));
