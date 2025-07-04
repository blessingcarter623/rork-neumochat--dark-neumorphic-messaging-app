import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      initialize: () => {
        // This will be called after hydration to set loading to false
        const state = get();
        set({ 
          isLoading: false,
          isAuthenticated: !!state.token && !!state.user 
        });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // For development, simulate a successful login
          // Replace with your actual API endpoint
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: "1",
            name: "Marcus Johnson",
            email: email,
            phone: "+27 123 456 789",
            bio: "Entrepreneur, mentor, and community builder passionate about economic empowerment.",
          };
          
          const mockToken = "mock-jwt-token-" + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name: string, email: string, phone: string, password: string) => {
        set({ isLoading: true });
        try {
          // For development, simulate a successful registration
          // Replace with your actual API endpoint
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: "1",
            name: name,
            email: email,
            phone: phone,
            bio: "New member of the Amatyma community.",
          };
          
          const mockToken = "mock-jwt-token-" + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (updates: Partial<User>) => {
        const { user, token } = get();
        if (!user || !token) return;

        try {
          // For development, simulate a successful update
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({
            user: { ...user, ...updates },
          });
        } catch (error) {
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Initialize after hydration is complete
        if (state) {
          state.initialize();
        }
      },
    }
  )
);