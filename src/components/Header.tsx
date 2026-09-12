"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Stethoscope, 
  ShieldCheck, 
  Headphones, 
  BookOpen, 
  Calendar,
  HelpCircle,
  AlertTriangle,
  Users
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "হোম" },
    { 
      href: "/assessment", 
      label: "লক্ষণ পরীক্ষা", 
      icon: Stethoscope, 
      highlight: true 
    },
    { href: "/quran", label: "আল-কুরআন", icon: BookOpen },
    { href: "/audio", label: "রুকইয়াহ অডিও", icon: Headphones },
    { href: "/self-ruqyah", label: "সেলফ-রুকইয়াহ", icon: ShieldCheck },
    { href: "/ayat", label: "রুকইয়াহ আয়াত", icon: BookOpen },
    { href: "/articles", label: "আর্টিকেলস", icon: BookOpen },
    { href: "/duas", label: "দোয়া ও আযকার", icon: BookOpen },
    { href: "/services", label: "সেবাসমূহ" },
    { href: "/knowledge", label: "রুকইয়াহ জ্ঞান" },
    { href: "/routine", label: "আমল ট্র্যাকার" },
    { href: "/topics", label: "বিষয়সমূহ" },
    { href: "/practitioners", label: "রাক্বী ডিরেক্টরি" },
    { href: "/resources", label: "পিডিএফ রিসোর্স" },
    { href: "/appointment", label: "অ্যাপয়েন্টমেন্ট", icon: Calendar },
    { href: "/faq", label: "জিজ্ঞাসা (FAQ)", icon: HelpCircle },
    { href: "/fraud-awareness", label: "ভণ্ড কবিরাজ সতর্কতা", icon: AlertTriangle },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#006B5B]/10 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Full Logo Vector Only - No extra text needed */}
            <Link href="/" className="flex items-center group shrink-0" title="সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে">
              <div className="relative h-12 md:h-14 w-36 md:w-44">
                <Image
                  src="/sunnahlife_logo.svg"
                  alt="সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে"
                  fill
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.slice(0, 8).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#006B5B] bg-[#006B5B]/10 font-semibold"
                        : "text-gray-700 hover:text-[#006B5B] hover:bg-[#FAFAF7]"
                    }`}
                  >
                    {link.label}
                    {link.highlight && (
                      <span className="text-[9px] bg-[#D4A017] text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                        যাচাই
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/appointment"
                className="px-4 py-2 text-xs md:text-sm font-semibold rounded-xl bg-[#006B5B] text-white hover:bg-[#004D40] shadow-2xs transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-[#F2C94C]" />
                <span>অ্যাপয়েন্টমেন্ট</span>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex xl:hidden items-center gap-1.5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 hover:text-[#006B5B] hover:bg-[#FAFAF7] rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-[#006B5B]/10 text-[#006B5B] font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[10px] bg-[#D4A017] text-white px-2 py-0.5 rounded-full font-bold">
                      লক্ষণ যাচাই
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/assessment"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold rounded-xl bg-[#006B5B]/10 text-[#006B5B] border border-[#006B5B]/20 flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-[#006B5B]" />
                <span>নিজের বা পরিবারের লক্ষণ পরীক্ষা করুন</span>
              </Link>
              <Link
                href="/appointment"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold rounded-xl bg-[#006B5B] text-white flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#F2C94C]" />
                <span>অ্যাপয়েন্টমেন্ট বুকিং করুন</span>
              </Link>
              <a
                href={SITE_CONFIG.socialLinks.facebookGroup}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold rounded-xl bg-blue-50 text-[#1877F2] border border-blue-200 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-[#1877F2]" />
                <span>ফেসবুক গ্রুপে যুক্ত হোন</span>
              </a>
            </div>
          </div>
        )}
      </header>
  );
}
