import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useBatchStore } from "../../store/useBatchStore";
import api from "../../lib/axios";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const AdminDashboard = () => {
  const { teachers, fetchApprovedTeachers } = useAdminStore();
  const { batches, fetchAllBatches } = useBatchStore();

  const [studentCount, setStudentCount] = useState(0);
  const [recentEnrollments, setRecentEnrollments] = useState(0);
  const {user} = useAuthStore();

  // 🔥 Fetch all data at load
  useEffect(() => {
    fetchApprovedTeachers(1);
    fetchAllBatches();

    loadRealStudentData();
  }, []);

  // 🔥 Calculate students & recent enrollments
  const loadRealStudentData = async () => {
    const res = await api.get("/batches");
    const all = res.data.batches || [];

    let total = 0;
    let recent = 0;

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    all.forEach((batch) => {
      batch.students?.forEach((s) => {
        total++;
        if (new Date(s.createdAt).getTime() >= weekAgo) recent++;
      });
    });

    setStudentCount(total);
    setRecentEnrollments(recent);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-gray-500 mt-1">
        Here's a snapshot of your platform's activity today.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        
        {/* Total Students */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Students</p>
          <h2 className="text-3xl font-bold mt-2">{studentCount}</h2>
          <p className="text-green-600 text-xs mt-1">+5.2%</p>
        </div>
        
        {/* Active Teachers */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Active Teachers</p>
          <h2 className="text-3xl font-bold mt-2">{teachers.length}</h2>
          <p className="text-green-600 text-xs mt-1">+1.5%</p>
        </div>

        {/* Courses Published */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Courses Published</p>
          <h2 className="text-3xl font-bold mt-2">{batches.length}</h2>
          <p className="text-green-600 text-xs mt-1">+2</p>
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Recent Enrollments</p>
          <h2 className="text-3xl font-bold mt-2">{recentEnrollments}</h2>
          <p className="text-green-600 text-xs mt-1">+8.0%</p>
        </div>
      </div>

      {/* ------------- NEXT ROW ------------- */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        {/* Student Enrollment Chart (Simple Version) */}
        <div className="bg-white p-6 shadow-sm border rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Student Enrollment
            </h2>
            <select className="border px-2 py-1 rounded text-sm">
              <option>Monthly</option>
            </select>
          </div>

          <div className="grid grid-cols-6 gap-4 mt-6">
            {[
              { month: "Jan", value: 720 },
              { month: "Feb", value: 780 },
              { month: "Mar", value: 850 },
              { month: "Apr", value: 810 },
              { month: "May", value: 920 },
              { month: "Jun", value: 960 },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="bg-green-500 mx-auto rounded-md"
                  style={{
                    height: `${item.value / 12}px`,
                    width: "20px",
                  }}
                ></div>
                <p className="text-xs mt-2 text-gray-600">{item.month}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Popularity */}
        <div className="bg-white p-6 shadow-sm border rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Course Popularity
          </h2>

          <div className="mt-6 space-y-4">
            {[
              { label: "Intro to Quran", value: 1234 },
              { label: "Fiqh Basics", value: 1150 },
              { label: "Seerah Studies", value: 980 },
              { label: "Hadith 101", value: 890 },
              { label: "Arabic Level 1", value: 720 },
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
