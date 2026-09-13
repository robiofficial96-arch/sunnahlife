export interface RuqyahAudioItem {
  id: string;
  title: string;
  category: "general" | "evil_eye" | "sihr" | "jinn" | "sleep";
  categoryLabel: string;
  reciter: string;
  duration: string;
  audioUrl: string;
  description: string;
  instructions: string;
}

export const RUQYAH_AUDIO_LIST: RuqyahAudioItem[] = [
  {
    id: "general-ruqyah-mishary",
    title: "সাধারণ রুকইয়াহ শারইয়্যাহ (পূর্ণাঙ্গ)",
    category: "general",
    categoryLabel: "সার্বিক আরোগ্য ও শেফা",
    reciter: "শায়খ মিশারি রশিদ আল-আফাসি",
    duration: "1:13:08",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahMisharyAlAfasy.mp3",
    description: "কুরআনের সার্বিক শেফা ও হিফযের আয়াতসমূহ দ্বারা সাজানো পূর্ণাঙ্গ ও শক্তিশালী রুকইয়াহ।",
    instructions: "অযু অবস্থায় একা নিরিবিলি বসে হেডফোন দিয়ে শুনুন। চোখ বন্ধ করে আয়াতের অর্থ অনুধাবন করুন।",
  },
  {
    id: "sihr-ruqyah-ajmy",
    title: "জাদুর শক্তিশালী রুকইয়াহ ও পেটের সিহর (খাওয়ানো জাদু) বিনষ্টকরণ",
    category: "sihr",
    categoryLabel: "খাওয়ানো জাদু ও সিহর বিনষ্ট",
    reciter: "শায়খ আহমদ আল-আজমী",
    duration: "1:05:45",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahAhmedAlAjamy.mp3",
    description: "কুরআনের সিহর ও খাওয়ানো জাদু ধ্বংসকারী বিশেষ আয়াতসমূহ নিয়ে প্রস্তুতকৃত তেজোদৃপ্ত তিলাওয়াত।",
    instructions: "পেটে অস্বস্তি, খাওয়ানো জাদু বা শারীরিক জাদুর সন্দেহে প্রতিদিন সকালে ও রাতে শুনুন। সাথে রুকইয়াহ করা পানি ও সানা মাক্কির আমল করুন।",
  },
  {
    id: "evil-eye-qahtani",
    title: "আইন ও হাসাদে শক্তিশালী রুকইয়াহ (বদনজর ও হিংসা বিনষ্টকারী)",
    category: "evil_eye",
    categoryLabel: "বদনজর ও তীব্র হাসাদ",
    reciter: "শায়খ খালিদ আল-কাহতানি",
    duration: "1:11:10",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahKhaledAlKahtani.mp3",
    description: "তীব্র বদনজর, মানুষের হিংসুক দৃষ্টি (আইন ও হাসাদ) এবং অন্তরের বিষণ্নতা দূরীকরণে অত্যন্ত প্রভাবশালী রুকইয়াহ।",
    instructions: "দিনে অন্তত ২ বার একমনে শুনুন। হাই আসা, গা ভারী লাগা বা চোখ দিয়ে পানি পড়লে বন্ধ করবেন না, পুরো তিলাওয়াত শুনুন।",
  },
  {
    id: "evil-eye-abkar",
    title: "বদনজর ও অন্তরের শেফায় হৃদয়স্পর্শী রুকইয়াহ",
    category: "evil_eye",
    categoryLabel: "বদনজর ও হাসাদ",
    reciter: "শায়খ ইদরীস আবকার",
    duration: "1:15:18",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahIdreesAbkar.mp3",
    description: "মানুষের কুদৃষ্টি (বদনজর), হিংসা ও অভ্যন্তরীণ অস্থিরতা দূরীকরণে অত্যন্ত হৃদয়স্পর্শী রুকইয়াহ।",
    instructions: "অযু অবস্থায় একা বসে হেডফোন দিয়ে শুনুন। নিজের বুকে বা মাথায় হাত রেখে নিয়ত শুদ্ধ রাখুন।",
  },
  {
    id: "baqarah-surah-ghamdi",
    title: "সূরা আল-বাকারা (পূর্ণাঙ্গ - ঘর থেকে শয়তান বিতাড়ন)",
    category: "general",
    categoryLabel: "ঘর ও পরিবারের সার্বিক সুরক্ষা",
    reciter: "শায়খ সা'দ আল-গামিদি",
    duration: "1:37:20",
    audioUrl: "https://server7.mp3quran.net/s_gmd/002.mp3",
    description: "রাসূলুল্লাহ (ﷺ) বলেছেন: যে ঘরে সূরা বাকারা পড়া হয়, সেখান থেকে শয়তান পলায়ন করে (সহীহ মুসলিম)।",
    instructions: "ঘরে লাউডস্পিকারে বা নিজেরা শুনুন। প্রতি ৩ দিন অন্তর ঘরে এটি চালু রাখা অত্যন্ত ফযীলতপূর্ণ।",
  },
  {
    id: "sleep-anxiety-qatami",
    title: "ঘুমের পূর্বে প্রশান্তি ও ভয় নিবারক রুকইয়াহ",
    category: "sleep",
    categoryLabel: "অনিদ্রা ও দুঃস্বপ্ন",
    reciter: "শায়খ নাসির আল-কাতামি",
    duration: "51:29",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahNasserAlQatami.mp3",
    description: "দুঃস্বপ্ন, অনিদ্রা, বুক ধড়ফড় এবং রাতে অযথা ভীতি ও অস্থিরতা প্রশমনের শান্তিময় তিলাওয়াত।",
    instructions: "ঘুমানোর বিছানায় শুয়ে মৃদু ভলিউমে শুনুন এবং শেষ হলে ঘুমানোর মাসনুন দোয়া ও ৩ কুল পাঠ করুন।",
  },
  {
    id: "dosari-jinn-cure",
    title: "শারীরিক ব্যাধি ও অপশক্তি তাড়ানোর রুকইয়াহ",
    category: "jinn",
    categoryLabel: "জিন স্পর্শ ও শারীরিক ব্যথা",
    reciter: "শায়খ ইয়াসির আদ-দাওসারি",
    duration: "52:20",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahYasserAlDosary.mp3",
    description: "জিন স্পর্শ, অহেতুক রাগ, মাথাব্যথা ও অবাধ্য কুপ্রভাব প্রতিহত করার প্রভাবক তিলাওয়াত।",
    instructions: "শরীরের যে স্থানে ব্যথা বা অস্বস্তি অনুভূত হয় সেখানে ডান হাত রেখে মনোযোগ দিয়ে শুনুন।",
  },
  {
    id: "baset-ruqyah-classic",
    title: "রুকইয়াহ শারইয়্যাহ ক্লাসিক তিলাওয়াত",
    category: "general",
    categoryLabel: "সার্বিক আরোগ্য",
    reciter: "শায়খ আবদুল বাসিত আবদুস সামাদ",
    duration: "1:22:14",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahAbdelBaset.mp3",
    description: "বিশ্বনন্দিত ক্বারীর সুমধুর কন্ঠে আরোগ্যের মূল কুরআনী আয়াতসমূহের ঐতিহাসিক ক্লাসিক তিলাওয়াত।",
    instructions: "পরিবারের সবাইকে নিয়ে একত্রে মনোযোগ সহকারে শুনতে পারেন।",
  },
  {
    id: "saffat-jinn-burn",
    title: "সূরা আস-সাফফাত (অপশক্তি ও শয়তান দাহ্যকারী)",
    category: "jinn",
    categoryLabel: "জ্বিন তাড়ানো",
    reciter: "শায়খ মিশারি রশিদ আল-আফাসি",
    duration: "28:40",
    audioUrl: "https://server8.mp3quran.net/afs/037.mp3",
    description: "শয়তান ও অবাধ্য জ্বিনদের সীমানা অতিক্রম রোধে ও দগ্ধ করতে সূরা আস-সাফফাত তিলাওয়াত অত্যন্ত কার্যকরী।",
    instructions: "রাতে ঘরে বা রোগীর সামনে পরিষ্কার আওয়াজে শুনুন। আল্লাহর ওপর পূর্ণ তাওয়াক্কুল রাখুন।",
  },
  {
    id: "sihr-renewal-cut",
    title: "জাদু নবায়ন রোধ ও শয়তান বিতাড়ন (قطع تجديد الأسحار)",
    category: "sihr",
    categoryLabel: "জাদু নবায়ন রোধ",
    reciter: "শায়খ ইয়াসির আদ-দাওসারি",
    duration: "52:20",
    audioUrl: "https://archive.org/download/AlRuqyahAlShariahBySheikh/AlRuqiahYasserAlDosary.mp3",
    description: "বারবার ঘুমের মধ্যে বা অলক্ষ্যে জাদু নবায়নের শয়তানি ষড়যন্ত্র ধ্বংস ও অপশক্তি দগ্ধ করার শক্তিশালী কুরআনী রুকইয়াহ।",
    instructions: "রাতে ঘুমানোর পূর্বে অযু করে বিছানায় শুনুন। ৩ বার আয়াতুল কুরসি ও ৩ কুল পড়ে সারা শরীরে হাত বুলিয়ে নিন।",
  },
];
