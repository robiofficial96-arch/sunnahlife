import Link from "next/link";
import Image from "next/image";
import { 
  Stethoscope, 
  ShieldCheck, 
  Headphones, 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  HeartPulse,
  Clock,
  ArrowRight,
  UserCheck
} from "lucide-react";
import SymptomChecker from "@/components/SymptomChecker";
import AudioPlayer from "@/components/AudioPlayer";
import { RUQYAH_STEPS } from "@/data/ruqyahSteps";
import { DUA_LIST } from "@/data/duas";
import { ARTICLES_LIST } from "@/data/articles";

import { SITE_CONFIG } from "@/config/site";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-[#006B5B]/10 bg-[#FAFAF7]">
        {/* Subtle decorative Islamic accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#006B5B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006B5B]/10 border border-[#006B5B]/20 text-[#006B5B] text-xs md:text-sm font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>কুরআন ও সহীহ সুন্নাহর আলোকে পরিচালিত</span>
            </div>

            {/* Brand Logo (Full standalone vector - already includes calligraphy & slogan) */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-28 md:h-32 mx-auto">
                <Image
                  src="/sunnahlife_logo.svg"
                  alt="সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 384px"
                  className="object-contain"
                />
              </div>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
                শিরকমুক্ত, কুসংস্কারমুক্ত ও নির্ভরযোগ্য ইসলামিক <strong className="text-[#004D40] font-semibold">রুকইয়াহ শারইয়্যাহ</strong>, সেলফ-রুকইয়াহ শিক্ষা, লক্ষণ যাচাই ও অভিজ্ঞ শারঈ রাক্বীর পরামর্শ প্ল্যাটফর্ম।
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/assessment"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#006B5B] text-white font-bold text-sm md:text-base hover:bg-[#004D40] shadow-md shadow-[#006B5B]/25 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Stethoscope className="w-5 h-5 text-[#F2C94C] group-hover:scale-110 transition-transform" />
                <span>লক্ষণ পরীক্ষা করুন (Diagnosis)</span>
              </Link>

              <Link
                href="/self-ruqyah"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border-2 border-[#006B5B] text-[#006B5B] font-bold text-sm md:text-base hover:bg-[#006B5B]/5 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>সেলফ-রুকইয়াহ গাইড</span>
              </Link>
            </div>

            {/* Direct WhatsApp Consultation Callout */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সুন্নাহলাইফের রাক্বীর সাথে পরামর্শ করতে চাই")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#006B5B]" />
                <span>জরুরি প্রয়োজনে অভিজ্ঞ রাক্বীর সাথে WhatsApp-এ যোগাযোগ করুন</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. START HERE / QUICK CARDS (RPD Section 03) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004D40]">
            আপনার প্রয়োজন অনুযায়ী কোথা থেকে শুরু করবেন?
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            সহজ কয়েকটি বিভাগে আপনার কাঙ্ক্ষিত সমাধান বেছে নিন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Card 1: Assessment */}
          <Link
            href="/assessment"
            className="group p-5 rounded-3xl bg-white border-2 border-[#006B5B]/30 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -top-1 -right-1 bg-[#D4A017] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl-xl shadow-2xs">
              জনপ্রিয়
            </div>
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center mb-3 group-hover:bg-[#D4A017] group-hover:text-white transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors">
                লক্ষণ পরীক্ষা ও ডায়াগনোসিস
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                ১৫টি বিশেষ প্রশ্নোত্তরে বদনজর, সিহর বা জিন স্পর্শের সম্ভাব্যতা যাচাই।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>টেস্ট শুরু করুন</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Al-Quran (114 Surahs) */}
          <Link
            href="/quran"
            className="group p-5 rounded-3xl bg-white border-2 border-[#006B5B]/20 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center mb-3 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors">
                আল-কুরআনুল কারীম
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                ১১৪টি পূর্ণাঙ্গ সূরা, বাংলা অর্থ, ফযীলত ও আন্তর্জাতিক ক্বারীদের অডিও।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>কুরআন শুনুন ও পড়ুন</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Ruqyah Audio */}
          <Link
            href="/audio"
            className="group p-5 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center mb-3 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors">
                রুকইয়াহ অডিও লাইব্রেরি
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                মিশারি রশিদ, আহমদ আল-আজমী ও সা'দ আল-গামিদির মূল রুকইয়াহ স্ট্রিম।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>অডিও প্লেয়ার শুনুন</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Self-Ruqyah Guide */}
          <Link
            href="/self-ruqyah"
            className="group p-5 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center mb-3 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors">
                সেলফ-রুকইয়াহ গাইড
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                ঘরে বসে নিজের ও পরিবারের ওপর সহীহ নিয়মে রুকইয়াহ করার ৭ ধাপের পদ্ধতি।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>পদ্ধতি শিখুন</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Masnun Duas */}
          <Link
            href="/duas"
            className="group p-5 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center mb-3 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors">
                মাসনুন দোয়া ও আযকার
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                সকাল-সন্ধ্যার সুরক্ষা, ব্যথা নিরাময় ও শিশুদের সুরক্ষার সহীহ হাদিস বর্ণিত দোয়া।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>দোয়াগুলো পড়ুন</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. CORE INTERACTIVE SYMPTOM CHECKER SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            সরাসরি স্ব-নিরীক্ষণ ও পরামর্শ
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#004D40] mt-1">
            আপনার লক্ষণ যাচাই করুন ও ফলাফলসহ রাক্বীর সাথে যোগাযোগ করুন
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-2xl mx-auto">
            লক্ষণগুলো সিলেক্ট করলে তাৎক্ষণিকভাবে ফলাফল তৈরি হবে এবং আপনি এক ক্লিকেই রেজাল্টসহ হোয়াটসঅ্যাপে রাক্বীকে পাঠাতে পারবেন।
          </p>
        </div>

        <SymptomChecker />
      </section>

      {/* 4. STEP-BY-STEP SELF-RUQYAH OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#006B5B]/15 p-6 md:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
                সহীহ সুন্নাহ পদ্ধতি
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mt-1">
                নিজের রুকইয়াহ নিজে করার ৭টি ধারাবাহিক ধাপ
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                অন্যের ওপর নির্ভরশীল না হয়ে রাসুলুল্লাহ (ﷺ)-এর সুন্নাহ মোতাবেক নিজেই নিজের সুস্থতার জন্য আমল করুন
              </p>
            </div>
            <Link
              href="/self-ruqyah"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006B5B] hover:text-[#004D40]"
            >
              <span>সম্পূর্ণ গাইড পড়ুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RUQYAH_STEPS.slice(0, 6).map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl bg-[#FAFAF7] border border-gray-200/80 hover:border-[#006B5B]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#006B5B] text-white text-xs font-bold flex items-center justify-center mb-3">
                  ০{step.stepNumber}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-[#006B5B] font-medium mb-2">{step.subtitle}</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUDIO PLAYER FEATURE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            রুকইয়াহ অডিও লাইব্রেরি
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mt-1">
            কুরআন তিলাওয়াত শুনুন ও প্রতিক্রিয়া লক্ষ্য করুন
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl mx-auto">
            রুকইয়াহ শোনার সময় একমনে অযু অবস্থায় শুনুন। কোনো প্রকার ভয় বা অস্বস্তি হলে দোয়া পড়ে ফুঁক দিন।
          </p>
        </div>

        <AudioPlayer />
      </section>

      {/* 6. MASNUN DUAS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            দৈনন্দিন আমল ও হিফয
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mt-1">
            জরুরি মাসনুন দোয়া ও আত্মরক্ষার আযকার
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DUA_LIST.slice(0, 4).map((dua) => (
            <div
              key={dua.id}
              className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-[#006B5B] bg-[#006B5B]/10 px-2.5 py-1 rounded-full">
                    {dua.count}
                  </span>
                  <span className="text-xs text-gray-400">{dua.reference}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{dua.title}</h3>
                <p className="font-arabic text-base md:text-lg text-[#004D40] bg-[#FAFAF7] p-3.5 rounded-xl border border-[#006B5B]/10 leading-loose text-right mb-3">
                  {dua.arabic}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">অর্থ:</strong> {dua.banglaMeaning}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-emerald-800 bg-emerald-50/50 p-2.5 rounded-lg">
                <strong>ফজিলত:</strong> {dua.benefit}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/duas"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#006B5B] text-[#006B5B] font-semibold text-sm hover:bg-[#006B5B]/5 transition-colors"
          >
            <span>সকল মাসনুন দোয়া দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. TOPICS & ISSUES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
              কুরআন-সুন্নাহর জ্ঞান
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mt-1">
              সাধারণ সমস্যা ও বিষয়ভিত্তিক শারঈ আলোচনা
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              বদনজর, জাদু বা ভীতি সংক্রান্ত কুসংস্কার পরিহার করে কুরআন ও সহীহ সুন্নাহর দিকনির্দেশনা জানুন
            </p>
          </div>
          <Link
            href="/topics"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006B5B] hover:text-[#004D40]"
          >
            <span>সকল বিষয় দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              slug: "evil-eye",
              title: "বদনজর ও হিংসা",
              desc: "নজর লাগার আলামত ও রাসুলুল্লাহ (ﷺ) নির্দেশিত আরোগ্যের সুন্নাহ পদ্ধতি।",
            },
            {
              slug: "sihr",
              title: "সিহর ও জাদু",
              desc: "জাদুর ক্ষতিসাধন ও কুরআন দিয়ে তা স্থায়ীভাবে বিনষ্ট করার সঠিক নিয়ম।",
            },
            {
              slug: "jinn-fear",
              title: "জিন ও দুঃস্বপ্ন",
              desc: "ঘুমের মধ্যে ভয়, বোবায় ধরা ও অস্বস্তি থেকে রক্ষার আমলসমূহ।",
            },
            {
              slug: "waswasah",
              title: "ওয়াসওয়াসা ও কুচিন্তা",
              desc: "অযু, নামায ও ঈমান নিয়ে শয়তানের সন্দেহ দূর করার ইসলামিক উপায়।",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/topics/${item.slug}`}
              className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
                <span>বিস্তারিত পড়ুন</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FEATURED ARTICLES & RESEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>শারঈ গবেষণা ও প্রবন্ধ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#004D40]">
              গুরুত্বপূর্ণ রুকইয়াহ আর্টিকেলস ও গবেষণা
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              কুরআন ও সহীহ সুন্নাহর ভিত্তিতে কুসংস্কারমুক্ত জীবন ও আরোগ্যের প্রামাণ্য দিকনির্দেশনা
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006B5B] hover:text-[#004D40]"
          >
            <span>সকল আর্টিকেল পড়ুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTICLES_LIST.slice(0, 4).map((art) => (
            <article
              key={art.slug}
              className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-[#006B5B] bg-[#006B5B]/10 px-2.5 py-0.5 rounded-full">
                    {art.categoryLabel}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors mb-2 leading-snug line-clamp-2">
                  <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>সুন্নাহলাইফ</span>
                </span>
                <Link
                  href={`/articles/${art.slug}`}
                  className="font-bold text-[#006B5B] hover:underline flex items-center gap-0.5"
                >
                  <span>পড়ুন</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. APPOINTMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-10 rounded-3xl bg-radial from-[#006B5B] to-[#004D40] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-[#F2C94C] font-semibold tracking-wider uppercase">
              সরাসরি রাক্বীর সেবা
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              অনলাইন বা সরাসরি রুকইয়াহ অ্যাপয়েন্টমেন্ট প্রয়োজন?
            </h2>
            <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
              অভিজ্ঞ শারঈ রাক্বীর সাথে নির্দিষ্ট সময়ে অনলাইন ভিডিও/অডিও সেশন অথবা সরাসরি চেম্বারে পরামর্শের জন্য খুব সহজেই বুকিং করুন।
            </p>
          </div>

          <Link
            href="/appointment"
            className="shrink-0 px-7 py-3.5 rounded-2xl bg-[#D4A017] hover:bg-[#F2C94C] text-[#004D40] font-bold text-sm md:text-base shadow-lg transition-transform active:scale-95"
          >
            অ্যাপয়েন্টমেন্ট বুকিং করুন
          </Link>
        </div>
      </section>

      {/* 9. TRUST & FRAUD AWARENESS MODULE (RPD Section 22) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>জরুরি সচেতনতা: ভণ্ড কবিরাজ ও জ্যোতিষী পরিহার করুন</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              কীভাবে চিনবেন ভণ্ড কবিরাজ ও প্রতারক ব্যক্তি?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl leading-relaxed">
              যাঁরা মায়ের নাম জিজ্ঞেস করে, কুফরী তাবীজ দেয়, গায়েবী তথ্য জানার দাবি করে বা নিশ্চিত ১০০% আরোগ্যের মিথ্যা প্রতিশ্রুতি দেয়—তাঁদের কাছে যাওয়া হারাম ও স্পষ্ট শিরক।
            </p>
          </div>

          <Link
            href="/fraud-awareness"
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 shadow-xs transition-colors flex items-center gap-2"
          >
            <span>১০টি সতর্কতামূলক আলামত জানুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
