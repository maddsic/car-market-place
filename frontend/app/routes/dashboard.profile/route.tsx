import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCamera, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Form } from "@remix-run/react";

export default function ProfileSettings() {
  // Temporary state for image preview
  const [preview, setPreview] = useState("/sain.jpeg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm">Update your profile information and public branding.</p>
      </div>

      <Form method="post" encType="multipart/form-data" className="space-y-8">
        {/* --- SECTION 1: AVATAR & LOGO --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={preview}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-50 shadow-inner"
            />
            <label className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white cursor-pointer hover:scale-110 transition shadow-lg">
              <FaCamera size={16} />
              <input type="file" name="avatar" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">Profile Photo</h3>
            <p className="text-xs text-gray-400 mt-1">Allowed JPG, GIF or PNG. Max size of 2MB.</p>
            <button type="button" className="mt-3 text-sm font-medium text-red-500 hover:text-red-600">
              Remove Photo
            </button>
          </div>
        </div>

        {/* --- SECTION 2: PERSONAL INFO --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaUser size={14} />
                </span>
                <input
                  type="text"
                  name="first_name"
                  defaultValue="Sain"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                defaultValue="Kunta"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  defaultValue="kuntamotors"
                  className="w-full px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Email (Disabled/Read-only usually) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaEnvelope size={14} />
                </span>
                <input
                  type="email"
                  value="kunta@motors.com"
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaPhone size={14} />
                </span>
                <input
                  type="text"
                  name="phone"
                  defaultValue="+1 404-000-0000"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaMapMarkerAlt size={14} />
                </span>
                <input
                  type="text"
                  name="address"
                  defaultValue="Atlanta, GA"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex justify-end gap-4">
          <button type="button" className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 shadow-md transition">
            <FaSave size={14} /> Save Changes
          </button>
        </div>
      </Form>
    </motion.div>
  );
}
