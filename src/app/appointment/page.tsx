"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Coins,
  Lightbulb,
  ThumbsUp
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AppointmentPage() {
  const [service, setService] = useState("diagnosis_single");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("রাত ৮:০০ - ৯:০০");
  const [problemDescription, setProblemDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: "diagnosis_single",
      title: "ডায়াগনোসিস (চেকআপ) - ১ জন",
      subtitle: "সমস্যার ধরন ও আধ্যাত্মিক কারণ নির্ণয় (একক রোগী)",
      fee: "১,০০০ টাকা",
      duration: "৩০ - ৪৫ মিনিট",
      tag: "চেকআপ",
      isDiagnosis: true,
    },
    {
      id: "diagnosis_family",
      title: "ডায়াগনোসিস (চেকআপ) - ফুল ফ্যামিলি",
      subtitle: "পুরো পরিবারের সমন্বিত পরীক্ষা ও স্ক্রিনিং",
      fee: "২,০০০ টাকা",
      duration: "৩০ - ৪৫ মিনিট",
      tag: "চেকআপ",
      isDiagnosis: true,
    },
    {
      id: "jinn",
      title: "জিনের রুকইয়াহ",
      subtitle: "জিন স্পর্শ, তীব্র ভীতি ও অবচেতন আচরণ নিবারণ",
      fee: "৫,০০০ - ৮,০০০/=",
      duration: "১ - ২ - ৩ ঘণ্টা+",
      tag: "ট্রিটমেন্ট",
    },
    {
      id: "evil_eye",
      title: "বদনজর ও হাসাদের রুকইয়াহ",
      subtitle: "মানুষের হিংসুটে চোখ ও কুনজরের বিষাক্ত প্রভাব দূরীকরণ",
      fee: "৩,৫০০/=",
      duration: "১ - ২ ঘণ্টা",
      tag: "ট্রিটমেন্ট",
    },
    {
      id: "sihr",
      title: "জাদুর রুকইয়াহ (সিহর বিনষ্টকরণ)",
      subtitle: "বিচ্ছেদ, বিবাহে বাধা ও কুফরি জাদু ধ্বংসের সেশন",
      fee: "৪,৫০০/=",
      duration: "১ - ২ ঘণ্টা",
      tag: "ট্রিটমেন্ট",
    },
    {
      id: "family_counseling",
      title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
      subtitle: "অহেতুক পারিবারিক কলহ ও আত্মিক অস্থিরতা নিরসন",
      fee: "আলোচনা সাপেক্ষে",
      duration: "১ - ১.৫ ঘণ্টা",
      tag: "পরামর্শ",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const svcParam = params.get("service");
      if (svcParam && services.some((s) => s.id === svcParam)) {
        setService(svcParam);
      }
    }
  }, []);

  const timeSlots = [
    "সকাল ১০:০০ - ১১:০০",
    "দুপুর ১২:০০ - ১:০০",
    "বিকেল ৪:০০ - ৫:০০",
    "সন্ধ্যা ৬:৩০ - ৭:৩০",
    "রাত ৮:০০ - ৯:০০",
    "রাত ৯:৩০ - ১০:৩০",
  ];

  const selectedServiceObj = services.find((s) => s.id === service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `আসসালামু আলাইকুম রাহমাতুল্লাহ।
আমি সুন্নাহলাইফ প্ল্যাটফর্ম থেকে একটি রুকইয়াহ অ্যাপয়েন্টমেন্ট বুকিং করতে চাচ্ছি।

[বুকিং বিবরণ]
• সেবার ধরন: ${selectedServiceObj?.title || service}
• নির্ধারিত ফি: ${selectedServiceObj?.fee || "আলোচনা সাপেক্ষে"}
• সময়কাল: ${selectedServiceObj?.duration || "৩০ - ৪৫ মিনিট"}
• নাম: ${name}
• মোবাইল: ${phone}
• জেলা/শহর: ${district || "উল্লেখ নেই"}
• সম্ভাব্য তারিখ: ${date || "আলোচনা সাপেক্ষে"}
• সুবিধাজনক সময়: ${timeSlot}

[সমস্যার সংক্ষিপ্ত বিবরণ]
${problemDescription || "সরাসরি চেম্বারে/ভিডিও কলে বিস্তারিত জানাতে চাই"}

অনুগ্রহ করে সময়টি নিশ্চিত করুন। জাযাকাল্লাহু খাইরান।`;

    const encoded = encodeURIComponent(text);
    setIsSubmitted(true);

    // Open WhatsApp
    window.open(`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>শারঈ রাক্বী অ্যাপয়েন্টমেন্ট ও সেশন বুকিং</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ ও ডায়াগনোসিস অ্যাপয়েন্টমেন্ট
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহ মোতাবেক পরিচালিত অভিজ্ঞ শারঈ রাক্বীর সাথে প্রাথমিক ডায়াগনোসিস বা সুনির্দিষ্ট ট্রিটমেন্ট সেশনের জন্য নিচের ফর্মটি পূরণ করুন।
        </p>
      </div>

      {/* Shariah Advice Banner from Official Flyer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#006B5B]/5 to-amber-50 border border-[#006B5B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#006B5B] text-white shrink-0 mt-0.5 sm:mt-0">
            <Lightbulb className="w-5 h-5 text-[#F2C94C]" />
          </div>
          <div className="text-xs sm:text-sm text-gray-800 leading-relaxed">
            <strong className="text-[#004D40] block font-bold">বিশেষ শারঈ পরামর্শ:</strong>
            <span>"আপনি ট্রিটমেন্ট খরচ ভাবার আগে, শুধু ডায়াগনোসিস করে দেখে নিন। যদি সমস্যা না থাকে, তাহলে আর কোনো চিকিৎসার খরচ নেই, ইনশাআল্লাহ।"</span>
          </div>
        </div>
        <Link
          href="/services"
          className="text-xs text-[#006B5B] font-bold hover:underline shrink-0 whitespace-nowrap self-end sm:self-center flex items-center gap-1"
        >
          <span>ফি ও কার্যপ্রণালী</span>
          <span>→</span>
        </Link>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-3xl bg-white border border-[#006B5B]/15 shadow-sm space-y-8">
        {/* 1. Service Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-[#004D40]">
              ১. কাঙ্ক্ষিত সেবার ধরন বেছে নিন:
            </label>
            <span className="text-[11px] text-gray-500 hidden sm:inline">
              ক্লিক করে যেকোনো একটি নির্বাচন করুন
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {services.map((srv) => {
              const isChosen = service === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setService(srv.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    isChosen
                      ? "bg-[#006B5B]/5 border-[#006B5B] shadow-xs ring-1 ring-[#006B5B]"
                      : "bg-[#FAFAF7] border-gray-200 hover:border-[#006B5B]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className={`text-sm font-bold leading-snug ${isChosen ? "text-[#006B5B]" : "text-gray-900"}`}>
                        {srv.title}
                      </h4>
                      {isChosen ? (
                        <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                      ) : (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          srv.isDiagnosis 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {srv.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {srv.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-200/70 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#006B5B]">
                      ফি: {srv.fee}
                    </span>
                    <span className="text-gray-500 font-medium">
                      {srv.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Personal Info */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-[#004D40]">
            ২. আপনার ব্যক্তিগত তথ্য:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">পূর্ণ নাম *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">মোবাইল / WhatsApp নম্বর *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="০১৭xxxxxxxx"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">জেলা / শহর</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="যেমন: ঢাকা, চট্টগ্রাম..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Date & Time Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-[#004D40]">
            ৩. পছন্দের তারিখ ও সুবিধাজনক সময়:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">সম্ভাব্য তারিখ</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">সুবিধাজনক সময় বেছে নিন</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
              >
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 4. Problem Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-[#004D40]">
            ৪. সমস্যার সংক্ষিপ্ত বিবরণ (ঐচ্ছিক):
          </label>
          <textarea
            rows={3}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="আপনার প্রধান লক্ষণসমূহ বা কতদিন ধরে সমস্যা তা সংক্ষেপে উল্লেখ করতে পারেন..."
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white"
          />
        </div>

        {/* Selected Service Preview Box */}
        {selectedServiceObj && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0" />
              <span>
                নির্বাচিত সেবা: <strong>{selectedServiceObj.title}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-[#006B5B]">
                ফি: {selectedServiceObj.fee}
              </span>
              <span className="text-gray-600">
                সময়: {selectedServiceObj.duration}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-base shadow-md shadow-[#006B5B]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#F2C94C]" />
            <span>অ্যাপয়েন্টমেন্টের তথ্যসহ WhatsApp-এ মেসেজ পাঠান</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            বাটনে ক্লিক করলে আপনার তথ্যগুলো সাজিয়ে স্বয়ংক্রিয়ভাবে রাক্বীর অফিশিয়াল হোয়াটসঅ্যাপে চলে যাবে।
          </p>
        </div>
      </form>
    </div>
  );
}
