import { Metadata } from "next";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import YouTubeRuqyahSection from "@/components/YouTubeRuqyahSection";
import { 
  Headphones, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  HeartHandshake, 
  Flame, 
  BookOpen, 
  ArrowRight 
} from "lucide-react";

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "রুকইয়াহ অডিও ও ভিডিও লাইব্রেরি | সুন্নাহলাইফ কেয়ার",
  description: "শাইখ মাহমুদ হুসাইনীর অফিসিয়াল ইউটিউব রুকইয়াহ ভিডিও এবং ৮টি শক্তিশালী কুরআনী রুকইয়াহ অডিও শুনুন।",
};

export default function AudioPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>কুরআন তিলাওয়াত, রুকইয়াহ অডিও ও ভিডিও</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ শারইয়্যাহ মাল্টিমিডিয়া লাইব্রেরি
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          আইন ও হাসাদ (বদনজর), খাওয়ানো জাদু ও সিহর ধ্বংসের শাইখ মাহমুদ হুসাইনীর প্রামাণ্য ভিডিও এবং প্রখ্যাত ক্বারীদের বিশুদ্ধ তিলাওয়াত।
        </p>

        {/* Quick Nav Anchors */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="#youtube-ruqyah"
            className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-red-200/60"
          >
            <YoutubeIcon className="w-4 h-4 text-red-600 fill-red-600" />
            <span>অফিসিয়াল ইউটিউব ভিডিও রুকইয়াহ</span>
          </a>
          <a
            href="#audio-player"
            className="px-4 py-2 rounded-xl bg-[#006B5B]/10 text-[#006B5B] hover:bg-[#006B5B]/20 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-[#006B5B]/20"
          >
            <Headphones className="w-3.5 h-3.5 text-[#006B5B]" />
            <span>ওয়েব রুকইয়াহ অডিও প্লেয়ার</span>
          </a>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ১
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">হেডফোন ব্যবহার করুন:</strong>
            মনোযোগ ধরে রাখতে এবং চারপাশের কোলাহল এড়িয়ে স্পষ্ট শুনতে হেডফোন বা এয়ারবাডস ব্যবহার করা উত্তম।
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ২
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">শারীরিক প্রতিক্রিয়া লক্ষ্য রাখুন:</strong>
            চোখ দিয়ে পানি পড়া, গা ভারী লাগা, অস্বাভাবিক হাই বা বমি ভাব হলে তা জাদুর প্রতিক্রিয়া; ভয় না পেয়ে পূর্ণ তিলাওয়াত শুনুন।
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 text-xs font-bold">
            ৩
          </div>
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">আল্লাহর ওপর পূর্ণ ভরসা রাখুন:</strong>
            কুরআনের প্রতিটি আয়াত শিফা ও শয়তানের জন্য দাহ্যকারী। কোনো মাধ্যম নয়, শিফা দানকারী একমাত্র আল্লাহ সুবহানাহু ওয়া তা'আলা।
          </div>
        </div>
      </div>

      {/* Section 1: Official YouTube Ruqyah Section */}
      <section id="youtube-ruqyah" className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <YoutubeIcon className="w-3.5 h-3.5 fill-red-600" />
              SunnahLife Care Official YouTube
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#004D40]">
              ইউটিউব ভিডিও রুকইয়াহ ও প্রামাণ্য আমল
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@SunnahLifeCarebd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>সকল ভিডিও দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <YouTubeRuqyahSection />
      </section>

      {/* Section 2: In-browser Web Audio Player */}
      <section id="audio-player" className="space-y-4 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-[#006B5B] uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
              In-Browser Audio Player
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#004D40]">
              অনলাইন রুকইয়াহ অডিও লাইব্রেরি
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            নির্বাচিত ৮টি শক্তিশালী অডিও • ফ্রি আনলিমিটেড স্ট্রিমিং
          </span>
        </div>

        <AudioPlayer />
      </section>

      {/* Section 3: Diagnostic & Authentic Guidelines Cards */}
      <div className="pt-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-[#004D40]">
            গুরুত্বপূর্ণ রুকইয়াহ গাইডলাইন ও করণীয়
          </h3>
          <p className="text-xs md:text-sm text-gray-600">
            আইন-হাসাদ, খাওয়ানো জাদু এবং জাদু নবায়ন রোধে সহীহ সুন্নাহ নির্দেশিত মূল দিকনির্দেশনা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Evil Eye */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-[#006B5B]/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">আইন ও হাসাদ (বদনজর)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              রাসূলুল্লাহ (ﷺ) বলেছেন: বদনজর সত্য (বুখারী ৫৭৪০)। অতিরিক্ত হাই ওঠা, অহেতুক ক্লান্তি, গা শিরশির করা ও হঠাৎ কাজে অনীহা দেখা দিলে প্রতিদিন সুরক্ষামূলক সূরা ফালাক্ব ও নাস পাঠ করুন।
            </p>
            <Link
              href="/articles/eaten-magic-sihr-makul-symptoms-cure"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006B5B] hover:underline pt-2"
            >
              <span>বিস্তারিত লক্ষণ ও আমল পড়ুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Eaten Magic */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-[#006B5B]/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">খাওয়ানো জাদু (পেটের সিহর)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              পেটের দীর্ঘস্থায়ী তীব্র গ্যাস, বমি ভাব ও নাভির আশেপাশে ভারী গিঁট অনুভূত হলে রুকইয়াহ করা পানির সাথে সানা মাক্কি চা (ইবনে মাজাহ ৩৪৫৭) ও মধু সহযোগে পেট ডিটক্স করুন।
            </p>
            <Link
              href="/articles/eaten-magic-sihr-makul-symptoms-cure"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006B5B] hover:underline pt-2"
            >
              <span>সানা মাক্কি ডিটক্স পদ্ধতি</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Sihr Renewal & House */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-[#006B5B]/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#006B5B] flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">জাদু নবায়ন রোধ ও ঘর বন্ধ</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              পেরেক পোঁতা বা কুফরি তাবিজে ঘর বন্ধের কুসংস্কার বর্জন করুন। অযু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও রুকইয়াহ পানি ঘরের ৪ কোণায় ছিটিয়ে ঘর শয়তানমুক্ত রাখুন।
            </p>
            <Link
              href="/articles/house-protection-shariah-bari-bondho"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006B5B] hover:underline pt-2"
            >
              <span>শরীয়াহসম্মত ঘর সুরক্ষার আমল</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
