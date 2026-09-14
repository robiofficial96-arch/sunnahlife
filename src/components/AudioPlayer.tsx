"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Repeat,
  SkipForward,
  SkipBack,
  ExternalLink,
  ShieldCheck,
  Flame,
  Radio,
  Share2
} from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<RuqyahAudioItem>(RUQYAH_AUDIO_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(RUQYAH_AUDIO_LIST[0].durationSeconds);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedLink, setCopiedLink] = useState(false);
  const [showScreen, setShowScreen] = useState(true);

  const playerRef = useRef<any>(null);
  const isLoopingRef = useRef(isLooping);
  isLoopingRef.current = isLooping;

  // Initialize YouTube Iframe Player
  useEffect(() => {
    let checkInterval: any;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      const targetDiv = document.getElementById("youtube-audio-engine");
      if (!targetDiv) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }

      playerRef.current = new window.YT.Player("youtube-audio-engine", {
        height: "100%",
        width: "100%",
        videoId: currentTrack.youtubeId,
        playerVars: {
          playsinline: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setIsLoading(false);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
            if (event.data === 1) {
              setIsPlaying(true);
              setIsLoading(false);
            } else if (event.data === 2) {
              setIsPlaying(false);
              setIsLoading(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              setIsLoading(false);
              if (isLoopingRef.current) {
                event.target.seekTo(0);
                event.target.playVideo();
              } else {
                handleNextTrack();
              }
            } else if (event.data === 3) {
              setIsLoading(true);
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          createPlayer();
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // Poll current time when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || currentTrack.durationSeconds;
            setCurrentTime(cur);
            if (dur > 0) setDuration(dur);
          } catch (e) {}
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack]);

  // Load new track when track changes
  const handleSelectTrack = (track: RuqyahAudioItem) => {
    if (currentTrack.id === track.id) {
      togglePlay();
      return;
    }
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.durationSeconds);
    setIsLoading(true);

    if (playerRef.current && playerRef.current.loadVideoById) {
      try {
        playerRef.current.loadVideoById({
          videoId: track.youtubeId,
          startSeconds: 0,
        });
        setIsPlaying(true);
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        setIsLoading(true);
        playerRef.current.playVideo();
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = RUQYAH_AUDIO_LIST.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % RUQYAH_AUDIO_LIST.length;
    handleSelectTrack(RUQYAH_AUDIO_LIST[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = RUQYAH_AUDIO_LIST.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + RUQYAH_AUDIO_LIST.length) % RUQYAH_AUDIO_LIST.length;
    handleSelectTrack(RUQYAH_AUDIO_LIST[prevIndex]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (playerRef.current && playerRef.current.seekTo) {
      try {
        playerRef.current.seekTo(time, true);
      } catch (e) {}
    }
  };

  const skipTime = (seconds: number) => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      try {
        const cur = playerRef.current.getCurrentTime() || currentTime;
        const newTime = Math.min(Math.max(cur + seconds, 0), duration || currentTrack.durationSeconds);
        setCurrentTime(newTime);
        playerRef.current.seekTo(newTime, true);
      } catch (e) {}
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 0.85];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      try {
        playerRef.current.setPlaybackRate(nextSpeed);
      } catch (e) {}
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {}
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const categories = [
    { id: "all", label: "সকল শক্তিশালী রুকইয়াহ (৪টি)" },
    { id: "sihr_eaten", label: "খাওয়ানো জাদু ও পেটের সিহর" },
    { id: "sihr_renewal", label: "জাদু নবায়ন রোধ ও শয়তান ধ্বংস" },
    { id: "jinn_burn", label: "শয়তানকে জ্বালানো" },
    { id: "evil_eye", label: "বদনজর ও তীব্র হাসাদ" },
  ];

  const filteredTracks = selectedCategory === "all"
    ? RUQYAH_AUDIO_LIST
    : RUQYAH_AUDIO_LIST.filter(t => t.category === selectedCategory);

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-4 sm:p-6 md:p-8 space-y-6">
      {/* Main Islamic Audio Console */}
      <div className="bg-gradient-to-br from-[#004D40] via-[#005B4D] to-[#00382E] text-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl relative overflow-hidden border border-white/10">
        {/* Glow ambient background circles */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-[#D4A017]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header info */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017]/20 text-[#F2C94C] text-xs font-semibold border border-[#D4A017]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentTrack.categoryLabel}</span>
            </span>

            {isPlaying && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                অডিও চলছে...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowScreen(!showScreen)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors cursor-pointer text-[11px] font-medium"
            >
              {showScreen ? "স্ক্রিন সংক্ষেপ করুন" : "ভিডিও স্ক্রিন দেখুন"}
            </button>

            <a
              href={currentTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
              title="ইউটিউবে খুলুন"
            >
              <ExternalLink className="w-3 h-3" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        {/* Console Middle: Album Art & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* Left Thumbnail/Cover */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-[280px] sm:max-w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/15 group bg-black/40">
              <img
                src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/hqdefault.jpg`}
                alt={currentTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wide">
                  শাইখের বিশুদ্ধ তিলাওয়াত
                </span>
                <span className="text-xs font-bold text-white leading-tight truncate">
                  {currentTrack.reciter}
                </span>
              </div>

              {/* Animated sound wave bars when playing */}
              {isPlaying && (
                <div className="absolute top-3 right-3 flex items-end gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs">
                  <span className="w-1 h-3 bg-[#D4A017] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-5 bg-[#F2C94C] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-4 bg-[#D4A017] rounded-full animate-bounce [animation-delay:-0.45s]" />
                  <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Title, Scrub Bar & Big Player Buttons */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                {currentTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
                {currentTrack.description}
              </p>
            </div>

            {/* Scrubber Timeline */}
            <div className="space-y-1.5 pt-2">
              <input
                type="range"
                min={0}
                max={duration || currentTrack.durationSeconds || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2.5 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#D4A017] transition-all"
              />
              <div className="flex justify-between text-xs text-emerald-200 font-mono font-medium">
                <span>{formatTime(currentTime)}</span>
                <span className="text-emerald-300/80">
                  {duration ? formatTime(duration) : currentTrack.duration}
                </span>
              </div>
            </div>

            {/* Audio Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Previous Track */}
                <button
                  onClick={handlePrevTrack}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="পূর্ববর্তী রুকইয়াহ"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={() => skipTime(-10)}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="১০ সেকেন্ড পেছনে"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Big Main Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D4A017] text-[#00382E] flex items-center justify-center hover:bg-[#F2C94C] transition-all transform active:scale-95 shadow-xl cursor-pointer shrink-0 font-bold"
                  title={isPlaying ? "বিরতি" : "প্লে করুন"}
                >
                  {isLoading ? (
                    <Loader2 className="w-7 h-7 animate-spin text-[#00382E]" />
                  ) : isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
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

                {/* Next Track */}
                <button
                  onClick={handleNextTrack}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="পরবর্তী রুকইয়াহ"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Utility buttons: Speed, Loop, Mute */}
              <div className="flex items-center gap-2">
                {/* Loop / Repeat Button */}
                <button
                  onClick={toggleLoop}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                    isLooping
                      ? "bg-[#D4A017] text-[#00382E] border-[#D4A017]"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                  }`}
                  title={isLooping ? "রিপিট মোড চালু আছে" : "রিপিট / লুপ মোড চালু করুন (ঘুমের সময় কার্যকরী)"}
                >
                  <Repeat className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">{isLooping ? "লুপ অন" : "লুপ"}</span>
                </button>

                {/* Speed Multiplier */}
                <button
                  onClick={cycleSpeed}
                  className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer border border-white/15"
                  title="প্লেব্যাক স্পিড পরিবর্তন"
                >
                  {playbackSpeed}x
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/15"
                  title={isMuted ? "শব্দ চালু করুন" : "শব্দ বন্ধ করুন"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Streaming Engine (Visible/Collapsible) */}
        {showScreen && (
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-inner max-w-2xl mx-auto">
              <div className="aspect-video w-full">
                <div id="youtube-audio-engine" className="w-full h-full" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tip & Method Banner */}
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2 max-w-2xl">
            <Headphones className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
            <span>
              <strong>আমল ও শোনার নিয়ম:</strong> {currentTrack.instructions}
            </span>
          </div>

          <button
            onClick={handleCopyShare}
            className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5 transition-colors shrink-0 text-xs cursor-pointer border border-white/15"
          >
            <Share2 className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>{copiedLink ? "লিঙ্ক কপি হয়েছে!" : "শেয়ার করুন"}</span>
          </button>
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
                : "bg-[#FAFAF7] text-gray-700 hover:bg-gray-100 hover:text-[#006B5B] border border-gray-200/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4 Powerful Ruqyah Playlist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h4 className="text-base sm:text-lg font-bold text-[#004D40] flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[#006B5B]" />
            <span>নির্বাচিত শক্তিশালী রুকইয়াহ অডিও তালিকা ({filteredTracks.length}টি)</span>
          </h4>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            কুরআনুল কারীমের বিশেষ শেফা ও দাহ্যকারী আয়াতসমূহ
          </span>
        </div>

        <div className="space-y-3">
          {filteredTracks.map((track, idx) => {
            const isCurrent = currentTrack.id === track.id;
            const bngIndex = ["০১", "০২", "০৩", "০৪"][idx] || `০${idx + 1}`;

            return (
              <div
                key={track.id}
                onClick={() => handleSelectTrack(track)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? "bg-[#006B5B]/5 border-[#006B5B] shadow-sm ring-1 ring-[#006B5B]/30"
                    : "bg-white border-gray-200 hover:border-[#006B5B]/40 hover:bg-[#FAFAF7]"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Track Play/Pause Circle with Index */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                      isCurrent && isPlaying
                        ? "bg-[#006B5B] text-white shadow-md animate-pulse"
                        : isCurrent
                        ? "bg-[#006B5B] text-white shadow-xs"
                        : "bg-[#FAFAF7] text-[#006B5B] border border-[#006B5B]/20"
                    }`}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400">
                        {bngIndex}.
                      </span>
                      <h5 className={`text-base font-bold truncate ${isCurrent ? "text-[#004D40]" : "text-gray-900"}`}>
                        {track.title}
                      </h5>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006B5B] font-semibold border border-emerald-200/60">
                        {track.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      তিলাওয়াত: {track.reciter} • {track.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono font-semibold">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{track.duration}</span>
                  </div>

                  <button
                    type="button"
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isCurrent && isPlaying
                        ? "bg-[#004D40] text-white"
                        : isCurrent
                        ? "bg-[#006B5B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-[#006B5B] hover:text-white"
                    }`}
                  >
                    {isCurrent && isPlaying ? "বাজছে..." : isCurrent ? "চালু করুন" : "প্লে করুন"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

