// বাংলাদেশী ১৫ লাইনের কালার কোডেড হাফেজী কুরআন ডেটাসেট
// ৩০ পারা এবং ১১৪ সূরার পৃষ্ঠা ম্যাপিং (পৃষ্ঠা ২ থেকে ৬১১)

export interface HafiziPara {
  number: number;
  nameBangla: string;
  nameArabic: string;
  startPage: number;
  endPage: number;
}

export interface HafiziSurah {
  number: number;
  nameBangla: string;
  nameArabic: string;
  nameEnglish: string;
  ayahCount: number;
  revelationType: "মাক্কী" | "মাদানী";
  startPage: number;
}

export const MIN_HAFIZI_PAGE = 2;
export const MAX_HAFIZI_PAGE = 611;

export const HAFIZI_PARAS: HafiziPara[] = [
  {
    "number": 1,
    "nameBangla": "আলিফ-লাম-মীম",
    "nameArabic": "الم",
    "startPage": 2,
    "endPage": 22
  },
  {
    "number": 2,
    "nameBangla": "সাইয়াকূল",
    "nameArabic": "سَيَقُولُ",
    "startPage": 23,
    "endPage": 42
  },
  {
    "number": 3,
    "nameBangla": "তিলকার রুসুল",
    "nameArabic": "تِلْكَ الرُّسُلُ",
    "startPage": 43,
    "endPage": 62
  },
  {
    "number": 4,
    "nameBangla": "লান তানালূ",
    "nameArabic": "لَنْ تَنَالُوا",
    "startPage": 63,
    "endPage": 82
  },
  {
    "number": 5,
    "nameBangla": "ওয়াল মুহসানাত",
    "nameArabic": "وَالْمُحْصَنَاتُ",
    "startPage": 83,
    "endPage": 102
  },
  {
    "number": 6,
    "nameBangla": "লা ইউহিব্বুল্লাহ",
    "nameArabic": "لَا يُحِبُّ اللَّهُ",
    "startPage": 103,
    "endPage": 122
  },
  {
    "number": 7,
    "nameBangla": "ওয়া ইজা সামিউ",
    "nameArabic": "وَإِذَا سَمِعُوا",
    "startPage": 123,
    "endPage": 142
  },
  {
    "number": 8,
    "nameBangla": "ওয়া লাও আন্নানা",
    "nameArabic": "وَلَوْ أَنَّنَا",
    "startPage": 143,
    "endPage": 162
  },
  {
    "number": 9,
    "nameBangla": "ক্বলাল মালাউ",
    "nameArabic": "قَالَ الْمَلَأُ",
    "startPage": 163,
    "endPage": 182
  },
  {
    "number": 10,
    "nameBangla": "ওয়া'লামূ",
    "nameArabic": "وَاعْلَمُوا",
    "startPage": 183,
    "endPage": 202
  },
  {
    "number": 11,
    "nameBangla": "ইয়া'তাযিরূন",
    "nameArabic": "يَعْتَذِرُونَ",
    "startPage": 203,
    "endPage": 222
  },
  {
    "number": 12,
    "nameBangla": "ওয়া মা মিন দা-ব্বাহ",
    "nameArabic": "وَمَا مِنْ دَابَّةٍ",
    "startPage": 223,
    "endPage": 242
  },
  {
    "number": 13,
    "nameBangla": "ওয়া মা উবাররিউ",
    "nameArabic": "وَمَا أُبَرِّئُ",
    "startPage": 243,
    "endPage": 262
  },
  {
    "number": 14,
    "nameBangla": "রুবামা",
    "nameArabic": "رُبَمَا",
    "startPage": 263,
    "endPage": 282
  },
  {
    "number": 15,
    "nameBangla": "সুবহানাল্লাজী",
    "nameArabic": "سُبْحَانَ الَّذِي",
    "startPage": 283,
    "endPage": 302
  },
  {
    "number": 16,
    "nameBangla": "ক্বলা আলাম",
    "nameArabic": "قَالَ أَلَمْ",
    "startPage": 303,
    "endPage": 322
  },
  {
    "number": 17,
    "nameBangla": "ইক্বতারা বা লিন্নাস",
    "nameArabic": "اقْتَرَبَ لِلنَّاسِ",
    "startPage": 323,
    "endPage": 342
  },
  {
    "number": 18,
    "nameBangla": "ক্বদ আফলাহা",
    "nameArabic": "قَدْ أَفْلَحَ",
    "startPage": 343,
    "endPage": 362
  },
  {
    "number": 19,
    "nameBangla": "ওয়া ক্বলাল্লাযীনা",
    "nameArabic": "وَقَالَ الَّذِينَ",
    "startPage": 363,
    "endPage": 382
  },
  {
    "number": 20,
    "nameBangla": "আম্মান খালাক্বা",
    "nameArabic": "أَمَّنْ خَلَقَ",
    "startPage": 383,
    "endPage": 402
  },
  {
    "number": 21,
    "nameBangla": "উতলু মা ঊহিয়া",
    "nameArabic": "اتْلُ مَا أُوحِيَ",
    "startPage": 403,
    "endPage": 422
  },
  {
    "number": 22,
    "nameBangla": "ওয়া মাইঁ ইয়াক্বনুত",
    "nameArabic": "وَمَنْ يَّقْنُتْ",
    "startPage": 423,
    "endPage": 442
  },
  {
    "number": 23,
    "nameBangla": "ওয়ামা লিয়া",
    "nameArabic": "وَمَا লِيَ",
    "startPage": 443,
    "endPage": 462
  },
  {
    "number": 24,
    "nameBangla": "ফামান আজলামু",
    "nameArabic": "فَمَنْ أَظْلَمُ",
    "startPage": 463,
    "endPage": 482
  },
  {
    "number": 25,
    "nameBangla": "ইলাইহি ইউরাদ্দু",
    "nameArabic": "إِلَيْهِ يُرَدُّ",
    "startPage": 483,
    "endPage": 502
  },
  {
    "number": 26,
    "nameBangla": "হা-মীম",
    "nameArabic": "حم",
    "startPage": 503,
    "endPage": 522
  },
  {
    "number": 27,
    "nameBangla": "ক্বলা ফামা খতবুকুম",
    "nameArabic": "قَالَ فَمَا خَطْبُكُمْ",
    "startPage": 523,
    "endPage": 542
  },
  {
    "number": 28,
    "nameBangla": "ক্বদ সামিআল্লাহু",
    "nameArabic": "قَدْ سَمِعَ اللَّهُ",
    "startPage": 543,
    "endPage": 562
  },
  {
    "number": 29,
    "nameBangla": "তাবারাকাল্লাজী",
    "nameArabic": "تَبَارَكَ الَّذِي",
    "startPage": 563,
    "endPage": 586
  },
  {
    "number": 30,
    "nameBangla": "আম্মা ইয়াতাসা-আলূন",
    "nameArabic": "عَمَّ يَتَسَاءَلُونَ",
    "startPage": 587,
    "endPage": 611
  }
];

