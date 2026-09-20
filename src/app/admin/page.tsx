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
  Camera,
  UserPlus,
  MapPin,
  Activity,
  FileSpreadsheet,
  HeartHandshake,
  FileText,
  CheckCheck,
  Send,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  PanelRight,
  Maximize2,
  Minimize2,
  Building2,
  Bell,
  Sparkles,
  Ticket,
  Info,
  Check,
  CalendarDays,
  DollarSign,
  Coins,
  Receipt,
  Printer,
  Download,
  TrendingUp,
  CreditCard
} from "lucide-react";
import Image from "next/image";
import { DEFAULT_POPUP_CONFIG, PopupNoticeConfig } from "@/data/popupNotice";
import { DEFAULT_PRODUCTS, ProductItem } from "@/data/products";
import { ARTICLES_LIST } from "@/data/articles";
import { RUQYAH_AYAT_LIST } from "@/data/ayat";
import { DUA_LIST } from "@/data/duas";
import { RUQYAH_AUDIO_LIST } from "@/data/ruqyahAudio";

export interface PatientRecord {
  id: string;
  name: string;
  age?: number | string; // রোগীর বয়স (বছর)
  phone: string;
  address: string;
  type: "online" | "offline";
  problemType: string;
  service?: string;
  fee?: number;       // মোট চিকিৎসা ফি (৳)
  paid?: number;      // পরিশোধিত টাকা (৳)
  due?: number;       // বকেয়া টাকা (৳)
  notes: string;
  prescription: string;
  date: string;
  timeSlot?: string;
  status: "new" | "running" | "followup" | "cured";
  lastFollowupDate?: string;
  nextFollowupDate?: string; // YYYY-MM-DD format e.g. "2026-09-15"
  nextFollowupNote?: string;
  rawDate?: string;          // YYYY-MM-DD format e.g. "2026-09-20"
  createdAt?: string;
}

export const PRESET_PROBLEM_CATEGORIES = [
  "বদনজর (Evil Eye)",
  "সিহর / জাদু (Black Magic)",
  "জিনের সমস্যা ও আছর",
  "ওয়াসওয়াসা ও মানসিক অস্থিরতা",
  "হিজামা ও শারীরিক ব্যথা",
  "দাম্পত্য ও পারিবারিক বিরোধ",
  "সাধারণ শারঈ রুকইয়াহ",
  "অন্যান্য সমস্যা",
];

export const getLocalDateString = (d: Date = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const addDaysToDate = (days: number, baseDateStr?: string) => {
  let base = new Date();
  if (baseDateStr) {
    const parts = baseDateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      base = new Date(parts[0], parts[1] - 1, parts[2]);
    }
  }
  const target = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  return getLocalDateString(target);
};

export const getDaysDifference = (targetDateStr?: string) => {
  if (!targetDateStr) return null;
  const parts = targetDateStr.split("-").map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(parts[0], parts[1] - 1, parts[2]);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const formatBanglaFollowupDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return dateStr;
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  return dateObj.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });
};

