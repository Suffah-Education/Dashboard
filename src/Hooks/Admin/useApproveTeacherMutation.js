import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useApproveTeacherMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/admin/approve-teacher/${id}`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["adminPendingTeachers"]);
      qc.invalidateQueries(["adminApprovedTeachers"]);
    }
  });
};
