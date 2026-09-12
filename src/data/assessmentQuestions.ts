export interface QuestionOption {
  label: string;
  points: number;
  indicator?: "evil_eye" | "sihr" | "jinn" | "waswasah" | "none";
}

export interface AssessmentQuestion {
  id: string;
  step: number;
  category: "worship" | "sleep" | "physical" | "ruqyah_reaction" | "life";
  categoryTitle: string;
  question: string;
  subtitle?: string;
  options: QuestionOption[];
}

export const ASSESSMENT_STEPS = [
  { step: 1, title: "ইবাদত ও মানসিক অবস্থা", short: "ইবাদত ও মন" },
  { step: 2, title: "ঘুম ও দুঃস্বপ্ন সংক্রান্ত", short: "ঘুম ও স্বপ্ন" },
  { step: 3, title: "শারীরিক অস্পষ্ট লক্ষণ", short: "শারীরিক লক্ষণ" },
  { step: 4, title: "রুকইয়াহ শ্রবণে প্রতিক্রিয়া", short: "রুকইয়াহ প্রতিক্রিয়া" },
  { step: 5, title: "পারিবারিক ও জীবন সংকট", short: "পারিবারিক জীবন" },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Step 1: ইবাদত ও মনের অবস্থা (Questions 1 - 3)
  {
    id: "q1",
    step: 1,
    category: "worship",
    categoryTitle: "ইবাদত ও মনের অবস্থা",
    question: "কুরআন তিলাওয়াত, আযান বা আল্লাহর যিকির শুনলে আপনার মনের অনুভূতি কেমন হয়?",
    subtitle: "কুরআনের সুর বা যিকিরের প্রতি আপনার তাৎক্ষণিক প্রতিক্রিয়া কেমন?",
    options: [
      { label: "স্বাভাবিক ও মনের মধ্যে গভীর প্রশান্তি অনুভব করি", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে কিছুটা অস্থিরতা বা অনিচ্ছা লাগে", points: 1, indicator: "waswasah" },
      { label: "তীব্র রাগ, বিরক্তি, বুক ধড়ফড় বা কুরআন বন্ধ করার তীব্র তাড়না জাগে", points: 3, indicator: "jinn" },
    ],
  },
  {
    id: "q2",
    step: 1,
    category: "worship",
    categoryTitle: "ইবাদত ও মনের অবস্থা",
    question: "দৈনিক পাঁচ ওয়াক্ত ফরজ সালাত আদায়ের ক্ষেত্রে আপনার অবস্থা কেমন?",
    subtitle: "সালাতে দাঁড়াতে বা আদায় করতে কি অস্বাভাবিক কোনো বাধা অনুভব করেন?",
    options: [
      { label: "আলহামদুলিল্লাহ, যথাসময়ে সালাত আদায় করার চেষ্টা করি", points: 0, indicator: "none" },
      { label: "অলসতা বা কাজের ব্যস্ততায় মাঝে মাঝে দেরি হয়ে যায়", points: 1, indicator: "waswasah" },
      { label: "সালাতের কথা উঠলেই শরীরে প্রচণ্ড ভার লাগে, তীব্র অনীহা ও শারীরিক বাধা বোধ হয়", points: 3, indicator: "sihr" },
    ],
  },
  {
    id: "q3",
    step: 1,
    category: "worship",
    categoryTitle: "ইবাদত ও মনের অবস্থা",
    question: "অযু, নামায বা ঈমান নিয়ে মনের ভেতর অতিরিক্ত সন্দেহ ও কুচিন্তা (ওয়াসওয়াসা) হয় কি?",
    subtitle: "অনিচ্ছাকৃত সন্দেহ যা আপনার স্বাভাবিক জীবনকে ব্যাহত করে",
    options: [
      { label: "না, সাধারণ মানুষের মতোই স্বাভাবিক", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে অযু ভাঙল কিনা সন্দেহ জাগে", points: 1, indicator: "waswasah" },
      { label: "অযু করতে দীর্ঘ সময় লাগে, তাকবীরে সন্দেহ হয়, অনবরত অবাধ্য কুৎসিত চিন্তা মাথায় আসে", points: 3, indicator: "waswasah" },
    ],
  },

  // Step 2: ঘুম ও দুঃস্বপ্ন (Questions 4 - 6)
  {
    id: "q4",
    step: 2,
    category: "sleep",
    categoryTitle: "ঘুম ও দুঃস্বপ্ন সংক্রান্ত",
    question: "ঘুমের মধ্যে আপনি কি প্রায়ই ভীতিজনক বা অপবিত্র কোনো স্বপ্ন দেখেন?",
    subtitle: "স্বপ্নে প্রাণী, কবরস্থান বা পতনের দৃশ্য বারবার দেখা",
    options: [
      { label: "না, সচরাচর স্বপ্ন দেখি না বা স্বাভাবিক ভালো স্বপ্ন দেখি", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে উঁচু স্থান থেকে নিচে পড়ে যাওয়া বা পানিতে ডোবার অনুভূতি", points: 1, indicator: "evil_eye" },
      { label: "নিয়মিত কালো কুকুর, সাপ, বিড়াল, কবরস্থান, নর্দমা বা হিংস্র প্রাণীর তাড়া খাওয়ার স্বপ্ন", points: 3, indicator: "sihr" },
    ],
  },
  {
    id: "q5",
    step: 2,
    category: "sleep",
    categoryTitle: "ঘুম ও দুঃস্বপ্ন সংক্রান্ত",
    question: "ঘুমের ঘোরে বোবায় ধরা (নড়াচড়া করতে না পারা বা দম বন্ধ হওয়া) অভিজ্ঞতা হয় কি?",
    subtitle: "জাগ্রত হওয়ার উপক্রম কিন্তু শরীর সম্পূর্ণ অবশ হয়ে থাকা",
    options: [
      { label: "কখনো এমন অভিজ্ঞতা হয়নি", points: 0, indicator: "none" },
      { label: "বছরে বা কয়েক মাসে হয়তো দু-একবার এমন হয়", points: 1, indicator: "evil_eye" },
      { label: "প্রায়ই বোবায় ধরে, বুকের ওপর ভারী কিছু চেপে থাকার তীব্র শ্বাসরোধের অনুভূতি হয়", points: 3, indicator: "jinn" },
    ],
  },
  {
    id: "q6",
    step: 2,
    category: "sleep",
    categoryTitle: "ঘুম ও দুঃস্বপ্ন সংক্রান্ত",
    question: "রাতের ঘুমের মান এবং ঘুম থেকে ওঠার পর শারীরিক অনুভূতি কেমন থাকে?",
    subtitle: "ঘুম কি পূর্ণ বিশ্রাম দেয় নাকি অবসন্নতা বাড়ায়?",
    options: [
      { label: "শান্তিময় ঘুম হয় এবং সকালে সতেজ জেগে উঠি", points: 0, indicator: "none" },
      { label: "সহজে ঘুম আসতে চায় না, সামান্য শব্দেই ঘুম ভেঙে যায়", points: 1, indicator: "waswasah" },
      { label: "ঘুমের মধ্যে আতঙ্কে চিৎকার করে বা বুক ধড়ফড় করে উঠি, ঘুম ভাঙলেও শরীর চরম ক্লান্ত ও নিস্তেজ লাগে", points: 2, indicator: "evil_eye" },
    ],
  },

  // Step 3: শারীরিক অস্পষ্ট লক্ষণ (Questions 7 - 9)
  {
    id: "q7",
    step: 3,
    category: "physical",
    categoryTitle: "শারীরিক অস্পষ্ট লক্ষণ",
    question: "আপনার কি দীর্ঘমেয়াদী মাথা, ঘাড় বা কোমর ব্যথা আছে যা ডাক্তারি ওষুধে উপশম হয় না?",
    subtitle: "মেডিকেল টেস্ট ও রিপোর্ট স্বাভাবিক অথচ শারীরিক যন্ত্রণা বিদ্যমান",
    options: [
      { label: "না, এমন কোনো দীর্ঘমেয়াদী অস্বাভাবিক ব্যথা নেই", points: 0, indicator: "none" },
      { label: "কাজের চাপে বা ক্লান্তিতে সাধারণ ব্যথা হয়", points: 1, indicator: "none" },
      { label: "দীর্ঘমেয়াদী তীব্র মাথা, ঘাড় বা পিঠের ব্যথা কিন্তু ডাক্তারের সব টেস্টে রোগ ধরা পড়ে না", points: 3, indicator: "evil_eye" },
    ],
  },
  {
    id: "q8",
    step: 3,
    category: "physical",
    categoryTitle: "শারীরিক অস্পষ্ট লক্ষণ",
    question: "শরীরের বিশেষ কোনো অংশে হঠাৎ অস্বাভাবিক ভার অথবা উত্তাপ/শৈত্য অনুভূত হয় কি?",
    subtitle: "শরীরের ভারসাম্য ও তাপমাত্রার আকস্মিক অনুভূতি",
    options: [
      { label: "না, শরীরের তাপমাত্রা ও অনুভূতি স্বাভাবিক", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে কাজের শেষে শরীরে হালকা ক্লান্তি লাগে", points: 1, indicator: "none" },
      { label: "বিশেষ করে দুই কাঁধ, বুক বা মাথার পেছনের অংশে ভারী পাথর চেপে থাকার মতো ভার ও উত্তাপ অনুভূত হয়", points: 2, indicator: "evil_eye" },
    ],
  },
  {
    id: "q9",
    step: 3,
    category: "physical",
    categoryTitle: "শারীরিক অস্পষ্ট লক্ষণ",
    question: "শরীরে কোনো প্রকার আঘাত বা বাহ্যিক কারণ ছাড়াই হঠাৎ নীল বা কালশিটে দাগ দেখা যায় কি?",
    subtitle: "ঘুম থেকে উঠে শরীরে অজ্ঞাত দাগ লক্ষ্য করা",
    options: [
      { label: "কখনো এমন দাগ দেখিনি", points: 0, indicator: "none" },
      { label: "খুব বিরল, হয়তো অসাবধানতায় হালকা আঘাত লেগেছিল", points: 1, indicator: "none" },
      { label: "হ্যাঁ, উরু, বাহু বা পিঠে কোনো কারণ বা আঘাত ছাড়াই আকস্মিক নীলচে বা কালশিটে দাগ স্পষ্ট দেখা যায়", points: 3, indicator: "jinn" },
    ],
  },

  // Step 4: রুকইয়াহ শ্রবণে প্রতিক্রিয়া (Questions 10 - 12)
  {
    id: "q10",
    step: 4,
    category: "ruqyah_reaction",
    categoryTitle: "রুকইয়াহ শ্রবণে প্রতিক্রিয়া",
    question: "মনোযোগ সহকারে রুকইয়াহ তিলাওয়াত বা আয়াতুল কুরসী শুনলে আপনার শারীরিক প্রতিক্রিয়া কী হয়?",
    subtitle: "রুকইয়াহ চলাকালীন সময়ে শরীরের অভ্যন্তরীণ পরিবর্তন",
    options: [
      { label: "কোনো অস্বস্তি হয় না, বরং মনে গভীর আধ্যাত্মিক শান্তি লাগে", points: 0, indicator: "none" },
      { label: "কিছুটা তন্দ্রাচ্ছন্ন লাগে বা মৃদু দুই-একবার হাই ওঠে", points: 1, indicator: "evil_eye" },
      { label: "একনাগাড়ে অতিরিক্ত গভীর হাই ওঠা, চোখ দিয়ে পানি পড়া, গা কাঁপুনি, বমি বমি ভাব বা দম আটকে আসা", points: 3, indicator: "sihr" },
    ],
  },
  {
    id: "q11",
    step: 4,
    category: "ruqyah_reaction",
    categoryTitle: "রুকইয়াহ শ্রবণে প্রতিক্রিয়া",
    question: "তিলাওয়াতের সময় হাত-পা বা শরীরের পেশীতে কোনো অনিচ্ছাকৃত ঝাঁকুনি বা স্পন্দন হয় কি?",
    subtitle: "অঙ্গ-প্রত্যঙ্গে অনৈচ্ছিক অনুভূতি",
    options: [
      { label: "না, শরীর শান্ত ও স্থির থাকে", points: 0, indicator: "none" },
      { label: "সামান্য শিরশির বা লোম খাড়া হওয়ার অনুভূতি হয়", points: 1, indicator: "evil_eye" },
      { label: "হাত-পায়ের আঙুল হঠাৎ বেঁকে যাওয়া, ঝাঁকুনি দেওয়া বা পেশীতে অস্বাভাবিক কম্পন সৃষ্টি হয়", points: 3, indicator: "jinn" },
    ],
  },
  {
    id: "q12",
    step: 4,
    category: "ruqyah_reaction",
    categoryTitle: "রুকইয়াহ শ্রবণে প্রতিক্রিয়া",
    question: "পেটের ভেতর অস্বাভাবিক মোচড়, তীব্র গ্যাস বা নাভির আশেপাশে স্থায়ী অস্বস্তি আছে কি?",
    subtitle: "খাওয়ানো বা পান করানো জাদুর (সিহর মাশবুব) সাধারণ আলামত",
    options: [
      { label: "না, পেট ও পরিপাকতন্ত্র স্বাভাবিক", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে সাধারণ খাদ্যাভ্যাসের বদহজম হয়", points: 1, indicator: "none" },
      { label: "ডাক্তারের ওষুধেও নাভির চারপাশে অদ্ভুত মোচড়, খিঁচুনি বা পেটের স্থায়ী অস্বস্তি দূর হয় না", points: 3, indicator: "sihr" },
    ],
  },

  // Step 5: পরিবার ও জীবন সংকট (Questions 13 - 15)
  {
    id: "q13",
    step: 5,
    category: "life",
    categoryTitle: "পারিবারিক ও জীবন সংকট",
    question: "স্বামী-স্ত্রী বা পরিবারের সদস্যদের মাঝে সম্পর্কের বর্তমান অবস্থা কেমন?",
    subtitle: "দাম্পত্য জীবনে অহেতুক ঘৃণা বা বিচ্ছেদের তাড়না",
    options: [
      { label: "আলহামদুলিল্লাহ, স্বাভাবিক ভালোবাসা ও পারস্পরিক বোঝাপড়া বিদ্যমান", points: 0, indicator: "none" },
      { label: "স্বাভাবিক সাংসারিক মান-অভিমান হয়, যা আলোচনার মাধ্যমে দ্রুত ঠিক হয়ে যায়", points: 1, indicator: "waswasah" },
      { label: "কোনো কারণ ছাড়াই হঠাৎ একে অপরের চেহারা দেখলে তীব্র ঘৃণা, অস্বাভাবিক রাগ ও বিচ্ছেদের উদগ্র আকাঙ্ক্ষা", points: 3, indicator: "sihr" },
    ],
  },
  {
    id: "q14",
    step: 5,
    category: "life",
    categoryTitle: "পারিবারিক ও জীবন সংকট",
    question: "বিয়ে বা ক্যারিয়ারে কোনো অদ্ভুত ধারাবাহিক বাধা বা অস্বাভাবিক অচলাবস্থা আছে কি?",
    subtitle: "সিহরুত তা'তীল (বিয়ের বাধার সিহর) ও ঈর্ষার কুপ্রভাব",
    options: [
      { label: "না, সবকিছু স্বাভাবিক গতিতে অগ্রসর হচ্ছে", points: 0, indicator: "none" },
      { label: "জীবনের সাধারণ উত্থান-পতন ও ক্যারিয়ার চ্যালেঞ্জ রয়েছে", points: 1, indicator: "none" },
      { label: "বিয়ের প্রস্তাব সবকিছু চূড়ান্ত হওয়ার পরও বারবার শেষ মুহূর্তে কোনো কারণ ছাড়াই ভেঙে যায় / ভালো চলা ব্যবসায় আকস্মিক ধারাবাহিক ধস", points: 3, indicator: "sihr" },
    ],
  },
  {
    id: "q15",
    step: 5,
    category: "life",
    categoryTitle: "পারিবারিক ও জীবন সংকট",
    question: "মেজাজ ও মানসিক আচরণের আকস্মিক পরিবর্তন নিয়ে আপনার অনুভূতি কী?",
    subtitle: "নিজের ওপর নিয়ন্ত্রণ হারানো ও অহেতুক একা থাকার প্রবণতা",
    options: [
      { label: "মানসিক অবস্থা যথেষ্ট শান্ত, সুস্থির ও সামাজিক", points: 0, indicator: "none" },
      { label: "মাঝে মাঝে কাজের চাপে সাময়িক মেজাজ খিটখিটে হয়", points: 1, indicator: "waswasah" },
      { label: "তুচ্ছ কারণে হঠাৎ নিয়ন্ত্রণহীন প্রচণ্ড ক্রোধ, চিৎকার বা ভাঙচুরের ভাব জাগে এবং নিজেকে সমাজ থেকে সম্পূর্ণ বিচ্ছিন্ন করে রাখতে ইচ্ছা করে", points: 2, indicator: "jinn" },
    ],
  },
];

export interface ComprehensiveResult {
  totalScore: number;
  maxScore: number;
  severityLevel: "mild" | "moderate" | "severe";
  severityLabel: string;
  evilEyeScore: number; // percentage
  sihrScore: number;    // percentage
  jinnScore: number;    // percentage
  waswasahScore: number;// percentage
  primarySuspicions: string[];
  actionSteps: string[];
  recommendedSurahs: string[];
  recommendedDuas: string[];
  whatsappMessage: string;
}

export function evaluateComprehensiveAssessment(
  answers: Record<string, number>,
  userNote: string = ""
): ComprehensiveResult {
  let totalScore = 0;
  let evilEyePoints = 0;
  let sihrPoints = 0;
  let jinnPoints = 0;
  let waswasahPoints = 0;

  const maxEvilEyePoints = 12;
  const maxSihrPoints = 15;
  const maxJinnPoints = 14;
  const maxWaswasahPoints = 8;
  const maxTotalScore = 45;

  const markedIssues: string[] = [];

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const selectedOptionIdx = answers[q.id];
    if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx]) {
      const opt = q.options[selectedOptionIdx];
      totalScore += opt.points;

      if (opt.points >= 2) {
        markedIssues.push(q.question);
      }

      if (opt.indicator === "evil_eye") evilEyePoints += opt.points;
      if (opt.indicator === "sihr") sihrPoints += opt.points;
      if (opt.indicator === "jinn") jinnPoints += opt.points;
      if (opt.indicator === "waswasah") waswasahPoints += opt.points;
    }
  });

  const evilEyeScore = Math.min(100, Math.round((evilEyePoints / maxEvilEyePoints) * 100));
  const sihrScore = Math.min(100, Math.round((sihrPoints / maxSihrPoints) * 100));
  const jinnScore = Math.min(100, Math.round((jinnPoints / maxJinnPoints) * 100));
  const waswasahScore = Math.min(100, Math.round((waswasahPoints / maxWaswasahPoints) * 100));

  let severityLevel: "mild" | "moderate" | "severe" = "mild";
  let severityLabel = "মৃদু লক্ষণ (প্রাথমিক হিফয ও সতর্কতা)";

  if (totalScore >= 18 || sihrScore >= 60 || jinnScore >= 60) {
    severityLevel = "severe";
    severityLabel = "উচ্চ তীব্রতা (শারঈ রাক্বীর প্রত্যক্ষ পরামর্শ বাঞ্ছনীয়)";
  } else if (totalScore >= 8 || evilEyeScore >= 40 || waswasahScore >= 50) {
    severityLevel = "moderate";
    severityLabel = "মাঝারি লক্ষণ (সেলফ-রুকইয়াহ ও নিয়মিত আমল আবশ্যক)";
  }

  const primarySuspicions: string[] = [];
  if (evilEyeScore >= 40) {
    primarySuspicions.push(`বদনজর ও হিংসার প্রভাব (${evilEyeScore}%)`);
  }
  if (sihrScore >= 45) {
    primarySuspicions.push(`সিহর বা জাদুটোনার তীব্র আশঙ্কা (${sihrScore}%)`);
  }
  if (jinnScore >= 45) {
    primarySuspicions.push(`ক্ষতিকর জিন বা আধ্যাত্মিক স্পর্শের লক্ষণ (${jinnScore}%)`);
  }
  if (waswasahScore >= 40) {
    primarySuspicions.push(`শয়তানী ওয়াসওয়াসা ও মানসিক অবসাদ (${waswasahScore}%)`);
  }

  if (primarySuspicions.length === 0) {
    primarySuspicions.push("সাধারণ মানসিক ক্লান্তি বা নিয়মিত সুন্নাহ আমলের ঘাটতি");
  }

  const actionSteps: string[] = [
    "প্রতিদিন সকাল ও সন্ধ্যায় মাসনুন হিফযের আযকার দৃঢ়তার সাথে পাঠ করুন।",
    "রাতে ঘুমানোর পূর্বে আয়াতুল কুরসী, ৩ কুল পাঠ করে সারা শরীরে হাত বুলিয়ে ঘুমান।",
    "ঘরে উচ্চৈঃস্বরে সূরা আল-বাকারার তিলাওয়াত করুন বা অডিও চালু রাখুন।",
    "শারীরিক ব্যথার জন্য অবশ্যই একজন এমবিবিএস বিশেষজ্ঞ চিকিৎসকের পরীক্ষা ও পরামর্শ নিন।",
  ];

  if (severityLevel === "severe") {
    actionSteps.unshift("লক্ষণগুলোর তীব্রতা বেশি হওয়ায় সুন্নাহলাইফের অভিজ্ঞ শারঈ রাক্বীর সাথে সরাসরি অনলাইন বা চেম্বার সেশনের অ্যাপয়েন্টমেন্ট নিন।");
  } else if (severityLevel === "moderate") {
    actionSteps.unshift("ধারাবাহিকভাবে ২১ দিন সেলফ-রুকইয়াহ পানি ও তেল ব্যবহার করার আমল শুরু করুন।");
  }

  const recommendedSurahs = [
    "সূরা আল-ফাতিহা (৭ বার)",
    "সূরা আল-বাকারা: আয়াত ২৫৫ (আয়াতুল কুরসী) ও শেষ দুই আয়াত (২৮৫-২৮৬)",
    "সূরা আল-বাকারা: আয়াত ১০২ (সিহর প্রতিরোধে)",
    "সূরা আল-ইখলাস, আল-ফালাক ও আন-নাস (৩ বার করে)",
    "সূরা আল-আ'রাফ (১১৭-১২২) ও সূরা ইউনুস (৮১-৮২)",
  ];

  const recommendedDuas = [
    "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
  ];

  // WhatsApp formatted string
  const rawMessage = `আসসালামু আলাইকুম রাহমাতুল্লাহ।
আমি সুন্নাহলাইফ (Sunnah Life Care) প্ল্যাটফর্ম থেকে ১৫টি প্রশ্নের পূর্ণাঙ্গ লক্ষণ স্ব-নিরীক্ষণ (Self Assessment) সম্পন্ন করেছি।

[আমার পরীক্ষার ফলাফল]:
• সার্বিক পর্যায়: ${severityLabel}
• প্রাপ্ত মোট পয়েন্ট: ${totalScore} / ${maxTotalScore}

[চিহ্নিত সম্ভাব্য কারণ ও মাত্রা]:
${primarySuspicions.map((p) => `• ${p}`).join("\n")}

[তীব্র সমস্যা হিসেবে চিহ্নিত লক্ষণসমূহ]:
${markedIssues.length > 0 ? markedIssues.map((m, idx) => `${idx + 1}. ${m}`).join("\n") : "• বিশেষ কোনো তীব্র লক্ষণ নেই"}
${userNote ? `\n[ব্যক্তিগত মন্তব্য/বিবরণ]:\n${userNote}` : ""}

কুরআন ও সহীহ সুন্নাহর আলোকে পরামর্শ ও উপযুক্ত রুকইয়াহ নির্দেশনার জন্য আমি সুন্নাহলাইফের শারঈ রাক্বীর পরামর্শ চাচ্ছি।`;

  return {
    totalScore,
    maxScore: maxTotalScore,
    severityLevel,
    severityLabel,
    evilEyeScore,
    sihrScore,
    jinnScore,
    waswasahScore,
    primarySuspicions,
    actionSteps,
    recommendedSurahs,
    recommendedDuas,
    whatsappMessage: encodeURIComponent(rawMessage),
  };
}
