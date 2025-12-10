import React, { useCallback, useRef } from "react";
import { User, Loader2 } from "lucide-react";
import { useTeacherStudentsQuery } from "../../Hooks/teachers/useTeacherStudentsQuery";
import { useBatchStore } from "../../store/useBatchStore";

const MyStudents = () => {
  const { deleteStudentFromBatch } = useBatchStore(); // keeping your store logic EXACT

  // ⭐ NEW — React Query fetching
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTeacherStudentsQuery();

  // Flatten pages (same output structure as your old code)
  const students =
    data?.pages.flatMap((page) => page.students || []) || [];

  // ⭐ Infinite Scroll Logic (UI SAME)
  const observer = useRef(null);

  const lastStudentRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (!hasNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage]
  );

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Students</h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && students.length === 0 && (
        <p className="text-gray-600 text-center py-10">
          No students enrolled yet.
        </p>
      )}

      {/* Students Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => {
          const isLast = index === students.length - 1;

          return (
            <div
              key={student._id}
              ref={isLast ? lastStudentRef : null}
              className="bg-white shadow p-5 rounded-xl flex items-center gap-4"
            >
              <div className="p-3 bg-green-50 rounded-full">
                <User className="text-green-600" size={36} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-500">{student.phone}</p>
              </div>

              {/* Delete (YOUR LOGIC — UNTOUCHED) */}
              <button
                onClick={() => deleteStudentFromBatch(student._id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Loading more... */}
      {isFetchingNextPage && (
        <div className="text-center text-gray-500 mt-4">Loading more...</div>
      )}
    </div>
  );
};

export default MyStudents;
