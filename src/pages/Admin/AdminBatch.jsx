import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAdminBatchDetails } from "../../Hooks/Admin/useAdminBatchDetails";

import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  FileText,
  Users,
} from "lucide-react";

const AdminBatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: batch, isLoading } = useAdminBatchDetails(id);
  const [tab, setTab] = useState("classes");

  if (isLoading || !batch) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{batch.name}</h1>
        <p className="text-gray-700">
          Teacher: <span className="font-semibold">{batch.teacher?.name}</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 border-b">
        {[
          { id: "classes", label: "Classes", icon: BookOpen },
          { id: "messages", label: "Messages", icon: MessageSquare },
          { id: "students", label: "Students", icon: Users },
          { id: "details", label: "Details", icon: FileText },
        ].map(({ id: tabId, label, icon: Icon }) => (
          <button
            key={tabId}
            onClick={() => setTab(tabId)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition ${
              tab === tabId
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Classes */}
        {tab === "classes" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-green-600" /> Classes
            </h2>

            {batch.classes?.length === 0 ? (
              <p className="text-gray-500 text-center">No classes added yet</p>
            ) : (
              <ul className="space-y-4">
                {batch.classes.map((cls, i) => (
                  <li
                    key={cls._id}
                    className="p-4 border rounded-lg bg-gray-50 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        Class {i + 1}: {cls.title}
                      </p>
                    </div>

                    <a
                      href={cls.link}
                      target="_blank"
                      className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Join
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Messages */}
        {tab === "messages" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="text-blue-600" /> Messages
            </h2>

            {batch.messages?.length === 0 ? (
              <p className="text-gray-500 text-center">No messages yet</p>
            ) : (
              <ul className="space-y-4">
                {batch.messages.map((m) => (
                  <li
                    key={m._id}
                    className="p-4 bg-blue-50 border-l-4 border-blue-600"
                  >
                    <p>{m.text}</p>
                    <span className="text-xs text-gray-600">
                      {new Date(m.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Students */}
        {tab === "students" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-purple-600" /> Students
            </h2>

            {batch.students?.length === 0 ? (
              <p className="text-gray-500 text-center">No students enrolled</p>
            ) : (
              <ul className="space-y-3">
                {batch.students.map((s) => (
                  <li key={s._id} className="p-3 bg-gray-100 rounded">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-sm text-gray-600">{s.city}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Details */}
        {tab === "details" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-purple-600" /> Details
            </h2>

            <p className="text-gray-700 mb-4">{batch.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded border">
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-semibold">
                  {new Date(batch.startDate).toLocaleDateString()}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded border">
                <p className="text-sm text-gray-600">Capacity</p>
                <p className="font-semibold">{batch.capacity}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminBatch;
