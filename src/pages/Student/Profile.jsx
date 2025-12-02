import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../store/useAuthStore.js';
import ChangePasswordModal from './Changepassword.jsx';
import { useNavigate, NavLink } from 'react-router-dom';
import {
    Share2,
    Edit,
    CheckCircle,
    Trophy,
    BookOpen,
    Clock,
    Lock,
    Upload,
    UserCircle2,
    FileText,
    HelpCircle,
    Key,
    Shield,
} from 'lucide-react';

// const AchievementCard = ({ icon: Icon, title, subtitle, colorClass, bgColorClass, buttonText }) => (
//     <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[180px] text-center">
//         <div className={`p-4 rounded-full mb-3 ${bgColorClass} ${colorClass}`}>
//             <Icon size={24} strokeWidth={2.5} />
//         </div>
//         <p className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">{title}</p>
//         <p className="text-xs mt-1 text-gray-500 line-clamp-1">{subtitle}</p>
//         {buttonText && (
//             <div className='mt-2'>
//                 <button className='text-xs font-medium text-green-600 hover:text-green-700'>{buttonText}</button>
//             </div>
//         )}
//     </div>
// );




// const CourseCard = ({ title, instructor, progress, completedDate, isCompleted }) => (
//     <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
//         <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-600'}`}>
//             {isCompleted ? <Lock size={20} /> : <BookOpen size={20} />}
//         </div>
//         <div className="flex-1 min-w-0">
//             <p className="font-semibold text-gray-800 truncate">{title}</p>
//             <p className="text-xs text-gray-500">{isCompleted ? `Completed on ${completedDate}` : instructor}</p>

//             {!isCompleted && (
//                 <div className="mt-2 flex items-center">
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div
//                             className="bg-green-600 h-2.5 rounded-full"
//                             style={{ width: `${progress}%` }}
//                         ></div>
//                     </div>
//                     <span className="ml-3 text-xs font-medium text-green-600">{progress}%</span>
//                 </div>
//             )}
//         </div>
//         {isCompleted && (
//             <button className='text-sm font-medium text-green-600 hover:text-green-700 flex-shrink-0 ml-4'>
//                 View Certificate
//             </button>
//         )}
//     </div>
// );




// =============================
//       MAIN PROFILE PAGE
// =============================

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [pwdModal, setPwdModal] = useState(false);

    // Profile picture
    const profilePic = user?.profilepic || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // Dummy Achievements & Courses
    // const achievements = [
    //     { icon: CheckCircle, title: "Tajweed Foundations", subtitle: "Completed", colorClass: "text-green-600", bgColorClass: "bg-green-50" },
    //     { icon: Trophy, title: "Top Performer", subtitle: "Quiz: Seerah", colorClass: "text-amber-500", bgColorClass: "bg-amber-50" },
    //     { icon: BookOpen, title: "Fiqh of Salah", subtitle: "Certified", colorClass: "text-indigo-600", bgColorClass: "bg-indigo-50" },
    //     { icon: Clock, title: "Perfect Attendance", subtitle: "Live Classes", colorClass: "text-red-500", bgColorClass: "bg-red-50" },
    //     { icon: Lock, title: "1 More Course", subtitle: "Unlock Next Badge", colorClass: "text-gray-500", bgColorClass: "bg-gray-100", buttonText: 'View Details' },
    // ];

    // const enrolledCourses = [
    //     { title: "Advanced Arabic Grammar", instructor: "Ustadah Abdullah", progress: 45, isCompleted: false },
    //     { title: "Basic Tajweed Rules", instructor: "Ustadah Fatima", progress: 80, isCompleted: false },
    // ];

    // const completedCourses = [
    //     { title: "Foundations of Tajweed", completedDate: "May 2023", isCompleted: true },
    //     { title: "Seerah of the Prophet (PBUH) I", completedDate: "Jan 2023", isCompleted: true },
    // ];


    return (
        <div className="min-h-screen pb-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

            {/* TOP CARD */}
            <div className="flex justify-between bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start">

                    {/* PROFILE PIC */}
                    <div className="relative mb-6 md:mb-0 md:mr-8 group">
                        <img
                            src={profilePic}
                            className="w-32 h-32 rounded-full object-cover shadow border-4 border-white"
                            alt="profile"
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                        />

                        <button
                            onClick={handleUploadClick}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
                        >
                            <Upload size={24} className="text-white" />
                        </button>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
                        <p className="text-base text-gray-600 mt-1">
                            {user?.role} | {user?.email}
                        </p>

                        <div className="flex justify-center md:justify-start space-x-4 mt-6">
                            <button
                                onClick={() => navigate("/student/profile/editprofilepage")}
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md"
                            >
                                <Edit size={16} className="mr-2" /> Edit Profile
                            </button>

                            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Share2 size={16} className="mr-2" /> Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>

                    <ul className="space-y-3">
                        <li>
                            <NavLink to="/privacy-policy" className="flex items-center justify-between text-gray-700 hover:text-green-700 py-2">
                                <div className="flex items-center">
                                    <Shield size={16} className="mr-2 text-green-600" /> Privacy Policy
                                </div>
                                <span className="text-sm text-gray-400">&gt;</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/terms-and-conditions" className="flex items-center justify-between text-gray-700 hover:text-green-700 py-2">
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

            {/* ACHIEVEMENTS */}
            {/* <section className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {achievements.map((item, index) => (
                        <AchievementCard key={index} {...item} />
                    ))}
                </div>
            </section> */}

            {/* COURSES */}
            {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Courses</h3>
                    <div className="space-y-4">
                        {enrolledCourses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Courses</h3>
                    <div className="space-y-4">
                        {completedCourses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))}
                    </div>
                </div>
            </section> */}

            <ChangePasswordModal open={pwdModal} onClose={() => setPwdModal(false)} />
        </div>
    );
};

export default Profile;
