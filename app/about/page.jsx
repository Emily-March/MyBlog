import AboutTabs from "@/components/AboutTabs";
import { getMoments } from "@/lib/moments";
import { getPostSummaries } from "@/lib/posts";

export const metadata = { title: "关于", description: "关于 Emily 和这个博客。" };

export default async function AboutPage({ searchParams }) {
  const params = await searchParams;
  const activities = [
    ...getPostSummaries().map((post) => ({
      id: `post-${post.slug}`,
      type: "文章",
      date: post.date,
      title: post.title,
      href: `/posts/${post.slug}`,
    })),
    ...getMoments().map((moment) => ({
      id: `moment-${moment.id}`,
      type: "说说",
      date: moment.date,
      title: moment.content.replace(/\s+/g, " ").trim(),
      href: `/moments#moment-${moment.id}`,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return <AboutTabs activities={activities} initialTab={params?.tab === "activity" ? "activity" : "about"} />;
}
