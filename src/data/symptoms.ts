export interface Symptom {
  id: string;
  label: string;
  category: "sleep" | "mental" | "physical" | "life";
  severityWeight: number; // 1 to 3
  hint?: string;
}

export interface SymptomCategory {
  id: "sleep" | "mental" | "physical" | "life";
  title: string;
  iconName: string;
  description: string;
}

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: "sleep",
    title: "ঘুম ও দুঃস্বপ্ন সংক্রান্ত",
    iconName: "Moon",
    description: "ঘুমের মধ্যে ভীতি, অদ্ভুত স্বপ্ন বা দম বন্ধ অনুভূতির লক্ষণসমূহ",
  },
  {
    id: "mental",
    title: "মানসিক ও আচরণগত অবস্থা",
    iconName: "Brain",
    description: "অহেতুক অস্থিরতা, ভয়, রাগ, ওয়াসওয়াসা বা ইবাদতে তীব্র অনীহা",
  },
  {
    id: "physical",
    title: "শারীরিক অস্পষ্ট লক্ষণ",
    iconName: "Activity",
    description: "ডাক্তারি পরীক্ষায় কারণ না পাওয়া দীর্ঘমেয়াদী ব্যথা বা অস্বাভাবিক অনুভূতি",
  },
  {
    id: "life",
    title: "জীবন ও পারিবারিক সংকট",
    iconName: "Users",
    description: "দাম্পত্যে অহেতুক বিবাদ, বিয়েতে অযাচিত বাধা বা সার্বিক অচলাবস্থা",
  },
];

export const SYMPTOMS_LIST: Symptom[] = [
  // Sleep
  {
    id: "nightmare_animals",
    category: "sleep",
    label: "স্বপ্নে ঘনঘন কালো কুকুর, সাপ, বিড়াল বা হিংস্র প্রাণী দেখা",
    severityWeight: 2,
    hint: "জিন বা সিহর সংক্রান্ত সমস্যায় প্রায়শই এমনটি দেখা যায়",
  },
  {
    id: "nightmare_falling",
    category: "sleep",
    label: "স্বপ্নে কোনো উঁচু স্থান থেকে পড়ে যাওয়া বা পানিতে ডুবে যাওয়ার অনুভূতি",
    severityWeight: 1,
  },
  {
    id: "sleep_paralysis",
    category: "sleep",
    label: "ঘুমের ঘোরে দম আটকে আসা, নড়াচড়া করতে না পারা (বোবায় ধরা)",
    severityWeight: 2,
  },
  {
    id: "frequent_wake_fear",
    category: "sleep",
    label: "ঘুমের মধ্যে হঠাৎ বুক ধড়ফড় করে এবং তীব্র ভয় পেয়ে জেগে ওঠা",
    severityWeight: 1,
  },
  {
    id: "extreme_insomnia_sleepiness",
    category: "sleep",
    label: "দীর্ঘদিন অনিদ্রা অথবা সারাদিন অস্বাভাবিক নিস্তেজ ঘুম ঘুম ভাব",
    severityWeight: 1,
  },

  // Mental
  {
    id: "quran_discomfort",
    category: "mental",
    label: "কুরআন তিলাওয়াত, আযান বা যিকির শুনলে অতিরিক্ত অস্বস্তি বা রাগ হওয়া",
    severityWeight: 3,
    hint: "এটি আধ্যাত্মিক স্পর্শ বা জিনঘটিত বিষয়ের অন্যতম বড় আলামত",
  },
  {
    id: "sudden_anger",
    category: "mental",
    label: "তুচ্ছ কারণে হঠাৎ নিয়ন্ত্রণহীন প্রচণ্ড ক্রোধ ও চিৎকার করা",
    severityWeight: 2,
  },
  {
    id: "prayer_reluctance",
    category: "mental",
    label: "ফরজ সালাত আদায়ে তীব্র বাধা ও অস্বাভাবিক গাফিলতি-অলসতা",
    severityWeight: 2,
  },
  {
    id: "isolation_fear",
    category: "mental",
    label: "একা থাকতে তীব্র ভয় পাওয়া অথবা সবসময় নিজেকে ঘরবন্দী করে রাখা",
    severityWeight: 1,
  },
  {
    id: "extreme_waswasah",
    category: "mental",
    label: "ঈমান, অযু-নামায বা পরিবার নিয়ে অনবরত কুৎসিত কুচিন্তা ও ওয়াসওয়াসা",
    severityWeight: 2,
  },

  // Physical
  {
    id: "medically_unexplained_pain",
    category: "physical",
    label: "ডাক্তারি পরীক্ষায় কোনো রোগ না পাওয়া সত্ত্বেও মাথা, কোমর বা ঘাড়ে তীব্র ব্যথা",
    severityWeight: 2,
  },
  {
    id: "body_heaviness",
    category: "physical",
    label: "বিশেষ করে কাঁধ, বুক ও শরীরে অস্বাভাবিক ভার অনুভব হওয়া",
    severityWeight: 2,
  },
  {
    id: "ruqyah_reaction",
    category: "physical",
    label: "রুকইয়াহ শোনার সময় প্রচণ্ড হাই তোলা, চোখ দিয়ে পানি পড়া, গা কাঁপা বা বমি ভাব",
    severityWeight: 3,
    hint: "রুকইয়াহ শোনার সময়ের শারীরিক প্রতিক্রিয়া সরাসরি প্রভাব নির্দেশ করে",
  },
  {
    id: "unexplained_bruises",
    category: "physical",
    label: "শরীরে কোনো আঘাত ছাড়াই হঠাৎ নীল বা কালশিটে দাগ দেখা যাওয়া",
    severityWeight: 2,
  },
  {
    id: "stomach_cramps",
    category: "physical",
    label: "পেটের ভেতর অস্বাভাবিক মোচড় বা স্থায়ী অস্বস্তি (খাওয়ানো জাদুর আলামত)",
    severityWeight: 2,
  },

  // Life
  {
    id: "marriage_blockage",
    category: "life",
    label: "উপযুক্ত প্রস্তাব আসা সত্ত্বেও শেষ মুহূর্তে অদ্ভুত কোনো কারণে বারবার বিয়ে ভেঙে যাওয়া",
    severityWeight: 2,
  },
  {
    id: "marital_hatred",
    category: "life",
    label: "স্বামী-স্ত্রীর একে অপরকে সহ্য করতে না পারা ও চেহারা দেখলে বিরক্ত লাগা",
    severityWeight: 2,
  },
  {
    id: "business_sudden_ruin",
    category: "life",
    label: "সব ঠিকঠাক থাকার পরেও হঠাৎ ব্যবসায় অদ্ভুত পতন ও ধারাবাহিক অচলাবস্থা",
    severityWeight: 2,
  },
];

