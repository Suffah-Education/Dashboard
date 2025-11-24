import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

// IMPORTANT — Allow persist rehydrate to call set later
let setAuthStore;

export const useAuthStore = create(
  persist(
    (set, get) => {
      setAuthStore = set;

      return {
        user: null,
        role: null,
        token: null,
        loading: false,
        ready: false,

        // ⭐ NEW: required for Razorpay
        setUser: (updatedUser) => set({ user: updatedUser }),

        signup: async (data) => {
          set({ loading: true });
          try {
            const res = await api.post("/auth/signup", data, {
              withCredentials: true,
            });

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
            const res = await api.post("/auth/login", data, {
              withCredentials: true,
            });

            set({
              user: res.data.user,
              role: res.data.role,
              token: res.data.token,
              loading: false,
            });

            return { success: true, message: res.data.message };
          } catch (err) {
            set({ loading: false });

            // teacher not approved logic
            if (
              err.response?.status === 403 &&
              err.response?.data?.underReview
            ) {
              return {
                success: false,
                underReview: true,
                message:
                  err.response?.data?.message ||
                  "Your account is under review.",
              };
            }

            return {
              success: false,
              message: err.response?.data?.message || "Login failed",
            };
          }
        },

        // ==========================
        //     UPDATE PROFILE
        // ==========================
        updateProfile: async (data) => {
          set({ loading: true });
          try {
            const res = await api.put("/auth/update-profile", data, {
              withCredentials: true,
            });

            set({
              user: res.data.user,
              loading: false,
            });

            return { success: true, message: res.data.message };
          } catch (err) {
            set({ loading: false });
            return {
              success: false,
              message: err.response?.data?.message || "Profile update failed",
            };
          }
        },

        // ==========================
        //     CHANGE PASSWORD
        // ==========================
        changePassword: async (data) => {
          try {
            const res = await api.post("/auth/change-password", data, {
              withCredentials: true,
            });
            return { success: true, message: res.data.message };
          } catch (err) {
            return {
              success: false,
              message: err.response?.data?.message || "Error changing password",
            };
          }
        },

        // ==========================
        //         LOGOUT
        // ==========================
        logout: async () => {
          try {
            await api.post("/auth/logout", {}, { withCredentials: true });
          } catch {}

          set({ user: null, role: null, token: null });
        },

        isLoggedIn: () => !!get().token,
      };
    },

    // ==========================
    //     PERSIST OPTIONS
    // ==========================
    {
      name: "auth-storage",
      getStorage: () => localStorage,

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("❌ Zustand rehydrate error:", error);
        } else {
          console.log("✅ Auth store restored");
        }

        try {
          if (typeof setAuthStore === "function") {
            setAuthStore({ ready: true });
          }
        } catch (e) {
          console.error("Failed to set ready:", e);
        }
      },
    }
  )
);
