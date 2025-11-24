import React from 'react';
import { Plus, BookOpen, Users, Check, MessageSquare } from 'lucide-react';

// --- Color Variables for Integration with Light Theme ---
// Using standard Tailwind classes for better integration
const DASHBOARD_BG = 'bg-gray-50';        // Matches Layout.jsx background
const CARD_BG = 'bg-white';               // Standard card background
const ACCENT_CLASS = 'text-green-600';    // Primary accent color (green)
const ACCENT_COLOR_HEX = '#059669';       // The hex for green-600 for styling non-class properties
const TEXT_PRIMARY = 'text-gray-900';     // Main text color
const TEXT_MUTED = 'text-gray-500';       // Secondary text color

// --- Helper Components ---

const StatCard = ({ title, value }) => (
  // Updated to use white background and gray shadow
  <div className={`${CARD_BG} p-4 sm:p-5 rounded-lg shadow-md flex flex-col justify-between ${TEXT_PRIMARY} w-full h-auto min-h-24 transition-all hover:ring-1 hover:ring-green-400`}>
    <p className={`text-sm ${TEXT_MUTED}`}>{title}</p>
    <p className="text-3xl sm:text-4xl font-semibold mt-1">{value}</p>
  </div>
);

const ActivityItem = ({ text, time, icon, iconColor }) => (
  <div className="flex items-start">
    {/* Circular Icon Container matching the image style but using the light theme colors */}
    <span 
        className="p-2 rounded-full mr-3 flex-shrink-0 bg-green-50" 
        style={{ color: iconColor }} // Icon color set via prop (will be ACCENT_COLOR_HEX)
    >
      {icon}
    </span>
    <div className="flex-1">
      <p className={`text-sm leading-snug ${TEXT_PRIMARY}`}>{text}</p>
      <p className={`text-xs mt-1 ${TEXT_MUTED}`}>{time}</p>
    </div>
  </div>
);

// --- Main AdminDashboard Component ---

const AdminDashboard = () => {
  // Mock Data (unchanged)
  const stats = [
    { title: "Total Students", value: "120" },
    { title: "Active Teachers", value: "15" },
    { title: "Ongoing Classes", value: "8" },
    { title: "Upcoming Sessions", value: "4" },
  ];

  const classSchedule = [
    { time: "10:00 AM, Today", course: "Advanced Tafsir", teacher: "Sheikh Abdullah" },
    { time: "2:00 PM, Today", course: "Arabic Language Level 2", teacher: "Ustadha Fatima" },
    { time: "9:00 AM, Tomorrow", course: "Seerah of the Prophet (PBUH)", teacher: "Dr. Ahmed Khan" },
    { time: "11:00 AM, Tomorrow", course: "Fiqh of Worship", teacher: "Imam Yusuf" },
  ];

  const recentActivities = [
    {
      text: "New assignment posted for 'Advanced Tafsir'.",
      time: "1 hours ago",
      icon: <BookOpen size={14} strokeWidth={2} />,
      color: ACCENT_COLOR_HEX,
    },
    {
      text: "Aisha Ahmed enrolled in 'Arabic Language'.",
      time: "5 hours ago",
      icon: <Users size={14} strokeWidth={2} />,
      color: ACCENT_COLOR_HEX,
    },
    {
      text: "You marked attendance for 'Seerah' class.",
      time: "1 day ago",
      icon: <Check size={14} strokeWidth={3} />, 
      color: ACCENT_COLOR_HEX,
    },
    {
      text: "New message from Omar Farooq.",
      time: "2 days ago",
      icon: <MessageSquare size={14} strokeWidth={2} />,
      color: ACCENT_COLOR_HEX,
    },
  ];

  return (
    // Set the main background to gray-50 to match Layout.jsx
    <div className={`p-4 md:p-8 min-h-[calc(100vh-80px)] ${DASHBOARD_BG}`}>
      
      {/* 1. Header/Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          {/* Welcome Text */}
          <h1 className={`text-2xl sm:text-3xl font-bold ${TEXT_PRIMARY} mb-1`}>
            As-salamu alaykum, <span className={`${TEXT_PRIMARY}`}>User Name!</span>
          </h1>
          <p className={`text-sm ${TEXT_MUTED}`}>
            Welcome back to your dashboard. Here is an overview of your activities.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {/* Add Course Button - Now white background with green border/text */}
          <button 
            style={{ borderColor: ACCENT_COLOR_HEX, color: ACCENT_COLOR_HEX }}
            className={`flex items-center justify-center sm:justify-start px-4 py-2 text-sm font-medium rounded-md bg-white border hover:bg-green-50 transition-colors`}
          >
            <Plus size={16} className="mr-2" />
            Add Course
          </button>
          {/* Create Class Button - Solid green background with white text */}
          <button 
            className={`flex items-center justify-center sm:justify-start px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors`}
          >
            <Plus size={16} className="mr-2 text-white"/>
            Create Class
          </button>
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* 3. Main Content Area (Schedule & Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Upcoming Class Schedule (White Card) */}
        <div className={`lg:col-span-2 p-4 sm:p-6 rounded-lg shadow-md ${CARD_BG}`}>
          <h2 className={`text-lg sm:text-xl font-semibold mb-6 ${TEXT_PRIMARY}`}>Upcoming Class Schedule</h2>
          
          <div className="space-y-4">
            {/* Table Header (simulated) */}
            <div className={`hidden sm:grid grid-cols-3 gap-4 text-xs font-medium uppercase px-4 ${TEXT_MUTED}`}>
                <p>Time & Date</p>
                <p>Course</p>
                <p>Teacher</p>
            </div>
            
            {/* Table Rows - Using a light gray background for the rows for the striped effect */}
            {classSchedule.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4 p-4 rounded-md transition-colors ${index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}`}
              >
                <p className={`text-sm font-bold sm:font-medium ${TEXT_PRIMARY}`}>{item.time}</p>
                <p className={`text-sm sm:font-normal ${TEXT_PRIMARY}`}>{item.course}</p>
                <p className={`text-sm sm:font-normal ${TEXT_PRIMARY}`}>{item.teacher}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activities (White Card) */}
        <div className={`lg:col-span-1 p-4 sm:p-6 rounded-lg shadow-md ${CARD_BG}`}>
          <h2 className={`text-lg sm:text-xl font-semibold mb-6 ${TEXT_PRIMARY}`}>Recent Activities</h2>
          
          <div className="space-y-5">
            {recentActivities.map((activity, index) => (
              <ActivityItem 
                key={index}
                icon={activity.icon}
                text={activity.text}
                time={activity.time}
                iconColor={activity.color}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;