import React, { useEffect } from "react";
import { useBatchStore } from "../../store/useBatchStore";

const Mystudents = () => {
  const { teacherStudents, fetchTeacherStudents, loading } = useBatchStore();

  useEffect(() => {
    fetchTeacherStudents();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-[#f8f9f8]">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        My Students ({teacherStudents.length})
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin border-4 border-green-600 border-t-transparent rounded-full w-10 h-10"></div>
        </div>
      )}

      {!loading && teacherStudents.length === 0 && (
        <div className="bg-white p-10 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No enrolled students yet
          </h2>
          <p className="text-gray-500">
            Students who enroll in any of your batches will appear here.
          </p>
        </div>
      )}

      {/* Student Grid */}
      {!loading && teacherStudents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition border border-green-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={student.profilepic || "https://i.pravatar.cc/100?img=1"}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.city || "N/A"}</p>
                </div>
              </div>

              <div className="mt-4 text-sm space-y-2">
                <p>
                  <span className="font-medium">Phone: </span>
                  {student.phone}
                </p>
              </div>

              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mystudents;
