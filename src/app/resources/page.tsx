"use client";

import { useState } from "react";
import { FileText, Printer, Download, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

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
    </div>
  );
}
