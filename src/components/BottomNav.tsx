"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, ShieldCheck, Headphones, BookOpen, HeartPulse } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      label: "হোম",
      href: "/",
      icon: Home,
    },
    {
      label: "লক্ষণ পরীক্ষা",
      href: "/assessment",
      icon: Stethoscope,
      highlight: true,
    },
    {
      label: "সেবাসমূহ",
      href: "/services",
      icon: HeartPulse,
    },
    {
      label: "কুরআন",
      href: "/quran",
      icon: BookOpen,
    },
    {
      label: "সেলফ-রুকইয়াহ",
      href: "/self-ruqyah",
      icon: ShieldCheck,
    },
    {
      label: "অডিও",
      href: "/audio",
      icon: Headphones,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-lg border-t border-[#0047B1]/15 shadow-[0_-4px_20px_rgba(0,107,91,0.08)]">
      <nav className="flex items-center justify-around h-16 max-w-lg mx-auto px-1 safe-area-pb">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all ${
                isActive
                  ? "text-[#0047B1] font-bold"
                  : "text-gray-500 hover:text-[#0047B1]"
              }`}
            >
              {/* Highlight pill for assessment / active tab */}
              {item.highlight ? (
                <div
                  className={`p-1.5 rounded-2xl transition-all ${
                    isActive
                      ? "bg-[#0047B1] text-white shadow-md shadow-[#0047B1]/30 scale-105"
                      : "bg-[#0047B1]/10 text-[#0047B1]"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              ) : (
                <div>
                  <IconComponent
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "scale-110 text-[#0047B1]" : "text-gray-500"
                    }`}
                  />
                </div>
              )}

              <span
                className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight whitespace-nowrap ${
                  isActive ? "text-[#0047B1] font-semibold" : "text-gray-600 font-normal"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
