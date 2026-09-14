import { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Clock,
  ThumbsUp,
  Coins
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import ServiceCardList from "@/components/ServiceCardList";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ ও সেশন ফি | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক শারঈ রুকইয়াহ ডায়াগনোসিস, জিনের রুকইয়াহ, বদনজরের রুকইয়াহ ও সিহর বিনষ্টকরণ সেশন ফি ও কার্যপ্রণালী।",
};

export default function ServicesPage() {
  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহসম্মত চিকিৎসা ও ফি তালিকা</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          শারঈ রুকইয়াহ সেবাসমূহ
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহ মোতাবেক পরিচালিত বিশুদ্ধ রুকইয়াহ ও কাউন্সেলিং সেবা।
        </p>
      </div>

      {/* TOP FEATURED: DIAGNOSIS CARD */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#006B5B]/30 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#006B5B] text-white flex items-center justify-center shadow-xs shrink-0">
              <Stethoscope className="w-6 h-6 text-[#F2C94C]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D4A017] uppercase tracking-wider">
                প্রাথমিক চেকআপ
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#004D40]">
                ডায়াগনোসিস ফি
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[10px] text-gray-500 block">একক রোগী</span>
              <span className="text-sm sm:text-base font-black text-[#006B5B]">১,০০০/=</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[10px] text-gray-500 block">ফুল ফ্যামিলি</span>
              <span className="text-sm sm:text-base font-black text-[#B3830D]">২,০০০/=</span>
            </div>
          </div>
        </div>

        {/* Short notice */}
        <div className="p-3 rounded-xl bg-[#FAFAF7] border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-gray-700">
            <ThumbsUp className="w-4 h-4 text-[#006B5B] shrink-0" />
            <span>আগে ডায়াগনোসিস করে নিন। সমস্যা না থাকলে কোনো চিকিৎসা খরচের প্রয়োজন নেই।</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              ৩০-৪৫ মি.
            </span>
            <Link
              href="/appointment?service=diagnosis_single"
              className="px-3.5 py-1.5 rounded-lg bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs transition-colors shadow-2xs"
            >
              বুকিং করুন
            </Link>
          </div>
        </div>
      </div>

      {/* Services List with Expandable Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-[#004D40] flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#D4A017]" />
            <span>সমস্যাভিত্তিক পূর্ণাঙ্গ সেশন ফি</span>
          </h2>
          <span className="text-xs text-gray-500">চেম্বার ও অনলাইন</span>
        </div>

        <ServiceCardList />
      </div>

      {/* Quick Help Bottom CTA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FAFAF7] border border-[#006B5B]/15 text-center space-y-3 shadow-2xs">
        <h3 className="text-base sm:text-lg font-bold text-[#004D40]">
          কোন সেবাটি প্রয়োজন বুঝতে পারছেন না?
        </h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          লক্ষণ পরীক্ষা করে নিজেই ফলাফল জানুন কিংবা সরাসরি WhatsApp-এ রাক্বীর সাথে যোগাযোগ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 pt-1">
          <Link
            href="/assessment"
            className="px-4 py-2 rounded-xl bg-[#006B5B] text-white font-bold text-xs hover:bg-[#004D40] shadow-xs flex items-center gap-1.5"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>লক্ষণ পরীক্ষা</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। আমি সমস্যার বিষয়ে রাক্বীর সাথে পরামর্শ করতে চাই।")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-emerald-600 text-[#006B5B] font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp পরামর্শ</span>
          </a>
        </div>
      </div>
    </div>
  );
}
