import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import SelfRuqyahSteps from "@/components/SelfRuqyahSteps";

export const metadata: Metadata = {
  title: "সেলফ-রুকইয়াহ ৭ ধাপের গাইড | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক নিজেই নিজের রুকইয়াহ করার নিয়ম, পদ্ধতি ও আমলসমূহ।",
};

export default function SelfRuqyahPage() {
  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহসম্মত আত্মরক্ষা</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          সেলফ-রুকইয়াহ: ৭ ধাপের সহজ গাইড
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          অন্যের ওপর নির্ভরশীল না হয়ে কুরআন ও সহীহ দোয়ার মাধ্যমে নিজেই নিজের চিকিৎসা করুন।
        </p>
      </div>

      {/* Interactive Expandable Steps */}
      <SelfRuqyahSteps />

      {/* Raqi CTA Bottom Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-radial from-emerald-50 to-white border-2 border-[#006B5B]/40 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base sm:text-lg font-bold text-[#004D40]">
            সেলফ-রুকইয়াহ করার সময় তীব্র কোনো সমস্যা হচ্ছে?
          </h3>
          <p className="text-xs text-gray-600 max-w-lg">
            অতিরিক্ত অস্বস্তি বা অস্বাভাবিক প্রতিক্রিয়া হলে সরাসরি শারঈ রাক্বীর পরামর্শ নিন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <Link
            href="/assessment"
            className="px-4 py-2.5 rounded-xl border border-[#006B5B] text-[#006B5B] text-center font-bold text-xs sm:text-sm hover:bg-[#006B5B]/5 transition-colors"
          >
            লক্ষণ পরীক্ষা
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সেলফ রুকইয়াহ করতে গিয়ে পরামর্শ চাই")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#006B5B] text-white text-center font-bold text-xs sm:text-sm hover:bg-[#004D40] shadow-xs flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
            WhatsApp-এ পরামর্শ
          </a>
        </div>
      </div>
    </div>
  );
}
