import React from "react";
import { Clock } from "lucide-react";

const InReview = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
        <Clock className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Account Under Review</h2>
        <p className="text-gray-600 mb-4">
          Thank you for signing up as a teacher. Your profile is currently under review by our admin team.
        </p>
        <p className="text-sm text-gray-500">
          You’ll receive access once your account is approved.
        </p>
      </div>
    </div>
  );
};

export default InReview;
