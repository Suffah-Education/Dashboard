import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBatchStore } from "../../store/useBatchStore";
import { usePaymentStore } from "../../store/usePaymentStore";
import { ArrowLeft } from "lucide-react";

const Innerbatchstudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { batchDetails, loading, getBatchDetails, accessStatus } = useBatchStore();
  const { startPayment } = usePaymentStore();

  useEffect(() => {
    getBatchDetails(id);
  }, [id]);

  if (loading || !batchDetails) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10"></div>
        <p className="mt-3 text-gray-600">Loading batch details...</p>
      </div>
    );
  }

  const batch = batchDetails;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{batch.name}</h1>

      <p className="text-gray-700 text-lg mb-4">
        <span className="font-semibold">Teacher:</span>{" "}
        {batch.teacher?.name || "Unknown"}
      </p>

      {batch.description && (
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          {batch.description}
        </p>
      )}

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Batch Code</p>
          <p className="text-lg font-bold">{batch.code}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Price</p>
          <p className="text-lg font-bold text-green-700">₹{batch.price}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Start Date</p>
          <p className="text-lg font-bold">
            {batch.startDate
              ? new Date(batch.startDate).toLocaleDateString("en-IN")
              : "TBA"}
          </p>
        </div>

        {/* <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">End Date</p>
          <p className="text-lg font-bold">
            {batch.endDate
              ? new Date(batch.endDate).toLocaleDateString("en-IN")
              : "TBA"}
          </p>
        </div> */}

        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Capacity</p>
          <p className="text-lg font-bold">
            {batch.capacity ? `${batch.capacity} Students` : "Unlimited"}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Duration</p>
          <p className="text-lg font-bold">{batch.duration || "N/A"}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Total Classes</p>
          <p className="text-lg font-bold">{batch.classes?.length || 0}</p>
        </div>

        <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-1">Students Enrolled</p>
          <p className="text-lg font-bold">{batch.students?.length || 0}</p>
        </div>

      </div>

      {/* SYLLABUS */}
      {batch.syllabus && (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Syllabus</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{batch.syllabus}</p>
        </div>
      )}

      {/* ENROLL BUTTON */}
      <div className="text-center mt-10">
        <button
          onClick={() => startPayment(batch._id, batch.name, batch.price)}
          className="px-10 py-3 bg-green-600 text-white text-lg font-bold rounded-lg shadow hover:bg-green-700 transition"
        >
          Enroll Now {batch.price} /Month
        </button>
      </div>
    </div>
  );
};

export default Innerbatchstudent;