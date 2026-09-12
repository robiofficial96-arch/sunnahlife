export interface RuqyahAudioItem {
  id: string;
  title: string;
  category: "general" | "evil_eye" | "sihr" | "jinn" | "sleep";
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
    reciter: "শায়খ মিশারি রশিদ আল-আফাসি",
    duration: "45:12",
    audioUrl: "https://ia800301.us.archive.org/15/items/RuqyahShariahFullMisharyRashidAlAfasy/Ruqyah%20Shariah%20Full%20-%20Mishary%20Rashid%20Al-Afasy.mp3",
    description: "কুরআনের সার্বিক শেফা ও হিফযের আয়াতসমূহ দ্বারা সাজানো পূর্ণাঙ্গ রুকইয়াহ।",
    instructions: "মনোযোগ সহকারে অযু অবস্থায় বসে হেডফোন দিয়ে শুনুন। কোনো প্রতিক্রিয়া হলে খেয়াল রাখুন।",
  },
  {
    id: "evil-eye-ruqyah",
    title: "বদনজর ও হিংসা মুক্তির রুকইয়াহ",
    category: "evil_eye",
    reciter: "শায়খ খালিদ আল-হাবাশি",
    duration: "32:40",
    audioUrl: "https://ia801802.us.archive.org/30/items/RuqyahShariahAynHasadKhalidAlHabashi/Ruqyah%20Ayn%20%26%20Hasad.mp3",
    description: "বদনজর (Evil Eye) এবং হিংসার (Hasad) কুপ্রভাব দূর করার বিশেষ আয়াত ও দোয়া।",
    instructions: "দিনে অন্তত ২ বার একমনে শুনুন এবং নিজের বুকে বা পানিতে ফুঁ দিয়ে তা পান করুন।",
  },
  {
    id: "sihr-ruqyah",
    title: "সিহর ও জাদু বিনষ্টকারী রুকইয়াহ",
    category: "sihr",
    reciter: "শায়খ ইদরীস আবকার",
    duration: "51:18",
    audioUrl: "https://ia800504.us.archive.org/11/items/RuqyahIdreesAbkar/Ruqyah_Idrees_Abkar.mp3",
    description: "কুরআনের সিহর ধ্বংসকারী আয়াতসমূহ বিশিষ্ট শক্তিশালী তিলাওয়াত।",
    instructions: "খাওয়ানো জাদু বা শারীরিক জাদুর সন্দেহে প্রতিদিন সকালে ও রাতে শুনুন।",
  },
  {
    id: "sleep-anxiety-ruqyah",
    title: "ঘুমের পূর্বে প্রশান্তি ও ভয় নিবারক তিলাওয়াত",
    category: "sleep",
    reciter: "শায়খ সা'দ আল-গামিদি",
    duration: "24:15",
    audioUrl: "https://ia801308.us.archive.org/21/items/RuqyahSaadAlGhamdi/Ruqyah_Saad_Al_Ghamdi.mp3",
    description: "দুঃস্বপ্ন, অনিদ্রা, বুক ধড়ফড় এবং অহেতুক ভীতি প্রশমনের আয়াতসমূহ।",
    instructions: "ঘুমানোর বিছানায় শুয়ে মৃদু ভলিউমে শুনুন এবং শেষ হলে ঘুমানোর মাসনুন দোয়া পাঠ করুন।",
  },
];
