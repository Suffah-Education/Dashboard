import React, { useEffect } from "react";
import { Search, ChevronDown, Calendar, Clock } from "lucide-react";
import { useBatchStore } from "../../store/useBatchStore";

const BatchCard = ({ name, code, teacher, startDate, capacity }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="h-40 bg-gradient-to-r from-green-100 to-green-300 flex items-center justify-center">
        <p className="text-2xl font-semibold text-green-800">{name}</p>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-green-600 mb-1 uppercase">
          {teacher?.name || "Unknown Teacher"}
        </p>

        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{code}</h3>

        <div className="flex items-center justify-between text-xs mb-4 text-gray-700">
          <div className="flex items-center">
            <Calendar size={14} className="mr-2 text-green-600" />
            <span>
              Starts:{" "}
              {new Date(startDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-2" />
            <span>Seats: {capacity}</span>
          </div>
        </div>

        <button className="w-full py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

const Batches = () => {
  const { batches, fetchAllBatches, loading, error } = useBatchStore();

  useEffect(() => {
    fetchAllBatches();
  }, [fetchAllBatches]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Batches</h2>

        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-72 shadow-sm">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for a batch..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {batches.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No batches available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {batches.map((batch) => (
            <BatchCard key={batch._id} {...batch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Batches;
