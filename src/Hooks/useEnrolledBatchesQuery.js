import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useEnrolledBatchesQuery = () => {
    return useQuery({
        queryKey: ["enrolledBatches"],
        queryFn: async () => {
            const res = await api.get("/batches/my-enrolled?page=1&limit=100");
            return res.data;
        },
        staleTime: 30_000, // 30 seconds
    });
};
