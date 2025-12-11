import React, { useCallback, useRef } from "react";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminAllBatches } from "../../Hooks/Admin/useAdminAllBatches";

const BatchCard = React.memo(({ batch, isLast, lastRef, navigate }) => {
  return (
    <div
      ref={isLast ? lastRef : null}
      onClick={() => navigate(`/admin/batch/${batch._id}`)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      <div className="h-32 bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-green-900 text-center line-clamp-2">
          {batch.name}
        </h2>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-green-700 mb-3">
          {batch.teacher?.name || "Teacher"}
        </p>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {batch.code || "No Code"}
        </h3>

        <div className="space-y-2 mb-5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-600" />
            <span>
              Starts:{" "}
              {batch.startDate
                ? new Date(batch.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "TBA"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-600" />
            <span>Seats: {batch.capacity}</span>
          </div>
        </div>

        <button className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2">
          Open Batch <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
});

const Allcourses = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useAdminAllBatches();

  const batches = data?.pages.flatMap((p) => p.batches) || [];

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
    [hasNextPage, isFetchingNextPage]
  );

  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">All Courses (Admin)</h2>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-green-300 border-t-green-600 rounded-full"></div>
        </div>
      )}

      {!isLoading && batches.length === 0 && (
        <p className="text-center text-gray-500">No courses found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch, index) => (
          <BatchCard
            key={batch._id}
            batch={batch}
            navigate={navigate}
            isLast={index === batches.length - 1}
            lastRef={lastRef}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-500">Loading more...</p>
      )}
    </div>
  );
};

export default Allcourses;
