import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === "student") navigate("/");
    else if (role === "teacher") navigate("/");
    else if (role === "admin") navigate("/");
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Sending signup data:", { ...formData, role });

  try {
    const res = await signup({ ...formData, role });

    console.log("✅ Backend response:", res);

    if (res.success) {
      alert("Signup successful!");
      navigate("/"); // redirect to dashboard/home
    } else {
      console.warn("❌ Signup failed response:", res);
      alert(res.message || "Signup failed. Check console for details.");
    }
  } catch (err) {
    console.error("🚨 Signup error:", err);
    alert("Unexpected error. See console for details.");
  }
};

  const tabColors = {
    student: "bg-green-600 text-white",
    teacher: "bg-blue-600 text-white",
    admin: "bg-purple-600 text-white",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto relative overflow-y-auto max-h-[85vh] p-6">
        <div className="flex justify-between mb-6">
          {["student", "teacher", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-1 py-2 rounded-lg capitalize font-semibold transition ${
                role === r ? tabColors[r] : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {role.charAt(0).toUpperCase() + role.slice(1)} Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {role === "student" && (
            <>
              <input name="name" onChange={handleChange} type="text" placeholder="Full Name" className="w-full border p-2 rounded-lg" />
              <input name="phone" onChange={handleChange} type="text" placeholder="Phone Number" className="w-full border p-2 rounded-lg" />
              <input name="dob" onChange={handleChange} type="date" className="w-full border p-2 rounded-lg" />
              <input name="address" onChange={handleChange} type="text" placeholder="Address" className="w-full border p-2 rounded-lg" />
              <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full border p-2 rounded-lg" />
            </>
          )}

          {role === "teacher" && (
            <>
              <input name="name" onChange={handleChange} type="text" placeholder="Full Name" className="w-full border p-2 rounded-lg" />
              <input name="phone" onChange={handleChange} type="text" placeholder="Phone Number" className="w-full border p-2 rounded-lg" />
              <input name="education" onChange={handleChange} type="text" placeholder="Education" className="w-full border p-2 rounded-lg" />
              <input name="email" onChange={handleChange} type="email" placeholder="Email" className="w-full border p-2 rounded-lg" />
              <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full border p-2 rounded-lg" />
            </>
          )}

          {loading ? (
            <button disabled className="w-full bg-gray-400 text-white py-2 rounded-lg">Processing...</button>
          ) : (
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:opacity-90 transition">
              Continue
            </button>
          )}

          <div className="text-center text-sm mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
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

export default Signup;
