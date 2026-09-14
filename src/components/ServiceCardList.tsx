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
  Target,
  ClipboardList
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  iconName: "flame" | "eye" | "sparkles" | "users";
  fee: string;
  duration: string;
  shortDesc: string;
  whoIsItFor: string;
  process: string[];
  schedule: string;
  bookingId: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: "jinn",
    title: "জিনের রুকইয়াহ (উপদ্রব নিবারণ)",
    subtitle: "জিন স্পর্শ, আসর ও তীব্র ভীতি দূরীকরণে নিবিড় সেশন",
    iconName: "flame",
    fee: "৫,০০০ - ৮,০০০/=",
    duration: "১ - ৩ ঘণ্টা",
    shortDesc: "আক্রান্ত ব্যক্তির জন্য আযাব ও অপশক্তি দাহ্যকারী আয়াত তিলাওয়াত ও সুন্নাহ পদ্ধতিতে নিষ্কাশন।",
    whoIsItFor: "হঠাৎ খিঁচুনি বা অজ্ঞান হয়ে যাওয়া, রাতে তীব্র ভয় ও শ্বাসকষ্ট, মেজাজ হঠাৎ হিংস্র হওয়া বা অবচেতন আচরণ।",
    process: [
      "শারঈ রাক্বীর উপস্থিতিতে বিশেষ আযাবের আয়াতসমূহ তিলাওয়াত।",
      "কুরআন-সুন্নাহ মোতাবেক কঠোর সতর্কবার্তা ও বহিষ্কার তিলাওয়াত।",
      "রুকইয়াহকৃত পানি ও তেলের ব্যবহার বুঝিয়ে দেওয়া।",
      "নারী রোগীদের ক্ষেত্রে পর্দা ও মাহরামের উপস্থিতি বাধ্যতামূলক।",
    ],
    schedule: "শনিবার - বৃহস্পতিবার (সকাল ১০:০০ - রাত ৯:০০)",
    bookingId: "jinn",
  },
  {
    id: "evil_eye",
    title: "বদনজর ও হাসাদের রুকইয়াহ",
    subtitle: "কুনজর ও হিংসার বিষাক্ত প্রভাব বিনষ্টকারী সুন্নাহ চিকিৎসা",
    iconName: "eye",
    fee: "৩,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    shortDesc: "দীর্ঘস্থায়ী অবসাদ, ডাক্তারি টেস্টে রোগ না ধরা পড়া ও অব্যাখ্যাত বিপর্যয়ে সুন্নাহ শেফা।",
    whoIsItFor: "অকারণে দীর্ঘ ক্লান্তি, অবিরত হাই ও মাথা ঝিমঝিম, চেহারা ফ্যাকাশে হওয়া, কাজে হঠাৎ অচলাবস্থা।",
    process: [
      "বদনজর মুক্তির সহীহ হাদিসের দোয়া ও কুরআনি আয়াত পাঠ।",
      "রোগীর শারীরিক ও মানসিক প্রতিক্রিয়া পর্যবেক্ষণ।",
      "রুকইয়াহর পানি দ্বারা বিশেষ সুন্নাহ গোসলের পদ্ধতি প্রদান।",
      "সকাল-সন্ধ্যার সুরক্ষা আযকারের নির্দেশনা।",
    ],
    schedule: "প্রতিদিন (সকাল ১০:০০ - রাত ১০:০০)",
    bookingId: "evil_eye",
  },
  {
    id: "sihr",
    title: "জাদুর রুকইয়াহ (সিহর বিনষ্টকরণ)",
    subtitle: "বিচ্ছেদ, বিয়েতে বাধা বা দীর্ঘ জটিলতা ধ্বংসের রুকইয়াহ",
    iconName: "sparkles",
    fee: "৪,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    shortDesc: "জাদুর কুফরি বাঁধন ছিন্নকারী বিশেষ 'আয়াতুস সিহর' দ্বারা সরাসরি দম ও সুন্নাহ ডিটক্স।",
    whoIsItFor: "স্বামী-স্ত্রীর অহেতুক চরম ঘৃণা, বিয়েতে বারবার রহস্যজনক বাধা, পেটে দীর্ঘস্থায়ী অস্বাভাবিক যন্ত্রণা বা দুঃস্বপ্ন।",
    process: [
      "আয়াতুস সিহর তিলাওয়াত করে সরাসরি ফুঁক প্রদান।",
      "খাওয়া জাদু হলে সেন্না পাতা ও শারঈ ভেষজ ডিটক্স গাইড।",
      "লুকানো বা ছিটানো জাদুর আলামত শরিয়াহসম্মতভাবে ধ্বংসের নিয়ম।",
      "সূরা বাকারার মাধ্যমে গৃহের সার্বিক সুরক্ষা।",
    ],
    schedule: "শনিবার - বৃহস্পতিবার (সকাল ১০:০০ - রাত ৯:০০)",
    bookingId: "sihr",
  },
  {
    id: "family",
    title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
    subtitle: "সংসারে অহেতুক বিবাদ ও পরিবারের আত্মিক অশান্তি দূরীকরণ",
    iconName: "users",
    fee: "আলোচনা সাপেক্ষে",
    duration: "১ - ১.৫ ঘণ্টা",
    shortDesc: "শারঈ দৃষ্টিকোণ থেকে সমস্যা বিশ্লেষণ, সিহরুত তাফরিক্ব নির্ণয় ও পারস্পরিক মেলবন্ধনের আমল।",
    whoIsItFor: "দাম্পত্য কলহ, পরিবারে মানসিক অস্থিরতা বা পারস্পরিক সন্দেহপ্রবণতা।",
    process: [
      "উভয় পক্ষের কথা শারঈ ও মানসিক দৃষ্টিতে বিশ্লেষণ।",
      "বিচ্ছেদ সৃষ্টিকারী সিহরের লক্ষণ যাচাই।",
      "সূরা বাকারা ও বিশেষ হিফয রুটিনের নির্দেশনা।",
    ],
    schedule: "অ্যাপয়েন্টমেন্ট ভিত্তিক",
    bookingId: "family_counseling",
  },
];

