import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  MessageCircle, 
  AlertTriangle,
  Phone,
  MapPin,
  Users
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF7] border-t border-[#006B5B]/15 pt-12 pb-16 md:pb-12 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Trust / Principle Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-gray-200/70">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#006B5B]/15 shadow-2xs">
            <div className="p-2.5 rounded-lg bg-[#006B5B]/10 text-[#006B5B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">১০০% কুরআন ও সহীহ সুন্নাহ</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                শিরকমুক্ত, কুসংস্কারমুক্ত এবং নির্ভরযোগ্য ইসলামিক আলেমদের স্বীকৃত রুকইয়াহ পদ্ধতি।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#006B5B]/15 shadow-2xs">
            <div className="p-2.5 rounded-lg bg-[#D4A017]/15 text-[#D4A017] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">ভণ্ডামিমুক্ত আত্মনির্ভরশীলতা</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                তাবীজ-কবচ ও অসাধু কবিরাজি পরিহার করে নিজেই নিজের রুকইয়াহ করার পূর্ণাঙ্গ গাইড।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#006B5B]/15 shadow-2xs">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">চিকিৎসা বিজ্ঞানের সমন্বয়</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                রুকইয়াহ চিকিৎসা বিজ্ঞানের বিকল্প নয়; শারীরিক অসুস্থতায় চিকিৎসকের শরণাপন্ন হওয়াও সুন্নাহ।
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-44">
                <Image
                  src="/sunnahlife_logo.svg"
                  alt="সুন্নাহলাইফ"
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed">
              বাংলাদেশি মুসলিমদের জন্য একটি নির্ভরযোগ্য, নিরাপদ ও খাঁটি সুন্নাহভিত্তিক রুকইয়াহ শারইয়্যাহ ও আত্মরক্ষা শিক্ষা প্ল্যাটফর্ম।
            </p>

            {/* Direct Contact & Social Links */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#006B5B]" />
                <a href={`tel:${SITE_CONFIG.helplinePhone}`} className="hover:underline font-semibold font-mono">
                  {SITE_CONFIG.helplinePhone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#006B5B]" />
                <a 
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#006B5B] underline"
                >
                  গুগল ম্যাপে লোকেশন দেখুন
                </a>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={SITE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-blue-50 text-[#1877F2] hover:bg-blue-100 transition-colors"
                  title="Facebook Page (অফিশিয়াল পেজ)"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socialLinks.facebookGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-blue-50 text-[#1877F2] hover:bg-blue-100 transition-colors"
                  title="Facebook Group (কমিউনিটি গ্রুপ)"
                >
                  <Users className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-red-50 text-[#FF0000] hover:bg-red-100 transition-colors"
                  title="YouTube Channel"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Facebook Group Join Button */}
              <div className="pt-2">
                <a
                  href={SITE_CONFIG.socialLinks.facebookGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1877F2] text-xs font-semibold border border-blue-200/70 transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>ফেসবুক গ্রুপে যুক্ত হোন</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3 border-b border-[#006B5B]/15 pb-1">
              প্রয়োজনীয় বিভাগ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/assessment" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  লক্ষণ ও সমস্যা যাচাই (Diagnosis)
                </Link>
              </li>
              <li>
                <Link href="/self-ruqyah" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  সেলফ-রুকইয়াহ ৭ ধাপের গাইড
                </Link>
              </li>
              <li>
                <Link href="/ayat" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  রুকইয়াহ শারইয়্যাহ আয়াতসমূহ
                </Link>
              </li>
              <li>
                <Link href="/audio" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  রুকইয়াহ অডিও লাইব্রেরি
                </Link>
              </li>
              <li>
                <Link href="/duas" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  মাসনুন দোয়া ও হিফযের আযকার
                </Link>
              </li>
              <li>
                <Link href="/routine" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  দৈনন্দিন আমল ট্র্যাকার
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  পিডিএফ ও প্রিন্ট রিসোর্স
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  ইসলামিক আর্টিকেলস ভান্ডার
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  রাক্বী অ্যাপয়েন্টমেন্ট বুকিং
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics & Resources */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3 border-b border-[#006B5B]/15 pb-1">
              বিষয়ভিত্তিক আলোচনা
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/topics/evil-eye" className="hover:text-[#006B5B] transition-colors">
                  বদনজর ও হিংসা (Evil Eye)
                </Link>
              </li>
              <li>
                <Link href="/topics/sihr" className="hover:text-[#006B5B] transition-colors">
                  সিহর ও জাদুর প্রতিকার
                </Link>
              </li>
              <li>
                <Link href="/topics/jinn-fear" className="hover:text-[#006B5B] transition-colors">
                  ভয়-ভীতি ও দুঃস্বপ্ন নিবারণ
                </Link>
              </li>
              <li>
                <Link href="/topics/waswasah" className="hover:text-[#006B5B] transition-colors">
                  ওয়াসওয়াসা ও মানসিক অস্থিরতা
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#006B5B] transition-colors">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  আমাদের শারঈ সেবাসমূহ
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  রুকইয়াহ জ্ঞান ও নীতিমালা
                </Link>
              </li>
              <li>
                <Link href="/practitioners" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  অনুমোদিত রাক্বী ডিরেক্টরি
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#006B5B] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#006B5B]" />
                  যোগাযোগ ও চেম্বার
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#006B5B] transition-colors">
                  আমাদের সম্পর্কে ও নীতিমালা
                </Link>
              </li>
              <li>
                <Link href="/fraud-awareness" className="text-amber-700 hover:text-amber-900 font-medium transition-colors flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  ভণ্ড কবিরাজ চেনার ১০ লক্ষণ
                </Link>
              </li>
            </ul>
          </div>

          {/* Shariah Disclaimer */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3 border-b border-[#006B5B]/15 pb-1">
              গুরুত্বপূর্ণ শারঈ সতর্কতা
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              এই প্ল্যাটফর্মের সকল তথ্য সচেতনতামূলক। রুকইয়াহ কোনো যাদুকরী নিশ্চিত আরোগ্যের প্রতিশ্রুতি দেয় না। শেফা ও শিফা একমাত্র আল্লাহর হাতে। জটিল শারীরিক বা মানসিক অসুস্থতায় অভিজ্ঞ ডাক্তারের পরামর্শ গ্রহণ অপরিহার্য।
            </p>
          </div>
        </div>

        {/* Copyright & Developer Attribution */}
        <div className="pt-6 border-t border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} সুন্নাহলাইফ (Sunnah Life Care) | সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-gray-600 text-[11px] md:text-xs">
            <span>ডিজাইন ও ডেভেলপমেন্ট:</span>
            <a
              href="https://wa.me/8801969343158?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A7%A4%20%E0%A6%93%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%AC%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%9F%20%E0%A6%A1%E0%A6%BF%E0%A6%9C%E0%A6%BE%E0%A6%87%E0%A6%A8%20%E0%A6%93%20%E0%A6%A1%E0%A7%87%E0%A6%AD%E0%A7%87%E0%A6%B2%E0%A6%AA%E0%A6%AE%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%9F%20%E0%A6%B8%E0%A6%82%E0%A6%95%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A8%E0%A7%8D%E0%A6%A4%20%E0%A6%AC%E0%A6%BF%E0%A6%B7%E0%A6%AF%E0%A6%BC%E0%A7%87%20%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A7%8B%E0%A6%97%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A7%A4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006B5B] hover:text-[#004D40] font-semibold underline inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <span>Pixel Lab</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
