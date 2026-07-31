"use client";

import Image from "next/image";
import { useState } from "react";
import ContactLinks from "./ContactLinks";

const interests = [
  ["阅", "阅读：", "偏好心理学、小说类书籍"],
  ["影", "电影：", "杂食动物，偏爱英美剧"],
  ["音", "音乐：", "唱歌、弹琴（双排键、钢琴、吉他），喜欢Talor Swift"],
  ["泳", "运动：", "游泳（只会蛙泳）、半吊子健身er一枚"],
];

const activities = [
  ["文章", "2026.07.28", "发布了《在清晨的咖啡香中，寻找生活的诗意》"],
  ["博客", "2026.07.25", "完成 Next.js 项目结构与 Markdown 文章系统"],
  ["文章", "2026.07.20", "发布了《盛夏的晚风与未完成的诗》"],
  ["记录", "2026.07.15", "完成归档页与文章详情页的第一版设计"],
  ["起点", "2026.05.06", "决定认真搭建一处属于自己的网络空间"],
];

export default function AboutTabs() {
  const [tab, setTab] = useState("about");
  return (
    <main className="page-shell narrow">
      <div className="about-cover"><Image src="/images/about-hero.jpg" alt="夕阳映照的水面与同行的人" fill priority sizes="(max-width: 720px) 100vw, 896px" /></div>
      <div className="tabs" role="tablist" aria-label="关于页面内容">
        <button className={`tab-button${tab === "about" ? " active" : ""}`} type="button" role="tab" aria-selected={tab === "about"} onClick={() => setTab("about")}>关于我</button>
        <button className={`tab-button${tab === "activity" ? " active" : ""}`} type="button" role="tab" aria-selected={tab === "activity"} onClick={() => setTab("activity")}>动态日志</button>
      </div>
      <section className="surface about-card">
        {tab === "about" ? (
          <div>
            <h1>Hello World, I&apos;m Emily.</h1>
            <h2>关于这个博客</h2>
            <p>这个博客里会记录我在技术、法律相关方向的学习笔记，也会放下一些与生活、成长和自我观察有关的文字。</p>
            <p>我希望它能够成为一处可以长期生长、偶尔回望的个人空间。</p>
            <h2>兴趣爱好</h2>
            <div className="interest-grid">
              {interests.map(([mark, title, text]) => <div className="interest" key={title}><span className="interest-mark">{mark}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}
            </div>
            <h2>联系我</h2>
            <p>如果你对我的博客内容、项目经历等感兴趣，欢迎与我交流。</p>
            <ContactLinks />
          </div>
        ) : (
          <div className="activity-list">
            {activities.map(([type, date, title]) => <article className="activity-item" key={`${date}-${title}`}><span className="activity-dot" /><div className="activity-content"><div className="activity-meta"><span className="activity-type">{type}</span><time>{date}</time></div><h3>{title}</h3></div></article>)}
          </div>
        )}
      </section>
    </main>
  );
}
