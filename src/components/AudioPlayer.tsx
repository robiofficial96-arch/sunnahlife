"use client";

import { useState, useRef, useEffect } from "react";
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
  Loader2, 
  Repeat,
  SkipForward,
  SkipBack,
  Share2,
  ChevronDown,
  ChevronUp
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
  const [showInstructions, setShowInstructions] = useState(false);

  const playerRef = useRef<any>(null);
  const isLoopingRef = useRef(isLooping);
  isLoopingRef.current = isLooping;

  // Lazy YouTube Player Engine
  const isInitializingRef = useRef(false);

  const initPlayerAndPlay = (targetTrack: RuqyahAudioItem) => {
    setIsLoading(true);
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    const startPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        isInitializingRef.current = false;
        return;
      }
      const targetDiv = document.getElementById("youtube-audio-engine");
      if (!targetDiv) {
        isInitializingRef.current = false;
        return;
      }

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }

      playerRef.current = new window.YT.Player("youtube-audio-engine", {
        height: "100%",
        width: "100%",
        videoId: targetTrack.youtubeId,
        playerVars: {
          playsinline: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          autoplay: 1,
        },
        events: {
          onReady: (event: any) => {
            isInitializingRef.current = false;
            setIsLoading(false);
            try {
              event.target.playVideo();
            } catch (e) {}
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

    if (window.YT && window.YT.Player) {
      startPlayer();
    } else {
      if (!document.getElementById("youtube-iframe-api-tag")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-tag";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          startPlayer();
        }
      }, 150);
      setTimeout(() => {
        clearInterval(checkInterval);
        isInitializingRef.current = false;
      }, 12000);
    }
  };

  // Cleanup player on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
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

    if (!playerRef.current) {
      initPlayerAndPlay(track);
      return;
    }

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
    if (!playerRef.current) {
      initPlayerAndPlay(currentTrack);
      return;
    }
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
    { id: "all", label: "সকল শক্তিশালী অডিও (৮টি)" },
    { id: "sihr_renewal", label: "জাদু নবায়ন রোধ ও শয়তান ধ্বংস" },
    { id: "evil_eye", label: "বদনজর ও তীব্র হাসাদ" },
    { id: "tawheed", label: "তাওহীদের আয়াত ও শয়তান ধ্বংস" },
    { id: "jinn_burn", label: "শয়তানকে জ্বালানো" },
    { id: "sihr_eaten", label: "খাওয়ানো জাদু ও পেটের সিহর" },
    { id: "baqarah", label: "সূরা আল-বাকারা" },
    { id: "qaf", label: "সূরা ক্বাফ" },
    { id: "mulk", label: "সূরা আল-মুলক" },
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
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium bg-white/10 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                অডিও চলছে...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopyShare}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center gap-1.5 transition-colors text-xs font-medium cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#F2C94C]" />
              <span>{copiedLink ? "কপি হয়েছে!" : "শেয়ার"}</span>
            </button>
          </div>
        </div>

        {/* Pure Audio Console: No Image, Full Width */}
        <div className="space-y-6 relative z-10">
          {/* Header row with Audio Icon & Title */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Equalizer Sound-Wave Icon Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F2C94C] shrink-0 shadow-inner">
              {isPlaying ? (
                <div className="flex items-end gap-1 px-1.5">
                  <span className="w-1.5 h-5 bg-[#D4A017] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-8 bg-[#F2C94C] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-6 bg-[#D4A017] rounded-full animate-bounce [animation-delay:-0.45s]" />
                  <span className="w-1.5 h-4 bg-emerald-300 rounded-full animate-bounce" />
                </div>
              ) : (
                <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                {currentTrack.title}
              </h3>
            </div>
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

          {/* Audio Control Buttons Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Previous Track */}
              <button
                onClick={handlePrevTrack}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="পূর্ববর্তী অডিও"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Rewind 10s */}
              <button
                onClick={() => skipTime(-10)}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="১০ সেকেন্ড সামনে"
              >
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Next Track */}
              <button
                onClick={handleNextTrack}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="পরবর্তী অডিও"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Utility buttons: Speed, Loop, Mute */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Loop / Repeat Button */}
              <button
                onClick={toggleLoop}
                className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  isLooping
                    ? "bg-[#D4A017] text-[#00382E] border-[#D4A017] shadow-sm"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                }`}
                title={isLooping ? "রিপিট মোড চালু আছে" : "রিপিট / লুপ মোড চালু করুন (ঘুমের সময় কার্যকরী)"}
              >
                <Repeat className="w-4 h-4" />
                <span className="text-[11px]">{isLooping ? "লুপ অন" : "লুপ"}</span>
              </button>

              {/* Speed Multiplier */}
              <button
                onClick={cycleSpeed}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer border border-white/15"
                title="প্লেব্যাক স্পিড পরিবর্তন"
              >
                {playbackSpeed}x
              </button>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className="p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/15"
                title={isMuted ? "শব্দ চালু করুন" : "শব্দ বন্ধ করুন"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Hidden Background YouTube Audio Engine: No Video, No Video Suggestions */}
        <div 
          aria-hidden="true"
          className="absolute -top-[9999px] -left-[9999px] w-48 h-48 overflow-hidden pointer-events-none opacity-0"
        >
          <div id="youtube-audio-engine" />
        </div>

        {/* Bottom Tip & Method Banner: Expandable */}
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-emerald-100">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center justify-between w-full text-left text-emerald-200 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
              <Headphones className="w-3.5 h-3.5 text-[#F2C94C]" />
              আমল ও শোনার নিয়ম
            </span>
            <span className="text-[11px] text-[#F2C94C] font-semibold flex items-center gap-0.5">
              {showInstructions ? "সংক্ষেপ" : "দেখুন"}
              {showInstructions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>
          {showInstructions && (
            <p className="pt-2 text-xs text-emerald-100/90 leading-relaxed animate-in fade-in-50 duration-150">
              {currentTrack.instructions}
            </p>
          )}
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
            const bngIndex = ["০১", "০২", "০৩", "০৪", "০৫", "০৬", "০৭", "০৮"][idx] || `০${idx + 1}`;

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

