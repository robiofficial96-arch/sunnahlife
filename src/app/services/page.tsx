import { Metadata } from "next";
import Link from "next/link";
import { 
  Stethoscope,
  Flame,
  Eye,
  Sparkles,
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  ArrowRight,
  Target,
  ClipboardList,
  Lightbulb,
  ThumbsUp,
  Coins
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ ও সেশন ফি | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক শারঈ রুকইয়াহ ডায়াগনোসিস, জিনের রুকইয়াহ, বদনজরের রুকইয়াহ ও সিহর বিনষ্টকরণ সেশন ফি ও কার্যপ্রণালী।",
};

const SERVICES = [
  {
    id: "jinn",
    title: "জিনের রুকইয়াহ (জিন স্পর্শ ও উপদ্রব নিবারণ)",
    subtitle: "জিনের আক্রমণ, আসর, ভর করা, অবচেতন আচরণ ও তীব্র ভীতি দূরীকরণে নিবিড় সেশন",
    icon: Flame,
    fee: "৫,০০০ - ৮,০০০/=",
    duration: "১ - ২ - ৩ ঘণ্টা+",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    whoIsItFor: "যাঁরা জিন দ্বারা আক্রান্ত, হঠাৎ খিঁচুনি বা অজ্ঞান হয়ে যাওয়া, রাতে বা নির্জনে মারাত্মক ভীতি ও শ্বাসকষ্ট, মেজাজ হঠাৎ হিংস্র হওয়া বা অবচেতন অবস্থায় অস্বাভাবিক আচরণ করেন।",
    process: [
      "অভিজ্ঞ শারঈ রাক্বীর সরাসরি উপস্থিতিতে বিশেষ আযাব ও অপশক্তি দাহ্যকারী আয়াতসমূহ তিলাওয়াত।",
      "জিনের অবস্থান ও কারণ চিহ্নিত করে কুরআন-সুন্নাহর বিধান অনুযায়ী কঠোর সতর্কবার্তা ও বহিষ্কার তিলাওয়াত।",
      "রোগীর শারীরিক ও মানসিক অবস্থা নিবিড়ভাবে পর্যবেক্ষণ করে জিনের অপপ্রভাব নিষ্কাশন।",
      "রুকইয়াহকৃত তেল ও পানি প্রস্তুত করে পরবর্তী ৩-৭ দিনের সুন্নাহ আমল ও পর্যবেক্ষণ বুঝিয়ে দেওয়া।",
      "নারী রোগীদের ক্ষেত্রে শালীনতা, পূর্ণাঙ্গ পর্দা ও উপযুক্ত মাহরামের উপস্থিতি বাধ্যতামূলক।",
    ],
    schedule: "শনিবার থেকে বৃহস্পতিবার (সকাল ১০:০০ - রাত ৯:০০)",
    bookingId: "jinn",
  },
  {
    id: "evil_eye",
    title: "বদনজর ও হাসাদের রুকইয়াহ",
    subtitle: "মানুষের হিংসুটে চোখ, কুনজর ও হাসাদের বিষাক্ত প্রভাব বিনষ্টকারী সুন্নাহ চিকিৎসা",
    icon: Eye,
    fee: "৩,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
    whoIsItFor: "বিনা কারণে দীর্ঘস্থায়ী ক্লান্তি ও অবসাদ, ক্রমাগত হাই তোলা ও মাথা ঝিমঝিম করা, চেহারা ফ্যাকাশে হওয়া, ডাক্তারি টেস্টে রোগ ধরা না পড়া, ব্যবসা বা পড়াশোনায় হঠাৎ অব্যাখ্যাত বিপর্যয়।",
    process: [
      "বদনজর ও হিংসা মুক্তির সহীহ হাদিস বর্ণিত মাসনুন দোয়া ও সুনির্দিষ্ট কুরআনি আয়াত পাঠ।",
      "রোগীর প্রতিক্রিয়া (চোখ দিয়ে পানি পড়া, ঢেকুর ওঠা, কাঁপুনি, ঘাম) নিবিড়ভাবে পর্যবেক্ষণ।",
      "রুকইয়াহ করা পানি দ্বারা বিশেষ সুন্নাহ গোসলের নিয়ম শিখিয়ে দেওয়া।",
      "সকাল-সন্ধ্যার হিফযের আযকার ও গৃহের সার্বক্ষণিক সুরক্ষার আমল প্রদান।",
    ],
    schedule: "প্রতিদিন (সকাল ১০:০০ - রাত ১০:০০)",
    bookingId: "evil_eye",
  },
  {
    id: "sihr",
    title: "জাদুর রুকইয়াহ (সিহর বিনষ্টকরণ)",
    subtitle: "বিচ্ছেদ, বিবাহে বাধা, দীর্ঘ রোগব্যাধি বা সর্বনাশের উদ্দেশ্যে করা জাদুটোনা ধ্বংসের রুকইয়াহ",
    icon: Sparkles,
    fee: "৪,৫০০/=",
    duration: "১ - ২ ঘণ্টা",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
    whoIsItFor: "স্বামী-স্ত্রীর মাঝে অহেতুক চরম ঘৃণা ও বিচ্ছেদ (সিহরুত তাফরিক্ব), বিবাহে বারবার অনাকাঙ্ক্ষিত বাধা, পেটে দীর্ঘদিনের অস্বাভাবিক যন্ত্রণা, বারবার ভয়ংকর দুঃস্বপ্ন বা মৃত্যুভীতিতে আক্রান্ত ব্যক্তি।",
    process: [
      "জাদুর কুফরি বাঁধন ছিন্নকারী বিশেষ 'আয়াতুস সিহর' দ্বারা দীর্ঘ সময় ধরে সরাসরি দম (ফুঁ) করা।",
      "খাওয়া বা পান করা জাদু হলে পেট পরিষ্কারে প্রাকৃতিক শারঈ সেন্না পাতা ও ভেষজ ডিটক্স গাইড।",
      "পুঁতে রাখা বা ছিটানো জাদুর আলামত অনুসন্ধান ও তা শরিয়াহসম্মতভাবে ধ্বংস করার পদ্ধতি।",
      "পরিবার ও গৃহের সুরক্ষায় সূরা বাকারা ও বিশেষ হিফয রুটিনের নির্দেশনা।",
    ],
    schedule: "শনিবার থেকে বৃহস্পতিবার (সকাল ১০:০০ - রাত ৯:০০)",
    bookingId: "sihr",
  },
  {
    id: "family",
    title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
    subtitle: "সংসারে অহেতুক বিবাদ, স্বামী-স্ত্রীর তীব্র ভুল বোঝাবুঝি ও পরিবারের কুপ্রভাব দূরীকরণ",
    icon: Users,
    fee: "আলোচনা সাপেক্ষে",
    duration: "১ - ১.৫ ঘণ্টা",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
    whoIsItFor: "স্বামী-স্ত্রীর মাঝে বিনা কারণে তীব্র কলহ, বিয়েতে বারবার অযাচিত বাধা বা পরিবারের মানসিক ও আত্মিক অস্থিরতায় আক্রান্ত সদস্যগণ।",
    process: [
      "উভয় পক্ষের বক্তব্য শারঈ দৃষ্টিকোণ থেকে শোনা ও মানসিক বিষয়াদি নিবিড়ভাবে যাচাই।",
      "বিচ্ছেদ সৃষ্টিকারী সিহর (সিহরুত তাফরিক্ব) এর লক্ষণ পরীক্ষা।",
      "ঘর ও পরিবারের সুরক্ষায় সূরা বাকারা ও বিশেষ মাসনুন আমলের দিকনির্দেশনা।",
      "পরস্পরের প্রতি সহানুভূতি ও ক্ষমাশীলতার সুন্নাহ নসীহত প্রদান।",
    ],
    schedule: "অ্যাপয়েন্টমেন্ট ভিত্তিক",
    bookingId: "family_counseling",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহ মোতাবেক সেবা ও ফি কাঠামো</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          আমাদের শারঈ রুকইয়াহ সেবাসমূহ
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহর প্রামাণ্য নীতিমালায় পরিচালিত নির্ভরযোগ্য ডায়াগনোসিস ও চিকিৎসা সেবা। কোনো প্রকার কুসংস্কার বা ভণ্ডামিমুক্ত শারঈ সমাধান।
        </p>
      </div>

      {/* TOP FEATURED CARD: DIAGNOSIS & ADVICE (From Official Flyer) */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border-2 border-[#006B5B] shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Diagnosis Fees */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#006B5B] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-6 h-6 text-[#F2C94C]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
                  প্রাথমিক পরীক্ষা ও স্ক্রিনিং
                </span>
                <h2 className="text-xl md:text-2xl font-black text-[#004D40]">
                  ডায়াগনোসিস (চেকআপ) ফি
                </h2>
              </div>
            </div>

            {/* Fee Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">একক রোগী</span>
                  <span className="text-xl font-black text-[#006B5B]">১,০০০ টাকা</span>
                </div>
                <span className="text-xs bg-[#006B5B]/10 text-[#006B5B] font-bold px-3 py-1 rounded-xl">
                  ১ জন
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">পরিবারসহ (সমন্বিত)</span>
                  <span className="text-xl font-black text-[#006B5B]">২,০০০ টাকা</span>
                </div>
                <span className="text-xs bg-[#D4A017]/20 text-[#B3830D] font-bold px-3 py-1 rounded-xl">
                  ফুল ফ্যামিলি
                </span>
              </div>
            </div>

            {/* Duration & Purpose Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-700">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>শুধু সমস্যার ধরন নির্ণয়ের জন্য</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>সময়: ৩০ - ৪৫ মিনিট</span>
              </span>
            </div>
          </div>

          {/* Right: Advice Box (Exact quote from flyer) */}
          <div className="lg:col-span-5 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#006B5B]/5 to-[#D4A017]/10 border border-[#006B5B]/20 space-y-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#004D40] font-bold text-sm md:text-base">
              <Lightbulb className="w-5 h-5 text-[#D4A017]" />
              <span>শারঈ পরামর্শ:</span>
            </div>

            <p className="text-xs md:text-sm text-gray-800 font-semibold leading-relaxed">
              "আপনি ট্রিটমেন্ট খরচ ভাবার আগে, শুধু ডায়াগনোসিস করে দেখে নিন।"
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-start gap-2.5">
              <ThumbsUp className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
              <span>যদি সমস্যা না থাকে, তাহলে আর কোনো চিকিৎসার খরচ নেই, ইনশাআল্লাহ।</span>
            </div>

            <Link
              href="/appointment?service=diagnosis_single"
              className="w-full py-3 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-center text-xs md:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#F2C94C]" />
              <span>ডায়াগনোসিস বুকিং করুন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Services List (Core Treatments with exact flyer fees) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-[#004D40] flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#D4A017]" />
            <span>সমস্যাভিত্তিক পূর্ণাঙ্গ চিকিৎসা ও সেশন ফি</span>
          </h2>
          <span className="text-xs text-gray-500 hidden sm:inline">চেম্বার ও অনলাইন উভয় মাধ্যমে উপলব্ধ</span>
        </div>

        <div className="space-y-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-6 transition-all hover:border-[#006B5B]/40"
              >
                {/* Top Title & Fee Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] shrink-0 mt-1">
                      <Icon className="w-7 h-7 text-[#006B5B]" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
                        {srv.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#006B5B] font-semibold mt-0.5">
                        {srv.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Fee & Duration Badges */}
                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
                    <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#006B5B] to-[#004D40] text-white shadow-xs">
                      <span className="text-[10px] text-emerald-200 block uppercase font-medium">সেশন ফি</span>
                      <strong className="text-base md:text-lg font-mono font-black text-[#F2C94C]">
                        {srv.fee}
                      </strong>
                    </div>
                    <span className="text-xs bg-[#D4A017]/15 text-[#B3830D] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 border border-[#D4A017]/30">
                      <Clock className="w-3.5 h-3.5" />
                      <span>সময়: {srv.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                  {/* Left: Who it is for & process */}
                  <div className="space-y-4">
                    <div>
                      <strong className="text-gray-900 flex items-center gap-1.5 font-bold mb-1">
                        <Target className="w-3.5 h-3.5 text-[#006B5B]" />
                        <span>সেবাটি কাদের জন্য:</span>
                      </strong>
                      <p className="text-gray-600 leading-relaxed">
                        {srv.whoIsItFor}
                      </p>
                    </div>

                    <div>
                      <strong className="text-gray-900 flex items-center gap-1.5 font-bold mb-2">
                        <ClipboardList className="w-3.5 h-3.5 text-[#006B5B]" />
                        <span>সেশনের শারঈ কার্যপ্রণালী (কিভাবে করা হয়):</span>
                      </strong>
                      <ul className="space-y-2 text-gray-600">
                        {srv.process.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Booking Card & Schedule */}
                  <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/15 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500 text-xs block font-medium">নির্ধারিত হাদিয়া / সেশন ফি:</span>
                        <strong className="text-lg md:text-xl font-black text-[#004D40] font-mono">
                          {srv.fee}
                        </strong>
                      </div>

                      <div>
                        <span className="text-gray-500 text-xs block font-medium">সেশনের গড় সময়কাল:</span>
                        <span className="text-xs text-gray-800 font-bold">
                          {srv.duration}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-500 text-xs block font-medium">উপলব্ধ সময়সূচী:</span>
                        <span className="text-xs text-gray-700 font-medium">
                          {srv.schedule}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-gray-200/80 text-[11px] text-gray-600 flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B] shrink-0 mt-0.5" />
                        <span><em>পর্দা ও নিরাপত্তা:</em> চেম্বারে উপস্থিত হলে নারী রোগীদের ক্ষেত্রে মাহরামের উপস্থিতি বাধ্যতামূলক।</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Link
                        href={`/appointment?service=${srv.bookingId}`}
                        className="w-full py-3 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-center text-xs md:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                      >
                        <Calendar className="w-4 h-4 text-[#F2C94C]" />
                        <span>এই সেবার জন্য বুকিং দিন</span>
                      </Link>
                      <a
                        href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(`আসসালামু আলাইকুম। আমি "${srv.title}" সেবাটির বিষয়ে জানতে এবং অ্যাপয়েন্টমেন্ট নিতে চাচ্ছি।`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-center text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200"
                      >
                        <MessageCircle className="w-4 h-4 text-[#006B5B]" />
                        <span>WhatsApp-এ সরাসরি কথা বলুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shariah FAQ / Guidance Note */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#FAFAF7] border border-[#006B5B]/20 text-center space-y-4 shadow-xs">
        <h3 className="text-lg md:text-xl font-bold text-[#004D40]">
          কোন সেবাটি আপনার জন্য উপযুক্ত বুঝতে পারছেন না?
        </h3>
        <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          প্রথমে আমাদের লক্ষণ চেকারে ১৫টি প্রশ্নের মাধ্যমে নিজের বা পরিবারের লক্ষণগুলো ফ্রিতে পরীক্ষা করে নিন অথবা সরাসরি হোয়াটসঅ্যাপে রাক্বীকে আপনার সমস্যার কথা জানান।
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/assessment"
            className="px-6 py-3 rounded-xl bg-[#006B5B] text-white font-bold text-xs md:text-sm hover:bg-[#004D40] shadow-xs flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-[#F2C94C]" />
            <span>লক্ষণ পরীক্ষা করুন</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। আমি সমস্যার বিষয়ে রাক্বীর পরামর্শ চাচ্ছি।")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white border border-emerald-600 text-[#006B5B] font-bold text-xs md:text-sm hover:bg-emerald-50 flex items-center gap-2 shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp পরামর্শ</span>
          </a>
        </div>
      </div>
    </div>
  );
}
