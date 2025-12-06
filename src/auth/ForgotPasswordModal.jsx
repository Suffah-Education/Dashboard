import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ForgotPasswordModal = ({ onClose }) => {
  const { forgotStep1, forgotStep2, resetPassword } = useAuthStore();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotStep1(role, phone);
    setLoading(false);

    if (res.success) {
      setQuestion(res.question);
      setStep(2);
    } else {
      alert(res.message);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await resetPassword(role, phone, answer, newPass);
    setLoading(false);

    if (res.success) {
      alert("Password reset successfully");
      onClose();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">

        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-3">
            <select
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <input
              type="text"
              placeholder="Registered phone"
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {loading ? "Please wait..." : "Next"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleReset} className="space-y-3">
            <p className="text-sm mb-2">
              <span className="font-semibold">Security Question:</span><br />
              {question}
            </p>

            <input
              type="text"
              placeholder="Your Answer"
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setAnswer(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setNewPass(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
