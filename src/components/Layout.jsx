import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-60" : "ml-0 md:ml-60"
        }`}
      >
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <div className="pt-20 px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
