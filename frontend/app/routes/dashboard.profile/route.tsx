import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaCamera,
  FaSave,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe
} from "react-icons/fa";
import { Form, json, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { getDealerProfileCardData, updateDealerProfile } from "~/service/dealer.server";
import { toast } from "react-toastify";

export default function ProfileSettings() {
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1); // Tab Pagination State (1: General, 2: Contact, 3: Branding)

  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData?.profile?.data;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const ProfileDisplayImage = preview || user?.avatarUrl || "/sain.png";

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Profile Updated Successfully!");
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit.");
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
  };

  const totalTabs = 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings ⚙️</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage your public dealer profile, contact information, and branding.</p>
      </div>

      {/* SECTION / PAGINATION NAVIGATION TABS */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab(1)}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 1
            ? "border-primary text-primary"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
        >
          1. General Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(2)}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 2
            ? "border-primary text-primary"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
        >
          2. Contact & Location
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(3)}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 3
            ? "border-primary text-primary"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
        >
          3. Photo & Branding
        </button>
      </div>

      <Form method="put" encType="multipart/form-data" className="space-y-6">
        <AnimatePresence mode="wait">
          {/* --- TAB 1: GENERAL PROFILE --- */}
          {activeTab === 1 && (
            <motion.div
              key="tab1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white p-5 sm:p-8 rounded-2xl shadow-xs border border-gray-100 space-y-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-800 border-b pb-3">Personal Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      name="first_name"
                      defaultValue={user?.first_name}
                      placeholder="John"
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    defaultValue={user?.last_name}
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                  />
                </div>

                {/* Username */}
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Username</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-xs sm:text-sm font-bold">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      defaultValue={user?.username}
                      placeholder="johndoe"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- TAB 2: CONTACT & LOCATION --- */}
          {activeTab === 2 && (
            <motion.div
              key="tab2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white p-5 sm:p-8 rounded-2xl shadow-xs border border-gray-100 space-y-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-800 border-b pb-3">Contact & Location</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Email Address (Read Only) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaEnvelope size={13} />
                    </span>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">Email cannot be changed directly.</span>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaPhone size={13} />
                    </span>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user?.phone}
                      placeholder="+220 123 4567"
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                {/* Location / Address */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Location / Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <FaMapMarkerAlt size={13} />
                    </span>
                    <input
                      type="text"
                      name="address"
                      defaultValue={user?.address}
                      placeholder="Banjul, The Gambia"
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- TAB 3: PHOTO & BRANDING --- */}
          {activeTab === 3 && (
            <motion.div
              key="tab3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white p-5 sm:p-8 rounded-2xl shadow-xs border border-gray-100 space-y-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-800 border-b pb-3">Avatar & Logo</h2>

              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="relative group shrink-0">
                  <img
                    src={ProfileDisplayImage}
                    alt="Profile image"
                    className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                  />
                  <label className="absolute bottom-0 right-0 bg-primary p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition shadow-md">
                    <FaCamera size={14} />
                    <input
                      type="file"
                      name="avatarUrl"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">Profile Photo</h3>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Allowed formats: JPG, GIF, or PNG. Maximum file size of 2MB.
                  </p>
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 pt-1"
                    >
                      <FaTrash size={12} /> Remove Selected Photo
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- FORM NAVIGATION & ACTION BUTTONS --- */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
          {/* TAB PAGINATION CONTROLS */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => setActiveTab((prev) => Math.max(prev - 1, 1))}
              disabled={activeTab === 1}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FaChevronLeft size={10} /> Previous Section
            </button>
            <span className="text-xs font-bold text-gray-400 sm:hidden">
              {activeTab} / {totalTabs}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab((prev) => Math.min(prev + 1, totalTabs))}
              disabled={activeTab === totalTabs}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next Section <FaChevronRight size={10} />
            </button>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-primary/90 shadow-sm transition active:scale-95 disabled:opacity-50"
            >
              <FaSave size={13} /> {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Form>
    </motion.div>
  );
}

// Loader Function
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const profile = await getDealerProfileCardData(request);
    return json({ profile });
  } catch (error) {
    return json({ profile: { data: null } });
  }
};

// Action Function
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const result = await updateDealerProfile(request, formData);
    return json({ success: true, user: result?.data });
  } catch (error: any) {
    return json({ success: false, error: error.message || "Failed to update profile." }, { status: 400 });
  }
};
