import React from "react";
import {
  ChevronDown,
  PlayCircle,
  BookOpen,
  FileText,
  ShoppingCart,
} from "lucide-react"; // Added cart icon for empty state
import { useNavigate } from "react-router-dom";

// 🔹 CourseCard Component
const CourseCard = ({ title, teacher, progress, imageSrc, category }) => {
  let imageStyle = {};

  if (category === "Quranic Studies") {
    imageStyle = {
      backgroundImage: `url('https://i.ibb.co/L9Y00sY/quranic-studies.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else if (category === "Arabic Language") {
    imageStyle = {
      backgroundImage: `url('https://i.ibb.co/3W61V7T/arabic-language.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else if (category === "Islamic History") {
    imageStyle = {
      backgroundImage: `url('https://i.ibb.co/xJ5c2v8/islamic-history.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    imageStyle = { backgroundColor: "#f0f0f0" };
  }

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden p-4 items-center mb-6">
      {/* Thumbnail */}
      <div
        className="w-40 h-24 rounded-lg flex-shrink-0 mr-4"
        style={imageStyle}
      ></div>

      {/* Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">with {teacher}</p>

        {/* Progress Bar */}
        <div className="flex items-center mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-700 ml-3">{progress}%</span>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <PlayCircle size={16} className="mr-1 text-green-600" /> Lectures
          </span>
          <span className="flex items-center">
            <BookOpen size={16} className="mr-1 text-green-600" /> Materials
          </span>
          <span className="flex items-center">
            <FileText size={16} className="mr-1 text-green-600" /> Assignments
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex-shrink-0 ml-4">
        <button className="px-5 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors">
          Continue Learning
        </button>
      </div>
    </div>
  );
};

// 🔹 Main Component
const MyCourses = () => {
  // ⚙️ Replace this mock with data fetched from backend later
  const enrolledCourses = []; // <- if empty, "no courses" message appears
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          All Enrolled Courses ({enrolledCourses.length})
        </h2>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded-full">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-300 hover:bg-gray-100">
            In Progress
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-300 hover:bg-gray-100">
            Completed
          </button>

          {/* Sort */}
          <div className="relative ml-4">
            <button className="flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition min-w-[150px]">
              Sort by: Recently Enrolled
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {enrolledCourses.length > 0 ? (
        <div>
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        // 🔹 Empty State (No Courses Purchased)
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            You haven’t enrolled in any courses yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Explore our Quranic Studies, Arabic, and Islamic History courses to
            start your learning journey today.
          </p>
          <button
            onClick={() => navigate("/student/batches")}
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            Browse Available Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
