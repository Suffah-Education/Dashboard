import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export const useTeacherStudentsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["teacherStudents"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/batches/my-students?page=${pageParam}&limit=10`);
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
