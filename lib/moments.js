import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const momentsDirectory = path.join(process.cwd(), "content", "moments");

function readMoment(fileName) {
  const fullPath = path.join(momentsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  return {
    id: fileName.replace(/\.md$/, ""),
    date: data.date ? String(data.date).slice(0, 10) : "1970-01-01",
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: content.trim(),
    published: data.published !== false,
  };
}

export function getMoments() {
  if (!fs.existsSync(momentsDirectory)) return [];

  return fs.readdirSync(momentsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readMoment)
    .filter((moment) => moment.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}
