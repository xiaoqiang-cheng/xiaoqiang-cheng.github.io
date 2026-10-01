# discoverpaw.com · 程晓强的个人站点

> 只写 Markdown，`git push` 即发布。线上地址：<https://discoverpaw.com>（国内）· <https://xiaoqiang-cheng.github.io>（海外镜像）

## 写文章（唯一需要做的事）

```bash
pnpm new "文章标题"          # 生成 content/posts/<年>/<slug>/index.md（draft: true）
# …用任意 Markdown 编辑器写作，图片直接丢进同一目录，用 ![](./xxx.png) 引用
# 写完把 draft 改成 false
git add -A && git commit -m "post: 文章标题" && git push
```

不想用脚本也行：手动新建目录和 `index.md`，frontmatter 只需要：

```yaml
---
title: "文章标题"
date: 2026-10-01          # 或 2026-10-01T23:00:00+08:00
tags: [技术, 工具]
description: ""           # 可选，留空自动截取首段
draft: false              # true = 不发布，可跨设备续写
featured: false           # true = 首页置顶
cover: ./cover.jpg        # 可选，分享图
---
```

push 到 `main` 后约 2 分钟：GitHub Actions 构建 → 同时部署到 GitHub Pages 和腾讯云服务器。

支持：数学公式（`$...$` / `$$...$$`）、代码高亮与一键复制、`> [!tip]` 等 Callout、自动目录（正文写一行 `## 目录`）、图片点击放大、全文搜索、RSS、giscus 评论。

## 目录结构

```
content/
├── posts/<年>/<slug>/index.md   文章（图片同目录）
├── projects/*.md               首页与 /projects 的项目卡片
└── pages/about.md              关于页
public/                         原样拷贝：cv/、papers/、og.jpg、favicon
astro-paper.config.ts           站点配置：标题、社交链接、评论、备案号
src/                            主题代码（一般不用动）
scripts/new-post.sh             新建文章
scripts/postbuild-redirects.mjs 旧博客 URL 跳转
.github/workflows/deploy.yml    CI/CD
```

## 本地预览（可选）

```bash
pnpm install
pnpm dev          # http://localhost:4321，草稿可见
pnpm build        # 完整构建 + 搜索索引
```

## 部署架构

```
push main ──► GitHub Actions ──┬──► GitHub Pages  (xiaoqiang-cheng.github.io)
                               └──► rsync ──► 腾讯云 Caddy (discoverpaw.com, canonical)
```

- 服务器端只有静态文件，由 Caddy 提供 HTTPS；CI 使用受限的 `deploy` 用户（rrsync 只允许写站点目录）。
- Secrets：`DEPLOY_SSH_KEY`、`DEPLOY_USER`、`DEPLOY_HOST`、`DEPLOY_KNOWN_HOSTS`。
- 评论基于 GitHub Discussions（giscus），数据在本仓库的 Discussions 中。
- 备案号在 `astro-paper.config.ts` 的 `footer.icp` 填写。

## 旧博客

旧 Pelican 博客（`/blog/*.html`）已迁移到 `content/posts/`，旧链接通过 `scripts/postbuild-redirects.mjs` 自动跳转。
