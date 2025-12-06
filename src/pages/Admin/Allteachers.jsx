import React, { useEffect, useRef, useCallback, memo } from "react";
import { useAdminStore } from "../../store/useAdminStore";

// Memoized teacher card for performance
const TeacherCard = memo(({ teacher, isLast, lastTeacherRef }) => (
  <div
    ref={isLast ? lastTeacherRef : null}
    className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
  >
    <img
      src={teacher.photo || "/user.png"}
      alt={teacher.name}
      className="w-24 h-24 rounded-full object-cover mx-auto loading-lazy"
      loading="lazy"
    />
    <h3 className="text-center mt-3 font-semibold line-clamp-2">
      {teacher.name}
    </h3>
    <p className="text-center text-sm text-gray-500 line-clamp-2">
      {teacher.education || "N/A"}
    </p>
  </div>
));

TeacherCard.displayName = "TeacherCard";

const Allteachers = memo(() => {
  const {
    teachers,
    fetchApprovedTeachers,
    loading,
    currentPage,
    hasMore,
  } = useAdminStore();

  const observer = useRef();

  useEffect(() => {
    if (teachers.length === 0) {
      fetchApprovedTeachers(1);
    }
  }, [teachers.length, fetchApprovedTeachers]);

  const lastTeacherRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchApprovedTeachers(currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, currentPage, fetchApprovedTeachers]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Teachers (Admin)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, index) => (
          <TeacherCard
            key={t._id}
            teacher={t}
            isLast={index === teachers.length - 1}
            lastTeacherRef={lastTeacherRef}
          />
        ))}
      </div>

      {loading && (
        <p className="text-center mt-6 text-gray-400">Loading more...</p>
      )}
    </div>
  );
});

Allteachers.displayName = "Allteachers";

export default Allteachers;
