"use client";

import { useState } from "react";
import { 
  SYMPTOM_CATEGORIES, 
  SYMPTOMS_LIST, 
  evaluateSymptoms, 
  DiagnosisResult 
} from "@/data/symptoms";
import { 
  Check, 
  AlertCircle, 
  ShieldAlert, 
  MessageCircle, 
  RotateCcw, 
  BookOpen, 
  HeartHandshake, 
  ChevronRight,
  Info,
  Copy,
  CheckCheck,
  Sparkles
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface SymptomCheckerProps {
  initialCategory?: string;
  isCompact?: boolean;
}

export default function SymptomChecker({ initialCategory, isCompact = false }: SymptomCheckerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || "all");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [userNote, setUserNote] = useState("");
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Toggle selection
  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all or reset in category
  const handleCalculate = () => {
    const evaluation = evaluateSymptoms(selectedSymptoms, userNote);
    setResult(evaluation);
    // Smooth scroll to results
    setTimeout(() => {
      const el = document.getElementById("diagnosis-result-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setUserNote("");
    setResult(null);
  };

  const filteredSymptoms =
    activeCategory === "all"
      ? SYMPTOMS_LIST
      : SYMPTOMS_LIST.filter((s) => s.category === activeCategory);

  const copyWhatsAppText = () => {
    if (!result) return;
    const decoded = decodeURIComponent(result.whatsappMessage);
    navigator.clipboard.writeText(decoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp number configuration from site configuration (01676820060 -> 8801676820060)
  const raqiWhatsAppNumber = SITE_CONFIG.raqiWhatsAppNumber;

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-5 md:p-8">
      {/* Top Banner / Disclaimer */}
      <div className="mb-6 bg-[#FAFAF7] border border-[#D4A017]/30 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-gray-700">
        <Info className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#006B5B] font-semibold">শারঈ রুকইয়াহ স্ব-নিরীক্ষণ:</strong>{" "}
          নিচের লক্ষণগুলো থেকে আপনার বা আপনার পরিবারের সদস্যের যে যে সমস্যাগুলো অনুভূত হচ্ছে তা সিলেক্ট করুন। এটি কোনো অলৌকিক ভাগ্য গণনা নয়; বরং কুরআন-সুন্নাহ মোতাবেক লক্ষণ বিশ্লেষণ করে উপযুক্ত সেলফ-রুকইয়াহ ও প্রয়োজনে রাক্বীর পরামর্শ পাওয়ার জন্য তৈরি।
        </div>
      </div>

      {!result ? (
        <div>
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "bg-[#FAFAF7] text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              সব লক্ষণ ({SYMPTOMS_LIST.length})
            </button>
            {SYMPTOM_CATEGORIES.map((cat) => {
              const count = SYMPTOMS_LIST.filter((s) => s.category === cat.id).length;
              const selectedCount = selectedSymptoms.filter((id) =>
                SYMPTOMS_LIST.find((s) => s.id === id)?.category === cat.id
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? "bg-[#006B5B] text-white shadow-xs"
                      : "bg-[#FAFAF7] text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedCount > 0
                        ? "bg-[#D4A017] text-white font-bold"
                        : activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {selectedCount > 0 ? `${selectedCount}/${count}` : count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Symptoms Checklist Grid */}
          <div className="space-y-3 mb-6">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              return (
                <div
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isSelected
                      ? "bg-[#006B5B]/5 border-[#006B5B] shadow-xs"
                      : "bg-white border-gray-200 hover:border-[#006B5B]/40 hover:bg-[#FAFAF7]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-[#006B5B] border-[#006B5B] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm md:text-base leading-snug ${
                        isSelected ? "text-[#004D40] font-semibold" : "text-gray-800"
                      }`}
                    >
                      {symptom.label}
                    </p>
                    {symptom.hint && (
                      <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                        {symptom.hint}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* User Custom Note Input */}
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
              অতিরিক্ত কোনো বিশেষ অনুভূতি বা বর্ণনা থাকলে লিখুন (ঐচ্ছিক):
            </label>
            <textarea
              rows={3}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="যেমন: কতদিন ধরে এই সমস্যা, কোনো ডাক্তার দেখানো হয়েছে কিনা ইত্যাদি..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-[#FAFAF7]"
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="text-xs md:text-sm text-gray-700">
              চিহ্নিত লক্ষণ: <span className="font-bold text-[#006B5B] text-base">{selectedSymptoms.length}</span> টি
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  রিসেট
                </button>
              )}

              <button
                onClick={handleCalculate}
                disabled={selectedSymptoms.length === 0}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedSymptoms.length > 0
                    ? "bg-[#006B5B] text-white hover:bg-[#004D40] shadow-md shadow-[#006B5B]/20 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>ফলাফল ও পরামর্শ দেখুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div id="diagnosis-result-section" className="space-y-6 animate-in fade-in duration-300">
          {/* Status Header */}
          <div className="p-6 rounded-2xl bg-radial from-[#006B5B]/10 via-[#FAFAF7] to-white border border-[#006B5B]/20">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  result.severityLevel === "high"
                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                    : result.severityLevel === "moderate"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-100 text-[#006B5B] border border-[#006B5B]/30"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {result.severityLevel === "high"
                  ? "উচ্চ গুরুত্বের লক্ষণাবলী"
                  : result.severityLevel === "moderate"
                  ? "মাঝারি লক্ষণাবলী"
                  : "সাধারণ প্রাথমিক লক্ষণ"}
              </span>

              <span className="text-xs text-gray-700">
                মোট নির্বাচিত লক্ষণ: <strong>{selectedSymptoms.length}</strong> টি
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#004D40] mb-2">
              সম্ভাব্য পর্যবেক্ষণ: {result.categorySummary}
            </h3>

            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              আপনার চিহ্নিত লক্ষণসমূহ বিশ্লেষণ করে প্রাথমিকভাবে এই বিষয়গুলো লক্ষ্য করা গেছে। তবে লক্ষণ থাকা মানেই নিশ্চিত সিহর বা জিনঘটিত বিষয় নয়। এটি মানসিক চাপ বা সাধারণ শারীরিক রোগও হতে পারে।
            </p>
          </div>

          {/* Direct WhatsApp Call to Action - Requested by User */}
          <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border-2 border-[#006B5B] shadow-md space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-full bg-[#006B5B] text-white shrink-0">
                <MessageCircle className="w-6 h-6 text-[#F2C94C]" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-[#004D40]">
                  অভিজ্ঞ শারঈ রাক্বীর সাথে WhatsApp-এ সরাসরি যোগাযোগ করুন
                </h4>
                <p className="text-xs md:text-sm text-gray-700 mt-1">
                  নিচের বাটনে চাপ দিলে আপনার চিহ্নিত <strong className="text-[#006B5B]">{selectedSymptoms.length}টি লক্ষণ</strong> এবং ফলাফলের সারসংক্ষেপ স্বয়ংক্রিয়ভাবে মেসেজে চলে যাবে, যাতে রাক্বী তাৎক্ষণিকভাবে আপনার অবস্থা বুঝতে পারেন।
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${raqiWhatsAppNumber}?text=${result.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-center text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#006B5B]/25 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-[#F2C94C]" />
                <span>ফলাফলসহ WhatsApp-এ মেসেজ পাঠান</span>
              </a>

              <button
                onClick={copyWhatsAppText}
                type="button"
                className="py-3.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                title="মেসেজের টেক্সট কপি করুন"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-500" />
                    <span>মেসেজ কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-gray-700 bg-white/70 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
              <span><em>পরামর্শ:</em> সরাসরি ফোন দেওয়ার পূর্বে হোয়াটসঅ্যাপে লক্ষণগুলোর বিস্তারিত মেসেজ পাঠিয়ে রাক্বীর সুবিধাজনক সময় জেনে নেওয়া উত্তম।</span>
            </div>
          </div>

          {/* Recommendations Checklist */}
          <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-gray-200 space-y-3">
            <h4 className="text-sm md:text-base font-bold text-[#004D40] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#006B5B]" />
              আপনার জন্য করণীয় প্রাথমিক আমল ও সতর্কতা:
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B] mt-1.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Ayat & Dua */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200">
              <h5 className="text-xs md:text-sm font-bold text-[#006B5B] mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#D4A017]" />
                প্রয়োজনীয় রুকইয়াহ আয়াতসমূহ:
              </h5>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {result.suggestedAyat.map((ayah, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#006B5B] font-bold">•</span>
                    {ayah}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200">
              <h5 className="text-xs md:text-sm font-bold text-[#006B5B] mb-2.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#D4A017]" />
                মাসনুন আশ্রয় প্রার্থনার দোয়া:
              </h5>
              <div className="space-y-2">
                {result.suggestedDua.map((d, i) => (
                  <p key={i} className="text-xs font-arabic text-emerald-950 bg-[#FAFAF7] p-2 rounded-lg border border-[#006B5B]/10 leading-relaxed text-right">
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reset / Check Again */}
          <div className="pt-2 text-center">
            <button
              onClick={handleReset}
              className="text-xs md:text-sm text-gray-500 hover:text-[#006B5B] font-medium inline-flex items-center gap-1.5 underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              পুনরায় নতুন করে লক্ষণ যাচাই করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
