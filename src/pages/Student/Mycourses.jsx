import React, { useEffect } from "react";
import { useBatchStore } from "../../store/useBatchStore";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users } from "lucide-react";

const MyCourses = () => {
  const navigate = useNavigate();
  const { enrolledBatches, getMyEnrolledBatches, loading } = useBatchStore();

  useEffect(() => {
    getMyEnrolledBatches();
  }, [getMyEnrolledBatches]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-5 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Enrolled Courses ({enrolledBatches.length})
        </h1>
      </div>

      {/* No Courses */}
      {enrolledBatches.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            You have not enrolled in any courses yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start your learning journey by exploring our courses.
          </p>
          <button
            onClick={() => navigate("/student/batches")}
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Browse Courses
          </button>
        </div>
      )}

      {/* Courses Grid */}
      {enrolledBatches.length > 0 && (
        <div className="space-y-6">
          {enrolledBatches.map((batch) => (
            <div
              key={batch._id}
              className="bg-white rounded-xl shadow-md p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/student/enrolled/${batch._id}`)}
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-40 h-32 bg-green-100 rounded-lg flex items-center justify-center text-green-700 text-2xl font-bold mb-4 sm:mb-0 sm:mr-5">
                {batch.name.charAt(0).toUpperCase()}
              </div>

              {/* Details */}
              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold text-gray-800">
                  {batch.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  Teacher: <span className="font-semibold">{batch.teacher?.name}</span>
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} className="text-green-600" />
                    {batch.classes?.length || 0} Classes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-blue-600" />
                    {batch.students?.length || 0} Students
                  </div>
                </div>

                {/* Progress Bar */}
                {/* <div className="mt-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div> */}
              </div>

              {/* Continue Button */}
              <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/student/enrolled/${batch._id}`);
                  }}
                  className="w-full sm:w-auto px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-2 justify-center"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
