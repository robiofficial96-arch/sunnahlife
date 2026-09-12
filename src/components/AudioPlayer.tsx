"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RUQYAH_AUDIO_LIST, RuqyahAudioItem } from "@/data/ruqyahAudio";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Headphones, 
  RotateCcw, 
  RotateCw,
  Clock,
  Sparkles,
  BookOpen,
  Loader2,
  CheckCircle2,
  Share2,
  Download
} from "lucide-react";

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<RuqyahAudioItem>(RUQYAH_AUDIO_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      } else {
        audioRef.current.pause();
        setIsLoading(false);
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (track: RuqyahAudioItem) => {
    if (currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration || 99999);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 0.85];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const categories = [
    { id: "all", label: "সকল অডিও" },
    { id: "general", label: "সাধারণ আরোগ্য ও শেফা" },
    { id: "sihr", label: "সিহর ও জাদু বিনষ্ট" },
    { id: "evil_eye", label: "বদনজর ও হিংসা" },
    { id: "jinn", label: "জ্বিন তাড়ানো ও স্পর্শ" },
    { id: "sleep", label: "অনিদ্রা ও দুঃস্বপ্ন" },
  ];

  const filteredTracks = selectedCategory === "all"
    ? RUQYAH_AUDIO_LIST
    : RUQYAH_AUDIO_LIST.filter(t => t.category === selectedCategory);

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Main Active Player Bar */}
      <div className="bg-radial from-[#006B5B] to-[#004D40] text-white rounded-2xl p-5 md:p-7 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#F2C94C] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              এখন বাজছে (Now Playing) • {currentTrack.categoryLabel}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{currentTrack.title}</h3>
            <p className="text-xs md:text-sm text-emerald-100">{currentTrack.reciter}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-center md:self-auto">
            {/* Rewind 10s */}
            <button
              onClick={() => skipTime(-10)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="১০ সেকেন্ড পেছনে"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#D4A017] text-white flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#004D40] transition-transform active:scale-95 shadow-lg cursor-pointer shrink-0"
              title={isPlaying ? "বিরতি" : "প্লে করুন"}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => skipTime(10)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="১০ সেকেন্ড সামনে"
            >
              <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Speed Toggle */}
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer ml-1"
              title="গতি পরিবর্তন"
            >
              {playbackSpeed}x
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              title={isMuted ? "শব্দ চালু" : "শব্দ বন্ধ"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
          />
          <div className="flex justify-between text-[11px] text-emerald-100 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : currentTrack.duration}</span>
          </div>
        </div>

        {/* Instructions & Quran Link Banner */}
        <div className="mt-4 pt-3.5 border-t border-white/15 text-xs text-emerald-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <Headphones className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
            <span><strong>পদ্ধতি:</strong> {currentTrack.instructions}</span>
          </div>

          <Link
            href="/quran"
            className="self-start sm:self-center px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium flex items-center gap-1.5 transition-colors shrink-0 text-[11px]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>১১৪টি পূর্ণাঙ্গ সূরা তিলাওয়াত শুনুন</span>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-[#FAFAF7] text-gray-600 hover:bg-gray-100 hover:text-[#006B5B]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Playlist Section */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base md:text-lg font-bold text-[#004D40] flex items-center gap-2">
          <Headphones className="w-5 h-5 text-[#006B5B]" />
          <span>রুকইয়াহ অডিও তালিকা ({filteredTracks.length}টি)</span>
        </h4>
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          ১০০% অরিজিনাল সাউন্ডট্র্যাক • হাই কোয়ালিটি MP3
        </span>
      </div>

      <div className="space-y-3">
        {filteredTracks.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isCurrent
                  ? "bg-[#006B5B]/5 border-[#006B5B] shadow-xs ring-1 ring-[#006B5B]/20"
                  : "bg-white border-gray-200 hover:border-[#006B5B]/30 hover:bg-[#FAFAF7]"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent && isPlaying
                      ? "bg-[#006B5B] text-white shadow-xs animate-pulse"
                      : isCurrent
                      ? "bg-[#006B5B] text-white"
                      : "bg-[#FAFAF7] text-[#006B5B] border border-[#006B5B]/15"
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h5 className={`text-sm md:text-base font-semibold truncate ${isCurrent ? "text-[#004D40]" : "text-gray-800"}`}>
                      {track.title}
                    </h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-[#006B5B] font-medium shrink-0 hidden md:inline">
                      {track.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{track.reciter} • {track.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{track.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
