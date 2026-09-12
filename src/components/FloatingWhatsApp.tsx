"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "@/config/site";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip on Desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-gray-800 text-xs px-3.5 py-2 rounded-2xl shadow-lg border border-[#006B5B]/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>রাক্বীর সাথে কথা বলুন</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সুন্নাহলাইফের রাক্বী সাহেবের সাথে পরামর্শ চাচ্ছি।")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#006B5B] text-white flex items-center justify-center shadow-xl shadow-[#006B5B]/30 hover:bg-[#004D40] hover:scale-105 transition-all active:scale-95 border-2 border-white"
        aria-label="Contact Raqi on WhatsApp"
        title="WhatsApp-এ রাক্বীর সাথে যোগাযোগ"
      >
        <MessageCircle className="w-7 h-7 text-[#F2C94C]" />
      </a>
    </div>
  );
}
