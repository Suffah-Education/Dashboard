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
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/batches");
      set({ batches: data.batches, loading: false });
      return true;
    } catch (error) {
      console.error("Fetch All Batches Error:", error.response?.data || error.message);
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      return false;
    }
  },

  // ✅ Get Single Batch Details (subscription aware)
  // getBatchDetails: async (id) => {
  //   set({
  //     loading: true,
  //     batchDetails: null,
  //     accessError: null,
  //     accessStatus: null,
  //   });

  //   try {
  //     const { data } = await api.get(`/batches/${id}`, { withCredentials: true });
  //     set({
  //       batchDetails: data,
  //       loading: false,
  //       accessError: null,
  //       accessStatus: null,
  //     });
  //     return data;
  //   } catch (err) {
  //     console.error("Get Batch Details Error:", err);

  //     const status = err.response?.status || null;
  //     const message =
  //       err.response?.data?.message || "Failed to load batch details";

  //     set({
  //       loading: false,
  //       batchDetails: null,
  //       accessError: message,
  //       accessStatus: status,
  //     });

  //     return null;
  //   }
  // },

  // getBatchDetails: async (id) => {
  //   set({
  //     loading: true,
  //     accessError: null,
  //     accessStatus: null,
  //   });

  //   try {
  //     const { data } = await api.get(`/batches/${id}`, {
  //       withCredentials: true,
  //     });

  //     set({
  //       batchDetails: data,
  //       loading: false,
  //       accessError: null,
  //       accessStatus: null,
  //     });

  //     return data;
  //   } catch (err) {
  //     console.error("Get Batch Details Error:", err);

  //     const status = err.response?.status || null;
  //     const message = err.response?.data?.message || "Access error";

  //     // ✅ IMPORTANT FIX: batchDetails ko NULL nahi kar rahe
  //     set((state) => ({
  //       batchDetails: state.batchDetails,
  //       loading: false,
  //       accessStatus: status,
  //       accessError: message,
  //     }));

  //     return null;
  //   }
  // },


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

      if (status !== 402) {
        console.warn("⚠️ Access issue:", status, message);
      }

      // ✅ IMPORTANT: only handle 402 specially
      if (status === 402) {
        set({
          loading: false,
          accessStatus: 402,
          accessError: message,
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
      console.log("Add Class Error:", err);
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
      console.log("Delete Batch Error:", err.response?.data || err.message);
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
  getMyEnrolledBatches: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/batches/my-enrolled", {
        withCredentials: true,
      });
      set({ enrolledBatches: data || [], loading: false });
      return data || [];
    } catch (err) {
      console.error("Error fetching enrolled batches:", err);
      set({ enrolledBatches: [], loading: false });
      return [];
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
