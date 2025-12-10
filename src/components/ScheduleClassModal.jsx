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
setScheduleTime
}) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Schedule a Class
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">

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

                    {/* Title */}
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

                    {/* Date & Time */}
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                        </label>
                        <input
                            type="time"
                            className="w-full border rounded-lg px-3 py-2"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                        />
                    </div>


                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
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
