import { Metadata } from "next";
import { notFound } from "next/navigation";
import { QURAN_SURAHS } from "@/data/quranSurahs";
import SurahReaderView from "@/components/SurahReaderView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return QURAN_SURAHS.map((s) => ({
    id: String(s.number),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const num = parseInt(id, 10);
  const surah = QURAN_SURAHS.find((s) => s.number === num);

  if (!surah) {
    return {
      title: "সূরা পাওয়া যায়নি | সুন্নাহলাইফ",
    };
  }

  return {
    title: `সূরা ${surah.nameBangla} (${surah.nameEnglish}) - আরবি, বাংলা অর্থ ও অডিও তিলাওয়াত | সুন্নাহলাইফ`,
    description: `পবিত্র কুরআনের ${surah.number} নম্বর সূরা ${surah.nameBangla} (${surah.meaningBangla})। মোট আয়াত: ${surah.ayahCount}, অবতীর্ণ: ${surah.revelationType}। মাওলানা মুহিউদ্দীন খানের বাংলা অর্থ ও শায়খ মিশারি রশিদের অডিও তিলাওয়াত।`,
    keywords: [
      `সূরা ${surah.nameBangla}`,
      surah.nameEnglish,
      surah.nameArabic,
      "কুরআন বাংলা অনুবাদ",
      "রুকইয়াহ শারইয়্যাহ",
      "সুন্নাহলাইফ কুরআন",
    ],
    openGraph: {
      title: `সূরা ${surah.nameBangla} (${surah.nameEnglish}) | সুন্নাহলাইফ`,
      description: `পবিত্র কুরআনের সূরা ${surah.nameBangla} (${surah.meaningBangla}) - পূর্ণাঙ্গ আরবি, বাংলা অনুবাদ ও অডিও।`,
    },
  };
}

export default async function SurahDetailPage({ params }: Props) {
  const { id } = await params;
  const num = parseInt(id, 10);
  const surahIndex = QURAN_SURAHS.findIndex((s) => s.number === num);

  if (surahIndex === -1) {
    notFound();
  }

  const surah = QURAN_SURAHS[surahIndex];
  const prevSurah = surahIndex > 0 ? QURAN_SURAHS[surahIndex - 1] : null;
  const nextSurah = surahIndex < QURAN_SURAHS.length - 1 ? QURAN_SURAHS[surahIndex + 1] : null;

  return (
    <SurahReaderView
      surah={surah}
      prevSurah={prevSurah}
      nextSurah={nextSurah}
    />
  );
}
