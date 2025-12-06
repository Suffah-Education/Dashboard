import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

// ------------ IMPORTANT ------------
let setAuthStore; // for persist rehydration fix
// -----------------------------------

export const useAuthStore = create(
  persist(
    (set, get) => {
      setAuthStore = set;

      return {
        user: null,
        role: null,
        token: null,
        loading: false,
        ready: true, // ✅ Changed from false to true to prevent loading screen

        // ================
        //   SET USER
        // ================
        setUser: (updatedUser) => set({ user: updatedUser }),

        // ================
        //   SIGNUP
        // ================
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
              ready: true, // <--- SUPER IMPORTANT
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

        // ================
        //   LOGIN
        // ================
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
              ready: true, // <--- REQUIRED FOR DP
            });

            return { success: true, message: res.data.message };
          } catch (err) {
            set({ loading: false });

            // TEACHER UNDER REVIEW
            if (err.response?.status === 403 && err.response?.data?.underReview) {
              return {
                success: false,
                underReview: true,
                message: err.response?.data?.message,
              };
            }

            return {
              success: false,
              message: err.response?.data?.message || "Login failed",
            };
          }
        },

        // ================
        //   UPDATE PROFILE
        // ================
        updateProfile: async (formData) => {
          try {
            set({ loading: true });

            const res = await api.put("/auth/update-profile", formData, {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
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

        // ================
        //  CHANGE PASSWORD
        // ================
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


        forgotStep1: async (role, phone) => {
          try {
            const res = await api.post("/auth/forgot-password/question", {
              role,
              phone,
            });
            return { success: true, question: res.data.question };
          } catch (err) {
            return {
              success: false,
              message: err.response?.data?.message || "User not found",
            };
          }
        },


        forgotStep2: async (role, phone, answer) => {
          try {
            const res = await api.post("/auth/forgot-password/verify", {
              role,
              phone,
              securityAnswer: answer,
            });
            return { success: true };
          } catch (err) {
            return {
              success: false,
              message: err.response?.data?.message || "Wrong answer",
            };
          }
        },




        resetPassword: async (role, phone, securityAnswer, newPassword) => {
          try {
            const res = await api.post("/auth/forgot-password/reset", {
              role,
              phone,
              securityAnswer,
              newPassword,
            });
            return { success: true, message: res.data.message };
          } catch (err) {
            return {
              success: false,
              message: err.response?.data?.message || "Failed to reset password",
            };
          }
        },




        // ================
        //     LOGOUT
        // ================
        logout: async () => {
          try {
            await api.post("/auth/logout", {}, { withCredentials: true });
          } catch { }

          // IMPORTANT: Do NOT set ready:false — UI breaks
          set({
            user: null,
            role: null,
            token: null,
            ready: true,
          });

          // Redirect to login page
          window.location.href = "/login";
        },

        // ================
        //   TOKEN CHECK
        // ================
        isLoggedIn: () => !!get().token,
      };
    },

    // ================
    //   PERSIST CONFIG
    // ================
    {
      name: "auth-storage",
      getStorage: () => localStorage,

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("❌ Persist Error:", error);
        } else {
          console.log("✅ Auth Store Rehydrated");
        }

        // VERY IMPORTANT — needed for profilepic to appear after login
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
