"use client";

import { useState } from "react";
import { RUQYAH_STEPS, RuqyahStep } from "@/data/ruqyahSteps";
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, Layers } from "lucide-react";

export default function SelfRuqyahSteps() {
  // Step 1 open by default so the user gets immediate context
  const [openSteps, setOpenSteps] = useState<number[]>([1]);

  const toggleStep = (stepNumber: number) => {
    setOpenSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const toggleAll = () => {
    if (openSteps.length === RUQYAH_STEPS.length) {
      setOpenSteps([]);
    } else {
      setOpenSteps(RUQYAH_STEPS.map((s) => s.stepNumber));
    }
  };

  const isAllOpen = openSteps.length === RUQYAH_STEPS.length;

  return (
    <div className="space-y-4">
      {/* Expand/Collapse All Control: Hidden on mobile/phone view */}
      <div className="hidden sm:flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-gray-500">
          মোট ৭টি ধারাবাহিক ধাপ (প্রয়োজনীয় ধাপে ক্লিক করে বিস্তারিত দেখুন)
        </span>
        <button
          onClick={toggleAll}
          className="text-xs font-bold text-[#29B34F] hover:text-[#166534] flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-[#29B34F]/5 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isAllOpen ? "সবগুলো সংক্ষেপ করুন" : "সবগুলো একসাথে দেখুন"}</span>
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3.5">
        {RUQYAH_STEPS.map((step) => {
          const isOpen = openSteps.includes(step.stepNumber);
          return (
            <div
              key={step.stepNumber}
              className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#29B34F] shadow-sm ring-1 ring-[#29B34F]/10"
                  : "border-gray-200 hover:border-[#29B34F]/40 shadow-2xs hover:shadow-xs"
              }`}
            >
              {/* Clickable Header */}
              <button
                onClick={() => toggleStep(step.stepNumber)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-emerald-50/20"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#29B34F] text-white shadow-xs"
                        : "bg-emerald-50 text-[#29B34F] border border-[#29B34F]/20"
                    }`}
                  >
                    ০{step.stepNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#D4A017] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 hidden sm:inline-block">
                        {step.subtitle}
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1 truncate">
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <span className="text-xs font-semibold text-[#29B34F] hidden sm:inline">
                    {isOpen ? "সংক্ষেপ করুন" : "বিস্তারিত"}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isOpen ? "bg-[#29B34F] text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 space-y-3.5 bg-gradient-to-b from-emerald-50/15 to-white animate-in fade-in-50 duration-200">
                  <div className="sm:hidden pt-1">
                    <span className="text-[11px] font-semibold text-[#D4A017] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {step.details}
                  </p>

                  {step.ayatOrDua && (
                    <div className="p-3 rounded-xl bg-[#FAFAF7] border border-[#29B34F]/15 text-xs sm:text-sm text-[#29B34F] font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4A017] shrink-0" />
                      <span>পাঠের নিয়ম: {step.ayatOrDua}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#29B34F]" />
                      জরুরি দিকনির্দেশনা:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {step.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#29B34F] mt-1.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
