import { Metadata } from "next";
import Link from "next/link";
import { RUQYAH_STEPS } from "@/data/ruqyahSteps";
import { ShieldCheck, Heart, Sparkles, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "সেলফ-রুকইয়াহ ৭ ধাপের গাইড | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক নিজেই নিজের রুকইয়াহ করার নিয়ম, পদ্ধতি ও আমলসমূহ।",
};

export default function SelfRuqyahPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহসম্মত আত্মরক্ষা</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          সেলফ-রুকইয়াহ: নিজে নিজের চিকিৎসা করার পূর্ণাঙ্গ গাইড
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          রাসূলুল্লাহ (ﷺ) ও সাহাবায়ে কেরাম অসুস্থতায় অন্যের ওপর নির্ভরশীল না হয়ে নিজেই নিজের ওপর কুরআন ও দোয়ার মাধ্যমে রুকইয়াহ করতেন। নিচে ধারাবাহিক ৭টি ধাপ দেওয়া হলো।
        </p>
      </div>

      {/* 7 Steps */}
      <div className="space-y-6">
        {RUQYAH_STEPS.map((step) => (
          <div
            key={step.stepNumber}
            className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs relative overflow-hidden"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#006B5B] text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                ০{step.stepNumber}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#004D40]">
                  {step.title}
                </h2>
                <p className="text-xs md:text-sm text-[#D4A017] font-semibold mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              {step.details}
            </p>

            {step.ayatOrDua && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#FAFAF7] border border-[#006B5B]/15 text-xs md:text-sm text-[#006B5B] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A017]" />
                <span>পাঠের পরিমাণ: {step.ayatOrDua}</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006B5B]" />
                গুরুত্বপূর্ণ নির্দেশনাসমূহ:
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {step.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#006B5B] mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Raqi CTA Bottom Banner */}
      <div className="p-8 rounded-3xl bg-radial from-emerald-50 to-white border-2 border-[#006B5B] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#004D40]">
            সেলফ-রুকইয়াহ করার সময় অস্বাভাবিক কোনো তীব্র সমস্যা অনুভব করছেন?
          </h3>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl">
            যদি কুরআন পাঠ বা অডিও শোনার সময় প্রচণ্ড খিঁচুনি, অজ্ঞান ভাব বা অস্বাভাবিক চিৎকার আসে, তবে একজন অভিজ্ঞ শারঈ রাক্বীর পরামর্শ নেওয়া জরুরি।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/assessment"
            className="px-5 py-3 rounded-xl border border-[#006B5B] text-[#006B5B] text-center font-bold text-sm hover:bg-[#006B5B]/5 transition-colors"
          >
            লক্ষণ পরীক্ষা করুন
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সেলফ রুকইয়াহ করতে গিয়ে পরামর্শ চাই")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#006B5B] text-white text-center font-bold text-sm hover:bg-[#004D40] shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
            WhatsApp-এ যোগাযোগ
          </a>
        </div>
      </div>
    </div>
  );
}
