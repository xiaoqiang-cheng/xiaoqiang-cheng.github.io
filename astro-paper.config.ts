import { defineAstroPaperConfig } from "./src/types/config";

/**
 * 站点配置：改这里即可，不需要碰 src/ 下的代码。
 */
export default defineAstroPaperConfig({
  site: {
    url: "https://discoverpaw.com",
    title: "程晓强",
    description: "自动驾驶感知算法工程师的个人站点：技术笔记、工具分享与生活随笔。",
    author: "程晓强 Xiaoqiang Cheng",
    profile: "https://discoverpaw.com/about/",
    ogImage: "og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/xiaoqiang-cheng/xiaoqiang-cheng.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/xiaoqiang-cheng", linkTitle: "GitHub" },
    { name: "zhihu", url: "https://www.zhihu.com/people/cheng-xiao-21-61", linkTitle: "知乎" },
    { name: "mail", url: "mailto:xiaoqiang.cheng@foxmail.com", linkTitle: "邮件" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=", linkTitle: "分享到 X" },
    { name: "mail", url: "mailto:?subject=推荐一篇文章&body=", linkTitle: "通过邮件分享" },
  ],
  comments: {
    // giscus：基于 GitHub Discussions 的评论系统。repoId / categoryId 可通过 gh api graphql 查询仓库 id 与 discussionCategories 获取。
    provider: "giscus",
    repo: "xiaoqiang-cheng/xiaoqiang-cheng.github.io",
    repoId: "R_kgDOMiHiYQ",
    category: "Announcements",
    categoryId: "DIC_kwDOMiHiYc4DG0kO",
  },
  footer: {
    // 备案号：留空则不显示
    icp: "",
    // 公安备案（可选）
    gongan: "",
  },
});
