"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";

const PAGE_SIZE = 6;

function monthLabel(month) {
  const [year, value] = month.split("-");
  return `${year.slice(2)}年${Number(value)}月`;
}

function displayDate(date) {
  return date.replaceAll("-", ".");
}

export default function MomentsClient({ moments }) {
  const months = useMemo(() => [...new Set(moments.map((moment) => moment.date.slice(0, 7)))], [moments]);
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("全部");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [query, month]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    return moments.filter((moment) => {
      const matchesMonth = month === "全部" || moment.date.startsWith(month);
      const searchable = [moment.content, ...moment.tags].join(" ").toLocaleLowerCase("zh-CN");
      return matchesMonth && (!normalized || searchable.includes(normalized));
    });
  }, [moments, month, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageMoments = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="page-shell narrow moments-page">
      <header className="moments-heading">
        <span className="moments-kicker">MOMENTS</span>
        <h1 className="section-title">说说 <span>/ 碎碎念</span></h1>
        <p className="section-note">捕捉短暂的念头，也收藏平凡日子里的微光。</p>
      </header>

      <section className="surface moments-tools" aria-label="筛选说说">
        <label className="search-box moments-search">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索说说内容…" aria-label="搜索说说" />
        </label>
        <div className="filter-pills moments-months" aria-label="按月份筛选">
          {["全部", ...months].map((item) => (
            <button className={`filter-pill${month === item ? " active" : ""}`} type="button" onClick={() => setMonth(item)} key={item}>
              {item === "全部" ? `全部 ${moments.length}` : monthLabel(item)}
            </button>
          ))}
        </div>
      </section>

      {pageMoments.length ? (
        <div className="moments-timeline">
          {pageMoments.map((moment) => (
            <article className="surface moment-card" key={moment.id}>
              <span className="moment-dot" aria-hidden="true" />
              <header className="moment-meta">
                <time dateTime={moment.date}>{displayDate(moment.date)}</time>
                {moment.tags.map((tag) => <span className="moment-tag" key={tag}>{tag}</span>)}
              </header>
              <div className="moment-content">
                {moment.content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface moments-empty">
          <span aria-hidden="true">✦</span>
          <h2>暂时没有找到这段记忆</h2>
          <p>换一个关键词或月份试试看吧。</p>
        </div>
      )}

      {pageCount > 1 && (
        <nav className="moments-pagination" aria-label="说说分页">
          <button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>上一页</button>
          <span>{page} / {pageCount}</span>
          <button type="button" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>下一页</button>
        </nav>
      )}
    </main>
  );
}
