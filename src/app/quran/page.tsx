"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { QURAN_SURAHS, QuranSurahMeta } from "@/data/quranSurahs";
import { 
  Search, 
  BookOpen, 
  Play, 
  Pause, 
  Headphones, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Compass,
  CheckCircle2,
  X,
  ExternalLink
} from "lucide-react";

export default function QuranPortalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "ruqyah" | "makki" | "madani">("all");
  
  // Audio state for in-page playing
  const [activeSurah, setActiveSurah] = useState<QuranSurahMeta | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSurah]);

  const handlePlaySurah = (surah: QuranSurahMeta, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeSurah?.number === surah.number) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSurah(surah);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredSurahs = useMemo(() => {
    return QURAN_SURAHS.filter((surah) => {
      // Filter logic
      if (selectedFilter === "ruqyah" && !surah.isRuqyahSpecial) return false;
      if (selectedFilter === "makki" && surah.revelationType !== "মাক্কী") return false;
      if (selectedFilter === "madani" && surah.revelationType !== "মাদানী") return false;

      // Search query logic
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const numStr = String(surah.number);
      return (
        numStr === q ||
        surah.nameBangla.toLowerCase().includes(q) ||
        surah.nameEnglish.toLowerCase().includes(q) ||
        surah.nameArabic.includes(q) ||
        surah.meaningBangla.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedFilter]);

  const ruqyahCount = QURAN_SURAHS.filter(s => s.isRuqyahSpecial).length;

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
      {/* Hidden Global Audio Element */}
      {activeSurah && (
        <audio
          ref={audioRef}
          src={activeSurah.audioUrl}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>পবিত্র মহাগ্রন্থ আল-কুরআন</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004D40] tracking-tight">
          আল-কুরআনুল কারীম
        </h1>
        
        <p className="font-arabic text-xl md:text-2xl text-emerald-800 tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          ১১৪টি পূর্ণাঙ্গ সূরা, সহীহ বাংলা অর্থ, রুকইয়াহ ও শেফার ফযীলত এবং শায়খ মিশারি রশিদ আল-আফাসির প্রাঞ্জল অডিও তিলাওয়াত।
        </p>

        {/* Quick Stats Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-gray-600 pt-2">
          <span className="px-3 py-1 rounded-full bg-[#FAFAF7] border border-[#006B5B]/15 text-[#006B5B] font-semibold">
            ১১৪টি সূরা
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FAFAF7] border border-[#006B5B]/15">
            ৬,২৩৬টি আয়াত
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FAFAF7] border border-[#006B5B]/15">
            ৮৬টি মাক্কী • ২৮টি মাদানী
          </span>
          <span className="px-3 py-1 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/30 text-amber-900 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4A017]" />
            {ruqyahCount}টি আরোগ্য ও রুকইয়াহ সূরা
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#006B5B]/15 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সূরার নাম (বাংলা/ইংরেজি/আরবি) বা নম্বর খুঁজুন..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B5B]/20 focus:border-[#006B5B] text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              সকল সূরা ({QURAN_SURAHS.length})
            </button>
            <button
              onClick={() => setSelectedFilter("ruqyah")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === "ruqyah"
                  ? "bg-[#D4A017] text-white shadow-xs"
                  : "bg-amber-50 text-amber-900 hover:bg-amber-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              রুকইয়াহ ও আরোগ্য ({ruqyahCount})
            </button>
            <button
              onClick={() => setSelectedFilter("makki")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === "makki"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              মাক্কী সূরা (৮৬)
            </button>
            <button
              onClick={() => setSelectedFilter("madani")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === "madani"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              মাদানী সূরা (২৮)
            </button>
          </div>
        </div>

        {/* Results summary note if searching */}
        {searchQuery && (
          <div className="text-xs text-gray-500 pt-1">
            "{searchQuery}" দিয়ে <strong>{filteredSurahs.length}টি</strong> সূরা পাওয়া গেছে।
          </div>
        )}
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredSurahs.map((surah) => {
          const isCurrentActive = activeSurah?.number === surah.number;
          return (
            <div
              key={surah.number}
              className={`relative bg-white rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between group ${
                isCurrentActive
                  ? "border-[#006B5B] shadow-md ring-2 ring-[#006B5B]/15 bg-emerald-50/20"
                  : "border-[#006B5B]/15 hover:border-[#006B5B]/40 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <div>
                {/* Top Row: Number & Arabic Name */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isCurrentActive
                          ? "bg-[#006B5B] text-white"
                          : "bg-[#006B5B]/10 text-[#006B5B] group-hover:bg-[#006B5B] group-hover:text-white"
                      }`}
                    >
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#004D40] group-hover:text-[#006B5B] transition-colors">
                        {surah.nameBangla}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-mono">
                        {surah.nameEnglish}
                      </p>
                    </div>
                  </div>

                  <span className="font-arabic text-xl text-emerald-950 font-semibold tracking-wide text-right">
                    {surah.nameArabic}
                  </span>
                </div>

                {/* Meaning & Metadata */}
                <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                  অর্থ: <span className="text-gray-800 font-medium">{surah.meaningBangla}</span>
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                    {surah.revelationType}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                    {surah.ayahCount} আয়াত
                  </span>
                  {surah.isRuqyahSpecial && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4A017]/15 text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#D4A017]" />
                      রুকইয়াহ
                    </span>
                  )}
                </div>

                {/* Ruqyah Significance note if applicable */}
                {surah.ruqyahBenefit && (
                  <div className="mb-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-950 leading-relaxed">
                    <span className="font-semibold text-[#006B5B]">ফযীলত: </span>
                    {surah.ruqyahBenefit}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={(e) => handlePlaySurah(surah, e)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCurrentActive && isPlaying
                      ? "bg-[#D4A017] text-white shadow-xs"
                      : isCurrentActive
                      ? "bg-[#006B5B] text-white"
                      : "bg-[#006B5B]/10 text-[#006B5B] hover:bg-[#006B5B] hover:text-white"
                  }`}
                  title="অডিও শুনুন"
                >
                  {isCurrentActive && isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>বিরতি</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>শুনুন</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/quran/${surah.number}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:text-[#006B5B] hover:bg-gray-50 flex items-center gap-1 transition-colors"
                >
                  <span>পড়ুন ও অর্থ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Audio Player Bar when a Surah is playing */}
      {activeSurah && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#004D40] text-white shadow-2xl border-t border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Surah Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4A017] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  {activeSurah.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold truncate">{activeSurah.nameBangla}</h4>
                    <span className="font-arabic text-sm text-[#F2C94C]">{activeSurah.nameArabic}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200">{activeSurah.reciter}</p>
                </div>
              </div>

              {/* Close mini player */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveSurah(null);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 sm:hidden"
              >
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            {/* Controls & Progress */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#D4A017] text-white flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#004D40] transition-colors shrink-0 shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const t = Number(e.target.value);
                    if (audioRef.current) {
                      audioRef.current.currentTime = t;
                      setCurrentTime(t);
                    }
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
                />
                <div className="flex justify-between text-[10px] text-emerald-200 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Read Surah Link & Mute */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title={isMuted ? "শব্দ চালু" : "শব্দ বন্ধ"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <Link
                href={`/quran/${activeSurah.number}`}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>সম্পূর্ণ সূরা পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveSurah(null);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
                title="প্লেয়ার বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