export const HAFIZI_SURAHS: HafiziSurah[] = [
  {
    "number": 1,
    "nameBangla": "আল-ফাতিহা",
    "nameArabic": "سُورَةُ ٱلْفَاتِحَةِ",
    "nameEnglish": "Al-Faatiha",
    "ayahCount": 7,
    "revelationType": "মাক্কী",
    "startPage": 2
  },
  {
    "number": 2,
    "nameBangla": "আল-বাকারা",
    "nameArabic": "سُورَةُ البَقَرَةِ",
    "nameEnglish": "Al-Baqara",
    "ayahCount": 286,
    "revelationType": "মাদানী",
    "startPage": 3
  },
  {
    "number": 3,
    "nameBangla": "আলে ইমরান",
    "nameArabic": "سُورَةُ آلِ عِمۡرَانَ",
    "nameEnglish": "Aal-i-Imraan",
    "ayahCount": 200,
    "revelationType": "মাদানী",
    "startPage": 51
  },
  {
    "number": 4,
    "nameBangla": "আন-নিসা",
    "nameArabic": "سُورَةُ النِّسَاءِ",
    "nameEnglish": "An-Nisaa",
    "ayahCount": 176,
    "revelationType": "মাদানী",
    "startPage": 78
  },
  {
    "number": 5,
    "nameBangla": "আল-মায়েদা",
    "nameArabic": "سُورَةُ المَائـِدَةِ",
    "nameEnglish": "Al-Maaida",
    "ayahCount": 120,
    "revelationType": "মাদানী",
    "startPage": 107
  },
  {
    "number": 6,
    "nameBangla": "আল-আনআম",
    "nameArabic": "سُورَةُ الأَنۡعَامِ",
    "nameEnglish": "Al-An'aam",
    "ayahCount": 165,
    "revelationType": "মাক্কী",
    "startPage": 129
  },
  {
    "number": 7,
    "nameBangla": "আল-আরাফ",
    "nameArabic": "سُورَةُ الأَعۡرَافِ",
    "nameEnglish": "Al-A'raaf",
    "ayahCount": 206,
    "revelationType": "মাক্কী",
    "startPage": 152
  },
  {
    "number": 8,
    "nameBangla": "আল-আনফাল",
    "nameArabic": "سُورَةُ الأَنفَالِ",
    "nameEnglish": "Al-Anfaal",
    "ayahCount": 75,
    "revelationType": "মাদানী",
    "startPage": 178
  },
  {
    "number": 9,
    "nameBangla": "আত-তাওবাহ",
    "nameArabic": "سُورَةُ التَّوۡبَةِ",
    "nameEnglish": "At-Tawba",
    "ayahCount": 129,
    "revelationType": "মাদানী",
    "startPage": 188
  },
  {
    "number": 10,
    "nameBangla": "ইউনুস",
    "nameArabic": "سُورَةُ يُونُسَ",
    "nameEnglish": "Yunus",
    "ayahCount": 109,
    "revelationType": "মাক্কী",
    "startPage": 209
  },
  {
    "number": 11,
    "nameBangla": "হুদ",
    "nameArabic": "سُورَةُ هُودٍ",
    "nameEnglish": "Hud",
    "ayahCount": 123,
    "revelationType": "মাক্কী",
    "startPage": 222
  },
  {
    "number": 12,
    "nameBangla": "ইউসুফ",
    "nameArabic": "سُورَةُ يُوسُفَ",
    "nameEnglish": "Yusuf",
    "ayahCount": 111,
    "revelationType": "মাক্কী",
    "startPage": 236
  },
  {
    "number": 13,
    "nameBangla": "আর-রাদ",
    "nameArabic": "سُورَةُ الرَّعۡدِ",
    "nameEnglish": "Ar-Ra'd",
    "ayahCount": 43,
    "revelationType": "মাদানী",
    "startPage": 250
  },
  {
    "number": 14,
    "nameBangla": "ইবরাহিম",
    "nameArabic": "سُورَةُ إِبۡرَاهِيمَ",
    "nameEnglish": "Ibrahim",
    "ayahCount": 52,
    "revelationType": "মাক্কী",
    "startPage": 256
  },
  {
    "number": 15,
    "nameBangla": "আল-হিজর",
    "nameArabic": "سُورَةُ الحِجۡرِ",
    "nameEnglish": "Al-Hijr",
    "ayahCount": 99,
    "revelationType": "মাক্কী",
    "startPage": 262
  },
  {
    "number": 16,
    "nameBangla": "আন-নাহল",
    "nameArabic": "سُورَةُ النَّحۡلِ",
    "nameEnglish": "An-Nahl",
    "ayahCount": 128,
    "revelationType": "মাক্কী",
    "startPage": 268
  },
  {
    "number": 17,
    "nameBangla": "আল-ইসরা",
    "nameArabic": "سُورَةُ الإِسۡرَاءِ",
    "nameEnglish": "Al-Israa",
    "ayahCount": 111,
    "revelationType": "মাক্কী",
    "startPage": 283
  },
  {
    "number": 18,
    "nameBangla": "আল-কাহফ",
    "nameArabic": "سُورَةُ الكَهۡفِ",
    "nameEnglish": "Al-Kahf",
    "ayahCount": 110,
    "revelationType": "মাক্কী",
    "startPage": 294
  },
  {
    "number": 19,
    "nameBangla": "মারইয়াম",
    "nameArabic": "سُورَةُ مَرۡيَمَ",
    "nameEnglish": "Maryam",
    "ayahCount": 98,
    "revelationType": "মাক্কী",
    "startPage": 306
  },
  {
    "number": 20,
    "nameBangla": "ত্বা-হা",
    "nameArabic": "سُورَةُ طه",
    "nameEnglish": "Taa-Haa",
    "ayahCount": 135,
    "revelationType": "মাক্কী",
    "startPage": 313
  },
  {
    "number": 21,
    "nameBangla": "আল-আম্বিয়া",
    "nameArabic": "سُورَةُ الأَنبِيَاءِ",
    "nameEnglish": "Al-Anbiyaa",
    "ayahCount": 112,
    "revelationType": "মাক্কী",
    "startPage": 323
  },
  {
    "number": 22,
    "nameBangla": "আল-হাজ্জ",
    "nameArabic": "سُورَةُ الحَجِّ",
    "nameEnglish": "Al-Hajj",
    "ayahCount": 78,
    "revelationType": "মাদানী",
    "startPage": 332
  },
  {
    "number": 23,
    "nameBangla": "আল-মুমিনুন",
    "nameArabic": "سُورَةُ المُؤۡمِنُونَ",
    "nameEnglish": "Al-Muminoon",
    "ayahCount": 118,
    "revelationType": "মাক্কী",
    "startPage": 343
  },
  {
    "number": 24,
    "nameBangla": "আন-নূর",
    "nameArabic": "سُورَةُ النُّورِ",
    "nameEnglish": "An-Noor",
    "ayahCount": 64,
    "revelationType": "মাদানী",
    "startPage": 351
  },
  {
    "number": 25,
    "nameBangla": "আল-ফুরকান",
    "nameArabic": "سُورَةُ الفُرۡقَانِ",
    "nameEnglish": "Al-Furqaan",
    "ayahCount": 77,
    "revelationType": "মাক্কী",
    "startPage": 360
  },
  {
    "number": 26,
    "nameBangla": "আশ-শুআরা",
    "nameArabic": "سُورَةُ الشُّعَرَاءِ",
    "nameEnglish": "Ash-Shu'araa",
    "ayahCount": 227,
    "revelationType": "মাক্কী",
    "startPage": 367
  },
  {
    "number": 27,
    "nameBangla": "আন-নামল",
    "nameArabic": "سُورَةُ النَّمۡلِ",
    "nameEnglish": "An-Naml",
    "ayahCount": 93,
    "revelationType": "মাক্কী",
    "startPage": 377
  },
  {
    "number": 28,
    "nameBangla": "আল-কাসাস",
    "nameArabic": "سُورَةُ القَصَصِ",
    "nameEnglish": "Al-Qasas",
    "ayahCount": 88,
    "revelationType": "মাক্কী",
    "startPage": 386
  },
  {
    "number": 29,
    "nameBangla": "আল-আনকাবুত",
    "nameArabic": "سُورَةُ العَنكَبُوتِ",
    "nameEnglish": "Al-Ankaboot",
    "ayahCount": 69,
    "revelationType": "মাক্কী",
    "startPage": 397
  },
  {
    "number": 30,
    "nameBangla": "আর-রূম",
    "nameArabic": "سُورَةُ الرُّومِ",
    "nameEnglish": "Ar-Room",
    "ayahCount": 60,
    "revelationType": "মাক্কী",
    "startPage": 405
  },
  {
    "number": 31,
    "nameBangla": "লুকমান",
    "nameArabic": "سُورَةُ لُقۡمَانَ",
    "nameEnglish": "Luqman",
    "ayahCount": 34,
    "revelationType": "মাক্কী",
    "startPage": 412
  },
  {
    "number": 32,
    "nameBangla": "আস-সাজদাহ",
    "nameArabic": "سُورَةُ السَّجۡدَةِ",
    "nameEnglish": "As-Sajda",
    "ayahCount": 30,
    "revelationType": "মাক্কী",
    "startPage": 416
  },
  {
    "number": 33,
    "nameBangla": "আল-আহযাব",
    "nameArabic": "سُورَةُ الأَحۡزَابِ",
    "nameEnglish": "Al-Ahzaab",
    "ayahCount": 73,
    "revelationType": "মাদানী",
    "startPage": 419
  },
  {
    "number": 34,
    "nameBangla": "সাবা",
    "nameArabic": "سُورَةُ سَبَإٍ",
    "nameEnglish": "Saba",
    "ayahCount": 54,
    "revelationType": "মাক্কী",
    "startPage": 429
  },
  {
    "number": 35,
    "nameBangla": "ফাতির",
    "nameArabic": "سُورَةُ فَاطِرٍ",
    "nameEnglish": "Faatir",
    "ayahCount": 45,
    "revelationType": "মাক্কী",
    "startPage": 435
  },
  {
    "number": 36,
    "nameBangla": "ইয়া-সীন",
    "nameArabic": "سُورَةُ يسٓ",
    "nameEnglish": "Yaseen",
    "ayahCount": 83,
    "revelationType": "মাক্কী",
    "startPage": 441
  },
  {
    "number": 37,
    "nameBangla": "আস-সাফফাত",
    "nameArabic": "سُورَةُ الصَّافَّاتِ",
    "nameEnglish": "As-Saaffaat",
    "ayahCount": 182,
    "revelationType": "মাক্কী",
    "startPage": 446
  },
  {
    "number": 38,
    "nameBangla": "সোয়াদ",
    "nameArabic": "سُورَةُ صٓ",
    "nameEnglish": "Saad",
    "ayahCount": 88,
    "revelationType": "মাক্কী",
    "startPage": 453
  },
  {
    "number": 39,
    "nameBangla": "আয-যুমার",
    "nameArabic": "سُورَةُ الزُّمَرِ",
    "nameEnglish": "Az-Zumar",
    "ayahCount": 75,
    "revelationType": "মাক্কী",
    "startPage": 459
  },
  {
    "number": 40,
    "nameBangla": "গাফির",
    "nameArabic": "سُورَةُ غَافِرٍ",
    "nameEnglish": "Ghafir",
    "ayahCount": 85,
    "revelationType": "মাক্কী",
    "startPage": 468
  },
  {
    "number": 41,
    "nameBangla": "ফুসসিলাত",
    "nameArabic": "سُورَةُ فُصِّلَتۡ",
    "nameEnglish": "Fussilat",
    "ayahCount": 54,
    "revelationType": "মাক্কী",
    "startPage": 478
  },
  {
    "number": 42,
    "nameBangla": "আশ-শুরা",
    "nameArabic": "سُورَةُ الشُّورَىٰ",
    "nameEnglish": "Ash-Shura",
    "ayahCount": 53,
    "revelationType": "মাক্কী",
    "startPage": 484
  },
  {
    "number": 43,
    "nameBangla": "আয-যুখরুফ",
    "nameArabic": "سُورَةُ الزُّخۡرُفِ",
    "nameEnglish": "Az-Zukhruf",
    "ayahCount": 89,
    "revelationType": "মাক্কী",
    "startPage": 490
  },
  {
    "number": 44,
    "nameBangla": "আদ-দুখান",
    "nameArabic": "سُورَةُ الدُّخَانِ",
    "nameEnglish": "Ad-Dukhaan",
    "ayahCount": 59,
    "revelationType": "মাক্কী",
    "startPage": 496
  },
  {
    "number": 45,
    "nameBangla": "আল-জাসিয়াহ",
    "nameArabic": "سُورَةُ الجَاثِيَةِ",
    "nameEnglish": "Al-Jaathiya",
    "ayahCount": 37,
    "revelationType": "মাক্কী",
    "startPage": 499
  },
  {
    "number": 46,
    "nameBangla": "আল-আহকাফ",
    "nameArabic": "سُورَةُ الأَحۡقَافِ",
    "nameEnglish": "Al-Ahqaf",
    "ayahCount": 35,
    "revelationType": "মাক্কী",
    "startPage": 503
  },
  {
    "number": 47,
    "nameBangla": "মুহাম্মদ",
    "nameArabic": "سُورَةُ مُحَمَّدٍ",
    "nameEnglish": "Muhammad",
    "ayahCount": 38,
    "revelationType": "মাদানী",
    "startPage": 507
  },
  {
    "number": 48,
    "nameBangla": "আল-ফাতহ",
    "nameArabic": "سُورَةُ الفَتۡحِ",
    "nameEnglish": "Al-Fath",
    "ayahCount": 29,
    "revelationType": "মাদানী",
    "startPage": 512
  },
  {
    "number": 49,
    "nameBangla": "আল-হুজুরাত",
    "nameArabic": "سُورَةُ الحُجُرَاتِ",
    "nameEnglish": "Al-Hujuraat",
    "ayahCount": 18,
    "revelationType": "মাদানী",
    "startPage": 516
  },
  {
    "number": 50,
    "nameBangla": "কাফ",
    "nameArabic": "سُورَةُ قٓ",
    "nameEnglish": "Qaaf",
    "ayahCount": 45,
    "revelationType": "মাক্কী",
    "startPage": 519
  },
  {
    "number": 51,
    "nameBangla": "আয-যারিয়াত",
    "nameArabic": "سُورَةُ الذَّارِيَاتِ",
    "nameEnglish": "Adh-Dhaariyat",
    "ayahCount": 60,
    "revelationType": "মাক্কী",
    "startPage": 521
  },
  {
    "number": 52,
    "nameBangla": "আত-তূর",
    "nameArabic": "سُورَةُ الطُّورِ",
    "nameEnglish": "At-Tur",
    "ayahCount": 49,
    "revelationType": "মাক্কী",
    "startPage": 524
  },
  {
    "number": 53,
    "nameBangla": "আন-নাজম",
    "nameArabic": "سُورَةُ النَّجۡمِ",
    "nameEnglish": "An-Najm",
    "ayahCount": 62,
    "revelationType": "মাক্কী",
    "startPage": 527
  },
  {
    "number": 54,
    "nameBangla": "আল-ক্বামার",
    "nameArabic": "سُورَةُ القَمَرِ",
    "nameEnglish": "Al-Qamar",
    "ayahCount": 55,
    "revelationType": "মাক্কী",
    "startPage": 529
  },
  {
    "number": 55,
    "nameBangla": "আর-রহমান",
    "nameArabic": "سُورَةُ الرَّحۡمَٰن",
    "nameEnglish": "Ar-Rahmaan",
    "ayahCount": 78,
    "revelationType": "মাদানী",
    "startPage": 532
  },
  {
    "number": 56,
    "nameBangla": "আল-ওয়াকিয়াহ",
    "nameArabic": "سُورَةُ الوَاقِعَةِ",
    "nameEnglish": "Al-Waaqia",
    "ayahCount": 96,
    "revelationType": "মাক্কী",
    "startPage": 535
  },
  {
    "number": 57,
    "nameBangla": "আল-হাদীদ",
    "nameArabic": "سُورَةُ الحَدِيدِ",
    "nameEnglish": "Al-Hadid",
    "ayahCount": 29,
    "revelationType": "মাদানী",
    "startPage": 538
  },
  {
    "number": 58,
    "nameBangla": "আল-মুজাদালাহ",
    "nameArabic": "سُورَةُ المُجَادلَةِ",
    "nameEnglish": "Al-Mujaadila",
    "ayahCount": 22,
    "revelationType": "মাদানী",
    "startPage": 543
  },
  {
    "number": 59,
    "nameBangla": "আল-হাশর",
    "nameArabic": "سُورَةُ الحَشۡرِ",
    "nameEnglish": "Al-Hashr",
    "ayahCount": 24,
    "revelationType": "মাদানী",
    "startPage": 546
  },
  {
    "number": 60,
    "nameBangla": "আল-মুমতাহিনাহ",
    "nameArabic": "سُورَةُ المُمۡتَحنَةِ",
    "nameEnglish": "Al-Mumtahana",
    "ayahCount": 13,
    "revelationType": "মাদানী",
    "startPage": 550
  },
  {
    "number": 61,
    "nameBangla": "আস-সাফ",
    "nameArabic": "سُورَةُ الصَّفِّ",
    "nameEnglish": "As-Saff",
    "ayahCount": 14,
    "revelationType": "মাদানী",
    "startPage": 552
  },
  {
    "number": 62,
    "nameBangla": "আল-জুমুআহ",
    "nameArabic": "سُورَةُ الجُمُعَةِ",
    "nameEnglish": "Al-Jumu'a",
    "ayahCount": 11,
    "revelationType": "মাদানী",
    "startPage": 554
  },
  {
    "number": 63,
    "nameBangla": "আল-মুনাফিকুন",
    "nameArabic": "سُورَةُ المُنَافِقُونَ",
    "nameEnglish": "Al-Munaafiqoon",
    "ayahCount": 11,
    "revelationType": "মাদানী",
    "startPage": 555
  },
  {
    "number": 64,
    "nameBangla": "আত-তাগাবুন",
    "nameArabic": "سُورَةُ التَّغَابُنِ",
    "nameEnglish": "At-Taghaabun",
    "ayahCount": 18,
    "revelationType": "মাদানী",
    "startPage": 557
  },
  {
    "number": 65,
    "nameBangla": "আত-ত্বালাক",
    "nameArabic": "سُورَةُ الطَّلَاقِ",
    "nameEnglish": "At-Talaaq",
    "ayahCount": 12,
    "revelationType": "মাদানী",
    "startPage": 559
  },
  {
    "number": 66,
    "nameBangla": "আত-তাহরীম",
    "nameArabic": "سُورَةُ التَّحۡرِيمِ",
    "nameEnglish": "At-Tahrim",
    "ayahCount": 12,
    "revelationType": "মাদানী",
    "startPage": 561
  },
  {
    "number": 67,
    "nameBangla": "আল-মুলক",
    "nameArabic": "سُورَةُ المُلۡكِ",
    "nameEnglish": "Al-Mulk",
    "ayahCount": 30,
    "revelationType": "মাক্কী",
    "startPage": 563
  },
  {
    "number": 68,
    "nameBangla": "আল-কলম",
    "nameArabic": "سُورَةُ القَلَمِ",
    "nameEnglish": "Al-Qalam",
    "ayahCount": 52,
    "revelationType": "মাক্কী",
    "startPage": 565
  },
  {
    "number": 69,
    "nameBangla": "আল-হাক্কাহ",
    "nameArabic": "سُورَةُ الحَاقَّةِ",
    "nameEnglish": "Al-Haaqqa",
    "ayahCount": 52,
    "revelationType": "মাক্কী",
    "startPage": 568
  },
  {
    "number": 70,
    "nameBangla": "আল-মাআরিজ",
    "nameArabic": "سُورَةُ المَعَارِجِ",
    "nameEnglish": "Al-Ma'aarij",
    "ayahCount": 44,
    "revelationType": "মাক্কী",
    "startPage": 570
  },
  {
    "number": 71,
    "nameBangla": "নূহ",
    "nameArabic": "سُورَةُ نُوحٍ",
    "nameEnglish": "Nooh",
    "ayahCount": 28,
    "revelationType": "মাক্কী",
    "startPage": 572
  },
  {
    "number": 72,
    "nameBangla": "আল-জ্বিন",
    "nameArabic": "سُورَةُ الجِنِّ",
    "nameEnglish": "Al-Jinn",
    "ayahCount": 28,
    "revelationType": "মাক্কী",
    "startPage": 574
  },
  {
    "number": 73,
    "nameBangla": "আল-মুযযাম্মিল",
    "nameArabic": "سُورَةُ المُزَّمِّلِ",
    "nameEnglish": "Al-Muzzammil",
    "ayahCount": 20,
    "revelationType": "মাক্কী",
    "startPage": 577
  },
  {
    "number": 74,
    "nameBangla": "আল-মুদ্দাসসির",
    "nameArabic": "سُورَةُ المُدَّثِّرِ",
    "nameEnglish": "Al-Muddaththir",
    "ayahCount": 56,
    "revelationType": "মাক্কী",
    "startPage": 579
  },
  {
    "number": 75,
    "nameBangla": "আল-কিয়ামাহ",
    "nameArabic": "سُورَةُ القِيَامَةِ",
    "nameEnglish": "Al-Qiyaama",
    "ayahCount": 40,
    "revelationType": "মাক্কী",
    "startPage": 581
  },
  {
    "number": 76,
    "nameBangla": "আল-ইনসান",
    "nameArabic": "سُورَةُ الإِنسَانِ",
    "nameEnglish": "Al-Insaan",
    "ayahCount": 31,
    "revelationType": "মাদানী",
    "startPage": 583
  },
  {
    "number": 77,
    "nameBangla": "আল-মুরসালাত",
    "nameArabic": "سُورَةُ المُرۡسَلَاتِ",
    "nameEnglish": "Al-Mursalaat",
    "ayahCount": 50,
    "revelationType": "মাক্কী",
    "startPage": 585
  },
  {
    "number": 78,
    "nameBangla": "আন-নাবা",
    "nameArabic": "سُورَةُ النَّبَإِ",
    "nameEnglish": "An-Naba",
    "ayahCount": 40,
    "revelationType": "মাক্কী",
    "startPage": 587
  },
  {
    "number": 79,
    "nameBangla": "আন-নাযিআত",
    "nameArabic": "سُورَةُ النَّازِعَاتِ",
    "nameEnglish": "An-Naazi'aat",
    "ayahCount": 46,
    "revelationType": "মাক্কী",
    "startPage": 588
  },
  {
    "number": 80,
    "nameBangla": "আবাসা",
    "nameArabic": "سُورَةُ عَبَسَ",
    "nameEnglish": "Abasa",
    "ayahCount": 42,
    "revelationType": "মাক্কী",
    "startPage": 590
  },
  {
    "number": 81,
    "nameBangla": "আত-তাকবীর",
    "nameArabic": "سُورَةُ التَّكۡوِيرِ",
    "nameEnglish": "At-Takwir",
    "ayahCount": 29,
    "revelationType": "মাক্কী",
    "startPage": 591
  },
  {
    "number": 82,
    "nameBangla": "আল-ইনফিতার",
    "nameArabic": "سُورَةُ الانفِطَارِ",
    "nameEnglish": "Al-Infitaar",
    "ayahCount": 19,
    "revelationType": "মাক্কী",
    "startPage": 592
  },
  {
    "number": 83,
    "nameBangla": "আল-মুতাফফিফীন",
    "nameArabic": "سُورَةُ المُطَفِّفِينَ",
    "nameEnglish": "Al-Mutaffifin",
    "ayahCount": 36,
    "revelationType": "মাক্কী",
    "startPage": 593
  },
  {
    "number": 84,
    "nameBangla": "আল-ইনশিকাক",
    "nameArabic": "سُورَةُ الانشِقَاقِ",
    "nameEnglish": "Al-Inshiqaaq",
    "ayahCount": 25,
    "revelationType": "মাক্কী",
    "startPage": 595
  },
  {
    "number": 85,
    "nameBangla": "আল-বুরুজ",
    "nameArabic": "سُورَةُ البُرُوجِ",
    "nameEnglish": "Al-Burooj",
    "ayahCount": 22,
    "revelationType": "মাক্কী",
    "startPage": 596
  },
  {
    "number": 86,
    "nameBangla": "আত-তারিক্ব",
    "nameArabic": "سُورَةُ الطَّارِقِ",
    "nameEnglish": "At-Taariq",
    "ayahCount": 17,
    "revelationType": "মাক্কী",
    "startPage": 597
  },
  {
    "number": 87,
    "nameBangla": "আল-আলা",
    "nameArabic": "سُورَةُ الأَعۡلَىٰ",
    "nameEnglish": "Al-A'laa",
    "ayahCount": 19,
    "revelationType": "মাক্কী",
    "startPage": 598
  },
  {
    "number": 88,
    "nameBangla": "আল-গাশিয়াহ",
    "nameArabic": "سُورَةُ الغَاشِيَةِ",
    "nameEnglish": "Al-Ghaashiya",
    "ayahCount": 26,
    "revelationType": "মাক্কী",
    "startPage": 598
  },
  {
    "number": 89,
    "nameBangla": "আল-ফজর",
    "nameArabic": "سُورَةُ الفَجۡرِ",
    "nameEnglish": "Al-Fajr",
    "ayahCount": 30,
    "revelationType": "মাক্কী",
    "startPage": 599
  },
  {
    "number": 90,
    "nameBangla": "আল-বালাদ",
    "nameArabic": "سُورَةُ البَلَدِ",
    "nameEnglish": "Al-Balad",
    "ayahCount": 20,
    "revelationType": "মাক্কী",
    "startPage": 601
  },
  {
    "number": 91,
    "nameBangla": "আশ-শামস",
    "nameArabic": "سُورَةُ الشَّمۡسِ",
    "nameEnglish": "Ash-Shams",
    "ayahCount": 15,
    "revelationType": "মাক্কী",
    "startPage": 601
  },
  {
    "number": 92,
    "nameBangla": "আল-লাইল",
    "nameArabic": "سُورَةُ اللَّيۡلِ",
    "nameEnglish": "Al-Lail",
    "ayahCount": 21,
    "revelationType": "মাক্কী",
    "startPage": 602
  },
  {
    "number": 93,
    "nameBangla": "আদ-দুহা",
    "nameArabic": "س��ورَةُ الضُّحَىٰ",
    "nameEnglish": "Ad-Dhuhaa",
    "ayahCount": 11,
    "revelationType": "মাক্কী",
    "startPage": 603
  },
  {
    "number": 94,
    "nameBangla": "আল-ইনশিরাহ",
    "nameArabic": "سُورَةُ الشَّرۡحِ",
    "nameEnglish": "Ash-Sharh",
    "ayahCount": 8,
    "revelationType": "মাক্কী",
    "startPage": 603
  },
  {
    "number": 95,
    "nameBangla": "আত-তীন",
    "nameArabic": "سُورَةُ التِّينِ",
    "nameEnglish": "At-Tin",
    "ayahCount": 8,
    "revelationType": "মাক্কী",
    "startPage": 604
  },
  {
    "number": 96,
    "nameBangla": "আল-আলাক",
    "nameArabic": "سُورَةُ العَلَقِ",
    "nameEnglish": "Al-Alaq",
    "ayahCount": 19,
    "revelationType": "মাক্কী",
    "startPage": 604
  },
  {
    "number": 97,
    "nameBangla": "আল-কদর",
    "nameArabic": "سُورَةُ القَدۡرِ",
    "nameEnglish": "Al-Qadr",
    "ayahCount": 5,
    "revelationType": "মাক্কী",
    "startPage": 605
  },
  {
    "number": 98,
    "nameBangla": "আল-বায়্যিনাহ",
    "nameArabic": "سُورَةُ البَيِّنَةِ",
    "nameEnglish": "Al-Bayyina",
    "ayahCount": 8,
    "revelationType": "মাদানী",
    "startPage": 605
  },
  {
    "number": 99,
    "nameBangla": "আল-যিলযাল",
    "nameArabic": "سُورَةُ الزَّلۡزَلَةِ",
    "nameEnglish": "Az-Zalzala",
    "ayahCount": 8,
    "revelationType": "মাদানী",
    "startPage": 606
  },
  {
    "number": 100,
    "nameBangla": "আল-আদিয়াত",
    "nameArabic": "سُورَةُ العَادِيَاتِ",
    "nameEnglish": "Al-Aadiyaat",
    "ayahCount": 11,
    "revelationType": "মাক্কী",
    "startPage": 606
  },
  {
    "number": 101,
    "nameBangla": "আল-কারিআহ",
    "nameArabic": "سُورَةُ القَارِعَةِ",
    "nameEnglish": "Al-Qaari'a",
    "ayahCount": 11,
    "revelationType": "মাক্কী",
    "startPage": 607
  },
  {
    "number": 102,
    "nameBangla": "আত-তাকাসুর",
    "nameArabic": "سُورَةُ التَّكَاثُرِ",
    "nameEnglish": "At-Takaathur",
    "ayahCount": 8,
    "revelationType": "মাক্কী",
    "startPage": 607
  },
  {
    "number": 103,
    "nameBangla": "আল-আসর",
    "nameArabic": "سُورَةُ العَصۡرِ",
    "nameEnglish": "Al-Asr",
    "ayahCount": 3,
    "revelationType": "মাক্কী",
    "startPage": 608
  },
  {
    "number": 104,
    "nameBangla": "আল-হুমাযাহ",
    "nameArabic": "سُورَةُ الهُمَزَةِ",
    "nameEnglish": "Al-Humaza",
    "ayahCount": 9,
    "revelationType": "মাক্কী",
    "startPage": 608
  },
  {
    "number": 105,
    "nameBangla": "আল-ফীল",
    "nameArabic": "سُورَةُ الفِيلِ",
    "nameEnglish": "Al-Fil",
    "ayahCount": 5,
    "revelationType": "মাক্কী",
    "startPage": 608
  },
  {
    "number": 106,
    "nameBangla": "কুরাইশ",
    "nameArabic": "سُورَةُ قُرَيۡشٍ",
    "nameEnglish": "Quraish",
    "ayahCount": 4,
    "revelationType": "মাক্কী",
    "startPage": 609
  },
  {
    "number": 107,
    "nameBangla": "আল-মাউন",
    "nameArabic": "سُورَةُ المَاعُونِ",
    "nameEnglish": "Al-Maa'un",
    "ayahCount": 7,
    "revelationType": "মাক্কী",
    "startPage": 609
  },
  {
    "number": 108,
    "nameBangla": "আল-কাউসার",
    "nameArabic": "سُورَةُ الكَوۡثَرِ",
    "nameEnglish": "Al-Kawthar",
    "ayahCount": 3,
    "revelationType": "মাক্কী",
    "startPage": 609
  },
  {
    "number": 109,
    "nameBangla": "আল-কাফিরুন",
    "nameArabic": "سُورَةُ الكَافِرُونَ",
    "nameEnglish": "Al-Kaafiroon",
    "ayahCount": 6,
    "revelationType": "মাক্কী",
    "startPage": 609
  },
  {
    "number": 110,
    "nameBangla": "আন-নাসর",
    "nameArabic": "سُورَةُ النَّصۡرِ",
    "nameEnglish": "An-Nasr",
    "ayahCount": 3,
    "revelationType": "মাদানী",
    "startPage": 610
  },
  {
    "number": 111,
    "nameBangla": "আল-লাহাব",
    "nameArabic": "سُورَةُ المَسَدِ",
    "nameEnglish": "Al-Masad",
    "ayahCount": 5,
    "revelationType": "মাক্কী",
    "startPage": 610
  },
  {
    "number": 112,
    "nameBangla": "আল-ইখলাস",
    "nameArabic": "سُورَةُ الإِخۡلَاصِ",
    "nameEnglish": "Al-Ikhlaas",
    "ayahCount": 4,
    "revelationType": "মাক্কী",
    "startPage": 610
  },
  {
    "number": 113,
    "nameBangla": "আল-ফালাক",
    "nameArabic": "سُورَةُ الفَلَقِ",
    "nameEnglish": "Al-Falaq",
    "ayahCount": 5,
    "revelationType": "মাক্কী",
    "startPage": 611
  },
  {
    "number": 114,
    "nameBangla": "আন-নাস",
    "nameArabic": "سُورَةُ النَّاسِ",
    "nameEnglish": "An-Naas",
    "ayahCount": 6,
    "revelationType": "মাক্কী",
    "startPage": 611
  }
];

