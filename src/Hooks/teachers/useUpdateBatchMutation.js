import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useUpdateBatchMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ batchId, payload }) => {
      const res = await api.put(`/batches/${batchId}`, payload);
      return res.data;
    },
    onSuccess: (_, { batchId }) => {
      qc.invalidateQueries(["batchDetails", batchId]);
      qc.invalidateQueries(["teacherBatches"]);
    },
  });
};
