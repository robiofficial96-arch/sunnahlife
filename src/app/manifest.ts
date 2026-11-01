import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে",
    short_name: "সুন্নাহলাইফ",
    description: "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ ও সেলফ-রুকইয়াহ প্ল্যাটফর্ম",
    start_url: "/",
    id: "/?pwa=sunnahlife-v4",
    display: "standalone",
    background_color: "#F4FAFD",
    theme_color: "#20A9DF",
    icons: [
      {
        src: "/icon-192-v4.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-v4.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-v4.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
