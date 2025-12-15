import { Bell, Search, UserCircle, Menu } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = ({ setIsSidebarOpen }) => {
  const { user } = useAuthStore();

  // 🟢 Student: user.profilepic
  // 🟢 Teacher: user.profilepic (same key), OR fallback avatar
  const profilePic =
    user?.profilepic ||
    user?.avatar || // just in case teacher has avatar field
    "";

  return (
    <div className="fixed top-0 left-0 md:left-60 right-0 z-20 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-green-600"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <Menu size={22} />
        </button>

        {/* Search bar */}
        {/* <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-3 py-2 w-48 sm:w-72 md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search courses, teachers..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <h1 className="hidden sm:block text-green-700 font-semibold text-base">
          {user?.name || "Student"}!
        </h1>

        {/* <Bell size={20} className="text-gray-600 cursor-pointer" /> */}

        {/* =======================
            PROFILE PIC DISPLAY
        ========================= */}
        {profilePic ? (
          <img
            src={profilePic}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-300 cursor-pointer"
          />
        ) : (
          <UserCircle size={26} className="text-gray-600 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