export const BANGLA_MONTH_NAMES = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export const parsePatientYearMonth = (p: PatientRecord): { year: number; month: number } => {
  const raw = p.rawDate || p.createdAt;
  if (raw && /^\d{4}-\d{2}/.test(raw)) {
    const [y, m] = raw.split("-").map(Number);
    if (!isNaN(y) && !isNaN(m)) return { year: y, month: m };
  }

  const dateStr = (p.date || "").trim();
  if (/^\d{4}-\d{2}/.test(dateStr)) {
    const [y, m] = dateStr.split("-").map(Number);
    if (!isNaN(y) && !isNaN(m)) return { year: y, month: m };
  }

  const banglaDigits: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const normalized = dateStr.replace(/[০-৯]/g, (d) => banglaDigits[d] || d);

  let monthNum = 0;
  for (let i = 0; i < BANGLA_MONTH_NAMES.length; i++) {
    const m = BANGLA_MONTH_NAMES[i];
    const stem = m.slice(0, 3);
    if (dateStr.includes(m) || dateStr.includes(stem)) {
      monthNum = i + 1;
      break;
    }
  }

  const yearMatch = normalized.match(/\b(20\d\d)\b/);
  const yearNum = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

  if (monthNum > 0) {
    return { year: yearNum, month: monthNum };
  }

  const parsed = new Date(normalized);
  if (!isNaN(parsed.getTime())) {
    return { year: parsed.getFullYear(), month: parsed.getMonth() + 1 };
  }

  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

const INITIAL_PATIENTS: PatientRecord[] = [];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "accounting" | "popup" | "store">("overview");
  const [patientsList, setPatientsList] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [patientFilter, setPatientFilter] = useState<"all" | "today_followup" | "upcoming_followup" | "overdue_followup" | "online" | "offline" | "followup" | "cured">("all");
  const [patientSearch, setPatientSearch] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);
  const [selectedPatientForDrawer, setSelectedPatientForDrawer] = useState<PatientRecord | null>(null);
  const [expandedPatientIds, setExpandedPatientIds] = useState<string[]>([]);
  const [patientViewPreference, setPatientViewPreference] = useState<"drawer" | "accordion">("drawer");

  // Accounting and Financial filter states
  const [accountingYear, setAccountingYear] = useState<string>("all");
  const [accountingMonth, setAccountingMonth] = useState<string>("all");
  const [accountingSearch, setAccountingSearch] = useState<string>("");
  const [accountingDueOnly, setAccountingDueOnly] = useState<boolean>(false);

  const [patientForm, setPatientForm] = useState<Omit<PatientRecord, "id">>({
    name: "",
    age: "",
    phone: "",
    address: "",
    type: "online",
    problemType: "বদনজর (Evil Eye)",
    fee: 0,
    paid: 0,
    due: 0,
    notes: "",
    prescription: "",
    date: new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" }),
    timeSlot: "রাত ৮:০০ - ৯:০০",
    status: "new",
    nextFollowupDate: "",
    nextFollowupNote: "",
  });
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  const currentCategories = (patientForm.problemType || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleToggleCategory = (cat: string) => {
    let updated: string[];
    if (currentCategories.includes(cat)) {
      updated = currentCategories.filter((c) => c !== cat);
    } else {
      updated = [...currentCategories, cat];
    }
    setPatientForm({ ...patientForm, problemType: updated.join(", ") });
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;
    if (!currentCategories.includes(trimmed)) {
      const updated = [...currentCategories, trimmed];
      setPatientForm({ ...patientForm, problemType: updated.join(", ") });
    }
    setCustomCategoryInput("");
  };

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

    try {
      const savedPatients = localStorage.getItem("sunnahlife_patients_records");
      if (savedPatients) {
        const parsed = JSON.parse(savedPatients);
        if (Array.isArray(parsed)) {
          // Remove any legacy demo records (e.g. P-101 to P-105)
          const cleaned = parsed.filter(
            (p: any) => !["P-101", "P-102", "P-103", "P-104", "P-105"].includes(p?.id)
          );
          setPatientsList(cleaned);
          localStorage.setItem("sunnahlife_patients_records", JSON.stringify(cleaned));
        }
      }
    } catch {}

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPatientForDrawer(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  const handleOpenAddPatient = () => {
    setEditingPatientId(null);
    setCustomCategoryInput("");
    setPatientForm({
      name: "",
      age: "",
      phone: "",
      address: "",
      type: "online",
      problemType: "বদনজর (Evil Eye)",
      fee: 0,
      paid: 0,
      due: 0,
      notes: "",
      prescription: "",
      date: new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" }),
      timeSlot: "রাত ৮:০০ - ৯:০০",
      status: "new",
      nextFollowupDate: "",
      nextFollowupNote: "",
    });
    setShowAddPatientModal(true);
  };

  const handleOpenEditPatient = (p: PatientRecord) => {
    setEditingPatientId(p.id);
    setCustomCategoryInput("");
    const f = Number(p.fee) || 0;
    const pd = Number(p.paid) || 0;
    const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
    setPatientForm({
      name: p.name,
      age: p.age !== undefined && p.age !== null ? String(p.age) : "",
      phone: p.phone,
      address: p.address || "",
      type: p.type || "online",
      problemType: p.problemType || "বদনজর (Evil Eye)",
      fee: f,
      paid: pd,
      due: d,
      notes: p.notes || "",
      prescription: p.prescription || "",
      date: p.date,
      timeSlot: p.timeSlot || "",
      status: p.status,
      nextFollowupDate: p.nextFollowupDate || "",
      nextFollowupNote: p.nextFollowupNote || "",
    });
    setShowAddPatientModal(true);
  };

  const handleQuickScheduleFollowup = (id: string, daysToAdd: number, note?: string) => {
    const newDate = addDaysToDate(daysToAdd);
    const updated = patientsList.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: "followup" as const,
          nextFollowupDate: newDate,
          nextFollowupNote: note !== undefined ? note : (p.nextFollowupNote || `${daysToAdd} দিন পর রুকইয়াহ ফলো-আপ`),
        };
      }
      return p;
    });
    setPatientsList(updated);
    localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
    if (selectedPatientForDrawer && selectedPatientForDrawer.id === id) {
      setSelectedPatientForDrawer({
        ...selectedPatientForDrawer,
        status: "followup",
        nextFollowupDate: newDate,
        nextFollowupNote: note !== undefined ? note : (selectedPatientForDrawer.nextFollowupNote || `${daysToAdd} দিন পর রুকইয়াহ ফলো-আপ`),
      });
    }
    setPopupSaveMessage(`ফলো-আপ শিডিউল সফলভাবে নির্ধারণ করা হয়েছে (${formatBanglaFollowupDate(newDate)})!`);
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleClearFollowup = (id: string) => {
    const updated = patientsList.map((p) => {
      if (p.id === id) {
        const copy = { ...p };
        delete copy.nextFollowupDate;
        delete copy.nextFollowupNote;
        return copy;
      }
      return p;
    });
    setPatientsList(updated);
    localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
    if (selectedPatientForDrawer && selectedPatientForDrawer.id === id) {
      const copy = { ...selectedPatientForDrawer };
      delete copy.nextFollowupDate;
      delete copy.nextFollowupNote;
      setSelectedPatientForDrawer(copy);
    }
    setPopupSaveMessage("ফলো-আপ শিডিউল মুছে ফেলা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3000);
  };

  const handleMarkPatientPaid = (id: string) => {
    const updated = patientsList.map((p) => {
      if (p.id === id) {
        const fee = Number(p.fee) || 0;
        return {
          ...p,
          paid: fee,
          due: 0,
        };
      }
      return p;
    });
    setPatientsList(updated);
    localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
    if (selectedPatientForDrawer && selectedPatientForDrawer.id === id) {
      const fee = Number(selectedPatientForDrawer.fee) || 0;
      setSelectedPatientForDrawer({
        ...selectedPatientForDrawer,
        paid: fee,
        due: 0,
      });
    }
    setPopupSaveMessage("রোগীর সকল বকেয়া পরিশোধ হিসেবে সেভ করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleSavePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientForm.name.trim() || !patientForm.phone.trim()) {
      alert("রোগীর নাম ও মোবাইল নম্বর আবশ্যক!");
      return;
    }
    if (!patientForm.problemType.trim()) {
      alert("কমপক্ষে একটি সমস্যার ক্যাটাগরি নির্বাচন করুন!");
      return;
    }

    const feeNum = Number(patientForm.fee) || 0;
    const paidNum = Number(patientForm.paid) || 0;
    const dueNum = Math.max(feeNum - paidNum, 0);
    const ageVal = patientForm.age !== undefined && patientForm.age !== null && String(patientForm.age).trim() !== "" 
      ? String(patientForm.age).trim() 
      : undefined;

    const formDataToSave = {
      ...patientForm,
      age: ageVal,
      fee: feeNum,
      paid: paidNum,
      due: dueNum,
      rawDate: patientForm.rawDate || getLocalDateString(new Date()),
      createdAt: patientForm.createdAt || getLocalDateString(new Date()),
    };

    let updated: PatientRecord[];
    if (editingPatientId) {
      const updatedRecord: PatientRecord = {
        ...formDataToSave,
        id: editingPatientId,
      };
      updated = patientsList.map((p) =>
        p.id === editingPatientId ? updatedRecord : p
      );
      if (selectedPatientForDrawer && selectedPatientForDrawer.id === editingPatientId) {
        setSelectedPatientForDrawer(updatedRecord);
      }
      setPopupSaveMessage("রোগীর তথ্য, প্রেসক্রিপশন ও পেমেন্ট সফলভাবে আপডেট করা হয়েছে!");
    } else {
      const maxNumericId = patientsList.reduce((max, p) => {
        const num = parseInt(p.id.replace(/\D/g, ""), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 100);

      const newEntry: PatientRecord = {
        id: `P-${maxNumericId + 1}`,
        ...formDataToSave,
      };
      updated = [newEntry, ...patientsList];
      setPopupSaveMessage("নতুন রোগীর তথ্য ও হিসাব সফলভাবে যুক্ত করা হয়েছে!");
    }

    setPatientsList(updated);
    localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
    setShowAddPatientModal(false);
    setEditingPatientId(null);
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleDeletePatient = (id: string) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই রোগীর রেকর্ড মুছে ফেলতে চান?")) {
      const updated = patientsList.filter((p) => p.id !== id);
      setPatientsList(updated);
      localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
      if (selectedPatientForDrawer && selectedPatientForDrawer.id === id) {
        setSelectedPatientForDrawer(null);
      }
      setExpandedPatientIds((prev) => prev.filter((itemId) => itemId !== id));
      setPopupSaveMessage("রোগীর রেকর্ড সফলভাবে মুছে ফেলা হয়েছে!");
      setTimeout(() => setPopupSaveMessage(""), 3000);
    }
  };

  const handleUpdatePatientStatus = (id: string, newStatus: PatientRecord["status"]) => {
    const updated = patientsList.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPatientsList(updated);
    localStorage.setItem("sunnahlife_patients_records", JSON.stringify(updated));
    if (selectedPatientForDrawer && selectedPatientForDrawer.id === id) {
      setSelectedPatientForDrawer({ ...selectedPatientForDrawer, status: newStatus });
    }
    setPopupSaveMessage("রোগীর চিকিৎসা স্ট্যাটাস আপডেট করা হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3000);
  };

  const togglePatientExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedPatientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedPatientIds(filteredPatients.map((p) => p.id));
  };

  const handleCollapseAll = () => {
    setExpandedPatientIds([]);
  };

  const handleOpenPatientDrawer = (patient: PatientRecord) => {
    setSelectedPatientForDrawer(patient);
  };

  const handleClosePatientDrawer = () => {
    setSelectedPatientForDrawer(null);
  };

  const handleExportCSV = () => {
    const headers = [
      "আইডি",
      "রোগীর নাম",
      "বয়স",
      "ফোন নম্বর",
      "ঠিকানা",
      "ধরন",
      "সমস্যার ক্যাটাগরি",
      "স্ট্যাটাস",
      "মোট ফি (৳)",
      "পরিশোধিত (৳)",
      "বকেয়া (৳)",
      "তারিখ",
      "সময়",
      "পরবর্তী ফলো-আপের তারিখ",
      "ফলো-আপ নোট",
      "আমল ও প্রেসক্রিপশন",
      "বিস্তারিত নোট"
    ];
    const statusLabels: Record<string, string> = {
      new: "নতুন রোগী",
      running: "চিকিৎসা চলছে",
      followup: "ফলো-আপ প্রয়োজন",
      cured: "সুস্থ ও সমাপ্ত"
    };

    const rows = patientsList.map((p) => {
      const f = Number(p.fee) || 0;
      const pd = Number(p.paid) || 0;
      const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
      return [
        `"${p.id}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.age ? p.age + ' বছর' : ''}"`,
        `"${p.phone}"`,
        `"${(p.address || '').replace(/"/g, '""')}"`,
        `"${p.type === 'online' ? 'অনলাইন' : 'সরাসরি চেম্বার'}"`,
        `"${(p.problemType || p.service || '').replace(/"/g, '""')}"`,
        `"${statusLabels[p.status] || p.status}"`,
        `"${f}"`,
        `"${pd}"`,
        `"${d}"`,
        `"${p.date}"`,
        `"${(p.timeSlot || '').replace(/"/g, '""')}"`,
        `"${p.nextFollowupDate ? formatBanglaFollowupDate(p.nextFollowupDate) : ''}"`,
        `"${(p.nextFollowupNote || '').replace(/"/g, '""')}"`,
        `"${(p.prescription || '').replace(/"/g, '""')}"`,
        `"${(p.notes || '').replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sunnahlife_patients_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setPopupSaveMessage("রোগীদের সকল ডাটা ও হিসাব সফলভাবে এক্সেল (CSV) ফাইলে ডাউনলোড হয়েছে!");
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const handleExportAccountingCSV = () => {
    const periodLabel = accountingMonth !== "all" 
      ? `${BANGLA_MONTH_NAMES[Number(accountingMonth) - 1]} ${accountingYear !== "all" ? accountingYear : ""}`
      : accountingYear !== "all" ? `${accountingYear} সাল` : "সর্বকালীন";

    const headers = [
      "আইডি",
      "রোগীর নাম",
      "বয়স",
      "ফোন নম্বর",
      "ধরন",
      "সমস্যার ক্যাটাগরি",
      "তারিখ",
      "মোট ফি (৳)",
      "পরিশোধিত (৳)",
      "বকেয়া (৳)",
      "স্ট্যাটাস",
    ];

    const rows = accountingFilteredPatients.map((p) => {
      const f = Number(p.fee) || 0;
      const pd = Number(p.paid) || 0;
      const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
      return [
        `"${p.id}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.age ? p.age + ' বছর' : ''}"`,
        `"${p.phone}"`,
        `"${p.type === 'online' ? 'অনলাইন' : 'চেম্বার'}"`,
        `"${(p.problemType || p.service || '').replace(/"/g, '""')}"`,
        `"${p.date}"`,
        `"${f}"`,
        `"${pd}"`,
        `"${d}"`,
        `"${p.status === 'cured' ? 'সুস্থ' : p.status === 'followup' ? 'ফলো-আপ' : p.status === 'running' ? 'চলমান' : 'নতুন'}"`,
      ];
    });

    // Summary totals row
    rows.push([
      `"সর্বমোট হিসাব"`,
      `"${accountingFilteredPatients.length} জন রোগী"`,
      `""`,
      `""`,
      `""`,
      `""`,
      `""`,
      `"${periodTotalFee}"`,
      `"${periodTotalPaid}"`,
      `"${periodTotalDue}"`,
      `"আদায় হার: ${periodCollectionRate}%"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sunnahlife_accounting_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setPopupSaveMessage(`${periodLabel} আর্থিক রিপোর্ট সফলভাবে এক্সেল (CSV) ফাইলে ডাউনলোড হয়েছে!`);
    setTimeout(() => setPopupSaveMessage(""), 3500);
  };

  const getDuePaymentWhatsAppUrl = (p: PatientRecord) => {
    const cleanPhone = p.phone.replace(/^0/, "880").replace(/\D/g, "");
    const fee = Number(p.fee) || 0;
    const paid = Number(p.paid) || 0;
    const due = p.due !== undefined ? Number(p.due) : Math.max(fee - paid, 0);
    const text = `আসসালামু আলাইকুম ${p.name} ভাই/বোন${p.age ? ` (বয়স: ${p.age} বছর)` : ""}।
সুন্নাহলাইফ শারঈ রুকইয়াহ সেন্টার থেকে অ্যাকাউন্টস শাখা।

আপনার শারঈ রুকইয়াহ চিকিৎসা ফি সংক্রান্ত তথ্য:
• মোট ধার্য ফি: ৳${fee.toLocaleString("bn-BD")}
• জমা / পরিশোধিত: ৳${paid.toLocaleString("bn-BD")}
• অবশিষ্ট বকেয়া: ৳${due.toLocaleString("bn-BD")}

বকেয়া পরিশোধের জন্য বিকাশ / নগদ / ব্যাংক অ্যাকাউন্টের তথ্যের প্রয়োজনে আমাদের এখানে লিখে জানান। আল্লাহ আপনাকে পূর্ণ সুস্থতা ও বরকত দান করুন।
— সুন্নাহলাইফ শারঈ রুকইয়াহ সেন্টার
হটলাইন: ০১৬৭৬৮২০০৬০`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const getFollowupWhatsAppUrl = (p: PatientRecord) => {
    const cleanPhone = p.phone.replace(/^0/, "880").replace(/\D/g, "");
    const diff = getDaysDifference(p.nextFollowupDate);
    let followupContext = "";
    if (diff === 0) {
      followupContext = `আজকে আপনার শারঈ রুকইয়াহ ফলো-আপের নির্ধারিত দিন।`;
    } else if (diff !== null && diff < 0) {
      followupContext = `আপনার শারঈ রুকইয়াহ ফলো-আপের নির্ধারিত তারিখ (${formatBanglaFollowupDate(p.nextFollowupDate)}) পার হয়েছে।`;
    } else if (p.nextFollowupDate) {
      followupContext = `আপনার পরবর্তী ফলো-আপের নির্ধারিত তারিখ: ${formatBanglaFollowupDate(p.nextFollowupDate)}।`;
    }

    const fee = Number(p.fee) || 0;
    const paid = Number(p.paid) || 0;
    const due = p.due !== undefined ? Number(p.due) : Math.max(fee - paid, 0);

    let dueNotice = "";
    if (due > 0) {
      dueNotice = `\n📌 *বকেয়া সংক্রান্ত তথ্য:* আপনার চিকিৎসা ফির অবশিষ্ট বকেয়া ৳${due.toLocaleString("bn-BD")} টাকা রয়েছে। পরবর্তী সেশনের আগে বা সুবিধাজনক সময়ে পরিশোধের অনুরোধ রইল।\n`;
    }

    const text = `আসসালামু আলাইকুম ${p.name} ভাই/বোন${p.age ? ` (বয়স: ${p.age} বছর)` : ""}।
সুন্নাহলাইফ শারঈ রুকইয়াহ কেয়ার থেকে আপনার খোঁজ নেওয়ার জন্য যোগাযোগ করছি।

${followupContext ? followupContext + "\n\n" : ""}আপনার "${p.problemType || p.service || 'সমস্যা'}"-এর সমস্যাটি এখন কেমন আছে? আলহামদুলিল্লাহ কোনো উন্নতি লক্ষ্য করছেন কি?
${p.nextFollowupNote ? `\nপূর্ববর্তী নির্দেশনা নোট: "${p.nextFollowupNote}"\n` : ""}${dueNotice}
প্রেসক্রিপশন অনুযায়ী রুকইয়াহ আমল ও সুন্নাহ সামগ্রীগুলো নিয়মিত মেনে চলছেন তো? কোনো পরামর্শ বা সহায়তার প্রয়োজন হলে নির্দ্বিধায় আমাদের লিখে জানান। আল্লাহ আপনাকে পূর্ণ শিফা দান করুন।

— সুন্নাহলাইফ শারঈ রুকইয়াহ সেন্টার
হটলাইন: ০১৬৭৬৮২০০৬০`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const getDirectChatWhatsAppUrl = (p: PatientRecord) => {
    const cleanPhone = p.phone.replace(/^0/, "880").replace(/\D/g, "");
    const text = `আসসালামু আলাইকুম ${p.name}। সুন্নাহলাইফ থেকে আপনার শারঈ রুকইয়াহ চিকিৎসার বিষয়ে যোগাযোগ করছি...`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const getPrescriptionWhatsAppUrl = (p: PatientRecord) => {
    const cleanPhone = p.phone.replace(/^0/, "880").replace(/\D/g, "");
    const text = `আসসালামু আলাইকুম ${p.name}${p.age ? ` (বয়স: ${p.age} বছর)` : ""}।
সুন্নাহলাইফ থেকে আপনার নির্ধারিত রুকইয়াহ আমল ও নির্দেশনাবলী:

*রোগীর সমস্যা:* ${p.problemType || p.service || 'রুকইয়াহ চিকিৎসা'}
*আমল ও প্রেসক্রিপশন:*
${p.prescription || p.notes || "সকাল-সন্ধ্যার মাসনুন আজকার ও নিয়মিত রুকইয়াহ আমল করুন।"}

আল্লাহর ওপর পূর্ণ ভরসা রেখে নিয়মিত আমল চালিয়ে যান। যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ রাখুন।
— সুন্নাহলাইফ`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const todayFollowups = patientsList.filter((p) => {
    const diff = getDaysDifference(p.nextFollowupDate);
    return diff === 0;
  });

  const upcomingFollowups = patientsList.filter((p) => {
    const diff = getDaysDifference(p.nextFollowupDate);
    return diff !== null && diff > 0 && diff <= 7;
  });

  const overdueFollowups = patientsList.filter((p) => {
    const diff = getDaysDifference(p.nextFollowupDate);
    return diff !== null && diff < 0;
  });

  const totalFeeSum = patientsList.reduce((acc, p) => acc + (Number(p.fee) || 0), 0);
  const totalPaidSum = patientsList.reduce((acc, p) => acc + (Number(p.paid) || 0), 0);
  const totalDueSum = patientsList.reduce((acc, p) => {
    const f = Number(p.fee) || 0;
    const pd = Number(p.paid) || 0;
    const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
    return acc + d;
  }, 0);
  const duePatientsCount = patientsList.filter((p) => {
    const f = Number(p.fee) || 0;
    const pd = Number(p.paid) || 0;
    const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
    return d > 0;
  }).length;

  // Available Years in patients data
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const detectedYears = Array.from(
    new Set(
      patientsList.map((p) => parsePatientYearMonth(p).year)
    )
  ).filter((y) => y > 2000);
  if (!detectedYears.includes(currentYear)) {
    detectedYears.push(currentYear);
  }
  detectedYears.sort((a, b) => b - a);

  // Filtered patients for accounting tab
  const accountingFilteredPatients = patientsList.filter((p) => {
    const { year, month } = parsePatientYearMonth(p);
    if (accountingYear !== "all" && year !== Number(accountingYear)) return false;
    if (accountingMonth !== "all" && month !== Number(accountingMonth)) return false;

    if (accountingDueOnly) {
      const f = Number(p.fee) || 0;
      const pd = Number(p.paid) || 0;
      const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
      if (d <= 0) return false;
    }

    if (accountingSearch.trim()) {
      const q = accountingSearch.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.problemType && p.problemType.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  // Selected period totals
  const periodTotalFee = accountingFilteredPatients.reduce((sum, p) => sum + (Number(p.fee) || 0), 0);
  const periodTotalPaid = accountingFilteredPatients.reduce((sum, p) => sum + (Number(p.paid) || 0), 0);
  const periodTotalDue = accountingFilteredPatients.reduce((sum, p) => {
    const f = Number(p.fee) || 0;
    const pd = Number(p.paid) || 0;
    const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
    return sum + d;
  }, 0);
  const periodDueCount = accountingFilteredPatients.filter((p) => {
    const f = Number(p.fee) || 0;
    const pd = Number(p.paid) || 0;
    const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);
    return d > 0;
  }).length;
  const periodCollectionRate = periodTotalFee > 0 ? Math.round((periodTotalPaid / periodTotalFee) * 100) : 0;

  // Month-by-month breakdown for selected year (or current year)
  const activeBreakdownYear = accountingYear !== "all" ? Number(accountingYear) : currentYear;
  const monthlyBreakdown = BANGLA_MONTH_NAMES.map((mName, idx) => {
    const monthIndex = idx + 1;
    const pts = patientsList.filter((p) => {
      const parsed = parsePatientYearMonth(p);
      return parsed.year === activeBreakdownYear && parsed.month === monthIndex;
    });
    const fee = pts.reduce((sum, p) => sum + (Number(p.fee) || 0), 0);
    const paid = pts.reduce((sum, p) => sum + (Number(p.paid) || 0), 0);
    const due = pts.reduce((sum, p) => {
      const f = Number(p.fee) || 0;
      const pd = Number(p.paid) || 0;
      return sum + (p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0));
    }, 0);
    const rate = fee > 0 ? Math.round((paid / fee) * 100) : 0;
    return {
      monthNumber: monthIndex,
      monthName: mName,
      patientCount: pts.length,
      totalFee: fee,
      totalPaid: paid,
      totalDue: due,
      collectionRate: rate,
    };
  });

  // Yearly summary comparison
  const yearlyBreakdown = detectedYears.map((y) => {
    const pts = patientsList.filter((p) => parsePatientYearMonth(p).year === y);
    const fee = pts.reduce((sum, p) => sum + (Number(p.fee) || 0), 0);
    const paid = pts.reduce((sum, p) => sum + (Number(p.paid) || 0), 0);
    const due = pts.reduce((sum, p) => {
      const f = Number(p.fee) || 0;
      const pd = Number(p.paid) || 0;
      return sum + (p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0));
    }, 0);
    const rate = fee > 0 ? Math.round((paid / fee) * 100) : 0;
    return {
      year: y,
      patientCount: pts.length,
      totalFee: fee,
      totalPaid: paid,
      totalDue: due,
      collectionRate: rate,
    };
  });

  const filteredPatients = patientsList.filter((p) => {
    const query = patientSearch.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      (p.address && p.address.toLowerCase().includes(query)) ||
      (p.problemType && p.problemType.toLowerCase().includes(query)) ||
      (p.notes && p.notes.toLowerCase().includes(query)) ||
      (p.nextFollowupNote && p.nextFollowupNote.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (patientFilter === "today_followup") {
      return getDaysDifference(p.nextFollowupDate) === 0;
    }
    if (patientFilter === "upcoming_followup") {
      const diff = getDaysDifference(p.nextFollowupDate);
      return diff !== null && diff > 0 && diff <= 7;
    }
    if (patientFilter === "overdue_followup") {
      const diff = getDaysDifference(p.nextFollowupDate);
      return diff !== null && diff < 0;
    }
    if (patientFilter === "online") return p.type === "online";
    if (patientFilter === "offline") return p.type === "offline";
    if (patientFilter === "followup") return p.status === "followup";
    if (patientFilter === "cured") return p.status === "cured";
    return true;
  });

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
            <span className="flex items-center gap-1 text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B]" />
              <span>সুরক্ষিত অ্যাডমিন পোর্টাল</span>
            </span>
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
                <Users className="w-3.5 h-3.5" />
                <span>রোগী ও ফলো-আপ ({patientsList.length})</span>
                {todayFollowups.length > 0 ? (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-600 text-white animate-pulse" title="আজকের ফলো-আপ বকেয়া">
                    আজ {todayFollowups.length}
                  </span>
                ) : patientsList.filter((p) => p.status === "followup").length > 0 ? (
                  <span className="px-1.5 py-0.2 text-[9px] font-extrabold rounded-full bg-amber-500 text-white">
                    {patientsList.filter((p) => p.status === "followup").length}
                  </span>
                ) : null}
              </button>

              <button
                onClick={() => setActiveTab("accounting")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === "accounting"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#006B5B] hover:bg-white"
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>হিসাব ও আর্থিক রিপোর্ট</span>
                {totalDueSum > 0 ? (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    বকেয়া ৳{totalDueSum.toLocaleString("bn-BD")}
                  </span>
                ) : totalPaidSum > 0 ? (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    আদায় ৳{totalPaidSum.toLocaleString("bn-BD")}
                  </span>
                ) : null}
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

      {/* Content based on Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab("accounting")}
              className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1 cursor-pointer hover:border-[#006B5B] hover:shadow-xs transition-all group"
              title="ক্লিক করে মাসিক ও বাৎসরিক পূর্ণাঙ্গ হিসাব দেখুন"
            >
              <span className="text-xs text-gray-500 font-medium flex items-center justify-between">
                <span>ফি আদায় (পেইড)</span>
                <Coins className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </span>
              <p className="text-2xl font-bold text-emerald-700">৳{totalPaidSum.toLocaleString("bn-BD")}</p>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-medium">
                  মোট ধার্য ফি: ৳{totalFeeSum.toLocaleString("bn-BD")}
                </span>
                <span className="text-[#006B5B] font-bold group-hover:underline">রিপোর্ট →</span>
              </div>
            </div>

            <div 
              onClick={() => {
                setActiveTab("accounting");
                setAccountingDueOnly(true);
              }}
              className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1 cursor-pointer hover:border-amber-400 hover:shadow-xs transition-all group"
              title="ক্লিক করে সকল বকেয়া রোগীর বিস্তারিত তালিকা দেখুন"
            >
              <span className="text-xs text-gray-500 font-medium flex items-center justify-between">
                <span>মোট বকেয়া (ডিউ)</span>
                <Receipt className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              </span>
              <p className={`text-2xl font-bold ${totalDueSum > 0 ? "text-amber-700" : "text-emerald-700"}`}>
                ৳{totalDueSum.toLocaleString("bn-BD")}
              </p>
              <div className="text-[11px] font-semibold flex items-center justify-between">
                {duePatientsCount > 0 ? (
                  <span className="text-amber-700 font-bold">⚠️ {duePatientsCount} জনের বকেয়া</span>
                ) : (
                  <span className="text-emerald-600 font-bold">✓ কোনো বকেয়া নেই</span>
                )}
                <span className="text-amber-800 font-bold group-hover:underline">বকেয়া তালিকা →</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
              <span className="text-xs text-gray-500 font-medium">নিবন্ধিত রোগী</span>
              <p className="text-2xl font-bold text-[#004D40]">{patientsList.length} জন</p>
              <div className="text-[11px] font-semibold">
                {todayFollowups.length > 0 ? (
                  <span className="text-rose-600 font-bold">🔴 আজ {todayFollowups.length} জনের ফলো-আপ</span>
                ) : (
                  <span className="text-[#006B5B]">
                    {patientsList.filter((p) => p.status === "followup").length} জনের ফলো-আপ প্রয়োজন
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#006B5B]/15 shadow-2xs space-y-1">
              <span className="text-xs text-gray-500 font-medium">প্রকাশিত কনটেন্ট</span>
              <p className="text-2xl font-bold text-[#006B5B]">
                {ARTICLES_LIST.length + RUQYAH_AYAT_LIST.length + DUA_LIST.length + RUQYAH_AUDIO_LIST.length} টি
              </p>
              <span className="text-[11px] text-[#006B5B] font-semibold">আয়াত, দোয়া, অডিও ও আর্টিকেল</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Patients Table */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#004D40] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#006B5B]" />
                সর্বশেষ রোগী ও কনসালটেশন
              </h3>
              <button
                onClick={() => setActiveTab("bookings")}
                className="text-xs text-[#006B5B] font-semibold hover:underline cursor-pointer"
              >
                সকল রোগী দেখুন →
              </button>
            </div>

            <div className="space-y-3">
              {patientsList.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-2xl bg-[#FAFAF7] border border-gray-100 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-900">{p.name}</h4>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        p.type === "online" ? "bg-sky-100 text-sky-800" : "bg-teal-100 text-teal-800"
                      }`}>
                        {p.type === "online" ? "অনলাইন" : "চেম্বার"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {p.problemType} • {p.address || "ঠিকানা নেই"}
                      {(() => {
                        const fee = Number(p.fee) || 0;
                        const paid = Number(p.paid) || 0;
                        const due = p.due !== undefined ? Number(p.due) : Math.max(fee - paid, 0);
                        if (due > 0) {
                          return <span className="text-amber-800 font-bold ml-1.5">• বকেয়া: ৳{due.toLocaleString("bn-BD")}</span>;
                        }
                        if (fee > 0) {
                          return <span className="text-emerald-700 font-semibold ml-1.5">• পরিশোধিত ✓</span>;
                        }
                        return null;
                      })()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      p.status === "running"
                        ? "bg-emerald-50 text-[#004D40] border-emerald-200/70"
                        : p.status === "followup"
                        ? "bg-teal-50 text-teal-900 border-teal-200/70"
                        : p.status === "cured"
                        ? "bg-gray-50 text-gray-700 border border-gray-200/70"
                        : "bg-amber-50 text-amber-800 border border-amber-200/70"
                    }`}>
                      {p.status === "running"
                        ? "চলমান"
                        : p.status === "followup"
                        ? "ফলো-আপ"
                        : p.status === "cured"
                        ? "সুস্থ"
                        : "নতুন"}
                    </span>

                    <a
                      href={getFollowupWhatsAppUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="WhatsApp ফলো-আপ"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Follow-up Scheduling Radar & Action Center */}
          <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#004D40] flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#006B5B]" />
                  ফলো-আপ শিডিউল ও রাডার
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  নির্ধারিত তারিখে রোগীদের সাথে যোগাযোগ ও অগ্রগতি পর্যালোচনা
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("bookings");
                  setPatientFilter("today_followup");
                }}
                className="text-xs text-[#006B5B] font-bold hover:underline cursor-pointer"
              >
                শিডিউল তালিকা →
              </button>
            </div>

            {/* Quick KPI Pills for Followups */}
            <div className="grid grid-cols-3 gap-2">
              <div 
                onClick={() => { setActiveTab("bookings"); setPatientFilter("today_followup"); }}
                className="p-3 rounded-2xl bg-rose-50 border border-rose-200/70 text-center cursor-pointer hover:bg-rose-100/70 transition-all shadow-2xs"
              >
                <span className="text-[10px] text-rose-700 font-bold block">আজকের ফলো-আপ</span>
                <span className="text-xl font-black text-rose-800">{todayFollowups.length} জন</span>
              </div>
              <div 
                onClick={() => { setActiveTab("bookings"); setPatientFilter("upcoming_followup"); }}
                className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-center cursor-pointer hover:bg-amber-100/70 transition-all shadow-2xs"
              >
                <span className="text-[10px] text-amber-800 font-bold block">আসন্ন ৭ দিন</span>
                <span className="text-xl font-black text-amber-900">{upcomingFollowups.length} জন</span>
              </div>
              <div 
                onClick={() => { setActiveTab("bookings"); setPatientFilter("overdue_followup"); }}
                className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-center cursor-pointer hover:bg-gray-100 transition-all shadow-2xs"
              >
                <span className="text-[10px] text-gray-600 font-bold block">অতিক্রান্ত</span>
                <span className="text-xl font-black text-gray-800">{overdueFollowups.length} জন</span>
              </div>
            </div>

            {/* List of active follow-up patients */}
            <div className="space-y-2.5 pt-1 max-h-[360px] overflow-y-auto pr-1">
              {[...todayFollowups, ...overdueFollowups, ...upcomingFollowups].length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-xs rounded-2xl bg-[#FAFAF7] border border-dashed border-gray-200 space-y-1">
                  <p className="font-semibold text-gray-500">বর্তমানে কোনো ফলো-আপ শিডিউল নেই</p>
                  <p className="text-[11px]">রোগী ম্যানেজমেন্ট থেকে যে কারও পরবর্তী ফলো-আপের তারিখ যুক্ত করতে পারবেন।</p>
                </div>
              ) : (
                [...todayFollowups, ...overdueFollowups, ...upcomingFollowups].map((p) => {
                  const diff = getDaysDifference(p.nextFollowupDate);
                  const isToday = diff === 0;
                  const isOverdue = diff !== null && diff < 0;

                  return (
                    <div 
                      key={p.id}
                      className={`p-3 rounded-2xl border flex flex-col gap-2 transition-all ${
                        isToday 
                          ? "bg-rose-50/60 border-rose-200 shadow-2xs" 
                          : isOverdue 
                          ? "bg-amber-50/50 border-amber-200"
                          : "bg-[#FAFAF7] border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-gray-900">{p.name}</h5>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                              isToday 
                                ? "bg-rose-600 text-white animate-pulse" 
                                : isOverdue 
                                ? "bg-red-100 text-red-800" 
                                : "bg-emerald-100 text-[#004D40]"
                            }`}>
                              {isToday 
                                ? "আজকের দিন" 
                                : isOverdue 
                                ? `${Math.abs(diff!)} দিন পার` 
                                : `${diff} দিন বাকি`}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500">
                            {p.phone} • {p.problemType}
                          </p>
                          {p.nextFollowupNote && (
                            <p className="text-[11px] text-[#004D40] font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-[#006B5B]/20 inline-block mt-0.5">
                              নোট: {p.nextFollowupNote}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={getFollowupWhatsAppUrl(p)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                            title="রোগীর খোঁজ নেওয়ার জন্য বাংলা WhatsApp মেসেজ পাঠান"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>খোঁজ নিন</span>
                          </a>
                        </div>
                      </div>

                      {/* Quick Action bar: Extend date presets right here */}
                      <div className="flex items-center justify-between pt-1 border-t border-gray-200/50 text-[10px]">
                        <span className="text-gray-500 font-medium">
                          নির্ধারিত: {formatBanglaFollowupDate(p.nextFollowupDate)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleQuickScheduleFollowup(p.id, 7)}
                            className="px-1.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-[#006B5B] hover:border-[#006B5B] font-semibold cursor-pointer"
                            title="৭ দিন পর পুনঃনির্ধারণ করুন"
                          >
                            +৭ দিন
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickScheduleFollowup(p.id, 14)}
                            className="px-1.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-[#006B5B] hover:border-[#006B5B] font-semibold cursor-pointer"
                            title="১৪ দিন পর পুনঃনির্ধারণ করুন"
                          >
                            +১৪ দিন
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdatePatientStatus(p.id, "cured")}
                            className="px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 cursor-pointer"
                            title="সুস্থ ও চিকিৎসা সমাপ্ত হিসেবে মার্ক করুন"
                          >
                            সুস্থ
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="space-y-6">
          {/* Top Header Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#006B5B]">
                    <Users className="w-5 h-5" />
                  </span>
                  <h3 className="font-extrabold text-xl text-[#004D40]">
                    রোগী ও কনসালটেশন রেকর্ড (Patient Management & CRM)
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  অনলাইন ও সরাসরি চেম্বার রোগীদের তালিকা, কেস হিস্ট্রি ও ১-ক্লিক হোয়াটসঅ্যাপ ফলো-আপ
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#006B5B] text-gray-700 hover:text-[#006B5B] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  title="সকল রোগীর তথ্য এক্সেল (CSV) ফাইলে ডাউনলোড করুন"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>এক্সেল (CSV) ব্যাকআপ</span>
                </button>

                <button
                  onClick={handleOpenAddPatient}
                  className="px-5 py-2.5 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>নতুন রোগী এন্ট্রি করুন</span>
                </button>
              </div>
            </div>

            {/* KPI Stats Mini Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div 
                onClick={() => setPatientFilter("all")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  patientFilter === "all" 
                    ? "bg-[#006B5B]/10 border-[#006B5B] ring-1 ring-[#006B5B] shadow-2xs" 
                    : "bg-white border-gray-200/90 text-gray-800 hover:border-[#006B5B]/30 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${patientFilter === "all" ? "text-[#004D40] font-bold" : "text-gray-500"}`}>
                    মোট রোগী
                  </span>
                  <div className={`p-1.5 rounded-lg ${patientFilter === "all" ? "bg-[#006B5B] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#004D40] mt-1">{patientsList.length} জন</div>
                <span className="text-[10px] text-gray-400">
                  সকল নিবন্ধিত রেকর্ড
                </span>
              </div>

              <div 
                onClick={() => setPatientFilter("online")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  patientFilter === "online" 
                    ? "bg-[#006B5B]/10 border-[#006B5B] ring-1 ring-[#006B5B] shadow-2xs" 
                    : "bg-white border-gray-200/90 text-gray-800 hover:border-[#006B5B]/30 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${patientFilter === "online" ? "text-[#004D40] font-bold" : "text-gray-500"}`}>
                    অনলাইন কনসালটেশন
                  </span>
                  <div className={`p-1.5 rounded-lg ${patientFilter === "online" ? "bg-[#006B5B] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#004D40] mt-1">
                  {patientsList.filter((p) => p.type === "online").length} জন
                </div>
                <span className="text-[10px] text-gray-400">
                  ফোন বা ভিডিও কলে
                </span>
              </div>

              <div 
                onClick={() => setPatientFilter("offline")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  patientFilter === "offline" 
                    ? "bg-[#006B5B]/10 border-[#006B5B] ring-1 ring-[#006B5B] shadow-2xs" 
                    : "bg-white border-gray-200/90 text-gray-800 hover:border-[#006B5B]/30 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${patientFilter === "offline" ? "text-[#004D40] font-bold" : "text-gray-500"}`}>
                    সরাসরি চেম্বার
                  </span>
                  <div className={`p-1.5 rounded-lg ${patientFilter === "offline" ? "bg-[#006B5B] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#004D40] mt-1">
                  {patientsList.filter((p) => p.type === "offline").length} জন
                </div>
                <span className="text-[10px] text-gray-400">
                  সেন্টারে উপস্থিত হয়ে
                </span>
              </div>

              <div 
                onClick={() => setPatientFilter("today_followup")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  patientFilter === "today_followup" 
                    ? "bg-rose-50 border-rose-400 ring-1 ring-rose-400 shadow-2xs" 
                    : todayFollowups.length > 0
                    ? "bg-rose-50/40 border-rose-200 text-gray-800 hover:border-rose-400 shadow-2xs"
                    : "bg-white border-gray-200/90 text-gray-800 hover:border-[#006B5B]/30 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${patientFilter === "today_followup" ? "text-rose-900 font-bold" : todayFollowups.length > 0 ? "text-rose-700 font-bold" : "text-gray-500"}`}>
                    আজকের ফলো-আপ
                  </span>
                  <div className={`p-1.5 rounded-lg ${patientFilter === "today_followup" ? "bg-rose-600 text-white" : todayFollowups.length > 0 ? "bg-rose-100 text-rose-600 animate-pulse" : "bg-gray-100 text-gray-500"}`}>
                    <CalendarDays className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className={`text-2xl font-extrabold mt-1 ${todayFollowups.length > 0 ? "text-rose-800" : "text-[#004D40]"}`}>
                  {todayFollowups.length} জন
                </div>
                <span className="text-[10px] text-gray-400">
                  {todayFollowups.length > 0 ? "আজই খোঁজ নেওয়া প্রয়োজন" : "আজ কোনো ফলো-আপ নেই"}
                </span>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-gray-100/80 p-1 rounded-2xl">
                <button
                  onClick={() => setPatientFilter("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "all" ? "bg-white text-[#004D40] shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>সকল ({patientsList.length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("today_followup")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "today_followup" 
                      ? "bg-rose-600 text-white shadow-xs" 
                      : todayFollowups.length > 0 
                      ? "bg-rose-100/80 text-rose-800 hover:bg-rose-200" 
                      : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>আজকের ফলো-আপ ({todayFollowups.length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("upcoming_followup")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "upcoming_followup" ? "bg-[#006B5B] text-white shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>আসন্ন ৭ দিন ({upcomingFollowups.length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("overdue_followup")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "overdue_followup" ? "bg-gray-800 text-white shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>অতিক্রান্ত ({overdueFollowups.length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("online")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "online" ? "bg-white text-[#006B5B] shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>অনলাইন ({patientsList.filter((p) => p.type === "online").length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("offline")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "offline" ? "bg-white text-[#006B5B] shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>চেম্বার ({patientsList.filter((p) => p.type === "offline").length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("followup")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "followup" ? "bg-white text-[#006B5B] shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>ফলো-আপ ({patientsList.filter((p) => p.status === "followup").length})</span>
                </button>
                <button
                  onClick={() => setPatientFilter("cured")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    patientFilter === "cured" ? "bg-white text-[#006B5B] shadow-xs" : "text-gray-600 hover:text-[#006B5B]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>সুস্থ/সমাপ্ত ({patientsList.filter((p) => p.status === "cured").length})</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  placeholder="নাম, ফোন, এলাকা বা সমস্যা দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#006B5B] bg-[#FAFAF7]"
                />
              </div>
            </div>

            {/* View Mode Bar: Drawer vs Accordion & Expand/Collapse All */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-gray-500 hidden sm:inline">ভিউ মোড:</span>
                <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPatientViewPreference("drawer")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      patientViewPreference === "drawer"
                        ? "bg-white text-[#004D40] font-bold shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="ক্লিক করলে পাশে স্লাইড-ওভার প্যানেল খুলবে"
                  >
                    <PanelRight className="w-3.5 h-3.5" />
                    <span>সাইড প্যানেল ভিউ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientViewPreference("accordion")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      patientViewPreference === "accordion"
                        ? "bg-white text-[#004D40] font-bold shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="ক্লিক করলে নিচে বিস্তারিত খুলবে"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>এক্সপ্যান্ড ভিউ</span>
                  </button>
                </div>
              </div>

              {/* Expand All / Collapse All Controls */}
              {filteredPatients.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {expandedPatientIds.length > 0 ? (
                    <button
                      type="button"
                      onClick={handleCollapseAll}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="সকল এক্সপ্যান্ড করা রেকর্ড সংক্ষেপ করুন"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>সব সংক্ষেপ করুন</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleExpandAll}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="সকল রোগীর তথ্য একসাথে খুলুন"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>সব বিস্তারিত দেখুন ({filteredPatients.length})</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Patients List (Compact Rows & Expandable Accordion) */}
          <div className="space-y-2.5">
            {filteredPatients.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-200 space-y-3">
                <Users className="w-12 h-12 text-gray-300 mx-auto" />
                <h4 className="font-bold text-gray-600 text-sm">কোনো রোগীর রেকর্ড পাওয়া যায়নি</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  আপনার অনুসন্ধান অনুযায়ী কোনো তথ্য নেই। ফিল্টার পরিবর্তন করুন অথবা নতুন রোগী যুক্ত করুন।
                </p>
                <button
                  onClick={handleOpenAddPatient}
                  className="px-4 py-2 rounded-xl bg-[#006B5B] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>নতুন রোগী যুক্ত করুন</span>
                </button>
              </div>
            ) : (
              filteredPatients.map((p) => {
                const isExpanded = expandedPatientIds.includes(p.id);
                const isSelectedInDrawer = selectedPatientForDrawer?.id === p.id;

                return (
                  <div
                    key={p.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                      isSelectedInDrawer
                        ? "border-[#006B5B] ring-2 ring-[#006B5B]/20 shadow-xs"
                        : "border-gray-200 hover:border-[#006B5B]/30 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    {/* Compact Main Row */}
                    <div
                      onClick={() => {
                        if (patientViewPreference === "drawer") {
                          handleOpenPatientDrawer(p);
                        } else {
                          togglePatientExpand(p.id);
                        }
                      }}
                      className="p-3.5 sm:p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none hover:bg-[#FAFAF7]/80 transition-colors"
                    >
                      {/* Left: ID, Name, Type, Problem, Status */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md shrink-0">
                          {p.id}
                        </span>

                        <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                          {p.name}
                        </h4>

                        {p.age && (
                          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
                            {p.age} বছর
                          </span>
                        )}

                        <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                          p.type === "online" 
                            ? "bg-emerald-50 text-[#006B5B] border border-emerald-200/60" 
                            : "bg-teal-50 text-teal-800 border border-teal-200/60"
                        }`}>
                          {p.type === "online" ? <Globe className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                          <span>{p.type === "online" ? "অনলাইন" : "চেম্বার"}</span>
                        </span>

                        <div className="flex flex-wrap items-center gap-1">
                          {(p.problemType || "রুকইয়াহ").split(",").map((cat, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-[11px] font-medium text-gray-700 bg-gray-100/90 px-2 py-0.5 rounded-md border border-gray-200/80 shrink-0"
                            >
                              {cat.trim()}
                            </span>
                          ))}
                        </div>

                        {/* Status Badge without emojis */}
                        <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shrink-0 ${
                          p.status === "new"
                            ? "bg-amber-50 text-amber-800 border border-amber-200/70"
                            : p.status === "running"
                            ? "bg-emerald-50 text-[#004D40] border border-emerald-200/70"
                            : p.status === "followup"
                            ? "bg-teal-50 text-teal-900 border border-teal-200/70 font-semibold"
                            : "bg-gray-50 text-gray-700 border border-gray-200/70"
                        }`}>
                          {p.status === "new" && (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>নতুন রোগী</span>
                            </>
                          )}
                          {p.status === "running" && (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B] shrink-0" />
                              <span>চিকিৎসা চলছে</span>
                            </>
                          )}
                          {p.status === "followup" && (
                            <>
                              <Bell className="w-3 h-3 text-teal-700 shrink-0" />
                              <span>ফলো-আপ</span>
                            </>
                          )}
                          {p.status === "cured" && (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-[#006B5B] shrink-0" />
                              <span>সুস্থ ও সমাপ্ত</span>
                            </>
                          )}
                        </span>

                        {/* Next Followup Badge */}
                        {p.nextFollowupDate && (
                          <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shrink-0 ${
                            getDaysDifference(p.nextFollowupDate) === 0
                              ? "bg-rose-600 text-white animate-pulse shadow-2xs"
                              : (getDaysDifference(p.nextFollowupDate) ?? 0) < 0
                              ? "bg-red-50 text-red-800 border border-red-200"
                              : "bg-emerald-50 text-[#004D40] border border-emerald-200"
                          }`}>
                            <CalendarDays className="w-3 h-3 shrink-0" />
                            <span>
                              {getDaysDifference(p.nextFollowupDate) === 0
                                ? "আজ ফলো-আপ"
                                : (getDaysDifference(p.nextFollowupDate) ?? 0) < 0
                                ? `${Math.abs(getDaysDifference(p.nextFollowupDate)!)} দিন ওভারডিউ`
                                : `${getDaysDifference(p.nextFollowupDate)} দিন পর (${formatBanglaFollowupDate(p.nextFollowupDate)})`}
                            </span>
                          </span>
                        )}

                        {/* Payment Status Badge */}
                        {(() => {
                          const fee = Number(p.fee) || 0;
                          const paid = Number(p.paid) || 0;
                          const due = p.due !== undefined ? Number(p.due) : Math.max(fee - paid, 0);
                          if (fee === 0 && paid === 0) return null;
                          if (due > 0) {
                            return (
                              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1 shrink-0" title={`মোট ফি: ৳${fee}, পরিশোধ: ৳${paid}, বকেয়া: ৳${due}`}>
                                <Receipt className="w-3 h-3 text-amber-700" />
                                <span>বকেয়া: ৳{due.toLocaleString("bn-BD")}</span>
                              </span>
                            );
                          }
                          return (
                            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0" title={`মোট ফি: ৳${fee}, সম্পূর্ণ পরিশোধিত`}>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>পরিশোধিত ✓ (৳{paid.toLocaleString("bn-BD")})</span>
                            </span>
                          );
                        })()}
                      </div>

                      {/* Right: Phone, Date, Quick WhatsApp, Action Buttons */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-mono font-medium text-gray-700">{p.phone}</span>
                          <span className="text-gray-300 hidden sm:inline">•</span>
                          <span className="text-[11px] text-gray-400 hidden md:inline">{p.date}</span>
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {/* Quick 1-Click WhatsApp Direct Chat */}
                          <a
                            href={getDirectChatWhatsAppUrl(p)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#006B5B] hover:bg-[#25D366] hover:text-white transition-all cursor-pointer"
                            title="সরাসরি WhatsApp চ্যাট শুরু করুন"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Quick Follow-up button if status is followup or has next date */}
                          {(p.status === "followup" || p.nextFollowupDate) && (
                            <a
                              href={getFollowupWhatsAppUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#006B5B] hover:bg-[#004D40] text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                              title="রোগীর খোঁজ নেওয়ার জন্য স্বয়ংক্রিয় বাংলা ফলো-আপ মেসেজ পাঠান"
                            >
                              <HeartHandshake className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">খোঁজ নিন</span>
                            </a>
                          )}

                          {/* Side Drawer Trigger Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenPatientDrawer(p)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#006B5B] transition-colors cursor-pointer"
                            title="সাইড প্যানেলে বিস্তারিত ও ফলো-আপ দেখুন"
                          >
                            <PanelRight className="w-4 h-4" />
                          </button>

                          {/* Accordion Toggle Trigger Button */}
                          <button
                            type="button"
                            onClick={(e) => togglePatientExpand(p.id, e)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                            title={isExpanded ? "সংক্ষেপ করুন" : "নিচে বিস্তারিত দেখুন"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#006B5B]" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inline Accordion Expandable Section */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 bg-[#FAFAF7] border-t border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                        {/* Status dropdown & Visit slot */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500">চিকিৎসা স্ট্যাটাস:</span>
                            <select
                              value={p.status}
                              onChange={(e) => handleUpdatePatientStatus(p.id, e.target.value as any)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 outline-none bg-white text-gray-800 focus:border-[#006B5B] cursor-pointer"
                            >
                              <option value="new">নতুন রোগী</option>
                              <option value="running">চিকিৎসা চলছে</option>
                              <option value="followup">ফলো-আপ প্রয়োজন</option>
                              <option value="cured">সুস্থ ও সমাপ্ত</option>
                            </select>
                          </div>

                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#006B5B]" />
                            <span>ভিজিট: {p.date} {p.timeSlot ? `(${p.timeSlot})` : ""}</span>
                          </div>
                        </div>

                        {/* Follow-up Scheduling Card in Accordion */}
                        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-amber-700" />
                              <span className="text-xs font-bold text-amber-900">ফলো-আপ শিডিউল</span>
                            </div>
                            {p.nextFollowupDate ? (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                getDaysDifference(p.nextFollowupDate) === 0
                                  ? "bg-rose-600 text-white animate-pulse"
                                  : (getDaysDifference(p.nextFollowupDate) ?? 0) < 0
                                  ? "bg-red-100 text-red-800"
                                  : "bg-emerald-100 text-[#004D40]"
                              }`}>
                                {getDaysDifference(p.nextFollowupDate) === 0
                                  ? "আজ ফলো-আপের দিন"
                                  : (getDaysDifference(p.nextFollowupDate) ?? 0) < 0
                                  ? `${Math.abs(getDaysDifference(p.nextFollowupDate)!)} দিন ওভারডিউ`
                                  : `${getDaysDifference(p.nextFollowupDate)} দিন পর`}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-500 font-medium">নির্ধারিত নেই</span>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="space-y-0.5">
                              <p className="text-gray-700">
                                <span className="font-semibold text-gray-500">পরবর্তী তারিখ: </span>
                                <span className="font-bold text-[#004D40]">
                                  {p.nextFollowupDate ? formatBanglaFollowupDate(p.nextFollowupDate) : "নির্ধারণ করুন"}
                                </span>
                              </p>
                              {p.nextFollowupNote && (
                                <p className="text-[11px] text-amber-900 font-medium">
                                  <span className="text-gray-500">নোট: </span>{p.nextFollowupNote}
                                </p>
                              )}
                            </div>

                            {/* Quick Presets */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleQuickScheduleFollowup(p.id, 7)}
                                className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                                title="৭ দিন পর ফলো-আপ"
                              >
                                +৭ দিন
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickScheduleFollowup(p.id, 10)}
                                className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                                title="১০ দিন পর ফলো-আপ"
                              >
                                +১০ দিন
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickScheduleFollowup(p.id, 14)}
                                className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                                title="১৪ দিন পর ফলো-আপ"
                              >
                                +১৪ দিন
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickScheduleFollowup(p.id, 30)}
                                className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                                title="১ মাস পর ফলো-আপ"
                              >
                                +১ মাস
                              </button>
                              {p.nextFollowupDate && (
                                <button
                                  type="button"
                                  onClick={() => handleClearFollowup(p.id)}
                                  className="px-2 py-1 text-[11px] font-semibold bg-white border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                                  title="ফলো-আপ শিডিউল মুছে ফেলুন"
                                >
                                  মুছুন
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact & Location & Age */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100">
                            <Phone className="w-4 h-4 text-[#006B5B] shrink-0" />
                            <div>
                              <span className="text-gray-400 block text-[10px]">মোবাইল (WhatsApp):</span>
                              <a href={`tel:${p.phone}`} className="font-bold text-gray-900 hover:text-[#006B5B]">
                                {p.phone}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100">
                            <MapPin className="w-4 h-4 text-[#006B5B] shrink-0" />
                            <div>
                              <span className="text-gray-400 block text-[10px]">ঠিকানা / এলাকা:</span>
                              <span className="font-medium text-gray-800">{p.address || "ঠিকানা উল্লেখ নেই"}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100">
                            <Users className="w-4 h-4 text-[#006B5B] shrink-0" />
                            <div>
                              <span className="text-gray-400 block text-[10px]">রোগীর বয়স:</span>
                              <span className="font-bold text-gray-800">{p.age ? `${p.age} বছর` : "উল্লেখ নেই"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Symptoms & Prescription */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 space-y-1">
                            <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-gray-500" />
                              <span>রোগের লক্ষণ ও কেস হিস্ট্রি:</span>
                            </span>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {p.notes || "কোনো বিশেষ নোট নেই।"}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                            <span className="text-[11px] font-bold text-[#004D40] flex items-center gap-1.5">
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>আমল ও প্রেসক্রিপশন:</span>
                            </span>
                            <p className="text-xs text-gray-700 leading-relaxed font-medium">
                              {p.prescription || "দৈনিক ৩ কুল ও সকাল-সন্ধ্যার মাসনুন আজকার।"}
                            </p>
                          </div>
                        </div>

                        {/* Fee & Payment Accounting Box in Accordion */}
                        {(() => {
                          const fee = Number(p.fee) || 0;
                          const paid = Number(p.paid) || 0;
                          const due = p.due !== undefined ? Number(p.due) : Math.max(fee - paid, 0);

                          return (
                            <div className="p-3.5 rounded-xl bg-white border border-gray-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                              <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
                                  <Coins className="w-4 h-4 text-[#006B5B]" />
                                  <span>ফি হিসাব:</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-[10px] block">মোট ফি</span>
                                  <span className="font-bold text-gray-800">৳{fee.toLocaleString("bn-BD")}</span>
                                </div>
                                <div>
                                  <span className="text-emerald-600 text-[10px] block">আদায় / পেইড</span>
                                  <span className="font-bold text-emerald-700">৳{paid.toLocaleString("bn-BD")}</span>
                                </div>
                                <div>
                                  <span className={`${due > 0 ? "text-amber-700" : "text-gray-400"} text-[10px] block font-semibold`}>বকেয়া</span>
                                  <span className={`font-bold ${due > 0 ? "text-amber-800" : "text-gray-700"}`}>৳{due.toLocaleString("bn-BD")}</span>
                                </div>
                              </div>

                              {due > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleMarkPatientPaid(p.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1"
                                  title="বকেয়া সম্পূর্ণ পরিশোধ হিসেবে চিহ্নিত করুন"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>বকেয়া পরিশোধ রেকর্ড করুন</span>
                                </button>
                              ) : (
                                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                                  ✓ সম্পূর্ণ পরিশোধিত
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-gray-200/60">
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={getFollowupWhatsAppUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                              title="স্বয়ংক্রিয় বাংলা ফলো-আপ মেসেজ পাঠান"
                            >
                              <HeartHandshake className="w-3.5 h-3.5" />
                              <span>খোঁজ নিন (ফলো-আপ)</span>
                            </a>

                            <a
                              href={getPrescriptionWhatsAppUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-[#004D40] hover:bg-[#00382E] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                              title="নির্ধারিত প্রেসক্রিপশন রিমাইন্ডার পাঠান"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>আমল রিমাইন্ডার</span>
                            </a>

                            <a
                              href={getDirectChatWhatsAppUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                              title="সরাসরি WhatsApp চ্যাট শুরু করুন"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>চ্যাট</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditPatient(p)}
                              className="px-3 py-1.5 rounded-xl text-gray-600 hover:text-[#006B5B] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>এডিট</span>
                            </button>

                            <button
                              onClick={() => handleDeletePatient(p.id)}
                              className="p-1.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Slide-Over Side Drawer (ক্লিক করলে যেকোনো এক পাশে খুলবে) */}
          {selectedPatientForDrawer && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              {/* Backdrop Overlay */}
              <div
                onClick={handleClosePatientDrawer}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              />

              {/* Side Panel Sheet */}
              <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] md:w-[540px] bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-gray-200">
                {/* Drawer Sticky Top Header */}
                <div className="px-5 py-4 bg-[#004D40] text-white flex items-center justify-between shrink-0 shadow-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-md shrink-0">
                      {selectedPatientForDrawer.id}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base sm:text-lg leading-tight truncate">
                        {selectedPatientForDrawer.name}
                      </h4>
                      <span className="text-[11px] text-emerald-200 block truncate">
                        {selectedPatientForDrawer.date} {selectedPatientForDrawer.timeSlot ? `• ${selectedPatientForDrawer.timeSlot}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEditPatient(selectedPatientForDrawer)}
                      className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title="রোগীর তথ্য সম্পাদনা করুন"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={handleClosePatientDrawer}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="প্যানেল বন্ধ করুন (Esc)"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Drawer Scrollable Body Content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-gray-700">
                  {/* Badges & Status Selector */}
                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-200/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                          selectedPatientForDrawer.type === "online" 
                            ? "bg-emerald-50 text-[#006B5B] border border-emerald-200/60" 
                            : "bg-teal-50 text-teal-800 border border-teal-200/60"
                        }`}>
                          {selectedPatientForDrawer.type === "online" ? <Globe className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                          <span>{selectedPatientForDrawer.type === "online" ? "অনলাইন কনসালটেশন" : "সরাসরি চেম্বার"}</span>
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {(selectedPatientForDrawer.problemType || "রুকইয়াহ").split(",").map((cat, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200/80"
                            >
                              {cat.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">চিকিৎসা স্ট্যাটাস পরিবর্তন করুন:</label>
                      <select
                        value={selectedPatientForDrawer.status}
                        onChange={(e) => handleUpdatePatientStatus(selectedPatientForDrawer.id, e.target.value as any)}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200 outline-none bg-white text-gray-800 focus:border-[#006B5B] cursor-pointer"
                      >
                        <option value="new">নতুন রোগী</option>
                        <option value="running">চিকিৎসা চলছে</option>
                        <option value="followup">ফলো-আপ প্রয়োজন</option>
                        <option value="cured">সুস্থ ও সমাপ্ত</option>
                      </select>
                    </div>
                  </div>

                  {/* Follow-up Scheduling Section */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-amber-700" />
                        <span className="text-xs font-bold text-amber-900">ফলো-আপ শিডিউল ও পরবর্তী তারিখ</span>
                      </div>
                      {selectedPatientForDrawer.nextFollowupDate ? (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          getDaysDifference(selectedPatientForDrawer.nextFollowupDate) === 0
                            ? "bg-rose-600 text-white animate-pulse"
                            : (getDaysDifference(selectedPatientForDrawer.nextFollowupDate) ?? 0) < 0
                            ? "bg-red-100 text-red-800"
                            : "bg-emerald-100 text-[#004D40]"
                        }`}>
                          {getDaysDifference(selectedPatientForDrawer.nextFollowupDate) === 0
                            ? "আজকে ফলো-আপ"
                            : (getDaysDifference(selectedPatientForDrawer.nextFollowupDate) ?? 0) < 0
                            ? `${Math.abs(getDaysDifference(selectedPatientForDrawer.nextFollowupDate)!)} দিন ওভারডিউ`
                            : `${getDaysDifference(selectedPatientForDrawer.nextFollowupDate)} দিন পর`}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-500 font-medium">নির্ধারিত নেই</span>
                      )}
                    </div>

                    <div className="text-xs space-y-1.5 text-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">নির্ধারিত তারিখ:</span>
                        <span className="font-bold text-[#004D40]">
                          {selectedPatientForDrawer.nextFollowupDate 
                            ? formatBanglaFollowupDate(selectedPatientForDrawer.nextFollowupDate) 
                            : "এখনো নির্ধারণ করা হয়নি"}
                        </span>
                      </div>
                      {selectedPatientForDrawer.nextFollowupNote && (
                        <div className="flex flex-col gap-0.5 pt-1">
                          <span className="text-gray-500 text-[11px]">ফলো-আপের উদ্দেশ্য / নির্দেশনা নোট:</span>
                          <p className="p-2.5 rounded-xl bg-white border border-amber-200/60 text-[11px] text-gray-800 font-medium">
                            {selectedPatientForDrawer.nextFollowupNote}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Date Presets */}
                    <div className="space-y-1.5 pt-1 border-t border-amber-200/60">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        দ্রুত তারিখ নির্ধারণ বা পুনঃনির্ধারণ:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[7, 10, 14, 21, 30].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => handleQuickScheduleFollowup(selectedPatientForDrawer.id, d)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#006B5B] hover:text-[#006B5B] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            +{d === 30 ? "১ মাস" : `${d} দিন`}
                          </button>
                        ))}
                        {selectedPatientForDrawer.nextFollowupDate && (
                          <button
                            type="button"
                            onClick={() => handleClearFollowup(selectedPatientForDrawer.id)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            মুছুন
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click WhatsApp CRM Actions */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      WhatsApp ফলো-আপ ও অ্যাকশন
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {/* Follow-up Button */}
                      <a
                        href={getFollowupWhatsAppUrl(selectedPatientForDrawer)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-3 rounded-2xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold text-xs flex items-center justify-between shadow-xs transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <HeartHandshake className="w-4 h-4" />
                          <span>খোঁজ নিন (স্বয়ংক্রিয় বাংলা ফলো-আপ)</span>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">১-ক্লিক</span>
                      </a>

                      {/* Amal Reminder Button */}
                      <a
                        href={getPrescriptionWhatsAppUrl(selectedPatientForDrawer)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-3 rounded-2xl bg-[#004D40] hover:bg-[#00382E] text-white font-bold text-xs flex items-center justify-between shadow-xs transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>আমল ও প্রেসক্রিপশন রিমাইন্ডার</span>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">১-ক্লিক</span>
                      </a>

                      {/* Direct WhatsApp Chat */}
                      <a
                        href={getDirectChatWhatsAppUrl(selectedPatientForDrawer)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>সরাসরি WhatsApp চ্যাট শুরু করুন</span>
                      </a>
                    </div>
                  </div>

                  {/* Fee & Payment Accounting Card in Drawer */}
                  {(() => {
                    const fee = Number(selectedPatientForDrawer.fee) || 0;
                    const paid = Number(selectedPatientForDrawer.paid) || 0;
                    const due = selectedPatientForDrawer.due !== undefined ? Number(selectedPatientForDrawer.due) : Math.max(fee - paid, 0);

                    return (
                      <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-200 space-y-3 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-[#006B5B]" />
                            <span>চিকিৎসা ফি ও পেমেন্ট হিসাব</span>
                          </span>
                          {due > 0 ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                              <Receipt className="w-3 h-3 text-amber-700" />
                              <span>বকেয়া রয়েছে</span>
                            </span>
                          ) : fee > 0 ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>পরিশোধিত ✓</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-gray-400">ফি নির্ধারিত নেই</span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                            <span className="text-[10px] text-gray-500 font-medium block">মোট ফি</span>
                            <span className="text-sm font-bold text-gray-900">৳{fee.toLocaleString("bn-BD")}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                            <span className="text-[10px] text-emerald-700 font-medium block">জমা / পেইড</span>
                            <span className="text-sm font-bold text-emerald-800">৳{paid.toLocaleString("bn-BD")}</span>
                          </div>
                          <div className={`p-2.5 rounded-xl border ${due > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}`}>
                            <span className={`text-[10px] font-medium block ${due > 0 ? "text-amber-800 font-bold" : "text-gray-500"}`}>বকেয়া / ডিউ</span>
                            <span className={`text-sm font-bold ${due > 0 ? "text-amber-800" : "text-gray-700"}`}>৳{due.toLocaleString("bn-BD")}</span>
                          </div>
                        </div>

                        {due > 0 && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => handleMarkPatientPaid(selectedPatientForDrawer.id)}
                              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>১-ক্লিকে বকেয়া পরিশোধ সম্পন্ন করুন</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Contact & Appointment Info Card */}
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-2xs">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      যোগাযোগ ও অ্যাপয়েন্টমেন্ট
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#006B5B]" />
                          <span className="font-semibold text-gray-700">মোবাইল নম্বর:</span>
                        </div>
                        <a href={`tel:${selectedPatientForDrawer.phone}`} className="font-mono font-bold text-gray-900 hover:text-[#006B5B]">
                          {selectedPatientForDrawer.phone}
                        </a>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#006B5B]" />
                          <span className="font-semibold text-gray-700">রোগীর বয়স:</span>
                        </div>
                        <span className="font-bold text-gray-900">
                          {selectedPatientForDrawer.age ? `${selectedPatientForDrawer.age} বছর` : "উল্লেখ নেই"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#006B5B]" />
                          <span className="font-semibold text-gray-700">ঠিকানা / এলাকা:</span>
                        </div>
                        <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">
                          {selectedPatientForDrawer.address || "উল্লেখ নেই"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#006B5B]" />
                          <span className="font-semibold text-gray-700">তারিখ ও সময়:</span>
                        </div>
                        <span className="font-medium text-gray-800">
                          {selectedPatientForDrawer.date} {selectedPatientForDrawer.timeSlot ? `(${selectedPatientForDrawer.timeSlot})` : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Symptoms & Case History */}
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                    <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>রোগের বিস্তারিত লক্ষণ ও কেস হিস্ট্রি:</span>
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 whitespace-pre-wrap">
                      {selectedPatientForDrawer.notes || "কোনো বিশেষ লক্ষণ বা কেস হিস্ট্রি উল্লেখ করা হয়নি।"}
                    </p>
                  </div>

                  {/* Prescription & Ruqyah Routine */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2 shadow-2xs">
                    <span className="text-[11px] font-bold text-[#004D40] flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                      <span>আমল ও প্রেসক্রিপশন:</span>
                    </span>
                    <p className="text-xs text-gray-800 leading-relaxed font-medium bg-white p-3 rounded-xl border border-emerald-200/60 whitespace-pre-wrap">
                      {selectedPatientForDrawer.prescription || "দৈনিক ৩ কুল ও সকাল-সন্ধ্যার মাসনুন আজকার।"}
                    </p>
                  </div>
                </div>

                {/* Drawer Sticky Footer with Quick Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDeletePatient(selectedPatientForDrawer.id)}
                    className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>রেকর্ড মুছুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClosePatientDrawer}
                    className="px-5 py-2 rounded-xl bg-[#004D40] hover:bg-[#00382E] text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Accounting & Financial Management Tab */}
      {activeTab === "accounting" && (
        <div className="space-y-6">
          {/* Top Header Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-2xl bg-emerald-50 text-[#006B5B] shadow-2xs">
                    <Receipt className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-xl text-[#004D40]">
                      আর্থিক হিসাব ও আয়-বকেয়া খতিয়ান (Accounting & Revenue)
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      মাসিক ও বাৎসরিক মোট রোগী, আদায়কৃত ফি, অবশিষ্ট বকেয়া এবং আর্থিক প্রবৃদ্ধির সার্বিক বিবরণী
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportAccountingCSV}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#006B5B] text-gray-700 hover:text-[#006B5B] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs bg-white"
                  title="বাছাইকৃত সময়ের হিসাব এক্সেল (CSV) ফাইলে ডাউনলোড করুন"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>এক্সেল (CSV) হিসাব ডাউনলোড</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-400 text-gray-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs bg-white"
                  title="এই আর্থিক বিবরণী প্রিন্ট বা পিডিএফ হিসেবে সেভ করুন"
                >
                  <Printer className="w-4 h-4 text-gray-600" />
                  <span>প্রিন্ট / PDF</span>
                </button>
              </div>
            </div>

            {/* Interactive Period Filter Toolbar */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Year & Month Dropdowns */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Year selector */}
                  <div className="flex items-center gap-1.5 bg-[#FAFAF7] border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#006B5B]" />
                    <span className="text-gray-500">বছর:</span>
                    <select
                      value={accountingYear}
                      onChange={(e) => setAccountingYear(e.target.value)}
                      className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
                    >
                      <option value="all">সর্বকালীন (সব বছর)</option>
                      {detectedYears.map((y) => (
                        <option key={y} value={String(y)}>
                          {y} সাল
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Month selector */}
                  <div className="flex items-center gap-1.5 bg-[#FAFAF7] border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#006B5B]" />
                    <span className="text-gray-500">মাস:</span>
                    <select
                      value={accountingMonth}
                      onChange={(e) => setAccountingMonth(e.target.value)}
                      className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
                    >
                      <option value="all">পুরো বছর (১২ মাস)</option>
                      {BANGLA_MONTH_NAMES.map((m, idx) => (
                        <option key={idx} value={String(idx + 1)}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAccountingYear(String(currentYear));
                        setAccountingMonth(String(currentMonth));
                        setAccountingDueOnly(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        accountingYear === String(currentYear) && accountingMonth === String(currentMonth)
                          ? "bg-[#006B5B] text-white shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      চলতি মাস
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const lastMonthNum = currentMonth === 1 ? 12 : currentMonth - 1;
                        const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
                        setAccountingYear(String(lastMonthYear));
                        setAccountingMonth(String(lastMonthNum));
                        setAccountingDueOnly(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        accountingMonth !== "all" && Number(accountingMonth) === (currentMonth === 1 ? 12 : currentMonth - 1)
                          ? "bg-[#006B5B] text-white shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      গত মাস
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAccountingYear(String(currentYear));
                        setAccountingMonth("all");
                        setAccountingDueOnly(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        accountingYear === String(currentYear) && accountingMonth === "all"
                          ? "bg-[#006B5B] text-white shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      চলতি বছর ({currentYear})
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAccountingYear("all");
                        setAccountingMonth("all");
                        setAccountingDueOnly(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        accountingYear === "all" && accountingMonth === "all" && !accountingDueOnly
                          ? "bg-[#006B5B] text-white shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      সর্বকালীন
                    </button>

                    {/* Due Only Toggle */}
                    <button
                      type="button"
                      onClick={() => setAccountingDueOnly(!accountingDueOnly)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        accountingDueOnly
                          ? "bg-amber-500 text-white shadow-2xs"
                          : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                      }`}
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>শুধু বকেয়া রোগী ({duePatientsCount})</span>
                    </button>
                  </div>
                </div>

                {/* Filter Search */}
                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={accountingSearch}
                    onChange={(e) => setAccountingSearch(e.target.value)}
                    placeholder="হিসাবে নাম, মোবাইল দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#006B5B] bg-[#FAFAF7]"
                  />
                </div>
              </div>

              {/* Active Filter Indicator Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <span className="font-semibold">বর্তমান ফিল্টার:</span>
                <span className="font-bold text-[#004D40] bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {accountingMonth !== "all" ? BANGLA_MONTH_NAMES[Number(accountingMonth) - 1] : "সকল মাস"}{" "}
                  {accountingYear !== "all" ? `${accountingYear} সাল` : "(সর্বকালীন)"}
                  {accountingDueOnly ? " • শুধুমাত্র বকেয়া" : ""}
                </span>
                <span className="text-gray-400">• মোট {accountingFilteredPatients.length} টি রেকর্ড পাওয়া গেছে</span>
              </div>
            </div>

            {/* KPI Summary 4 Cards for Selected Period */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-gray-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">মোট আগত রোগী</span>
                  <div className="p-1.5 rounded-lg bg-emerald-100/70 text-[#006B5B]">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-[#004D40]">
                  {accountingFilteredPatients.length} জন
                </p>
                <div className="text-[11px] text-gray-500 font-medium">
                  অনলাইন: {accountingFilteredPatients.filter((p) => p.type === "online").length} • চেম্বার: {accountingFilteredPatients.filter((p) => p.type === "offline").length}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-gray-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">ধার্যকৃত মোট ফি</span>
                  <div className="p-1.5 rounded-lg bg-teal-100/70 text-teal-800">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">
                  ৳{periodTotalFee.toLocaleString("bn-BD")}
                </p>
                <div className="text-[11px] text-gray-500 font-medium">
                  গড় ফি: ৳{accountingFilteredPatients.length > 0 ? Math.round(periodTotalFee / accountingFilteredPatients.length).toLocaleString("bn-BD") : "০"} / জন
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-900">মোট আদায় / পেইড</span>
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-800">
                  ৳{periodTotalPaid.toLocaleString("bn-BD")}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
                    <span>আদায়ের হার</span>
                    <span>{periodCollectionRate}%</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(periodCollectionRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-2xs space-y-1.5 ${
                periodTotalDue > 0 ? "bg-amber-50/80 border-amber-300" : "bg-[#FAFAF7] border-gray-200"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${periodTotalDue > 0 ? "text-amber-900 font-bold" : "text-gray-600"}`}>
                    অবশিষ্ট বকেয়া (ডিউ)
                  </span>
                  <div className={`p-1.5 rounded-lg ${periodTotalDue > 0 ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Receipt className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-2xl sm:text-3xl font-black ${periodTotalDue > 0 ? "text-amber-800" : "text-gray-700"}`}>
                  ৳{periodTotalDue.toLocaleString("bn-BD")}
                </p>
                <div className="text-[11px] font-bold">
                  {periodDueCount > 0 ? (
                    <span className="text-amber-800">⚠️ {periodDueCount} জন রোগীর বকেয়া রয়েছে</span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">✓ কোনো বকেয়া অবশিষ্ট নেই</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown Table for Selected Year */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h4 className="font-bold text-base text-[#004D40] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#006B5B]" />
                  <span>{activeBreakdownYear} সালের মাসভিত্তিক আয় ও বকেয়ার খতিয়ান</span>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  প্রতি মাসের মোট রোগী, ধার্যকৃত ফি, আদায় এবং বকেয়ার পূর্ণ হিসাব
                </p>
              </div>

              {accountingYear === "all" && (
                <span className="text-xs text-[#006B5B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                  চলতি বছর ({activeBreakdownYear}) প্রদর্শিত
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 bg-gray-50/80">
                    <th className="p-3 font-bold rounded-l-xl">মাস</th>
                    <th className="p-3 font-bold text-center">রোগী সংখ্যা</th>
                    <th className="p-3 font-bold text-right">ধার্যকৃত ফি</th>
                    <th className="p-3 font-bold text-right">আদায়কৃত (পেইড)</th>
                    <th className="p-3 font-bold text-right">বকেয়া (ডিউ)</th>
                    <th className="p-3 font-bold text-center">আদায় হার</th>
                    <th className="p-3 font-bold text-center rounded-r-xl">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {monthlyBreakdown.map((m) => {
                    const isSelectedMonth = accountingMonth === String(m.monthNumber);
                    const isCurrentMonth = m.monthNumber === currentMonth && activeBreakdownYear === currentYear;

                    return (
                      <tr
                        key={m.monthNumber}
                        className={`hover:bg-gray-50/80 transition-colors ${
                          isSelectedMonth ? "bg-emerald-50/60 font-semibold" : ""
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{m.monthName}</span>
                            {isCurrentMonth && (
                              <span className="text-[9px] font-extrabold bg-[#006B5B] text-white px-1.5 py-0.2 rounded-md">
                                বর্তমান মাস
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            m.patientCount > 0 ? "bg-emerald-100 text-[#004D40] font-bold" : "text-gray-400"
                          }`}>
                            {m.patientCount} জন
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900">
                          ৳{m.totalFee.toLocaleString("bn-BD")}
                        </td>
                        <td className="p-3 text-right font-bold text-emerald-700">
                          ৳{m.totalPaid.toLocaleString("bn-BD")}
                        </td>
                        <td className="p-3 text-right">
                          <span className={`font-bold ${m.totalDue > 0 ? "text-amber-800" : "text-gray-400"}`}>
                            ৳{m.totalDue.toLocaleString("bn-BD")}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {m.totalFee > 0 ? (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              m.collectionRate >= 90
                                ? "bg-emerald-100 text-emerald-800"
                                : m.collectionRate >= 50
                                ? "bg-teal-100 text-teal-800"
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {m.collectionRate}%
                            </span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setAccountingYear(String(activeBreakdownYear));
                              setAccountingMonth(String(m.monthNumber));
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              isSelectedMonth
                                ? "bg-[#006B5B] text-white shadow-2xs"
                                : "bg-gray-100 hover:bg-[#006B5B] hover:text-white text-gray-700"
                            }`}
                            title={`${m.monthName} মাসের রোগীদের তালিকা নিচে দেখুন`}
                          >
                            {isSelectedMonth ? "নির্বাচিত ✓" : "তালিকা দেখুন"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold text-xs text-gray-900">
                    <td className="p-3 font-extrabold">মোট বাৎসরিক হিসাব</td>
                    <td className="p-3 text-center text-[#004D40]">
                      {monthlyBreakdown.reduce((sum, m) => sum + m.patientCount, 0)} জন
                    </td>
                    <td className="p-3 text-right text-gray-900">
                      ৳{monthlyBreakdown.reduce((sum, m) => sum + m.totalFee, 0).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-3 text-right text-emerald-700">
                      ৳{monthlyBreakdown.reduce((sum, m) => sum + m.totalPaid, 0).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-3 text-right text-amber-800">
                      ৳{monthlyBreakdown.reduce((sum, m) => sum + m.totalDue, 0).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-3 text-center">
                      {(() => {
                        const yrFee = monthlyBreakdown.reduce((sum, m) => sum + m.totalFee, 0);
                        const yrPaid = monthlyBreakdown.reduce((sum, m) => sum + m.totalPaid, 0);
                        return yrFee > 0 ? `${Math.round((yrPaid / yrFee) * 100)}%` : "০%";
                      })()}
                    </td>
                    <td className="p-3 text-center text-gray-400">-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Yearly Comparison Overview Table */}
          {detectedYears.length > 1 && (
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
              <h4 className="font-bold text-base text-[#004D40] flex items-center gap-2 border-b border-gray-100 pb-3">
                <TrendingUp className="w-4 h-4 text-[#006B5B]" />
                <span>বাৎসরিক আর্থিক প্রবৃদ্ধি ও তুলনা (Yearly Comparison)</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 bg-gray-50/80 font-bold">
                      <th className="p-3">বছর</th>
                      <th className="p-3 text-center">রোগী</th>
                      <th className="p-3 text-right">ধার্য ফি</th>
                      <th className="p-3 text-right">আদায়কৃত (পেইড)</th>
                      <th className="p-3 text-right">বকেয়া (ডিউ)</th>
                      <th className="p-3 text-center">আদায় হার</th>
                      <th className="p-3 text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {yearlyBreakdown.map((y) => (
                      <tr key={y.year} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{y.year} সাল</td>
                        <td className="p-3 text-center">{y.patientCount} জন</td>
                        <td className="p-3 text-right font-bold">৳{y.totalFee.toLocaleString("bn-BD")}</td>
                        <td className="p-3 text-right font-bold text-emerald-700">৳{y.totalPaid.toLocaleString("bn-BD")}</td>
                        <td className="p-3 text-right font-bold text-amber-800">৳{y.totalDue.toLocaleString("bn-BD")}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {y.collectionRate}%
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setAccountingYear(String(y.year));
                              setAccountingMonth("all");
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gray-100 hover:bg-[#006B5B] hover:text-white transition-colors cursor-pointer"
                          >
                            বছর নির্বাচন করুন
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Period Patients Financial Ledger & Actions Table */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h4 className="font-bold text-base text-[#004D40] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#006B5B]" />
                  <span>বাছাইকৃত সময়ের রোগী ও পেমেন্ট বিবরণী</span>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  প্রতিটি রোগীর বিস্তারিত ফি, পরিশোধিত টাকা, অবশিষ্ট বকেয়া ও ১-ক্লিক অ্যাকশন
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">মোট পাওয়া গেছে:</span>
                <span className="font-extrabold text-[#004D40] bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {accountingFilteredPatients.length} জন
                </span>
              </div>
            </div>

            {accountingFilteredPatients.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#FAFAF7] border border-dashed border-gray-200 space-y-2">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="font-bold text-gray-600 text-sm">এই সময়ের কোনো রোগীর রেকর্ড পাওয়া যায়নি</p>
                <p className="text-xs text-gray-400">
                  ফিল্টার পরিবর্তন করে &apos;সর্বকালীন&apos; বা অন্য কোনো মাস/বছর নির্বাচন করে দেখতে পারেন।
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 bg-gray-50/80 font-bold">
                      <th className="p-3">আইডি ও নাম</th>
                      <th className="p-3">বয়স</th>
                      <th className="p-3">যোগাযোগ</th>
                      <th className="p-3">ধরন ও তারিখ</th>
                      <th className="p-3 text-right">মোট ফি</th>
                      <th className="p-3 text-right">পরিশোধিত</th>
                      <th className="p-3 text-right">বকেয়া</th>
                      <th className="p-3 text-center">স্ট্যাটাস</th>
                      <th className="p-3 text-center">তাৎক্ষণিক অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {accountingFilteredPatients.map((p) => {
                      const f = Number(p.fee) || 0;
                      const pd = Number(p.paid) || 0;
                      const d = p.due !== undefined ? Number(p.due) : Math.max(f - pd, 0);

                      return (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-gray-400 font-bold">{p.id}</span>
                                <span className="font-bold text-gray-900 text-xs">{p.name}</span>
                              </div>
                              <span className="text-[11px] text-gray-500 block truncate max-w-[180px]">
                                {p.problemType}
                              </span>
                            </div>
                          </td>

                          <td className="p-3 whitespace-nowrap">
                            {p.age ? (
                              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-bold text-[11px]">
                                {p.age} বছর
                              </span>
                            ) : (
                              <span className="text-gray-400 text-[11px]">-</span>
                            )}
                          </td>

                          <td className="p-3 whitespace-nowrap">
                            <span className="font-mono text-gray-700 block">{p.phone}</span>
                            <span className="text-[10px] text-gray-400 block truncate max-w-[140px]">
                              {p.address || "ঠিকানা নেই"}
                            </span>
                          </td>

                          <td className="p-3 whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mb-0.5 ${
                              p.type === "online" ? "bg-sky-100 text-sky-800" : "bg-teal-100 text-teal-800"
                            }`}>
                              {p.type === "online" ? "অনলাইন" : "চেম্বার"}
                            </span>
                            <span className="text-[11px] text-gray-400 block">{p.date}</span>
                          </td>

                          <td className="p-3 text-right font-bold text-gray-900 whitespace-nowrap">
                            ৳{f.toLocaleString("bn-BD")}
                          </td>

                          <td className="p-3 text-right font-bold text-emerald-700 whitespace-nowrap">
                            ৳{pd.toLocaleString("bn-BD")}
                          </td>

                          <td className="p-3 text-right whitespace-nowrap">
                            {d > 0 ? (
                              <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 inline-block">
                                ৳{d.toLocaleString("bn-BD")}
                              </span>
                            ) : (
                              <span className="text-emerald-600 font-semibold text-[11px]">
                                পরিশোধিত ✓
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-center whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              p.status === "running"
                                ? "bg-emerald-50 text-[#004D40] border-emerald-200"
                                : p.status === "followup"
                                ? "bg-teal-50 text-teal-900 border-teal-200"
                                : p.status === "cured"
                                ? "bg-gray-50 text-gray-700 border-gray-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}>
                              {p.status === "running"
                                ? "চলমান"
                                : p.status === "followup"
                                ? "ফলো-আপ"
                                : p.status === "cured"
                                ? "সুস্থ"
                                : "নতুন"}
                            </span>
                          </td>

                          <td className="p-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* 1-Click Mark Paid if due */}
                              {d > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMarkPatientPaid(p.id)}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                                  title="সম্পূর্ণ বকেয়া পরিশোধ হিসেবে সেভ করুন"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* WhatsApp due notice if due, or followup */}
                              {d > 0 ? (
                                <a
                                  href={getDuePaymentWhatsAppUrl(p)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
                                  title="বকেয়া সংক্রান্ত WhatsApp মেসেজ পাঠান"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              ) : (
                                <a
                                  href={getFollowupWhatsAppUrl(p)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                                  title="WhatsApp যোগাযোগ"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* View details in drawer */}
                              <button
                                type="button"
                                onClick={() => handleOpenPatientDrawer(p)}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                title="রোগীর সম্পূর্ণ বিস্তারিত ও প্রেসক্রিপশন দেখুন"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold text-xs text-gray-900">
                      <td colSpan={4} className="p-3 font-extrabold">
                        বাছাইকৃত সময়ের সর্বমোট ({accountingFilteredPatients.length} জন রোগী)
                      </td>
                      <td className="p-3 text-right font-black">
                        ৳{periodTotalFee.toLocaleString("bn-BD")}
                      </td>
                      <td className="p-3 text-right font-black text-emerald-700">
                        ৳{periodTotalPaid.toLocaleString("bn-BD")}
                      </td>
                      <td className="p-3 text-right font-black text-amber-800">
                        ৳{periodTotalDue.toLocaleString("bn-BD")}
                      </td>
                      <td colSpan={2} className="p-3 text-center text-xs text-[#004D40]">
                        আদায়ের হার: {periodCollectionRate}%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
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
                {popupConfig.expiryDate && new Date(popupConfig.expiryDate).getTime() < Date.now() ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 flex items-center gap-1.5 border border-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    মেয়াদোত্তীর্ণ (তারিখ অতিক্রম হওয়ায় সাইটে অটো-অফ রয়েছে)
                  </span>
                ) : popupConfig.isActive ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5 border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {popupConfig.expiryDate 
                      ? `সক্রিয় (মেয়াদ: ${new Date(popupConfig.expiryDate).toLocaleDateString("bn-BD")} পর্যন্ত)` 
                      : "সক্রিয় (ভিজিটরদের সামনে প্রদর্শিত হচ্ছে)"}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center gap-1.5 border border-red-300">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    নিষ্ক্রিয় (পপআপ বন্ধ রয়েছে)
                  </span>
                )}
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
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{popupConfig.timeText}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{popupConfig.seatsText}</span>
                    </div>
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

                {/* Expiry Date & Auto-off Setting */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-700" />
                      <label className="font-bold text-gray-800 text-xs">
                        পপআপ মেয়াদ শেষ হওয়ার তারিখ ও সময় (Expiry Date & Auto-Off)
                      </label>
                    </div>
                    {popupConfig.expiryDate ? (
                      new Date(popupConfig.expiryDate).getTime() < Date.now() ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 shrink-0">
                          ⚠️ মেয়াদ উত্তীর্ণ (অটো-অফ)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          সক্রিয় (অটো-অফ সক্রিয়)
                        </span>
                      )
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                        মেয়াদহীন (ম্যানুয়াল)
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-500">
                    নির্ধারিত তারিখ ও সময় পার হয়ে গেলে মূল ওয়েবসাইটে পপআপ প্রদর্শন স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে।
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                    <input
                      type="datetime-local"
                      value={popupConfig.expiryDate ? popupConfig.expiryDate.slice(0, 16) : ""}
                      onChange={(e) => setPopupConfig({ ...popupConfig, expiryDate: e.target.value })}
                      className="p-2.5 rounded-xl border border-gray-200 focus:border-[#006B5B] outline-none bg-white text-xs font-mono"
                    />

                    {/* Quick Presets for Expiry */}
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 3);
                          d.setHours(23, 59, 0, 0);
                          setPopupConfig({ ...popupConfig, expiryDate: d.toISOString().slice(0, 16) });
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                      >
                        +৩ দিন
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 7);
                          d.setHours(23, 59, 0, 0);
                          setPopupConfig({ ...popupConfig, expiryDate: d.toISOString().slice(0, 16) });
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                      >
                        +৭ দিন
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 15);
                          d.setHours(23, 59, 0, 0);
                          setPopupConfig({ ...popupConfig, expiryDate: d.toISOString().slice(0, 16) });
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                      >
                        +১৫ দিন
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 30);
                          d.setHours(23, 59, 0, 0);
                          setPopupConfig({ ...popupConfig, expiryDate: d.toISOString().slice(0, 16) });
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-[#006B5B] hover:text-[#006B5B] cursor-pointer"
                      >
                        +৩০ দিন
                      </button>
                      {popupConfig.expiryDate && (
                        <button
                          type="button"
                          onClick={() => setPopupConfig({ ...popupConfig, expiryDate: "" })}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                        >
                          মেয়াদহীন করুন
                        </button>
                      )}
                    </div>
                  </div>
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
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>ছবি সংযুক্ত আছে</span>
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
                        <p className="text-[10px] text-gray-500 leading-relaxed flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>যেকোনো সাইজের ছবি সিলেক্ট করলেই স্বয়ংক্রিয়ভাবে অপটিমাইজ ও কম্প্রেস হয়ে দ্রুত লোড হবে।</span>
                        </p>
                      </div>
                    </div>

                    {/* Collapsible Image URL fallback */}
                    <div className="pt-2 border-t border-gray-200/60">
                      <details className="text-[11px] text-gray-500 cursor-pointer">
                        <summary className="font-semibold hover:text-[#006B5B] select-none inline-flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                          <span>অথবা অনলাইনের ছবির লিঙ্ক (URL) দিন</span>
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
      {/* Add / Edit Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 bg-[#004D40] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F2C94C]" />
                <h4 className="font-bold text-sm md:text-base">
                  {editingPatientId ? "রোগীর তথ্য ও প্রেসক্রিপশন সম্পাদন করুন" : "নতুন রোগী এন্ট্রি করুন"}
                </h4>
              </div>
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePatientSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Name, Phone & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">রোগীর নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">মোবাইল নম্বর (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="যেমন: 017xxxxxxxx"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">রোগীর বয়স (বছর)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="130"
                      placeholder="যেমন: ২৫"
                      value={patientForm.age || ""}
                      onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                      className="w-full p-2.5 pr-12 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] font-semibold text-gray-800"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-medium pointer-events-none">
                      বছর
                    </span>
                  </div>
                </div>
              </div>

              {/* Address / Location & Patient Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ঠিকানা / এলাকা / জেলা</label>
                  <input
                    type="text"
                    placeholder="যেমন: মিরপুর ১০, ঢাকা / চট্টগ্রাম"
                    value={patientForm.address}
                    onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">রোগীর ধরন *</label>
                  <select
                    value={patientForm.type}
                    onChange={(e) => setPatientForm({ ...patientForm, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white font-semibold"
                  >
                    <option value="online">অনলাইন কনসালটেশন (ফোন / ভিডিও)</option>
                    <option value="offline">সরাসরি চেম্বার (সেন্টারে উপস্থিত)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">বর্তমান চিকিৎসা স্ট্যাটাস *</label>
                  <select
                    value={patientForm.status}
                    onChange={(e) => setPatientForm({ ...patientForm, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white font-semibold"
                  >
                    <option value="new">নতুন রোগী (New Patient)</option>
                    <option value="running">চিকিৎসা চলছে (Under Treatment)</option>
                    <option value="followup">ফলো-আপ প্রয়োজন (Follow-up Due)</option>
                    <option value="cured">সুস্থ ও চিকিৎসা সমাপ্ত (Cured)</option>
                  </select>
                </div>
              </div>

              {/* Multi-Select Problem Categories Section */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="block font-bold text-gray-800 text-xs">
                    সমস্যার ক্যাটাগরি * <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/80 ml-1.5">একাধিক নির্বাচনযোগ্য</span>
                  </label>
                  <span className={`text-[11px] font-semibold ${currentCategories.length > 0 ? "text-[#006B5B]" : "text-amber-700"}`}>
                    {currentCategories.length > 0 ? `✓ ${currentCategories.length}টি ক্যাটাগরি নির্বাচিত` : "⚠️ কমপক্ষে ১টি নির্বাচন করুন"}
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PROBLEM_CATEGORIES.map((cat) => {
                    const isSelected = currentCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleToggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border select-none ${
                          isSelected
                            ? "bg-[#006B5B] text-white border-[#006B5B] shadow-xs hover:bg-[#005749]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#006B5B]/50 hover:bg-emerald-50/60"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold border transition-colors ${
                          isSelected ? "bg-white text-[#006B5B] border-white" : "border-gray-300 text-transparent"
                        }`}>
                          ✓
                        </span>
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom / typed categories tag display */}
                {currentCategories.some((cat) => !PRESET_PROBLEM_CATEGORIES.includes(cat)) && (
                  <div className="pt-1 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] text-gray-600 font-medium">কাস্টম সমস্যা:</span>
                    {currentCategories
                      .filter((cat) => !PRESET_PROBLEM_CATEGORIES.includes(cat))
                      .map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-100/80 text-teal-900 border border-teal-300/80 text-xs font-semibold"
                        >
                          <span>{cat}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleCategory(cat)}
                            className="hover:text-red-600 cursor-pointer p-0.5 rounded-full hover:bg-white/60 transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                )}

                {/* Custom Category Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="তালিকায় না থাকলে নতুন সমস্যা লিখে যোগ করুন (যেমন: অনিদ্রা, দুঃস্বপ্ন)..."
                    value={customCategoryInput}
                    onChange={(e) => setCustomCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomCategory();
                      }
                    }}
                    className="flex-1 p-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-[#006B5B]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCategory}
                    disabled={!customCategoryInput.trim()}
                    className="px-3.5 py-2 bg-[#006B5B] hover:bg-[#005749] disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Visit Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">সাক্ষাৎ বা কনসালটেশনের তারিখ</label>
                  <input
                    type="text"
                    placeholder="যেমন: ১৫ সেপ্টেম্বর, ২০২৬"
                    value={patientForm.date}
                    onChange={(e) => setPatientForm({ ...patientForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">সময় বা স্লট (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="যেমন: রাত ৮:০০ - ৯:০০ / দুপুর ১২:০০"
                    value={patientForm.timeSlot || ""}
                    onChange={(e) => setPatientForm({ ...patientForm, timeSlot: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                  />
                </div>
              </div>

              {/* Symptoms and Case History */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  রোগের লক্ষণ ও কেস হিস্ট্রি (বিস্তারিত নোট)
                </label>
                <textarea
                  rows={3}
                  placeholder="রোগীর কী কী শারীরিক বা আধ্যাত্মিক সমস্যা অনুভূত হচ্ছে, কতদিন ধরে সমস্যা, পূর্বের কোনো চিকিৎসা ইত্যাদি..."
                  value={patientForm.notes}
                  onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                />
              </div>

              {/* Prescriptions & Amals */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  নির্ধারিত আমল ও প্রেসক্রিপশন (Treatment Routine)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: প্রতিদিন সকালে খালি পেটে সানা মাক্কি চা, ৩ কুল আমল, রুকইয়াহ তেল মালিশ, ঘরে সূরা বাকারা বাজানো..."
                  value={patientForm.prescription}
                  onChange={(e) => setPatientForm({ ...patientForm, prescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                />
              </div>

              {/* Fee & Payment Accounting Form Section */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-gray-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#006B5B]" />
                    <span className="font-bold text-xs text-[#004D40]">
                      চিকিৎসা ফি ও পেমেন্ট হিসাব (৳)
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">
                    রোগী পূর্ণ বা আংশিক টাকা দিলে এখানে হিসাব রাখুন
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      মোট চিকিৎসা ফি (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="যেমন: ৫০০"
                      value={patientForm.fee === 0 ? "" : patientForm.fee}
                      onChange={(e) => {
                        const feeVal = Math.max(Number(e.target.value) || 0, 0);
                        const paidVal = Number(patientForm.paid) || 0;
                        setPatientForm({
                          ...patientForm,
                          fee: feeVal,
                          due: Math.max(feeVal - paidVal, 0),
                        });
                      }}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      পরিশোধিত টাকা / জমা (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="যেমন: ৩০০"
                      value={patientForm.paid === 0 ? "" : patientForm.paid}
                      onChange={(e) => {
                        const paidVal = Math.max(Number(e.target.value) || 0, 0);
                        const feeVal = Number(patientForm.fee) || 0;
                        setPatientForm({
                          ...patientForm,
                          paid: paidVal,
                          due: Math.max(feeVal - paidVal, 0),
                        });
                      }}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white text-xs font-semibold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      অবশিষ্ট বকেয়া (৳)
                    </label>
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold flex items-center justify-between min-h-[38px]">
                      <span className={Math.max((Number(patientForm.fee) || 0) - (Number(patientForm.paid) || 0), 0) > 0 ? "text-amber-800" : "text-emerald-700"}>
                        ৳{Math.max((Number(patientForm.fee) || 0) - (Number(patientForm.paid) || 0), 0).toLocaleString("bn-BD")}
                      </span>
                      {Math.max((Number(patientForm.fee) || 0) - (Number(patientForm.paid) || 0), 0) === 0 && (Number(patientForm.fee) || 0) > 0 ? (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                          পরিশোধিত ✓
                        </span>
                      ) : Math.max((Number(patientForm.fee) || 0) - (Number(patientForm.paid) || 0), 0) > 0 ? (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                          বকেয়া রয়েছে
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 self-center mr-1">দ্রুত সেট:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const f = Number(patientForm.fee) || 0;
                      setPatientForm({ ...patientForm, paid: f, due: 0 });
                    }}
                    className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md hover:bg-emerald-100 cursor-pointer"
                  >
                    ফুল পেইড (সম্পূর্ণ পরিশোধ)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPatientForm({ ...patientForm, paid: 0, due: Number(patientForm.fee) || 0 });
                    }}
                    className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-md hover:bg-amber-100 cursor-pointer"
                  >
                    সম্পূর্ণ বকেয়া
                  </button>
                </div>
              </div>

              {/* Next Followup Date & Note */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-xs text-amber-900">
                    পরবর্তী ফলো-আপ শিডিউল (Next Follow-up Scheduling)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      পরবর্তী সাক্ষাতের তারিখ (YYYY-MM-DD)
                    </label>
                    <input
                      type="date"
                      value={patientForm.nextFollowupDate || ""}
                      onChange={(e) => setPatientForm({ ...patientForm, nextFollowupDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white text-xs font-mono font-medium"
                    />
                    {/* Preset buttons */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {[7, 10, 14, 21, 30].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setPatientForm((prev) => ({ ...prev, nextFollowupDate: addDaysToDate(days) }))}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white border border-gray-200 rounded-md hover:bg-emerald-50 hover:border-[#006B5B] text-gray-700 cursor-pointer"
                        >
                          +{days === 30 ? "১ মাস" : `${days} দিন`}
                        </button>
                      ))}
                      {patientForm.nextFollowupDate && (
                        <button
                          type="button"
                          onClick={() => setPatientForm((prev) => ({ ...prev, nextFollowupDate: "" }))}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white border border-rose-200 text-rose-600 rounded-md hover:bg-rose-50 cursor-pointer"
                        >
                          ক্লিয়ার
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ফলো-আপ নোট / উদ্দেশ্য (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: ৭ দিন পর আমল ও প্রতিক্রিয়া চেক"
                      value={patientForm.nextFollowupNote || ""}
                      onChange={(e) => setPatientForm({ ...patientForm, nextFollowupNote: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] bg-white text-xs"
                    />
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      এই নোটটি WhatsApp রিমাইন্ডার মেসেজে স্বয়ংক্রিয়ভাবে যুক্ত হবে।
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006B5B] hover:bg-[#004D40] text-white font-bold cursor-pointer transition-colors shadow-xs"
                >
                  {editingPatientId ? "তথ্য আপডেট করুন" : "রোগী সেভ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  </div>
);
}
