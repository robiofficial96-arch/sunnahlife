import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import OfferPopupModal from "@/components/OfferPopupModal";
import { SITE_CONFIG } from "@/config/site";

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
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "সুন্নাহলাইফ | সুস্থতা হোক সুন্নাহর পথে - কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ",
    template: "%s | সুন্নাহলাইফ",
  },
  description:
    "কুরআন ও সহীহ সুন্নাহর আলোকে রুকইয়াহ শারইয়্যাহ, আত্মরক্ষা, সেলফ-রুকইয়াহ গাইড, মাসনুন দোয়া ও যিকির এবং নির্ভরযোগ্য শারঈ দিকনির্দেশনা প্ল্যাটফর্ম।",
  keywords: [
    "রুকইয়াহ",
    "রুকইয়াহ শারইয়্যাহ",
    "সুন্নাহলাইফ",
    "সেলফ রুকইয়াহ",
    "বদনজর",
    "জাদু টোনা দূর করার উপায়",
    "সিহর",
    "জিন দূর করার উপায়",
    "মাসনুন দোয়া",
    "Ruqyah Bangladesh",
    "Sunnah Life Care",
    "Ruqyah Shariah",
    "Islamic Healing",
    "Evil eye cure",
    "Black magic cure in Islam",
    "হিজামা",
    "কুরআনি চিকিৎসা",
  ],
  authors: [{ name: "সুন্নাহলাইফ টিম", url: SITE_CONFIG.url }],
  creator: "সুন্নাহলাইফ",
  publisher: "সুন্নাহলাইফ",
  alternates: {
    canonical: "/",
  },
  category: "health",
  verification: {
    google: "googleaab5d2b10c0fdf19",
  },
  icons: {
    icon: [
      { url: "/sunnahlife_applogo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/sunnahlife_applogo.svg",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: SITE_CONFIG.url,
    siteName: "সুন্নাহলাইফ",
    title: "সুন্নাহলাইফ | সুস্থতা হোক সুন্নাহর পথে",
    description:
      "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ ও সেলফ-রুকইয়াহ প্ল্যাটফর্ম। নির্ভরযোগ্য শারঈ দিকনির্দেশনা ও চিকিৎসা গাইড।",
    images: [
      {
        url: "/sunnahlife_logo.svg",
        width: 1200,
        height: 630,
        alt: "সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সুন্নাহলাইফ | সুস্থতা হোক সুন্নাহর পথে",
    description: "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ ও সেলফ-রুকইয়াহ প্ল্যাটফর্ম",
    images: ["/sunnahlife_logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "সুন্নাহলাইফ (Sunnah Life Care)",
  alternateName: ["Sunnah Life Care", "সুন্নাহলাইফ কেয়ার"],
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/sunnahlife_logo.svg`,
  description:
    "কুরআন ও সহীহ সুন্নাহর আলোকে রুকইয়াহ শারইয়্যাহ, আত্মরক্ষা, সেলফ-রুকইয়াহ গাইড, মাসনুন দোয়া ও যিকির এবং নির্ভরযোগ্য শারঈ দিকনির্দেশনা প্ল্যাটফর্ম।",
  telephone: "+8801676820060",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+8801676820060",
      contactType: "customer support",
      areaServed: "BD",
      availableLanguage: ["Bengali", "English", "Arabic"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/sunnahlifecarebd",
    "https://www.facebook.com/groups/403017251404070",
    "https://www.youtube.com/@SunnahLifeCarebd",
    "https://maps.app.goo.gl/qQHmNdEwtJU6apL48",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "সুন্নাহলাইফ",
  alternateName: "Sunnah Life Care",
  url: SITE_CONFIG.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/knowledge?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "সুন্নাহলাইফ রুকইয়াহ শারইয়্যাহ সেন্টার",
  alternateName: "Sunnah Life Care Ruqyah Center",
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/sunnahlife_logo.svg`,
  image: `${SITE_CONFIG.url}/sunnahlife_logo.svg`,
  telephone: "+8801676820060",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  hasMap: "https://maps.app.goo.gl/qQHmNdEwtJU6apL48",
  priceRange: "Free / সুন্নাহ পরামর্শ",
  openingHours: "Mo-Su 09:00-22:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${amiri.variable} bg-[#FAFAF7]`}>
      <head>
        <link
          rel="preload"
          href="/fonts/solaimanlipi-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/solaimanlipi-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Structured Data (JSON-LD) for Search & AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1f2937] antialiased pb-20 md:pb-0 selection:bg-[#006B5B] selection:text-white">
        <Header />
        <main className="flex-1 bg-[#FAFAF7]">{children}</main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
        <OfferPopupModal />
      </body>
    </html>
  );
}
