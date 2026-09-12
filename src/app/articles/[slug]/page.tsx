import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES_LIST } from "@/data/articles";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  ChevronRight, 
  Share2, 
  ArrowLeft 
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_LIST.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_LIST.find((a) => a.slug === slug);
  if (!article) return { title: "আর্টিকেল পাওয়া যায়নি" };

  return {
    title: `${article.title} | সুন্নাহলাইফ`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES_LIST.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "সুন্নাহলাইফ",
      logo: {
        "@type": "ImageObject",
        url: "https://sunnahlife.care/sunnahlife_logo.svg",
      },
    },
    datePublished: "2026-09-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sunnahlife.care/articles/${article.slug}`,
    },
    articleBody: article.content.join(" "),
  };

  return (
    <article className="py-8 md:py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Structured Data (JSON-LD) for Search & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <Link href="/articles" className="inline-flex items-center gap-1.5 text-[#006B5B] hover:underline font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>সকল আর্টিকেলে ফিরে যান</span>
        </Link>
        <span className="text-xs bg-[#006B5B]/10 text-[#006B5B] px-3 py-1 rounded-full font-semibold">
          {article.categoryLabel}
        </span>
      </div>

      {/* Article Title Header */}
      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004D40] leading-snug">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 text-gray-700">
            <UserCheck className="w-4 h-4 text-[#D4A017]" />
            লেখক: {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {article.publishDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            পড়ার সময়: {article.readTime}
          </span>
        </div>

        {/* Scholarly review badge */}
        <div className="p-3 rounded-xl bg-[#FAFAF7] border border-[#006B5B]/15 text-xs text-[#006B5B] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4A017] shrink-0" />
          <span><strong>শারঈ পর্যালোচনা:</strong> {article.reviewedBy}</span>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed font-normal">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-loose">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Article Footer & Consultation Call */}
      <div className="mt-10 pt-6 border-t border-gray-100 p-6 rounded-3xl bg-[#FAFAF7] border border-[#006B5B]/15 space-y-4">
        <h3 className="text-base font-bold text-[#004D40]">
          আপনার কি রুকইয়াহ বা আত্মরক্ষা সংক্রান্ত কোনো প্রশ্ন আছে?
        </h3>
        <p className="text-xs text-gray-600">
          আমাদের স্বয়ংক্রিয় লক্ষণ চেকার ব্যবহার করে পরীক্ষা করতে পারেন অথবা সরাসরি অভিজ্ঞ রাক্বীর পরামর্শ নিতে পারেন।
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="px-5 py-2.5 rounded-xl bg-[#006B5B] text-white text-xs font-semibold hover:bg-[#004D40]"
          >
            লক্ষণ পরীক্ষা করুন
          </Link>
          <Link
            href="/appointment"
            className="px-5 py-2.5 rounded-xl border border-[#006B5B] text-[#006B5B] text-xs font-semibold hover:bg-[#006B5B]/5"
          >
            অ্যাপয়েন্টমেন্ট বুকিং
          </Link>
        </div>
      </div>
    </article>
  );
}
