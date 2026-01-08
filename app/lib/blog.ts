import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

/**
 * 마크다운 본문에서 첫 번째 이미지 URL을 추출하는 함수
 */
function extractFirstImage(content: string): string | null {
  // 마크다운 이미지 패턴: ![alt](url) 또는 HTML 이미지 패턴: <img src="url" ...>
  const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["'].*?>/i;
  const match = content.match(imgRegex);

  if (match) {
    // match[1]은 마크다운 패턴 URL, match[2]는 HTML 패턴 URL
    return match[1] || match[2] || null;
  }
  return null;
}

function extractSummary(content: string, description?: string): string {
  // 1. 메타데이터에 설명이 있으면 우선 사용
  if (description) return description;

  // 2. 없으면 본문에서 마크다운 문법(이미지, 링크 등)을 제거하고 순수 텍스트만 추출
  const plainText = content
    .replace(/[#*`~]/g, "") // 특수문자 제거
    .replace(/!\[.*\]\(.*\)/g, "") // 이미지 제거
    .replace(/\[.*\]\(.*\)/g, "") // 링크 제거
    .replace(/\n+/g, " ") // 줄바꿈을 공백으로
    .trim();

  // 3. 앞부분 120자만 잘라서 반환
  return plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");
}

export function getBlogPosts() {
  if (!fs.existsSync(blogDirectory)) return [];

  const fileNames = fs.readdirSync(blogDirectory);

  return fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const firstImage = extractFirstImage(content);
      const summary = extractSummary(content, data.description);

      return {
        id,
        title: data.title || id,
        // 날짜가 문자열이 아닌 Date 객체로 올 수 있어 처리 추가
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        description: summary,
        category: data.category || "General",
        thumbnail: firstImage || "",
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 단일 포스트를 가져올 때도 동일하게 적용하기 위한 함수 (필요 시 활용)
 */
export function getBlogPostData(id: string) {
  const fullPath = path.join(blogDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const firstImage = extractFirstImage(content);

  return {
    id,
    title: data.title || id,
    date: data.date || new Date().toISOString(),
    thumbnail: firstImage || "",
    ...data,
    content,
  };
}
