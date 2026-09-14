export interface RuqyahAudioItem {
  id: string;
  youtubeId: string;
  title: string;
  category: "sihr_eaten" | "sihr_renewal" | "jinn_burn" | "evil_eye" | "baqarah" | "tawheed";
  categoryLabel: string;
  reciter: string;
  duration: string;
  durationSeconds: number;
  youtubeUrl: string;
  description: string;
  instructions: string;
}

export const RUQYAH_AUDIO_LIST: RuqyahAudioItem[] = [
  {
    id: "eaten-magic-ruqyah",
    youtubeId: "YVpAz_XNuIk",
    title: "খাওয়ানো জাদুর শক্তিশালী রুকইয়াহ",
    category: "sihr_eaten",
    categoryLabel: "খাওয়ানো জাদু ও পেটের সিহর",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "36:25",
    durationSeconds: 2185,
    youtubeUrl: "https://www.youtube.com/watch?v=YVpAz_XNuIk",
    description: "পেটের তীব্র অস্বস্তি, বদহজম, নাভির চারপাশে গিঁট ও খাওয়ানো জাদুর (সিহর মাকুল) বিষাক্ত প্রভাব সমূলে বিনষ্ট করার শক্তিশালী কুরআনী রুকইয়াহ।",
    instructions: "অযু অবস্থায় একা নিরিবিলি বসে হেডফোন দিয়ে শুনুন। রুকইয়াহ করা পানির সাথে সানা মাক্কি ও খাঁটি মধুর আমল বজায় রাখুন। বমি বা তীব্র অস্বস্তি হলে বন্ধ করবেন না।",
  },
  {
    id: "sihr-renewal-ruqyah",
    youtubeId: "gobLhOl2wXY",
    title: "জাদু নবায়ন করা ও শয়তান ধ্বংসের শক্তিশালী রুকইয়াহ",
    category: "sihr_renewal",
    categoryLabel: "জাদু নবায়ন রোধ ও শয়তান ধ্বংস",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "38:08",
    durationSeconds: 2288,
    youtubeUrl: "https://www.youtube.com/watch?v=gobLhOl2wXY",
    description: "স্বপ্নে বা শয়তানি চক্রের মাধ্যমে বারবার জাদু নবায়নের (তাজদীদুল আসহার) অপচেষ্টা প্রতিহত এবং জাদুকর শয়তানকে সমূলে ধ্বংসের তেজোদৃপ্ত কুরআনী রুকইয়াহ।",
    instructions: "রাতে ঘুমানোর পূর্বে বিছানায় মৃদু ভলিউমে শুনুন এবং প্লেয়ারের 'লুপ/রিপিট' অপশন চালু রাখুন। ঘুমানোর পূর্বে আয়াতুল কুরসি ও ৩ কুলের আমল করুন।",
  },
  {
    id: "burning-shaitan-ruqyah",
    youtubeId: "uO93QW02GrM",
    title: "শয়তানকে জ্বালানোর শক্তিশালী রুকইয়াহ",
    category: "jinn_burn",
    categoryLabel: "মাহরাকাতুশ শায়াতীন (শয়তান দাহ্যকরণ)",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "59:00",
    durationSeconds: 3540,
    youtubeUrl: "https://www.youtube.com/watch?v=uO93QW02GrM",
    description: "শরীরে ও মনে অবস্থানরত অবাধ্য জিন-শয়তানকে আল্লাহর কুরআনী আযাবের আয়াত দ্বারা দগ্ধ ও শরীর থেকে বিতাড়নের অত্যন্ত প্রভাবশালী রুকইয়াহ।",
    instructions: "হেডফোন লাগিয়ে চোখ বন্ধ করে মনোযোগ সহকারে শুনুন। শরীরের কোথাও ব্যথা বা অস্বস্তি অনুভূত হলে সেখানে ডান হাত রেখে আল্লাহর ওপর তাওয়াক্কুল রাখুন।",
  },
  {
    id: "evil-eye-hasad-ruqyah",
    youtubeId: "9LIuxl4WXFY",
    title: "শয়তানের বদনজর হাসাদ নষ্টের শক্তিশালী রুকইয়াহ",
    category: "evil_eye",
    categoryLabel: "শয়তানের বদনজর ও তীব্র হাসাদ",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "59:22",
    durationSeconds: 3562,
    youtubeUrl: "https://www.youtube.com/watch?v=9LIuxl4WXFY",
    description: "শয়তানের হিংসা, কুদৃষ্টি (বদনজর ও তীব্র হাসাদ) এবং হঠাৎ শারীরিক-মানসিক ক্ষতির অপপ্রভাব বিনষ্টে সুরক্ষামূলক তেজোদৃপ্ত তিলাওয়াত।",
    instructions: "দিনে অন্তত একবার একমনে শুনুন। হাই আসা, শরীর ভারী লাগা বা চোখ দিয়ে পানি পড়লে ভয় না পেয়ে পুরো তিলাওয়াত শেষ করুন।",
  },
  {
    id: "surah-baqarah-ruqyah",
    youtubeId: "LRq-B2NFwsU",
    title: "সূরা আল-বাকারা (বাড়ি ও পরিবারের সার্বিক নিরাপত্তা)",
    category: "baqarah",
    categoryLabel: "সূরা আল-বাকারা",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "47:25",
    durationSeconds: 2845,
    youtubeUrl: "https://www.youtube.com/watch?v=LRq-B2NFwsU",
    description: "রাসূলুল্লাহ (ﷺ) বলেছেন: যে ঘরে সূরা বাকারা তিলাওয়াত করা হয়, সেখান থেকে শয়তান পলায়ন করে (সহীহ মুসলিম)। বাড়ি থেকে শয়তানি প্রভাব বিতাড়ন ও সার্বিক সুরক্ষার ঐতিহাসিক তিলাওয়াত।",
    instructions: "ঘরে লাউডস্পিকারে অথবা হেডফোন দিয়ে একাগ্রতার সাথে শুনুন। প্রতি ৩ দিন অন্তর ঘরে এটি চালু রাখা অত্যন্ত ফযীলতপূর্ণ ও বরকতময়।",
  },
  {
    id: "tawheed-shaitan-destroy",
    youtubeId: "pjjSZ_5WoHI",
    title: "তাওহীদের আয়াতের মাধ্যমে বদনজর হাসাদ জাদুর শয়তানকে ধ্বংস করার শক্তিশালী রুকইয়াহ",
    category: "tawheed",
    categoryLabel: "তাওহীদের আয়াত ও শয়তান ধ্বংস",
    reciter: "শায়খ আল-গারীব আল-মাওসিলী",
    duration: "1:06:04",
    durationSeconds: 3964,
    youtubeUrl: "https://www.youtube.com/watch?v=pjjSZ_5WoHI",
    description: "আল্লাহর তাওহীদ, ইখলাস ও কুদরতের মহিমান্বিত আয়াতসমূহের বিশেষ তিলাওয়াত যার মাধ্যমে হিংসুক বদনজর, হাসাদ এবং জাদুকর শয়তানের সমস্ত বাঁধন সমূলে পুড়ে ধ্বংস হয়ে যায়।",
    instructions: "অযু অবস্থায় একা নিরিবিলি বসে হেডফোন দিয়ে শুনুন। অন্তরে একমাত্র আল্লাহর সার্বভৌম ক্ষমতা ও তাওহীদের একত্ববাদের ওপর দৃঢ় বিশ্বাস স্থাপন করুন।",
  },
];
