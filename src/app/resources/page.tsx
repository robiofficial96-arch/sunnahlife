"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Printer, Download, Sparkles, ShieldCheck, CheckCircle2, Headphones, ExternalLink } from "lucide-react";

interface PrintableGuide {
  id: string;
  title: string;
  category: string;
  pages: string;
  description: string;
  contentLines: string[];
}

const GUIDES: PrintableGuide[] = [
  {
    id: "self_ruqyah_checklist",
    title: "সেলফ-রুকইয়াহ ১-পৃষ্ঠার দ্রুত চেকলিস্ট ও আমল",
    category: "সেলফ-রুকইয়াহ",
    pages: "১ পৃষ্ঠা",
    description: "ঘরে বসে নিজেই নিজের রুকইয়াহ করার ৭ ধাপের সংক্ষিপ্ত চেকলিস্ট ও আয়াতের তালিকা।",
    contentLines: [
      "১. একনিষ্ঠ তাওবাহ ও গুনাহ বর্জন করে শুরু করা।",
      "২. অযু করে কিবলামুখী হয়ে দুই রাকাত সালাতুল হাজত আদায়।",
      "৩. দুই হাত একত্র করে সূরা ফাতিহা ৭ বার ও আয়াতুল কুরসী ৩/৭ বার পাঠ।",
      "৪. সূরা ইখলাস, ফালাক ও নাস ৩ বার পড়ে দুই হাতে ফুঁক দিয়ে সারা শরীরে হাত বুলানো।",
      "৫. ব্যথার স্থানে হাত রেখে 'বিসমিল্লাহ' ৩ বার ও 'আউযু বিইযযাতিল্লাহি...' ৭ বার পাঠ।",
      "৬. পানিতে বা খাঁটি জয়তুনের তেলে ফুঁক দিয়ে তা পান, গোসল ও ব্যথায় মালিশ।",
      "৭. একটানা ২১ থেকে ৪০ দিন পর্যন্ত এই রুকইয়াহ জারি রাখা।",
    ],
  },
  {
    id: "morning_evening_adhkar",
    title: "সকাল ও সন্ধ্যার মাসনুন হিফযের আযকার শিট",
    category: "দোয়া ও আযকার",
    pages: "১ পৃষ্ঠা",
    description: "দৈনন্দিন সকল বালা-মুসিবত ও শয়তান থেকে সার্বক্ষণিক আল্লাহর সুরক্ষার দোয়া সংকলন।",
    contentLines: [
      "১. আয়াতুল কুরসী (সকালে ও সন্ধ্যায় ১ বার) - আল্লাহর পক্ষ থেকে হেফাজতকারী ফেরেশতা নিযুক্ত হয়।",
      "২. সূরা ইখলাস, ফালাক ও নাস (সকালে ও সন্ধ্যায় ৩ বার) - সকল ক্ষতি থেকে সুরক্ষার জন্য যথেষ্ট।",
      "৩. 'বিসমিল্লাহিল্লাযী লা ইয়াদুররু মাআসমিহী শাইউন...' (সকালে ও সন্ধ্যায় ৩ বার)।",
      "৪. 'আউযু বিকালিমা-তিল্লাহিত তা-ম্মা-তি মিন শাররি মা খালাক্ব' (সন্ধ্যায় ৩ বার)।",
      "৫. সাইয়্যিদুল ইস্তিগফার (সকালে ও সন্ধ্যায় ১ বার)।",
      "৬. 'হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া...' (সকালে ও সন্ধ্যায় ৭ বার)।",
    ],
  },
  {
    id: "child_protection",
    title: "শিশুদের বদনজর ও ভীতি মুক্তির মাসনুন আমল",
    category: "পরিবার ও শিশু",
    pages: "১ পৃষ্ঠা",
    description: "ছোট বাচ্চাদের ঘনঘন কান্না, রাতে চমকে ওঠা ও বদনজর থেকে বাঁচানোর সুন্নাহ দোয়া।",
    contentLines: [
      "১. রাসুলুল্লাহ (ﷺ)-এর বর্ণিত দোয়া: 'উঈযুকুম্বা বিকালিমা-তিল্লাহিত তা-ম্মাহ, মিন কুল্লি শাইত্বা-নিঁও ওয়া হা-ম্মাহ, ওয়া মিন কুল্লি আইনিল লা-ম্মাহ'।",
      "২. বাচ্চার কপালে বা মাথায় হাত রেখে ৩ কুল পড়ে ফুঁক দেওয়া।",
      "৩. মাগরিবের সময় শিশুদের বাইরে না রেখে ঘরের ভেতরে রাখা।",
      "৪. সোশ্যাল মিডিয়ায় বা অচেনা মানুষের সামনে অতিরিক্ত ছবি প্রদর্শন পরিহার করা।",
    ],
  },
];

