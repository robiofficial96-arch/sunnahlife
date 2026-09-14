import Link from "next/link";
import Image from "next/image";
import {
  Stethoscope,
  ShieldCheck,
  Headphones,
  BookOpen,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Calendar,
} from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

function WhatsAppOfficialIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="space-y-14 md:space-y-20">

      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-[#006B5B]/10 bg-[#FAFAF7]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#006B5B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006B5B]/10 border border-[#006B5B]/20 text-[#006B5B] text-xs md:text-sm font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>কুরআন ও সহীহ সুন্নাহর আলোকে পরিচালিত</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-28 md:h-32 mx-auto">
                <Image src="/sunnahlife_logo.svg" alt="সুন্নাহলাইফ" fill priority sizes="(max-width: 768px) 256px, 384px" className="object-contain" />
              </div>
              <div className="space-y-2 max-w-xl mx-auto pt-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#004D40] leading-snug tracking-tight">
                  কুরআন ও সহীহ সুন্নাহর আলোকে<br />নির্ভরযোগ্য রুকইয়াহ ও সেলফ-রুকইয়াহ সেবা
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium flex items-center justify-center gap-2 pt-0.5">
                  <span>লক্ষণ যাচাই</span><span className="text-[#006B5B] font-bold">•</span>
                  <span>পরামর্শ</span><span className="text-[#006B5B] font-bold">•</span>
                  <span>সেলফ-রুকইয়াহ গাইড</span>
                </p>
              </div>
            </div>
            <div className="w-full max-w-md md:max-w-3xl mx-auto space-y-3.5 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
                <Link href="/assessment" className="w-full p-2.5 sm:p-3 rounded-full bg-[#004D40] hover:bg-[#00382E] text-white shadow-md shadow-[#004D40]/20 transition-all flex items-center justify-between gap-2.5 group active:scale-98">
                  <div className="flex items-center gap-2.5 text-left pl-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-[#F2C94C]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-bold text-white leading-tight">লক্ষণ যাচাই করুন</div>
                      <div className="text-[11px] sm:text-xs text-emerald-100/90 font-normal mt-0.5 truncate">আপনার সমস্যাটি রুকইয়াহ-উপযোগী কিনা জানুন</div>
                    </div>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center shrink-0 text-white transition-colors mr-0.5">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
                <Link href="/self-ruqyah" className="w-full p-2.5 sm:p-3 rounded-full bg-white hover:bg-emerald-50/40 border-2 border-[#006B5B] text-gray-900 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-2.5 group active:scale-98">
                  <div className="flex items-center gap-2.5 text-left pl-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#006B5B] flex items-center justify-center shrink-0 text-white shadow-xs">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-bold text-[#004D40] leading-tight">সেলফ-রুকইয়াহ গাইড</div>
                      <div className="text-[11px] sm:text-xs text-gray-600 font-normal mt-0.5 truncate">নিজে রুকইয়াহ করার সঠিক পদ্ধতি জানুন</div>
                    </div>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 group-hover:bg-[#006B5B]/10 flex items-center justify-center shrink-0 text-[#006B5B] transition-colors mr-0.5">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
              <a
                href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সুন্নাহলাইফের রাক্বীর সাথে পরামর্শ করতে চাই")}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full max-w-md md:max-w-lg mx-auto p-2 sm:p-2.5 rounded-full bg-[#EAF7EE] hover:bg-[#dcf4e3] border border-[#25D366]/40 text-gray-900 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group active:scale-98"
              >
                <div className="flex items-center gap-3 text-left flex-1 min-w-0 pl-1.5 sm:pl-2">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 text-white shadow-xs">
                    <WhatsAppOfficialIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="h-6 w-px bg-gray-300/80 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-bold text-[#004D40] leading-tight truncate">WhatsApp-এ পরামর্শ নিন</div>
                    <div className="text-[11px] sm:text-xs text-gray-600 font-normal mt-0.5 truncate">প্রয়োজনে রাক্বীর সাথে যোগাযোগ করুন</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#25D366]/10 flex items-center justify-center shrink-0 text-gray-600 group-hover:text-[#25D366] transition-colors border border-gray-200/80 mr-1 sm:mr-1.5">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK CARDS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004D40]">শুরু করবেন?</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">সহজ পদ্ধতিতে নিজেকে আপনার রুকইয়াহ কার্যক্রম বেছে নিন</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/assessment" className="group flex flex-col bg-white border-2 border-[#006B5B]/20 hover:border-[#006B5B] rounded-3xl shadow-xs hover:shadow-md transition-all overflow-hidden relative">
            <div className="absolute top-3 right-3 bg-[#D4A017] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">★ জনপ্রিয়</div>
            <div className="flex items-center gap-4 p-5 pb-3">
              <div className="w-14 h-14 rounded-2xl bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center shrink-0 group-hover:bg-[#D4A017] group-hover:text-white transition-colors">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors leading-snug">লক্ষণ পরীক্ষা ও ডায়াগনেসিস</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">১৫টি প্রশ্নে আপনার সমস্যা রুকইয়াহ-উপযোগী কিনা জানুন।</p>
              </div>
            </div>
            <div className="px-5 pb-4 pt-1 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>প্রশ্ন শুরু করুন</span><ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/quran" className="group flex flex-col bg-white border-2 border-[#006B5B]/20 hover:border-[#006B5B] rounded-3xl shadow-xs hover:shadow-md transition-all overflow-hidden">
            <div className="flex items-center gap-4 p-5 pb-3">
              <div className="w-14 h-14 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center shrink-0 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors leading-snug">আল-কুরআনুল কারীম</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">১১৪টি সূরা, বাংলা অর্থ, অনুবাদ ও সহজে পড়ার সুবিধা।</p>
              </div>
            </div>
            <div className="px-5 pb-4 pt-1 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>কুরআন পড়ুন ও শিখুন</span><ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/audio" className="group flex flex-col bg-white border-2 border-[#006B5B]/20 hover:border-[#006B5B] rounded-3xl shadow-xs hover:shadow-md transition-all overflow-hidden">
            <div className="flex items-center gap-4 p-5 pb-3">
              <div className="w-14 h-14 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center shrink-0 group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                <Headphones className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#006B5B] transition-colors leading-snug">রুকইয়াহ ভিডিও লাইব্রেরি</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">রুকইয়াহ অডিও, দোয়া, আমল ও ইসলামিক পরামর্শের ভিডিও।</p>
              </div>
            </div>
            <div className="px-5 pb-4 pt-1 border-t border-gray-100 flex items-center text-xs font-semibold text-[#006B5B]">
              <span>ভিডিও দেখুন</span><ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#004D40]">আমাদের সকল সেবা</h2>
          <p className="text-xs text-gray-500 mt-1">প্রয়োজন অনুযায়ী বেছে নিন</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {([
            { href: "/assessment",  icon: "stethoscope", label: "লক্ষণ যাচাই",       color: "bg-[#D4A017]/10 text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-white" },
            { href: "/self-ruqyah",icon: "shield",       label: "সেলফ-রুকইয়াহ",    color: "bg-[#006B5B]/10 text-[#006B5B] group-hover:bg-[#006B5B] group-hover:text-white" },
            { href: "/quran",       icon: "book",        label: "আল-কুরআন",         color: "bg-[#006B5B]/10 text-[#006B5B] group-hover:bg-[#006B5B] group-hover:text-white" },
            { href: "/audio",       icon: "headphones",  label: "রুকইয়াহ অডিও",    color: "bg-[#006B5B]/10 text-[#006B5B] group-hover:bg-[#006B5B] group-hover:text-white" },
            { href: "/duas",        icon: "sparkles",    label: "মাসনুন দোয়া",      color: "bg-[#006B5B]/10 text-[#006B5B] group-hover:bg-[#006B5B] group-hover:text-white" },
            { href: "/appointment", icon: "calendar",    label: "অ্যাপয়েন্টমেন্ট", color: "bg-emerald-600/10 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white" },
          ] as const).map((item) => (
            <Link key={item.href} href={item.href} className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-[#006B5B]/15 hover:border-[#006B5B] shadow-xs hover:shadow-md transition-all text-center">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${item.color}`}>
                {item.icon === "stethoscope" && <Stethoscope className="w-5 h-5" />}
                {item.icon === "shield"       && <ShieldCheck className="w-5 h-5" />}
                {item.icon === "book"         && <BookOpen className="w-5 h-5" />}
                {item.icon === "headphones"   && <Headphones className="w-5 h-5" />}
                {item.icon === "sparkles"     && <Sparkles className="w-5 h-5" />}
                {item.icon === "calendar"     && <Calendar className="w-5 h-5" />}
              </div>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-[#006B5B] transition-colors leading-snug">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>



      {/* 6. APPOINTMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-10 rounded-3xl bg-radial from-[#006B5B] to-[#004D40] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-[#F2C94C] font-semibold tracking-wider uppercase">সরাসরি রাক্বীর সেবা</span>
            <h2 className="text-xl md:text-2xl font-bold">অনলাইন বা সরাসরি রুকইয়াহ অ্যাপয়েন্টমেন্ট?</h2>
            <p className="text-xs text-emerald-100 max-w-lg">অভিজ্ঞ শারঈ রাক্বীর সাথে অনলাইন বা সরাসরি পরামর্শ নিন।</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link href="/services" className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center">সেবা ও ফি তালিকা</Link>
            <Link href="/appointment" className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#D4A017] hover:bg-[#F2C94C] text-[#004D40] font-bold text-sm shadow-lg transition-transform active:scale-95 text-center">অ্যাপয়েন্টমেন্ট বুকিং করুন</Link>
          </div>
        </div>
      </section>

      {/* 7. FRAUD AWARENESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" /><span>জরুরি সচেতনতা</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">কীভাবে চিনবেন ভণ্ড কবিরাজ ও প্রতারক?</h3>
            <p className="text-xs text-gray-600 max-w-2xl">মায়ের নাম জিজ্ঞেস করা, কুফরী তাবীজ বা ১০০% আরোগ্যের প্রতিশ্রুতি — এসব শিরক।</p>
          </div>
          <Link href="/fraud-awareness" className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 shadow-xs transition-colors flex items-center gap-2">
            <span>১০টি আলামত জানুন</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
