"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Flame,
  HeartHandshake,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Headphones,
  CheckCircle2,
  Sparkles,
  Info
} from "lucide-react";

export function AudioInstructionsAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden sm:block rounded-2xl bg-white border border-[#006B5B]/20 shadow-2xs overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-emerald-50/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              রুকইয়াহ শোনার ৩টি জরুরি নিয়ম ও আদব
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
              অযু অবস্থায় একমনে শুনুন ও শারীরিক প্রতিক্রিয়া লক্ষ্য রাখুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#006B5B]">
          <span>{isOpen ? "সংক্ষেপ" : "নিয়ম দেখুন"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-2 border-t border-gray-100 bg-gradient-to-b from-emerald-50/15 to-white grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs animate-in fade-in-50 duration-200">
          <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
            <div className="font-bold text-[#006B5B] flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5" />
              <span>১. হেডফোন ব্যবহার</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              মনোযোগ ধরে রাখতে এবং চারপাশের কোলাহল এড়িয়ে স্পষ্ট শুনতে হেডফোন ব্যবহার করা উত্তম।
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
            <div className="font-bold text-[#006B5B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>২. প্রতিক্রিয়া লক্ষ্য রাখা</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              চোখ দিয়ে পানি পড়া, গা ভারী বা হাই উঠলে ভয় না পেয়ে আল্লাহর ওপর ভরসা রেখে শুনুন।
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
            <div className="font-bold text-[#006B5B] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>৩. আল্লাহর ওপর তাওয়াক্কুল</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              কুরআন শিফা ও শয়তানের জন্য দাহ্যকারী। আরোগ্য দানকারী একমাত্র আল্লাহ সুবহানাহু ওয়া তাআলা।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function AudioGuidelinesExpandable() {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const guidelines = [
    {
      id: "evil_eye",
      icon: ShieldAlert,
      iconColor: "bg-amber-50 text-amber-600",
      title: "আইন ও হাসাদ (বদনজর)",
      shortDesc: "অতিরিক্ত হাই ওঠা, অহেতুক ক্লান্তি ও কাজে হঠাৎ অনীহার সুন্নাহ সমাধান।",
      fullDetails: "রাসূলুল্লাহ (ﷺ) বলেছেন: বদনজর সত্য (বুখারী ৫৭৪০)। প্রতিদিন সুরক্ষামূলক ৩ কুল ও আয়াতুল কুরসি পাঠ করে শরীরে ফুঁক দিন এবং রুকইয়াহ পানি পান করুন।",
      link: "/articles/eaten-magic-sihr-makul-symptoms-cure",
      linkText: "বিস্তারিত লক্ষণ ও আমল",
    },
    {
      id: "eaten_magic",
      icon: Flame,
      iconColor: "bg-red-50 text-red-600",
      title: "খাওয়ানো জাদু (পেটের সিহর)",
      shortDesc: "পেটের তীব্র গ্যাস, বমি ভাব ও নাভির আশেপাশে ভারী গিঁটের শারঈ চিকিৎসা।",
      fullDetails: "পেটের জাদুর ক্ষেত্রে রুকইয়াহ করা পানির সাথে সানা মাক্কি চা (ইবনে মাজাহ ৩৪৫৭) ও খাঁটি মধু সহযোগে পেট ডিটক্স সুন্নাহসম্মত অন্যতম কার্যকর উপায়।",
      link: "/articles/eaten-magic-sihr-makul-symptoms-cure",
      linkText: "সানা মাক্কি ডিটক্স পদ্ধতি",
    },
    {
      id: "renewal_magic",
      icon: HeartHandshake,
      iconColor: "bg-emerald-50 text-[#006B5B]",
      title: "জাদু নবায়ন রোধ ও ঘর সুরক্ষা",
      shortDesc: "পেরেক বা কুফরি তাবীজ বাদ দিয়ে সুন্নাহ পদ্ধতিতে ঘর শয়তানমুক্ত রাখার নিয়ম।",
      fullDetails: "অযু অবস্থায় শোয়া, সূরা বাকারার শেষ দুই আয়াত তিলাওয়াত এবং রুকইয়াহ করা পানি ঘরের ৪ কোণায় ছিটিয়ে ঘরকে শয়তানের উপদ্রব থেকে নিরাপদ রাখুন।",
      link: "/articles/house-protection-shariah-bari-bondho",
      linkText: "ঘর সুরক্ষার শারঈ আমল",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center max-w-lg mx-auto space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-[#004D40]">
          জরুরি রুকইয়াহ গাইডলাইন ও করণীয়
        </h3>
        <p className="text-xs text-gray-500">
          কার্ডে ট্যাপ করে প্রয়োজনীয় আমল ও নিয়মাবলী বিস্তারিত দেখুন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {guidelines.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedCards.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                isExpanded
                  ? "border-[#006B5B] shadow-xs"
                  : "border-gray-200 hover:border-[#006B5B]/40 shadow-2xs"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <button
                    onClick={() => toggleCard(item.id)}
                    className="text-[11px] font-semibold text-[#006B5B] hover:text-[#004D40] flex items-center gap-0.5 px-2 py-1 rounded-md hover:bg-emerald-50"
                  >
                    <span>{isExpanded ? "সংক্ষেপ" : "বিস্তারিত"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.shortDesc}
                </p>

                {isExpanded && (
                  <div className="pt-2 border-t border-gray-100 text-xs text-gray-700 leading-relaxed animate-in fade-in-50 duration-200 space-y-2">
                    <p>{item.fullDetails}</p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B5B] hover:underline"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
