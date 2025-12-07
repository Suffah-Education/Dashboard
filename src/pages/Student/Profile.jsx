// --- FULLY RESPONSIVE FIXED VERSION ---
import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../store/useAuthStore.js';
import ChangePasswordModal from './Changepassword.jsx';
import { useNavigate, NavLink } from 'react-router-dom';
import {
    Share2,
    Edit,
    Upload,
    FileText,
    HelpCircle,
    Key,
    Shield,
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [pwdModal, setPwdModal] = useState(false);

    const profilePic =
        user?.profilepic || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

    const fileInputRef = useRef(null);

    const handleUploadClick = () => fileInputRef.current.click();

    return (
        <div className="min-h-screen pb-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                My Profile
            </h1>

            {/* MAIN WRAPPER */}
            <div className="
                bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 mb-8
                flex flex-col lg:flex-row gap-8
            ">
                {/* LEFT SIDE – PROFILE INFO */}
                <div className="flex flex-col md:flex-row items-center md:items-start flex-1">

                    {/* PROFILE PIC */}
                    <div className="relative mb-6 md:mb-0 md:mr-8 group">
                        <img
                            src={profilePic}
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow border-4 border-white"
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                        />

                        <button
                            onClick={handleUploadClick}
                            className="absolute inset-0 flex items-center justify-center 
                            bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"
                        >
                            <Upload size={24} className="text-white" />
                        </button>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {user?.name}
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">
                            {user?.role} | {user?.email}
                        </p>

                        <div className="flex justify-center md:justify-start space-x-4 mt-6">
                            <button
                                onClick={() =>
                                    navigate("/student/profile/editprofilepage")
                                }
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                                text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md"
                            >
                                <Edit size={16} className="mr-2" /> Edit Profile
                            </button>

                            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                                text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <Share2 size={16} className="mr-2" /> Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE – QUICK LINKS */}
                <div className="
                    bg-white rounded-xl shadow-sm border border-gray-100 p-6 
                    w-full lg:w-80 lg:flex-shrink-0
                ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">
                        <li>
                            <NavLink
                                to="/privacy-policy"
                                className="flex items-center justify-between text-gray-700 hover:text-green-700 py-2"
                            >
                                <div className="flex items-center">
                                    <Shield size={16} className="mr-2 text-green-600" /> Privacy Policy
                                </div>
                                <span className="text-sm text-gray-400">&gt;</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/terms-and-conditions"
                                className="flex items-center justify-between text-gray-700 hover:text-green-700 py-2"
                            >
                                <div className="flex items-center">
                                    <FileText size={16} className="mr-2 text-green-600" /> Terms & Conditions
                                </div>
                                <span className="text-sm text-gray-400">&gt;</span>
                            </NavLink>
                        </li>

                        <li
                            className="flex items-center justify-between text-gray-700 hover:text-green-700 cursor-pointer"
                            onClick={() => setPwdModal(true)}
                        >
                            <div className="flex items-center">
                                <Key size={16} className="mr-2 text-green-600" /> Change Password
                            </div>
                            <span className="text-sm text-gray-400">&gt;</span>
                        </li>

                        <li className="flex items-center justify-between text-gray-700 hover:text-green-700">
                            <div className="flex items-center">
                                <HelpCircle size={16} className="mr-2 text-green-600" /> FAQs
                            </div>
                            <span className="text-sm text-gray-400">&gt;</span>
                        </li>
                    </ul>
                </div>
            </div>

            <ChangePasswordModal
                open={pwdModal}
                onClose={() => setPwdModal(false)}
            />
        </div>
    );
};

export default Profile;
