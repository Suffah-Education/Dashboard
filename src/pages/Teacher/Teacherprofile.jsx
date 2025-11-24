import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Edit, Share2, Shield, FileText, HelpCircle, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {  
  const navigate = useNavigate();
  const { user, role } = useAuthStore();

  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 sm:p-6 md:p-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ----- Left (Main Profile Info) ----- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Avatar + Info */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
                }
                alt={user?.name || "Teacher"}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.name || "Ustad Abdullah"}
                </h2>
                <p className="text-sm text-gray-500">
                  {role === "teacher" ? "Teacher since 2022" : "Instructor"}
                </p>
                <p className="text-sm text-gray-600 mt-2 max-w-md">
                  “Sharing knowledge is a sacred trust.” – Dedicated to guiding
                  students in understanding Quran, Hadith, and Islamic values.
                </p>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <button onClick={() => navigate("/teacher/teacherprofile/editteacherprofile")} className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow transition">
                <Edit size={16} className="mr-2" /> Edit Profile
              </button>
              <button   className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-sm font-medium rounded-lg transition">
                <Share2 size={16} className="mr-2" /> Share
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Achievements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { title: "Quranic Studies", desc: "Completed" },
                { title: "Fiqh Fundamentals", desc: "Certified" },
                { title: "Perfect Attendance", desc: "Live Classes" },
                { title: "1 More Badge", desc: "Achievement" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 text-center hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enrolled */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ongoing Courses
              </h3>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col space-y-3">
                <div>
                  <p className="font-medium text-gray-800">
                    Advanced Hadith Studies
                  </p>
                  <p className="text-sm text-gray-500">Batch: Aalim Course</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">60%</p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Completed Courses
              </h3>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    Tafseer Foundations
                  </p>
                  <p className="text-sm text-gray-500">
                    Completed on June 2024
                  </p>
                </div>
                <button className="text-green-700 font-medium text-sm hover:text-green-800">
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ----- Right (Settings / Quick Links) ----- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate('/privacy-policy')}
                className="w-full flex items-center justify-between text-gray-700 hover:text-green-700 cursor-pointer py-2"
              >
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-green-600" /> Privacy Policy
                </div>
                <span className="text-sm text-gray-400">&gt;</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate('/terms-and-conditions')}
                className="w-full flex items-center justify-between text-gray-700 hover:text-green-700 cursor-pointer py-2"
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-2 text-green-600" /> Terms & Conditions
                </div>
                <span className="text-sm text-gray-400">&gt;</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate('/teacher/change-password')}
                className="w-full flex items-center justify-between text-gray-700 hover:text-green-700 cursor-pointer py-2"
              >
                <div className="flex items-center">
                  <Key size={16} className="mr-2 text-green-600" /> Change Password
                </div>
                <span className="text-sm text-gray-400">&gt;</span>
              </button>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-green-700 cursor-pointer">
              <div className="flex items-center">
                <HelpCircle size={16} className="mr-2 text-green-600" /> FAQs
              </div>
              <span className="text-sm text-gray-400">&gt;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
