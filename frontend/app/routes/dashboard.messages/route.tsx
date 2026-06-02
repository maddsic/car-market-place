import { useState } from "react";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelope, FaPhone, FaCar, FaClock, FaEnvelope } from "react-icons/fa";
import { getAuthToken } from "~/utils/authHelpers";
import * as dealerServer from "~/service/dealer.server";

// Interface based on your Sequelize associations
interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  listing: {
    make: string;
    model: string;
    price: number;
    imageUrl: string;
  };
}

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "";

export default function MessagesPage() {
  const { messages } = useLoaderData<{ messages: Message[] }>();
  const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.id || null);
  const fetcher = useFetcher();
  const selectedMessage = messages.find((m) => m.id === selectedId);

  // console.log("messages", messages)
  // console.log("selectedMessage.listing", selectedMessage?.listing.imageUrl)

  const handleSelectMessage = (msg: Message) => {
    setSelectedId(msg.id);

    // Mark as read if not already
    if (msg && !msg.isRead) {
      fetcher.submit(
        { intent: "markAsRead", messageId: msg.id },
        { method: "patch" }
      );
    }
  }

  return (
    <div className="flex h-[calc(100vh-180px)] gap-4 overflow-hidden">
      {/* LEFT: Message List */}
      <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <button
            key={msg.id}
            onClick={() => handleSelectMessage(msg)}
            className={`relative flex flex-col rounded-xl p-4 text-left transition-all ${selectedId === msg.id
              ? "bg-primary text-white shadow-lg"
              : "bg-white hover:bg-gray-100 shadow-sm"
              }`}
          >
            {!msg.isRead && selectedId !== msg.id && (
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-500" />
            )}
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold truncate w-40">{msg.senderName}</h3>
              <span className={`text-[10px] ${selectedId === msg.id ? "text-gray-200" : "text-gray-400"}`}>
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className={`text-sm line-clamp-2 ${selectedId === msg.id ? "text-gray-100" : "text-gray-600"}`}>
              {msg.content}
            </p>
          </button>
        ))}
      </div>

      {/* RIGHT: Message Detail */}
      <div className="flex-1 rounded-xl bg-white p-8 shadow-sm overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Header Info */}
              <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.senderName}</h2>
                    <p className="text-gray-500 flex items-center gap-2">
                      <FaRegEnvelope /> {selectedMessage.senderEmail}
                    </p>
                    {selectedMessage.senderPhone && (
                      <p className="text-gray-500 flex items-center gap-2">
                        <FaPhone className="text-xs" /> {selectedMessage.senderPhone}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/10 rounded flex items-center justify-center text-primary">
                      <img
                        src={`${imageBaseUrl}/${selectedMessage.listing.imageUrl}`}
                        alt={`${selectedMessage.listing.make} ${selectedMessage.listing.model}`}
                        className="h-10 w-10 object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Inquiry For</p>
                      <p className="font-semibold text-gray-700">
                        {selectedMessage.listing.make} {selectedMessage.listing.model}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-gray-50 p-6 rounded-2xl relative">
                <p className="text-gray-700 leading-relaxed italic">
                  "{selectedMessage.content}"
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <FaClock /> Sent on {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.senderEmail}`}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                >
                  Reply via Email
                </a>
                <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
                  Archive
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <FaEnvelope size={48} className="mb-4 opacity-20" />
              <p>Select a message to view details</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  try {
    const result = await dealerServer.getDealerMessages(request);
    return json({
      success: true,
      messages: result.data || [],
      error: null
    });
  } catch (error) {
    console.error("Messages Loader Error:", error);

    // If it's an auth error, kick them to login
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return redirect("/auth/login");
    }

    // Always return the expected key (messages) even on error
    return json(
      { success: false, messages: [], error: "Failed to load messages." },
      { status: 500 }
    );
  }
};


export const action = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  // Parse form data to determine intent and message ID.
  const formData = await request.formData();
  const messageId = formData.get("messageId") as string;
  const intent = formData.get("intent") as string;

  if (!messageId) {
    throw new Error("Message ID is required");
  }
  if (intent === "markAsRead") {
    try {
      const result = await dealerServer.markMessageAsRead(request, messageId);
      console.log("message marked as success:", result)
      return json({ success: true, message: "Message marked as read", data: result });
    } catch (error) {
      return json({ success: false, message: "Failed to mark message as read", error: error });
    }
  }
  return json({ success: false, message: "Unknown action" });
}

