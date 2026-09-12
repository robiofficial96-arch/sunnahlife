"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  X, 
  BookOpen, 
  Headphones, 
  Stethoscope, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight 
} from "lucide-react";
import { TOPICS_DATA } from "@/data/topics";
import { DUA_LIST } from "@/data/duas";
import { RUQYAH_AYAT_LIST } from "@/data/ayat";
import { RUQYAH_AUDIO_LIST } from "@/data/ruqyahAudio";
import { FAQ_LIST } from "@/data/faqs";
import { ARTICLES_LIST } from "@/data/articles";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search matches
  const matchedTopics = trimmed
    ? TOPICS_DATA.filter(
        (t) =>
          t.title.toLowerCase().includes(trimmed) ||
          t.subtitle.toLowerCase().includes(trimmed) ||
          t.shortDescription.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedAyat = trimmed
    ? RUQYAH_AYAT_LIST.filter(
        (a) =>
          a.surahName.toLowerCase().includes(trimmed) ||
          a.banglaMeaning.toLowerCase().includes(trimmed) ||
          a.ruqyahPurpose.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedDuas = trimmed
    ? DUA_LIST.filter(
        (d) =>
          d.title.toLowerCase().includes(trimmed) ||
          d.banglaMeaning.toLowerCase().includes(trimmed) ||
          d.benefit.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedAudio = trimmed
    ? RUQYAH_AUDIO_LIST.filter(
        (au) =>
          au.title.toLowerCase().includes(trimmed) ||
          au.reciter.toLowerCase().includes(trimmed) ||
          au.description.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedFaqs = trimmed
    ? FAQ_LIST.filter(
        (f) =>
          f.question.toLowerCase().includes(trimmed) ||
          f.answer.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedArticles = trimmed
    ? ARTICLES_LIST.filter(
        (art) =>
          art.title.toLowerCase().includes(trimmed) ||
          art.excerpt.toLowerCase().includes(trimmed) ||
          art.categoryLabel.toLowerCase().includes(trimmed)
      )
    : [];

  const hasResults =
    matchedTopics.length > 0 ||
    matchedArticles.length > 0 ||
    matchedAyat.length > 0 ||
    matchedDuas.length > 0 ||
    matchedAudio.length > 0 ||
    matchedFaqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 md:pt-24 px-4 p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#006B5B]/20 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 md:p-5 border-b border-gray-100 flex items-center gap-3 bg-[#FAFAF7]">
          <Search className="w-5 h-5 text-[#006B5B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বদনজর, সিহর, আয়াতুল কুরসী, ঘুম, দোয়া বা প্রশ্ন লিখে খুঁজুন..."
            className="flex-1 bg-transparent border-none text-sm md:text-base focus:outline-hidden text-gray-900 placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-gray-400 hover:text-gray-600 px-2"
            >
              মুছে ফেলুন
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 md:p-6 space-y-6 flex-1">
          {!trimmed ? (
            <div className="text-center py-8 text-gray-400 space-y-3">
              <p className="text-sm">দ্রুত খুঁজতে নিচের যেকোনো বিষয়ে ক্লিক করুন:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["বদনজর", "সিহর ও জাদু", "আয়াতুল কুরসী", "৩ কুল", "ঘুমের দোয়া", "ভণ্ড কবিরাজ"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs bg-[#FAFAF7] hover:bg-[#006B5B]/10 hover:text-[#006B5B] px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : hasResults ? (
            <div className="space-y-5">
              {/* Topics */}
              {matchedTopics.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    বিষয়ভিত্তিক লাইব্রেরি ({matchedTopics.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedTopics.map((topic) => (
                      <Link
                        key={topic.slug}
                        href={`/topics/${topic.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {topic.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {topic.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {matchedArticles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    ইসলামিক আর্টিকেলস ({matchedArticles.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedArticles.map((art) => (
                      <Link
                        key={art.slug}
                        href={`/articles/${art.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {art.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {art.excerpt}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Ayat */}
              {matchedAyat.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    রুকইয়াহ আয়াতসমূহ ({matchedAyat.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedAyat.map((ayah) => (
                      <Link
                        key={ayah.id}
                        href="/ayat"
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {ayah.surahName} [আয়াত: {ayah.ayahNumber}]
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 font-arabic">
                            {ayah.arabic}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Duas */}
              {matchedDuas.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    মাসনুন দোয়া ({matchedDuas.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedDuas.map((dua) => (
                      <Link
                        key={dua.id}
                        href="/duas"
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {dua.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {dua.banglaMeaning}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio */}
              {matchedAudio.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    রুকইয়াহ অডিও ({matchedAudio.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedAudio.map((track) => (
                      <Link
                        key={track.id}
                        href="/audio"
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {track.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {track.reciter} • {track.duration}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {matchedFaqs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#006B5B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    জিজ্ঞাসা ও উত্তর ({matchedFaqs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedFaqs.map((faq) => (
                      <Link
                        key={faq.id}
                        href="/faq"
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#006B5B]">
                            {faq.question}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {faq.answer}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B5B]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm font-medium">"{query}" সম্পর্কিত কোনো তথ্য পাওয়া যায়নি।</p>
              <p className="text-xs mt-1">অন্য কোনো শব্দ দিয়ে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
