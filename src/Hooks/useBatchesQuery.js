import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useBatchesQuery = (search) => {
    return useInfiniteQuery({
        queryKey: ["batches", search],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await api.get(
                `/batches?page=${pageParam}&limit=12&search=${search || ""}`
            );
            return res.data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages)
                return lastPage.currentPage + 1;
            return undefined;
        },
        staleTime: 60_000,
    });
};
