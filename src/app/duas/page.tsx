"use client";

import { useState } from "react";
import { DUA_LIST, DuaItem } from "@/data/duas";
import { 
  BookOpen, 
  Copy, 
  CheckCheck, 
  Sparkles, 
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedDuaIds, setExpandedDuaIds] = useState<string[]>([]);

  const toggleDuaExpand = (id: string) => {
    setExpandedDuaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "all", label: "সকল দোয়া" },
    { id: "morning_evening", label: "সকাল ও সন্ধ্যা" },
    { id: "protection", label: "হিফয ও সুরক্ষা" },
    { id: "healing", label: "রোগমুক্তি ও শেফা" },
  ];

  const filteredDuas =
    activeCategory === "all"
      ? DUA_LIST
      : DUA_LIST.filter((d) => d.category === activeCategory);

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.transliteration}\nঅর্থ: ${dua.banglaMeaning}\nরেফারেন্স: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সহীহ হাদিস ভিত্তিক আমল</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          মাসনুন দোয়া ও হিফযের আযকার
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          আত্মরক্ষা ও সকল বিপদাপদ থেকে হেফাজতে আল্লাহর সুরক্ষা বলয়।
        </p>
      </div>

      {/* 1-Click Azkar PDF Download Banner */}
      <div className="bg-gradient-to-r from-[#004D40] via-[#005B4D] to-[#00382E] text-white p-4 sm:p-5 rounded-2xl shadow-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A017]/20 text-[#F2C94C] text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>ডিজিটাল বুকলেট</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold">
            সকাল ও সন্ধ্যার সম্পূর্ণ মাসনুন আযকার (PDF)
          </h2>
          <p className="text-xs text-emerald-100/90 max-w-md">
            মোবাইলে সংরক্ষণ করে অফলাইনে পড়তে এক ক্লিকে ডাউনলোড করুন।
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/downloads/azkar-masnun-hifz.pdf"
            download="আযকার_ও_মাসনুন_আমল_সুন্নাহলাইফ.pdf"
            className="px-4 py-2 rounded-xl bg-[#D4A017] hover:bg-[#F2C94C] text-[#00382E] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF ডাউনলোড</span>
          </a>
          <a
            href="/downloads/azkar-masnun-hifz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1 transition-colors border border-white/15"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>পড়ুন</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Duas List with Expandable Pronunciation & Fazilat */}
      <div className="space-y-4">
        {filteredDuas.map((dua) => {
          const isExpanded = expandedDuaIds.includes(dua.id);

          return (
            <div
              key={dua.id}
              className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "border-[#006B5B]/60 shadow-sm"
                  : "border-gray-200 hover:border-[#006B5B]/30 shadow-2xs"
              }`}
            >
              <div className="p-4 sm:p-5 space-y-3">
                {/* Header: count & reference */}
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                  <span className="text-[11px] font-bold text-[#006B5B] bg-[#006B5B]/10 px-2.5 py-0.5 rounded-full">
                    {dua.count}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {dua.reference}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {dua.title}
                </h3>

                {/* Arabic */}
                <div className="bg-[#FAFAF7] p-3.5 sm:p-4 rounded-xl border border-[#006B5B]/15">
                  <p className="font-arabic text-base sm:text-xl text-[#004D40] leading-loose text-right font-medium">
                    {dua.arabic}
                  </p>
                </div>

                {/* Bangla Meaning */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <strong className="text-gray-900 font-semibold">অর্থ: </strong>
                  {dua.banglaMeaning}
                </div>

                {/* Expandable Section: Pronunciation & Fazilat */}
                {isExpanded && (
                  <div className="pt-3 border-t border-gray-100 space-y-2 text-xs animate-in fade-in-50 duration-200">
                    <div className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200/70">
                      <strong className="text-gray-800 font-semibold">উচ্চারণ: </strong>
                      {dua.transliteration}
                    </div>
                    <div className="text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                      <strong className="font-semibold">ফজিলত: </strong>
                      {dua.benefit}
                    </div>
                  </div>
                )}

                {/* Actions: Expand Toggle & Copy */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleDuaExpand(dua.id)}
                    className="text-xs font-semibold text-[#006B5B] hover:text-[#004D40] flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-50/50 transition-colors"
                  >
                    <span>{isExpanded ? "উচ্চারণ ও ফজিলত সংক্ষেপ" : "উচ্চারণ ও ফজিলত দেখুন"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(dua)}
                    className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition-colors shrink-0"
                  >
                    {copiedId === dua.id ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
