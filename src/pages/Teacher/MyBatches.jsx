import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Users, Clock, Edit, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';
import CreateBatchModal from '../../components/CreateBatchModal'; // Assuming correct path
import { useBatchStore } from '../../store/useBatchStore'; // Path assumed

// --- Sub-Components ---

const TabButton = ({ name, isActive, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-green-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {name}
  </button>
);

const BatchCard = ({ batch }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-shadow hover:shadow-xl">
    {/* Image/Header Section (Using BookOpen as a placeholder) */}
    <div className="h-40 w-full bg-gray-200 flex items-center justify-center relative">
        <BookOpen size={48} className="text-gray-400" />
        {/* Batch Code/Tag */}
        <span className="absolute top-2 left-2 text-xs font-semibold bg-white text-gray-700 px-2 py-1 rounded-full shadow-sm">
            {batch.code}
        </span>
    </div>

    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-800 truncate">{batch.name}</h3>
      <p className="text-xs text-gray-500 mt-1">Starts: {new Date(batch.startDate).toLocaleDateString()}</p>
      
      {/* Stats Row (Using dummy data for students/pending) */}
      <div className="flex justify-between items-center text-sm mt-3 mb-4">
        <span className="flex items-center text-gray-600">
          <Users size={16} className="mr-1 text-green-600" />
          {batch.studentsCount || 0}/{batch.capacity} Students
        </span>
        <span className="flex items-center text-yellow-600 font-semibold">
          <Clock size={16} className="mr-1" />
          {batch.pendingAssignments || 0} Pending
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-2 border-t pt-3 mt-auto">
        <button className="flex flex-col items-center justify-center text-xs text-green-700 hover:text-green-900 transition p-1 rounded-md hover:bg-green-50">
          <BookOpen size={16} />
          Content
        </button>
        <button className="flex flex-col items-center justify-center text-xs text-blue-700 hover:text-blue-900 transition p-1 rounded-md hover:bg-blue-50">
          <Users size={16} />
          Students
        </button>
        <button className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gray-900 transition p-1 rounded-md hover:bg-gray-50">
          <MessageSquare size={16} />
          Messages
        </button>
        <button className="flex flex-col items-center justify-center text-xs text-yellow-700 hover:text-yellow-900 transition p-1 rounded-md hover:bg-yellow-50">
          <Edit size={16} />
          Edit
        </button>
      </div>
    </div>
  </div>
);


// --- Main Component ---

const MyBatches = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { batches, loading, error, fetchMyBatches } = useBatchStore();

  useEffect(() => {
    // Fetch batches when the component mounts
    fetchMyBatches();
  }, [fetchMyBatches]);

  return (
    <div className="space-y-8">
      
      {/* Modal Integration */}
      <CreateBatchModal 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false);
            fetchMyBatches(); // Refresh list after closing, in case of successful creation
        }} 
      />

      {/* ---------- Header and Action Button ---------- */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Batches</h1>
          <p className="text-gray-500 mt-1">Manage all your active and archived batches from here.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <Plus size={18} />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* ---------- Filters and Sort (Placeholder for actual filtering logic) ---------- */}
      <div className="flex justify-between items-center">
        {/* Tabs */}
        <div className="flex space-x-3">
          <TabButton 
            name="All Batches" 
            isActive={activeTab === 'all'} 
            onClick={() => setActiveTab('all')} 
          />
          <TabButton 
            name="Active" 
            isActive={activeTab === 'active'} 
            onClick={() => setActiveTab('active')} 
          />
          <TabButton 
            name="Archived" 
            isActive={activeTab === 'archived'} 
            onClick={() => setActiveTab('archived')} 
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition">
            <span className="font-medium">Sort By:</span> <span className="font-semibold">{sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* ---------- Batches Grid / Status Indicators ---------- */}
      
      {loading && (
        <div className="text-center py-12 text-gray-500">
            <Clock size={24} className="animate-spin inline mr-2" /> Loading batches...
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
            <AlertCircle size={20} className="mr-2" />
            Error fetching batches: {error}
        </div>
      )}

      {!loading && batches.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-lg font-semibold">No batches found.</p>
            <p>Click "Create New Batch" to get started.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {batches.map((batch) => (
          <BatchCard key={batch._id} batch={batch} />
        ))}
      </div>
      
    </div>
  );
};

export default MyBatches;