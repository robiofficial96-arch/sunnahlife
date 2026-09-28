import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অ্যাডমিন ড্যাশবোর্ড | সুন্নাহলাইফ",
  description: "সুন্নাহলাইফ প্রশাসনিক ব্যবস্থাপনা",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
