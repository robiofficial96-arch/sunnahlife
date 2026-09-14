"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  SUNNAHLIFE_YOUTUBE_VIDEOS, 
  YouTubeRuqyahVideo 
} from "@/data/youtubeRuqyah";
import { 
  Play, 
  ExternalLink, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall,
  Flame,
  Layers,
  Video
} from "lucide-react";

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
    </svg>
  );
}

export default function YouTubeRuqyahSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalVideo, setActiveModalVideo] = useState<YouTubeRuqyahVideo | null>(null);

  const categories = [
    { id: "all", label: "সকল ভিডিও" },
    { id: "sihr_makul", label: "পেটের ও খাওয়ানো জাদু" },
    { id: "evil_eye", label: "আইন ও হাসাদ (বদনজর)" },
    { id: "sihr_renewal", label: "জাদু নবায়ন রোধ (তাজদীদ)" },
    { id: "home_protection", label: "ঘর সুরক্ষা ও পরিবার" },
    { id: "marriage", label: "বিয়ে ও পারিবারিক বাধা" },
  ];

  const filteredVideos = selectedCategory === "all"
    ? SUNNAHLIFE_YOUTUBE_VIDEOS
    : SUNNAHLIFE_YOUTUBE_VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Official Channel Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-[#991B1B] to-[#7F1D1D] text-white p-6 md:p-8 shadow-lg relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-20 -top-8 w-32 h-32 bg-red-400/20 rounded-full blur-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <YoutubeIcon className="w-4 h-4 text-white fill-white" />
              <span>SunnahLife Care Official YouTube</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              শাইখ মাহমুদ হুসাইনীর বিশুদ্ধ রুকইয়াহ ভিডিও
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              বদনজর, খাওয়ানো জাদু ও ঘর সুরক্ষার প্রামাণ্য ইসলামিক ভিডিও ও নির্দেশনা।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@SunnahLifeCarebd?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <YoutubeIcon className="w-4 h-4 fill-red-600 text-red-600" />
              <span>চ্যানেল সাবস্ক্রাইব করুন</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href="https://wa.me/8801676820060"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#F2C94C]" />
              <span>হটলাইন: 01676820060</span>
            </a>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#006B5B]/40 hover:text-[#006B5B]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group bg-white rounded-3xl border border-gray-200 hover:border-[#006B5B]/30 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setActiveModalVideo(video)}>
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 text-white text-[11px] font-medium backdrop-blur-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F2C94C]" />
                <span>{video.categoryLabel}</span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-[#006B5B]">{video.speaker}</span>
                  <span className="flex items-center gap-1 text-[11px] text-red-600 font-bold">
                    <YoutubeIcon className="w-3 h-3 fill-red-600" />
                    YouTube HD
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveModalVideo(video)}
                  className="text-base font-bold text-[#004D40] hover:text-[#006B5B] transition-colors line-clamp-2 cursor-pointer leading-snug"
                >
                  {video.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Key Points */}
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  {video.keyPoints.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                      <CheckCircle2 className="w-3 h-3 text-[#006B5B] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => setActiveModalVideo(video)}
                  className="flex-1 py-2 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>ভিডিও দেখুন</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-gray-200 hover:border-red-400 text-gray-600 hover:text-red-600 transition-colors"
                  title="YouTube অ্যাপে খুলুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Popup */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#004D40] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-400 fill-red-400" />
                <h4 className="text-sm md:text-base font-bold truncate max-w-md sm:max-w-xl">
                  {activeModalVideo.title}
                </h4>
              </div>

              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive YouTube Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo.id}?autoplay=1&rel=0`}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Modal Footer / Description */}
            <div className="p-5 overflow-y-auto space-y-3 bg-[#FAFAF7]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#006B5B] px-2.5 py-1 rounded-md bg-emerald-100">
                  {activeModalVideo.categoryLabel} • {activeModalVideo.speaker}
                </span>

                <a
                  href={`https://www.youtube.com/watch?v=${activeModalVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold hover:underline"
                >
                  <span>ইউটিউব অ্যাপে দেখুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                {activeModalVideo.description}
              </p>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                <h5 className="text-xs font-bold text-[#004D40] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>আমলের বিশেষ দিকনির্দেশনা:</span>
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  {activeModalVideo.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006B5B] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
