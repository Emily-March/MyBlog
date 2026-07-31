import ArchiveClient from "@/components/ArchiveClient";
import { getPostSummaries } from "@/lib/posts";

export const metadata = { title: "归档", description: "按时间、分类与关键词浏览 Emily 的文章。" };

export default async function ArchivePage({ searchParams }) {
  const params = await searchParams;
  return <ArchiveClient posts={getPostSummaries()} initialCategory={params?.category || "全部"} />;
}
