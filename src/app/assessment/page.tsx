import { Metadata } from "next";
import SymptomChecker from "@/components/SymptomChecker";
import { Stethoscope, HeartPulse, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "লক্ষণ পরীক্ষা ও সেলফ ডায়াগনোসিস | সুন্নাহলাইফ",
  description: "কুরআন ও সুন্নাহর আলোকে আপনার শারীরিক, মানসিক বা আধ্যাত্মিক লক্ষণ পরীক্ষা করুন এবং সরাসরি WhatsApp-এ ফলাফলসহ রাক্বীর সাথে যোগাযোগ করুন।",
};

export default function AssessmentPage() {
  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Stethoscope className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>শারঈ স্ব-নিরীক্ষণ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          লক্ষণ ও সমস্যা স্ব-নিরীক্ষণ
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          আপনার লক্ষণগুলো টিক দিন এবং স্বয়ংক্রিয় ফলাফলসহ WhatsApp-এ সরাসরি রাক্বীর পরামর্শ নিন।
        </p>
      </div>

      {/* Guidelines Box: Compact 3-col badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#006B5B] shrink-0" />
          <div className="text-xs text-gray-700">
            <strong className="text-gray-900 block font-bold">সঠিক নির্বাচন</strong>
            শুধু নিয়মিত সমস্যাগুলোতেই টিক দিন
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-[#D4A017] shrink-0" />
          <div className="text-xs text-gray-700">
            <strong className="text-gray-900 block font-bold">১-ক্লিকে WhatsApp</strong>
            রেজাল্টসহ মেসেজ স্বয়ংক্রিয় তৈরি হবে
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-center gap-3">
          <HeartPulse className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs text-gray-700">
            <strong className="text-gray-900 block font-bold">মেডিকেল টেস্ট</strong>
            শারীরিক উপসর্গে ডাক্তারও দেখাবেন
          </div>
        </div>
      </div>

      {/* The Symptom Checker Tool */}
      <SymptomChecker />
    </div>
  );
}
