import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 flex-1 bg-gray-50 min-h-screen">
        <Navbar />
        <div className="pt-20 px-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
