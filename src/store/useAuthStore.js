import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

// Helper to allow the persist `onRehydrateStorage` callback to update the store
// since that callback is defined outside the create() scope where `set` is available.
let setAuthStore;

export const useAuthStore = create(
  persist(
    (set, get) => {
  // capture the store's set function so onRehydrateStorage can use it
  setAuthStore = set;
  return {
      user: null,
      role: null,
      token: null,
      loading: false,
      ready: false, // when Zustand finishes restoring data

      signup: async (data) => {
        set({ loading: true });
        try {
          const res = await api.post("/auth/signup", data, { withCredentials: true });
          set({
            user: res.data.user,
            role: res.data.role,
            token: res.data.token,
            loading: false,
          });
          return { success: true, message: res.data.message };
        } catch (err) {
          set({ loading: false });
          return {
            success: false,
            message: err.response?.data?.message || "Signup failed",
          };
        }
      },

      login: async (data) => {
        set({ loading: true });
        try {
          const res = await api.post("/auth/login", data, { withCredentials: true });
          set({
            user: res.data.user,
            role: res.data.role,
            token: res.data.token,
            loading: false,
          });
          return { success: true, message: res.data.message };
        } catch (err) {
          set({ loading: false });
          return {
            success: false,
            message: err.response?.data?.message || "Login failed",
          };
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout", {}, { withCredentials: true });
        } catch {}
        set({ user: null, role: null, token: null });
      },

      isLoggedIn: () => !!get().token,
    };
    },
    {
      name: "auth-storage",
      getStorage: () => localStorage,

      // // ✅ guaranteed to fire when storage restored
      // onRehydrateStorage: () => (state, error) => {
      //   if (error) {
      //     console.error("❌ Zustand rehydrate error:", error);
      //   } else {
      //     console.log("✅ Zustand rehydrated successfully");
      //   }
      //   // mark as ready *after hydration* using the captured setter
      //   try {
      //     if (typeof setAuthStore === "function") {
      //       setAuthStore({ ready: true });
      //     }
      //   } catch (e) {
      //     console.error("Failed to set ready flag after rehydration:", e);
      //   }
      // },
    }
  )
);
