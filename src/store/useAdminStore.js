import { create } from "zustand";
import api from "../lib/axios";

export const useAdminStore = create((set, get) => ({
  pendingTeachers: [],
  teachers: [],
  loading: false,
  hasMore: true,
  currentPage: 1,


  fetchApprovedTeachers: async (page = 1) => {
  if (get().loading) return;
  set({ loading: true });

  try {
    const res = await api.get(`/admin?page=${page}`, {
      withCredentials: true,
    });

    const { teachers, totalPages } = res.data;

    set((state) => ({
      teachers: page === 1 ? teachers : [...state.teachers, ...teachers],
      currentPage: page,
      hasMore: page < totalPages,
      loading: false,
    }));
  } catch (error) {
    console.error("Teacher fetch error:", error);
    set({ loading: false });
  }
},


  fetchPendingTeachers: async (page = 1) => {
    if (get().loading) return; // prevent double calls
    set({ loading: true });

    try {
      const res = await api.get(`/admin/pending-teachers?page=${page}&limit=6`, {
        withCredentials: true,
      });

      const { teachers, totalPages } = res.data;

      // merge new results with old ones (for infinite scroll)
      set((state) => ({
        pendingTeachers:
          page === 1 ? teachers : [...state.pendingTeachers, ...teachers],
        currentPage: page,
        hasMore: page < totalPages,
        loading: false,
      }));
    } catch (err) {
      console.error("Fetch error:", err);
      set({ loading: false });
    }
  },

  approveTeacher: async (id) => {
    try {
      await api.patch(`/admin/approve-teacher/${id}`, {}, { withCredentials: true });
      set((state) => ({
        pendingTeachers: state.pendingTeachers.filter((t) => t._id !== id),
      }));
    } catch (err) {
      console.error("Approve error:", err);
    }
  },

  rejectTeacher: async (id) => {
    try {
      await api.delete(`/admin/reject-teacher/${id}`, { withCredentials: true });
      set((state) => ({
        pendingTeachers: state.pendingTeachers.filter((t) => t._id !== id),
      }));
    } catch (err) {
      console.error("Reject error:", err);
    }
  },
}));