export type HafiziEdition = "emdadia" | "tajweed";

/**
 * রিটার্ন করে নির্দিষ্ট পৃষ্ঠার জন্য ইমেজ ইউআরএল
 * - "emdadia": ঐতিহ্যবাহী আসল বাংলাদেশী ১৫ লাইনের হাফেজী কুরআন (ইমদাদিয়া লাইব্রেরী চকবাজার, ঢাকা)
 * - "tajweed": ১৫ লাইনের কালার কোডেড তাজবীদ ছাপা
 */
export function getHafiziPageImageUrl(page: number, edition: HafiziEdition = "emdadia"): string {
  const clamped = Math.max(MIN_HAFIZI_PAGE, Math.min(MAX_HAFIZI_PAGE, page));
  if (edition === "emdadia") {
    // পৃষ্ঠা ২ -> n1.jpg, ..., পৃষ্ঠা ৬১১ -> n610.jpg
    const n = clamped - 1;
    // Cloudflare Global Edge CDN (Dhaka/Chittagong peering) + WebP compression for instant 0ms/fast load
    return `https://wsrv.nl/?url=https://archive.org/download/ImdadiaHafeziQuran/page/n${n}.jpg&w=1200&output=webp&q=82`;
  }
  const imgIndex = clamped + 27;
  const padded = String(imgIndex).padStart(3, "0");
  return `https://cdn.jsdelivr.net/gh/chitholian/Al-Quran-Color-Coded@master/images/img-${padded}.jpg`;
}