export default function ServiceCardList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {SERVICES_DATA.map((srv) => {
        const isExpanded = expandedId === srv.id;

        return (
          <div
            key={srv.id}
            className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
              isExpanded
                ? "border-[#006B5B] shadow-sm ring-1 ring-[#006B5B]/10"
                : "border-gray-200 hover:border-[#006B5B]/40 shadow-2xs hover:shadow-xs"
            }`}
          >
            {/* Main Card Header */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center shrink-0 mt-0.5">
                  {srv.iconName === "flame" && <Flame className="w-6 h-6" />}
                  {srv.iconName === "eye" && <Eye className="w-6 h-6" />}
                  {srv.iconName === "sparkles" && <Sparkles className="w-6 h-6" />}
                  {srv.iconName === "users" && <Users className="w-6 h-6" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#006B5B] font-medium mt-0.5">
                    {srv.subtitle}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>
              </div>

              {/* Fee & Action Badges */}
              <div className="flex flex-wrap sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#006B5B] text-white font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    {srv.fee}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {srv.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/appointment?service=${srv.bookingId}`}
                    className="px-3 py-1.5 rounded-lg bg-[#006B5B] hover:bg-[#004D40] text-white text-xs font-bold transition-colors"
                  >
                    বুকিং
                  </Link>
                  <button
                    onClick={() => toggleExpand(srv.id)}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "সংক্ষেপ" : "বিস্তারিত"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Details Area */}
            {isExpanded && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-3 border-t border-gray-100 bg-gradient-to-b from-emerald-50/20 to-white text-xs space-y-3.5 animate-in fade-in-50 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Who it is for */}
                  <div className="space-y-1.5">
                    <strong className="text-gray-900 flex items-center gap-1.5 font-bold">
                      <Target className="w-3.5 h-3.5 text-[#006B5B]" />
                      <span>কাদের জন্য প্রযোজ্য:</span>
                    </strong>
                    <p className="text-gray-600 leading-relaxed pl-5">
                      {srv.whoIsItFor}
                    </p>
                  </div>

                  {/* Process */}
                  <div className="space-y-1.5">
                    <strong className="text-gray-900 flex items-center gap-1.5 font-bold">
                      <ClipboardList className="w-3.5 h-3.5 text-[#006B5B]" />
                      <span>কার্যপ্রণালী (কিভাবে করা হয়):</span>
                    </strong>
                    <ul className="space-y-1 text-gray-600 pl-5">
                      {srv.process.map((step, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#006B5B] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Bar inside expansion */}
                <div className="pt-2.5 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B]" />
                    পর্দা ও মাহরাম বাধ্যতামূলক (নারী রোগীদের ক্ষেত্রে)
                  </span>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(`আসসালামু আলাইকুম। আমি "${srv.title}" সেবাটির বিষয়ে পরামর্শ নিতে চাই।`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#006B5B] font-bold hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp-এ কথা বলুন
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
