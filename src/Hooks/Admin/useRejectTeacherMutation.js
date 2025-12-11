import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useRejectTeacherMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/admin/reject-teacher/${id}`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["adminPendingTeachers"]);
    }
  });
};