export function getHafiziPageFallbackUrl(page: number, edition: HafiziEdition = "emdadia"): string {
  const clamped = Math.max(MIN_HAFIZI_PAGE, Math.min(MAX_HAFIZI_PAGE, page));
  if (edition === "emdadia") {
    const n = clamped - 1;
    // Direct archive.org fallback
    return `https://archive.org/download/ImdadiaHafeziQuran/page/n${n}.jpg`;
  }
  const imgIndex = clamped + 27;
  const padded = String(imgIndex).padStart(3, "0");
  return `https://raw.githubusercontent.com/chitholian/Al-Quran-Color-Coded/master/images/img-${padded}.jpg`;
}

/**
 * নির্দিষ্ট পৃষ্ঠা কোন পারায় অবস্থিত তা বের করে
 */
export function getParaByPage(page: number): HafiziPara {
  const clamped = Math.max(MIN_HAFIZI_PAGE, Math.min(MAX_HAFIZI_PAGE, page));
  const found = HAFIZI_PARAS.find(p => clamped >= p.startPage && clamped <= p.endPage);
  return found || HAFIZI_PARAS[0];
}

/**
 * নির্দিষ্ট পৃষ্ঠায় বা পৃষ্ঠার ঠিক পূর্বে কোন সূরা শুরু হয়েছে তা বের করে
 */
export function getSurahByPage(page: number): HafiziSurah {
  const clamped = Math.max(MIN_HAFIZI_PAGE, Math.min(MAX_HAFIZI_PAGE, page));
  let currentSurah = HAFIZI_SURAHS[0];
  for (const s of HAFIZI_SURAHS) {
    if (s.startPage <= clamped) {
      currentSurah = s;
    } else {
      break;
    }
  }
  return currentSurah;
}
