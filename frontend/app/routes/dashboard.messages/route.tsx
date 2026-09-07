import { useState } from "react";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegEnvelope,
  FaPhone,
  FaClock,
  FaEnvelope,
  FaArrowLeft,
  FaInbox
} from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { getAuthToken } from "~/utils/authHelpers";
import * as dealerServer from "~/service/dealer.server";

interface Listing {
  make: string;
  model: string;
  price: number;
  imageUrl: string;
}

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  listing?: Listing;
}


export default function MessagesPage() {
  const loaderData = useLoaderData<typeof loader>();
  const messages: Message[] = loaderData?.messages || [];
  const error = loaderData?.error || null;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messagesPerPage] = useState<number>(6); // Adjust count per page as needed

  const fetcher = useFetcher();

  if (error) {
    return (
      <div className="p-4 sm:p-8 text-red-600 bg-red-50 rounded-xl max-w-7xl mx-auto my-6 border border-red-200">
        <h3 className="font-bold text-lg mb-1">Error Loading Messages</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // Selected Message Object
  const selectedMessage = messages.find((m) => m.id === selectedId);

  // Pagination Logic
  const totalMessages = messages.length;
  const totalPages = Math.ceil(totalMessages / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedId(msg.id);
    setMobileView("detail");

    // Mark as read if not already read
    if (msg && !msg.isRead) {
      fetcher.submit(
        { intent: "markAsRead", messageId: msg.id },
        { method: "patch" }
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50 p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-4 sm:mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Inquiries & Messages 📥
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage client inquiries and direct communications.
            </p>
          </div>
          <div className="bg-white border border-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-xs">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block">Total</span>
            <span className="text-base sm:text-xl font-black text-slate-900">{totalMessages}</span>
          </div>
        </header>

        {totalMessages > 0 ? (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[680px]">
            {/* LEFT SIDE: Message List */}
            <div
              className={`w-full md:w-5/12 lg:w-4/12 border-r border-slate-200 flex flex-col justify-between h-full ${mobileView === "detail" ? "hidden md:flex" : "flex"
                }`}
            >
              {/* Message List Items */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100/60">
                {currentMessages.map((msg) => {
                  const isSelected = selectedId === msg.id;
                  return (
                    <button
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`w-full relative flex flex-col rounded-xl p-3.5 text-left transition-all ${isSelected
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      {!msg.isRead && !isSelected && (
                        <span className="absolute right-3 top-3.5 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                      )}

                      <div className="flex justify-between items-start mb-1 pr-4">
                        <h3 className={`font-bold text-sm truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {msg.senderName}
                        </h3>
                        <span className={`text-[10px] whitespace-nowrap ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {msg.listing && (
                        <div className={`text-[11px] font-semibold mb-1.5 ${isSelected ? "text-indigo-300" : "text-indigo-600"}`}>
                          Re: {msg.listing.make} {msg.listing.model}
                        </div>
                      )}

                      <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? "text-slate-200" : "text-slate-500"}`}>
                        {msg.content}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
                    <span className="font-bold text-slate-800">{totalPages}</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      aria-label="Previous Page"
                    >
                      <HiChevronLeft size={16} />
                    </button>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      aria-label="Next Page"
                    >
                      <HiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Message Details */}
            <div
              className={`flex-1 flex-col h-full bg-slate-50/50 p-4 sm:p-6 lg:p-8 overflow-y-auto ${mobileView === "list" ? "hidden md:flex" : "flex"
                }`}
            >
              {/* Back button for mobile view */}
              <button
                onClick={() => setMobileView("list")}
                className="md:hidden self-start flex items-center gap-2 mb-4 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors"
              >
                <FaArrowLeft size={12} /> Back to Messages
              </button>

              <AnimatePresence mode="wait">
                {selectedMessage ? (
                  <motion.div
                    key={selectedMessage.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6 max-w-3xl"
                  >
                    {/* Header Info */}
                    <div className="border-b border-slate-200 pb-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                            {selectedMessage.senderName}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                            <FaRegEnvelope className="text-slate-400" /> {selectedMessage.senderEmail}
                          </p>
                          {selectedMessage.senderPhone && (
                            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                              <FaPhone className="text-slate-400 text-xs" /> {selectedMessage.senderPhone}
                            </p>
                          )}
                        </div>

                        {selectedMessage.listing && (
                          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 shrink-0">
                            <div className="h-12 w-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                              <img
                                src={
                                  selectedMessage.listing.imageUrl}
                                alt={`${selectedMessage.listing.make} ${selectedMessage.listing.model}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                                Inquiry Vehicle
                              </p>
                              <p className="font-bold text-xs sm:text-sm text-slate-800">
                                {selectedMessage.listing.make} {selectedMessage.listing.model}
                              </p>
                              {selectedMessage.listing.price && (
                                <p className="text-xs font-semibold text-indigo-600">
                                  GMD {Number(selectedMessage.listing.price).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                        {selectedMessage.content}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-[11px] font-medium text-slate-400 border-t border-slate-100">
                        <FaClock /> Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`mailto:${selectedMessage.senderEmail}?subject=Re: Inquiry for ${selectedMessage.listing?.make || 'Vehicle'} ${selectedMessage.listing?.model || ''}`}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
                      >
                        <FaRegEnvelope /> Reply via Email
                      </a>
                      {selectedMessage.senderPhone && (
                        <a
                          href={`tel:${selectedMessage.senderPhone}`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                        >
                          <FaPhone /> Call Sender
                        </a>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-400 my-auto py-12">
                    <div className="p-4 bg-slate-100 rounded-full mb-3 text-slate-300">
                      <FaEnvelope size={32} />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Select a message from the list to view full details</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-8 sm:p-12 text-center flex flex-col items-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-2xl mb-4">
              <FaInbox />
            </div>
            <h2 className="text-lg font-bold text-slate-800">No Messages Yet</h2>
            <p className="text-slate-500 mt-2 text-xs sm:text-sm leading-relaxed">
              When buyers send inquiries regarding your vehicle listings, they will show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Loader Function
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  try {
    const result = await dealerServer.getDealerMessages(request);
    return json({
      success: true,
      messages: (result.data || []) as Message[],
      error: null
    });
  } catch (error) {
    console.error("Messages Loader Error:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return redirect("/auth/login");
    }

    return json(
      { success: false, messages: [] as Message[], error: "Failed to load messages." },
      { status: 500 }
    );
  }
};

// Action Function
export const action = async ({ request }: ActionFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) {
    return redirect("/auth/login");
  }

  const formData = await request.formData();
  const messageId = formData.get("messageId") as string;
  const intent = formData.get("intent") as string;

  if (!messageId) {
    return json({ success: false, message: "Message ID is required" }, { status: 400 });
  }

  if (intent === "markAsRead") {
    try {
      const result = await dealerServer.markMessageAsRead(request, messageId);
      return json({ success: true, message: "Message marked as read", data: result });
    } catch (error) {
      return json({ success: false, message: "Failed to mark message as read" }, { status: 500 });
    }
  }

  return json({ success: false, message: "Unknown action" }, { status: 400 });
};
