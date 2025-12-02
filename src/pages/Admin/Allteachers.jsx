import React, { useEffect, useRef, useCallback } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const Allteachers = () => {
  const {
    teachers,
    fetchApprovedTeachers,
    loading,
    currentPage,
    hasMore,
  } = useAdminStore();

  const observer = useRef();

  useEffect(() => {
    fetchApprovedTeachers(1);
  }, []);

  const lastTeacherRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchApprovedTeachers(currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, currentPage]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Teachers (Admin)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, index) => (
          <div
            key={t._id}
            ref={index === teachers.length - 1 ? lastTeacherRef : null}
            className="bg-white border rounded-xl p-4 shadow hover:shadow-lg"
          >
            <img
              src={t.photo || "/user.png"}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            <h3 className="text-center mt-3 font-semibold">
              {t.name}
            </h3>
            <p className="text-center text-sm text-gray-500">
              {t.education}
            </p>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-center mt-6 text-gray-400">Loading more...</p>
      )}
    </div>
  );
};

export default Allteachers;
