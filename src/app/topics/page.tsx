import { Metadata } from "next";
import Link from "next/link";
import { TOPICS_DATA } from "@/data/topics";
import { BookOpen, ShieldCheck, ChevronRight, ArrowRight, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "সমস্যা ও বিষয়ভিত্তিক লাইব্রেরি | সুন্নাহলাইফ",
  description: "বদনজর, সিহর, জাদু, জিন ও দুঃস্বপ্ন এবং মানসিক ওয়াসওয়াসা সংক্রান্ত কুরআন ও সহীহ সুন্নাহর দিকনির্দেশনা।",
};

export default function TopicsPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>বিষয়ভিত্তিক শারঈ সমাধান</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          সমস্যা ও আধ্যাত্মিক বিষয়ভিত্তিক লাইব্রেরি
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহর আলোকে বদনজর, জাদু, ভীতি ও পারিবারিক জটিলতার সঠিক কারণ, লক্ষণ ও প্রমাণিত সুন্নাহসম্মত চিকিৎসা পদ্ধতি।
        </p>
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOPICS_DATA.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="group p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-[#D4A017] bg-[#D4A017]/10 px-3 py-1 rounded-full inline-block mb-3">
                শারঈ আলোচনা
              </span>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors mb-2">
                {topic.title}
              </h2>
              <p className="text-xs md:text-sm text-[#004D40] font-medium mb-3">
                {topic.subtitle}
              </p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                {topic.shortDescription}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm font-semibold text-[#006B5B]">
              <span>সম্পূর্ণ সমাধান পড়ুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Cross link to Assessment */}
      <div className="p-6 md:p-8 rounded-3xl bg-radial from-emerald-50 to-white border border-[#006B5B]/20 text-center space-y-3">
        <h3 className="text-lg md:text-xl font-bold text-[#004D40]">
          আপনার নির্দিষ্ট সমস্যার লক্ষণ মেলাতে চান?
        </h3>
        <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto">
          আমাদের স্বয়ংক্রিয় ডায়াগনোসিস টুল ব্যবহার করে আপনার অনুভূতিগুলো মিলিয়ে তাৎক্ষণিক দিকনির্দেশনা ও হোয়াটসঅ্যাপে রাক্বীর পরামর্শ নিন।
        </p>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#006B5B] text-white font-bold text-sm hover:bg-[#004D40] transition-colors shadow-sm"
        >
          <span>লক্ষণ পরীক্ষা শুরু করুন</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
