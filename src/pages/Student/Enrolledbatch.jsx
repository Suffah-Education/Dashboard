import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBatchStore } from "../../store/useBatchStore";
import { usePaymentStore } from "../../store/usePaymentStore";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  FileText,
  AlertTriangle,
} from "lucide-react";

const EnrolledBatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getBatchDetails,
    batchDetails,
    loading,
    accessStatus,
    accessError,
    renewData,
  } = useBatchStore();

  const { startPayment, payingBatchId } = usePaymentStore();

  const [tab, setTab] = useState("classes");

  useEffect(() => {
    getBatchDetails(id);
  }, [id, getBatchDetails]);

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10"></div>
        <p className="mt-3 text-gray-600">Loading batch details...</p>
      </div>
    );
  }

  // 🚨 If access blocked because subscription expired
  if (accessStatus === 402) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Expired UI (UI SAME STYLE) */}
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <AlertTriangle size={40} className="mx-auto text-orange-500 mb-4" />

          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Subscription Expired
          </h2>

          <p className="text-gray-600 mb-6">
            Your subscription for this batch has expired.
            Please renew to access classes, messages and notes again.
          </p>

          <button
            onClick={() =>
              startPayment(
                batchDetails?._id,
                batchDetails?.name,
                batchDetails?.price
              )
            }
            disabled={payingBatchId === batchDetails?._id}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            {payingBatchId === batchDetails?._id
              ? "Processing..."
              : `Renew for ₹${batchDetails?.price}`}
          </button>
        </div>
      </div>
    );
  }

  // ❌ If no data and not loading
  if (!batchDetails) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load batch. Please try again later.
      </div>
    );
  }

  const batch = batchDetails;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{batch.name}</h1>
        <p className="text-gray-600 mb-4">
          📚 Teacher:{" "}
          <span className="font-semibold text-gray-800">
            {batch.teacher?.name}
          </span>
        </p>
        {batch.description && (
          <p className="text-gray-700 mb-4">{batch.description}</p>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 mb-6 border-b border-gray-200">
        {[
          { id: "classes", label: "Classes", icon: BookOpen },
          { id: "messages", label: "Messages", icon: MessageSquare },
          { id: "details", label: "Details", icon: FileText },
        ].map(({ id: tabId, label, icon: Icon }) => (
          <button
            key={tabId}
            onClick={() => setTab(tabId)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition ${tab === tabId
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-gray-800"
              }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Classes Tab */}
        {tab === "classes" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen size={28} className="text-green-600" />
              Classes
            </h2>

            {!batch.classes || batch.classes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen size={40} className="mx-auto mb-2 opacity-50" />
                <p>No classes added yet. Check back soon!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {batch.classes.map((cls, idx) => (
                  <li
                    key={cls._id}
                    className="p-4 border rounded-lg hover:shadow-md transition flex justify-between items-center bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Class {idx + 1}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {cls.title}
                      </h3>
                      {cls.date && (
                        <p className="text-sm text-gray-500">
                          📅{" "}
                          {new Date(cls.date).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>

                    {cls.link && (
                      <a
                        href={cls.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold whitespace-nowrap"
                      >
                        Join Class
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={28} className="text-blue-600" />
              Messages from Teacher
            </h2>

            {!batch.messages || batch.messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare size={40} className="mx-auto mb-2 opacity-50" />
                <p>No messages yet. The teacher will post updates here!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {batch.messages.map((msg) => (
                  <li
                    key={msg._id}
                    className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded"
                  >
                    <p className="text-gray-800 mb-2">{msg.text}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Details Tab */}
        {tab === "details" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText size={28} className="text-purple-600" />
              About This Batch
            </h2>

            <p className="text-gray-700 mb-6">{batch.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  Start Date
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {batch.startDate
                    ? new Date(batch.startDate).toLocaleDateString("en-IN")
                    : "TBA"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  Batch Capacity
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {batch.capacity
                    ? `${batch.capacity} Students`
                    : "Unlimited"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  Total Classes
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {batch.classes?.length || 0}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  Enrolled Students
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {batch.students?.length || 0}
                </p>
              </div>
            </div>

            {batch.code && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3">Batch Code</h3>
                <div className="bg-green-50 p-4 rounded border-2 border-green-200">
                  <code className="font-mono text-lg font-bold text-green-700">
                    {batch.code}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledBatch;