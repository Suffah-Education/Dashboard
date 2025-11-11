import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { login, loading, token, role: userRole } = useAuthStore();
  const navigate = useNavigate();

  // 🕒 Show loader for 3 seconds before showing login form
  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🔒 Redirect if already logged in
  useEffect(() => {
    if (token && userRole) {
      if (userRole === "student") navigate("/student");
      else if (userRole === "teacher") navigate("/teacher");
      else if (userRole === "admin") navigate("/admin");
    }
  }, [token, userRole, navigate]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ ...formData, role });
    if (res.success) {
      alert("Login successful!");
      navigate("/"); // redirect to dashboard (auto-handled in App.jsx)
    } else {
      alert(res.message);
    }
  };

  const tabColors = {
    student: "bg-green-600 text-white",
    teacher: "bg-blue-600 text-white",
    admin: "bg-purple-600 text-white",
  };

  // 🌀 Loader screen (3 seconds)
  if (!showForm) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10 mb-3"></div>
        <p className="text-gray-600">Loading login form...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto relative overflow-y-auto max-h-[85vh] p-6">
        {/* Tabs for Role Selection */}
        <div className="flex justify-between mb-6">
          {["student", "teacher", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-1 py-2 rounded-lg capitalize font-semibold transition ${
                role === r
                  ? tabColors[r]
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {role.charAt(0).toUpperCase() + role.slice(1)} Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="phone"
            onChange={handleChange}
            type="text"
            placeholder="Phone Number"
            className="w-full border p-2 rounded-lg"
            required
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-lg"
            required
          />

          {loading ? (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              Processing...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Continue
            </button>
          )}

          <div className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-gray-600">Continue with Google</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
