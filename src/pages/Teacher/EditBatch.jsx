import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ⭐ NEW — React Query
import { useBatchDetailsQuery } from "../../Hooks/teachers/useBatchDetailsQuery";
import { useUpdateBatchMutation } from "../../Hooks/teachers/useUpdateBatchMutation";

const EditBatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ⭐ React Query: Fetch batch details
  const { data: batch, isLoading } = useBatchDetailsQuery(id);

  // ⭐ React Query: Update batch mutation
  const updateBatchMutation = useUpdateBatchMutation(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    syllabus: "",
    price: "",
    startDate: "",
    endDate: "",
    capacity: "",
  });

  // Set form values when batch loads
  useEffect(() => {
    if (batch) {
      setForm({
        name: batch.name || "",
        description: batch.description || "",
        syllabus: (batch.syllabus || []).join("\n"),
        price: batch.price || "",
        startDate: batch.startDate?.slice(0, 10) || "",
        endDate: batch.endDate?.slice(0, 10) || "",
        capacity: batch.capacity || "",
      });
    }
  }, [batch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updatedData = {
      ...form,
      syllabus: form.syllabus
        .split("\n")
        .filter((s) => s.trim()),
    };

    const success = await updateBatchMutation.mutateAsync(updatedData);

    if (success) {
      alert("Batch Updated Successfully!");
      navigate(-1);
    } else {
      alert("Failed to update batch. Please try again.");
    }
  };

  if (isLoading || !batch) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading batch details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Edit Batch</h1>
        <p className="text-gray-500 mt-1">Update batch details below</p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-5">
        {/* Batch Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Batch Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter batch name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            placeholder="Enter batch description"
          />
        </div>

        {/* Syllabus */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Syllabus (one item per line)
          </label>
          <textarea
            name="syllabus"
            value={form.syllabus}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-28"
            placeholder="Enter syllabus items&#10;One item per line"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹)
          </label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter price"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              type="date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              type="date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Capacity
          </label>
          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter batch capacity"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={updateBatchMutation.isPending}
          className={`px-6 py-2 bg-green-600 text-white font-semibold rounded-lg transition ${
            updateBatchMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-700"
          }`}
        >
          {updateBatchMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditBatch;
