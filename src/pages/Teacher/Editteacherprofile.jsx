import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Editteacherprofile = () => {
  const { user, updateProfile } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    address: user?.address || "",
    qualification: user?.qualification || "",
    education: user?.education || "",
    email: user?.email || "",
    experience: user?.experience || "",
    bio: user?.bio || "",
    dob: user?.dob ? user.dob.split("T")[0] : "",
    profilepic: "",
  });

  const [preview, setPreview] = useState( user?.profilepic || user?.avatar || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // ============= IMAGE SELECT =============
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, profilepic: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ============= FORM SUBMIT =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    const res = await updateProfile(fd);
    setSaving(false);
    setMsg(res.message);

    if (res.success) {
      setTimeout(() => navigate(-1), 1000);
    }
  };

  return (
    <div className="bg-[#f8f9f8] min-h-screen p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-green-700 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md mb-6"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Teacher Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex items-center mb-8 space-x-6">
          <div className="relative">
            <img
              src={preview || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />

            <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700">
              <Camera size={16} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div>
            <p className="text-gray-700 font-medium">{form.name}</p>
            <p className="text-gray-500 text-sm">{form.phone}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* PHONE + CITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={(e) => setForm({...form, city: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

          </div>

          {/* EMAIL + EDUCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Education</label>
              <input
                type="text"
                name="education"
                value={form.education}
                onChange={(e) => setForm({...form, education: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* DOB + QUALIFICATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={(e) => setForm({...form, dob: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

          {/* EXPERIENCE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={(e) => setForm({...form, experience: e.target.value})}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          </div>


          {/* ADDRESS */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full border border-gray-300 rounded-lg p-2 resize-none"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({...form, bio: e.target.value})}
              className="w-full border border-gray-300 rounded-lg p-2 resize-none"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {msg && (
            <p className="text-center mt-4 text-green-600 font-medium">
              {msg}
            </p>
          )}

        </form>
      </div>
    </div>
  );
};

export default Editteacherprofile;
