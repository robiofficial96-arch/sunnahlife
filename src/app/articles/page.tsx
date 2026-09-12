import { Metadata } from "next";
import Link from "next/link";
import { ARTICLES_LIST } from "@/data/articles";
import { BookOpen, Calendar, Clock, UserCheck, ChevronRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ইসলামিক আর্টিকেলস ও জ্ঞান ভান্ডার | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ, তৌহিদ ও কুসংস্কার সচেতনতা বিষয়ক শিক্ষণীয় আর্টিকেলসমূহ।",
};

export default function ArticlesPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>ইসলামিক জ্ঞান ও সচেতনতা</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ ও সুন্নাহ জ্ঞান ভান্ডার
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন, সহীহ হাদিস ও নির্ভরযোগ্য ইসলামিক আলেমদের পর্যালোচনায় রচিত সচেতনতামূলক দীর্ঘ আর্টিকেলসমূহ।
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES_LIST.map((art) => (
          <article
            key={art.slug}
            className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#006B5B] bg-[#006B5B]/10 px-3 py-1 rounded-full">
                  {art.categoryLabel}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors mb-2.5 leading-snug">
                <Link href={`/articles/${art.slug}`}>{art.title}</Link>
              </h2>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 text-gray-600">
                <UserCheck className="w-3.5 h-3.5 text-[#D4A017]" />
                {art.author}
              </span>

              <Link
                href={`/articles/${art.slug}`}
                className="font-semibold text-[#006B5B] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
