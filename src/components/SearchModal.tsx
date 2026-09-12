"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QURAN_SURAHS } from "@/data/quranSurahs";
import { RUQYAH_AUDIO_LIST } from "@/data/ruqyahAudio";
import { ARTICLES_LIST } from "@/data/articles";
import { DUA_LIST } from "@/data/duas";
import { 
  Search, 
  X, 
  BookOpen, 
  Headphones, 
  FileText, 
  Sparkles, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Search Results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { surahs: [], audios: [], articles: [], duas: [], tools: [] };

    // 1. Core Tools & Features
    const tools = [
      {
        title: "লক্ষণ ও সমস্যা স্ব-নিরীক্ষণ (ডায়াগনোসিস)",
        desc: "১৫টি প্রশ্নে বদনজর, সিহর ও জ্বিন পরীক্ষার বিস্তারিত টুল",
        href: "/assessment",
        icon: Stethoscope,
        category: "টুলস"
      },
      {
        title: "সেলফ-রুকইয়াহ পূর্ণাঙ্গ গাইড",
        desc: "ঘরে বসে নিজেই রুকইয়াহ করার ৭ ধাপের সুন্নাহ পদ্ধতি",
        href: "/self-ruqyah",
        icon: ShieldCheck,
        category: "টুলস"
      },
      {
        title: "আল-কুরআনুল কারীম (১১৪ সূরা)",
        desc: "পূর্ণাঙ্গ সূরা, বাংলা অর্থ ও অডিও তিলাওয়াত",
        href: "/quran",
        icon: BookOpen,
        category: "কুরআন"
      },
      {
        title: "রুকইয়াহ অডিও লাইব্রেরি",
        desc: "বিখ্যাত ক্বারীদের কণ্ঠের বিশুদ্ধ রুকইয়াহ স্ট্রিম",
        href: "/audio",
        icon: Headphones,
        category: "অডিও"
      },
    ].filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));

    // 2. Surahs
    const surahs = QURAN_SURAHS.filter((s) => {
      const numStr = String(s.number);
      return (
        numStr === q ||
        s.nameBangla.toLowerCase().includes(q) ||
        s.nameEnglish.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        s.meaningBangla.toLowerCase().includes(q)
      );
    }).slice(0, 5);

    // 3. Ruqyah Audios
    const audios = RUQYAH_AUDIO_LIST.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.reciter.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }).slice(0, 4);

    // 4. Articles
    const articles = ARTICLES_LIST.filter((art) => {
      return (
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
      );
    }).slice(0, 4);

    // 5. Duas
    const duas = DUA_LIST.filter((d) => {
      return (
        d.title.toLowerCase().includes(q) ||
        d.banglaMeaning.toLowerCase().includes(q) ||
        d.transliteration.toLowerCase().includes(q)
      );
    }).slice(0, 4);

    return { surahs, audios, articles, duas, tools };
  }, [query]);

  if (!isOpen || !mounted) return null;

  const totalResultsCount =
    results.surahs.length +
    results.audios.length +
    results.articles.length +
    results.duas.length +
    results.tools.length;

  const handleNavigate = (href: string) => {
    onClose();
    router.push(href);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh] mt-8 sm:mt-16 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center p-3 sm:p-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-[#006B5B] shrink-0 ml-1.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="কুরআন সূরা, অডিও, লক্ষণ, দোয়া বা আর্টিকেল খুঁজুন..."
            className="w-full px-3 py-1.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors ml-1"
          >
            বন্ধ
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {/* Default Suggestions when query is empty */}
          {!query.trim() && (
            <div className="space-y-4 py-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                জনপ্রিয় বিভাগসমূহ
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleNavigate("/quran")}
                  className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-[#006B5B] hover:bg-emerald-50 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <BookOpen className="w-4 h-4 text-[#006B5B] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#004D40]">আল-কুরআন</div>
                    <div className="text-[10px] text-gray-500">১১৪টি সূরা ও অর্থ</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/audio")}
                  className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 hover:border-[#D4A017] hover:bg-amber-50 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <Headphones className="w-4 h-4 text-[#D4A017] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-950">রুকইয়াহ অডিও</div>
                    <div className="text-[10px] text-gray-500">৮টি মূল তিলাওয়াত</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/assessment")}
                  className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 hover:border-teal-500 hover:bg-teal-50 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <Stethoscope className="w-4 h-4 text-teal-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-teal-950">লক্ষণ পরীক্ষা</div>
                    <div className="text-[10px] text-gray-500">১৫টি প্রশ্নোত্তরে যাচাই</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/self-ruqyah")}
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-400 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <ShieldCheck className="w-4 h-4 text-gray-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">সেলফ-রুকইয়াহ</div>
                    <div className="text-[10px] text-gray-500">৭ ধাপের আমল গাইড</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/articles")}
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-400 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <FileText className="w-4 h-4 text-gray-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">আর্টিকেলস</div>
                    <div className="text-[10px] text-gray-500">সহীহ হাদিস গবেষণা</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/duas")}
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-400 text-left transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-gray-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">দোয়া ও আযকার</div>
                    <div className="text-[10px] text-gray-500">মাসনুন সকাল-সন্ধ্যা</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* No results message */}
          {query.trim() && totalResultsCount === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-gray-700">"{query}" দিয়ে কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs text-gray-400">বানান সঠিক কিনা যাচাই করুন অথবা ভিন্ন শব্দ দিয়ে খুঁজুন।</p>
            </div>
          )}

          {/* 1. Surahs Section */}
          {results.surahs.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                <BookOpen className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>আল-কুরআনুল কারীম ({results.surahs.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.surahs.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => handleNavigate(`/quran/${s.number}`)}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center text-xs font-bold font-mono">
                        {s.number}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#006B5B]">
                          সূরা {s.nameBangla} ({s.meaningBangla})
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {s.revelationType} • {s.ayahCount} আয়াত
                        </div>
                      </div>
                    </div>
                    <span className="font-arabic text-sm text-emerald-800 font-semibold">
                      {s.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Audios Section */}
          {results.audios.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>রুকইয়াহ অডিও ({results.audios.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.audios.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleNavigate("/audio")}
                    className="w-full p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <Headphones className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-amber-900">
                          {a.title}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {a.reciter} • {a.categoryLabel}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{a.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Articles Section */}
          {results.articles.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>আর্টিকেল ও গবেষণা ({results.articles.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.articles.map((art) => (
                  <button
                    key={art.slug}
                    onClick={() => handleNavigate(`/articles/${art.slug}`)}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-blue-900 line-clamp-1">
                          {art.title}
                        </div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">
                          {art.excerpt}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Duas Section */}
          {results.duas.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                <Sparkles className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>দোয়া ও আযকার ({results.duas.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.duas.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleNavigate("/duas")}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#006B5B]">
                          {d.title}
                        </div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">
                          {d.banglaMeaning}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 px-4">
          <span>সুন্নাহলাইফ গ্লোবাল সার্চ</span>
          <span className="font-mono">ESC চেপে বন্ধ করুন</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
