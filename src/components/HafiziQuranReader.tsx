"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  HAFIZI_PARAS,
  HAFIZI_SURAHS,
  MIN_HAFIZI_PAGE,
  MAX_HAFIZI_PAGE,
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
  Maximize2,
  Minimize2,
  BookOpen,
  Info,
  List,
  Sparkles,
  ArrowRight,
  Layers,
  X,
  Share2,
  Check,
} from "lucide-react";

interface HafiziQuranReaderProps {
  initialPage?: number;
  onSwitchToDigital?: () => void;
}

export default function HafiziQuranReader({
  initialPage = 2,
  onSwitchToDigital,
}: HafiziQuranReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageInput, setPageInput] = useState<string>(String(initialPage));
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [showTajweedLegend, setShowTajweedLegend] = useState<boolean>(false);
  const [showSurahModal, setShowSurahModal] = useState<boolean>(false);
  const [showParaModal, setShowParaModal] = useState<boolean>(false);
  const [bookmarkPage, setBookmarkPage] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Load bookmark from localStorage
  useEffect(() => {
    try {
      const savedBm = localStorage.getItem("sunnahlife_hafizi_bookmark");
      if (savedBm) {
        const parsed = parseInt(savedBm, 10);
        if (!isNaN(parsed) && parsed >= MIN_HAFIZI_PAGE && parsed <= MAX_HAFIZI_PAGE) {
          setBookmarkPage(parsed);
        }
      }

      // Check last read page if not given an explicit initial page
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

  // Persist current page
  useEffect(() => {
    try {
      localStorage.setItem("sunnahlife_hafizi_last_page", String(currentPage));
    } catch {
      // ignore
    }
    setPageInput(String(currentPage));
    setIsLoading(true);
    setImageError(false);
    setUseFallback(false);
  }, [currentPage]);

  const currentPara: HafiziPara = getParaByPage(currentPage);
  const currentSurah: HafiziSurah = getSurahByPage(currentPage);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPage, handlePrevPage]);

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
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped left -> next page
        handleNextPage();
      } else {
        // Swiped right -> prev page
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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // fullscreen fallback
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

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

  const imageUrl = useFallback
    ? getHafiziPageFallbackUrl(currentPage)
    : getHafiziPageImageUrl(currentPage);

  const nextPageUrl = currentPage < MAX_HAFIZI_PAGE ? getHafiziPageImageUrl(currentPage + 1) : null;
  const prevPageUrl = currentPage > MIN_HAFIZI_PAGE ? getHafiziPageImageUrl(currentPage - 1) : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-colors ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#0c1f1a] overflow-y-auto p-2 sm:p-6 flex flex-col justify-between"
          : "space-y-6"
      }`}
    >
      {/* Prefetch next and previous page images */}
      {nextPageUrl && <link rel="prefetch" href={nextPageUrl} as="image" />}
      {prevPageUrl && <link rel="prefetch" href={prevPageUrl} as="image" />}

      {/* Top Controls & Navigation Bar */}
      <div className="bg-white rounded-3xl border border-[#006B5B]/15 shadow-xs p-4 sm:p-5 space-y-4">
        {/* Row 1: Para, Surah Info and Quick Jump */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
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

          {/* Quick Selectors Modal Triggers */}
          <div className="flex items-center gap-2 flex-wrap">
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
              title={
                bookmarkPage === currentPage
                  ? "বুকমার্ক মুছে ফেলুন"
                  : "এই পৃষ্ঠায় বুকমার্ক রাখুন"
              }
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

        {/* Row 2: Page Navigator & Reading Tools */}
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

          {/* Zoom, Tajweed Guide, Fullscreen & Share */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                className="p-1 rounded-lg hover:bg-white text-gray-600 transition-colors"
                title="জুম কমান"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] text-gray-700 font-semibold">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(180, z + 15))}
                className="p-1 rounded-lg hover:bg-white text-gray-600 transition-colors"
                title="জুম বাড়ান"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 100 && (
                <button
                  onClick={() => setZoomLevel(100)}
                  className="p-1 rounded-lg hover:bg-white text-gray-500 transition-colors ml-0.5"
                  title="রিসেট"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Tajweed Legend button */}
            <button
              onClick={() => setShowTajweedLegend(!showTajweedLegend)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                showTajweedLegend
                  ? "bg-amber-100/70 border-amber-300 text-amber-900"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              title="কালার কোডেড তাজবীদ নিয়মাবলী"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span className="hidden md:inline">তাজবীদ রুলস</span>
            </button>

            {/* Share Page button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all cursor-pointer"
              title="পৃষ্ঠার লিংক কপি করুন"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all cursor-pointer"
              title={isFullscreen ? "ফুলস্ক্রিন বন্ধ" : "ফুলস্ক্রিন মোড"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
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

        {/* Saved Bookmark Banner if bookmark exists and not on current page */}
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
        {showTajweedLegend && (
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

      {/* Main Quran Page Viewer Frame */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative flex items-center justify-center min-h-[500px] md:min-h-[750px] overflow-hidden rounded-3xl transition-all ${
          isFullscreen
            ? "flex-1 max-w-4xl mx-auto my-auto"
            : "bg-[#1B362E]/5 border border-[#006B5B]/15 shadow-md p-2 sm:p-6"
        }`}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs rounded-3xl">
            <div className="w-10 h-10 border-3 border-[#006B5B]/20 border-t-[#006B5B] rounded-full animate-spin mb-3" />
            <p className="text-xs font-semibold text-[#004D40]">
              পৃষ্ঠা {currentPage} লোড হচ্ছে...
            </p>
          </div>
        )}

        {/* Error State */}
        {imageError && (
          <div className="text-center py-16 px-4 space-y-3">
            <p className="text-sm text-red-600 font-semibold">
              পৃষ্ঠাটি লোড করা সম্ভব হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।
            </p>
            <button
              onClick={() => {
                setImageError(false);
                setUseFallback(true);
                setIsLoading(true);
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
          {/* Authentic Book Shadow & Border Frame */}
          <div className="relative shadow-2xl rounded-2xl overflow-hidden border-2 sm:border-4 border-[#D4A017]/30 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={`১৫ লাইনের হাফেজী কুরআন - পৃষ্ঠা ${currentPage}`}
              className="max-h-[75vh] sm:max-h-[85vh] w-auto object-contain mx-auto select-none"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                if (!useFallback) {
                  setUseFallback(true);
                } else {
                  setImageError(true);
                  setIsLoading(false);
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
            টিপস: পৃষ্ঠা পরিবর্তন করতে স্ক্রীনে <strong>সোয়াইপ</strong> করুন অথবা কীবোর্ডের <strong>Arrow Left/Right</strong> চাপুন।
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

      {/* Para Selector Modal */}
      {showParaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
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
                        : "border-gray-200 hover:border-[#006B5B] hover:bg-[#006B5B]/5"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
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
                        : "border-gray-200 hover:border-[#006B5B] hover:bg-[#006B5B]/5"
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
