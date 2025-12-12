import React, { useState } from "react";
import { useBatchStore } from "../../store/useBatchStore";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MessageSquare,
  BookOpen,
  Edit,
  PlusCircle,
  Video,
  CheckCircle,
  Download,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import QRCode from "qrcode";

// ⭐ NEW: React Query
import { useBatchDetailsQuery } from "../../Hooks/teachers/useBatchDetailsQuery";
import { useQueryClient } from "@tanstack/react-query";

const TabBtn = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${active
      ? "text-green-600 border-b-2 border-green-600 pb-3"
      : "text-gray-500 hover:text-green-600 pb-3"
      }`}
  >
    <Icon size={18} /> {label}
  </button>
);

const Innerbatch = () => {
  const { id } = useParams();
  const [tab, setTab] = useSearchParams();
  const activeTab = tab.get("tab") || "content";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { sendMessage, addClass, completeBatch } = useBatchStore();
  const { user } = useAuthStore();

  const [msg, setMsg] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [classLink, setClassLink] = useState("");

  // ⭐ REACT QUERY: FETCH BATCH DETAILS
  const { data: batch, isLoading } = useBatchDetailsQuery(id);

  if (isLoading || !batch)
    return <p className="p-8">Loading...</p>;

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------
  const handleSend = async () => {
    await sendMessage(id, msg);

    // ⭐ Invalidate → auto refresh UI instantly
    queryClient.invalidateQueries(["batchDetails", id]);

    setMsg("");
  };

  // -----------------------------
  // ADD CLASS
  // -----------------------------
  const handleAddClass = async () => {
    if (!classTitle || !classLink) {
      alert("Please fill both Class Title and Link");
      return;
    }

    await addClass(id, { title: classTitle, link: classLink });

    // Auto refresh
    queryClient.invalidateQueries(["batchDetails", id]);

    setClassTitle("");
    setClassLink("");
  };

  // -----------------------------
  // COMPLETE BATCH
  // -----------------------------
  const handleCompleteBatch = async () => {
    if (window.confirm("Are you sure you want to mark this batch as completed?")) {
      const success = await completeBatch(id);
      if (success) {
        alert("✅ Batch marked as completed!");

        // Auto refresh instead of full reload
        queryClient.invalidateQueries(["batchDetails", id]);
      }
    }
  };

  // -----------------------------
  // DOWNLOAD QR (NEW)

  const downloadQR = async () => {
    try {
      // const productionURL = "https://thesuffaheducation.com";
      // const url = `${productionURL}/batch-redirect/${id}`;

      const productionURL = "https://dashboard.thesuffaheducation.com/";
      const url = `${productionURL}/batch-redirect/${id}`;
      const size = 1200;

      const canvas = document.createElement("canvas");

      await QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#0A7D38",     // Suffah Dark Green
          light: "#E8F5E9"     // Very light green background
        }
      });

      const ctx = canvas.getContext("2d");

      // Load Logo
      const logo = new Image();
      logo.crossOrigin = "anonymous";
      logo.src = "/Logo.png";

      logo.onload = () => {
        const logoSize = size * 0.23;
        const centerX = (size - logoSize) / 2;
        const centerY = (size - logoSize) / 2;

        // White rounded container behind logo
        const bgSize = logoSize + 50;
        const bgX = (size - bgSize) / 2;
        const bgY = (size - bgSize) / 2;
        const radius = 40;

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(bgX + radius, bgY);
        ctx.lineTo(bgX + bgSize - radius, bgY);
        ctx.quadraticCurveTo(bgX + bgSize, bgY, bgX + bgSize, bgY + radius);
        ctx.lineTo(bgX + bgSize, bgY + bgSize - radius);
        ctx.quadraticCurveTo(bgX + bgSize, bgY + bgSize, bgX + bgSize - radius, bgY + bgSize);
        ctx.lineTo(bgX + radius, bgY + bgSize);
        ctx.quadraticCurveTo(bgX, bgY + bgSize, bgX, bgY + bgSize - radius);
        ctx.lineTo(bgX, bgY + radius);
        ctx.quadraticCurveTo(bgX, bgY, bgX + radius, bgY);
        ctx.closePath();
        ctx.fill();

        // Draw Logo (center)
        ctx.drawImage(logo, centerX, centerY, logoSize, logoSize);

        // Add space for text below
        const finalHeight = size + 250;
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = size;
        finalCanvas.height = finalHeight;
        const fctx = finalCanvas.getContext("2d");

        // Background
        fctx.fillStyle = "#FFFFFF";
        fctx.fillRect(0, 0, size, finalHeight);

        // Merge QR
        fctx.drawImage(canvas, 0, 0);

        // Text Styling
        fctx.textAlign = "center";
        fctx.fillStyle = "#0A7D38";

        fctx.font = "bold 80px sans-serif";
        fctx.fillText("Suffah Education", size / 2, size + 120);

        fctx.font = "55px sans-serif";
        let name = batch.name || "";
        if (name.length > 25) name = name.substring(0, 25) + "...";
        fctx.fillText(name, size / 2, size + 200);

        // Download Final Image
        const pngUrl = finalCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `Suffah_QR_${batch.name}.png`;
        link.click();
      };

      logo.onerror = () => {
        alert("Logo failed to load — check /public/logo.png");
      };

    } catch (error) {
      console.error("QR Error", error);
      alert("Failed to generate QR");
    }
  };


  return (
    <div className="p-6 space-y-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* TITLE + COMPLETE BUTTON */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{batch.name}</h1>

        {/* NEW: Download QR Button */}
        <button
          onClick={downloadQR}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <Download size={18} /> Download QR
        </button>

        {user?.role === "teacher" && !batch.isCompleted && (
          <button
            onClick={handleCompleteBatch}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <CheckCircle size={18} /> Mark Batch as Completed
          </button>
        )}

        {batch.isCompleted && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg border border-gray-300">
            <CheckCircle size={18} className="text-gray-500" />
            <span className="font-semibold">Batch Completed</span>
          </div>
        )}
      </div>

      {batch.isCompleted && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={20} />
          <span>🚫 This batch is completed. No more classes can be added.</span>
        </div>
      )}

      {/* TABS */}
      <div className="flex gap-6 border-b pb-1">
        <TabBtn
          label="Content"
          icon={BookOpen}
          active={activeTab === "content"}
          onClick={() => setTab({ tab: "content" })}
        />
        <TabBtn
          label="Students"
          icon={Users}
          active={activeTab === "students"}
          onClick={() => setTab({ tab: "students" })}
        />
        <TabBtn
          label="Messages"
          icon={MessageSquare}
          active={activeTab === "messages"}
          onClick={() => setTab({ tab: "messages" })}
        />
        <TabBtn
          label="Class"
          icon={Video}
          active={activeTab === "class"}
          onClick={() => setTab({ tab: "class" })}
        />
        <TabBtn
          label="Edit"
          icon={Edit}
          active={false}
          onClick={() => navigate(`/teacher/batch/${id}/edit`)}
        />
      </div>

      {/* CONTENT TAB */}
      {activeTab === "content" && (
        <div className="space-y-4 text-gray-700">
          <div className="bg-white p-6 rounded-xl shadow border space-y-3">
            <p>
              <b>Teacher:</b> {batch.teacher?.name}
            </p>
            <p>
              <b>Start Date:</b> {batch.startDate.split("T")[0]}
            </p>
            {batch.endDate && (
              <p>
                <b>End Date:</b> {batch.endDate.split("T")[0]}
              </p>
            )}
            <p>
              <b>Capacity:</b> {batch.capacity}
            </p>
            <p>
              <b>Duration:</b> {batch.duration || "—"}
            </p>
            <p>
              <b>Price:</b> ₹{batch.price}
            </p>
            <p>
              <b>Description:</b> {batch.description || "—"}
            </p>

            {/* SYLLABUS */}
            <div>
              <h2 className="font-semibold text-lg mt-4">Syllabus</h2>
              {batch.syllabus.length === 0 ? (
                <p className="text-sm text-gray-500">No syllabus added.</p>
              ) : (
                <ul className="list-disc ml-6 mt-2">
                  {batch.syllabus.map((item, i) => (
                    <li key={i} className="py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STUDENTS TAB */}
      {activeTab === "students" && (
        <div className="space-y-4">
          {batch.students.length === 0 && (
            <p className="text-gray-500">No students enrolled yet.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {batch.students.map((s) => (
              <div
                key={s._id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.phone}</p>
                <p className="text-sm text-gray-500">{s.city}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === "messages" && (
        <div className="space-y-5">
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {batch.messages.map((m, i) => (
              <div
                key={i}
                className="p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700"
              >
                {m.text}
              </div>
            ))}
          </div>

          <textarea
            className="w-full border p-3 rounded-lg"
            rows={3}
            placeholder="Write a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>

          <button
            onClick={handleSend}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Send Message
          </button>
        </div>
      )}

      {/* CLASS TAB */}
      {activeTab === "class" && (
        <div className="space-y-6">
          {/* ADD CLASS */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PlusCircle size={20} className="text-green-600" /> Add New Class
            </h2>

            <input
              type="text"
              placeholder="Class Title"
              className="w-full border p-2 rounded mb-3"
              value={classTitle}
              onChange={(e) => setClassTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Google Meet / Zoom Link"
              className="w-full border p-2 rounded mb-4"
              value={classLink}
              onChange={(e) => setClassLink(e.target.value)}
            />

            <button
              onClick={handleAddClass}
              className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              Add Class
            </button>
          </div>

          {/* CLASS HISTORY */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Class History</h2>

            {batch.classes.length === 0 ? (
              <p className="text-gray-500">No classes added yet.</p>
            ) : (
              <div className="space-y-4">
                {batch.classes.map((cls, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-100 rounded-xl shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{cls.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(cls.date).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={cls.link}
                      target="_blank"
                      className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                    >
                      Join
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Innerbatch;
