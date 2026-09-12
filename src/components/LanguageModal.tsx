"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Languages, 
  X, 
  Check, 
  Globe, 
  Sparkles, 
  ExternalLink,
  Info
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function LanguageModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("bn");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect current language from cookie on mount
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const googTransCookie = cookies.find((c) => c.startsWith("googtrans="));
    if (googTransCookie) {
      if (googTransCookie.includes("/en")) {
        setCurrentLang("en");
      } else if (googTransCookie.includes("/ar")) {
        setCurrentLang("ar");
      } else {
        setCurrentLang("bn");
      }
    }
  }, [isOpen]);

  // Load Google Translate script dynamically if needed
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "bn",
            includedLanguages: "en,bn,ar",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSelectLanguage = (langCode: string) => {
    setIsTranslating(true);
    setCurrentLang(langCode);

    try {
      if (langCode === "bn") {
        // Reset to original Bengali
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
        const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select) {
          select.value = "bn";
          select.dispatchEvent(new Event("change"));
        } else {
          window.location.reload();
        }
      } else {
        // Set new translation
        document.cookie = `googtrans=/bn/${langCode}; path=/;`;
        document.cookie = `googtrans=/bn/${langCode}; domain=.${window.location.hostname}; path=/;`;
        const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select) {
          select.value = langCode;
          select.dispatchEvent(new Event("change"));
        } else {
          window.location.reload();
        }
      }
    } catch {
      window.location.reload();
    }

    setTimeout(() => {
      setIsTranslating(false);
      onClose();
    }, 600);
  };

  const languages = [
    {
      code: "bn",
      name: "বাংলা (Bengali)",
      native: "মূল সংস্করণ (Original)",
      flag: "🇧🇩",
      desc: "বিশুদ্ধ বাংলা ভাষা ও প্রামাণ্য আরবি কুরআন তিলাওয়াত",
    },
    {
      code: "en",
      name: "English",
      native: "English Translation",
      flag: "🇬🇧",
      desc: "Real-time automated translation into English for global readers",
    },
    {
      code: "ar",
      name: "العربية (Arabic)",
      native: "الترجمة العربية",
      flag: "🇸🇦",
      desc: "ترجمة فورية باللغة العربية لمحتوى الموقع والاستشارات",
    },
  ];

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden Google Translate container */}
        <div id="google_translate_element" className="hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#004D40]">ভাষা পরিবর্তন (Language)</h3>
              <p className="text-xs text-gray-500">আপনার পছন্দের ভাষা নির্বাচন করুন</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Options List */}
        <div className="p-4 space-y-2.5">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                disabled={isTranslating}
                className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-start justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-[#006B5B]/5 border-[#006B5B] shadow-2xs ring-1 ring-[#006B5B]/20"
                    : "bg-white border-gray-200 hover:border-[#006B5B]/30 hover:bg-[#FAFAF7]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{lang.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isSelected ? "text-[#004D40]" : "text-gray-800"}`}>
                        {lang.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium">
                        ({lang.native})
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {lang.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-1">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#006B5B] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-300 group-hover:border-[#006B5B]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Notice Info Box */}
        <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-950">
          <Info className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
          <span>
            ওয়েবসাইটটির মূল কপি বাংলায় রচিত। ইংরেজি বা আরবি সিলেক্ট করলে গুগল অটোমেটিক ট্রান্সলেশনের মাধ্যমে তাৎক্ষণিক অনুবাদ প্রদর্শিত হবে।
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
