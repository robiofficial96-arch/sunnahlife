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
  // Current question index from 0 to 14 (one question at a time)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userNote, setUserNote] = useState("");
  const [result, setResult] = useState<ComprehensiveResult | null>(null);
  const [copied, setCopied] = useState(false);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];

  // Handle option select with automatic smooth transition to next question
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    // Auto-advance to next question after a brief delay if not the last question
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 300);
    }
  };

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
    setCurrentQuestionIndex(0);
  };

  const copyWhatsAppText = () => {
    if (!result) return;
    const decoded = decodeURIComponent(result.whatsappMessage);
    navigator.clipboard.writeText(decoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const totalAnsweredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const isCurrentQuestionAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="w-full bg-white rounded-3xl border border-[#006B5B]/15 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Top Banner / Disclaimer */}
      <div className="mb-6 bg-[#FAFAF7] border border-[#D4A017]/30 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-gray-700">
        <Info className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#006B5B] font-semibold">কুরআন ও সুন্নাহ ভিত্তিক বহুস্তরীয় স্ব-নিরীক্ষণ:</strong>{" "}
          প্রতিটি প্রশ্ন মনোযোগ দিয়ে পড়ে আপনার ক্ষেত্রে যা প্রযোজ্য তা নির্বাচন করুন। একটি একটি করে ১৫টি প্রশ্নের সঠিক উত্তর দিলে সিস্টেম আপনার সমস্যা নিখুঁতভাবে বিশ্লেষণ করবে।
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
              <span className="font-bold text-[#004D40] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4A017]" />
                {currentQ.categoryTitle}
              </span>
              <span className="text-gray-500 text-xs font-medium">
                প্রশ্ন <strong className="text-[#006B5B] text-sm">{currentQuestionIndex + 1}</strong> / {totalQuestions}
                <span className="ml-2 font-mono text-gray-400">({progressPercent}% সম্পন্ন)</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#006B5B] to-[#D4A017] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Mini Question Number Dots (1 to 15) */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pt-1 pb-1 scrollbar-none">
              {ASSESSMENT_QUESTIONS.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isCurrent
                        ? "bg-[#006B5B] text-white shadow-sm ring-2 ring-[#006B5B]/30 scale-110"
                        : isAnswered
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                    title={`প্রশ্ন ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SINGLE QUESTION CARD (One by One) */}
          <div 
            key={currentQ.id}
            className="p-5 sm:p-7 md:p-8 rounded-3xl bg-[#FAFAF7] border border-[#006B5B]/15 shadow-xs space-y-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Question Title & Subtitle */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-bold">
                <span>প্রশ্ন {currentQuestionIndex + 1}</span>
                <span>•</span>
                <span>ধাপ {currentQ.step}</span>
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
                {currentQ.question}
              </h2>

              {currentQ.subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* 3 Large Option Cards */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;
                const isSevere = opt.points >= 3;
                const isModerate = opt.points === 1 || opt.points === 2;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all relative flex items-center justify-between gap-4 cursor-pointer border ${
                      isSelected
                        ? isSevere
                          ? "bg-rose-50/80 border-rose-400 shadow-xs text-rose-950 ring-2 ring-rose-300"
                          : isModerate
                          ? "bg-amber-50/80 border-amber-400 shadow-xs text-amber-950 ring-2 ring-amber-300"
                          : "bg-emerald-50/80 border-emerald-500 shadow-xs text-emerald-950 ring-2 ring-emerald-300"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#006B5B]/40 hover:bg-[#FAFAF7]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Radio Circle */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? isSevere
                              ? "bg-rose-600 border-rose-600 text-white"
                              : isModerate
                              ? "bg-[#D4A017] border-[#D4A017] text-white"
                              : "bg-[#006B5B] border-[#006B5B] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Option Text */}
                      <span className="text-xs sm:text-sm md:text-base font-medium leading-snug">
                        {opt.label}
                      </span>
                    </div>

                    {/* Badge */}
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                        isSevere
                          ? "bg-rose-100 text-rose-800"
                          : isModerate
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {optIdx === 0 ? "স্বাভাবিক" : optIdx === 1 ? "মাঝে মাঝে" : "তীব্র/ঘনঘন"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Optional Additional Note Box on Final Question (Question 15) */}
            {currentQuestionIndex === totalQuestions - 1 && (
              <div className="pt-4 border-t border-gray-200/80 space-y-2">
                <label className="block text-xs font-semibold text-gray-800">
                  অতিরিক্ত কোনো লক্ষণ বা ব্যক্তিগত অভিজ্ঞতা (ঐচ্ছিক):
                </label>
                <textarea
                  rows={3}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="যেমন: কতদিন ধরে এই সমস্যা, পূর্বে তাবীজ নেওয়া হয়েছিল কিনা বা ডাক্তার কী বলেছেন..."
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-xs bg-white"
                />
              </div>
            )}
          </div>

          {/* Navigation Controls: Previous / Next / Submit */}
          <div className="pt-2 flex items-center justify-between gap-3">
            {/* Previous Question Button */}
            {currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 sm:px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-100 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী প্রশ্ন</span>
              </button>
            ) : (
              <div />
            )}

            {/* Next or Analyze Button */}
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
                disabled={!isCurrentQuestionAnswered}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                  isCurrentQuestionAnswered
                    ? "bg-[#006B5B] text-white hover:bg-[#004D40]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>পরবর্তী প্রশ্ন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!isCurrentQuestionAnswered}
                className={`px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  isCurrentQuestionAnswered
                    ? "bg-gradient-to-r from-[#006B5B] to-[#004D40] text-white hover:opacity-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F2C94C]" />
                <span>ফলাফল ও পরামর্শ বিশ্লেষণ করুন</span>
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
                <strong>সম্ভাব্য প্রাথমিক পর্যবেক্ষণ:</strong>{" "}
                {result.primarySuspicions && result.primarySuspicions.length > 0 
                  ? result.primarySuspicions.join(" • ")
                  : "নির্দিষ্ট কোনো তীব্র নেতিবাচক লক্ষণ পরিলক্ষিত হয়নি।"}
              </p>
              <p className="text-xs text-gray-500 italic">
                * মনে রাখবেন: এই ফলাফল একটি প্রাথমিক নির্দেশক। কুরআন-সুন্নাহর সঠিক আমল বজায় রাখুন এবং প্রয়োজনে অভিজ্ঞ শারঈ রাক্বীর পরামর্শ নিন।
              </p>
            </div>
          </div>

          {/* 4 Multi-Factor Probability Meters */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200 space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#004D40] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#006B5B]" />
                ৪টি ক্যাটাগরির সম্ভাব্যতার বিশ্লেষণ (Probability Meters)
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                আপনার দেওয়া উত্তরের ওপর ভিত্তি করে কোন ক্যাটাগরির প্রভাব কতটা প্রবল তা নিচে তুলে ধরা হলো:
              </p>
            </div>

            <div className="space-y-4">
              {/* Evil Eye Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    বদনজর ও হিংসা (Evil Eye / Hasad)
                  </span>
                  <span className="text-amber-800 font-bold">{result.evilEyeScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.evilEyeScore}%` }}
                  />
                </div>
              </div>

              {/* Sihr Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    সিহর ও কালো জাদু (Black Magic / Sihr)
                  </span>
                  <span className="text-rose-800 font-bold">{result.sihrScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.sihrScore}%` }}
                  />
                </div>
              </div>

              {/* Jinn Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    জ্বিন স্পর্শ বা উপস্থিতি (Jinn Affliction)
                  </span>
                  <span className="text-purple-800 font-bold">{result.jinnScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.jinnScore}%` }}
                  />
                </div>
              </div>

              {/* Waswasah Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    শয়তানি ওয়াসওয়াসা ও মানসিক অস্থিরতা (Waswasah / Anxiety)
                  </span>
                  <span className="text-teal-800 font-bold">{result.waswasahScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.waswasahScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Prescriptions & Amol */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#FAFAF7] border border-[#006B5B]/15 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-[#004D40] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#006B5B]" />
              আপনার জন্য সুনির্দিষ্ট প্রাথমিক প্রেসক্রিপশন ও আমল
            </h3>

            <ul className="space-y-2.5">
              {result.actionSteps.map((action, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-gray-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Direct Action & Copy Section */}
          <div className="p-6 md:p-8 rounded-3xl bg-radial from-[#006B5B] to-[#004D40] text-white shadow-lg space-y-5 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#F2C94C] flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                অভিজ্ঞ রাক্বীর সাথে যোগাযোগ
              </span>
              <h3 className="text-lg md:text-2xl font-bold">
                এই ডায়াগনোসিস রিপোর্টটি অভিজ্ঞ রাক্বীকে পাঠাতে চান?
              </h3>
              <p className="text-xs md:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                আপনার ১৫টি প্রশ্নের উত্তরের সংক্ষিপ্ত সারাংশ সহকারে সরাসরি আমাদের অভিজ্ঞ শারঈ রাক্বী প্যানেলের সাথে WhatsApp-এ ফ্রি শেয়ার করে পরামর্শ গ্রহণ করুন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${result.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#D4A017] text-[#004D40] font-bold text-xs md:text-sm hover:bg-[#F2C94C] shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp-এ রাক্বীকে রিপোর্ট পাঠান</span>
              </a>

              <button
                onClick={copyWhatsAppText}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/20"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-[#F2C94C]" />
                    <span className="text-[#F2C94C]">রিপোর্ট কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>রিপোর্ট টেক্সট কপি করুন</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-3.5 rounded-2xl text-emerald-100 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>পুনরায় পরীক্ষা করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
