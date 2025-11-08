import React from "react";
import { ArrowRight } from "lucide-react";

const StudentDashboard = () => {
  const batches = [
    {
      name: "Hafiz Batch",
      teacher: "Maulana Abdul Rahman",
      progress: 75,
      img: "https://images.unsplash.com/photo-1604908177522-f9e7123dfb96?w=400",
    },
    {
      name: "Aalim Batch",
      teacher: "Ustad Yusuf Ali",
      progress: 40,
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
    },
    {
      name: "Tafseer Batch",
      teacher: "Dr. Aisha Rahman",
      progress: 20,
      img: "https://images.unsplash.com/photo-1616628188465-9c3a235f7f6b?w=400",
    },
  ];

  const tafseers = [
    {
      title: "Tafseer-ul-Quran - Live Bayan",
      subtitle: "Surah Al-Baqarah (Part 2)",
      time: "Today, 5:00 PM",
    },
    {
      title: "Hadith Explanation - Class 4",
      subtitle: "Riyaz-us-Saliheen",
      time: "Tomorrow, 2:00 PM",
    },
    {
      title: "Qirat Competition",
      subtitle: "Final Round",
      time: "Sunday, 11:00 AM",
    },
  ];

  return (
    <div className="bg-[#f8f9f8] min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Assalamu Alaikum, Salman!
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2">
          {/* My Batches */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-gray-800">My Batches</h2>
            <button className="text-green-600 text-sm font-medium flex items-center hover:text-green-700">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            {batches.map((batch, i) => (
              <div
                key={i}
                className="bg-white shadow-sm rounded-xl overflow-hidden transition hover:shadow-md"
              >
                <img
                  src={batch.img}
                  alt={batch.name}
                  className="h-28 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {batch.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {batch.teacher}
                  </p>
                  {/* <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div> */}
                  {/* <p className="text-sm text-gray-600 mb-3">
                    Progress: {batch.progress}%
                  </p> */}
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md">
                    RS 999
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Tafseers & Bayans */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Upcoming Tafseers & Bayans
              </h2>
              <button className="text-green-600 text-sm font-medium flex items-center hover:text-green-700">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {tafseers.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3 last:border-none">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                  <span className="text-red-500 text-sm font-medium">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Today's Schedule
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-800">
                  Tafseer-ul-Quran Session
                </p>
                <p className="text-sm text-gray-500">10:00 AM - 11:00 AM</p>
                <a href="#" className="text-green-600 text-sm font-medium">
                  Join Class →
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Hadith Explanation
                </p>
                <p className="text-sm text-gray-500">2:00 PM - 3:30 PM</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Assignment Submission
                </p>
                <p className="text-sm text-gray-500">11:59 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Syllabus", "Doubt Forum", "Announcements", "Practice Tests"].map(
                (link, i) => (
                  <button
                    key={i}
                    className="bg-green-50 hover:bg-green-100 text-green-700 py-3 rounded-lg text-sm font-medium transition"
                  >
                    {link}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
