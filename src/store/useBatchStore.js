import { create } from "zustand";
import api from "../lib/axios.js";

export const useBatchStore = create((set, get) => ({
  batches: [],
  loading: false,
  enrolledBatches: [],
  batchDetails: null,
  error: null,
  teacherStudents: [],

  // 🔴 NEW: access error & status (for subscription expiry etc.)
  accessError: null,
  accessStatus: null,
  renewData: null,

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
      // console.error("Create Batch Error:", err.response?.data || err.message);
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
    // set({ loading: true, error: null });
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

  getBatchDetails: async (id) => {
    if (!id) return;
    set({
      loading: true,
      accessError: null,
      accessStatus: null,
    });

    try {
      const { data } = await api.get(`/batches/${id}`, {
        withCredentials: true,
      });
      set({
        batchDetails: data,
        loading: false,
        accessError: null,
        accessStatus: null,
      });

      return data;

    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Access error";
      const errorDetails = err.response?.data?.error;

      if (status !== 402) {
        console.warn("⚠️ Access issue:", status, message);
        console.warn("📋 Error details:", errorDetails);
        console.warn("📋 Full error response:", err.response?.data);
      }

      // ✅ IMPORTANT: only handle 402 specially
      if (status === 402) {
        set({
          loading: false,
          accessStatus: 402,
          accessError: message,
          batchDetails: {
            _id: id,
            price: err.response?.data?.price,
            name: err.response?.data?.batchName,
          },
          renewData: {
            price: err.response?.data?.price,
            batchName: err.response?.data?.batchName,
          },
        });
        return null;
      }

      // For other errors, normal handling
      set({
        loading: false,
        accessStatus: status,
        accessError: message,
      });

      return null;
    }
  },

  // OPTIONAL helper if kabhi manually clear karna ho
  clearAccessState: () =>
    set({
      accessError: null,
      accessStatus: null,
    }),

  addClass: async (id, payload) => {
    try {
      const { data } = await api.post(`/batches/${id}/class`, payload);
      return data;
    } catch (err) {
      console.error("Failed to add class:", err.response?.data?.message || err.message);
      throw err;
    }
  },

  deleteBatch: async (id) => {
    try {
      await api.delete(`/batches/${id}`);
      set((state) => ({
        batches: state.batches.filter((batch) => batch._id !== id),
      }));

      return true;
    } catch (err) {
      // console.log("Delete Batch Error:", err.response?.data || err.message);
      return false;
    }
  },

  sendMessage: async (id, message) => {
    await api.post(`/batches/${id}/message`, { message });
  },

  updateBatch: async (id, payload) => {
    const { data } = await api.put(`/batches/${id}`, payload);
    return data;
  },

  fetchTeacherStudents: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/batches/my-students", {
        withCredentials: true,
      });
      set({
        teacherStudents: data.students || [],
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching teacher students:", err);
      set({ teacherStudents: [], loading: false });
    }
  },

  // ==========================
  getMyEnrolledBatches: async (page = 1, limit = 10) => {
    try {
      set({ loading: true });
      const { data } = await api.get("/batches/my-enrolled", {
        params: { page, limit },
        withCredentials: true,
      });
      // ✅ FIX: Store the full response object (includes batches, totalPages, etc.)
      set({ enrolledBatches: data, loading: false });
      return data;
    } catch (err) {
      console.error("Error fetching enrolled batches:", err.response?.data || err);

      set({ enrolledBatches: { batches: [], currentPage: 1, totalPages: 0, total: 0 }, loading: false });
      return { batches: [], currentPage: 1, totalPages: 0, total: 0 };
    }
  },

  completeBatch: async (id) => {
    try {
      await api.put(`/batches/${id}/complete`);
      return true;
    } catch (err) {
      console.error("Complete Batch Error:", err);
      return false;
    }
  },
}));
