import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#006B5B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnahlife.care"),
  title: "সুন্নাহলাইফ | সুস্থতা হোক সুন্নাহর পথে - কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ",
  description: "কুরআন ও সহীহ সুন্নাহর আলোকে রুকইয়াহ শারইয়্যাহ, আত্মরক্ষা, সেলফ-রুকইয়াহ গাইড, মাসনুন দোয়া ও যিকির এবং নির্ভরযোগ্য শারঈ দিকনির্দেশনা প্ল্যাটফর্ম।",
  keywords: ["রুকইয়াহ", "সুন্নাহলাইফ", "সেলফ রুকইয়াহ", "বদনজর", "জাদু", "সিহর", "মাসনুন দোয়া", "Ruqyah Bangladesh", "Sunnah Life Care"],
  icons: {
    icon: "/sunnahlife_logo.svg",
    apple: "/sunnahlife_logo.svg",
  },
  openGraph: {
    title: "সুন্নাহলাইফ | সুস্থতা হোক সুন্নাহর পথে",
    description: "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ ও সেলফ-রুকইয়াহ প্ল্যাটফর্ম",
    images: ["/sunnahlife_logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${amiri.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1f2937] antialiased pb-20 md:pb-0 selection:bg-[#006B5B] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
