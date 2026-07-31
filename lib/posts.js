import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function normalizePost(slug, data, content) {
  const stats = readingTime(content);
  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date).slice(0, 10) : "1970-01-01",
    category: data.category || "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt || content.replace(/[#>*_`\[\]()]/g, "").trim().slice(0, 120),
    cover: data.cover || "",
    featured: Boolean(data.featured),
    published: data.published !== false,
    views: Number(data.views || 0),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
}

function readPostFile(fileName) {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  return { ...normalizePost(slug, data, content), content };
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPostFile)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostSummaries() {
  return getAllPosts().map(({ content, ...post }) => post);
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

function plainHeadingText(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function extractHeadings(content) {
  const slugger = new GithubSlugger();
  const headings = [];
  for (const line of content.split(/\r?\n/)) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = plainHeadingText(match[2]);
    headings.push({ level: match[1].length, text, id: slugger.slug(text) });
  }
  return headings;
}

function addHeadingIds(markup, headings) {
  let headingIndex = 0;
  return markup.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (match, level, body) => {
    const heading = headings[headingIndex++];
    if (!heading) return match;
    return `<h${level} id="${heading.id}">${body}</h${level}>`;
  });
}

export async function getPostBySlug(slug) {
  const safeSlug = decodeURIComponent(slug);
  if (!/^[a-zA-Z0-9\u4e00-\u9fff_-]+$/.test(safeSlug)) return null;
  const filePath = path.join(postsDirectory, `${safeSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const post = readPostFile(`${safeSlug}.md`);
  if (!post.published) return null;
  const headings = extractHeadings(post.content);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(post.content);
  const html = addHeadingIds(processed.toString(), headings);
  const { content, ...metadata } = post;
  return { ...metadata, html, headings };
}

export function getAdjacentPosts(slug) {
  const posts = getPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: posts[index + 1] || null,
    next: posts[index - 1] || null,
  };
}

export function getCategories(posts = getPostSummaries()) {
  return posts.reduce((result, post) => {
    result[post.category] = (result[post.category] || 0) + 1;
    return result;
  }, {});
}

export function formatPostDate(date, options = {}) {
  const value = new Date(`${date}T00:00:00+08:00`);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  }).format(value).replaceAll("/", ".");
}
