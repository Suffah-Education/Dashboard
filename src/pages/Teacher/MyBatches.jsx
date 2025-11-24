import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  Users,
  Clock,
  Trash2,
  Edit,
  MessageSquare,
  BookOpen,
  AlertCircle,
} from "lucide-react";

import CreateBatchModal from "../../components/CreateBatchModal";
import { useBatchStore } from "../../store/useBatchStore";
import { useNavigate } from "react-router-dom";


// ---------- TAB BUTTON ----------
const TabButton = ({ name, isActive, onClick }) => (
  <button
    className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white shadow"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {name}
  </button>
);


// ----------- BATCH CARD COMPONENT -----------
const BatchCard = ({ batch, navigate, deleteBatch }) => (
  <div
    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition hover:shadow-lg cursor-pointer"
    onClick={() => navigate(`/teacher/batch/${batch._id}`)}
  >
    {/* IMAGE + CODE */}
    <div className="h-32 sm:h-40 w-full bg-gray-200 flex items-center justify-center relative">
      <BookOpen size={40} className="text-gray-400" />
      <span className="absolute top-2 left-2 text-xs font-semibold bg-white text-gray-700 px-2 py-1 rounded-full shadow">
        {batch.code}
      </span>
    </div>

    {/* BODY */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
        {batch.name}
      </h3>

      <p className="text-xs text-gray-500 mt-1">
        Starts: {new Date(batch.startDate).toLocaleDateString()}
      </p>

      <div className="flex flex-col sm:flex-row justify-between text-sm mt-3 mb-4 gap-2">
        <span className="flex items-center text-gray-600">
          <Users size={16} className="mr-1 text-green-600" />
          {batch.students?.length || 0}/{batch.capacity} Students
        </span>

        <span className="flex items-center text-yellow-600 font-semibold">
          <Clock size={16} className="mr-1" />
          {batch.pendingAssignments || 0} Pending
        </span>
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t pt-3 mt-auto">

        {/* CONTENT */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/teacher/batch/${batch._id}?tab=content`);
          }}
          className="flex flex-col items-center text-xs text-green-700 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
        >
          <BookOpen size={16} /> Content
        </button>

        {/* STUDENTS */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/teacher/batch/${batch._id}?tab=students`);
          }}
          className="flex flex-col items-center text-xs text-blue-700 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
        >
          <Users size={16} /> Students
        </button>

        {/* MESSAGES */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/teacher/batch/${batch._id}?tab=messages`);
          }}
          className="flex flex-col items-center text-xs text-gray-700 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50"
        >
          <MessageSquare size={16} /> Messages
        </button>

        {/* DELETE */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to delete this batch?")) {
              const ok = await deleteBatch(batch._id);
              if (!ok) alert("Failed to delete batch");
            }
          }}
          className="flex flex-col items-center text-xs text-red-700 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  </div>
);


// =========== PAGE =============
const MyBatches = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    batches,
    loading,
    error,
    fetchMyBatches,
    deleteBatch,   // <-- IMPORTANT FIX
  } = useBatchStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBatches();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* CREATE MODAL */}
      <CreateBatchModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchMyBatches();
        }}
      />

      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Batches</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all your active and archived batches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          <Plus size={18} className="mr-1" />
          Create New Batch
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-3 pb-2 border-b">
        <TabButton
          name="All"
          isActive={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />
        <TabButton
          name="Active"
          isActive={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        />
        <TabButton
          name="Archived"
          isActive={activeTab === "archived"}
          onClick={() => setActiveTab("archived")}
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          <Clock size={20} className="animate-spin inline mr-2" />
          Loading batches...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm flex items-center">
          <AlertCircle size={18} className="mr-2" />
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading && batches.length === 0 && (
        <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <BookOpen size={36} className="mx-auto text-gray-400 mb-3" />
          <p className="text-base font-semibold">No batches found.</p>
          <p className="text-sm">Click "Create New Batch" to get started.</p>
        </div>
      )}

      {/* BATCH GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {batches.map((batch) => (
          <BatchCard
            key={batch._id}
            batch={batch}
            navigate={navigate}
            deleteBatch={deleteBatch}    // <-- PASS FUNCTION
          />
        ))}
      </div>
    </div>
  );
};

export default MyBatches;
