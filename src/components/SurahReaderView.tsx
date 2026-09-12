"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { QuranSurahMeta } from "@/data/quranSurahs";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Copy, 
  CheckCheck, 
  Share2, 
  Sparkles, 
  RotateCcw, 
  RotateCw, 
  Loader2, 
  Type, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Headphones
} from "lucide-react";

interface AyahData {
  number: number;
  numberInSurah: number;
  textArabic: string;
  textBangla: string;
  audioUrl: string;
}

interface Props {
  surah: QuranSurahMeta;
  prevSurah: QuranSurahMeta | null;
  nextSurah: QuranSurahMeta | null;
}

export default function SurahReaderView({ surah, prevSurah, nextSurah }: Props) {
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Full Surah Audio Player State
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [isAudioBuffering, setIsAudioBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Single Ayah Audio Player State
  const [activeAyahAudio, setActiveAyahAudio] = useState<number | null>(null);
  const ayahAudioRef = useRef<HTMLAudioElement | null>(null);

  // Display Settings
  const [fontSize, setFontSize] = useState<"md" | "lg" | "xl">("lg");
  const [showTranslation, setShowTranslation] = useState(true);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);

  // Load Ayahs from cache or API
  useEffect(() => {
    let isMounted = true;
    const cacheKey = `sunnahlife_surah_${surah.number}`;

    const loadData = async () => {
      setIsLoadingAyahs(true);
      setError(null);

      // Check localStorage first
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAyahs(parsed);
            setIsLoadingAyahs(false);
            return;
          }
        }
      } catch {
        // Ignore cache parse error
      }

      // Fetch from AlQuran Cloud API
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/editions/quran-uthmani,bn.bengali`);
        if (!res.ok) throw new Error("নেটওয়ার্ক সংযোগ ত্রুটি");
        const json = await res.json();
        if (json.code === 200 && json.data && json.data.length >= 2) {
          const arabicData = json.data[0].ayahs;
          const banglaData = json.data[1].ayahs;

          const combined: AyahData[] = arabicData.map((a: any, idx: number) => ({
            number: a.number,
            numberInSurah: a.numberInSurah,
            textArabic: a.text,
            textBangla: banglaData[idx]?.text || "",
            audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`
          }));

          if (isMounted) {
            setAyahs(combined);
            setIsLoadingAyahs(false);
            try {
              localStorage.setItem(cacheKey, JSON.stringify(combined));
            } catch {
              // quota exceeded or disabled
            }
          }
        } else {
          throw new Error("আয়াত লোড করা সম্ভব হয়নি");
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "কুরআনের আয়াত লোড হতে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন।");
          setIsLoadingAyahs(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [surah.number]);

  // Handle Full Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingFull) {
        setIsAudioBuffering(true);
        audioRef.current.play()
          .then(() => setIsAudioBuffering(false))
          .catch(() => {
            setIsPlayingFull(false);
            setIsAudioBuffering(false);
          });
      } else {
        audioRef.current.pause();
        setIsAudioBuffering(false);
      }
    }
  }, [isPlayingFull]);

  const togglePlayFull = () => {
    if (activeAyahAudio) {
      if (ayahAudioRef.current) ayahAudioRef.current.pause();
      setActiveAyahAudio(null);
    }
    setIsPlayingFull(!isPlayingFull);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipFull = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration || 99999);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Play single ayah audio
  const handlePlayAyah = (ayah: AyahData) => {
    if (isPlayingFull) {
      setIsPlayingFull(false);
    }

    if (activeAyahAudio === ayah.numberInSurah) {
      if (ayahAudioRef.current) {
        ayahAudioRef.current.pause();
      }
      setActiveAyahAudio(null);
    } else {
      setActiveAyahAudio(ayah.numberInSurah);
      if (ayahAudioRef.current) {
        ayahAudioRef.current.src = ayah.audioUrl;
        ayahAudioRef.current.play().catch(() => setActiveAyahAudio(null));
      }
    }
  };

  const copyAyah = (ayah: AyahData) => {
    const text = `সূরা ${surah.nameBangla} [${ayah.numberInSurah}]\n\n${ayah.textArabic}\n\nঅর্থ: ${ayah.textBangla}\n\n(সূত্র: সুন্নাহলাইফ - sunnahlife.com/quran/${surah.number})`;
    navigator.clipboard.writeText(text);
    setCopiedAyahNum(ayah.numberInSurah);
    setTimeout(() => setCopiedAyahNum(null), 2500);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const arabicSizeClass = 
    fontSize === "xl" ? "text-2xl sm:text-3xl md:text-4xl leading-loose" :
    fontSize === "lg" ? "text-xl sm:text-2xl md:text-3xl leading-loose" :
    "text-lg sm:text-xl md:text-2xl leading-loose";

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Hidden Full Surah Audio */}
      <audio
        ref={audioRef}
        src={surah.audioUrl}
        preload="metadata"
        onWaiting={() => setIsAudioBuffering(true)}
        onPlaying={() => setIsAudioBuffering(false)}
        onCanPlay={() => setIsAudioBuffering(false)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={() => setIsPlayingFull(false)}
      />

      {/* Hidden Ayah Single Audio */}
      <audio
        ref={ayahAudioRef}
        onEnded={() => setActiveAyahAudio(null)}
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/quran"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#006B5B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>সকল সূরায় ফিরে যান</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevSurah && (
            <Link
              href={`/quran/${prevSurah.number}`}
              className="p-2 rounded-xl bg-white border border-gray-200 hover:border-[#006B5B] text-gray-600 hover:text-[#006B5B] text-xs font-medium flex items-center gap-1 transition-colors"
              title={`পূর্ববর্তী: ${prevSurah.nameBangla}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevSurah.nameBangla}</span>
            </Link>
          )}

          {nextSurah && (
            <Link
              href={`/quran/${nextSurah.number}`}
              className="p-2 rounded-xl bg-white border border-gray-200 hover:border-[#006B5B] text-gray-600 hover:text-[#006B5B] text-xs font-medium flex items-center gap-1 transition-colors"
              title={`পরবর্তী: ${nextSurah.nameBangla}`}
            >
              <span className="hidden sm:inline">{nextSurah.nameBangla}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Surah Header Card */}
      <div className="bg-radial from-[#006B5B] to-[#004D40] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold">
          <span>সূরা নম্বর: {surah.number}</span>
          <span>•</span>
          <span>{surah.revelationType}</span>
          <span>•</span>
          <span>{surah.ayahCount} আয়াত</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {surah.nameBangla}
        </h1>

        <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#F2C94C] font-semibold tracking-wide py-1">
          {surah.nameArabic}
        </p>

        <p className="text-sm md:text-base text-emerald-100">
          নামের অর্থ: <span className="font-semibold text-white">{surah.meaningBangla}</span> ({surah.nameEnglish})
        </p>

        {surah.ruqyahBenefit && (
          <div className="mt-3 p-3 rounded-2xl bg-white/15 border border-white/20 text-xs md:text-sm text-emerald-50 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F2C94C] shrink-0" />
            <span><strong>ফযীলত ও আরোগ্য:</strong> {surah.ruqyahBenefit}</span>
          </div>
        )}

        {/* Bismillah Banner (Omitted for Surah 9 At-Tawbah) */}
        {surah.number !== 9 && (
          <div className="pt-4 border-t border-white/15">
            <p className="font-arabic text-xl sm:text-2xl text-emerald-50 font-medium">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-xs text-emerald-200 mt-1">
              পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি
            </p>
          </div>
        )}
      </div>

      {/* Audio Player & Reader Settings Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#006B5B]/15 shadow-xs space-y-4">
        {/* Full Surah Audio Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={togglePlayFull}
              className="w-12 h-12 rounded-full bg-[#006B5B] text-white flex items-center justify-center hover:bg-[#004D40] transition-colors shrink-0 shadow-sm cursor-pointer"
              title={isPlayingFull ? "বিরতি" : "পূর্ণাঙ্গ সূরা অডিও শুনুন"}
            >
              {isAudioBuffering ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlayingFull ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#004D40]">পূর্ণাঙ্গ তিলাওয়াত</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#006B5B] font-semibold">
                  মিশারি রশিদ
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-1/2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006B5B]"
            />

            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-2 rounded-xl text-gray-500 hover:text-[#006B5B] hover:bg-gray-50 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Reader Customizer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <Type className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold">আরবি ফন্ট:</span>
            <div className="inline-flex rounded-xl bg-gray-100 p-0.5">
              <button
                onClick={() => setFontSize("md")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${fontSize === "md" ? "bg-white text-[#006B5B] shadow-2xs font-bold" : "text-gray-600"}`}
              >
                স্বাভাবিক
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${fontSize === "lg" ? "bg-white text-[#006B5B] shadow-2xs font-bold" : "text-gray-600"}`}
              >
                বড়
              </button>
              <button
                onClick={() => setFontSize("xl")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${fontSize === "xl" ? "bg-white text-[#006B5B] shadow-2xs font-bold" : "text-gray-600"}`}
              >
                বিশাল
              </button>
            </div>
          </div>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#006B5B] text-gray-700 hover:text-[#006B5B] font-medium transition-colors"
          >
            {showTranslation ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
            <span>বাংলা অনুবাদ: {showTranslation ? "দৃশ্যমান" : "লুকানো"}</span>
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoadingAyahs && (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#006B5B] animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-medium">পবিত্র কুরআনের আয়াতসমূহ লোড হচ্ছে...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
          <p className="text-sm text-rose-700 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Ayahs List */}
      {!isLoadingAyahs && !error && (
        <div className="space-y-6">
          {ayahs.map((ayah) => {
            const isPlayingThisAyah = activeAyahAudio === ayah.numberInSurah;
            return (
              <div
                key={ayah.number}
                id={`ayah-${ayah.numberInSurah}`}
                className={`p-6 sm:p-8 rounded-3xl bg-white border transition-all ${
                  isPlayingThisAyah
                    ? "border-[#006B5B] shadow-md ring-2 ring-[#006B5B]/15 bg-emerald-50/15"
                    : "border-[#006B5B]/15 hover:border-[#006B5B]/35 shadow-xs"
                }`}
              >
                {/* Ayah Top Meta */}
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center text-xs font-bold font-mono">
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      আয়াত {ayah.numberInSurah} / {surah.ayahCount}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Play Ayah Audio */}
                    <button
                      onClick={() => handlePlayAyah(ayah)}
                      className={`p-2 rounded-xl transition-colors ${
                        isPlayingThisAyah
                          ? "bg-[#006B5B] text-white shadow-xs"
                          : "text-gray-500 hover:text-[#006B5B] hover:bg-gray-100"
                      }`}
                      title={isPlayingThisAyah ? "আয়াত তিলাওয়াত বন্ধ" : "আয়াত তিলাওয়াত শুনুন"}
                    >
                      {isPlayingThisAyah ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    {/* Copy Ayah */}
                    <button
                      onClick={() => copyAyah(ayah)}
                      className="p-2 rounded-xl text-gray-500 hover:text-[#006B5B] hover:bg-gray-100 transition-colors"
                      title="আয়াত ও অর্থ কপি করুন"
                    >
                      {copiedAyahNum === ayah.numberInSurah ? (
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Share WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`সূরা ${surah.nameBangla} [${ayah.numberInSurah}]:\n${ayah.textArabic}\n\nঅর্থ: ${ayah.textBangla}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-gray-500 hover:text-emerald-600 hover:bg-gray-100 transition-colors"
                      title="WhatsApp-এ শেয়ার করুন"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="bg-[#FAFAF7] p-5 sm:p-7 rounded-2xl border border-[#006B5B]/10 mb-4">
                  <p className={`font-arabic text-emerald-950 text-right font-medium tracking-wide ${arabicSizeClass}`}>
                    {ayah.textArabic}
                  </p>
                </div>

                {/* Bangla Translation */}
                {showTranslation && (
                  <div className="pt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <p>
                      <strong className="text-gray-900 font-semibold mr-1.5">অনুবাদ:</strong>
                      {ayah.textBangla}
                    </p>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      — মাওলানা মুহিউদ্দীন খান (অনুবাদ)
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Navigation to Next/Prev Surah */}
      <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevSurah ? (
          <Link
            href={`/quran/${prevSurah.number}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-[#006B5B]/20 hover:border-[#006B5B] text-gray-700 hover:text-[#006B5B] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>পূর্ববর্তী: {prevSurah.nameBangla} ({prevSurah.number})</span>
          </Link>
        ) : <div />}

        <Link
          href="/quran"
          className="px-5 py-3 rounded-2xl bg-[#006B5B] text-white hover:bg-[#004D40] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <BookOpen className="w-4 h-4" />
          <span>১১৪টি সূরার সূচিপত্র</span>
        </Link>

        {nextSurah ? (
          <Link
            href={`/quran/${nextSurah.number}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-[#006B5B]/20 hover:border-[#006B5B] text-gray-700 hover:text-[#006B5B] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <span>পরবর্তী: {nextSurah.nameBangla} ({nextSurah.number})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
