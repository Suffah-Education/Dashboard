import React, { useState } from "react"; 
import { X, Calendar, Users, Hash, PlusCircle, Trash, IndianRupee } from "lucide-react";
import { useBatchStore } from "../store/useBatchStore";
import { useAuthStore } from "../store/useAuthStore";

const CreateBatchModal = ({ isOpen, onClose }) => {
  const { createBatch, loading } = useBatchStore();
  const { user } = useAuthStore();

  const [syllabus, setSyllabus] = useState([]);
  const [topicInput, setTopicInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startDate: "",
    endDate: "",
    duration: "",
    capacity: 25,
    description: "",
    price: "",     // ⭐ NEW
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTopic = () => {
    if (!topicInput.trim()) return;
    setSyllabus([...syllabus, topicInput.trim()]);
    setTopicInput("");
  };

  const removeTopic = (index) => {
    const newList = syllabus.filter((_, i) => i !== index);
    setSyllabus(newList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Authentication error: Teacher ID missing.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),   // ⭐ ensure number
      syllabus,
      teacher: user.id,
    };

    const success = await createBatch(payload);

    if (success) {
      alert("Batch created successfully!");
      setFormData({
        name: "",
        code: "",
        startDate: "",
        endDate: "",
        duration: "",
        capacity: 25,
        description: "",
        price: "",
      });
      setSyllabus([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative border border-gray-200 max-h-[80vh] overflow-y-auto p-7">

        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <X size={26} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Batch
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Batch Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Tafseer Batch 2026"
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500"
              required
            />
          </div>

          {/* Code + Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Batch Code</label>
              <div className="relative">
                <Hash size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="BATCH123"
                  className="w-full pl-10 py-2 border rounded-lg focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
              <div className="relative">
                <Users size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border rounded-lg focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Course Price (₹)</label>
            <div className="relative">
              <IndianRupee size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 499"
                className="w-full pl-10 py-2 border rounded-lg focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border rounded-lg focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border rounded-lg focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 Months"
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write batch details here..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-500"
            ></textarea>
          </div>

          {/* Syllabus */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Syllabus Topics</label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Add topic..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={addTopic}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg flex items-center"
              >
                <PlusCircle size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {syllabus.map((topic, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <span>{topic}</span>
                  <button
                    onClick={() => removeTopic(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
            >
              {loading ? "Saving..." : "Create Batch"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateBatchModal;
