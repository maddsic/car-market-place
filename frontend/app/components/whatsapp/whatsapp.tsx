import { useState } from "react";
import { MdWhatsapp, MdClose } from "react-icons/md";

interface FloatingWhatsAppProps {
  phone?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phone = "14707338533", // Replace with your support team Gambian number
  defaultMessage = "Hi Gamautos team, I have a quick question about the platform.",
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Clean the number and ensure Gambian prefix (220)
  const cleanPhone = phone.replace(/\D/g, "");
  const fullPhone = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Popup Card */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-all">
          <div className="flex items-start justify-between border-b border-gray-100 pb-2">
            <div>
              <h4 className="text-sm font-bold text-gray-900">Gamautos Support</h4>
              <p className="text-xs text-emerald-600 font-medium">● Typically replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close support chat"
            >
              <MdClose size={18} />
            </button>
          </div>

          <p className="my-3 text-xs text-gray-600">
            Have questions about buying, selling, or listing your car? Chat directly with our team on WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600"
          >
            <MdWhatsapp size={18} />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Contact support on WhatsApp"
      >
        {isOpen ? <MdClose size={26} /> : <MdWhatsapp size={32} />}
      </button>
    </div>
  );
}
