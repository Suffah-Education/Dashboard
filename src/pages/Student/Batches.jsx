import React, { useEffect } from "react";
import { useBatchStore } from "../../store/useBatchStore";
import { useAuthStore } from "../../store/useAuthStore";
import { usePaymentStore } from "../../store/usePaymentStore";
import { Calendar, Users, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const navigate = useNavigate();

  const { fetchAllBatches, batches, loading, enrolledBatches, getMyEnrolledBatches } =
    useBatchStore();

  const { startPayment, payingBatchId } = usePaymentStore();

  useEffect(() => {
    fetchAllBatches();
    getMyEnrolledBatches();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">All Batches</h1>
        <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-3 py-2 w-48 sm:w-72 md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search courses, teachers..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {batches.map((b) => {
          const enrolledData = enrolledBatches.find((eb) => eb._id === b._id);
          const isEnrolled = !!enrolledData;
          const isExpired = enrolledData?.isSubscriptionExpired;

          return (
            <div
              key={b._id}
              onClick={() =>
                enrolledData
                  ? navigate(`/student/enrolled/${b._id}`)   // ✅ enrolled --> EnrolledBatch
                  : navigate(`/student/batch/${b._id}`)     // ❌ not enrolled --> Innerbatchstudent
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

                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {b.code}
                </h3>

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

                {/* ✅ ONLY LOGIC CHANGED, UI SAME */}
                {!isEnrolled ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(b._id, b.name, b.price);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Enroll for ₹{b.price}
                  </button>
                ) : isExpired ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(b._id, b.name, b.price);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                  >
                    Renew Subscription
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/batch/${b._id}`);
                    }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    Go to class <ArrowRight size={18} />
                  </button>
                )}

                {payingBatchId === b._id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-5 h-5 border-3 border-green-500 border-t-transparent animate-spin rounded-full"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      Processing...
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Batches;
