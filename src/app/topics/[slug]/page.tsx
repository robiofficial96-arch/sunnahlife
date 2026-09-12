import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOPICS_DATA } from "@/data/topics";
import { 
  ShieldCheck, 
  BookOpen, 
  AlertCircle, 
  HeartHandshake, 
  HeartPulse, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOPICS_DATA.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS_DATA.find((t) => t.slug === slug);
  if (!topic) return { title: "বিষয় পাওয়া যায়নি" };

  return {
    title: `${topic.title} | সুন্নাহলাইফ`,
    description: topic.shortDescription,
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const topic = TOPICS_DATA.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const defaultWhatsAppText = encodeURIComponent(
    `আসসালামু আলাইকুম। আমি সুন্নাহলাইফ প্ল্যাটফর্মের "${topic.title}" বিষয়টি পড়েছি। এই বিষয়ে আমার কিছু প্রশ্ন ও পরামর্শের জন্য অভিজ্ঞ শারঈ রাক্বীর সহায়তা চাচ্ছি।`
  );

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#006B5B]">হোম</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/topics" className="hover:text-[#006B5B]">বিষয়ভিত্তিক লাইব্রেরি</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#006B5B] font-semibold">{topic.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#D4A017] bg-[#D4A017]/10 px-3 py-1 rounded-full inline-block">
          কুরআন ও সুন্নাহ নির্দেশিত জ্ঞান
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#004D40] leading-tight">
          {topic.title}
        </h1>
        <p className="text-sm md:text-base text-gray-600 font-medium">
          {topic.subtitle}
        </p>
      </div>

      {/* What is it */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-[#004D40] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#006B5B]" />
          বিষয়টি কী ও এর ইসলামিক প্রেক্ষাপট
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {topic.whatIsIt}
        </p>
        <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#006B5B]/15 text-xs md:text-sm text-emerald-900 leading-relaxed font-medium flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
          <div><strong>হাদিসের দলিল:</strong> {topic.hadithEvidence}</div>
        </div>
      </div>

      {/* Common Signs */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-[#004D40] flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#D4A017]" />
          সাধারণ লক্ষণ ও আলামতসমূহ
        </h2>
        <p className="text-xs md:text-sm text-gray-500">
          উক্ত সমস্যায় আক্রান্ত ব্যক্তিদের ক্ষেত্রে সাধারণত নিম্নলিখিত আলামতগুলো পরিলক্ষিত হতে পারে:
        </p>
        <div className="space-y-2.5">
          {topic.commonSigns.map((sign, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7] border border-gray-100">
              <span className="w-6 h-6 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs md:text-sm text-gray-800">{sign}</span>
            </div>
          ))}
        </div>

        {/* Important Warning */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 space-y-1">
          <strong className="font-bold flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>অত্যন্ত গুরুত্বপূর্ণ সতর্কতা:</span>
          </strong>
          <p>{topic.importantClarification}</p>
        </div>
      </div>

      {/* Ruqyah Treatment */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-[#004D40] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#006B5B]" />
          কুরআন ও সুন্নাহ মোতাবেক প্রতিকার ও আমল
        </h2>
        <div className="space-y-3">
          {topic.ruqyahTreatment.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Ayat & Dua */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#006B5B] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4A017]" />
            প্রয়োজনীয় আয়াতসমূহ:
          </h3>
          <ul className="space-y-2 text-xs md:text-sm text-gray-700">
            {topic.recommendedAyat.map((ayah, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B]" />
                {ayah}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#006B5B] flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#D4A017]" />
            প্রয়োজনীয় মাসনুন দোয়াসমূহ:
          </h3>
          <div className="space-y-2">
            {topic.recommendedDuas.map((d, i) => (
              <p key={i} className="text-xs font-arabic text-emerald-950 bg-[#FAFAF7] p-3 rounded-xl border border-[#006B5B]/10 leading-loose text-right">
                {d}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
        <HeartPulse className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">চিকিৎসা পরামর্শ:</strong>
          {topic.medicalAdvice}
        </div>
      </div>

      {/* CTAs */}
      <div className="p-6 md:p-8 rounded-3xl bg-radial from-white to-[#FAFAF7] border-2 border-[#006B5B] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#004D40]">
            এই লক্ষণগুলো মিলিয়ে পরীক্ষা করতে চান?
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            আমাদের ইন্টারেক্টিভ লক্ষণ চেকার ব্যবহার করুন এবং ফলাফল পেয়ে যান।
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/assessment"
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#006B5B] text-white font-bold text-xs md:text-sm hover:bg-[#004D40] text-center"
          >
            লক্ষণ পরীক্ষা করুন
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.raqiWhatsAppNumber}?text=${defaultWhatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-emerald-600 text-[#006B5B] font-bold text-xs md:text-sm hover:bg-emerald-50 flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
