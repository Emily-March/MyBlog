import Hero from "@/components/Hero";
import HomeFeed from "@/components/HomeFeed";
import { getCategories, getPostSummaries } from "@/lib/posts";

export default function HomePage() {
  const posts = getPostSummaries();
  return (
    <>
      <Hero />
      <HomeFeed posts={posts} categories={getCategories(posts)} />
    </>
  );
}
