"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Headphones, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Search,
  Filter,
  BarChart3,
  Lock,
  LogOut
} from "lucide-react";
import { ARTICLES_LIST } from "@/data/articles";
import { RUQYAH_AYAT_LIST } from "@/data/ayat";
import { DUA_LIST } from "@/data/duas";
import { RUQYAH_AUDIO_LIST } from "@/data/ruqyahAudio";

interface DemoBooking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed";
}

const INITIAL_BOOKINGS: DemoBooking[] = [
  {
    id: "B-101",
    name: "মুহাম্মদ তারিকুল ইসলাম",
    phone: "01711223344",
    service: "অনলাইন শারঈ রুকইয়াহ কনসালটেশন",
    date: "১৪ সেপ্টেম্বর, ২০২৬",
    timeSlot: "রাত ৮:০০ - ৯:০০",
    status: "confirmed",
  },
  {
    id: "B-102",
    name: "ফাতিমা আক্তার (স্বামীর মাধ্যমে)",
    phone: "01822334455",
    service: "সরাসরি চেম্বারে রুকইয়াহ সেশন",
    date: "১৫ সেপ্টেম্বর, ২০২৬",
    timeSlot: "দুপুর ১২:০০ - ১:০০",
    status: "pending",
  },
  {
    id: "B-103",
    name: "আব্দুর রহমান",
    phone: "01933445566",
    service: "দাম্পত্য ও পারিবারিক কাউন্সেলিং",
    date: "১৬ সেপ্টেম্বর, ২০২৬",
    timeSlot: "সন্ধ্যা ৬:৩০ - ৭:৩০",
    status: "pending",
  },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "content">("overview");
  const [bookings, setBookings] = useState<DemoBooking[]>(INITIAL_BOOKINGS);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("sunnahlife_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoaded(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "7860" || passcode === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sunnahlife_admin_auth", "true");
      setError("");
    } else {
      setError("ভুল পিন কোড! অনুগ্রহ করে সঠিক অ্যাডমিন পিন দিন।");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sunnahlife_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const toggleBookingStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextStatus: DemoBooking["status"] =
            b.status === "pending"
              ? "confirmed"
              : b.status === "confirmed"
              ? "completed"
              : "pending";
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.phone.includes(searchFilter) ||
      b.service.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (!isLoaded) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#006B5B]/20 p-6 md:p-8 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-[#004D40]">অ্যাডমিন অ্যাক্সেস লক</h1>
            <p className="text-xs text-gray-500">
              এটি সুন্নাহলাইফ প্ল্যাটফর্মের অভ্যন্তরীণ প্রশাসনিক এলাকা। প্রবেশ করতে অ্যাডমিন পিন প্রদান করুন।
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                placeholder="পিন কোড লিখুন"
                className="w-full text-center tracking-widest text-lg font-mono p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#006B5B]"
                autoFocus
              />
              {error && <p className="text-xs text-red-600 font-medium mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </form>

          <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-100">
            নিরাপত্তা কোড: <span className="font-mono font-semibold text-gray-600">7860</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#006B5B]" />
            <span>অ্যাডমিন ম্যানেজমেন্ট পোর্টাল (RPD Section 28)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#004D40] mt-1">
            সুন্নাহলাইফ ড্যাশবোর্ড ও কনটেন্ট কন্ট্রোল
          </h1>
        </div>

        {/* Tab Switcher & Logout */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#006B5B]"
              }`}
            >
              ওভারভিউ
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "bookings"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#006B5B]"
              }`}
            >
              অ্যাপয়েন্টমেন্ট ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "content"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#006B5B]"
              }`}
            >
              কনটেন্ট তালিকা
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex items-center gap-1 cursor-pointer"
            title="অ্যাডমিন প্যানেল থেকে লগআউট"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
          <span className="text-xs text-gray-500 font-medium">মোট ভিজিটর (মাসে)</span>
          <p className="text-2xl font-bold text-[#004D40]">১২,৪৫০+</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ ১৮% বৃদ্ধি</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
          <span className="text-xs text-gray-500 font-medium">লক্ষণ পরীক্ষা সম্পন্ন</span>
          <p className="text-2xl font-bold text-[#004D40]">১,৮২০+</p>
          <span className="text-[11px] text-emerald-600 font-semibold">ডায়াগনোসিস টুল</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
          <span className="text-xs text-gray-500 font-medium">অ্যাপয়েন্টমেন্ট বুকিং</span>
          <p className="text-2xl font-bold text-[#D4A017]">৪৩ টি</p>
          <span className="text-[11px] text-amber-600 font-semibold">২টি অপেক্ষমান</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
          <span className="text-xs text-gray-500 font-medium">প্রকাশিত কনটেন্ট</span>
          <p className="text-2xl font-bold text-[#006B5B]">
            {ARTICLES_LIST.length + RUQYAH_AYAT_LIST.length + DUA_LIST.length} টি
          </p>
          <span className="text-[11px] text-[#006B5B] font-semibold">আয়াত, দোয়া ও আর্টিকেল</span>
        </div>
      </div>

      {/* Content based on Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Bookings Table */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#004D40] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#006B5B]" />
                সর্বশেষ অ্যাপয়েন্টমেন্টসমূহ
              </h3>
              <button
                onClick={() => setActiveTab("bookings")}
                className="text-xs text-[#006B5B] font-semibold hover:underline"
              >
                সব দেখুন →
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map((b) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{b.name}</h4>
                    <p className="text-[11px] text-gray-500">{b.service} • {b.timeSlot}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : b.status === "completed"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {b.status === "confirmed" ? "নিশ্চিত" : b.status === "completed" ? "সম্পন্ন" : "অপেক্ষমান"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Workflow Status */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#004D40] flex items-center gap-2 border-b border-gray-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#006B5B]" />
              শারঈ কনটেন্ট রিভিউ ওয়ার্কফ্লো (RPD Section 27)
            </h3>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900 font-medium">
                <span>১. ড্রাফট তৈরি (Author Draft)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900 font-medium">
                <span>২. হাদীস ও আলেম পর্যালোচনা (Scholarly Review)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900 font-medium">
                <span>৩. অ্যাডমিন অনুমোদন (Admin Approval)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-100 text-emerald-950 font-bold">
                <span>৪. সাইটে প্রকাশ (Published on Web)</span>
                <CheckCircle2 className="w-4 h-4 text-[#006B5B]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#004D40]">
              সকল অ্যাপয়েন্টমেন্ট রিকোয়েস্ট তালিকা
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
                className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-[#FAFAF7] text-gray-800 border-b border-gray-100 font-bold">
                <tr>
                  <th className="p-3">আইডি</th>
                  <th className="p-3">রোগীর নাম</th>
                  <th className="p-3">ফোন নম্বর</th>
                  <th className="p-3">সেবার ধরন</th>
                  <th className="p-3">তারিখ ও সময়</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3 font-mono text-gray-400">{b.id}</td>
                    <td className="p-3 font-semibold text-gray-900">{b.name}</td>
                    <td className="p-3 font-mono">{b.phone}</td>
                    <td className="p-3">{b.service}</td>
                    <td className="p-3">
                      <div>{b.date}</div>
                      <div className="text-[11px] text-gray-400">{b.timeSlot}</div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleBookingStatus(b.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "completed"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                        title="স্ট্যাটাস পরিবর্তন করতে ক্লিক করুন"
                      >
                        {b.status === "confirmed"
                          ? "নিশ্চিত (Confirmed)"
                          : b.status === "completed"
                          ? "সম্পন্ন (Completed)"
                          : "অপেক্ষমান (Pending)"}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/${b.phone.replace(/^0/, "880")}?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A7%A4%20%E0%A6%B8%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%BE%E0%A6%B9%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%AB%20%E0%A6%A5%E0%A7%87%E0%A6%95%E0%A7%87%20%E0%A6%86%E0%A6%AA%E0%A6%A8%E0%A6%BE%E0%A6%B0%20%E0%A6%AC%E0%A7%81%E0%A6%95%E0%A6%BF%E0%A6%82%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B0%20%E0%A6%AC%E0%A6%BF%E0%A6%B7%E0%A6%AF%E0%A6%BC%E0%A7%87%20%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%8B%E0%A6%97%20%E0%A6%95%E0%A6%B0%E0%A6%9B%E0%A6%BF...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#006B5B] hover:text-[#004D40] font-bold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "content" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-3">
            <h3 className="font-bold text-[#004D40] text-base flex items-center justify-between">
              <span>প্রকাশিত আর্টিকেল ({ARTICLES_LIST.length})</span>
              <span className="text-xs text-[#006B5B] font-semibold">লাইভ</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              {ARTICLES_LIST.map((art) => (
                <li key={art.slug} className="p-2.5 rounded-xl bg-[#FAFAF7] border border-gray-100 flex items-center justify-between">
                  <span className="font-medium line-clamp-1">{art.title}</span>
                  <span className="text-gray-400 text-[10px] shrink-0 ml-2">{art.publishDate}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-3">
            <h3 className="font-bold text-[#004D40] text-base flex items-center justify-between">
              <span>রুকইয়াহ অডিও রেকর্ড ({RUQYAH_AUDIO_LIST.length})</span>
              <span className="text-xs text-[#006B5B] font-semibold">স্ট্রিম সক্রিয়</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              {RUQYAH_AUDIO_LIST.map((track) => (
                <li key={track.id} className="p-2.5 rounded-xl bg-[#FAFAF7] border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-[10px] text-gray-400">{track.reciter}</div>
                  </div>
                  <span className="font-mono text-xs text-gray-500">{track.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
