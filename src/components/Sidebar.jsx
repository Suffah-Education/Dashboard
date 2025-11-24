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
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { role, logout } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuConfig = {
    student: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/student" },
      { name: "My Courses", icon: <BookOpen size={18} />, path: "/student/mycourses" },
      { name: "All Batches", icon: <BookOpen size={18} />, path: "/student/batches" },
      { name: "My Teachers", icon: <Users size={18} />, path: "/student/myteachers" },
      { name: "Profile", icon: <UserCircleIcon size={18} />, path: "/student/profile" },
      // { name: "My Schedule", icon: <Calendar size={18} />, path: "/student/schedule" },
      // { name: "Messages", icon: <MessageSquare size={18} />, path: "/student/messages" },
      // { name: "Grades", icon: <BarChart2 size={18} />, path: "/student/grades" },
    ],
    teacher: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/teacher" },
      { name: "My Students", icon: <Users size={18} />, path: "/teacher/mystudents" },
      { name: "My Batches", icon: <Users size={18} />, path: "/teacher/mybatches" },
      // { name: "Schedule", icon: <Calendar size={18} />, path: "/teacher/schedule" },
      // { name: "Messages", icon: <MessageSquare size={18} />, path: "/teacher/messages" },
      { name: "Profile", icon: <Settings size={18} />, path: "/teacher/teacherprofile" },
    ],
    admin: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
      { name: "All Teachers", icon: <Users size={18} />, path: "/admin/allteachers" },
      { name: "All Students", icon: <Users size={18} />, path: "/admin/allstudents" },
      { name: "All Courses", icon: <Users size={18} />, path: "/admin/allcourses" },
      { name: "Requests", icon: <BarChart2 size={18} />, path: "/admin/requests" },
    ],
  };

  const menuItems = menuConfig[role] || [];

  return (
    <>
      {/* Sidebar (Desktop + Tablet) */}
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

        {/* Nav Links */}
        <nav className="flex flex-col mt-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === `/${role}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-500"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isExpanded && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          {/* <NavLink
            to={`/${role}/settings`}
            className="flex items-center mb-3 text-gray-600 hover:text-green-700"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} className="mr-3" />
            {isExpanded && "Settings"}
          </NavLink> */}

          <button
            onClick={logout}
            className="flex items-center text-red-500 hover:text-red-600 w-full"
          >
            <LogOut size={18} className="mr-3" />
            {isExpanded && "Logout"}
          </button>
        </div>
      </div>

      {/* Overlay on mobile */}
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
