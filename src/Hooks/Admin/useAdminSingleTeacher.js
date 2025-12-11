import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useAdminSingleTeacher = (id) => {
  return useQuery({
    queryKey: ["adminSingleTeacher", id],
    queryFn: async () => {
      const res = await api.get(`/admin/teacher/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
