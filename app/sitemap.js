import { getPostSummaries } from "@/lib/posts";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = ["", "/archive", "/music", "/moments", "/about"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
  const posts = getPostSummaries().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00+08:00`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...posts];
}
