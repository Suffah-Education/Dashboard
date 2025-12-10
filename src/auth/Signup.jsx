import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");

  // 🔥 FIX: FORM DEFAULT VALUES add kiye
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    dob: "",
    address: "",
    email: "",
    education: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [showForm, setShowForm] = useState(false);
  const { signup, loading, token, role: userRole } = useAuthStore();
  const navigate = useNavigate();

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (token && userRole) {
      if (userRole === "student") navigate("/student");
      else if (userRole === "teacher") navigate("/teacher");
      else if (userRole === "admin") navigate("/admin");
    }
  }, [token, userRole, navigate]);


  // Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // console.log("🔧 handleChange called:", { name, value }); // DEBUG

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const questions = [
    "Your birthplace?",
    "Your favorite teacher?",
    "Your favorite subject?",
    "Your mother's name?",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Read form data directly from the form element
    const form = e.target;
    const formDataObj = new FormData(form);

    // Convert FormData to plain object
    const signupData = {
      role,
      name: formDataObj.get('name') || '',
      phone: formDataObj.get('phone') || '',
      password: formDataObj.get('password') || '',
      dob: formDataObj.get('dob') || '',
      address: formDataObj.get('address') || '',
      email: formDataObj.get('email') || '',
      education: formDataObj.get('education') || '',
      securityQuestion: formDataObj.get('securityQuestion') || '',
      securityAnswer: formDataObj.get('securityAnswer') || '',
    };

    // console.log("📌 FINAL FORM DATA SENDING:", signupData); // DEBUG LOG

    const res = await signup(signupData);

    if (res?.success) {
      // alert("Signup successful!");
      if (role === "teacher") navigate("/inreview");
      else navigate("/");
    } else {
      alert(res.message || "Signup failed. Try again.");
    }
  };

  const tabColors = {
    student: "bg-green-600 text-white",
    teacher: "bg-blue-600 text-white",
  };

  if (!showForm) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10 mb-3"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto relative overflow-y-auto max-h-[85vh] p-6">

        {/* Role Tabs */}
        <div className="flex justify-between mb-6">
          {["student", "teacher"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-1 py-2 rounded-lg capitalize font-semibold transition ${role === r
                ? tabColors[r]
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

          {/* STUDENT FIELDS */}
          {role === "student" && (
            <>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded-lg"
                required
              />

              <input
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                className="w-full border p-2 rounded-lg"
                required
              />

              <input
                name="dob"
                onChange={handleChange}
                type="date"
                className="w-full border p-2 rounded-lg"
              />

              <input
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Address"
                className="w-full border p-2 rounded-lg"
              />

              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded-lg"
                required
              />
            </>
          )}

          {/* TEACHER FIELDS */}
          {role === "teacher" && (
            <>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded-lg"
                required
              />

              <input
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                className="w-full border p-2 rounded-lg"
                required
              />

              <input
                name="education"
                onChange={handleChange}
                type="text"
                placeholder="Education"
                className="w-full border p-2 rounded-lg"
              />

              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded-lg"
              />

              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded-lg"
                required
              />
            </>
          )}

          {/* 🔐 SECURITY QUESTION - COMMON FIELD */}
          <select
            name="securityQuestion"
            onChange={handleChange}
            value={formData.securityQuestion}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Select Security Question</option>
            {questions.map((q, i) => (
              <option key={i} value={q}>
                {q}
              </option>
            ))}
          </select>

          <input
            name="securityAnswer"
            onChange={handleChange}
            value={formData.securityAnswer}
            type="text"
            placeholder="Security Answer"
            className="w-full border p-2 rounded-lg"
            required
          />

          {/* Submit Button */}
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
