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
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Sidebar = () => {
  const { role, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);

  // ---------- Menu Lists by Role ----------
  const menuConfig = {
    student: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/student" },
      { name: "My Courses", icon: <BookOpen size={18} />, path: "/student/mycourses" },
       { name: "Batches", icon: <BookOpen size={18} />, path: "/student/batches" },
      { name: "My Teachers", icon: <Users size={18} />, path: "/student/teachers" },
      { name: "My Schedule", icon: <Calendar size={18} />, path: "/student/schedule" },
      { name: "Messages", icon: <MessageSquare size={18} />, path: "/student/messages" },
      { name: "Grades", icon: <BarChart2 size={18} />, path: "/student/grades" },
    ],

    teacher: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/teacher" },
      { name: "My Students", icon: <Users size={18} />, path: "/teacher/mystudents" },
      { name: "My Batches", icon: <Users size={18} />, path: "/teacher/mybatches" },
      { name: "Schedule", icon: <Calendar size={18} />, path: "/teacher/schedule" },
      { name: "Messages", icon: <MessageSquare size={18} />, path: "/teacher/messages" },
    ],

    admin: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
      { name: "Manage Teachers", icon: <Users size={18} />, path: "/admin/manage-teachers" },
      { name: "Manage Students", icon: <Users size={18} />, path: "/admin/manage-students" },
      { name: "Reports", icon: <BarChart2 size={18} />, path: "/admin/reports" },
    ],
  };

  const menuItems = menuConfig[role] || [];

  // ---------- UI ----------
  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-20"
      } h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col justify-between transition-all duration-300`}
    >
      {/* ---------- Header ---------- */}
      <div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h1 className="text-green-700 font-bold text-lg truncate">
            {isOpen ? "Suffah Education" : "SE"}
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-green-600 transition"
          >
            {isOpen ? "<" : ">"}
          </button>
        </div>

        {/* ---------- Nav Links ---------- */}
        <nav className="flex flex-col mt-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === `/${role}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-500"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ---------- Footer ---------- */}
      <div className="px-6 py-4 border-t border-gray-100">
        <NavLink
          to={`/${role}/settings`}
          className="flex items-center mb-3 text-gray-600 hover:text-green-700"
        >
          <Settings size={18} className="mr-3" />
          {isOpen && "Settings"}
        </NavLink>

        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="flex items-center text-red-500 hover:text-red-600 w-full"
        >
          <LogOut size={18} className="mr-3" />
          {isOpen && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
