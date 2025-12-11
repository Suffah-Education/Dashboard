import React, { useRef, useCallback, memo } from "react";
import { useAdminApprovedTeachers } from "../../Hooks/Admin/useAdminApprovedTeachers";

// Memoized card
const TeacherCard = memo(({ teacher, isLast, lastRef }) => (
  <div
    ref={isLast ? lastRef : null}
    className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
  >
    <img
      src={teacher.photo || "/user.png"}
      className="w-24 h-24 rounded-full object-cover mx-auto"
      loading="lazy"
    />
    <h3 className="text-center mt-3 font-semibold">{teacher.name}</h3>
    <p className="text-center text-sm text-gray-500">{teacher.education}</p>
  </div>
));

const Allteachers = () => {
  const observer = useRef();

  // Fetching through React Query infinite
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useAdminApprovedTeachers();

  const teachers = data?.pages.flatMap((p) => p.teachers) || [];

  const lastRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage]
  );

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">All Teachers (Admin)</h2>

      {isLoading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, index) => (
          <TeacherCard
            key={t._id}
            teacher={t}
            isLast={index === teachers.length - 1}
            lastRef={lastRef}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <p className="text-center mt-4">Loading more...</p>
      )}
    </div>
  );
};

export default Allteachers;
