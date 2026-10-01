---
title: "站点重构：只写 Markdown，推送即发布"
date: 2026-10-01T23:00:00+08:00
tags: [站点, 工具]
description: "新站点基于 Astro 构建，文章用 Markdown 托管在 GitHub，push 后自动同步到国内外两处。"
draft: false
---

这个站点现在只需要在 `content/posts/` 下写 Markdown，`git push` 之后由 GitHub Actions 自动构建，并同时发布到 GitHub Pages 和 discoverpaw.com。

## 目录

## 写一篇文章

```bash
pnpm new "文章标题"
```

会生成 `content/posts/<年>/<slug>/index.md`，图片直接放在同一目录，用 `![](./图片.png)` 引用。

## 公式与代码

行内公式 $E = mc^2$，块级公式：

$$
\mathcal{L} = \sum_i \left\| y_i - f(x_i) \right\|^2
$$

```python title="demo.py"
def hello(name: str) -> str:
    return f"hello, {name}"
```

> [!tip]
> `draft: true` 的文章不会发布，可以跨设备续写。
