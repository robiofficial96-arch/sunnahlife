export interface ProductItem {
  id: string;
  name: string;
  banglaName: string;
  category: "ruqyah_items" | "oils_honey" | "sunnah_food" | "hijama";
  categoryLabel: string;
  price: number;
  regularPrice?: number;
  weightOrQuantity: string;
  description: string;
  benefits: string[];
  usageInstructions: string;
  inStock: boolean;
  image: string;
  badge?: string;
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "sana-makki-leaf",
    name: "Sana Makki Leaves (Dried)",
    banglaName: "খাঁটি সানা মাক্কি পাতা (পেট ডিটক্স)",
    category: "ruqyah_items",
    categoryLabel: "রুকইয়াহ সামগ্রী",
    price: 250,
    regularPrice: 350,
    weightOrQuantity: "১০০ গ্রাম",
    description: "পেটের জাদু (সিহর মা'কুল) ও পরিপাকতন্ত্রের বিষাক্ত শয়তানি গিঁট বিনষ্টে নবীজী (ﷺ) নির্দেশিত উৎকৃষ্ট ভেষজ।",
    benefits: [
      "ইবনে মাজাহ ৩৪৫৭: মৃত্যু ছাড়া সকল রোগের প্রতিষেধক",
      "পেটের দীর্ঘমেয়াদী গ্যাস ও খাওয়ানো জাদুর প্রভাব দূরীকরণ",
      "হজমশক্তি বৃদ্ধি ও কোলন পরিষ্কার করে"
    ],
    usageInstructions: "১ চামচ সানা মাক্কি পাতা ফুটন্ত গরম পানিতে ১০ মিনিট ভিজিয়ে ছেঁকে সামান্য মধু মিশিয়ে সকালে খালি পেটে পান করুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "পেটের জাদুতে বিশেষ"
  },
  {
    id: "sidr-powder-pure",
    name: "Pure Sidr Leaves Powder",
    banglaName: "খাঁটি বরই পাতার গুঁড়ো (সিদর পাউডার)",
    category: "ruqyah_items",
    categoryLabel: "রুকইয়াহ সামগ্রী",
    price: 320,
    regularPrice: 420,
    weightOrQuantity: "২০০ গ্রাম",
    description: "জিন-জাদু, বদনজর ও শারীরিক অবসাদ দূর করতে রুকইয়াহ গোসলের জন্য অত্যন্ত প্রয়োজনীয় প্রাকৃতিক উপাদান।",
    benefits: [
      "জাদুর বাঁধন ও শরীর ভারী লাগা প্রশমিত করে",
      "গোসলের পানিতে মিশিয়ে ৭ দিন ব্যবহার অত্যন্ত ফলপ্রসূ",
      "চুল পড়া বন্ধ ও ত্বকের ইনফেকশন দূর করে"
    ],
    usageInstructions: "এক বালতি পানিতে ২ চা চামচ সিদর পাউডার মিশিয়ে কুরআনের আয়াত পড়ে ফুঁ দিয়ে গোসল সম্পন্ন করুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "গোসলের রুকইয়াহ"
  },
  {
    id: "olive-oil-extra-virgin",
    name: "Extra Virgin Olive Oil (Ruqyah Grade)",
    banglaName: "এক্সট্রা ভার্জিন জয়তুনের তেল",
    category: "oils_honey",
    categoryLabel: "খাঁটি তেল ও মধু",
    price: 750,
    regularPrice: 900,
    weightOrQuantity: "২৫০ মিলি",
    description: "বরকতময় বৃক্ষের খাঁটি নির্যাস। রুকইয়াহ তিলাওয়াত ফুঁক দিয়ে শরীরে মালিশ ও পানের উপযোগী।",
    benefits: [
      "তিরমিযী ১৮৫১: জয়তুনের তেল খাও এবং তা শরীরে মালিশ কর",
      "জিন স্পর্শ ও শারীরিক দীর্ঘস্থায়ী ব্যথায় মালিশে দ্রুত আরাম",
      "ত্বক উজ্জ্বল রাখে ও পেশির খিঁচুনি দূর করে"
    ],
    usageInstructions: "৩ কুল ও আয়াতুল কুরসি পড়ে তেলে ফুঁ দিন। রাতে ঘুমানোর পূর্বে মেরুদণ্ড, কপাল ও ব্যথার স্থানে মালিশ করুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "সুন্নাহ মালিশ"
  },
  {
    id: "sundarban-raw-honey",
    name: "Raw Sundarban Natural Honey",
    banglaName: "সুন্দরবনের খাঁটি প্রাকৃতিক মধু",
    category: "oils_honey",
    categoryLabel: "খাঁটি তেল ও মধু",
    price: 850,
    regularPrice: 1050,
    weightOrQuantity: "৫০০ গ্রাম",
    description: "কুরআনে বর্ণিত মহা শেফাযুক্ত বিশুদ্ধ প্রাকৃতিক মধু। সানা মাক্কি বা কালোজিরার সাথে সেবনে অত্যন্ত কার্যকরী।",
    benefits: [
      "সূরা আন-নাহল ৬৯: এতে রয়েছে মানুষের জন্য রোগমুক্তি",
      "রোগ প্রতিরোধ ক্ষমতা ও শারীরিক এনার্জি বহু গুণ বৃদ্ধি",
      "গলা ব্যথা, কফ ও পেটের আলসারে দ্রুত উপশম"
    ],
    usageInstructions: "প্রতিদিন সকালে ১ গ্লাস কুসুম গরম পানিতে ১ চামচ মধু ও রুকইয়াহ ফুঁক দিয়ে পান করুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "কুরআনী শেফা"
  },
  {
    id: "ajwa-dates-madinah",
    name: "Original Madinah Ajwa Dates",
    banglaName: "মদিনার খাঁটি প্রিমিয়াম আজওয়া খেজুর",
    category: "sunnah_food",
    categoryLabel: "সুন্নাহ ফুড ও খাদ্য",
    price: 1250,
    regularPrice: 1500,
    weightOrQuantity: "৫০০ গ্রাম",
    description: "নবীজী (ﷺ)-এর প্রিয় আজওয়া খেজুর। নিয়মিত সেবনে বিষ ও জাদুর অনিষ্ট থেকে সম্পূর্ণ সুরক্ষা লাভ হয়।",
    benefits: [
      "বুখারী ৫৪৪৫: যে ব্যক্তি প্রত্যহ সকালে ৭টি আজওয়া খাবে, সে দিন বিষ ও জাদু তার ক্ষতি করবে না",
      "হৃদযন্ত্র ও মস্তিষ্কের সুরক্ষা",
      "গর্ভবতী মা ও দুর্বল রোগীদের জন্য বলকারক পুষ্টি"
    ],
    usageInstructions: "প্রতিদিন সকালে ফজর সালাতের পর খালি পেটে ৭টি আজওয়া খেজুর চিবিয়ে খান।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "নবীজীর (ﷺ) পছন্দের"
  },
  {
    id: "black-seed-oil-pure",
    name: "Cold Pressed Black Seed Oil",
    banglaName: "কোল্ড প্রেসড খাঁটি কালোজিরার তেল",
    category: "oils_honey",
    categoryLabel: "খাঁটি তেল ও মধু",
    price: 450,
    regularPrice: 550,
    weightOrQuantity: "১০০ মিলি",
    description: "কালোজিরা সকল রোগের মহৌষধ। সরাসরি কোল্ড প্রেস পদ্ধতিতে সংগৃহীত শতভাগ খাঁটি ও তীব্র ঘ্রাণের তেল।",
    benefits: [
      "সহীহ বুখারী ৫৬৮৭: মৃত্যু ছাড়া প্রতিটি রোগের আরোগ্য",
      "শ্বাসকষ্ট ও সাইনোসাইটিসের তীব্র ব্যথা নিরাময়ে সহায়ক",
      "মাথাব্যথা ও মাইগ্রেনের স্থানে মালিশে প্রশান্তি"
    ],
    usageInstructions: "আধা চামচ কালোজিরার তেল সামান্য মধুর সাথে মিশিয়ে সকালে খেতে পারেন বা কপালে মালিশ করতে পারেন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "মহৌষধ"
  },
  {
    id: "ruqyah-bath-salt-combo",
    name: "Ruqyah Mineral Bath Salt & Sidr",
    banglaName: "রুকইয়াহ খনিজ বাথ সল্ট ও সিদর কম্বো",
    category: "ruqyah_items",
    categoryLabel: "রুকইয়াহ সামগ্রী",
    price: 550,
    regularPrice: 700,
    weightOrQuantity: "৫০০ গ্রাম",
    description: "বদনজর ও শয়তানের অশুভ ভারাক্রান্ত ভাব শরীর থেকে দূর করতে বিশেষ প্রাকৃতিক মিনারেল সল্ট ও সিদর কম্বিনেশন।",
    benefits: [
      "শরীরের ক্লান্তি ও দুঃস্বপ্নের মানসিক চাপ দূর করে",
      "রুকইয়াহ পানিতে গোসলে চামড়ার নেতিবাচক এনার্জি শোষণ",
      "একটানা ২১ দিন গোসলে দারুণ উপকার পাওয়া যায়"
    ],
    usageInstructions: "কুসুম গরম পানির বালতিতে ৩ চামচ সল্ট গুলিয়ে রুকইয়াহ তিলাওয়াত করে পুরো শরীরে ঢালুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "বদনজর প্যাকেজ"
  },
  {
    id: "hijama-cupping-set-12",
    name: "Clinical Hijama Cupping Set (12 Cups + Pump)",
    banglaName: "মেডিকেল গ্রেড হিজামা কাপ সেট (১২ পিস)",
    category: "hijama",
    categoryLabel: "হিজামা সামগ্রী",
    price: 650,
    regularPrice: 850,
    weightOrQuantity: "১ বক্স (১২ কাপ + সাকশন গান)",
    description: "সহীহ সুন্নাহ মোতাবেক দূষিত রক্ত অপসারণের জন্য জীবাণুমুক্ত উন্নত মানের হিজামা কাপিং সেট।",
    benefits: [
      "রক্ত সঞ্চালন বৃদ্ধি ও টক্সিন নির্গমন",
      "পিঠ, কোমর ও ঘাড়ের দীর্ঘদিনের বাতের ব্যথায় উপশম",
      "সহীহ বুখারী ৫৬৯৬ নির্দেশিত আরোগ্যের পথ"
    ],
    usageInstructions: "প্রশিক্ষিত অভিজ্ঞ রাক্বী বা হিজামা থেরাপিস্ট দ্বারা নির্ধারিত সুন্নাহ পয়েন্টে ব্যবহার করুন।",
    inStock: true,
    image: "/banners/special-offer-tuesday.jpg",
    badge: "হিজামা টুল"
  }
];
