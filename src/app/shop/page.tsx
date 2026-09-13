"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PRODUCTS, ProductItem } from "@/data/products";
import { SITE_CONFIG } from "@/config/site";
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  Info, 
  X, 
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {
    const loadProducts = () => {
      try {
        const stored = localStorage.getItem("sunnahlife_custom_products");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        }
      } catch {}
    };

    loadProducts();
    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
  }, []);

  const categories = [
    { id: "all", label: "সকল পণ্য" },
    { id: "ruqyah_items", label: "রুকইয়াহ সামগ্রী (সিদর/সানা মাক্কি)" },
    { id: "oils_honey", label: "খাঁটি মধু ও তেল" },
    { id: "sunnah_food", label: "সুন্নাহ ফুড ও আজওয়া" },
    { id: "hijama", label: "হিজামা সামগ্রী" },
  ];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const getDirectWhatsAppUrl = (product: ProductItem, qty = 1, name = "", phone = "", address = "") => {
    let text = `আসসালামু আলাইকুম। আমি সুন্নাহলাইফ স্টোর থেকে নিম্নোক্ত পণ্যটি অর্ডার করতে চাচ্ছি:\n\n`;
    text += `📦 পণ্যের নাম: ${product.banglaName} (${product.weightOrQuantity})\n`;
    text += `🔢 পরিমাণ: ${qty} টি\n`;
    text += `💰 সর্বমোট মূল্য: ৳${product.price * qty}\n\n`;
    
    if (name || phone || address) {
      text += `আমার ডেলিভারি ঠিকানা:\n`;
      text += `👤 নাম: ${name || "..."}\n`;
      text += `📱 ফোন নম্বর: ${phone || "..."}\n`;
      text += `📍 ডেলিভারি ঠিকানা: ${address || "..."}\n`;
    } else {
      text += `ডেলিভারি ঠিকানা ও বিস্তারিত জানতে চাচ্ছি।`;
    }

    return `https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#004D40] via-[#006B5B] to-[#004D40] text-white p-6 md:p-10 shadow-lg relative overflow-hidden text-center md:text-left">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#F2C94C] text-xs font-semibold backdrop-blur-xs">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>সুন্নাহলাইফ খাঁটি ও প্রামাণ্য স্টোর</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            রুকইয়াহ সামগ্রী ও বিশুদ্ধ সুন্নাহ পণ্য
          </h1>

          <p className="text-sm md:text-base text-emerald-100 leading-relaxed">
            খাঁটি সানা মাক্কি, সিদর পাউডার, এক্সট্রা ভার্জিন জয়তুনের তেল, সুন্দরবনের মধু ও মদিনার আজওয়া খেজুর। ঘরে বসেই সরাসরি WhatsApp-এ অর্ডার করুন।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F2C94C]" />
              <span>১০০% খাঁটি ও নির্ভেজাল</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#F2C94C]" />
              <span>সারাদেশে হোম ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[#F2C94C]" />
              <span>হটলাইন: 01676820060</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#006B5B] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#006B5B]/40 hover:text-[#006B5B]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl border border-gray-200 hover:border-[#006B5B]/30 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Image Box */}
            <div 
              className="relative aspect-[4/3] bg-[#004D40]/5 overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-gray-100"
              onClick={() => {
                setActiveModalProduct(product);
                setOrderQuantity(1);
              }}
            >
              <Image
                src={product.image || "/banners/special-offer-tuesday.jpg"}
                alt={product.banglaName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Category & Badge */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md bg-[#006B5B] text-white text-[10px] font-bold shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-gray-700 text-[10px] font-semibold border border-gray-200">
                  {product.weightOrQuantity}
                </span>
              </div>

              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                {product.inStock ? "স্টকে আছে" : "স্টক শেষ"}
              </div>
            </div>

            {/* Product Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-[#006B5B]">
                  {product.categoryLabel}
                </span>

                <h3 
                  onClick={() => {
                    setActiveModalProduct(product);
                    setOrderQuantity(1);
                  }}
                  className="font-bold text-sm md:text-base text-gray-900 hover:text-[#006B5B] transition-colors line-clamp-1 cursor-pointer"
                >
                  {product.banglaName}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits snippet */}
                <div className="pt-1.5 space-y-1 text-[11px] text-gray-600">
                  {product.benefits.slice(0, 1).map((b, i) => (
                    <div key={i} className="flex items-start gap-1 line-clamp-1">
                      <CheckCircle2 className="w-3 h-3 text-[#006B5B] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & WhatsApp Action */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-[#004D40]">
                      ৳{product.price}
                    </span>
                    {product.regularPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product.regularPrice}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveModalProduct(product);
                      setOrderQuantity(1);
                    }}
                    className="text-[11px] text-[#006B5B] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    <span>ব্যবহার বিধি</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <a
                  href={getDirectWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp-এ অর্ডার</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail & Direct Order Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#004D40] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#F2C94C]" />
                <h4 className="text-sm md:text-base font-bold truncate">
                  {activeModalProduct.banglaName}
                </h4>
              </div>

              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#FAFAF7]">
              {/* Product Overview Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-xs font-semibold text-[#006B5B] px-2.5 py-0.5 rounded-md bg-emerald-50">
                    {activeModalProduct.categoryLabel} • {activeModalProduct.weightOrQuantity}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    {activeModalProduct.banglaName}
                  </h3>
                  <p className="text-xs text-gray-500">{activeModalProduct.name}</p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-extrabold text-[#004D40]">
                    ৳{activeModalProduct.price}
                  </div>
                  {activeModalProduct.regularPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      রেগুলার মূল্য: ৳{activeModalProduct.regularPrice}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-[#004D40] uppercase tracking-wider">
                  পণ্যের বিবরণ ও গুরুত্ব
                </h5>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed bg-white p-3.5 rounded-xl border border-gray-200">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#004D40] uppercase tracking-wider">
                  সুন্নাহ নির্দেশিত উপকারিতা ও বৈশিষ্ট্য
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalProduct.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>রুকইয়াহ ও সেবনের সঠিক নিয়ম (Usage Guide):</span>
                </h5>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {activeModalProduct.usageInstructions}
                </p>
              </div>

              {/* Order Form on WhatsApp */}
              <div className="p-4 rounded-2xl bg-white border border-[#006B5B]/20 shadow-xs space-y-3">
                <h5 className="text-xs font-bold text-[#004D40] flex items-center gap-1.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp-এ সরাসরি অর্ডার করুন</span>
                </h5>

                {/* Quantity selector */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-700">পরিমাণ (Quantity):</span>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <button
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      className="text-gray-500 hover:text-gray-900 cursor-pointer p-0.5"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm text-gray-900 font-mono">{orderQuantity}</span>
                    <button
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      className="text-gray-500 hover:text-gray-900 cursor-pointer p-0.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">আপনার নাম (ঐচ্ছিক):</label>
                    <input
                      type="text"
                      placeholder="মুহাম্মদ..."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">মোবাইল নম্বর (ঐচ্ছিক):</label>
                    <input
                      type="text"
                      placeholder="017xxxxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1 font-medium text-xs">ডেলিভারি ঠিকানা (ঐচ্ছিক):</label>
                  <input
                    type="text"
                    placeholder="থানা, জেলা..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full p-2 rounded-xl border border-gray-200 outline-none focus:border-[#006B5B] text-xs"
                  />
                </div>

                <a
                  href={getDirectWhatsAppUrl(activeModalProduct, orderQuantity, customerName, customerPhone, customerAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>অর্ডার কনফার্ম করুন (মোট: ৳{activeModalProduct.price * orderQuantity})</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[11px] text-center text-gray-400">
                  ক্যাশ অন ডেলিভারি প্রযোজ্য • সারাদেশে কুরিয়ার হোম ডেলিভারি
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
