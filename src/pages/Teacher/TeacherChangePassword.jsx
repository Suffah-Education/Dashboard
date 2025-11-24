import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useBatchStore } from '../../store/useBatchStore';

const TeacherChangePassword = () => {
  const { changePassword } = useAuthStore();
  const navigate = useNavigate();

  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMsg('Both fields are required.');
      return;
    }
    setLoading(true);
    const res = await changePassword({ oldPassword, newPassword });
    setLoading(false);
    setMsg(res.message);
    setSuccess(!!res.success);

    if (res.success) {
      setTimeout(() => navigate(-1), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f8] p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 mb-4">
          <ArrowLeft size={18} /> Back
        </button>

        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={16} className="text-gray-400" />
              <input
                type={oldVisible ? 'text' : 'password'}
                className="flex-1 px-2 py-2 outline-none"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button type="button" onClick={() => setOldVisible(!oldVisible)} className="p-2">
                {oldVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={16} className="text-gray-400" />
              <input
                type={newVisible ? 'text' : 'password'}
                className="flex-1 px-2 py-2 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" onClick={() => setNewVisible(!newVisible)} className="p-2">
                {newVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Change Password'}
            </button>
          </div>

          {msg && <p className={`text-center ${success ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default TeacherChangePassword;
