import React, { useState } from "react";
import { useBatchStore } from "../store/useBatchStore";

const EditBatchModal = ({ isOpen, onClose, batch }) => {
  const { updateBatch } = useBatchStore();

  const [form, setForm] = useState({
    name: batch?.name || "",
    description: batch?.description || "",
    syllabus: batch?.syllabus?.join("\n") || "",
    price: batch?.price || "",
    startDate: batch?.startDate?.slice(0, 10) || "",
    endDate: batch?.endDate?.slice(0, 10) || "",
    capacity: batch?.capacity || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateBatch(batch._id, {
      ...form,
      syllabus: form.syllabus.split("\n"), // convert text back to array
    });

    alert("Batch Updated!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg space-y-4 shadow-lg">
        
        <h2 className="text-xl font-bold">Edit Batch</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Batch Name"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-20"
          placeholder="Description"
        />

        <textarea
          name="syllabus"
          value={form.syllabus}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
          placeholder="Enter syllabus line by line"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Price"
        />

        <div className="flex gap-2">
          <input
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
            className="w-full p-2 border rounded"
          />
          <input
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            type="date"
            className="w-full p-2 border rounded"
          />
        </div>

        <input
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Capacity"
        />

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBatchModal;
