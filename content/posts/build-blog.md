---
title: "从零搭建个人博客的那些事"
date: "2026-07-15"
category: "技术笔记"
tags: ["Next.js", "Markdown", "博客"]
excerpt: "从静态页面原型出发，逐步建立组件、文章数据层和可维护的内容工作流。"
views: 153
---

一个真正能够长期写作的博客，不应该要求作者每次发布文章都手动修改首页。

## 为什么选择 Markdown

Markdown 足够简单，也足够稳定。文章正文与界面代码彼此独立，迁移平台时也更轻松。

## Front Matter 是什么

每篇文章顶部的 Front Matter 用来描述文章信息：

```yaml
title: "文章标题"
date: "2026-07-15"
category: "技术笔记"
tags: ["Next.js", "Markdown"]
```

## 自动生成页面

Next.js 在构建时读取 Markdown 文件，并为每个 slug 生成详情页。首页和归档页读取的是同一份数据，因此不会出现内容不同步的问题。
