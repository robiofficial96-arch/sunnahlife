import { MetadataRoute } from "next";
import { TOPICS_DATA } from "@/data/topics";
import { ARTICLES_LIST } from "@/data/articles";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes = [
    "",
    "/assessment",
    "/services",
    "/knowledge",
    "/routine",
    "/self-ruqyah",
    "/articles",
    "/topics",
    "/ayat",
    "/audio",
    "/duas",
    "/practitioners",
    "/resources",
    "/appointment",
    "/faq",
    "/fraud-awareness",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const topicRoutes = TOPICS_DATA.map((topic) => ({
    url: `${baseUrl}/topics/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articleRoutes = ARTICLES_LIST.map((art) => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...topicRoutes, ...articleRoutes];
}
