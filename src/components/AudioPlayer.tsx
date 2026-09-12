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
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<RuqyahAudioItem>(RUQYAH_AUDIO_LIST[0]);
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

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-5 md:p-8">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Main Active Player Bar */}
      <div className="bg-radial from-[#006B5B] to-[#004D40] text-white rounded-2xl p-5 md:p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#F2C94C] font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3" />
              এখন বাজছে (Now Playing)
            </span>
            <h3 className="text-lg md:text-xl font-bold">{currentTrack.title}</h3>
            <p className="text-xs text-emerald-100 mt-0.5">{currentTrack.reciter}</p>
          </div>

          <div className="flex items-center gap-3 self-center md:self-auto">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#D4A017] text-white flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#004D40] transition-transform active:scale-95 shadow-lg cursor-pointer"
              title={isPlaying ? "বিরতি" : "প্লে করুন"}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={isMuted ? "শব্দ চালু" : "শব্দ বন্ধ"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
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
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
          />
          <div className="flex justify-between text-[11px] text-emerald-100 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : currentTrack.duration}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-emerald-50 flex items-start gap-2">
          <Headphones className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
          <span><strong>নির্দেশনা:</strong> {currentTrack.instructions}</span>
        </div>
      </div>

      {/* Playlist Section */}
      <h4 className="text-base md:text-lg font-bold text-[#004D40] mb-4 flex items-center gap-2">
        <Headphones className="w-5 h-5 text-[#006B5B]" />
        সকল রুকইয়াহ অডিও তালিকা ({RUQYAH_AUDIO_LIST.length}টি)
      </h4>

      <div className="space-y-3">
        {RUQYAH_AUDIO_LIST.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isCurrent
                  ? "bg-[#006B5B]/5 border-[#006B5B] shadow-xs"
                  : "bg-white border-gray-200 hover:border-[#006B5B]/30 hover:bg-[#FAFAF7]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent && isPlaying
                      ? "bg-[#006B5B] text-white animate-pulse"
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

                <div>
                  <h5 className={`text-sm md:text-base font-semibold ${isCurrent ? "text-[#004D40]" : "text-gray-800"}`}>
                    {track.title}
                  </h5>
                  <p className="text-xs text-gray-500">{track.reciter}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 font-mono shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{track.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
