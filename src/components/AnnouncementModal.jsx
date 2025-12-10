import React from "react";

const AnnouncementModal = ({
  batches,
  onClose,
  onSubmit,
  loading,
  announceBatchId,
  setAnnounceBatchId,
  announceText,
  setAnnounceText
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Create Announcement
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">

          {/* Batch select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Batch
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={announceBatchId}
              onChange={(e) => setAnnounceBatchId(e.target.value)}
            >
              <option value="">-- Choose batch --</option>
              {batches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Announcement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-24"
              value={announceText}
              onChange={(e) => setAnnounceText(e.target.value)}
              placeholder="Write announcement..."
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
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
