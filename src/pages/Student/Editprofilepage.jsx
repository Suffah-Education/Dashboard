import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowLeft, Camera, Save } from "lucide-react";
    import { useNavigate } from "react-router-dom";

const Editprofilepage = () => {
  const { user, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    class: user?.class || "",
    address: user?.address || "",
    profilepic: user?.profilepic || "",
    dob: user?.dob ? user.dob.split("T")[0] : "",
  });
  const [preview, setPreview] = useState(user?.profilepic || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, profilepic: reader.result }); // save base64 for now
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProfile(form);
    setSaving(false);
    setMsg(res.message);
  };

  return (
    <div className="bg-[#f8f9f8] min-h-screen p-6">
        <button
      onClick={() => navigate(-1)} // ek kadam peeche jaata hai
      className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
    >
      <ArrowLeft size={18} />
      {/* <span className="font-medium text-sm">{label}</span> */}
    </button>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

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
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <div>
            <p className="text-gray-700 font-medium">{form.name || "Your Name"}</p>
            <p className="text-gray-500 text-sm">{form.phone || "Phone number"}</p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Class</label>
              <input
                type="text"
                name="class"
                value={form.class}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm w-full md:w-auto"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {msg && (
            <p className="text-center mt-4 text-green-600 font-medium">{msg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Editprofilepage;
