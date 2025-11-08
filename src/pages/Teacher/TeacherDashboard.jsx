import { BookOpen, Users, FileText, Calendar, Clock, ChevronRight, MessageSquare, Plus, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore'; // Assuming this store exists

// --- Sample Data (Replace with data fetched from your backend) ---

const statsData = [
  {
    title: "Active Students",
    value: "124",
    icon: <Users size={24} className="text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Ungraded Assignments",
    value: "12",
    icon: <FileText size={24} className="text-yellow-600" />,
    bgColor: "bg-yellow-50",
  },
  {
    title: "Upcoming Classes",
    value: "3",
    icon: <Calendar size={24} className="text-green-600" />,
    bgColor: "bg-green-50",
  },
];

const coursesData = [
  {
    title: "Fiqh 101: Foundations",
    students: 32,
    progress: 75,
    imageUrl: "https://via.placeholder.com/300x150?text=Fiqh+101",
  },
  {
    title: "Tafsir 202: Al-Baqarah",
    students: 28,
    progress: 45,
    imageUrl: "https://via.placeholder.com/300x150?text=Tafsir+202",
  },
];

const scheduleData = [
  {
    time: "TODAY 3PM",
    tag: "Live Class",
    title: "Fiqh 101: Chapter on Salah",
    statusColor: "bg-cyan-500",
  },
  {
    time: "TOMORROW 11:59PM",
    tag: "Assignment Due",
    title: "Tafsir 202 - Surat Al-Fatiha",
    statusColor: "bg-yellow-500",
  },
  {
    time: "NOV 25 1PM",
    tag: "Live Class",
    title: "Tajweed Intro: Makharij al-Huruf",
    statusColor: "bg-blue-500",
  },
];

const studentProgressData = [
  { name: "Aisha Ahmed", course: "Fiqh 101", completion: "85%", grade: "A-", gradeColor: "text-green-600" },
  { name: "Bilal Khan", course: "Tafsir 202", completion: "60%", grade: "B", gradeColor: "text-yellow-600" },
  { name: "Yasmin Ali", course: "Fiqh 101", completion: "92%", grade: "A", gradeColor: "text-green-700" },
  { name: "Omar Hassan", course: "Tafsir 202", completion: "35%", grade: "C-", gradeColor: "text-red-600" },
];

// --- Sub-Components ---

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md border border-gray-100">
    <div>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
      <p className="text-base text-gray-500 mt-1 font-medium">{title}</p>
    </div>
    <div className={`p-4 rounded-full ${bgColor}`}>
      {icon}
    </div>
  </div>
);

const CourseCard = ({ title, students, progress, imageUrl }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
    <div className="h-32 bg-gray-200 flex items-center justify-center">
        {/* Placeholder for the image */}
        <BookOpen size={48} className="text-gray-400" />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">{students} Students</p>
      
      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 text-right font-medium">{progress}%</p>
      </div>
      
      <button className="mt-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition">
        Manage Course
      </button>
    </div>
  </div>
);

const ScheduleItem = ({ time, tag, title, statusColor }) => (
  <div className="flex items-start space-x-4">
    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${statusColor}`}></div>
    <div className="flex-1 border-b border-gray-100 pb-3">
      <p className={`text-xs font-bold text-white px-2 py-0.5 inline-block rounded ${statusColor}`}>{time}</p>
      <h4 className="text-sm font-semibold text-gray-800 mt-1">{tag}: {title}</h4>
      <p className="text-xs text-gray-500 mt-0.5">Chapter on Salah</p> {/* Hardcoded topic, adjust as needed */}
    </div>
  </div>
);


// --- Main Dashboard Component ---

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const userName = user?.name || "Ustadha Fatima"; // Use a default if user object isn't fully populated

  return (
    <div className="space-y-8 pb-8">
      
      {/* ---------- 1. Greeting & Action Buttons ---------- */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          Assalamu 'alaikum, <span className="text-green-700">{userName}</span>
        </h1>
        <p className="text-gray-500 mt-1 mb-4">
          Here is a summary of your teaching activities today.
        </p>
        <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">
                <Plus size={18} />
                <span>Create Announcement</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">
                <Calendar size={18} />
                <span>Schedule a Class</span>
            </button>
        </div>
      </div>


      {/* ---------- 2. Stats Cards Row ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* ---------- 3. Main Content Grid (My Courses & Schedule) ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column (My Courses & Student Progress) --- */}
        <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coursesData.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>

            {/* Student Progress Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Progress</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4 text-right">Completion</th>
                        <th className="py-3 px-4 text-right">Recent Grade</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                    {studentProgressData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{item.course}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 text-right">{item.completion}</td>
                            <td className={`py-3 px-4 whitespace-nowrap text-sm font-bold text-right ${item.gradeColor}`}>{item.grade}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                        View All Students <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>


        {/* --- Right Column (Upcoming Schedule) --- */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Schedule</h2>
            <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {scheduleData.map((event, index) => (
              <ScheduleItem key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;