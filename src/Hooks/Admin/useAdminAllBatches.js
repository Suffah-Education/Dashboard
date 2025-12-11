import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useAdminAllBatches = () => {
  return useInfiniteQuery({
    queryKey: ["adminAllBatches"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/batches/admin/all-batches?page=${pageParam}&limit=6`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};
