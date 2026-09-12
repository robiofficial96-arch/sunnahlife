"use client";

import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Users
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `আসসালামু আলাইকুম।
সুন্নাহলাইফ প্ল্যাটফর্মের যোগাযোগ ফরম থেকে বার্তা:
• নাম: ${name}
• ফোন: ${phone}
• বিষয়: ${subject}
• বার্তা: ${message}`;

    window.open(`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>যোগাযোগ ও সহায়তা</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          যোগাযোগ ও হেল্পলাইন
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          যেকোনো জিজ্ঞাসা, রুকইয়াহ বিষয়ক শারঈ পরামর্শ বা অ্যাপয়েন্টমেন্টের প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">জরুরি হেল্পলাইন</h3>
            <p className="text-xs text-gray-600">{SITE_CONFIG.helplinePhone}</p>
            <p className="text-[11px] text-[#006B5B] font-medium">সকাল ১০:০০ - রাত ১০:০০</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">WhatsApp পরামর্শ</h3>
            <p className="text-xs text-gray-600">মেসেজ পাঠান ও পরামর্শ নিন</p>
            <a
              href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#006B5B] font-bold hover:underline inline-block"
            >
              সরাসরি চ্যাট করুন →
            </a>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">ইমেইল</h3>
            <p className="text-xs text-gray-600">{SITE_CONFIG.contactEmail}</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">চেম্বার ও অফিস</h3>
            <p className="text-xs text-gray-600">{SITE_CONFIG.officeAddress}</p>
          </div>

          <div className="p-5 rounded-3xl bg-blue-50/70 border border-blue-200/70 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1877F2] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">ফেসবুক কমিউনিটি গ্রুপ</h3>
            <p className="text-xs text-gray-600">আলোচনা ও অভিজ্ঞতার সুন্নাহভিত্তিক প্ল্যাটফর্ম</p>
            <a
              href={SITE_CONFIG.socialLinks.facebookGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1877F2] font-bold hover:underline inline-block"
            >
              গ্রুপে যোগ দিন →
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs">
          <h2 className="text-xl font-bold text-[#004D40] mb-2">
            আমাদের একটি বার্তা পাঠান
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            নিচের ফর্মটি পূরণ করলে তথ্যটি স্বয়ংক্রিয়ভাবে সাজিয়ে আমাদের অফিশিয়াল হোয়াটসঅ্যাপে প্রেরণ করা হবে।
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="০১৭xxxxxxxx"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                বিষয় *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="যেমন: রুকইয়াহ পরামর্শ, অভিযোগ বা জিজ্ঞাসা"
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                আপনার বার্তা *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার জিজ্ঞাসা বা বিবরণ লিখুন..."
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B] text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#F2C94C]" />
              <span>বার্তা পাঠান (Send via WhatsApp)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
