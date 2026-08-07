"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactLinks from "./ContactLinks";

const interests = [
  ["阅读：", "偏好心理学、女性主义、小说类书籍"],
  ["电影：", "杂食动物，偏爱英美剧"],
  ["音乐：", "唱歌、弹琴，喜欢R&B"],
  ["运动：", "游泳（只会蛙泳）、半吊子健身er一枚"],
];

function displayDate(date) {
  return date.replaceAll("-", "/");
}

export default function AboutTabs({ activities, initialTab = "about" }) {
  const [tab, setTab] = useState(initialTab);
  return (
    <main className="page-shell narrow">
      <div className="about-cover"><Image src="/images/about-hero.jpg" alt="夕阳映照的水面与同行的人" fill priority sizes="(max-width: 720px) 100vw, 896px" /></div>
      <div className="tabs" role="tablist" aria-label="关于页面内容">
        <button className={`tab-button${tab === "about" ? " active" : ""}`} type="button" role="tab" aria-selected={tab === "about"} onClick={() => setTab("about")}>关于我</button>
        <button className={`tab-button${tab === "activity" ? " active" : ""}`} type="button" role="tab" aria-selected={tab === "activity"} onClick={() => setTab("activity")}>动态日志</button>
      </div>
      <section className={tab === "about" ? "surface about-card" : "about-card activity-panel"}>
        {tab === "about" ? (
          <div>
            <h1>Hello World, I&apos;m Emily.</h1>
            <h2>关于这个博客</h2>
            <p>去年的时候，我就有想法搭建一个个人博客，但那个时候只是了解一些前端知识，个人技术知识储备尚不足以支撑我搭建一个完整的网站。非常庆幸能够生在这个时代，虽然并不是很了解技术，但能通过vibe coding，将自己心中的想法一点一点描绘勾勒出来，我非常享受这样创作的过程。</p>
            <p>这个博客里会记录我在技术、法律相关方向的学习笔记，也会放下一些与生活、成长和自我观察有关的文字。</p>
            <p>我希望它能够成为一处可以长期生长、偶尔回望的个人空间。</p>
            <h2>兴趣爱好</h2>
            <ul className="interest-copy">
              {interests.map(([title, text]) => <li key={title}><strong>{title}</strong>{text}</li>)}
            </ul>
            <h2>联系我</h2>
            <p>如果你对我的博客内容、项目经历等感兴趣，欢迎与我交流。</p>
            <ContactLinks />
          </div>
        ) : (
          <div className="activity-list">
            {activities.length ? activities.map((activity) => (
              <Link className="surface activity-item" href={activity.href} key={activity.id}>
                <span className={`activity-type activity-type-${activity.type === "文章" ? "post" : "moment"}`}>{activity.type}</span>
                <strong>{activity.title}</strong>
                <time dateTime={activity.date}>{displayDate(activity.date)}</time>
              </Link>
            )) : <div className="surface empty-state">还没有可以展示的动态。</div>}
          </div>
        )}
      </section>
    </main>
  );
}
