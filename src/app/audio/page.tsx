import { Metadata } from "next";
import AudioPlayer from "@/components/AudioPlayer";
import { Headphones, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "রুকইয়াহ অডিও লাইব্রেরি | সুন্নাহলাইফ",
  description: "বদনজর, সিহর, ঘুমের সমস্যা ও সাধারণ শেফার রুকইয়াহ অডিও শুনুন এবং সঠিক নিয়মে আমল করুন।",
};

export default function AudioPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>কুরআন তিলাওয়াত ও অডিও</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ শারইয়্যাহ অডিও লাইব্রেরি
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          প্রখ্যাত ক্বারীদের কণ্ঠের বিশুদ্ধ রুকইয়াহ তিলাওয়াত। অযু অবস্থায় একা বসে মনোযোগ দিয়ে শুনুন।
        </p>
      </div>

      {/* Instructions Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ১
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">হেডফোন ব্যবহার করুন:</strong>
            মনোযোগ ধরে রাখতে এবং চারপাশের কোলাহল এড়িয়ে স্পষ্ট শুনতে হেডফোন পড়া উত্তম।
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ২
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">শারীরিক প্রতিক্রিয়া লক্ষ্য রাখুন:</strong>
            চোখ দিয়ে পানি পড়া, গা ভারী লাগা, হাই তোলা বা বমি ভাব হলে লক্ষণ পরীক্ষায় নোট রাখুন।
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ৩
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">ভয় পাবেন না:</strong>
            কুরআনের আয়াত শয়তান ও জিনের জন্য দাহ্যকারী। মনে সাহস রাখুন ও আল্লাহর ওপর ভরসা রাখুন।
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
}
