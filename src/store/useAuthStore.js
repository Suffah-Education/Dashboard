// src/store/authStore.js
import { create } from "zustand";
import api from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  token: localStorage.getItem("token") || null,
  loading: false,

 signup: async (data) => {
  try {
    set({ loading: true });
    console.log("📩 Sending request to backend:", data);

    const res = await api.post("/auth/signup", data);

    console.log("✅ Response from backend:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    set({
      user: res.data.user,
      role: res.data.role,
      token: res.data.token,
      loading: false,
    });

    return { success: true, message: res.data.message };
  } catch (err) {
    console.error("❌ Signup API Error:", err.response?.data || err.message);
    set({ loading: false });

    return {
      success: false,
      message: err.response?.data?.message || "Signup failed at backend",
    };
  }
},


  login: async (data) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
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

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ user: null, token: null, role: null });
  },
}));