export interface DiagnosisResult {
  categorySummary: string;
  severityLevel: "low" | "moderate" | "high";
  possibleCauses: string[];
  recommendations: string[];
  suggestedAyat: string[];
  suggestedDua: string[];
  whatsappMessage: string;
}

export function evaluateSymptoms(selectedIds: string[], userNote: string = ""): DiagnosisResult {
  const selected = SYMPTOMS_LIST.filter((s) => selectedIds.includes(s.id));
  const totalScore = selected.reduce((acc, curr) => acc + curr.severityWeight, 0);

  const hasHighReaction = selected.some((s) => s.id === "ruqyah_reaction" || s.id === "quran_discomfort");
  const hasSleepIssues = selected.some((s) => s.category === "sleep");
  const hasMaritalOrLife = selected.some((s) => s.category === "life");
  const hasPhysical = selected.some((s) => s.category === "physical");

  let severityLevel: "low" | "moderate" | "high" = "low";
  if (totalScore >= 7 || hasHighReaction) {
    severityLevel = "high";
  } else if (totalScore >= 4) {
    severityLevel = "moderate";
  }

  const possibleCauses: string[] = [];
  if (hasHighReaction) {
    possibleCauses.push("সিহর (জাদু) অথবা ক্ষতিকর জিনঘটিত আধ্যাত্মিক স্পর্শের সম্ভাবনা");
  }
  if (hasSleepIssues) {
    possibleCauses.push("বদনজর (Evil Eye) অথবা দুঃস্বপ্ন সৃষ্টিকারী শয়তানী ওয়াসওয়াসা");
  }
  if (hasMaritalOrLife) {
    possibleCauses.push("বিচ্ছেদ বা ক্ষতি সৃষ্টিকারী সিহরের প্রাথমিক আশঙ্কা");
  }
  if (hasPhysical && !hasHighReaction) {
    possibleCauses.push("শারীরিক ক্লান্তি, মানসিক চাপ বা সাধারণ শারীরিক অসুস্থতা (চিকিৎসক দেখানো জরুরি)");
  }

  if (possibleCauses.length === 0) {
    possibleCauses.push("সাধারণ মানসিক অস্থিরতা অথবা নিয়মিত মাসনুন আমলের ঘাটতি");
  }

  const recommendations: string[] = [
    "প্রতিদিন সকাল ও সন্ধ্যার মাসনুন হিফযের আযকার দৃঢ়তার সাথে পাঠ করুন।",
    "ঘুমানোর পূর্বে আয়াতুল কুরসী, সূরা ইখলাস, ফালাক ও নাস ৩ বার পড়ে সারা শরীরে ফুঁক দিন।",
    "ঘরে উচ্চস্বরে সূরা বাকারার তিলাওয়াত চালু রাখুন বা নিজে তিলাওয়াত করুন।",
    "প্রাথমিক সেলফ-রুকইয়াহ অডিও শুনুন এবং প্রতিক্রিয়া লক্ষ্য করুন।",
    "যেসব শারীরিক লক্ষণ রয়েছে, সেগুলোর জন্য রেজিস্টার্ড এমবিবিএস ডাক্তারের পরামর্শ নিন।",
  ];

  if (severityLevel === "high") {
    recommendations.unshift("লক্ষণগুলো গুরুতর হওয়ায় একজন অভিজ্ঞ শারঈ রাক্বীর সাথে সরাসরি পরামর্শ করা উত্তম।");
  }

  const suggestedAyat = [
    "সূরা আল-ফাতিহা (নিরাময়ের সূরা)",
    "সূরা আল-বাকারা: আয়াত ২৫৫ (আয়াতুল কুরসী)",
    "সূরা আল-বাকারা: আয়াত ১০২ (সিহর সংক্রান্ত)",
    "সূরা ইউনুস: আয়াত ৮১-৮২",
    "সূরা আল-ফালাক ও সূরা আন-নাস (কুল দুটি)",
  ];

  const suggestedDua = [
    "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي",
  ];

  // Build WhatsApp text
  const symptomsText = selected.map((s, idx) => `${idx + 1}. ${s.label}`).join("\n");
  const levelText =
    severityLevel === "high"
      ? "উচ্চ গুরুত্ব (তাত্ক্ষণিক শারঈ পরামর্শ বাঞ্ছনীয়)"
      : severityLevel === "moderate"
      ? "মাঝারি (সেলফ রুকইয়াহ ও নিয়মিত পর্যবেক্ষণ)"
      : "সাধারণ (সকাল-সন্ধ্যার হিফযের আমল)";

  const rawMessage = `আসসালামু আলাইকুম রাহমাতুল্লাহ।
আমি সুন্নাহলাইফ (Sunnah Life Care) ওয়েবসাইট থেকে সেলফ-ডায়াগনোসিস / লক্ষণ পরীক্ষা করেছি।

[আমার লক্ষণসমূহ - ${selected.length}টি চিহ্নিত]:
${symptomsText || "কোনো সুনির্দিষ্ট লক্ষণ টিক দেওয়া হয়নি"}
${userNote ? `\n[অতিরিক্ত বিবরণ]: ${userNote}` : ""}

[সম্ভাব্য অবস্থা]: ${possibleCauses.join(", ")}
[লক্ষণ পর্যায়]: ${levelText}

আমি কুরআন ও সুন্নাহ সম্মত শারঈ রুকইয়াহর পরামর্শ ও দিকনির্দেশনা পাওয়ার জন্য আপনার সহায়তা চাচ্ছি।`;

  return {
    categorySummary: possibleCauses.join(" • "),
    severityLevel,
    possibleCauses,
    recommendations,
    suggestedAyat,
    suggestedDua,
    whatsappMessage: encodeURIComponent(rawMessage),
  };
}
