export interface PopupNoticeConfig {
  isActive: boolean; // পপআপ চালু বা বন্ধ রাখার জন্য true অথবা false
  badge: string;
  title: string;
  subtitle: string;
  regularFee: string;
  offerFee: string;
  dayText: string;
  timeText: string;
  seatsText: string;
  image: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phone: string;
  footerNote: string;
}

export const DEFAULT_POPUP_CONFIG: PopupNoticeConfig = {
  isActive: true, // অফার চলাকালীন true থাকবে, শেষ হলে false করে দিলেই পপআপ বন্ধ হয়ে যাবে
  badge: "🌿 বিশেষ কৃতজ্ঞতা অফার",
  title: "প্রিয় পুরাতন সেবাগ্রহীতাদের জন্য বিশেষ অফার! 🎁",
  subtitle: "আগামী মঙ্গলবার আপনার জন্য থাকছে বিশেষ সুযোগ—",
  regularFee: "১,০০০ টাকা",
  offerFee: "সম্পূর্ণ ফ্রি!",
  dayText: "আগামী মঙ্গলবার",
  timeText: "সন্ধ্যা ৬টা – রাত ৯টা",
  seatsText: "সীমিত আসন: মাত্র ১০ জন",
  image: "/banners/special-offer-tuesday.jpg",
  whatsappNumber: "8801676820060",
  whatsappMessage: "আসসালামু আলাইকুম। পুরাতন সেবাগ্রহীতা হিসেবে আগামী মঙ্গলবারের ফ্রি সেশনের সিরিয়াল নিশ্চিত করতে চাচ্ছি।\n\nআমার নাম: \nমোবাইল নম্বর: \nসমস্যার সংক্ষিপ্ত বিবরণ: ",
  phone: "01676820060",
  footerNote: "🌿 আপনার আস্থার প্রতি আন্তরিক কৃতজ্ঞতা।"
};
