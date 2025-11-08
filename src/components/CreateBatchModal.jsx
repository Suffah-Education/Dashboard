import React, { useState } from 'react';
import { X, Calendar, Users, Hash } from 'lucide-react';
import { useBatchStore } from '../store/useBatchStore'; // Path assumed
import { useAuthStore } from '../store/useAuthStore'; // To get teacher ID

const CreateBatchModal = ({ isOpen, onClose }) => {
  const { createBatch, loading } = useBatchStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    startDate: '',
    capacity: 25,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
        alert("Authentication error: Teacher ID not found.");
        return;
    }
    
    // API call using the store function
    const success = await createBatch({ 
        ...formData, 
        teacher: user.id 
    });

    if (success) {
      alert("Batch created successfully!");
      setFormData({ name: '', code: '', startDate: '', capacity: 25 });
      onClose();
    } else {
        alert("Failed to create batch. Check console for details.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Create New Batch</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Batch Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Batch Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Fiqh 101 - Spring 2026"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Batch Code and Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Batch Code (Unique)</label>
              <div className="flex items-center">
                <Hash size={18} className="text-gray-400 absolute ml-3" />
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., BATCH-001"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <div className="flex items-center">
                <Users size={18} className="text-gray-400 absolute ml-3" />
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 absolute ml-3" />
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
            </div>
          </div>
          
          {/* Actions */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Create Batch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatchModal;