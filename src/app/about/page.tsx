import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartPulse, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে ও শারঈ নীতিমালা | সুন্নাহলাইফ",
  description: "সুন্নাহলাইফের লক্ষ্য, ভিশন, শারঈ মূলনীতি এবং চিকিৎসা বিজ্ঞান বিষয়ক সুস্পষ্ট নীতিমালা।",
};

export default function AboutPage() {
  const principles = [
    {
      title: "কুরআন ও সহীহ সুন্নাহর ভিত্তি",
      desc: "আমাদের প্ল্যাটফর্মের প্রতিটি দোয়া, আমল ও নির্দেশনা বিশুদ্ধ কুরআন ও রাসুলুল্লাহ (ﷺ)-এর সহীহ হাদিস এবং বিজ্ঞ সালাফগণের নির্দেশিত মানদণ্ডে রচিত।",
    },
    {
      title: "শিরক ও কুসংস্কারমুক্ত",
      desc: "তাবীজ-কবচ, গণনা, মায়ের নাম জিজ্ঞেস করা, অজ্ঞাত ভাষায় মন্ত্র পড়া এবং তথাকথিত কবিরাজি থেকে আমরা সম্পূর্ণ মুক্ত ও এর বিরুদ্ধে সচেতনতা তৈরিতে অঙ্গীকারবদ্ধ।",
    },
    {
      title: "শতভাগ আরোগ্যের মিথ্যা দাবি বর্জন",
      desc: "আমরা কখনো '১০০% সুস্থতার গ্যারান্টি' দেই না। আরোগ্য ও শেফার একমাত্র মালিক আল্লাহ সুবহানাহু ওয়া তাআলা। মানুষের কাজ কেবল শরিয়ত সম্মত চেষ্টা করা।",
    },
    {
      title: "চিকিৎসা বিজ্ঞানের গুরুত্ব ও সমন্বয়",
      desc: "রুকইয়াহ আধুনিক চিকিৎসা বা মানসিক স্বাস্থ্যের বিকল্প নয়। সব রোগ জিন বা জাদুর কারণে হয় না। শারীরিক উপসর্গ দেখা দিলে রেজিস্টার্ড এমবিবিএস ডাক্তারের চিকিৎসা গ্রহণ করা সুন্নাহরই অংশ।",
    },
    {
      title: "রোগীর গোপনীয়তা ও আমানত",
      desc: "ব্যবহারকারীদের ব্যক্তিগত তথ্য, লক্ষণ ও আলোচনা সর্বোচ্চ গোপনীয়তার সাথে সংরক্ষণ করা হয়। কোনো প্রকার বাণিজ্যিক বা অনৈতিক উদ্দেশ্যে তা প্রকাশ করা সম্পূর্ণ নিষিদ্ধ।",
    },
  ];

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Brand Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="relative w-56 sm:w-64 h-20 sm:h-24 mx-auto">
          <Image
            src="/sunnahlife_logo.svg"
            alt="সুন্নাহলাইফ"
            fill
            sizes="256px"
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          পরিচিতি ও মূল দর্শন
        </h1>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          <strong className="text-[#006B5B]">সুন্নাহলাইফ (Sunnah Life Care)</strong> বাংলাদেশের মুসলিমদের জন্য কুরআন ও সহীহ সুন্নাহভিত্তিক রুকইয়াহ শারইয়্যাহ, আত্মরক্ষা, সেলফ-রুকইয়াহ শিক্ষা ও নির্ভরযোগ্য শারঈ দিকনির্দেশনার একটি অলাভজনক ও সচেতনতামূলক ডিজিটাল প্ল্যাটফর্ম।
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#004D40] text-center mb-6">
          আমাদের মূল নীতিমালা ও বিশ্বাস
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#006B5B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-gray-900">{pr.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-8">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Safety Disclaimer Callout */}
      <div className="p-6 md:p-8 rounded-3xl bg-emerald-50/70 border-2 border-emerald-600 space-y-3">
        <div className="flex items-center gap-2.5 text-[#006B5B] font-bold text-base md:text-lg">
          <HeartPulse className="w-6 h-6 text-emerald-700" />
          <span>চিকিৎসা ও মানসিক স্বাস্থ্য সংক্রান্ত সুস্পষ্ট অবস্থান</span>
        </div>
        <p className="text-xs md:text-sm text-emerald-950 leading-relaxed">
          আমরা অত্যন্ত দৃঢ়ভাবে বিশ্বাস করি যে, আল্লাহ তাআলা কুরআনের যেমন আরোগ্য ক্ষমতা রেখেছেন, তেমনি চিকিৎসা বিজ্ঞানের মাধ্যমেও ওষুধ ও গবেষণার তৌফিক দিয়েছেন। মাথাব্যথা, গ্যাস্ট্রিক, হৃদরোগ বা মানসিক বিষণ্নতার মতো সমস্যা দেখা দিলে দ্রুত অভিজ্ঞ চিকিৎসকের কাছে গিয়ে চেকআপ করানো উচিত। রুকইয়াহ শারীরিক চিকিৎসার বিকল্প নয়, বরং আধ্যাত্মিক বরকত ও আরোগ্যের সহায়ক মাধ্যম।
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#006B5B] text-white font-bold text-sm hover:bg-[#004D40] shadow-md shadow-[#006B5B]/20 transition-all"
        >
          <span>আপনার লক্ষণ যাচাই করুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
