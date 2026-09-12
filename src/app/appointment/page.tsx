"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AppointmentPage() {
  const [service, setService] = useState("online_consultation");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("রাত ৮:০০ - ৯:০০");
  const [problemDescription, setProblemDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: "online_consultation",
      title: "অনলাইন শারঈ রুকইয়াহ কনসালটেশন",
      subtitle: "হোয়াটসঅ্যাপ ভিডিও বা অডিও কলে সরাসরি রাক্বীর সাথে আলোচনা",
      duration: "৪৫ মিনিট",
    },
    {
      id: "in_person",
      title: "সরাসরি চেম্বারে রুকইয়াহ সেশন",
      subtitle: "সরাসরি উপস্থিত হয়ে রুকইয়াহ শারইয়্যাহ গ্রহণ ও পর্যবেক্ষণ",
      duration: "৬০ মিনিট",
    },
    {
      id: "family_counseling",
      title: "পারিবারিক ও দাম্পত্য পরামর্শ",
      subtitle: "দাম্পত্য কলহ ও পরিবারের ওপর কুপ্রভাব দূরীকরণে সমন্বিত রুকইয়াহ",
      duration: "৬০ মিনিট",
    },
  ];

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
• সেবার ধরন: ${selectedServiceObj?.title}
• নাম: ${name}
• মোবাইল: ${phone}
• জেলা/শহর: ${district || "উল্লেখ নেই"}
• সম্ভাব্য তারিখ: ${date || "আলোচনা সাপেক্ষে"}
• সুবিধাজনক সময়: ${timeSlot}

[সমস্যার সংক্ষিপ্ত বিবরণ]
${problemDescription || "সরাসরি কলে আলোচনা করতে চাই"}

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
          <span>শারঈ রাক্বী অ্যাপয়েন্টমেন্ট</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          রুকইয়াহ পরামর্শের অ্যাপয়েন্টমেন্ট নিন
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          কুরআন ও সহীহ সুন্নাহ মোতাবেক পরিচালিত অভিজ্ঞ শারঈ রাক্বীর সাথে অনলাইন বা সরাসরি সেশনের জন্য নিচের তথ্যগুলো পূরণ করুন।
        </p>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-3xl bg-white border border-[#006B5B]/15 shadow-sm space-y-8">
        {/* 1. Service Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#004D40]">
            ১. কাঙ্ক্ষিত সেবার ধরন বেছে নিন:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {services.map((srv) => {
              const isChosen = service === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setService(srv.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isChosen
                      ? "bg-[#006B5B]/5 border-[#006B5B] shadow-xs"
                      : "bg-white border-gray-200 hover:border-[#006B5B]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className={`text-sm font-bold ${isChosen ? "text-[#006B5B]" : "text-gray-900"}`}>
                        {srv.title}
                      </h4>
                      {isChosen && <CheckCircle2 className="w-4 h-4 text-[#006B5B]" />}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {srv.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-[#D4A017] font-semibold">
                    সময়সীমা: {srv.duration}
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
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
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
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
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
          />
        </div>

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
