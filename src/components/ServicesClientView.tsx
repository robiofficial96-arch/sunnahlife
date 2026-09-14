"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Eye,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  ThumbsUp,
  HeartHandshake,
  ArrowRight
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ServiceItem {
  id: string;
  title: string;
  categoryLabel: string;
  iconName: "flame" | "eye" | "sparkles" | "users";
  fee: string;
  duration: string;
  accentColor: string;
  badgeBg: string;
  iconBg: string;
  summary: string;
  highlights: string[];
  whoIsItFor: string;
  process: string[];
  bookingId: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: "jinn",
    title: "জিনের রুকইয়াহ (উপদ্রব নিবারণ)",
    categoryLabel: "জিন স্পর্শ ও আসর",
    iconName: "flame",
    fee: "৫,০০০ - ৮,০০০/=",
    duration: "১ - ৩ ঘণ্টা",
    accentColor: "border-rose-200 hover:border-rose-500",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-100/80 text-rose-600",
    summary: "আক্রান্ত ব্যক্তির জন্য আযাব ও অপশক্তি দাহ্যকারী আয়াত তিলাওয়াত ও সুন্নাহ পদ্ধতিতে নিষ্কাশন।",
    highlights: [
      "সরাসরি রাক্বীর উপস্থিতিতে বিশেষ আযাবের আয়াত তিলাওয়াত",
      "জিনের অবস্থান চিহ্নিত ও সুন্নাহ মোতাবেক বহিষ্কার",
      "রুকইয়াহকৃত তেল-পানি প্রস্তুতি ও পরবর্তী আমল গাইড"
    ],
    whoIsItFor: "হঠাৎ খিঁচুনি বা অজ্ঞান হওয়া, রাতে তীব্র ভয়, মেজাজ হিংস্র হওয়া কিংবা অবচেতন অবস্থায় অস্বাভাবিক আচরণ।",
    process: [
      "শারঈ রাক্বীর সরাসরি উপস্থিতিতে বিশেষ আযাব ও অপশক্তি দাহ্যকারী আয়াতসমূহ তিলাওয়াত।",
      "কুরআন-সুন্নাহর বিধান অনুযায়ী সতর্কবার্তা ও বহিষ্কার তিলাওয়াত।",
      "রোগীর শারীরিক ও মানসিক অবস্থা নিবিড়ভাবে পর্যবেক্ষণ করে জিনের অপপ্রভাব নিষ্কাশন।",
      "নারী রোগীদের ক্ষেত্রে পূর্ণাঙ্গ পর্দা ও মাহরামের উপস্থিতি বাধ্যতামূলক।"
    ],
    bookingId: "jinn"
  },
  {
    id: "evil_eye",
    title: "বদনজর ও হাসাদের রুকইয়াহ",
    categoryLabel: "কুনজর ও বিষাক্ত চোখ",
    iconName: "eye",
    fee: "৩,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    accentColor: "border-amber-200 hover:border-amber-500",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    iconBg: "bg-amber-100/80 text-amber-700",
    summary: "মানুষের হিংসুটে চোখ, কুনজর ও হাসাদের বিষাক্ত প্রভাব বিনষ্টকারী সহীহ সুন্নাহ চিকিৎসা।",
    highlights: [
      "বদনজর মুক্তির সহীহ হাদিস বর্ণিত মাসনুন দোয়া পাঠ",
      "রোগীর শারীরিক প্রতিক্রিয়া পর্যবেক্ষণ ও পানির দম",
      "বিশেষ সুন্নাহ গোসল ও সার্বক্ষণিক হিফযের আমল"
    ],
    whoIsItFor: "বিনা কারণে দীর্ঘ ক্লান্তি, অবিরত হাই ও মাথা ঝিমঝিম, চেহারা ফ্যাকাশে হওয়া, কাজে হঠাৎ অচলাবস্থা।",
    process: [
      "বদনজর ও হিংসা মুক্তির সহীহ হাদিস বর্ণিত মাসনুন দোয়া ও কুরআনি আয়াত পাঠ।",
      "রোগীর প্রতিক্রিয়া (চোখ দিয়ে পানি পড়া, ঢেকুর, কাঁপুনি) পর্যবেক্ষণ।",
      "রুকইয়াহ করা পানি দ্বারা বিশেষ সুন্নাহ গোসলের নিয়ম শিখিয়ে দেওয়া।",
      "সকাল-সন্ধ্যার সুরক্ষা আযকারের নির্দেশনা প্রদান।"
    ],
    bookingId: "evil_eye"
  },
  {
    id: "sihr",
    title: "জাদুর রুকইয়াহ (সিহর বিনষ্টকরণ)",
    categoryLabel: "কুফরি জাদু ধ্বংস",
    iconName: "sparkles",
    fee: "৪,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    accentColor: "border-emerald-200 hover:border-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-100/80 text-[#006B5B]",
    summary: "বিচ্ছেদ, বিবাহে বাধা বা দীর্ঘ শারীরিক জটিলতা সৃষ্টির কুফরি জাদুটোনা স্থায়ী ধ্বংসের রুকইয়াহ।",
    highlights: [
      "কুফরি বাঁধন ছিন্নকারী বিশেষ 'আয়াতুস সিহর' দ্বারা দম",
      "খাওয়া জাদু হলে সেন্না পাতা ও শারঈ ভেষজ ডিটক্স",
      "পুঁতে রাখা বা ছিটানো জাদুর আলামত শরিয়াহসম্মত ধ্বংস"
    ],
    whoIsItFor: "স্বামী-স্ত্রীর অহেতুক চরম ঘৃণা, বিয়েতে বারবার অযাচিত বাধা, পেটে দীর্ঘদিনের অস্বাভাবিক যন্ত্রণা বা দুঃস্বপ্ন।",
    process: [
      "জাদুর কুফরি বাঁধন ছিন্নকারী বিশেষ 'আয়াতুস সিহর' দ্বারা সরাসরি ফুঁক প্রদান।",
      "খাওয়া বা পান করা জাদু হলে সেন্না পাতা ও শারঈ ভেষজ ডিটক্স গাইড।",
      "পুঁতে রাখা বা ছিটানো জাদুর আলামত অনুসন্ধান ও শরিয়াহসম্মতভাবে ধ্বংস।",
      "পরিবার ও গৃহের সুরক্ষায় সূরা বাকারা ও বিশেষ হিফয রুটিন।"
    ],
    bookingId: "sihr"
  },
  {
    id: "family",
    title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
    categoryLabel: "পারিবারিক শান্তি",
    iconName: "users",
    fee: "আলোচনা সাপেক্ষে",
    duration: "১ - ১.৫ ঘণ্টা",
    accentColor: "border-teal-200 hover:border-teal-500",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
    iconBg: "bg-teal-100/80 text-teal-700",
    summary: "সংসারে অহেতুক বিবাদ, স্বামী-স্ত্রীর ভুল বোঝাবুঝি ও পরিবারের মানসিক অস্থিরতা দূরীকরণ।",
    highlights: [
      "শারঈ ও মানসিক দৃষ্টিকোণ থেকে সমস্যা বিশ্লেষণ",
      "বিচ্ছেদ সৃষ্টিকারী সিহর (সিহরুত তাফরিক্ব) এর লক্ষণ পরীক্ষা",
      "সূরা বাকারা ও মেলবন্ধনের বিশেষ সুন্নাহ নসীহত"
    ],
    whoIsItFor: "দাম্পত্য কলহ, পরিবারে সদস্যদের মধ্যে অশান্তি বা পারস্পরিক অমূলক সন্দেহপ্রবণতা।",
    process: [
      "উভয় পক্ষের বক্তব্য শারঈ দৃষ্টিকোণ থেকে শোনা ও মানসিক বিষয়াদি যাচাই।",
      "বিচ্ছেদ সৃষ্টিকারী সিহরের লক্ষণ পরীক্ষা।",
      "গৃহ সুরক্ষায় সূরা বাকারা ও বিশেষ মাসনুন আমলের দিকনির্দেশনা।",
      "পরস্পরের প্রতি সহানুভূতি ও ক্ষমাশীলতার সুন্নাহ নসীহত প্রদান।"
    ],
    bookingId: "family_counseling"
  }
];

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-8 md:py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006B5B]/10 border border-[#006B5B]/20 text-[#006B5B] text-xs font-semibold shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহসম্মত নির্ভরযোগ্য সেবা ও ফি কাঠামো</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight leading-tight">
          শারঈ রুকইয়াহ সেবাসমূহ ও সেশন ফি
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          কুরআন ও সহীহ সুন্নাহ মোতাবেক পরিচালিত বিশুদ্ধ রুকইয়াহ ও কাউন্সেলিং সেবা। কোনো প্রকার কুসংস্কার বা ভণ্ডামিমুক্ত শারঈ চিকিৎসা।
        </p>

        {/* Quick Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] sm:text-xs text-gray-600">
          <span className="px-3 py-1 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#006B5B]" />
            ১০০% কুরআন ও সুন্নাহ
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
            পর্দা ও মাহরাম নিশ্চিত
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            চেম্বার ও অনলাইন সেশন
          </span>
        </div>
      </div>

      {/* 2. DIAGNOSIS CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-emerald-50/30 to-[#FAFAF7] border-2 border-[#006B5B] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4A017]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Banner Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#006B5B]/15 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#006B5B] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-6 h-6 text-[#F2C94C]" />
              </div>
              <div>
                <span className="text-xs text-[#D4A017] font-bold uppercase tracking-wider block">
                  প্রাথমিক চেকআপ
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#004D40] mt-0.5">
                  ডায়াগনোসিস ফি
                </h2>
              </div>
            </div>

            {/* Price Tags */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="p-2.5 sm:px-4 sm:py-2 rounded-2xl bg-white border border-[#006B5B]/20 text-center shadow-2xs">
                <span className="text-[10px] text-gray-500 block font-medium">একক রোগী</span>
                <span className="text-lg sm:text-xl font-black text-[#006B5B] font-mono">১,০০০/=</span>
              </div>
              <div className="p-2.5 sm:px-4 sm:py-2 rounded-2xl bg-white border border-amber-300 text-center shadow-2xs">
                <span className="text-[10px] text-gray-500 block font-medium">ফুল ফ্যামিলি</span>
                <span className="text-lg sm:text-xl font-black text-[#B3830D] font-mono">২,০০০/=</span>
              </div>
            </div>
          </div>

          {/* Reassuring Shariah Advice & Booking */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#006B5B]/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#004D40]">
                <ThumbsUp className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>শারঈ পরামর্শ ও উপদেশ:</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                ট্রিটমেন্ট খরচ ভাবার আগে শুধু ডায়াগনোসিস করে নিশ্চিত হোন। যদি কোনো আধ্যাত্মিক সমস্যা না থাকে, তবে আর কোনো চিকিৎসার খরচের প্রয়োজন নেই, ইনশাআল্লাহ।
              </p>
              <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>সময়কাল: ৩০ - ৪৫ মিনিট • চেম্বার বা অনলাইনে ভিডিও কলে সম্পন্ন হয়</span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2">
              <Link
                href="/appointment?service=diagnosis_single"
                className="w-full py-3 px-4 rounded-2xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#F2C94C]" />
                <span>ডায়াগনোসিস বুকিং করুন</span>
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। আমি ডায়াগনোসিস সেশন সম্পর্কে জানতে চাচ্ছি।")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-600/30 text-[#006B5B] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp পরামর্শ</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CORE SERVICES 2-COLUMN GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#004D40]">
              সমস্যাভিত্তিক পূর্ণাঙ্গ চিকিৎসা সেশন
            </h2>
            <p className="text-xs text-gray-500">
              অভিজ্ঞ শারঈ রাক্বীর সরাসরি উপস্থিতি বা নিবিড় তত্ত্বাবধানে
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
            চেম্বার ও অনলাইন উভয় মাধ্যমে
          </span>
        </div>

        {/* 2-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES_LIST.map((srv) => {
            const isExpanded = expandedId === srv.id;

            return (
              <div
                key={srv.id}
                className={`rounded-3xl bg-white border-2 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  isExpanded ? "border-[#006B5B] ring-2 ring-[#006B5B]/10" : srv.accentColor
                }`}
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Card Header: Icon + Category + Price */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs shrink-0 ${srv.iconBg}`}>
                        {srv.iconName === "flame" && <Flame className="w-6 h-6" />}
                        {srv.iconName === "eye" && <Eye className="w-6 h-6" />}
                        {srv.iconName === "sparkles" && <Sparkles className="w-6 h-6" />}
                        {srv.iconName === "users" && <Users className="w-6 h-6" />}
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${srv.badgeBg}`}>
                          {srv.categoryLabel}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mt-1">
                          {srv.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Fee & Duration Bar */}
                  <div className="p-3 rounded-2xl bg-[#FAFAF7] border border-gray-200/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-medium block">সেশন ফি</span>
                      <span className="text-base sm:text-lg font-black text-[#006B5B] font-mono">
                        {srv.fee}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-medium block">সময়কাল</span>
                      <span className="text-xs font-bold text-gray-700 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {srv.duration}
                      </span>
                    </div>
                  </div>

                  {/* Short Summary */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {srv.summary}
                  </p>

                  {/* 3 Bullet Highlights */}
                  <ul className="space-y-1.5 text-xs text-gray-700 pt-1 border-t border-gray-100">
                    {srv.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006B5B] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Section */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-gray-100 space-y-3 text-xs animate-in fade-in-50 duration-200 bg-emerald-50/20 -mx-5 -mb-4 p-5 rounded-b-2xl">
                      <div>
                        <strong className="text-gray-900 block font-bold mb-1">কাদের জন্য প্রযোজ্য:</strong>
                        <p className="text-gray-600 leading-relaxed">{srv.whoIsItFor}</p>
                      </div>

                      <div>
                        <strong className="text-gray-900 block font-bold mb-1.5">শারঈ কার্যপ্রণালী:</strong>
                        <ul className="space-y-1 text-gray-600">
                          {srv.process.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B] mt-1.5 shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => toggleExpand(srv.id)}
                      className="text-xs font-semibold text-[#006B5B] hover:text-[#004D40] flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <span>{isExpanded ? "কার্যপ্রণালী সংক্ষেপ" : "কার্যপ্রণালী ও নিয়ম দেখুন"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(`আসসালামু আলাইকুম। আমি "${srv.title}" সেবাটির বিষয়ে জানতে চাচ্ছি।`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-[#006B5B] flex items-center gap-1 font-medium transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>জিজ্ঞাসা</span>
                    </a>
                  </div>

                  <Link
                    href={`/appointment?service=${srv.bookingId}`}
                    className="w-full py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#F2C94C]" />
                    <span>অ্যাপয়েন্টমেন্ট বুকিং</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM CONFIDENCE / FAQ BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#004D40] via-[#005B4D] to-[#00382E] text-white shadow-md border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>সরাসরি রাক্বীর গাইডেন্স</span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
            কোন সেবাটি আপনার প্রয়োজন বুঝতে পারছেন না?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg">
            প্রথমে বিনামূল্যে লক্ষণ পরীক্ষা করুন অথবা সরাসরি WhatsApp-এ রাক্বীকে আপনার সমস্যার কথা জানিয়ে পরামর্শ নিন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
          <Link
            href="/assessment"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all text-center flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-[#F2C94C]" />
            <span>লক্ষণ পরীক্ষা</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। আমি রুকইয়াহ সেবা নেওয়ার জন্য রাক্বীর পরামর্শ চাই।")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#D4A017] hover:bg-[#F2C94C] text-[#00382E] font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#00382E]" />
            <span>WhatsApp পরামর্শ</span>
          </a>
        </div>
      </div>

    </div>
  );
}

