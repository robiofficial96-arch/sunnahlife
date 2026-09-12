import { Metadata } from "next";
import Link from "next/link";
import { 
  Video, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  ArrowRight,
  HelpCircle,
  Target,
  ClipboardList
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক অনলাইন রুকইয়াহ কনসালটেশন, চেম্বারে সরাসরি সেশন ও পারিবারিক কাউন্সেলিং সেবা।",
};

const SERVICES = [
  {
    id: "online",
    title: "অনলাইন শারঈ রুকইয়াহ কনসালটেশন",
    subtitle: "দূরবর্তী ও প্রবাসী ভাই-বোনদের জন্য সরাসরি ভিডিও/অডিও কলে পরামর্শ",
    icon: Video,
    duration: "৪৫ মিনিট",
    whoIsItFor: "যাঁরা দূরবর্তী জেলায় বা প্রবাসে অবস্থান করছেন এবং সরাসরি চেম্বারে আসতে পারছেন না।",
    process: [
      "নির্ধারিত সময়ে WhatsApp ভিডিও বা অডিও কলে যুক্ত হওয়া।",
      "লক্ষণ ও পারিবারিক পরিস্থিতি নিয়ে খোলামেলা শারঈ আলোচনা।",
      "সমস্যা চিহ্নিতকরণ ও কুরআন-সুন্নাহ মোতাবেক আমলের প্রেসক্রিপশন প্রদান।",
      "সেলফ-রুকইয়াহ ও হিফযের আযকারের বিস্তারিত গাইডলাইন বুঝিয়ে দেওয়া।",
    ],
    pricing: "হাদিয়া সাধ্যমতো / আলোচনা সাপেক্ষে (অসচ্ছলদের জন্য ফ্রি)",
    schedule: "প্রতিদিন সকাল ১০:০০ - রাত ১০:০০ (অ্যাপয়েন্টমেন্ট সাপেক্ষে)",
  },
  {
    id: "in_person",
    title: "সরাসরি চেম্বারে রুকইয়াহ সেশন",
    subtitle: "চেম্বারে উপস্থিত হয়ে অভিজ্ঞ শারঈ রাক্বীর সরাসরি তত্ত্বাবধানে রুকইয়াহ গ্রহণ",
    icon: MapPin,
    duration: "৬০ মিনিট",
    whoIsItFor: "যাঁদের লক্ষণ অত্যন্ত তীব্র (যেমন: খিঁচুনি, অজ্ঞান হওয়া, প্রচণ্ড ভীতি) এবং শারঈ রাক্বীর সরাসরি উপস্থিতি প্রয়োজন।",
    process: [
      "চেম্বারে উপস্থিত হওয়ার পর প্রাথমিক কেস হিস্ট্রি গ্রহণ।",
      "পবিত্রতা ও পর্দার সর্বোচ্চ বিধান মেনে শান্ত পরিবেশে তিলাওয়াত শ্রবণ।",
      "শারীরিক প্রতিক্রিয়া (হাই তোলা, কাঁপুনি, কান্না) নিবিড়ভাবে পর্যবেক্ষণ।",
      "রুকইয়াহকৃত পানি ও তেল প্রস্তুত করে নিয়মিত ব্যবহারের নির্দেশনা প্রদান।",
    ],
    pricing: "শারঈ হাদিয়া / আলোচনা সাপেক্ষে",
    schedule: "শনিবার থেকে বৃহস্পতিবার (সকাল ১১:০০ - সন্ধ্যা ৬:০০)",
  },
  {
    id: "family",
    title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
    subtitle: "সংসারে অহেতুক বিবাদ, স্বামী-স্ত্রীর তীব্র ঘৃণা ও জাদুটোনার প্রভাব দূরীকরণ",
    icon: Users,
    duration: "৬০ - ৭৫ মিনিট",
    whoIsItFor: "স্বামী-স্ত্রীর মাঝে বিনা কারণে তীব্র কলহ, বিয়েতে বারবার অযাচিত বাধা বা পরিবারের অস্থিরতায় আক্রান্ত ব্যক্তিগণ।",
    process: [
      "উভয় পক্ষের বক্তব্য শারঈ দৃষ্টিকোণ থেকে শোনা ও মানসিক বিষয়াদি যাচাই।",
      "বিচ্ছেদ সৃষ্টিকারী সিহর (সিহরুত তাফরিক্ব) এর লক্ষণ পরীক্ষা।",
      "ঘর ও পরিবারের সুরক্ষায় সূরা বাকারা ও বিশেষ মাসনুন আমলের দিকনির্দেশনা।",
      "পরস্পরের প্রতি সহানুভূতি ও ক্ষমাশীলতার সুন্নাহ নসীহত প্রদান।",
    ],
    pricing: "শারঈ হাদিয়া সাপেক্ষে",
    schedule: "অ্যাপয়েন্টমেন্ট ভিত্তিক",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সুন্নাহ মোতাবেক সেবা</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          আমাদের শারঈ রুকইয়াহ সেবাসমূহ
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          আমরা কোনো কবিরাজি বা কুসংস্কারের সেবা প্রদান করি না। আমাদের সকল সেবা কুরআন ও সহীহ হাদিস এবং সালাফদের নির্দেশিত শারঈ নীতিমালার অধীন।
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="p-6 md:p-10 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-6"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] shrink-0 mt-1">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {srv.title}
                    </h2>
                    <p className="text-xs md:text-sm text-[#006B5B] font-medium mt-0.5">
                      {srv.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <span className="text-xs bg-[#D4A017]/15 text-[#B3830D] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {srv.duration}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                {/* Left: Who it is for & process */}
                <div className="space-y-4">
                  <div>
                    <strong className="text-gray-900 flex items-center gap-1.5 font-semibold mb-1">
                      <Target className="w-3.5 h-3.5 text-[#006B5B]" />
                      <span>সেবাটি কাদের জন্য:</span>
                    </strong>
                    <p className="text-gray-600 leading-relaxed">
                      {srv.whoIsItFor}
                    </p>
                  </div>

                  <div>
                    <strong className="text-gray-900 flex items-center gap-1.5 font-semibold mb-2">
                      <ClipboardList className="w-3.5 h-3.5 text-[#006B5B]" />
                      <span>সেশনের কার্যপ্রণালী:</span>
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

                {/* Right: Pricing & schedule box */}
                <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-500 text-xs block">হাদিয়া / পারিশ্রমিক:</span>
                      <strong className="text-sm md:text-base text-[#004D40]">
                        {srv.pricing}
                      </strong>
                    </div>

                    <div>
                      <span className="text-gray-500 text-xs block">উপলব্ধ সময়সূচী:</span>
                      <span className="text-xs text-gray-700 font-medium">
                        {srv.schedule}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200/60 text-[11px] text-gray-600 flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B] shrink-0 mt-0.5" />
                      <span><em>পর্দা ও নিরাপত্তা:</em> নারী রোগীদের ক্ষেত্রে অবশ্যই মাহরামের উপস্থিতি বাধ্যতামূলক।</span>
                    </div>
                  </div>

                  <Link
                    href="/appointment"
                    className="w-full py-3 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-center text-xs md:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#F2C94C]" />
                    <span>এই সেবার জন্য বুকিং দিন</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shariah FAQ Note */}
      <div className="p-6 md:p-8 rounded-3xl bg-radial from-white to-[#FAFAF7] border border-[#006B5B]/20 text-center space-y-3">
        <h3 className="text-lg md:text-xl font-bold text-[#004D40]">
          কোন সেবাটি আপনার জন্য উপযুক্ত বুঝতে পারছেন না?
        </h3>
        <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto">
          প্রথমে আমাদের লক্ষণ চেকারে লক্ষণগুলো পরীক্ষা করে নিন অথবা সরাসরি হোয়াটসঅ্যাপে রাক্বীকে আপনার সমস্যার কথা জানান।
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/assessment"
            className="px-6 py-2.5 rounded-xl bg-[#006B5B] text-white font-bold text-xs hover:bg-[#004D40]"
          >
            লক্ষণ পরীক্ষা করুন
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। সেবার বিষয়ে জানতে চাই")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl border border-emerald-600 text-[#006B5B] font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp পরামর্শ</span>
          </a>
        </div>
      </div>
    </div>
  );
}
