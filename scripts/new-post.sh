#!/usr/bin/env bash
# 用法: pnpm new "文章标题" [slug]
# 生成 content/posts/<年>/<slug>/index.md 并打开目录
set -euo pipefail
title="${1:?用法: pnpm new \"文章标题\" [slug]}"
slug="${2:-}"
year=$(date +%Y)
if [ -z "$slug" ]; then
  if command -v python3 >/dev/null && python3 -c "import pypinyin" 2>/dev/null; then
    slug=$(python3 -c "import sys,re;from pypinyin import lazy_pinyin;s='-'.join(lazy_pinyin(sys.argv[1]));print(re.sub(r'-+','-',re.sub(r'[^a-z0-9-]+','-',s.lower())).strip('-'))" "$title")
  else
    slug=$(echo "$title" | tr 'A-Z ' 'a-z-' | tr -cd 'a-z0-9-' )
    [ -z "$slug" ] && slug="post-$(date +%Y%m%d%H%M)"
  fi
fi
dir="content/posts/$year/$slug"
mkdir -p "$dir"
file="$dir/index.md"
[ -e "$file" ] && { echo "已存在: $file"; exit 1; }
cat > "$file" <<MD
---
title: "$title"
date: $(date +%Y-%m-%dT%H:%M:%S+08:00)
tags: []
description: ""
draft: true
---

MD
echo "已创建 $file"
echo "图片直接放在 $dir/ 下，用 ![](./xxx.png) 引用；写完把 draft 改为 false 后 push 即发布。"
