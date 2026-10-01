/** 从 Markdown 正文截取纯文本摘要，用于没有填写 description 的文章。 */
export function excerpt(body: string | undefined, max = 90): string {
  if (!body) return "";
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s.*$/gm, " ")
    .replace(/[*_`>|#]/g, "")
    .replace(/\$[^$]*\$/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/[，。；、,.;:\s]+$/, "") + "…";
}
