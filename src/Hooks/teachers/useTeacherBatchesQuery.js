import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useTeacherBatchesQuery = () => {
  return useInfiniteQuery({
    queryKey: ["teacherBatches"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/batches/mybatches?page=${pageParam}&limit=6`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 0, // Always refetch to avoid Android cache issues
  });
};
