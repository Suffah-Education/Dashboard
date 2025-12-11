import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useAdminBatchDetails = (id) => {
  return useQuery({
    queryKey: ["adminBatchDetails", id],
    queryFn: async () => {
      const res = await api.get(`/batches/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
