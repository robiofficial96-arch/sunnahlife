"use client";

import { useState } from "react";
import { RUQYAH_AYAT_LIST, RuqyahAyah } from "@/data/ayat";
import { BookOpen, Copy, CheckCheck, Sparkles, ShieldCheck } from "lucide-react";

export default function AyatPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (ayah: RuqyahAyah) => {
    const text = `${ayah.surahName} [${ayah.ayahNumber}]\n\n${ayah.arabic}\n\nঅর্থ: ${ayah.banglaMeaning}\n\nআমলের উদ্দেশ্য: ${ayah.ruqyahPurpose}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ayah.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>কুরআনের নিরাময় ও হিফয</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ শারইয়্যাহর মূল আয়াতসমূহ
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          আল্লাহ তাআলা ইরশাদ করেন: <em>“আর আমি অবতীর্ণ করি কুরআন, যা মুমিনদের জন্য আরোগ্য ও রহমত...”</em> (সূরা আল-ইসরা: ৮২)। নিচে রুকইয়াহর প্রধান আয়াতসমূহ বিস্তারিত দেওয়া হলো।
        </p>
      </div>

      {/* Ayat Cards */}
      <div className="space-y-6">
        {RUQYAH_AYAT_LIST.map((ayah) => (
          <div
            key={ayah.id}
            className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                <h3 className="text-lg md:text-xl font-bold text-[#004D40]">
                  {ayah.surahName}
                </h3>
                <span className="text-xs bg-[#006B5B]/10 text-[#006B5B] px-2 py-0.5 rounded-md font-medium">
                  আয়াত: {ayah.ayahNumber}
                </span>
              </div>

              <span className="text-xs font-bold text-[#D4A017] bg-[#D4A017]/10 px-3 py-1 rounded-full">
                পাঠ সংখ্যা: {ayah.recitationCount}
              </span>
            </div>

            {/* Arabic */}
            <div className="bg-[#FAFAF7] p-6 rounded-2xl border border-[#006B5B]/15">
              <p className="font-arabic text-xl md:text-3xl text-emerald-950 leading-loose text-right font-medium">
                {ayah.arabic}
              </p>
            </div>

            {/* Bangla Meaning */}
            <div className="text-xs md:text-sm text-gray-700 leading-relaxed space-y-1">
              <strong className="text-gray-900 block font-semibold">বাংলা অর্থ:</strong>
              <p>{ayah.banglaMeaning}</p>
            </div>

            {/* Ruqyah Benefit & Copy */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#006B5B] bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <span><strong>রুকইয়াহর প্রয়োগ:</strong> {ayah.ruqyahPurpose}</span>
              </div>

              <button
                onClick={() => handleCopy(ayah)}
                className="self-end sm:self-center px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedId === ayah.id ? (
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
