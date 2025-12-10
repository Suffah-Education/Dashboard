import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useBatchDetailsQuery = (batchId) => {
  return useQuery({
    queryKey: ["batchDetails", batchId],
    queryFn: async () => {
      const res = await api.get(`/batches/${batchId}`);
      return res.data;
    },
    enabled: !!batchId,
    staleTime: 1000 * 60 * 3, // Cache 3 mins
  });
};
