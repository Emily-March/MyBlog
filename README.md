# Emily's Blog

一个使用 Next.js App Router 与 Markdown 构建的个人博客。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

## 新增文章

在 `content/posts/` 中新建一个 `.md` 文件，文件名会成为文章地址中的 slug。例如：

```text
content/posts/my-first-post.md
→ /posts/my-first-post
```

每篇文章需要包含 Front Matter：

```yaml
---
title: "文章标题"
date: "2026-08-01"
category: "技术笔记"
tags: ["Next.js", "Markdown"]
excerpt: "显示在首页和归档页的文章摘要。"
cover: "/images/example.jpg"
featured: false
published: true
views: 0
---
```

正文直接使用 Markdown 编写。保存文件后，开发环境会自动刷新；重新构建后，首页、归档页和文章详情页会自动更新。

## 目录说明

- `app/`：Next.js 页面和全站样式
- `components/`：导航、文章卡片、归档筛选等组件
- `content/posts/`：Markdown 文章
- `lib/posts.js`：文章读取、排序、目录和相邻文章逻辑
- `public/images/`：网站图片
- `pages/*.html`：迁移前的静态视觉原型，暂时保留作对照
