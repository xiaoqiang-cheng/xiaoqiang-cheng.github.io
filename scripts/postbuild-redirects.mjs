// 为旧 Pelican 博客的 URL 生成跳转页，避免外链失效。
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const redirects = {
  // 旧博客位于 /blog/<slug>.html，新文章位于 /posts/<slug>/
  "blog/index.html": "/posts/",
  "blog/archives.html": "/archives/",
  "blog/tags.html": "/tags/",
  "blog/categories.html": "/tags/",
  "blog/pages/about.html": "/about/",
  "blog/my-super-post.html": "/posts/xie-zai-da-gong-liang-zhou-nian/",
};
const slugs = [
  "ba-yue-da-shi-ji","du-shu-bi-ji-fei-bao-li-gou-tong-day1","er-ling-er-yi-hui-yi-xiao-ji",
  "ling-jiu-yao-qi-tie-dan-ce-ping-bao-gao-yu-hu-si-luan-xiang","ling-si-yao-qi","ovizshi-yong-shou-ce",
  "sui-sui-nian-de-zi-yan-zi-yu","wo-zui-yu-mian-qing-qie-qu-ming-zhao-you-yi-bao-qin-lai",
  "xie-zai-2021nian-qi-yue-chu-wu","xie-zai-2022nian-qi-yue-chu-wu","xie-zai-da-gong-liang-zhou-nian",
  "xie-zai-da-gong-yi-zhou-nian","zhan-zai-shen-yuan-wang-tian-tang",
];
for (const s of slugs) redirects[`blog/${s}.html`] = `/posts/${s}/`;

const dist = "dist";
let n = 0;
for (const [from, to] of Object.entries(redirects)) {
  const target = join(dist, from);
  if (existsSync(target)) continue;
  mkdirSync(join(target, ".."), { recursive: true });
  writeFileSync(
    target,
    `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>Redirecting…</title><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)})</script></head><body><a href="${to}">${to}</a></body></html>\n`
  );
  n++;
}
console.log(`[redirects] wrote ${n} legacy redirect pages`);
