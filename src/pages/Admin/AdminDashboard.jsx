import React, { useEffect, useState, useMemo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../lib/axios";

// React Query Hooks
import { useAdminApprovedTeachers } from "../../Hooks/Admin/useAdminApprovedTeachers";
import { useAdminAllBatches } from "../../Hooks/Admin/useAdminAllBatches";

const AdminDashboard = () => {
  const { user } = useAuthStore();

  // ---------- 🔥 Fetch Teachers ----------
  const {
    data: teacherPages,
    isLoading: teachersLoading,
    isError: teachersError,
  } = useAdminApprovedTeachers();

  const approvedTeachers =
    teacherPages?.pages?.flatMap((p) => p.teachers || []) || [];

  // ---------- 🔥 Fetch All Batches ----------
  const {
    data: batchPages,
    isLoading: batchesLoading,
    isError: batchesError,
  } = useAdminAllBatches();

  const allBatches =
    batchPages?.pages?.flatMap((p) => p.batches || []) || [];

  // --------- 🔥 Student Stats (Optimized) ----------
  const { studentCount, recentEnrollments } = useMemo(() => {
    if (!allBatches.length) return { studentCount: 0, recentEnrollments: 0 };

    let total = 0;
    let recent = 0;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    allBatches.forEach((batch) => {
      batch.students?.forEach((s) => {
        total++;
        if (new Date(s.createdAt).getTime() >= weekAgo) recent++;
      });
    });

    return { studentCount: total, recentEnrollments: recent };
  }, [allBatches]);

  // ----------- Loading UI (UI SAME, minimal) -----------
  if (teachersLoading || batchesLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  // ----------- Error UI (Safe fallback) -----------
  if (teachersError || batchesError) {
    return (
      <div className="p-6 bg-red-50 min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-600 font-semibold">
          Failed to load dashboard data.
        </p>
      </div>
    );
  }

  // ---------------- UI (NO CHANGES MADE) ------------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-gray-500 mt-1">
        Here's a snapshot of your platform's activity today.
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Students</p>
          <h2 className="text-3xl font-bold mt-2">{studentCount}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Active Teachers</p>
          <h2 className="text-3xl font-bold mt-2">{approvedTeachers.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Courses Published</p>
          <h2 className="text-3xl font-bold mt-2">{allBatches.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Recent Enrollments</p>
          <h2 className="text-3xl font-bold mt-2">{recentEnrollments}</h2>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        {/* Enrollment Chart */}
        <div className="bg-white p-6 shadow-sm border rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Enrollment
          </h2>

          <div className="grid grid-cols-6 gap-4 mt-6">
            {[720, 780, 850, 810, 920, 960].map((value, i) => (
              <div key={i} className="text-center">
                <div
                  className="bg-green-500 mx-auto rounded-md"
                  style={{
                    height: `${value / 12}px`,
                    width: "20px",
                  }}
                ></div>
                <p className="text-xs mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Popularity */}
        <div className="bg-white p-6 shadow-sm border rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Course Popularity
          </h2>

          <div className="mt-6 space-y-4">
            {[
              { label: "Intro to Quran", value: 1234 },
              { label: "Fiqh Basics", value: 1150 },
              { label: "Seerah Studies", value: 980 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${(item.value / 1300) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
