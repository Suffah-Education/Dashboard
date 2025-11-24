import React, { useState } from "react";
import { Eye, EyeOff, X, Lock } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const ChangePasswordModal = ({ open, onClose }) => {
  const { changePassword } = useAuthStore();

  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      alert("Both fields required");
      return;
    }

    const res = await changePassword({ oldPassword, newPassword });

    alert(res.message);

    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Change Password</h2>
          <X size={22} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* OLD PASSWORD */}
        <label className="text-sm font-medium">Old Password</label>
        <div className="flex items-center border rounded-lg px-3 mt-1 mb-4">
          <Lock size={16} className="text-gray-400" />
          <input
            type={oldVisible ? "text" : "password"}
            className="flex-1 px-2 py-2 outline-none"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span onClick={() => setOldVisible(!oldVisible)} className="cursor-pointer">
            {oldVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <label className="text-sm font-medium">New Password</label>
        <div className="flex items-center border rounded-lg px-3 mt-1">
          <Lock size={16} className="text-gray-400" />
          <input
            type={newVisible ? "text" : "password"}
            className="flex-1 px-2 py-2 outline-none"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span onClick={() => setNewVisible(!newVisible)} className="cursor-pointer">
            {newVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
