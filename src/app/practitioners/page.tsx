import { Metadata } from "next";
import Link from "next/link";
import { 
  UserCheck, 
  MapPin, 
  Award, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "অনুমোদিত শারঈ রাক্বী ডিরেক্টরি | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক রুকইয়াহ প্রদানকারী পরীক্ষিত ও নির্ভরযোগ্য শারঈ রাক্বীদের তালিকা।",
};

interface Practitioner {
  id: string;
  name: string;
  title: string;
  qualification: string;
  location: string;
  chamberAddress: string;
  experience: string;
  isVerified: boolean;
  services: string[];
  phone: string;
}

const PRACTITIONERS: Practitioner[] = [
  {
    id: "p-1",
    name: "মাওলানা আব্দুল্লাহ আল-মামুন",
    title: "প্রধান শারঈ রাক্বী ও গবেষক",
    qualification: "দাওরায়ে হাদীস, তাখাসসুস ফিল ফিকহ ও ইসলামিক স্টাডিজ",
    location: "ঢাকা (মিরপুর ও উত্তরা)",
    chamberAddress: "মিরপুর-১০, ঢাকা",
    experience: "১০+ বছর",
    isVerified: true,
    services: ["অনলাইন কনসালটেশন", "সরাসরি সেশন", "পারিবারিক রুকইয়াহ"],
    phone: SITE_CONFIG.raqiWhatsAppNumber,
  },
  {
    id: "p-2",
    name: "মুফতি মাহমুদুল হাসান",
    title: "শারঈ উপদেষ্টা ও সিনিয়র রাক্বী",
    qualification: "মুফতি ও মুহাদ্দিস, দারুল উলুম",
    location: "চট্টগ্রাম (চকবাজার)",
    chamberAddress: "চকবাজার, চট্টগ্রাম",
    experience: "৮+ বছর",
    isVerified: true,
    services: ["সিহর ও জাদু বিনাশ", "বদনজর রুকইয়াহ", "অনলাইন সেশন"],
    phone: SITE_CONFIG.raqiWhatsAppNumber,
  },
  {
    id: "p-3",
    name: "হাফেজ ক্বারী নুরুল ইসলাম",
    title: "রুকইয়াহ শারইয়্যাহ প্র্যাকটিশনার",
    qualification: "হাফেজে কুরআন ও তাফসীর বিভাগ",
    location: "সিলেট (আম্বরখানা)",
    chamberAddress: "আম্বরখানা, সিলেট",
    experience: "৬+ বছর",
    isVerified: true,
    services: ["ঘুমের সমস্যা ও দুঃস্বপ্ন", "বাচ্চাদের সুরক্ষা", "চেম্বার সেশন"],
    phone: SITE_CONFIG.raqiWhatsAppNumber,
  },
];

export default function PractitionersPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>ভেরিফাইড শারঈ প্র্যাকটিশনার</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          অনুমোদিত শারঈ রাক্বী ডিরেক্টরি
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          যাঁরা ১০০% সহীহ আক্বীদা, কুসংস্কারমুক্ত ও খাঁটি সুন্নাহ মোতাবেক রুকইয়াহ শারইয়্যাহ পরিচালনা করেন তাঁদের যাচাইকৃত তালিকা।
        </p>
      </div>

      {/* Verification Standards Notice */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-[#006B5B]/20 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-[#006B5B]">যাচাইকরণ মানদণ্ড:</strong> এই তালিকায় শুধুমাত্র তাঁদেরকেই যুক্ত করা হয় যাঁরা কোনো প্রকার তাবীজ, গণকবিদ্যা বা শিরকি প্রক্রিয়ায় জড়িত নন এবং ইসলামিক শরিয়তের পর্দা ও আমানতদারিতা কঠোরভাবে মেনে চলেন।
        </div>
      </div>

      {/* Practitioners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRACTITIONERS.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#006B5B] font-medium mt-0.5">
                    {p.title}
                  </p>
                </div>
                {p.isVerified && (
                  <span className="p-1 rounded-full bg-[#006B5B]/10 text-[#006B5B]" title="যাচাইকৃত">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                  </span>
                )}
              </div>

              {/* Qualifications */}
              <div className="text-xs text-gray-600 space-y-1.5 pt-2 border-t border-gray-100">
                <div className="flex items-start gap-1.5">
                  <Award className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                  <span>{p.qualification}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#006B5B] shrink-0" />
                  <span className="font-semibold text-gray-800">{p.location}</span>
                </div>
                <div className="text-[11px] text-gray-400 pl-5">
                  অভিজ্ঞতা: {p.experience}
                </div>
              </div>

              {/* Services tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.services.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[#FAFAF7] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/appointment"
                className="w-full py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F2C94C]" />
                <span>অ্যাপয়েন্টমেন্ট নিন</span>
              </Link>
              <a
                href={`https://wa.me/${p.phone}?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A7%A4%20%E0%A6%B8%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%BE%E0%A6%B9%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%AB%20%E0%A6%A5%E0%A7%87%E0%A6%95%E0%A7%87%20%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%8D%E0%A6%B6%20%E0%A6%9A%E0%A6%BE%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A6%BF`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold text-center hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>WhatsApp মেসেজ</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
