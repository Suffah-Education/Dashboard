import React, { useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore";
import { useAdminStore } from "../../store/useAdminStore";
import { useBatchesQuery } from "../../Hooks/useBatchesQuery";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // 🔥 Fetch only PAGE 1 of batches (limit=12)
  const { data: batchData } = useBatchesQuery("");

  // 🔥 Fetch approved teachers
  const { teachers, fetchApprovedTeachers } = useAdminStore();

  useEffect(() => {
    fetchApprovedTeachers(1);
  }, []);

  // 🔥 Select only first 3 batches
  const topBatches = useMemo(() => {
    if (!batchData?.pages) return [];
    return batchData.pages[0].batches.slice(0, 3);
  }, [batchData]);

  // 🔥 Select top 3 teachers
  const topTeachers = teachers.slice(0, 3);

  return (
    <div className="bg-[#f8f9f8] min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Assalamu Alaikum, {user?.name || "Student"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          {/* ------------------ TOP BATCHES ------------------ */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Batches
            </h2>

            <button
              onClick={() => navigate("/student/batches")}
              className="text-green-600 text-sm font-medium flex items-center hover:text-green-700"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          {topBatches.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No batches available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
              {topBatches.map((batch) => (
                <div
                  key={batch._id}
                  className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/student/batch/${batch._id}`)}
                >
                  <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-xl">
                    {batch.name}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {batch.code}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {batch.teacher?.name}
                    </p>

                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ------------------ TOP TEACHERS ------------------ */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Our Teachers
              </h2>
              <button
                onClick={() => navigate("/student/myteachers")}
                className="text-green-600 text-sm font-medium flex items-center hover:text-green-700"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition"
                >
                  <img
                    src={
                      teacher.photo ||
                      teacher.profilepic ||
                      "/dummy-user.png"
                    }
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {teacher.education || "Islamic Teacher"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (unchanged UI) */}
        <div className="space-y-6">
          {/* Example schedule */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Today's Schedule
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-800">
                  Tafseer-ul-Quran Session
                </p>
                <p>10:00 AM - 11:00 AM</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">
                  Hadith Explanation
                </p>
                <p>2:00 PM - 3:30 PM</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">
                  Assignment Submission
                </p>
                <p>11:59 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {["Syllabus", "Doubt Forum", "Announcements", "Practice Tests"].map(
                (link) => (
                  <button
                    key={link}
                    className="bg-green-50 hover:bg-green-100 text-green-700 py-3 rounded-lg font-medium transition"
                  >
                    {link}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
