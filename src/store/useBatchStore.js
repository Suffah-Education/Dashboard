import { create } from "zustand";
import api from "../lib/axios.js";
// import { set } from "mongoose";

export const useBatchStore = create((set, get) => ({
  batches: [],
  loading: false,
  error: null,

  // ✅ Create Batch
  createBatch: async (batchData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/batches", batchData);
      set((state) => ({
        batches: [data.newBatch, ...state.batches],
        loading: false,
      }));
      return true;
    } catch (err) {
      console.error("Create Batch Error:", err.response?.data || err.message);
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      return false;
    }
  },

  // ✅ Fetch My Batches
  fetchMyBatches: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/batches/mybatches");
      set({ batches: data.batches, loading: false });
      return true;
    } catch (err) {
      console.error("Fetch Batches Error:", err.response?.data || err.message);
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      return false;
    }
  },
  
  // Fetch all batches for student
  fetchAllBatches: async () => {
    set({loading: true, error: null});
    try {
      const {data} = await api.get("/batches");
      set({batches: data.batches, loading: false});
      return true;
    } catch (error) {
      console.error("Fetch All Batches Error:", error.response?.data || error.message);
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      return false;
    }
  }
}));

