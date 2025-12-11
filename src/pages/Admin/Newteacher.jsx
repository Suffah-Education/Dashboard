import React, { useRef, useCallback } from "react";
import { Loader2, CheckCircle, XCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminPendingTeachers } from "../../Hooks/Admin/useAdminPendingTeachers";
import { useApproveTeacherMutation } from "../../Hooks/Admin/useApproveTeacherMutation";
import { useRejectTeacherMutation } from "../../Hooks/Admin/useRejectTeacherMutation";

const Newteacher = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useAdminPendingTeachers();

  const approve = useApproveTeacherMutation();
  const reject = useRejectTeacherMutation();

  const teachers =
    data?.pages.flatMap((p) => p.teachers || []) || [];

  const lastTeacherRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        New Teacher Requests
      </h2>

      {!isLoading && teachers.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No new teacher requests.
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-green-600 w-8 h-8" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, index) => (
          <div
            key={t._id}
            ref={index === teachers.length - 1 ? lastTeacherRef : null}
            onClick={() => navigate(`/admin/teacher/${t._id}`)}
            className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="text-gray-500 w-6 h-6" />
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.education}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-1">
              <strong>Phone:</strong> {t.phone}
            </p>

            {t.email && (
              <p className="text-gray-600 text-sm">
                <strong>Email:</strong> {t.email}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  approve.mutate(t._id);
                }}
                className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Approve
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reject.mutate(t._id);
                }}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                <XCircle className="w-4 h-4 mr-1" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-green-600 w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default Newteacher;
