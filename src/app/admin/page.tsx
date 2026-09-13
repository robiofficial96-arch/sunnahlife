"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  LogOut,
  Gift,
  Power,
  RotateCcw,
  Save,
  AlertCircle,
  ShoppingBag,
  Trash2,
  PlusCircle,
  Edit3,
  X,
  Globe,
  ExternalLink,
  Upload,
  ImageIcon,
  Camera
} from "lucide-react";
import Image from "next/image";
import { DEFAULT_POPUP_CONFIG, PopupNoticeConfig } from "@/data/popupNotice";
import { DEFAULT_PRODUCTS, ProductItem } from "@/data/products";
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

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "content" | "popup" | "store">("overview");
  const [bookings, setBookings] = useState<DemoBooking[]>(INITIAL_BOOKINGS);
  const [searchFilter, setSearchFilter] = useState("");
  const [popupConfig, setPopupConfig] = useState<PopupNoticeConfig>(DEFAULT_POPUP_CONFIG);
  const [popupSaveMessage, setPopupSaveMessage] = useState("");
  const [productsList, setProductsList] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    banglaName: "",
    name: "",
    category: "ruqyah_items",
    categoryLabel: "রুকইয়াহ সামগ্রী",
    price: 250,
    regularPrice: 350,
    weightOrQuantity: "১০০ গ্রাম",
    description: "",
    benefitsText: "",
    usageInstructions: "",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "নতুন পণ্য"
  });
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProductImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("অনুগ্রহ করে একটি ছবি ফাইল সিলেক্ট করুন (যেমন JPG, PNG, WEBP)");
      return;
    }

    setImageUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setNewProduct((prev) => ({ ...prev, image: compressed }));
        }
        setImageUploading(false);
      };
      img.onerror = () => {
        alert("ছবি প্রসেসিং করতে সমস্যা হয়েছে। অনুগ্রহ করে অন্য ছবি নির্বাচন করুন।");
        setImageUploading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      alert("ফাইল পড়তে ব্যর্থ হয়েছে");
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("sunnahlife_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    try {
      const savedPopup = localStorage.getItem("sunnahlife_popup_config");
      if (savedPopup) {
        setPopupConfig(JSON.parse(savedPopup));
      }
    } catch {}

    try {
      const savedProducts = localStorage.getItem("sunnahlife_custom_products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductsList(parsed);
        }
      }
    } catch {}

    setIsLoaded(true);
  }, []);

  const toggleProductStock = (id: string) => {
    const updated = productsList.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
    setProductsList(updated);
    localStorage.setItem("sunnahlife_custom_products", JSON.stringify(updated));
    setPopupSaveMessage("পণ্যের স্টক স্ট্যাটাস আপডেট করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই পণ্যটি ডিলিট করতে চান?")) {
      const updated = productsList.filter(p => p.id !== id);
      setProductsList(updated);
      localStorage.setItem("sunnahlife_custom_products", JSON.stringify(updated));
      setPopupSaveMessage("পণ্য সফলভাবে মুছে ফেলা হয়েছে!");
      setTimeout(() => setPopupSaveMessage(""), 3000);
    }
  };

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setNewProduct({
      banglaName: "",
      name: "",
      category: "ruqyah_items",
      categoryLabel: "রুকইয়াহ সামগ্রী",
      price: 250,
      regularPrice: 350,
      weightOrQuantity: "১০০ গ্রাম",
      description: "",
      benefitsText: "",
      usageInstructions: "",
      inStock: true,
      image: "/banners/special-offer-tuesday.jpg",
      badge: "নতুন পণ্য"
    });
    setShowAddProductModal(true);
  };

  const handleOpenEditProduct = (product: ProductItem) => {
    setEditingProductId(product.id);
    setNewProduct({
      banglaName: product.banglaName,
      name: product.name || product.banglaName,
      category: product.category,
      categoryLabel: product.categoryLabel,
      price: product.price,
      regularPrice: product.regularPrice || 0,
      weightOrQuantity: product.weightOrQuantity,
      description: product.description,
      benefitsText: product.benefits ? product.benefits.join("\n") : "",
      usageInstructions: product.usageInstructions || "",
      inStock: product.inStock,
      image: product.image || "/banners/special-offer-tuesday.jpg",
      badge: product.badge || ""
    });
    setShowAddProductModal(true);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.banglaName) {
      alert("অনুগ্রহ করে পণ্যের বাংলা নাম দিন");
      return;
    }

    const catLabels: Record<string, string> = {
      ruqyah_items: "রুকইয়াহ সামগ্রী",
      oils_honey: "খাঁটি তেল ও মধু",
      sunnah_food: "সুন্নাহ খাদ্য ও আজওয়া",
      hijama: "হিজামা সামগ্রী"
    };

    let updated: ProductItem[];
    if (editingProductId) {
      updated = productsList.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: newProduct.name || newProduct.banglaName,
            banglaName: newProduct.banglaName,
            category: newProduct.category as any,
            categoryLabel: catLabels[newProduct.category] || "রুকইয়াহ সামগ্রী",
            price: Number(newProduct.price) || 100,
            regularPrice: newProduct.regularPrice ? Number(newProduct.regularPrice) : undefined,
            weightOrQuantity: newProduct.weightOrQuantity || "১ পিস",
            description: newProduct.description || "কুরআন ও সুন্নাহ নির্দেশিত খাঁটি পণ্য।",
            benefits: newProduct.benefitsText 
              ? newProduct.benefitsText.split("\n").filter(Boolean)
              : ["১০০% বিশুদ্ধ ও প্রাকৃতিক সুন্নাহ উপাদান"],
            usageInstructions: newProduct.usageInstructions || "সুন্নাহ নিয়মে সঠিক নিয়তে ব্যবহার করুন।",
            inStock: newProduct.inStock,
            image: newProduct.image || p.image || "/banners/special-offer-tuesday.jpg",
            badge: newProduct.badge || undefined
          };
        }
        return p;
      });
      setPopupSaveMessage("পণ্যটির তথ্য সফলভাবে আপডেট ও সেভ করা হয়েছে!");
    } else {
      const item: ProductItem = {
        id: "prod-" + Date.now(),
        name: newProduct.name || newProduct.banglaName,
        banglaName: newProduct.banglaName,
        category: newProduct.category as any,
        categoryLabel: catLabels[newProduct.category] || "রুকইয়াহ সামগ্রী",
        price: Number(newProduct.price) || 100,
        regularPrice: newProduct.regularPrice ? Number(newProduct.regularPrice) : undefined,
        weightOrQuantity: newProduct.weightOrQuantity || "১ পিস",
        description: newProduct.description || "কুরআন ও সুন্নাহ নির্দেশিত খাঁটি পণ্য।",
        benefits: newProduct.benefitsText 
          ? newProduct.benefitsText.split("\n").filter(Boolean)
          : ["১০০% বিশুদ্ধ ও প্রাকৃতিক সুন্নাহ উপাদান"],
        usageInstructions: newProduct.usageInstructions || "সুন্নাহ নিয়মে সঠিক নিয়তে ব্যবহার করুন।",
        inStock: newProduct.inStock,
        image: newProduct.image || "/banners/special-offer-tuesday.jpg",
        badge: newProduct.badge || undefined
      };
      updated = [item, ...productsList];
      setPopupSaveMessage("নতুন পণ্য সফলভাবে যোগ করা হয়েছে এবং স্টোরে লাইভ হয়েছে!");
    }

    setProductsList(updated);
    localStorage.setItem("sunnahlife_custom_products", JSON.stringify(updated));
    setShowAddProductModal(false);
    setEditingProductId(null);
    setNewProduct({
      banglaName: "",
      name: "",
      category: "ruqyah_items",
      categoryLabel: "রুকইয়াহ সামগ্রী",
      price: 250,
      regularPrice: 350,
      weightOrQuantity: "১০০ গ্রাম",
      description: "",
      benefitsText: "",
      usageInstructions: "",
      inStock: true,
      image: "/banners/special-offer-tuesday.jpg",
      badge: "নতুন পণ্য"
    });
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const togglePopupActive = () => {
    const updated = { ...popupConfig, isActive: !popupConfig.isActive };
    setPopupConfig(updated);
    localStorage.setItem("sunnahlife_popup_config", JSON.stringify(updated));
    setPopupSaveMessage(updated.isActive ? "পপআপ চালু করা হয়েছে!" : "পপআপ বন্ধ করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sunnahlife_popup_config", JSON.stringify(popupConfig));
    setPopupSaveMessage("পপআপ কনফিগারেশন সফলভাবে সেভ করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleResetPopup = () => {
    setPopupConfig(DEFAULT_POPUP_CONFIG);
    localStorage.removeItem("sunnahlife_popup_config");
    setPopupSaveMessage("ডিফল্ট কনফিগারেশনে রিসেট করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

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
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#006B5B]/20 p-6 md:p-8 shadow-sm space-y-6 text-center">
          <div className="relative h-12 w-44 mx-auto">
            <Image
              src="/sunnahlife_logo.svg"
              alt="সুন্নাহলাইফ"
              fill
              className="object-contain"
              priority
            />
          </div>

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

          <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100">
            <span>নিরাপত্তা কোড: <span className="font-mono font-semibold text-gray-600">7860</span></span>
            <Link href="/" className="text-[#006B5B] hover:underline font-semibold flex items-center gap-1">
              <span>← মূল ওয়েবসাইট</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      {/* Dedicated Admin Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#006B5B]/15 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Logo & Admin Badge */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2 group">
                <div className="relative h-10 sm:h-12 w-32 sm:w-40">
                  <Image
                    src="/sunnahlife_logo.svg"
                    alt="সুন্নাহলাইফ"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-bold border border-[#006B5B]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>অ্যাডমিন পোর্টাল</span>
              </span>
            </div>

            {/* Right: View Site & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#006B5B] text-xs font-bold flex items-center gap-1.5 border border-[#006B5B]/20 transition-all cursor-pointer shadow-2xs"
                title="নতুন ট্যাবে মূল ওয়েবসাইট দেখুন"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">মূল ওয়েবসাইট দেখুন</span>
                <ExternalLink className="w-3 h-3 text-[#006B5B]/70" />
              </Link>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="অ্যাডমিন প্যানেল থেকে লগআউট"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs Sub-bar */}
        <div className="border-t border-gray-100 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>ওভারভিউ</span>
              </button>

              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "bookings"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>অ্যাপয়েন্টমেন্ট ({bookings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "content"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>কনটেন্ট তালিকা</span>
              </button>

              <button
                onClick={() => setActiveTab("popup")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "popup"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>পপআপ ও অফার</span>
                <span className={`w-2 h-2 rounded-full ${popupConfig.isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
              </button>

              <button
                onClick={() => setActiveTab("store")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "store"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>স্টোর ও পণ্য ({productsList.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">

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

      {activeTab === "popup" && (
        <div className="space-y-6">
          {/* Notification Toast */}
          {popupSaveMessage && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{popupSaveMessage}</span>
              </div>
            </div>
          )}

          {/* Top Status & Quick Toggle Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">বর্তমান অবস্থা</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    popupConfig.isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${popupConfig.isActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  {popupConfig.isActive ? "সক্রিয় (ভিজিটরদের সামনে প্রদর্শিত হচ্ছে)" : "নিষ্ক্রিয় (পপআপ বন্ধ রয়েছে)"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#004D40]">
                হোমপেজ ও সাইটওয়াইড অফার পপআপ
              </h3>
              <p className="text-xs text-gray-500">
                এই সুইচটি দিয়ে যেকোনো সময় তাৎক্ষণিক ওয়েবসাইটে পপআপ চালু বা বন্ধ করা যায়।
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePopupActive}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  popupConfig.isActive
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{popupConfig.isActive ? "পপআপ বন্ধ করুন" : "পপআপ চালু করুন"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Live Preview */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="font-bold text-[#004D40] text-sm flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#D4A017]" />
                  <span>লাইভ প্রিভিউ (Preview)</span>
                </h4>
                <span className="text-[11px] text-gray-400">ভিজিটর যেভাবে দেখবে</span>
              </div>

              {/* Mini Preview Card */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-[#FAFAF7] shadow-sm">
                <div className="relative aspect-[682/1024] max-h-80 bg-[#00382E] mx-auto">
                  <Image
                    src={popupConfig.image}
                    alt={popupConfig.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 text-white text-[10px] font-semibold">
                    {popupConfig.badge}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h5 className="font-bold text-sm text-[#004D40] leading-snug">
                    {popupConfig.title}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {popupConfig.subtitle}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="line-through text-gray-400">{popupConfig.regularFee}</span>
                    <span className="font-bold text-emerald-700">{popupConfig.offerFee}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-600">
                    <div>🕕 {popupConfig.timeText}</div>
                    <div>🎟️ {popupConfig.seatsText}</div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full py-2 rounded-xl bg-[#25D366] text-white text-center text-xs font-bold">
                      WhatsApp-এ ফ্রি সিরিয়াল নিন
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form Editor */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="font-bold text-[#004D40] text-sm">পপআপ তথ্য এডিটর</h4>
                <button
                  type="button"
                  onClick={handleResetPopup}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  title="ডিফল্ট কনফিগারেশনে ফেরত যান"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিসেট</span>
                </button>
              </div>

              <form onSubmit={handleSavePopup} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">অফার ব্যাজ (Badge)</label>
                  <input
                    type="text"
                    value={popupConfig.badge}
                    onChange={(e) => setPopupConfig({ ...popupConfig, badge: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">মূল শিরোনাম (Title)</label>
                  <input
                    type="text"
                    value={popupConfig.title}
                    onChange={(e) => setPopupConfig({ ...popupConfig, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">উপ-শিরোনাম (Subtitle)</label>
                  <input
                    type="text"
                    value={popupConfig.subtitle}
                    onChange={(e) => setPopupConfig({ ...popupConfig, subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">নিয়মিত ফি</label>
                    <input
                      type="text"
                      value={popupConfig.regularFee}
                      onChange={(e) => setPopupConfig({ ...popupConfig, regularFee: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">অফার ফি</label>
                    <input
                      type="text"
                      value={popupConfig.offerFee}
                      onChange={(e) => setPopupConfig({ ...popupConfig, offerFee: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">সময়</label>
                    <input
                      type="text"
                      value={popupConfig.timeText}
                      onChange={(e) => setPopupConfig({ ...popupConfig, timeText: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">আসন সংখ্যা</label>
                    <input
                      type="text"
                      value={popupConfig.seatsText}
                      onChange={(e) => setPopupConfig({ ...popupConfig, seatsText: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">কল / হেল্পলাইন নম্বর</label>
                  <input
                    type="text"
                    value={popupConfig.phone}
                    onChange={(e) => setPopupConfig({ ...popupConfig, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">WhatsApp ড্রাফট মেসেজ</label>
                  <textarea
                    rows={3}
                    value={popupConfig.whatsappMessage}
                    onChange={(e) => setPopupConfig({ ...popupConfig, whatsappMessage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>পরিবর্তন সেভ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === "store" && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">সুন্নাহ স্টোর ক্যাটালগ</span>
              <h3 className="text-lg font-bold text-[#004D40] flex items-center gap-2">
                <span>পণ্য ও সামগ্রী তালিকা ({productsList.length}টি)</span>
              </h3>
              <p className="text-xs text-gray-500">
                নতুন পণ্য যোগ করুন, স্টক পরিবর্তন করুন বা মূল্য আপডেট করুন। এখানে পরিবর্তন করলে তা সরাসরি স্টোর পেজে লাইভ হবে।
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>নতুন পণ্য যোগ করুন</span>
            </button>
          </div>

          {/* Products List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productsList.map((product) => (
              <div
                key={product.id}
                className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#006B5B]/30 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Product Image Preview */}
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img
                      src={product.image || "/banners/special-offer-tuesday.jpg"}
                      alt={product.banglaName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {product.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-[#006B5B] text-white text-[10px] font-bold shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-gray-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-gray-200">
                        {product.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <button
                        onClick={() => toggleProductStock(product.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md shadow-xs transition-colors cursor-pointer ${
                          product.inStock 
                            ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                        title="স্টক পরিবর্তন করতে ক্লিক করুন"
                      >
                        {product.inStock ? "● স্টকে আছে" : "○ স্টক শেষ"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-gray-900 leading-snug">
                      {product.banglaName}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="text-xs text-gray-400">
                    পরিমাণ: <span className="font-semibold text-gray-700">{product.weightOrQuantity}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#004D40]">
                      ৳{product.price}
                    </span>
                    {product.regularPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5">
                        ৳{product.regularPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditProduct(product)}
                      className="p-2 rounded-xl text-gray-500 hover:text-[#006B5B] hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                      title="পণ্য এডিট / মূল্য বা ছবি পরিবর্তন করুন"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="পণ্য ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Product Modal */}
          {showAddProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
                <div className="px-6 py-4 bg-[#004D40] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#F2C94C]" />
                    <h4 className="font-bold text-sm md:text-base">
                      {editingProductId ? "পণ্যের তথ্য সম্পাদনা করুন" : "নতুন পণ্য যোগ করুন"}
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowAddProductModal(false)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddProductSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">পণ্যের বাংলা নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: খাঁটি মধু, সিদর পাউডার..."
                      value={newProduct.banglaName}
                      onChange={(e) => setNewProduct({ ...newProduct, banglaName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">ক্যাটাগরি</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white"
                      >
                        <option value="ruqyah_items">রুকইয়াহ সামগ্রী</option>
                        <option value="oils_honey">খাঁটি তেল ও মধু</option>
                        <option value="sunnah_food">সুন্নাহ খাদ্য ও আজওয়া</option>
                        <option value="hijama">হিজামা সামগ্রী</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">ওজন / পরিমাণ</label>
                      <input
                        type="text"
                        placeholder="যেমন: ১০০ গ্রাম / ২৫০ মিলি"
                        value={newProduct.weightOrQuantity}
                        onChange={(e) => setNewProduct({ ...newProduct, weightOrQuantity: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                      />
                    </div>
                  </div>

                  {/* Image Upload & Live Preview */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-gray-700 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#006B5B]" />
                        <span>পণ্যের ছবি (Device Upload / Camera)</span>
                      </label>
                      {newProduct.image && (
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ✓ ছবি সংযুক্ত আছে
                        </span>
                      )}
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleProductImageUpload(e.target.files[0]);
                          e.target.value = "";
                        }
                      }}
                      className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Image Thumbnail Preview */}
                      <div className="relative w-full sm:w-32 h-28 rounded-xl overflow-hidden border border-gray-300 bg-white shrink-0 shadow-xs flex items-center justify-center">
                        {newProduct.image ? (
                          <img
                            src={newProduct.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-300 flex flex-col items-center">
                            <ImageIcon className="w-8 h-8" />
                            <span className="text-[9px] mt-1">ছবি নেই</span>
                          </div>
                        )}
                        {imageUploading && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                            প্রসেসিং...
                          </div>
                        )}
                      </div>

                      {/* Upload buttons & instructions */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={imageUploading}
                            className="px-3.5 py-2 rounded-xl bg-[#004D40] hover:bg-[#00382e] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{newProduct.image ? "ছবি পরিবর্তন করুন" : "মোবাইল/পিসি থেকে আপলোড"}</span>
                          </button>

                          {newProduct.image && (
                            <button
                              type="button"
                              onClick={() => setNewProduct({ ...newProduct, image: "" })}
                              className="px-2.5 py-2 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-600 text-gray-500 font-medium text-xs transition-colors cursor-pointer"
                            >
                              ছবি সরান
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed">
                          💡 যেকোনো সাইজের ছবি সিলেক্ট করলেই স্বয়ংক্রিয়ভাবে অপটিমাইজ ও কম্প্রেস হয়ে দ্রুত লোড হবে।
                        </p>
                      </div>
                    </div>

                    {/* Collapsible Image URL fallback */}
                    <div className="pt-2 border-t border-gray-200/60">
                      <details className="text-[11px] text-gray-500 cursor-pointer">
                        <summary className="font-semibold hover:text-[#006B5B] select-none">
                          🔗 অথবা অনলাইনের ছবির লিঙ্ক (URL) দিন
                        </summary>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="https://example.com/product-image.jpg"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            className="w-full p-2 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white text-xs"
                          />
                        </div>
                      </details>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">বিক্রয় মূল্য (টাকা) *</label>
                      <input
                        type="number"
                        required
                        placeholder="250"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">রেগুলার মূল্য (ঐচ্ছিক)</label>
                      <input
                        type="number"
                        placeholder="350"
                        value={newProduct.regularPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, regularPrice: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">ব্যাজ / হাইলাইট (ঐচ্ছিক)</label>
                      <input
                        type="text"
                        placeholder="যেমন: নতুন পণ্য / বিশেষ ছাড়"
                        value={newProduct.badge || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">স্টক স্ট্যাটাস</label>
                      <select
                        value={newProduct.inStock ? "true" : "false"}
                        onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value === "true" })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white"
                      >
                        <option value="true">● স্টকে আছে</option>
                        <option value="false">○ স্টক শেষ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                    <textarea
                      rows={2}
                      placeholder="পণ্যটির গুরুত্ব ও কার্যকারিতা..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">উপকারিতাসমূহ (প্রতি লাইনে একটি)</label>
                    <textarea
                      rows={2}
                      placeholder="হাদীসের নির্দেশনা...&#10;শারীরিক আরোগ্য..."
                      value={newProduct.benefitsText}
                      onChange={(e) => setNewProduct({ ...newProduct, benefitsText: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">ব্যবহারের নিয়ম / রুকইয়াহ আমল</label>
                    <input
                      type="text"
                      placeholder="পানিতে গুলিয়ে সেবন / শরীরে মালিশ..."
                      value={newProduct.usageInstructions}
                      onChange={(e) => setNewProduct({ ...newProduct, usageInstructions: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddProductModal(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold cursor-pointer"
                    >
                      {editingProductId ? "পরিবর্তন সেভ করুন" : "পণ্য সেভ করুন"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  </div>
);
}
