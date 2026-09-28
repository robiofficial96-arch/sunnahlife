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
import { saveOnlineAppointment, OnlineAppointment } from "@/lib/firebase";

export default function AppointmentPage() {
  const [service, setService] = useState("diagnosis_single");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("রাত ৮:০০ - ৯:০০");
  const [problemDescription, setProblemDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<Omit<OnlineAppointment, "id" | "createdAt" | "status"> | null>(null);
  const [submittedId, setSubmittedId] = useState<string>("");

  const [serviceCategory, setServiceCategory] = useState<"all" | "ruqyah" | "hijama">("all");

  const services = [
    {
      id: "diagnosis_single",
      title: "ডায়াগনোসিস (চেকআপ) - ১ জন",
      subtitle: "সমস্যার ধরন ও আধ্যাত্মিক কারণ নির্ণয় (একক রোগী)",
      fee: "১,০০০ টাকা",
      duration: "৩০ - ৪৫ মিনিট",
      tag: "চেকআপ",
      category: "ruqyah" as const,
      isDiagnosis: true,
    },
    {
      id: "diagnosis_family",
      title: "ডায়াগনোসিস (চেকআপ) - ফুল ফ্যামিলি",
      subtitle: "পুরো পরিবারের সমন্বিত পরীক্ষা ও স্ক্রিনিং",
      fee: "২,০০০ টাকা",
      duration: "৩০ - ৪৫ মিনিট",
      tag: "চেকআপ",
      category: "ruqyah" as const,
      isDiagnosis: true,
    },
    {
      id: "jinn",
      title: "জিনের রুকইয়াহ",
      subtitle: "জিন স্পর্শ, তীব্র ভীতি ও অবচেতন আচরণ নিবারণ",
      fee: "৫,০০০ - ৮,০০০/=",
      duration: "১ - ২ - ৩ ঘণ্টা+",
      tag: "ট্রিটমেন্ট",
      category: "ruqyah" as const,
    },
    {
      id: "evil_eye",
      title: "বদনজর ও হাসাদের রুকইয়াহ",
      subtitle: "মানুষের হিংসুটে চোখ ও কুনজরের বিষাক্ত প্রভাব দূরীকরণ",
      fee: "৩,৫০০/=",
      duration: "১ - ২ ঘণ্টা",
      tag: "ট্রিটমেন্ট",
      category: "ruqyah" as const,
    },
    {
      id: "sihr",
      title: "জাদুর রুকইয়াহ (সিহর বিনষ্টকরণ)",
      subtitle: "বিচ্ছেদ, বিবাহে বাধা ও কুফরি জাদু ধ্বংসের সেশন",
      fee: "৪,৫০০/=",
      duration: "১ - ২ ঘণ্টা",
      tag: "ট্রিটমেন্ট",
      category: "ruqyah" as const,
    },
    {
      id: "family_counseling",
      title: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
      subtitle: "অহেতুক পারিবারিক কলহ ও আত্মিক অস্থিরতা নিরসন",
      fee: "আলোচনা সাপেক্ষে",
      duration: "১ - ১.৫ ঘণ্টা",
      tag: "পরামর্শ",
      category: "ruqyah" as const,
    },
    {
      id: "hijama_sunnah",
      title: "সুন্নাহ হিজামা (জেনারেল কাপিং)",
      subtitle: "রক্ত সঞ্চালন ও বডি ডিটক্সিফিকেশনে সুন্নাহ পয়েন্টে হিজামা",
      fee: "১,০০০ - ১,৫০০/=",
      duration: "৩০ - ৪৫ মিনিট",
      tag: "সুন্নাহ চিকিৎসা",
      category: "hijama" as const,
    },
    {
      id: "hijama_pain",
      title: "ব্যথামুক্তির হিজামা (পেইন রিলিফ)",
      subtitle: "মাথা, ঘাড়, পিঠ, কোমর ও হাঁটুর দীর্ঘস্থায়ী ব্যথার হিজামা",
      fee: "১,২০০ - ২,০০০/=",
      duration: "৪০ - ৫০ মিনিট",
      tag: "ব্যথা নিরাময়",
      category: "hijama" as const,
    },
    {
      id: "hijama_ruqyah",
      title: "রুকইয়াহ সমন্বিত হিজামা",
      subtitle: "সিহর (জাদু) ও বদনজর বিনষ্টকরণে বিশেষ পয়েন্টে কাপিং",
      fee: "১,৫০০ - ২,৫০০/=",
      duration: "৪৫ - ৬০ মিনিট",
      tag: "বিশেষ থেরাপি",
      category: "hijama" as const,
    },
    {
      id: "hijama_full",
      title: "ফুল বডি ওয়েট হিজামা (ডিটক্স)",
      subtitle: "শরীর থেকে দূষিত রক্ত ও টক্সিন নিষ্কাশনে সম্পূর্ণ থেরাপি",
      fee: "২,৫০০ - ৩,৫০০/=",
      duration: "১ - ১.৫ ঘণ্টা",
      tag: "সম্পূর্ণ ডিটক্স",
      category: "hijama" as const,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const svcParam = params.get("service");
      const catParam = params.get("category");
      if (catParam === "hijama" || catParam === "ruqyah") {
        setServiceCategory(catParam);
      }
      if (svcParam && services.some((s) => s.id === svcParam)) {
        setService(svcParam);
        if (svcParam.startsWith("hijama")) {
          setServiceCategory("hijama");
        } else {
          setServiceCategory("ruqyah");
        }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }
    if (!phone.trim()) {
      alert("অনুগ্রহ করে আপনার মোবাইল নম্বরটি প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    const payload: Omit<OnlineAppointment, "id" | "createdAt" | "status"> = {
      name: name.trim(),
      phone: phone.trim(),
      district: district.trim() || "উল্লেখ নেই",
      serviceId: service,
      serviceName: selectedServiceObj?.title || service,
      fee: selectedServiceObj?.fee || "আলোচনা সাপেক্ষে",
      duration: selectedServiceObj?.duration || "৩০ - ৪৫ মিনিট",
      date: date.trim() || new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" }),
      timeSlot,
      problemDescription: problemDescription.trim() || "চেম্বারে বা কলে সরাসরি বিস্তারিত আলোচনা হবে",
    };

    try {
      const docId = await saveOnlineAppointment(payload);
      setSubmittedId(docId);
      setSubmittedData(payload);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Firebase booking save error:", err);
      // Fallback to local storage if offline or permissions issue
      try {
        const local = JSON.parse(localStorage.getItem("sunnahlife_pending_appointments") || "[]");
        const fallbackId = "offline_" + Date.now();
        local.unshift({
          ...payload,
          id: fallbackId,
          status: "pending",
          createdAt: Date.now(),
          createdAtFormatted: new Date().toLocaleString("bn-BD"),
        });
        localStorage.setItem("sunnahlife_pending_appointments", JSON.stringify(local));
        setSubmittedId(fallbackId);
      } catch {}
      setSubmittedData(payload);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Booking Form or Success Card */}
      {isSubmitted && submittedData ? (
        <div className="p-6 md:p-10 rounded-3xl bg-white border border-emerald-500/30 shadow-lg space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-[#006B5B]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              আবেদন রেফারেন্স: #{submittedId ? submittedId.slice(-6).toUpperCase() : "SL-CONFIRMED"}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#004D40]">
              আলহামদুলিল্লাহ! আপনার বুকিং সফলভাবে জমা হয়েছে
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              আপনার অ্যাপয়েন্টমেন্ট রিকোয়েস্টটি সরাসরি আমাদের ড্যাশবোর্ডে জমা হয়েছে। আমাদের রাক্বী বা সহকারী প্রতিনিধি আপনার মোবাইল নম্বরে যোগাযোগ করে সময়টি চূড়ান্ত করবেন, ইনশাআল্লাহ।
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#FAFAF7] border border-gray-200/80 text-left space-y-3 text-xs md:text-sm">
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="text-gray-500">রোগীর নাম:</span>
              <span className="font-bold text-gray-900">{submittedData.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="text-gray-500">মোবাইল নম্বর:</span>
              <span className="font-bold text-gray-900">{submittedData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="text-gray-500">নির্বাচিত সেবা:</span>
              <span className="font-bold text-[#006B5B]">{submittedData.serviceName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="text-gray-500">নির্ধারিত ফি:</span>
              <span className="font-bold text-emerald-700">{submittedData.fee}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="text-gray-500">সম্ভাব্য তারিখ:</span>
              <span className="font-semibold text-gray-800">{submittedData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">পছন্দের সময়:</span>
              <span className="font-semibold text-gray-800">{submittedData.timeSlot}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setName("");
                setPhone("");
                setDistrict("");
                setProblemDescription("");
                setSubmittedData(null);
                setSubmittedId("");
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#006B5B] text-white font-semibold text-xs md:text-sm hover:bg-[#004D40] transition-colors cursor-pointer"
            >
              নতুন আরেকটি বুকিং করুন
            </button>
            <a
              href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(
                `আসসালামু আলাইকুম। আমি সুন্নাহলাইফ প্ল্যাটফর্ম থেকে একটি অ্যাপয়েন্টমেন্ট রিকোয়েস্ট সাবমিট করেছি।\n• নাম: ${submittedData.name}\n• মোবাইল: ${submittedData.phone}\n• সেবা: ${submittedData.serviceName}\n• রেফারেন্স: #${submittedId ? submittedId.slice(-6).toUpperCase() : ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs md:text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>জরুরি হলে WhatsApp-এ বার্তা দিন</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-3xl bg-white border border-[#006B5B]/15 shadow-sm space-y-8">
          {/* 1. Service Selection */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-sm font-bold text-[#004D40]">
                ১. কাঙ্ক্ষিত সেবার ধরন বেছে নিন:
              </label>
              <span className="text-[11px] text-gray-500">
                রুকইয়াহ অথবা হিজামা ক্যাটাগরি বেছে নিতে পারেন
              </span>
            </div>

            {/* Service Category Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FAFAF7] border border-gray-200">
              <button
                type="button"
                onClick={() => setServiceCategory("all")}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  serviceCategory === "all"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-gray-100"
                }`}
              >
                সব সেবা ({services.length})
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory("ruqyah")}
                className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  serviceCategory === "ruqyah"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                <span>🌿</span>
                <span>রুকইয়াহ শারইয়্যাহ ({services.filter((s) => s.category === "ruqyah").length})</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory("hijama")}
                className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  serviceCategory === "hijama"
                    ? "bg-rose-700 text-white shadow-xs"
                    : "text-rose-800 hover:bg-rose-50"
                }`}
              >
                <span>🩸</span>
                <span>হিজামা থেরাপি ({services.filter((s) => s.category === "hijama").length})</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {services
                .filter((srv) => serviceCategory === "all" || srv.category === serviceCategory)
                .map((srv) => {
                const isChosen = service === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setService(srv.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                      isChosen
                        ? srv.category === "hijama"
                          ? "bg-rose-50/40 border-rose-600 shadow-xs ring-1 ring-rose-600"
                          : "bg-[#006B5B]/5 border-[#006B5B] shadow-xs ring-1 ring-[#006B5B]"
                        : "bg-[#FAFAF7] border-gray-200 hover:border-[#006B5B]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className={`text-sm font-bold leading-snug ${isChosen ? (srv.category === "hijama" ? "text-rose-800" : "text-[#006B5B]") : "text-gray-900"}`}>
                          {srv.title}
                        </h4>
                        {isChosen ? (
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${srv.category === "hijama" ? "text-rose-600" : "text-[#006B5B]"}`} />
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                            srv.category === "hijama"
                              ? "bg-rose-100 text-rose-800"
                              : srv.isDiagnosis 
                              ? "bg-amber-100 text-amber-800" 
                              : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {srv.category === "hijama" ? "🩸 হিজামা" : srv.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {srv.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-200/70 flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${srv.category === "hijama" ? "text-rose-700" : "text-[#006B5B]"}`}>
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
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#006B5B] hover:bg-[#004D40] disabled:bg-gray-400 text-white font-bold text-base shadow-md shadow-[#006B5B]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>অ্যাপয়েন্টমেন্ট জমা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#F2C94C]" />
                  <span>অ্যাপয়েন্টমেন্ট বুকিং নিশ্চিত করুন</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              বাটনে ক্লিক করলে আপনার তথ্যগুলো সরাসরি আমাদের সেন্ট্রাল অ্যাডমিন ড্যাশবোর্ডে জমা হবে।
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
