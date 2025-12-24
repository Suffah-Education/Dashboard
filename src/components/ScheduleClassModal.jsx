import React from "react";

const ScheduleClassModal = ({
    batches,
    onClose,
    onSubmit,
    loading,
    scheduleBatchId,
    setScheduleBatchId,
    scheduleTitle,
    setScheduleTitle,
    scheduleLink,
    setScheduleLink,
    scheduleDate,
    setScheduleDate,
    scheduleTime,
    setScheduleTime,
    scheduleEndTime,
    setScheduleEndTime,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            {/* CARD */}
            <div
                className="
          bg-white w-full max-w-md 
          rounded-xl shadow-xl
          max-h-[85vh] overflow-y-auto
          p-6
        "
            >
                {/* HEADER */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Schedule a Class
                </h2>

                <form onSubmit={onSubmit} className="space-y-3">
                    {/* Select Batch */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Batch
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleBatchId}
                            onChange={(e) => setScheduleBatchId(e.target.value)}
                        >
                            <option value="">-- Choose batch --</option>
                            {batches.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Class Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Class Title
                        </label>
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleTitle}
                            onChange={(e) => setScheduleTitle(e.target.value)}
                            placeholder="Topic name"
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meet / Zoom Link
                        </label>
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleLink}
                            onChange={(e) => setScheduleLink(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Time
                        </label>
                        <input
                            type="time"
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Time
                        </label>
                        <input
                            type="time"
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleEndTime}
                            onChange={(e) => setScheduleEndTime(e.target.value)}
                        />
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleClassModal;
