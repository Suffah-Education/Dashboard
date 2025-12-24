import {
  BookOpen,
  Users,
  Calendar,
  ChevronRight,
  Plus,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../../store/useAuthStore";
import { useBatchStore } from "../../store/useBatchStore";

// React Query GET hooks
import { useTeacherStudentsQuery } from "../../Hooks/teachers/useTeacherStudentsQuery";
import { useTeacherBatchesQuery } from "../../Hooks/teachers/useTeacherBatchesQuery";

import AnnouncementModal from "../../components/AnnouncementModal";
import ScheduleClassModal from "../../components/ScheduleClassModal";

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-gray-100">
    <div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-1 font-medium">{title}</p>
    </div>
    <div className={`p-4 rounded-full ${bgColor}`}>{icon}</div>
  </div>
);

const CourseCard = ({ title, students, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg cursor-pointer transition"
  >
    <div className="h-32 bg-gray-200 flex items-center justify-center">
      <BookOpen size={48} className="text-gray-400" />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">{students} Students</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="mt-3 px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-lg hover:bg-green-200"
      >
        Manage Course
      </button>
    </div>
  </div>
);

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
];

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { addClass, sendMessage, teacherStudents, batches } = useBatchStore();

  const { data: studentData } = useTeacherStudentsQuery();
  const { data: batchData } = useTeacherBatchesQuery();

  const finalStudents =
    studentData?.pages.flatMap((p) => p.students) ||
    teacherStudents ||
    [];

  const finalBatches =
    batchData?.pages.flatMap((p) => p.batches) ||
    batches ||
    [];

  const activeStudents = finalStudents.length;
  const totalBatches = finalBatches.length;
  const upcomingClasses = finalBatches.reduce(
    (sum, b) => sum + (b.classes?.length || 0),
    0
  );

  // ----------------------
  // MODALS STATE
  // ----------------------
  const [showSchedule, setShowSchedule] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  // schedule form states
  const [scheduleBatchId, setScheduleBatchId] = useState("");
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleLink, setScheduleLink] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleEndTime, setScheduleEndTime] = useState("");


  // announcement
  const [announceBatchId, setAnnounceBatchId] = useState("");
  const [announceText, setAnnounceText] = useState("");

  const [loading, setLoading] = useState(false);

  // ----------------------
  // HANDLERS
  // ----------------------
  const submitSchedule = async (e) => {
    e.preventDefault();

    if (
      !scheduleBatchId ||
      !scheduleTitle ||
      !scheduleLink ||
      !scheduleDate ||
      !scheduleTime ||
      !scheduleEndTime
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const startTime = new Date(`${scheduleDate}T${scheduleTime}`);
      const endTime = new Date(`${scheduleDate}T${scheduleEndTime}`);

      await addClass(scheduleBatchId, {
        title: scheduleTitle,
        link: scheduleLink,
        startTime,
        endTime,
      });

      // ⭐ Invalidate queries to refresh UI
      queryClient.invalidateQueries(["teacherBatches"]);
      queryClient.invalidateQueries(["batchDetails", scheduleBatchId]);

      alert("Class Scheduled Successfully!");

      // reset
      setScheduleBatchId("");
      setScheduleTitle("");
      setScheduleLink("");
      setScheduleDate("");
      setScheduleTime("");
      setScheduleEndTime("");

      setShowSchedule(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to schedule class";
      alert(`Failed to schedule class: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };


  const submitAnnouncement = async (e) => {
    e.preventDefault();
    if (!announceBatchId || !announceText.trim()) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await sendMessage(announceBatchId, announceText);

      alert("Announcement Sent!");

      setAnnounceBatchId("");
      setAnnounceText("");

      setShowAnnouncement(false);

    } catch (err) {
      console.error(err);
      alert("Failed to send announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold">
          Assalamu Alaikum,{" "}
          <span className="text-green-700">{user?.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">Your teaching summary</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowAnnouncement(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <Plus size={18} />
            Create Announcement
          </button>

          <button
            onClick={() => setShowSchedule(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <Calendar size={18} />
            Schedule Class
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Your Students"
          value={activeStudents}
          icon={<Users size={24} className="text-blue-600" />}
          bgColor="bg-blue-50"
        />

        <StatCard
          title="Your Batches"
          value={totalBatches}
          icon={<BookOpen size={24} className="text-green-600" />}
          bgColor="bg-green-50"
        />

        <StatCard
          title="Upcoming Classes"
          value={upcomingClasses}
          icon={<Calendar size={24} className="text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* COURSES */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {finalBatches.slice(0, 4).map((batch) => (
            <CourseCard
              key={batch._id}
              title={batch.name}
              students={batch.students.length}
              onClick={() => navigate(`/teacher/batch/${batch._id}`)}
            />
          ))}
        </div>
      </div>

      {/* MODALS */}
      {showSchedule && (
        <ScheduleClassModal
          batches={finalBatches}
          onClose={() => setShowSchedule(false)}
          onSubmit={submitSchedule}
          loading={loading}
          scheduleBatchId={scheduleBatchId}
          setScheduleBatchId={setScheduleBatchId}
          scheduleTitle={scheduleTitle}
          setScheduleTitle={setScheduleTitle}
          scheduleLink={scheduleLink}
          setScheduleLink={setScheduleLink}
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
          scheduleTime={scheduleTime}
          setScheduleTime={setScheduleTime}
          scheduleEndTime={scheduleEndTime}
          setScheduleEndTime={setScheduleEndTime}
        />

      )}

      {showAnnouncement && (
        <AnnouncementModal
          batches={finalBatches}
          onClose={() => setShowAnnouncement(false)}
          onSubmit={submitAnnouncement}
          loading={loading}
          announceBatchId={announceBatchId}
          setAnnounceBatchId={setAnnounceBatchId}
          announceText={announceText}
          setAnnounceText={setAnnounceText}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
