"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";

const PAGE_SIZE = 8;

export default function ArchiveClient({ posts, initialCategory = "全部" }) {
  const categories = useMemo(() => ["全部", ...new Set(posts.map((post) => post.category))], [posts]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "全部");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [query, category]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    return posts.filter((post) => {
      const matchesCategory = category === "全部" || post.category === category;
      const searchable = [post.title, post.excerpt, post.category, ...post.tags].join(" ").toLocaleLowerCase("zh-CN");
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [category, posts, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const grouped = pagePosts.reduce((result, post) => {
    const year = post.date.slice(0, 4);
    (result[year] ||= []).push(post);
    return result;
  }, {});

  return (
    <main className="page-shell narrow">
      <section className="surface archive-head">
        <h1 className="section-title">归档</h1>
        <p className="section-note">沿着时间线，重新遇见写过的文字。</p>
        <label className="search-box archive-search">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜寻被封存的知识…" aria-label="搜索归档" />
        </label>
        <div className="filter-pills" aria-label="文章分类">
          {categories.map((item) => (
            <button className={`filter-pill${category === item ? " active" : ""}`} type="button" onClick={() => setCategory(item)} key={item}>
              {item} {item === "全部" ? posts.length : posts.filter((post) => post.category === item).length}
            </button>
          ))}
        </div>
      </section>

      {pagePosts.length ? (
        <div className="archive-years">
          {Object.entries(grouped).map(([year, yearPosts]) => (
            <section className="year-group" key={year}>
              <h2 className="year-label">{year}</h2>
              <div className="timeline">
                {yearPosts.map((post) => (
                  <Link className="surface archive-item" href={`/posts/${post.slug}`} key={post.slug}>
                    <time className="archive-date">{post.date.slice(5).replace("-", ".")}</time>
                    <div className="archive-main">
                      <h3 className="archive-title">{post.title}</h3>
                      <div className="archive-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}<span>· {post.views} 次阅读</span></div>
                    </div>
                    <span className="archive-category">{post.category}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : <div className="surface empty-state">没有找到符合条件的文章。</div>}

      {pageCount > 1 && (
        <nav className="filter-pills" aria-label="归档分页" style={{ justifyContent: "center", marginTop: "2rem" }}>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button className={`filter-pill${page === number ? " active" : ""}`} type="button" onClick={() => setPage(number)} key={number}>{number}</button>
          ))}
        </nav>
      )}
    </main>
  );
}
