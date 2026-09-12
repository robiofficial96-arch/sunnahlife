"use client";

import { useState } from "react";
import { DUA_LIST, DuaItem } from "@/data/duas";
import { BookOpen, Copy, CheckCheck, Sparkles, HeartPulse, ShieldCheck, Sun } from "lucide-react";

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সহীহ হাদিস ভিত্তিক আমল</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          মাসনুন দোয়া ও হিফযের আযকার
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          রাসূলুল্লাহ (ﷺ) বর্ণিত সহীহ দোয়াসমূহ যা মানুষের আত্মরক্ষা ও সকল বিপদাপদ থেকে হেফাজতে আল্লাহর সুরক্ষা বলয় হিসেবে কাজ করে।
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-6">
        {filteredDuas.map((dua) => (
          <div
            key={dua.id}
            className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-[#006B5B] bg-[#006B5B]/10 px-3 py-1 rounded-full">
                {dua.count}
              </span>
              <span className="text-xs text-gray-400 font-medium">{dua.reference}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-900">{dua.title}</h3>

            {/* Arabic */}
            <div className="bg-[#FAFAF7] p-5 rounded-2xl border border-[#006B5B]/15">
              <p className="font-arabic text-lg md:text-2xl text-[#004D40] leading-loose text-right font-medium">
                {dua.arabic}
              </p>
            </div>

            {/* Bangla Transliteration */}
            <div className="text-xs md:text-sm text-gray-600 space-y-1">
              <strong className="text-gray-800">উচ্চারণ:</strong> {dua.transliteration}
            </div>

            {/* Bangla Meaning */}
            <div className="text-xs md:text-sm text-gray-700 leading-relaxed space-y-1">
              <strong className="text-gray-900">অর্থ:</strong> {dua.banglaMeaning}
            </div>

            {/* Benefit & Action */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <strong>ফজিলত:</strong> {dua.benefit}
              </div>

              <button
                onClick={() => handleCopy(dua)}
                className="self-end sm:self-center px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedId === dua.id ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
