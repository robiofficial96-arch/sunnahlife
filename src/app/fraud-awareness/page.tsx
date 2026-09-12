import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, XCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ভণ্ড কবিরাজ ও প্রতারক চেনার উপায় | সুন্নাহলাইফ",
  description: "কুরআন ও সুন্নাহর আলোকে কীভাবে ভণ্ড কবিরাজ, যাদুকর ও প্রতারক চেনা যায় তার স্পষ্ট ১০টি লক্ষণ।",
};

export default function FraudAwarenessPage() {
  const warningSigns = [
    {
      title: "মায়ের নাম বা জন্মতারিখ জিজ্ঞেস করা",
      desc: "শরীয়তে রোগীর চিকিৎসা করার জন্য মায়ের নামের কোনো প্রয়োজন নেই। যাদুকর ও জিন পুজারীরা শয়তানের সহায়তায় হিসাব করার জন্য মায়ের নাম চেয়ে থাকে।",
    },
    {
      title: "রোগীর ব্যবহৃত জামাকাপড় বা নখ-চুল চাওয়া",
      desc: "কুফরি জাদু করার জন্য যাদুকররা মানুষের শরীরের ব্যবহৃত কাপড়ের টুকরো, ঘাম বা চুল সংগ্রহ করে থাকে। এটি স্পষ্ট কুফরি।",
    },
    {
      title: "অর্থহীন অক্ষর বা নকশা আঁকা তাবীজ দেওয়া",
      desc: "তাবীজে যদি কোনো সংখ্যা, বাক্স, দুর্বোধ্য চিহ্ন বা অজানা নাম থাকে, তবে তা শয়তানী সংকেত। রাসূলুল্লাহ (ﷺ) বলেছেন: 'যে তাবীজ ঝুলালো সে শিরক করলো।' (মুসনাদে আহমাদ)",
    },
    {
      title: "গায়েবী খবর বা ভবিষ্যৎ বলে দেওয়ার দাবি",
      desc: "কে জাদু করেছে বা আপনার ঘরে কী লুকিয়ে আছে তা বলে দেওয়ার দাবি করা মানে গায়েব জানার দাবি, যা একমাত্র আল্লাহ ছাড়া আর কারো পক্ষে সম্ভব নয়।",
    },
    {
      title: "১০০% গ্যারান্টিযুক্ত শেফার প্রতিশ্রুতি দেওয়া",
      desc: "শেফা ও রোগমুক্তির মালিক একমাত্র আল্লাহ সুবহানাহু ওয়া তা'আলা। কোনো প্রকৃত মুসলিম বা শারঈ রাক্বী কখনো '১০০% সুস্থতার গ্যারান্টি' দিতে পারে না।",
    },
    {
      title: "পর্দা লঙ্ঘন বা অপ্রয়োজনীয় স্পর্শ করা",
      desc: "মহিলা রোগীদের মাহরাম ছাড়া একাকী দেখা করা, পর্দা ছাড়া চিকিৎসা করা বা শরীরের গোপন অঙ্গে স্পর্শ করা সম্পূর্ণ হারাম ও ব্যভিচারের শামিল।",
    },
    {
      title: "নির্দিষ্ট রঙের পশু বা রক্ত দিয়ে অদ্ভুত আচার",
      desc: "কালো মুরগি, ছাগল বা কবুতর জবেহ করে রক্ত ঘরের কোণে ছিটাতে বলা মানে জিনের উদ্দেশ্যে কুরবানি করা, যা সবচেয়ে জঘন্য শিরক।",
    },
    {
      title: "কুরআন পাঠ বাদ দিয়ে অস্পষ্ট ফিসফিস করা",
      desc: "রুকইয়াহর সময় উচ্চকণ্ঠে সুস্পষ্ট কুরআনের আয়াত বা মাসনুন দোয়া পড়তে হবে। কোনো প্রকার অস্পষ্ট দুর্বোধ্য আওয়াজ করা ভণ্ডামির লক্ষণ।",
    },
    {
      title: "অস্বাভাবিক বড় অঙ্কের টাকা দাবি বা ভয় দেখানো",
      desc: "আপনার পরিবার ধ্বংস হয়ে যাবে বা সন্তান মারা যাবে বলে কৃত্রিম ভীতি তৈরি করে লক্ষ লক্ষ টাকা দাবি করা ব্ল্যাকমেইল চক্রের কাজ।",
    },
    {
      title: "সালাত বা পবিত্রতা থেকে বিরত রাখা",
      desc: "৪০ দিন গোসল না করা, নাপাক অবস্থায় থাকা বা কুরআন স্পর্শ না করতে বলা নিশ্চিত শয়তানী যাদুকরের আলামত।",
    },
  ];

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>ঈমান ও নিরাপত্তা রক্ষা</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          কীভাবে চিনবেন ভণ্ড কবিরাজ ও প্রতারক ব্যক্তি?
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          আমাদের দেশে অসংখ্য মানুষ রোগমুক্তির আশায় অসাধু কবিরাজ, জ্যোতিষী ও যাদুকরদের খপ্পরে পড়ে নিজেদের ঈমান ও অর্থ হারাচ্ছেন। শরিয়ত সম্মত রুকইয়াহর সাথে এসব ভণ্ডামির কোনো সম্পর্ক নেই।
        </p>
      </div>

      {/* Warning List */}
      <div className="space-y-4">
        {warningSigns.map((sign, idx) => (
          <div
            key={idx}
            className="p-5 md:p-6 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-2xs transition-all flex items-start gap-4"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                {idx + 1}. {sign.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {sign.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Box: Fake Healer vs True Raqi */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
          <h4 className="text-base font-bold text-rose-800 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            ভণ্ড কবিরাজ / যাদুকরের চরিত্র
          </h4>
          <ul className="space-y-2 text-xs text-rose-950">
            <li>• শিরকি তাবীজ ও কুফরি সংকেত দেয়</li>
            <li>• মায়ের নাম জেনে গায়েবী খবর বলার ভান করে</li>
            <li>• পর্দা মানে না এবং অসুস্থ মানুষের দুর্বলতার সুযোগ নেয়</li>
            <li>• ১০০% রোগমুক্তির গ্যারান্টি দিয়ে ধোঁকা দেয়</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
          <h4 className="text-base font-bold text-[#006B5B] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#006B5B]" />
            বিশুদ্ধ শারঈ রাক্বীর পরিচয়
          </h4>
          <ul className="space-y-2 text-xs text-emerald-950">
            <li>• শুধু সুস্পষ্ট কুরআন ও সহীহ হাদিসের দোয়া পড়েন</li>
            <li>• রোগীকে সর্বদা এক আল্লাহর ওপর তাওয়াক্কুল শেখান</li>
            <li>• সেলফ-রুকইয়াহ ও আমলের প্রতি উৎসাহিত করেন</li>
            <li>• শরিয়তের পর্দা ও পবিত্রতার সর্বোচ্চ হিফাজত করেন</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#006B5B] text-white font-bold text-sm hover:bg-[#004D40] shadow-md shadow-[#006B5B]/20 transition-all"
        >
          <span>নিজের লক্ষণগুলো সঠিক নিয়মে যাচাই করুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
