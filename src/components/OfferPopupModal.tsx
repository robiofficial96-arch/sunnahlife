"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DEFAULT_POPUP_CONFIG, PopupNoticeConfig } from "@/data/popupNotice";
import { 
  X, 
  Sparkles, 
  Clock, 
  Users, 
  PhoneCall, 
  Gift, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function OfferPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<PopupNoticeConfig>(DEFAULT_POPUP_CONFIG);

  useEffect(() => {
    // Check if admin has set local override or use default
    try {
      const stored = localStorage.getItem("sunnahlife_popup_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfig(parsed);
        if (!parsed.isActive) return;
      } else if (!DEFAULT_POPUP_CONFIG.isActive) {
        return;
      }
    } catch {
      if (!DEFAULT_POPUP_CONFIG.isActive) return;
    }

    // Check if user already dismissed it during this session
    const isDismissed = sessionStorage.getItem("sunnahlife_offer_popup_dismissed");
    if (isDismissed === "true") {
      return;
    }

    // Delay 1.5s for smooth entrance after page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("sunnahlife_offer_popup_dismissed", "true");
  };

  if (!isOpen || !config.isActive) {
    return null;
  }

  const encodedWhatsAppText = encodeURIComponent(config.whatsappMessage);
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodedWhatsAppText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-300">
      {/* Backdrop Click Outside */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={handleDismiss} 
        aria-hidden="true" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4A017]/30 ring-1 ring-black/10 flex flex-col md:flex-row max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Floating Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close Offer Popup"
          title="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Poster Image */}
        <div className="relative w-full md:w-5/12 bg-[#004D40] shrink-0 min-h-[200px] md:min-h-[420px]">
          <Image
            src={config.image}
            alt={config.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover object-top"
          />
          {/* Subtle gradient overlay at bottom for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1.5 md:hidden">
            <Gift className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>{config.badge}</span>
          </div>
        </div>

        {/* Right Side: Offer Details & Actions */}
        <div className="w-full md:w-7/12 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            {/* Badge */}
            <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
              <Gift className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>{config.badge}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#004D40] leading-snug">
              {config.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600">
              {config.subtitle}
            </p>

            {/* Price & Offer Highlight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 border border-[#006B5B]/20 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">পরামর্শ ও সেশন ফি:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-400 line-through font-semibold">
                    {config.regularFee}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-extrabold shadow-xs animate-pulse">
                    {config.offerFee}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200/80 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Clock className="w-3.5 h-3.5 text-[#006B5B] shrink-0" />
                  <span className="font-medium truncate">{config.timeText}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Users className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                  <span className="font-medium truncate">{config.seatsText}</span>
                </div>
              </div>
            </div>

            {/* Instruction */}
            <div className="flex items-start gap-2 text-xs text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
              <span>সিরিয়াল নিশ্চিত করতে এখনই আপনার নাম ও মোবাইল নম্বর পাঠিয়ে দিন।</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all active:scale-98 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>WhatsApp-এ ফ্রি সিরিয়াল নিন</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${config.phone}`}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>কল: {config.phone}</span>
              </a>

              <button
                onClick={handleDismiss}
                className="py-2 px-3 rounded-xl text-gray-400 hover:text-gray-600 text-xs font-medium transition-colors cursor-pointer"
              >
                পরে দেখব
              </button>
            </div>

            <p className="text-[11px] text-center text-gray-400 pt-1">
              {config.footerNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
