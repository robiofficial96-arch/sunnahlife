"use client";

import { useState } from "react";
import { FAQ_LIST, FAQItem } from "@/data/faqs";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["what-is-ruqyah", "can-i-do-myself"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "all", label: "সব প্রশ্ন" },
    { id: "basics", label: "মৌলিক রুকইয়াহ" },
    { id: "self_ruqyah", label: "সেলফ-রুকইয়াহ" },
    { id: "water_oil", label: "পানি ও তেল ব্যবহার" },
    { id: "women", label: "নারীদের বিশেষ মাসআলা" },
    { id: "medical", label: "চিকিৎসা ও ওষুধ" },
  ];

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCat = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_LIST.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Structured Data (JSON-LD) for FAQ Rich Snippets and AI Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          রুকইয়াহ শারইয়্যাহ, সেলফ-রুকইয়াহ, তাবীজ ও আধুনিক চিকিৎসা সংক্রান্ত যাবতীয় প্রশ্নের নির্ভরযোগ্য উত্তর।
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="প্রশ্ন বা বিষয় লিখে খুঁজুন (যেমন: তাবীজ, পানি, সেলফ রুকইয়াহ)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm bg-white shadow-2xs"
        />
      </div>

      {/* Categories */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[#006B5B]/15 bg-white shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-[#006B5B] transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#006B5B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-[#FAFAF7]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            কোনো প্রশ্ন খুঁজে পাওয়া যায়নি।
          </div>
        )}
      </div>

      {/* Ask Question / WhatsApp CTA */}
      <div className="p-6 md:p-8 rounded-3xl bg-radial from-white to-[#FAFAF7] border border-[#006B5B]/20 text-center space-y-3">
        <h3 className="text-base md:text-lg font-bold text-[#004D40]">
          আপনার কাঙ্ক্ষিত প্রশ্নের উত্তর খুঁজে পাননি?
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          সরাসরি আমাদের শারঈ রাক্বীর হেল্পলাইনে আপনার প্রশ্ন লিখে হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারেন।
        </p>
        <a
          href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম। রুকইয়াহ সম্পর্কে আমার একটি প্রশ্ন ছিলো...")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006B5B] text-white font-bold text-xs hover:bg-[#004D40] transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
          <span>WhatsApp-এ সরাসরি প্রশ্ন করুন</span>
        </a>
      </div>
    </div>
  );
}
