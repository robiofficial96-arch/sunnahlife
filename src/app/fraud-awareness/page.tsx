import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, XCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ভণ্ড কবিরাজ ও প্রতারক চেনার উপায় | সুন্নাহলাইফ",
  description: "কুরআন ও সুন্নাহর আলোকে ভণ্ড কবিরাজ ও প্রতারক চেনার স্পষ্ট ১০টি লক্ষণ।",
};

export default function FraudAwarenessPage() {
  const warningSigns = [
    { title: "মায়ের নাম বা জন্মতারিখ চাওয়া", desc: "শরীয়তে চিকিৎসার জন্য মায়ের নামের প্রয়োজন নেই। এটি শয়তানী সংকেত।" },
    { title: "ব্যবহৃত কাপড়, চুল বা নখ চাওয়া", desc: "কুফরি জাদু করার উদ্দেশ্যে এসব সংগ্রহ করা হয়, যা স্পষ্ট হারাম।" },
    { title: "নকশা বা দুর্বোধ্য তাবীজ দেওয়া", desc: "সংখ্যা, বাক্স বা অজানা সংকেতের তাবীজ ব্যবহার করা স্পষ্ট শিরক।" },
    { title: "গায়েবী খবর জানার দাবি", desc: "কে জাদু করেছে বলা গায়েবের দাবি, যা একমাত্র আল্লাহ ছাড়া কেউ জানে না।" },
    { title: "১০০% শেফার গ্যারান্টি দেওয়া", desc: "রোগমুক্তির মালিক একমাত্র আল্লাহ। কোনো মানুষ গ্যারান্টি দিতে পারে না।" },
    { title: "পর্দা লঙ্ঘন বা মাহরাম ছাড়া দেখা", desc: "নারী রোগীকে একা দেখা বা পর্দা না মানা সম্পূর্ণ হারাম ও প্রতারণা।" },
    { title: "নির্দিষ্ট রঙের পশু বা রক্ত চাওয়া", desc: "কালো পশু বা রক্ত ছিটানো জিনের উদ্দেশ্যে কুরবানি, যা জঘন্য শিরক।" },
    { title: "অস্পষ্ট ফিসফিস করে পড়া", desc: "রুকইয়াহতে উচ্চকণ্ঠে সুস্পষ্ট কুরআন ও মাসনুন দোয়া পাঠ বাধ্যতামূলক।" },
    { title: "কৃত্রিম ভয় দেখিয়ে টাকা দাবি", desc: "পরিবার ধ্বংসের মিথ্যা ভয় দেখিয়ে বড় অঙ্কের টাকা হাতিয়ে নেওয়া।" },
    { title: "সালাত বা পবিত্রতা থেকে বিরত রাখা", desc: "নাপাক থাকা বা কুরআন স্পর্শে নিষেধ করা নিশ্চিত যাদুকরের আলামত।" },
  ];

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>ঈমান ও নিরাপত্তা রক্ষা</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          ভণ্ড কবিরাজ ও প্রতারক চেনার ১০টি লক্ষণ
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          রোগমুক্তির আশায় ঈমান ও অর্থ হারাবেন না। খাঁটি শারঈ রুকইয়াহ সর্বদা কুরআন ও সুন্নাহ মোতাবেক পরিচালিত হয়।
        </p>
      </div>

      {/* Warning Grid: 2 columns on sm+ for compact skimmable layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {warningSigns.map((sign, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-rose-100 hover:border-rose-300 shadow-2xs transition-all flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              {idx + 1}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                {sign.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 leading-relaxed">
                {sign.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Comparison Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-rose-800 flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ভণ্ড কবিরাজ / যাদুকর
          </h4>
          <ul className="space-y-1 text-xs text-rose-950">
            <li>• শিরকি তাবীজ ও কুফরি সংকেত দেয়</li>
            <li>• মায়ের নাম ও গায়েবী তথ্য বলে ধোঁকা দেয়</li>
            <li>• পর্দা মানে না এবং অসুস্থতার সুযোগ নেয়</li>
            <li>• ১০০% সুস্থতার মিথ্যা প্রতিশ্রুতি দেয়</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-[#006B5B] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0" />
            বিশুদ্ধ শারঈ রাক্বী
          </h4>
          <ul className="space-y-1 text-xs text-emerald-950">
            <li>• শুধু সুস্পষ্ট কুরআন ও সহীহ হাদিস পড়েন</li>
            <li>• একমাত্র আল্লাহর ওপর তাওয়াক্কুল শেখান</li>
            <li>• সেলফ-রুকইয়াহ ও নিজ আমলের পরামর্শ দেন</li>
            <li>• শরিয়তের পর্দা ও পবিত্রতা নিশ্চিত করেন</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006B5B] text-white font-bold text-xs sm:text-sm hover:bg-[#004D40] shadow-xs transition-all"
        >
          <span>নিজের লক্ষণগুলো সঠিক নিয়মে যাচাই করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
