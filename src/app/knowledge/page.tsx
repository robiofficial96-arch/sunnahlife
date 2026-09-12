import { Metadata } from "next";
import Link from "next/link";
import { 
  BookOpen, 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "রুকইয়াহ জ্ঞান ও শারঈ নীতিমালা | সুন্নাহলাইফ",
  description: "রুকইয়াহ কী, রুকইয়াহ কী নয়, শারঈ রুকইয়াহর ৩টি আবশ্যক শর্ত এবং কারা রুকইয়াহ করতে পারেন।",
};

export default function KnowledgePage() {
  const ruqyahIsNot = [
    {
      title: "যাদু বা তন্ত্র-মন্ত্র নয়",
      desc: "যাদুকররা শয়তান ও জিনের উপাসনা করে অপবিত্র প্রক্রিয়ায় কাজ করে। রুকইয়াহ কেবল এক আল্লাহর কালামের দ্বারা করা হয়।",
    },
    {
      title: "গণনা বা ভবিষ্যৎবাণী নয়",
      desc: "কে যাদু করেছে বা ভবিষ্যতে কী ঘটবে তা রুকইয়াহর মাধ্যমে জানা সম্ভব নয়। এ জাতীয় দাবি করা কুফরি।",
    },
    {
      title: "জিন চালনা বা জিনের সাথে চুক্তি নয়",
      desc: "জিনের সাথে বন্ধুত্ব করা বা তাদের মাধ্যমে কাজ করানো শরিয়তে সম্পূর্ণ নিষিদ্ধ। রুকইয়াহ জিনের অত্যাচার থেকে আশ্রয় প্রার্থনার মাধ্যম।",
    },
    {
      title: "তাবীজ-কবচ ঝুলানো নয়",
      desc: "রাসূলুল্লাহ (ﷺ) কোনো সাহাবীকে তাবীজ দেননি, বরং সরাসরি মুখের আওয়াজে তিলাওয়াত করে ফুঁক দিয়েছেন।",
    },
    {
      title: "নিশ্চিত ১০০% আরোগ্যের মিথ্যা গ্যারান্টি নয়",
      desc: "শেফার একমাত্র মালিক আল্লাহ সুবহানাহু ওয়া তাআলা। মানুষের দায়িত্ব কেবল সঠিক পদ্ধতিতে চেষ্টা করা।",
    },
  ];

  const threeConditions = [
    {
      num: "১",
      title: "আল্লাহর কালাম ও আসমাউল হুসনা দ্বারা হওয়া",
      desc: "তিলাওয়াত অবশ্যই পবিত্র কুরআনুল কারীমের আয়াত অথবা আল্লাহর সুন্দর নামসমূহ ও রাসুলুল্লাহ (ﷺ) বর্ণিত সহীহ দোয়ার মাধ্যমে হতে হবে।",
    },
    {
      num: "২",
      title: "স্পষ্ট ও বোধগম্য আরবি ভাষায় হওয়া",
      desc: "ঝাড়ফুঁকের প্রতিটি শব্দ বোধগম্য হতে হবে। কোনো প্রকার অস্পষ্ট ফিসফিসানি, দুর্বোধ্য চিহ্ন বা অপরিচিত সংকেত সম্পূর্ণ নিষিদ্ধ।",
    },
    {
      num: "৩",
      title: "আল্লাহর ওপর তাওয়াক্কুল থাকা",
      desc: "এই বিশ্বাস রাখতে হবে যে রুকইয়াহর নিজস্ব কোনো ক্ষমতা নেই; আরোগ্য বা শেফা দেওয়ার একমাত্র ক্ষমতা আল্লাহর হাতে।",
    },
  ];

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>ইসলামিক বিশুদ্ধ জ্ঞান</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ কী ও এর শারঈ নীতিমালা
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহর আলোকে রুকইয়াহ শারইয়্যাহর পরিচয়, আবশ্যিক শর্তসমূহ এবং কুসংস্কার ও শিরক থেকে বাঁচার পথনির্দেশ।
        </p>
      </div>

      {/* 1. What is Ruqyah */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#004D40] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#006B5B]" />
          রুকইয়াহ কী? (What is Ruqyah)
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          'রুকইয়াহ' (الرقية) একটি আরবি শব্দ, যার অর্থ ঝাড়ফুঁক বা আশ্রয় প্রার্থনা করা। ইসলামিক পরিভাষায়—কুরআনুল কারীমের আয়াত, আল্লাহর আসমাউল হুসনা (সুন্দর নামসমূহ) ও গুণাবলী এবং রাসুলুল্লাহ (ﷺ) বর্ণিত সহীহ দোয়াসমূহ পাঠ করে অসুস্থ ব্যক্তির জন্য আরোগ্য ও অনিষ্ট থেকে সুরক্ষা প্রার্থনা করাই হলো <strong>রুকইয়াহ শারইয়্যাহ</strong>।
        </p>
        <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/15 text-xs md:text-sm text-emerald-950 leading-relaxed">
          হাদীস শরীফে এসেছে: হযরত আউফ ইবনে মালিক (রা.) বলেন, আমরা জাহেলী যুগে ঝাড়ফুঁক করতাম। আমরা রাসুলুল্লাহ (ﷺ)-কে জিজ্ঞেস করলাম, এ ব্যাপারে আপনার হুকুম কী? তিনি বললেন: <em>“তোমাদের ঝাড়ফুঁক আমার কাছে পেশ করো। যে ঝাড়ফুঁকে কোনো শিরক নেই, তাতে কোনো অসুবিধা নেই।”</em> (সহীহ মুসলিম: ২২০০)
        </div>
      </div>

      {/* 2. Three Conditions of Shariah Ruqyah */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#004D40]">
          শারঈ রুকইয়াহর ৩টি আবশ্যক শর্ত
        </h2>
        <p className="text-xs md:text-sm text-gray-500">
          হাফেজ ইবনে হাজার আসকালানী (রহ.) আলেমদের সর্বসম্মত ৩টি মূল শর্ত উল্লেখ করেছেন:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {threeConditions.map((cond) => (
            <div
              key={cond.num}
              className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="w-8 h-8 rounded-full bg-[#006B5B] text-white font-bold text-sm flex items-center justify-center mb-3">
                  {cond.num}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {cond.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {cond.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. What Ruqyah is NOT */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-lg">
          <XCircle className="w-5 h-5 text-rose-600" />
          <span>রুকইয়াহ কী নয়? (ভুল ধারণা ও সতর্কতা)</span>
        </div>
        <p className="text-xs md:text-sm text-gray-600">
          আমাদের সমাজে ঝাড়ফুঁকের নামে অনেক বিদআত ও শিরকি কর্মকাণ্ড ছড়িয়ে আছে। নিচের বিষয়গুলো রুকইয়াহর অন্তর্ভুক্ত নয়:
        </p>
        <div className="space-y-3">
          {ruqyahIsNot.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
              <div>
                <strong className="text-sm text-rose-900 block font-semibold">{item.title}</strong>
                <span className="text-xs text-rose-800 leading-relaxed">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Who can perform Ruqyah */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#004D40] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#006B5B]" />
          কারা রুকইয়াহ করতে পারেন?
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          রুকইয়াহ কোনো বিশেষ পেশা বা বংশগত অলৌকিক ক্ষমতা নয়। <strong>প্রত্যেক সচেতন মুসলিম নিজেই নিজের ওপর এবং পরিবারের ওপর রুকইয়াহ করতে পারেন।</strong>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 mb-1">১. সাধারণ সেলফ-রুকইয়াহ:</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              ঈমানদার যেকেউ সহীহ নিয়ত, অযু ও তাওবাহর মাধ্যমে সূরা ফাতিহা, আয়াতুল কুরসী ও ৩ কুল পড়ে নিজের গায়ে ফুঁ দিতে পারেন।
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 mb-1">২. শারঈ রাক্বী (চিকিৎসক):</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              জটিল পরিস্থিতিতে অভিজ্ঞ আলেম বা শারঈ রাক্বী সাহায্য করতে পারেন যিনি দ্বীনদার, মুত্তাকী এবং কুরআনের সহীহ জ্ঞানসম্পন্ন।
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 md:p-8 rounded-3xl bg-radial from-emerald-50 to-white border border-[#006B5B]/20 text-center space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#004D40]">
          নিজেই নিজের রুকইয়াহ শুরু করতে চান?
        </h3>
        <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto">
          আমাদের ৭ ধাপের ধারাবাহিক সেলফ-রুকইয়াহ গাইড পড়ে খুব সহজেই ঘরে বসে আমল শুরু করতে পারেন।
        </p>
        <Link
          href="/self-ruqyah"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#006B5B] text-white font-bold text-xs md:text-sm hover:bg-[#004D40] transition-colors"
        >
          <span>সেলফ-রুকইয়াহ গাইড পড়ুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
