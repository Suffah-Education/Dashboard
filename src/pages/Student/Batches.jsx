import React, { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { Calendar, Users, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBatchStore } from "../../store/useBatchStore";
import { usePaymentStore } from "../../store/usePaymentStore";
import { useBatchesQuery } from "../../Hooks/useBatchesQuery";

const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const Batches = () => {
  const navigate = useNavigate();

  const { enrolledBatches, getMyEnrolledBatches } = useBatchStore();
  const { startPayment, payingBatchId } = usePaymentStore();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getMyEnrolledBatches();
  }, []);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useBatchesQuery(debouncedSearch);

  const allBatches = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.batches || []);
  }, [data]);

  const enrolledList = useMemo(() => {
    if (!enrolledBatches) return [];
    if (Array.isArray(enrolledBatches)) return enrolledBatches;
    if (Array.isArray(enrolledBatches.batches)) return enrolledBatches.batches;
    return [];
  }, [enrolledBatches]);

  const observerRef = useRef(null);

  const lastBatchRef = useCallback(
    (node) => {
      if (!hasNextPage || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Batches</h1>

        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-72 md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search courses, teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* No data */}
      {allBatches.length === 0 && !isLoading && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No batches found
          </h2>
          <p className="text-gray-500">
            Try changing your search or come back later.
          </p>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allBatches.map((b, index) => {
          const enrolledData = enrolledList.find((eb) => eb._id === b._id);
          const isEnrolled = !!enrolledData;
          const isExpired = enrolledData?.isSubscriptionExpired; // FIXED

          const isLast = index === allBatches.length - 1;

          return (
            <div
              key={b._id}
              ref={isLast ? lastBatchRef : null}
              onClick={() =>
                isEnrolled
                  ? navigate(`/student/enrolled/${b._id}`)
                  : navigate(`/student/batch/${b._id}`)
              }
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-green-900 text-center">
                  {b.name}
                </h2>
              </div>

              <div className="p-5">
                <p className="text-sm font-semibold text-green-700 mb-3">
                  {b.teacher?.name || "Teacher"}
                </p>

                <h3 className="text-lg font-bold text-gray-800 mb-4">{b.code}</h3>

                <div className="space-y-2 mb-5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-600" />
                    <span>
                      Starts:{" "}
                      {b.startDate
                        ? new Date(b.startDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        : "TBA"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-green-600" />
                    <span>Seats: {b.capacity || "Unlimited"}</span>
                  </div>
                </div>

                {/* CTA BUTTON LOGIC */}
                {!isEnrolled ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(b._id, b.name, b.price);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-green-600"
                  >
                    Enroll for ₹{b.price} /month
                  </button>
                ) : isExpired ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(b._id, b.name, b.price);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-orange-600"
                  >
                    Renew for ₹{b.price}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/enrolled/${b._id}`);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600"
                  >
                    Go to class →
                  </button>
                )}

                {payingBatchId === b._id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-5 h-5 border-3 border-green-500 border-t-transparent animate-spin rounded-full"></div>
                    <span className="ml-2 text-sm text-gray-600">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-6 text-gray-500 text-sm">
          Loading more batches...
        </div>
      )}
    </div>
  );
};

export default Batches;
