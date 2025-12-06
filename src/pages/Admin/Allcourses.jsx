import React, { useEffect, useCallback, useRef, useState, memo } from "react";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Users } from "lucide-react";

// Memoized batch card to avoid unnecessary rerenders
const BatchCard = memo(({ batch, isLast, lastBatchRef, navigate }) => {
  const handleClick = useCallback(() => {
    navigate(`/admin/batch/${batch._id}`);
  }, [batch._id, navigate]);

  return (
    <div
      ref={isLast ? lastBatchRef : null}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      {/* Header Block Gradient */}
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
            <span>Seats: {batch.capacity || "Unlimited"}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          Open Batch <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
});

BatchCard.displayName = "BatchCard";

const Allcourses = memo(() => {
  const navigate = useNavigate();
  const observer = useRef();

  const [adminBatches, setAdminBatches] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchAdminBatches = useCallback(async (pageNum) => {
    try {
      if (pageNum === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      const res = await api.get(
        `/batches/admin/all-batches?page=${pageNum}&limit=6`,
        { withCredentials: true }
      );

      const { batches: newBatches, totalPages } = res.data;

      setAdminBatches((prev) =>
        pageNum === 1 ? newBatches : [...prev, ...newBatches]
      );

      setHasMore(pageNum < totalPages);
    } catch (err) {
      console.error("Error loading admin courses:", err);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminBatches(1);
  }, [fetchAdminBatches]);

  const lastBatchRef = useCallback(
    (node) => {
      if (isFetchingMore || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchAdminBatches(nextPage);
            return nextPage;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingMore, hasMore, fetchAdminBatches]
  );

  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">All Courses (Admin)</h2>

      {isLoading ? (
        <div className="flex items-center justify-center w-full py-12">
          <div className="animate-spin h-10 w-10 text-blue-600 border-4 border-blue-200 rounded-full border-t-blue-600"></div>
        </div>
      ) : adminBatches.length === 0 ? (
        <p className="text-gray-500 text-center">No courses found...</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminBatches.map((batch, index) => (
          <BatchCard
            key={batch._id}
            batch={batch}
            isLast={index === adminBatches.length - 1}
            lastBatchRef={lastBatchRef}
            navigate={navigate}
          />
        ))}
      </div>

      {isFetchingMore && (
        <p className="text-center mt-6 text-gray-400">Loading more...</p>
      )}
    </div>
  );
});

Allcourses.displayName = "Allcourses";

export default Allcourses;
