import { Bell, Search, UserCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-60 right-0 z-10">
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-96">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search courses, teachers, anything..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center justify-center space-x-4">
        <h1 className="text-xl font-semibold text-green-700 mb-4">
          {user?.name || "Student"}!
        </h1>
        <Bell size={20} className="text-gray-600 cursor-pointer" />
        <UserCircle size={26} className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
