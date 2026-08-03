"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { navigationLinks } from "@/lib/navigation";
import Icon from "./Icon";
import PostCard from "./PostCard";
import ProfileCard from "./ProfileCard";
import useViewCounts from "./useViewCounts";

const homeNavigationLinks = navigationLinks.filter((link) => link.href !== "/");

export default function HomeFeed({ posts, categories }) {
  const [query, setQuery] = useState("");
  const viewCounts = useViewCounts(posts);
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  const filtered = useMemo(() => posts.filter((post) => {
    const haystack = [post.title, post.excerpt, post.category, ...post.tags].join(" ").toLocaleLowerCase("zh-CN");
    return !normalized || haystack.includes(normalized);
  }), [normalized, posts]);
  const tagCount = new Set(posts.flatMap((post) => post.tags)).size;

  return (
    <>
      <div className="home-search-bridge">
        <label className="search-box">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索文章、标签或关键词…" aria-label="搜索文章" />
          <span className="search-hint">Enter</span>
        </label>
      </div>
      <main className="home-content" id="latest">
        <div className="home-grid">
          <aside className="sidebar">
            <ProfileCard postCount={posts.length} tagCount={tagCount} categoryCount={Object.keys(categories).length} />
            <section className="surface mini-card">
              <h3>导航</h3>
              <nav className="home-navigation-list" aria-label="首页快捷导航">
                {homeNavigationLinks.map((link) => (
                  <Link className="home-navigation-link" href={link.href} key={link.href}>
                    <Icon name={link.icon} size={19} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </section>
          </aside>
          <section className="posts-column">
            <div className="posts-heading">
              <div><h2 className="section-title">最新文章</h2><p className="section-note">记录正在学习与感受的事情。</p></div>
              <span className="posts-count">{filtered.length} 篇</span>
            </div>
            {filtered.length ? <div className="post-list">{filtered.map((post) => <PostCard post={{ ...post, views: viewCounts[post.slug] ?? post.views }} key={post.slug} />)}</div> : <div className="surface empty-state">没有找到与“{query}”相关的文章。</div>}
          </section>
        </div>
      </main>
    </>
  );
}
