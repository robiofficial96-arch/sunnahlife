"use client";

import { useState } from "react";
import { 
  ASSESSMENT_STEPS, 
  ASSESSMENT_QUESTIONS, 
  ComprehensiveResult, 
  evaluateComprehensiveAssessment 
} from "@/data/assessmentQuestions";
import { 
  Check, 
  AlertCircle, 
  ShieldAlert, 
  MessageCircle, 
  RotateCcw, 
  BookOpen, 
  HeartHandshake, 
  ChevronRight,
  ChevronLeft,
  Info,
  Copy,
  CheckCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartPulse
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface SymptomCheckerProps {
  initialCategory?: string;
  isCompact?: boolean;
}

export default function SymptomChecker({ isCompact = false }: SymptomCheckerProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userNote, setUserNote] = useState("");
  const [result, setResult] = useState<ComprehensiveResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Handle option select
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Questions for the current step
  const currentQuestions = ASSESSMENT_QUESTIONS.filter((q) => q.step === currentStep);

  // Calculate diagnosis
  const handleAnalyze = () => {
    const evalResult = evaluateComprehensiveAssessment(answers, userNote);
    setResult(evalResult);
    setTimeout(() => {
      const el = document.getElementById("diagnosis-result-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleReset = () => {
    setAnswers({});
    setUserNote("");
    setResult(null);
    setCurrentStep(1);
  };

  const copyWhatsAppText = () => {
    if (!result) return;
    const decoded = decodeURIComponent(result.whatsappMessage);
    navigator.clipboard.writeText(decoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Answered count in current step
  const currentStepAnsweredCount = currentQuestions.filter(
    (q) => answers[q.id] !== undefined
  ).length;

  const totalAnsweredCount = Object.keys(answers).length;
  const progressPercent = Math.round((currentStep / 5) * 100);

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-5 md:p-8">
      {/* Top Banner / Disclaimer */}
      <div className="mb-6 bg-[#FAFAF7] border border-[#D4A017]/30 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-gray-700">
        <Info className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#006B5B] font-semibold">কুরআন ও সুন্নাহ ভিত্তিক বহুস্তরীয় স্ব-নিরীক্ষণ:</strong>{" "}
          নিচের ৫টি ধাপে আপনার বর্তমান অবস্থা, ঘুম, শরীর ও পারিবারিক অভিজ্ঞতার সঠিক উত্তর নির্বাচন করুন। অন্যান্য ওয়েবসাইটের মতো এখানে একক কোনো প্রশ্নের উপর নির্ভর না করে ১৫টি সমন্বিত সূচকের মাধ্যমে আপনার সমস্যার সম্ভাব্য মাত্রা বিশ্লেষণ করা হবে।
        </div>
      </div>

      {!result ? (
        <div className="space-y-8">
          {/* Step Progress Header */}
          <div className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
              <span className="font-bold text-[#004D40] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4A017]" />
                ধাপ {currentStep} / ৫: {ASSESSMENT_STEPS[currentStep - 1].title}
              </span>
              <span className="text-gray-500 text-xs">
                মোট উত্তর দেওয়া হয়েছে: <strong className="text-[#006B5B]">{totalAnsweredCount}</strong> / ১৫
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#006B5B] to-[#D4A017] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step Pills */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {ASSESSMENT_STEPS.map((s) => {
                const isCurrent = s.step === currentStep;
                const isPassed = s.step < currentStep;
                return (
                  <button
                    key={s.step}
                    onClick={() => setCurrentStep(s.step)}
                    className={`py-1.5 px-1 rounded-xl text-center text-[10px] md:text-xs font-semibold transition-all truncate ${
                      isCurrent
                        ? "bg-[#006B5B] text-white shadow-xs"
                        : isPassed
                        ? "bg-[#006B5B]/10 text-[#006B5B]"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {s.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Step Questions */}
          <div className="space-y-8">
            {currentQuestions.map((q, qIndex) => {
              const selectedOptIndex = answers[q.id];
              const questionGlobalIndex =
                (currentStep - 1) * 3 + qIndex + 1;

              return (
                <div
                  key={q.id}
                  className="p-5 md:p-6 rounded-3xl bg-[#FAFAF7]/70 border border-gray-200/80 hover:border-[#006B5B]/30 transition-all space-y-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#006B5B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {questionGlobalIndex}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                    {q.subtitle && (
                      <p className="text-xs text-gray-500 pl-8 leading-relaxed">
                        {q.subtitle}
                      </p>
                    )}
                  </div>

                  {/* 3 Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-0 md:pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOptIndex === optIdx;

                      // Color coding based on severity
                      const isSevere = opt.points >= 3;
                      const isModerate = opt.points === 1 || opt.points === 2;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3.5 rounded-2xl text-left transition-all relative flex flex-col justify-between cursor-pointer border ${
                            isSelected
                              ? isSevere
                                ? "bg-rose-50 border-rose-400 shadow-xs text-rose-950"
                                : isModerate
                                ? "bg-amber-50 border-amber-400 shadow-xs text-amber-950"
                                : "bg-emerald-50 border-emerald-500 shadow-xs text-emerald-950"
                              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                isSevere
                                  ? "bg-rose-100 text-rose-800"
                                  : isModerate
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {optIdx === 0 ? "স্বাভাবিক" : optIdx === 1 ? "মাঝে মাঝে" : "তীব্র/ঘনঘন"}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#006B5B] border-[#006B5B] text-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </div>
                          <p className="text-xs font-medium leading-relaxed">
                            {opt.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* User Note Box (Only on Step 5) */}
          {currentStep === 5 && (
            <div className="p-5 rounded-3xl bg-white border border-gray-200 space-y-2">
              <label className="block text-xs font-semibold text-gray-800">
                অতিরিক্ত কোনো লক্ষণ বা ব্যক্তিগত অভিজ্ঞতা (ঐচ্ছিক):
              </label>
              <textarea
                rows={3}
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="যেমন: কতদিন ধরে এই সমস্যা, পূর্বে তাবীজ নেওয়া হয়েছিল কিনা বা ডাক্তার কী বলেছেন..."
                className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-xs bg-[#FAFAF7]"
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs md:text-sm font-semibold hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী ধাপ</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-6 py-2.5 rounded-xl bg-[#006B5B] text-white text-xs md:text-sm font-semibold hover:bg-[#004D40] flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>পরবর্তী ধাপ ({currentStep + 1}/৫)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAnalyze}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#006B5B] to-[#004D40] text-white text-xs md:text-sm font-bold hover:opacity-95 shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F2C94C]" />
                <span>ফলাফল বিশ্লেষণ ও রিপোর্ট দেখুন</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULT SECTION */
        <div id="diagnosis-result-section" className="space-y-8 animate-in fade-in duration-300">
          {/* Main Assessment Card */}
          <div
            className={`p-6 md:p-8 rounded-3xl border shadow-xs space-y-4 ${
              result.severityLevel === "severe"
                ? "bg-rose-50/70 border-rose-200"
                : result.severityLevel === "moderate"
                ? "bg-amber-50/70 border-amber-200"
                : "bg-emerald-50/70 border-emerald-200"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
                  result.severityLevel === "severe"
                    ? "bg-rose-100 text-rose-900 border border-rose-300"
                    : result.severityLevel === "moderate"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {result.severityLabel}
              </span>

              <span className="text-xs font-semibold text-gray-600 bg-white/80 px-3 py-1 rounded-full border border-gray-200">
                মোট নির্ণীত স্কোর: <strong>{result.totalScore}</strong> / {result.maxScore}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              ১৫টি প্রশ্নের ভিত্তিতে আপনার সামগ্রিক রুকইয়াহ ডায়াগনোসিস
            </h2>

            <div className="space-y-2 text-xs md:text-sm text-gray-700 leading-relaxed">
              <p>
                আপনার দেওয়া উত্তরসমূহ পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করা হয়েছে। নিচে চিহ্নিত সম্ভাব্য প্রভাব ও কুরআন-সুন্নাহ মোতাবেক আরোগ্যের গাইডলাইন দেওয়া হলো:
              </p>
            </div>
          </div>

          {/* Multi-Factor Radar Bars */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-5">
            <h3 className="text-base font-bold text-[#004D40] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4A017]" />
              লক্ষণভিত্তিক তুলনামূলক মাত্রা (Probability Indicators)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Evil Eye */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">বদনজর ও হিংসার আলামত</span>
                  <span className="text-[#006B5B] font-bold">{result.evilEyeScore}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006B5B] h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.evilEyeScore}%` }}
                  />
                </div>
              </div>

              {/* Sihr */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">সিহর ও জাদুর প্রভাব</span>
                  <span className="text-rose-600 font-bold">{result.sihrScore}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.sihrScore}%` }}
                  />
                </div>
              </div>

              {/* Jinn Affliction */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">আধ্যাত্মিক স্পর্শ ও জিনঘটিত ভীতি</span>
                  <span className="text-purple-600 font-bold">{result.jinnScore}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.jinnScore}%` }}
                  />
                </div>
              </div>

              {/* Waswasah */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">শয়তানী ওয়াসওয়াসা ও মানসিক অবসাদ</span>
                  <span className="text-amber-600 font-bold">{result.waswasahScore}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.waswasahScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Steps & Prescription */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Steps */}
            <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-[#004D40] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#006B5B]" />
                করণীয় প্রাথমিক পদক্ষেপ
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                {result.actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Ayat & Duas */}
            <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-[#004D40] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4A017]" />
                আমলযোগ্য সূরা ও তিলাওয়াত
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {result.recommendedSurahs.map((surah, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                    <span>{surah}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action: WhatsApp Consultation */}
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-[#004D40]">
                  এই রিপোর্টের ভিত্তিতে সরাসরি অভিজ্ঞ রাক্বীর পরামর্শ চান?
                </h4>
                <p className="text-xs text-gray-600">
                  আপনার ১৫টি প্রশ্নের উত্তর স্বয়ংক্রিয়ভাবে সাজিয়ে সুন্নাহলাইফ অফিশিয়াল হোয়াটসঅ্যাপে পাঠাতে নিচের বাটনে চাপুন।
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={copyWhatsAppText}
                  className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  {copied ? <CheckCheck className="w-4 h-4 text-[#006B5B]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "কপি হয়েছে!" : "রিপোর্ট কপি করুন"}</span>
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${result.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
                  <span>WhatsApp-এ রিপোর্ট পাঠান</span>
                </a>
              </div>
            </div>
          </div>

          {/* Retake Test Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#006B5B] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>পুনরায় পরীক্ষা দিন (Retake Assessment)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
