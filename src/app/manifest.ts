import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "সুন্নাহলাইফ - সুস্থতা হোক সুন্নাহর পথে",
    short_name: "সুন্নাহলাইফ",
    description: "কুরআন ও সহীহ সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়্যাহ ও সেলফ-রুকইয়াহ প্ল্যাটফর্ম",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#006B5B",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/sunnahlife_applogo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
