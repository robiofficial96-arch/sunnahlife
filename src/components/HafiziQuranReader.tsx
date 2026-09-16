"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  HAFIZI_PARAS,
  HAFIZI_SURAHS,
  MIN_HAFIZI_PAGE,
  MAX_HAFIZI_PAGE,
  HafiziEdition,
  getHafiziPageImageUrl,
  getHafiziPageFallbackUrl,
  getParaByPage,
  getSurahByPage,
  HafiziPara,
  HafiziSurah,
} from "@/data/hafiziQuranData";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Info,
  List,
  Sparkles,
  ArrowRight,
  Layers,
  X,
  Share2,
  Check,
  Smartphone,
  DownloadCloud,
  CheckCircle2,
  WifiOff,
} from "lucide-react";

interface HafiziQuranReaderProps {
  initialPage?: number;
  onSwitchToDigital?: () => void;
}

const CACHE_NAME = "sunnahlife_quran_cache_v1";

export default function HafiziQuranReader({
  initialPage = 2,
  onSwitchToDigital,
}: HafiziQuranReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageInput, setPageInput] = useState<string>(String(initialPage));
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [edition, setEdition] = useState<HafiziEdition>("emdadia");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [showTajweedLegend, setShowTajweedLegend] = useState<boolean>(false);
  const [showSurahModal, setShowSurahModal] = useState<boolean>(false);
  const [showParaModal, setShowParaModal] = useState<boolean>(false);
  const [bookmarkPage, setBookmarkPage] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Offline Para Download state
  const [isDownloadingPara, setIsDownloadingPara] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number } | null>(null);
  const [isParaCached, setIsParaCached] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const preloadedUrls = useRef<Set<string>>(new Set());

  // Online / offline detector
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load bookmark and edition from localStorage
  useEffect(() => {
    try {
      const savedBm = localStorage.getItem("sunnahlife_hafizi_bookmark");
      if (savedBm) {
        const parsed = parseInt(savedBm, 10);
        if (!isNaN(parsed) && parsed >= MIN_HAFIZI_PAGE && parsed <= MAX_HAFIZI_PAGE) {
          setBookmarkPage(parsed);
        }
      }

      const savedEd = localStorage.getItem("sunnahlife_hafizi_edition") as HafiziEdition;
      if (savedEd === "emdadia" || savedEd === "tajweed") {
        setEdition(savedEd);
      }

      const lastPage = localStorage.getItem("sunnahlife_hafizi_last_page");
      if (lastPage && initialPage === 2) {
        const p = parseInt(lastPage, 10);
        if (!isNaN(p) && p >= MIN_HAFIZI_PAGE && p <= MAX_HAFIZI_PAGE) {
          setCurrentPage(p);
          setPageInput(String(p));
        }
      }
    } catch {
      // ignore
    }
  }, [initialPage]);

  const currentPara: HafiziPara = getParaByPage(currentPage);
  const currentSurah: HafiziSurah = getSurahByPage(currentPage);

  // Cache verification for current Para
  const checkParaCacheStatus = useCallback(async (para: HafiziPara, ed: HafiziEdition) => {
    if (typeof window === "undefined" || !("caches" in window)) return;
    try {
      const cache = await caches.open(CACHE_NAME);
      const startUrl = getHafiziPageImageUrl(para.startPage, ed);
      const endUrl = getHafiziPageImageUrl(para.endPage, ed);
      const hasStart = await cache.match(startUrl);
      const hasEnd = await cache.match(endUrl);
      setIsParaCached(!!hasStart && !!hasEnd);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    checkParaCacheStatus(currentPara, edition);
  }, [currentPara, edition, checkParaCacheStatus]);

  // Aggressive Background Multi-Page Preloader (Next 4 pages + Prev 2 pages)
  useEffect(() => {
    try {
      localStorage.setItem("sunnahlife_hafizi_last_page", String(currentPage));
    } catch {
      // ignore
    }
    setPageInput(String(currentPage));
    setImageError(false);
    setUseFallback(false);

    // Eagerly prefetch and decode into RAM & CacheStorage
    const pagesToPreload = [
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      currentPage - 1,
      currentPage - 2,
    ].filter((p) => p >= MIN_HAFIZI_PAGE && p <= MAX_HAFIZI_PAGE);

    pagesToPreload.forEach((p) => {
      const url = getHafiziPageImageUrl(p, edition);
      if (!preloadedUrls.current.has(url)) {
        preloadedUrls.current.add(url);
        // Preload in memory
        const img = new window.Image();
        img.src = url;
        // Also persist in Cache API for offline / instant reload
        if (typeof window !== "undefined" && "caches" in window) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.match(url).then((matched) => {
              if (!matched) {
                fetch(url, { mode: "cors" })
                  .then((res) => {
                    if (res.ok) cache.put(url, res);
                  })
                  .catch(() => {});
              }
            });
          }).catch(() => {});
        }
      }
    });
  }, [currentPage, edition]);

  const goToPage = useCallback((p: number) => {
    const clamped = Math.max(MIN_HAFIZI_PAGE, Math.min(MAX_HAFIZI_PAGE, p));
    setCurrentPage(clamped);
    setPageInput(String(clamped));
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < MAX_HAFIZI_PAGE) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > MIN_HAFIZI_PAGE) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const handleEditionChange = (newEd: HafiziEdition) => {
    setEdition(newEd);
    setImageLoaded(false);
    try {
      localStorage.setItem("sunnahlife_hafizi_edition", newEd);
    } catch {
      // ignore
    }
  };

  // Download entire current Para for 100% offline reading with 0 loading
  const handleDownloadPara = async () => {
    if (isDownloadingPara || typeof window === "undefined" || !("caches" in window)) return;
    setIsDownloadingPara(true);
    const start = currentPara.startPage;
    const end = currentPara.endPage;
    const total = end - start + 1;
    setDownloadProgress({ current: 0, total });

    try {
      const cache = await caches.open(CACHE_NAME);
      let count = 0;

      for (let p = start; p <= end; p++) {
        const url = getHafiziPageImageUrl(p, edition);
        const existing = await cache.match(url);
        if (!existing) {
          try {
            const resp = await fetch(url, { mode: "cors" });
            if (resp.ok) {
              await cache.put(url, resp);
            }
          } catch {
            // fallback
          }
        }
        count++;
        setDownloadProgress({ current: count, total });
      }
      setIsParaCached(true);
    } catch {
      // ignore
    } finally {
      setIsDownloadingPara(false);
      setTimeout(() => setDownloadProgress(null), 3000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNextPage();
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "PageDown") {
        handleNextPage();
      } else if (e.key === "PageUp") {
        handlePrevPage();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPage, handlePrevPage, isFullscreen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
  };

  const toggleBookmark = () => {
    try {
      if (bookmarkPage === currentPage) {
        localStorage.removeItem("sunnahlife_hafizi_bookmark");
        setBookmarkPage(null);
      } else {
        localStorage.setItem("sunnahlife_hafizi_bookmark", String(currentPage));
        setBookmarkPage(currentPage);
      }
    } catch {
      // ignore
    }
  };

  // Fullscreen toggle: works on Mobile and Desktop
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      try {
        if (containerRef.current && containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {});
        }
      } catch {
        // State fallback works
      }
    } else {
      setIsFullscreen(false);
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch {
        // State fallback works
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, [isFullscreen]);

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(pageInput, 10);
    if (!isNaN(val)) {
      goToPage(val);
    }
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/quran?mode=hafizi&page=${currentPage}` : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentImageUrl = useFallback
    ? getHafiziPageFallbackUrl(currentPage, edition)
    : getHafiziPageImageUrl(currentPage, edition);

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-colors ${
        isFullscreen
          ? "fixed inset-0 z-[100] bg-[#06120D] text-white flex flex-col justify-between w-screen h-screen overflow-hidden select-none"
          : "space-y-4 sm:space-y-6"
      }`}
    >
      {/* Offline Status Badge if disconnected */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs font-semibold px-4 py-1.5 text-center flex items-center justify-center gap-2 shadow-xs">
          <WifiOff className="w-3.5 h-3.5" />
          <span>অফলাইন মোড সক্রিয় — সংরক্ষিত ক্যাশ থেকে কুরআন লোড হচ্ছে (কোনো ইন্টারনেট প্রয়োজন নেই)</span>
        </div>
      )}

      {/* =========================================================================
          VIEW A: FULLSCREEN IMMERSION MODE (NO SPINNERS, ZERO BLANK SCREEN)
         ========================================================================= */}
      {isFullscreen ? (
        <div className="flex flex-col h-full w-full justify-between">
          {/* Top Compact Floating Toolbar */}
          <div className="bg-[#0B1E17]/95 backdrop-blur-md border-b border-[#006B5B]/30 px-3 py-2 sm:px-6 sm:py-2.5 flex items-center justify-between gap-2 z-20 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={toggleFullscreen}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 text-emerald-200 cursor-pointer"
                title="ফুলস্ক্রিন বন্ধ করুন (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">বন্ধ করুন</span>
              </button>

              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-emerald-100 truncate">
                  পারা {currentPara.number}: {currentPara.nameBangla}
                </div>
                <div className="text-[10px] sm:text-xs text-emerald-400/80 truncate">
                  সূরা {currentSurah.nameBangla} • পৃষ্ঠা {currentPage} / {MAX_HAFIZI_PAGE}
                </div>
              </div>
            </div>

            {/* Middle: Edition switch */}
            <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-emerald-900/50 text-[11px]">
              <button
                onClick={() => handleEditionChange("emdadia")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  edition === "emdadia"
                    ? "bg-[#006B5B] text-white font-bold shadow-xs"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                ইমদাদিয়া
              </button>
              <button
                onClick={() => handleEditionChange("tajweed")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  edition === "tajweed"
                    ? "bg-[#006B5B] text-white font-bold shadow-xs"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                তাজবীদ
              </button>
            </div>

            {/* Right: Quick Tools & Offline download */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleDownloadPara}
                disabled={isDownloadingPara}
                className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all ${
                  isParaCached
                    ? "bg-emerald-800/60 text-emerald-200 border border-emerald-500/40"
                    : "bg-white/10 hover:bg-white/20 text-emerald-100"
                }`}
                title="চলমান পারার সব পেজ অফলাইনে সেভ করুন"
              >
                {isDownloadingPara ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">
                      {downloadProgress ? `${downloadProgress.current}/${downloadProgress.total}` : "ডাউনলোড..."}
                    </span>
                  </>
                ) : isParaCached ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="hidden sm:inline">অফলাইন রেডি</span>
                  </>
                ) : (
                  <>
                    <DownloadCloud className="w-3.5 h-3.5 text-[#F2C94C]" />
                    <span className="hidden sm:inline">পারা {currentPara.number} অফলাইন</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowParaModal(true)}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-emerald-200 cursor-pointer"
              >
                পারা
              </button>
              <button
                onClick={() => setShowSurahModal(true)}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-emerald-200 cursor-pointer"
              >
                সূরা
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                className="p-1 rounded-lg bg-white/10 text-xs text-emerald-200 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(180, z + 15))}
                className="p-1 rounded-lg bg-white/10 text-xs text-emerald-200 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleBookmark}
                className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                  bookmarkPage === currentPage
                    ? "bg-[#D4A017] text-white"
                    : "bg-white/10 text-emerald-200 hover:bg-white/20"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* Middle: Fullscreen Quran Page View with Zero-Flicker Double Buffering */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex-1 relative flex items-center justify-center overflow-auto p-1 sm:p-2"
          >
            {/* Smooth corner indicator if loading first time */}
            {!imageLoaded && !imageError && (
              <div className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-[11px] font-semibold border border-emerald-900/40">
                <div className="w-3 h-3 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                <span>পৃষ্ঠা {currentPage} ক্যাশ হচ্ছে...</span>
              </div>
            )}

            {imageError && (
              <div className="text-center py-10 px-4 space-y-3 z-10">
                <p className="text-sm text-red-400 font-semibold">
                  পৃষ্ঠাটি লোড করা সম্ভব হয়নি।
                </p>
                <button
                  onClick={() => {
                    setImageError(false);
                    setUseFallback(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#006B5B] text-white text-xs font-semibold cursor-pointer"
                >
                  বিকল্প সার্ভারে চেষ্টা করুন
                </button>
              </div>
            )}

            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
              className="transition-transform duration-150 ease-out max-h-full max-w-full flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`fs-${edition}-${currentPage}`}
                src={currentImageUrl}
                alt={`১৫ লাইনের হাফেজী কুরআন - পৃষ্ঠা ${currentPage}`}
                className="max-h-[calc(100dvh-110px)] w-auto max-w-full object-contain mx-auto select-none rounded-md shadow-2xl bg-white transition-opacity duration-200"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  if (!useFallback) {
                    setUseFallback(true);
                  } else {
                    setImageError(true);
                  }
                }}
                draggable={false}
              />
            </div>

            {/* Left Tap Zone for Next Page (Right-to-Left Arabic) */}
            <div
              onClick={handleNextPage}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer opacity-0 hover:opacity-10 bg-white/5 transition-opacity"
              title="পরবর্তী পৃষ্ঠা (ট্যাপ করুন)"
            />

            {/* Right Tap Zone for Previous Page */}
            <div
              onClick={handlePrevPage}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer opacity-0 hover:opacity-10 bg-white/5 transition-opacity"
              title="পূর্ববর্তী পৃষ্ঠা (ট্যাপ করুন)"
            />
          </div>

          {/* Bottom Compact Controller */}
          <div className="bg-[#0B1E17]/95 backdrop-blur-md border-t border-[#006B5B]/30 px-3 py-2 sm:px-6 sm:py-2.5 flex items-center justify-between gap-3 shrink-0 z-20">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= MIN_HAFIZI_PAGE}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#006B5B] hover:bg-[#008975] disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্ববর্তী</span>
            </button>

            {/* Scrubber slider */}
            <div className="flex-1 max-w-md mx-2 flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">২</span>
              <input
                type="range"
                min={MIN_HAFIZI_PAGE}
                max={MAX_HAFIZI_PAGE}
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#25D366]"
              />
              <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">৬১১</span>
              <span className="text-xs font-bold text-emerald-100 font-mono whitespace-nowrap">
                {currentPage} / {MAX_HAFIZI_PAGE}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= MAX_HAFIZI_PAGE}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#006B5B] hover:bg-[#008975] disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <span>পরবর্তী</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* =========================================================================
            VIEW B: STANDARD WEB EMBEDDED MODE
           ========================================================================= */
        <>
          {/* Top Controls & Navigation Bar */}
          <div className="bg-white rounded-3xl border border-[#006B5B]/15 shadow-xs p-4 sm:p-5 space-y-4">
            {/* Row 1: Para, Surah Info and Quick Jump */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-[#006B5B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-[#004D40]">
                      পারা {currentPara.number}: {currentPara.nameBangla}
                    </h2>
                    <span className="font-arabic text-emerald-800 text-sm font-semibold">
                      ({currentPara.nameArabic})
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    সূরা {currentSurah.nameBangla} ({currentSurah.nameArabic}) • পৃষ্ঠা {currentPage} / {MAX_HAFIZI_PAGE}
                  </p>
                </div>
              </div>

              {/* Quick Selectors & Offline Para Download */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* One-click Para Offline Download Button */}
                <button
                  onClick={handleDownloadPara}
                  disabled={isDownloadingPara}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isParaCached
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-[#006B5B]/5 hover:bg-[#006B5B]/10 text-[#006B5B] border border-[#006B5B]/20"
                  }`}
                  title="চলমান পারার সব পেজ অফলাইনে সেভ করুন"
                >
                  {isDownloadingPara ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#006B5B]/30 border-t-[#006B5B] rounded-full animate-spin" />
                      <span>{downloadProgress ? `সংরক্ষণ হচ্ছে: ${downloadProgress.current}/${downloadProgress.total}` : "ডাউনলোড..."}</span>
                    </>
                  ) : isParaCached ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>পারা {currentPara.number} অফলাইনে প্রস্তুত</span>
                    </>
                  ) : (
                    <>
                      <DownloadCloud className="w-3.5 h-3.5 text-[#D4A017]" />
                      <span>পারা {currentPara.number} অফলাইনে সেভ করুন</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowParaModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#006B5B] hover:text-[#006B5B] hover:bg-[#006B5B]/5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>পারা সূচি (৩০)</span>
                </button>

                <button
                  onClick={() => setShowSurahModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#006B5B] hover:text-[#006B5B] hover:bg-[#006B5B]/5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <List className="w-3.5 h-3.5 text-[#006B5B]" />
                  <span>সূরা সূচি (১১৪)</span>
                </button>

                {/* Bookmark button */}
                <button
                  onClick={toggleBookmark}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    bookmarkPage === currentPage
                      ? "bg-[#D4A017] text-white shadow-xs"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {bookmarkPage === currentPage ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                      <span>বুকমার্কড</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>বুকমার্ক</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Row 2: Edition Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-50/60 via-[#FAFAF7] to-amber-50/40 border border-emerald-100">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#006B5B] uppercase tracking-wider block">
                  ছাপার সংস্করণ (মুসহাফ ধরন)
                </span>
                <p className="text-xs text-gray-600">
                  {edition === "emdadia"
                    ? "✓ ঐতিহ্যবাহী ১৫ লাইনের ইমদাদিয়া লাইব্রেরী (বাংলাদেশী আসল হাফেজী ছাপা)"
                    : "✓ ১৫ লাইনের কালার কোডেড তাজবীদ ছাপা"}
                </p>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
                <button
                  onClick={() => handleEditionChange("emdadia")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    edition === "emdadia"
                      ? "bg-[#006B5B] text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>📗 ইমদাদিয়া (বাংলাদেশী)</span>
                </button>

                <button
                  onClick={() => handleEditionChange("tajweed")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    edition === "tajweed"
                      ? "bg-[#006B5B] text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>🎨 কালার তাজবীদ</span>
                </button>
              </div>
            </div>

            {/* Row 3: Page Navigator & Reading Tools */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Page prev/next & direct jump form */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= MIN_HAFIZI_PAGE}
                  className="px-3 py-2 rounded-xl bg-[#FAFAF7] border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-[#006B5B] hover:text-white disabled:opacity-40 disabled:hover:bg-[#FAFAF7] disabled:hover:text-gray-700 transition-all flex items-center gap-1 cursor-pointer"
                  title="পূর্ববর্তী পৃষ্ঠা"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">পূর্ববর্তী</span>
                </button>

                {/* Jump to page form */}
                <form onSubmit={handlePageSubmit} className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 hidden md:inline">পৃষ্ঠা</span>
                  <input
                    type="number"
                    min={MIN_HAFIZI_PAGE}
                    max={MAX_HAFIZI_PAGE}
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    className="w-16 sm:w-20 px-2 py-1.5 text-center text-xs font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B]"
                  />
                  <span className="text-xs text-gray-400">/ {MAX_HAFIZI_PAGE}</span>
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-xl bg-[#006B5B] text-white text-xs font-semibold hover:bg-[#005245] transition-all cursor-pointer"
                  >
                    যান
                  </button>
                </form>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= MAX_HAFIZI_PAGE}
                  className="px-3 py-2 rounded-xl bg-[#FAFAF7] border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-[#006B5B] hover:text-white disabled:opacity-40 disabled:hover:bg-[#FAFAF7] disabled:hover:text-gray-700 transition-all flex items-center gap-1 cursor-pointer"
                  title="পরবর্তী পৃষ্ঠা"
                >
                  <span className="hidden sm:inline">পরবর্তী</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Tools & Mobile Fullscreen trigger */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Mobile Fullscreen Prominent Button */}
                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#006B5B] to-[#004D40] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="ফোনে ফুলস্ক্রিনে পড়ার মোড খুলুন"
                >
                  <Smartphone className="w-4 h-4 text-[#F2C94C]" />
                  <span>ফুলস্ক্রিন মোড</span>
                </button>

                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200 text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                    className="p-1 rounded-lg hover:bg-white text-gray-600 transition-colors cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-mono text-[11px] text-gray-700 font-semibold">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(180, z + 15))}
                    className="p-1 rounded-lg hover:bg-white text-gray-600 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  {zoomLevel !== 100 && (
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="p-1 rounded-lg hover:bg-white text-gray-500 transition-colors ml-0.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Tajweed Legend button */}
                {edition === "tajweed" && (
                  <button
                    onClick={() => setShowTajweedLegend(!showTajweedLegend)}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      showTajweedLegend
                        ? "bg-amber-100/70 border-amber-300 text-amber-900"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span className="hidden md:inline">তাজবীদ</span>
                  </button>
                )}

                {/* Share Page button */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Page range scrubber slider */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              <span className="text-[11px] font-mono text-gray-400 shrink-0">পৃষ্ঠা ২</span>
              <input
                type="range"
                min={MIN_HAFIZI_PAGE}
                max={MAX_HAFIZI_PAGE}
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#006B5B]"
              />
              <span className="text-[11px] font-mono text-gray-400 shrink-0">পৃষ্ঠা ৬১১</span>
            </div>

            {/* Saved Bookmark Banner */}
            {bookmarkPage && bookmarkPage !== currentPage && (
              <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/70 rounded-2xl p-2.5 sm:px-4 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#D4A017] fill-amber-400 shrink-0" />
                  <span>
                    আপনার সংরক্ষিত বুকমার্ক: <strong>পৃষ্ঠা {bookmarkPage}</strong> (পারা {getParaByPage(bookmarkPage).number} - সূরা {getSurahByPage(bookmarkPage).nameBangla})
                  </span>
                </div>
                <button
                  onClick={() => goToPage(bookmarkPage)}
                  className="px-3 py-1 rounded-xl bg-[#D4A017] text-white font-semibold text-xs hover:bg-amber-600 transition-colors shrink-0 ml-2 cursor-pointer"
                >
                  যান
                </button>
              </div>
            )}

            {/* Tajweed Legend Drawer */}
            {showTajweedLegend && edition === "tajweed" && (
              <div className="bg-[#FAFAF7] border border-amber-200/80 rounded-2xl p-3.5 text-xs text-gray-700 space-y-2">
                <div className="flex items-center justify-between font-bold text-[#004D40] text-xs">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                    কালার কোডেড তাজবীদ সহায়িকা
                  </span>
                  <button
                    onClick={() => setShowTajweedLegend(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-red-100">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="text-[11px]">
                      <strong>লাল/কমলা:</strong> মাদ (৩/৪ হরকত)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                    <span className="text-[11px]">
                      <strong>সবুজ:</strong> ইখফা / গুন্নাহ / ইদগাম
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-blue-100">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-[11px]">
                      <strong>নীল:</strong> কলকলাহ (প্রতিধ্বনি)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200">
                    <span className="w-3 h-3 rounded-full bg-gray-400 shrink-0" />
                    <span className="text-[11px]">
                      <strong>ধূসর:</strong> অনুচ্চারিত হরফ
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Quran Page Viewer Frame with Double-Buffering */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative flex items-center justify-center min-h-[480px] md:min-h-[750px] overflow-hidden rounded-3xl transition-all bg-[#1B362E]/5 border border-[#006B5B]/15 shadow-md p-2 sm:p-6"
          >
            {/* Non-intrusive corner loading badge if first time */}
            {!imageLoaded && !imageError && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 shadow-sm border border-emerald-200 text-xs font-semibold text-[#004D40]">
                <div className="w-3 h-3 border-2 border-[#006B5B]/30 border-t-[#006B5B] rounded-full animate-spin" />
                <span>পৃষ্ঠা {currentPage} ক্যাশ হচ্ছে...</span>
              </div>
            )}

            {imageError && (
              <div className="text-center py-16 px-4 space-y-3">
                <p className="text-sm text-red-600 font-semibold">
                  পৃষ্ঠাটি লোড করা সম্ভব হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।
                </p>
                <button
                  onClick={() => {
                    setImageError(false);
                    setUseFallback(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#006B5B] text-white text-xs font-semibold cursor-pointer"
                >
                  পুনরায় চেষ্টা করুন (বিকল্প সার্ভার)
                </button>
              </div>
            )}

            {/* Page Container with Zoom */}
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
              className="transition-transform duration-150 ease-out max-w-full flex justify-center"
            >
              <div className="relative shadow-2xl rounded-2xl overflow-hidden border-2 sm:border-4 border-[#D4A017]/30 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={`std-${edition}-${currentPage}`}
                  src={currentImageUrl}
                  alt={`১৫ লাইনের হাফেজী কুরআন - পৃষ্ঠা ${currentPage}`}
                  className="max-h-[72vh] sm:max-h-[85vh] w-auto object-contain mx-auto select-none transition-opacity duration-150"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    if (!useFallback) {
                      setUseFallback(true);
                    } else {
                      setImageError(true);
                    }
                  }}
                  draggable={false}
                />
              </div>
            </div>

            {/* Floating Quick Next/Prev Floating Arrows for desktop */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= MIN_HAFIZI_PAGE}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#006B5B] text-white flex items-center justify-center transition-all disabled:opacity-0 cursor-pointer shadow-lg backdrop-blur-xs"
              title="পূর্ববর্তী পৃষ্ঠা (কীবোর্ড Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= MAX_HAFIZI_PAGE}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#006B5B] text-white flex items-center justify-center transition-all disabled:opacity-0 cursor-pointer shadow-lg backdrop-blur-xs"
              title="পরবর্তী পৃষ্ঠা (কীবোর্ড Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Information & Tip Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-white p-3.5 sm:px-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#006B5B] shrink-0" />
              <span>
                টিপস: নিরবচ্ছিন্ন অফলাইন পড়ার জন্য উপরে <strong>&quot;পারা অফলাইনে সেভ করুন&quot;</strong> বাটনে চাপ দিন।
              </span>
            </div>

            {onSwitchToDigital && (
              <button
                onClick={onSwitchToDigital}
                className="text-[#006B5B] font-semibold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>ডিজিটাল কুরআন (বাংলা অর্থ ও অডিও) দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </>
      )}

      {/* MODALS: PARA & SURAH SELECTORS */}
      {showParaModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 text-gray-900">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#006B5B] text-white">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F2C94C]" />
                <h3 className="font-bold text-base sm:text-lg">পবিত্র কুরআনের ৩০ পারা সূচি</h3>
              </div>
              <button
                onClick={() => setShowParaModal(false)}
                className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HAFIZI_PARAS.map((para) => {
                const isSelected = para.number === currentPara.number;
                return (
                  <button
                    key={para.number}
                    onClick={() => {
                      goToPage(para.startPage);
                      setShowParaModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#006B5B] text-white border-[#006B5B] shadow-xs"
                        : "border-gray-200 hover:border-[#006B5B] hover:bg-[#006B5B]/5 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? "bg-white text-[#006B5B]" : "bg-[#006B5B]/10 text-[#006B5B]"
                        }`}
                      >
                        {para.number}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm">{para.nameBangla}</h4>
                        <p className={`text-[11px] ${isSelected ? "text-emerald-100" : "text-gray-400"}`}>
                          পৃষ্ঠা {para.startPage} - {para.endPage}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`font-arabic text-sm font-semibold ${
                        isSelected ? "text-[#F2C94C]" : "text-emerald-900"
                      }`}
                    >
                      {para.nameArabic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Surah Selector Modal */}
      {showSurahModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 text-gray-900">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#006B5B] text-white">
              <div className="flex items-center gap-2">
                <List className="w-5 h-5 text-[#F2C94C]" />
                <h3 className="font-bold text-base sm:text-lg">পবিত্র কুরআনের ১১৪ সূরা সূচি</h3>
              </div>
              <button
                onClick={() => setShowSurahModal(false)}
                className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HAFIZI_SURAHS.map((surah) => {
                const isSelected = surah.number === currentSurah.number;
                return (
                  <button
                    key={surah.number}
                    onClick={() => {
                      goToPage(surah.startPage);
                      setShowSurahModal(false);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#006B5B] text-white border-[#006B5B] shadow-xs"
                        : "border-gray-200 hover:border-[#006B5B] hover:bg-[#006B5B]/5 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? "bg-white text-[#006B5B]" : "bg-[#006B5B]/10 text-[#006B5B]"
                        }`}
                      >
                        {surah.number}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm">{surah.nameBangla}</h4>
                        <p className={`text-[10px] ${isSelected ? "text-emerald-100" : "text-gray-400"}`}>
                          পৃষ্ঠা {surah.startPage} • {surah.ayahCount} আয়াত • {surah.revelationType}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`font-arabic text-sm font-semibold ${
                        isSelected ? "text-[#F2C94C]" : "text-emerald-900"
                      }`}
                    >
                      {surah.nameArabic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