export default function ResourcesPage() {
  const [selectedGuide, setSelectedGuide] = useState<PrintableGuide>(GUIDES[0]);

  const handlePrint = (guide: PrintableGuide) => {
    setSelectedGuide(guide);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>ডাউনলোডযোগ্য ও প্রিন্টযোগ্য রিসোর্স</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          পিডিএফ ও প্রিন্ট রিসোর্স লাইব্রেরি
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          ঘরে ঝুলিয়ে রাখার জন্য বা সাথে নিয়ে পড়ার জন্য ১ পৃষ্ঠার প্রিন্টযোগ্য সুন্নাহ চেকলিস্ট ও দোয়ার শিট।
        </p>
      </div>

      {/* Featured 1-Click Official Azkar PDF */}
      <div className="bg-gradient-to-br from-[#004D40] via-[#005B4D] to-[#00382E] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-3 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/20 text-[#F2C94C] text-xs font-bold border border-[#D4A017]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ফিচার্ড অফিসিয়াল বুকলেট</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            সকাল ও সন্ধ্যার সম্পূর্ণ মাসনুন আযকার (PDF)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            দৈনন্দিন হিফয ও সুরক্ষার জন্য সম্পূর্ণ আযকার বুকলেট। মোবাইল ফোনে সেভ করে অফলাইনে যেকোনো সময় তিলাওয়াত করতে পারেন অথবা প্রিন্ট করে পড়ার উপযোগী।
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-emerald-200 pt-1 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F2C94C]" />
              সহীহ হাদিস ভিত্তিক
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F2C94C]" />
              সাইজ: মাত্র ২৪৫ KB
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F2C94C]" />
              ১০০% ফ্রি ডাউনলোড
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
          <a
            href="/downloads/azkar-masnun-hifz.pdf"
            download="আযকার_ও_মাসনুন_আমল_সুন্নাহলাইফ.pdf"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#D4A017] hover:bg-[#F2C94C] text-[#00382E] font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all transform active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 text-[#00382E]" />
            <span>১-ক্লিকে PDF ডাউনলোড</span>
          </a>
          <a
            href="/downloads/azkar-masnun-hifz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-white/15"
          >
            <ExternalLink className="w-4 h-4 text-[#F2C94C]" />
            <span>সরাসরি দেখুন</span>
          </a>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <div
            key={guide.id}
            className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#006B5B] bg-[#006B5B]/10 px-2.5 py-0.5 rounded-full">
                  {guide.category}
                </span>
                <span className="text-[11px] text-gray-400">{guide.pages}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                {guide.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {guide.description}
              </p>
            </div>

            <button
              onClick={() => handlePrint(guide)}
              className="w-full py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#F2C94C]" />
              <span>প্রিন্ট / PDF সংরক্ষণ করুন</span>
            </button>
          </div>
        ))}
      </div>

      {/* Printable Area preview */}
      <div className="p-8 rounded-3xl bg-white border border-[#006B5B]/20 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs text-[#D4A017] font-semibold">প্রিভিউ ও প্রিন্ট শিট</span>
            <h2 className="text-xl font-bold text-[#004D40]">{selectedGuide.title}</h2>
          </div>
          <button
            onClick={() => handlePrint(selectedGuide)}
            className="px-4 py-2 rounded-xl border border-[#006B5B] text-[#006B5B] hover:bg-[#006B5B]/5 text-xs font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট করুন</span>
          </button>
        </div>

        <div className="space-y-3">
          {selectedGuide.contentLines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7] border border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm text-gray-800 leading-relaxed">{line}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          সুন্নাহলাইফ (Sunnah Life Care) | সুস্থতা হোক সুন্নাহর পথে • sunnahlife.bd
        </div>
      </div>

      {/* Multimedia Ruqyah Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#004D40] to-[#006B5B] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-semibold text-[#F2C94C] uppercase tracking-wider">মাল্টিমিডিয়া রিসোর্স</span>
          <h3 className="text-xl md:text-2xl font-bold">রুকইয়াহ অডিও ও অফিসিয়াল ভিডিও শুনুন</h3>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl leading-relaxed">
            বদনজর, হাসাদ, খাওয়ানো জাদু ও সিহর নবায়ন রোধে শাইখ মাহমুদ হুসাইনীর অফিসিয়াল ভিডিও এবং প্রখ্যাত ক্বারীদের কুরআন তিলাওয়াত।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/audio"
            className="px-5 py-2.5 rounded-xl bg-white text-[#004D40] hover:bg-emerald-50 font-bold text-xs transition-colors shadow-xs flex items-center gap-2"
          >
            <Headphones className="w-4 h-4 text-[#006B5B]" />
            <span>শক্তিশালী রুকইয়াহ অডিও শুনুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
