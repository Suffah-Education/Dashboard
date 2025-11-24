import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  ChevronRight,
  MessageSquare,
  Plus,
} from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";
import { useBatchStore } from "../../store/useBatchStore";
import { useEffect } from "react";

// ---- Static Data (unchanged) ----
const statsData = [
  {
    title: "Enrolled Students",
    value: "0", // ⭐ Will override dynamically
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
  },
  {
    title: "Tafsir 202: Al-Baqarah",
    students: 28,
    progress: 45,
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

// ---- Components ----
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="flex items-center justify-between p-5 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <div>
      <p className="text-3xl sm:text-4xl font-bold text-gray-800">
        {value}
      </p>
      <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">
        {title}
      </p>
    </div>
    <div className={`p-4 rounded-full ${bgColor}`}>{icon}</div>
  </div>
);

const CourseCard = ({ title, students, progress }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    <div className="h-32 bg-gray-200 flex items-center justify-center">
      <BookOpen size={48} className="text-gray-400" />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">
        {students} Students
      </p>
      <button className="mt-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition">
        Manage Course
      </button>
    </div>
  </div>
);

const ScheduleItem = ({ time, tag, title, statusColor }) => (
  <div className="flex items-start space-x-3 sm:space-x-4">
    <div
      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${statusColor}`}
    ></div>

    <div className="flex-1 border-b border-gray-100 pb-3">
      <p
        className={`text-xs font-bold text-white px-2 py-0.5 inline-block rounded ${statusColor}`}
      >
        {time}
      </p>

      <h4 className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
        {tag}: {title}
      </h4>

      <p className="text-xs text-gray-500 mt-0.5">Chapter on Salah</p>
    </div>
  </div>
);

// MAIN DASHBOARD
const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const userName = user?.name || "Teacher";

  const {
    teacherStudents,
    fetchTeacherStudents,
    fetchMyBatches,
    loading,
    batches,
  } = useBatchStore();

  useEffect(() => {
    // fetch teacher-specific info: students and own batches
    fetchTeacherStudents();
    fetchMyBatches();
  }, []);

  const activeStudents = (teacherStudents || []).length;

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting Box */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Assalamu 'alaikum,{" "}
          <span className="text-green-700">{userName}</span>
        </h1>
        <p className="text-gray-500 mt-1 mb-4 text-sm sm:text-base">
          Here is a summary of your teaching activities today.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-sm">
            <Plus size={18} />
            <span>Create Announcement</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-sm">
            <Calendar size={18} />
            <span>Schedule a Class</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Enrolled Students"
          value={activeStudents}
          icon={<Users size={24} className="text-blue-600" />}
          bgColor="bg-blue-50"
        />

        {statsData.slice(1).map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* The rest UI same — Courses + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              My Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(() => {
                // prefer teacher's real batches (2 newest), fall back to static data
                const teacherCourses = (batches || [])
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 2);

                if (teacherCourses.length > 0) {
                  return teacherCourses.map((batch) => {
                    const title = batch.name || batch.title || "Untitled";
                    const students = (batch.students && batch.students.length) || 0;
                    const progress = batch.capacity
                      ? Math.round((students / batch.capacity) * 100)
                      : 0;

                    return (
                      <CourseCard
                        key={batch._id || title}
                        title={title}
                        students={students}
                        progress={progress}
                      />
                    );
                  });
                }

                return coursesData.map((course, i) => (
                  <CourseCard key={i} {...course} />
                ));
              })()}
            </div>
          </div>

          {/* Student Progress (unchanged dummy data) */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Student Progress
            </h2>

            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-xs sm:text-sm">
                  <th className="py-2 px-3 sm:px-4 text-left">
                    Student Name
                  </th>
                  <th className="py-2 px-3 sm:px-4 text-left">Course</th>
                  <th className="py-2 px-3 sm:px-4 text-right">
                    Completion
                  </th>
                  <th className="py-2 px-3 sm:px-4 text-right">Grade</th>
                </tr>
              </thead>

              {/* (Dummy data unchanged) */}
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3 sm:px-4 text-gray-900 font-medium">
                    —
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-gray-600">—</td>
                  <td className="py-2 px-3 sm:px-4 text-right text-gray-600">
                    —
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Schedule */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Upcoming Schedule
            </h2>
            <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {scheduleData.map((event, i) => (
              <ScheduleItem key={i} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
