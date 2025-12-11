import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, User, BookOpen } from "lucide-react";

import { useAdminSingleTeacher } from "../../Hooks/Admin/useAdminSingleTeacher";
import { useApproveTeacherMutation } from "../../Hooks/Admin/useApproveTeacherMutation";
import { useRejectTeacherMutation } from "../../Hooks/Admin/useRejectTeacherMutation";

const TeacherRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: teacher, isLoading } = useAdminSingleTeacher(id);
  const approve = useApproveTeacherMutation();
  const reject = useRejectTeacherMutation();

  if (isLoading || !teacher) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading teacher details...
      </div>
    );
  }

  const t = teacher;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-gray-600 hover:text-green-600"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white shadow p-6 rounded-xl border max-w-3xl mx-auto">
        <div className="flex items-center space-x-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{t.name}</h1>
            <p className="text-gray-500">{t.education}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="flex items-center text-gray-700">
            <Mail size={18} className="mr-3 text-green-600" /> {t.email}
          </p>

          <p className="flex items-center text-gray-700">
            <Phone size={18} className="mr-3 text-green-600" /> {t.phone}
          </p>

          {t.education && (
            <p className="flex items-center text-gray-700">
              <BookOpen size={18} className="mr-3 text-green-600" />{" "}
              {t.education}
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={() => {
              approve.mutate(t._id);
              navigate(-1);
            }}
          >
            Approve
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => {
              reject.mutate(t._id);
              navigate(-1);
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequestDetails;
