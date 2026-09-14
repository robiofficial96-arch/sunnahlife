import { Metadata } from "next";
import AudioPlayer from "@/components/AudioPlayer";
import YouTubeRuqyahSection from "@/components/YouTubeRuqyahSection";
import { Headphones, ArrowRight } from "lucide-react";
import { 
  AudioInstructionsAccordion, 
  AudioGuidelinesExpandable 
} from "@/components/AudioPageSections";

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
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>রুকইয়াহ অডিও ও ভিডিও</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ মাল্টিমিডিয়া লাইব্রেরি
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          শাইখ মাহমুদ হুসাইনীর প্রামাণ্য ভিডিও ও বিশুদ্ধ রুকইয়াহ তিলাওয়াত।
        </p>

        {/* Quick Nav Anchors */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
          <a
            href="#youtube-ruqyah"
            className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-red-200/60"
          >
            <YoutubeIcon className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>ইউটিউব ভিডিও</span>
          </a>
          <a
            href="#audio-player"
            className="px-3.5 py-1.5 rounded-xl bg-[#006B5B]/10 text-[#006B5B] hover:bg-[#006B5B]/20 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-[#006B5B]/20"
          >
            <Headphones className="w-3.5 h-3.5 text-[#006B5B]" />
            <span>অডিও প্লেয়ার</span>
          </a>
        </div>
      </div>

      {/* Expandable Instructions Accordion */}
      <AudioInstructionsAccordion />

      {/* Section 1: Official YouTube Ruqyah Section */}
      <section id="youtube-ruqyah" className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <YoutubeIcon className="w-3.5 h-3.5 fill-red-600" />
              SunnahLife Care Official YouTube
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#004D40]">
              ইউটিউব ভিডিও রুকইয়াহ ও প্রামাণ্য আমল
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@SunnahLifeCarebd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>সকল ভিডিও</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <YouTubeRuqyahSection />
      </section>

      {/* Section 2: In-browser Web Audio Player */}
      <section id="audio-player" className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[11px] font-bold text-[#006B5B] uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#D4A017]" />
              In-Browser Audio Player
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#004D40]">
              অনলাইন রুকইয়াহ অডিও লাইব্রেরি
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ৮টি নির্বাচিত অডিও • ফ্রি স্ট্রিমিং
          </span>
        </div>

        <AudioPlayer />
      </section>

      {/* Section 3: Diagnostic & Authentic Guidelines (Expandable Cards) */}
      <div className="pt-4 border-t border-gray-200">
        <AudioGuidelinesExpandable />
      </div>
    </div>
  );
}
