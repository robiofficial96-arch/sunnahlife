import Link from "next/link";
import Image from "next/image";
import { Home, Stethoscope, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-40 h-24 mx-auto">
          <Image
            src="/sunnahlife_logo.svg"
            alt="সুন্নাহলাইফ"
            fill
            sizes="160px"
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#006B5B]">৪০৪</span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            আপনি যে লিংকটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল টাইপ করা হয়েছে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#006B5B] text-white text-xs font-semibold hover:bg-[#004D40] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>হোমপেজে ফিরে যান</span>
          </Link>

          <Link
            href="/assessment"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#006B5B] text-[#006B5B] text-xs font-semibold hover:bg-[#006B5B]/5 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Stethoscope className="w-4 h-4" />
            <span>লক্ষণ পরীক্ষা করুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
