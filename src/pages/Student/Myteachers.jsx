import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";
import { useBatchStore } from "../../store/useBatchStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const MyTeachers = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const observer = useRef(null);

  const {
    enrolledBatches,
    getMyEnrolledBatches,
    loading: enrolledLoading,
  } = useBatchStore();

  const {
    teachers,
    fetchApprovedTeachers,
    hasMore,
    currentPage,
    loading: teachersLoading,
  } = useAdminStore();

  // 🔥 Fetch enrolled teachers ONCE
  useEffect(() => {
    if (user?.role === "student") {
      getMyEnrolledBatches();
    }
  }, [user]);

  // 🔥 Load first page of approved teachers
  useEffect(() => {
    fetchApprovedTeachers(1);
  }, []);

  // 🔥 Extract student's own teachers safely
  const myEnrolledTeachers = useMemo(() => {
    const list =
      Array.isArray(enrolledBatches?.batches)
        ? enrolledBatches.batches
        : Array.isArray(enrolledBatches)
          ? enrolledBatches
          : [];

    const teacherMap = new Map();

    list.forEach((batch) => {
      if (batch.teacher?._id) {
        teacherMap.set(batch.teacher._id, {
          ...batch.teacher,
          batchName: batch.name,
        });
      }
    });

    return Array.from(teacherMap.values());
  }, [enrolledBatches]);

  // ♾️ Infinite scroll for Explore All Teachers
  const lastTeacherRef = useCallback(
    (node) => {
      if (teachersLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchApprovedTeachers(currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [teachersLoading, hasMore, currentPage, fetchApprovedTeachers]
  );

  return (
    <div className="p-6 bg-[#f8f9f8] min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Teachers</h1>

      {/* ------------------ My Enrolled Teachers ------------------ */}
      {myEnrolledTeachers.length === 0 && !enrolledLoading ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
          <p className="text-gray-600 font-medium mb-2">
            Enroll in a course to see your teachers.
          </p>
          <button
            onClick={() => navigate("/student/batches")}
            className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {myEnrolledTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={
                    teacher.photo ||
                    teacher.profilepic ||
                    "/dummy-user.png"
                  }
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">
                    {teacher.education || "Teacher"}
                  </p>
                </div>
              </div>

              <button className="bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium flex items-center justify-center px-4 py-2 mt-4 sm:mt-0 rounded-md transition">
                <MessageSquare size={16} className="mr-2" />
                Message
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ------------------ Explore All Teachers ------------------ */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Explore All Teachers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachers.map((teacher, i) => (
          <div
            key={teacher._id}
            ref={i === teachers.length - 1 ? lastTeacherRef : null}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden text-center"
          >
            <img
              src={
                teacher.photo ||
                teacher.profilepic ||
                "/dummy-user.png"
              }
              alt={teacher.name}
              className="w-24 h-24 mx-auto mt-4 rounded-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{teacher.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{teacher.education}</p>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-md">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {teachersLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-green-600 w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default MyTeachers;
