import { NavLink } from "react-router-dom";
import {
  LogOut,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  Home,
  X,
  UserCircleIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";   // ✅ ADDED
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { role, logout } = useAuthStore();
  const { pendingTeachers } = useAdminStore();     // ✅ ADDED
  const [isExpanded, setIsExpanded] = useState(true);

  const menuConfig = {
    student: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/student" },
      { name: "My Courses", icon: <BookOpen size={18} />, path: "/student/mycourses" },
      { name: "All Batches", icon: <BookOpen size={18} />, path: "/student/batches" },
      { name: "My Teachers", icon: <Users size={18} />, path: "/student/myteachers" },
      { name: "Profile", icon: <UserCircleIcon size={18} />, path: "/student/profile" },
    ],
    teacher: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/teacher" },
      { name: "My Students", icon: <Users size={18} />, path: "/teacher/mystudents" },
      { name: "My Batches", icon: <Users size={18} />, path: "/teacher/mybatches" },
      { name: "Profile", icon: <Settings size={18} />, path: "/teacher/teacherprofile" },
    ],
    admin: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
      { name: "All Teachers", icon: <Users size={18} />, path: "/admin/allteachers" },
      { name: "All Courses", icon: <Users size={18} />, path: "/admin/allcourses" },
      { name: "Requests", icon: <BarChart2 size={18} />, path: "/admin/requests" }, // ⭐ BADGE HERE
    ],
  };

  const menuItems = menuConfig[role] || [];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-white border-r border-gray-200 h-screen flex flex-col justify-between transition-all duration-300 z-30
          ${isOpen ? "translate-x-0 w-60" : "-translate-x-full md:translate-x-0 md:w-60"} 
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h1 className="text-green-700 font-bold text-lg truncate">
            {isExpanded ? "Suffah Education" : "SE"}
          </h1>

          <button
            className="md:hidden text-gray-600 hover:text-green-700"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col mt-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              end={item.path === `/${role}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-all duration-200 ${isActive
                  ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-500"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`
              }
            >
              {/* ICON */}
              <span>{item.icon}</span>

              {/* TEXT + BADGE */}
              {isExpanded && (
                <span className="flex items-center gap-2">
                  {item.name}

                  {/* 🔥 REQUEST BADGE ONLY ON REQUESTS */}
                  {item.name === "Requests" && pendingTeachers.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {pendingTeachers.length}
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white sticky bottom-0">
          <button
            onClick={logout}
            className="flex items-center text-red-500 hover:text-red-600 w-full"
          >
            <LogOut size={18} className="mr-3" />
            {isExpanded && "Logout"}
          </button>
        </div>

      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
