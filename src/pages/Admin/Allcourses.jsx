import React, { useEffect, useCallback, useRef, useState } from "react";
import { useBatchStore } from "../../store/useBatchStore";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Users } from "lucide-react";

const Allcourses = () => {
  const navigate = useNavigate();
  const observer = useRef();

  const { batches, loading, error } = useBatchStore();

  const [adminBatches, setAdminBatches] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchAdminBatches = async (pageNum) => {
    try {
      const res = await api.get(
        `/batches/admin/all-batches?page=${pageNum}`,
        { withCredentials: true }
      );

      const { batches: newBatches, totalPages } = res.data;

      if (pageNum === 1) {
        setAdminBatches(newBatches);
      } else {
        setAdminBatches((prev) => [...prev, ...newBatches]);
      }

      setHasMore(pageNum < totalPages);
    } catch (err) {
      console.error("Error loading admin courses:", err);
    }
  };

  useEffect(() => {
    fetchAdminBatches(1);
  }, []);

  const lastBatchRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchAdminBatches(nextPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        All Courses (Admin)
      </h2>

      {adminBatches.length === 0 && (
        <p className="text-gray-500 text-center">
          No courses found...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminBatches.map((batch, index) => (
          // <div
          //   key={batch._id}
          //   ref={index === adminBatches.length - 1 ? lastBatchRef : null}
          //   className="bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
          //   onClick={() => navigate(`/admin/batch/${batch._id}`)}
          // >
          //   <img
          //     src={batch.thumbnail || "/course.png"}
          //     alt={batch.name}
          //     className="w-full h-44 object-cover"
          //   />

          //   <div className="p-4">
          //     <h3 className="text-lg font-semibold text-gray-800">
          //       {batch.name}
          //     </h3>
          //     <p className="text-sm text-gray-500 mt-1">
          //       Teacher: {batch.teacher?.name}
          //     </p>

          //     <p className="text-xs text-gray-400 mt-2">
          //       Duration: {batch.duration || "N/A"}
          //     </p>
          //   </div>
          // </div>

          <div
            key={batch._id}
            ref={index === adminBatches.length - 1 ? lastBatchRef : null}
            onClick={() => navigate(`/admin/batch/${batch._id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
          >
            {/* Header Block Gradient like Student Cards */}
            <div className="h-32 bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center p-4">
              <h2 className="text-2xl font-bold text-green-900 text-center">
                {batch.name}
              </h2>
            </div>

            <div className="p-5">
              {/* Teacher Name */}
              <p className="text-sm font-semibold text-green-700 mb-3">
                {batch.teacher?.name || "Teacher"}
              </p>

              {/* Batch Code */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {batch.code || "No Code"}
              </h3>

              {/* Details */}
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

              {/* Go To Batch Button for Admin */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/batch/${batch._id}`);
                }}
                className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Open Batch <ArrowRight size={18} />
              </button>
            </div>
          </div>

        ))}
      </div>

      {loading && (
        <p className="text-center mt-6 text-gray-400">
          Loading more...
        </p>
      )}
    </div>
  );
};

export default Allcourses;
