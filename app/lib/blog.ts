import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

/**
 * 마크다운 본문에서 첫 번째 이미지 URL을 추출하는 함수
 */
function extractFirstImage(content: string): string | null {
  const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["'].*?>/i;
  const match = content.match(imgRegex);
  return match ? (match[1] || match[2] || null) : null;
}

/**
 * 요약문 추출 함수
 */
function extractSummary(content: string, description?: string): string {
  if (description && description.trim() !== "") return description;

  const plainText = content
    .replace(/[#*`~]/g, "") 
    .replace(/!\[.*\]\(.*\)/g, "") 
    .replace(/\[.*\]\(.*\)/g, "") 
    .replace(/\n+/g, " ") 
    .trim();

  return plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");
}

/**
 * 1. 전체 블로그 포스트 가져오기 (시리즈 정보 포함)
 */
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
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        description: summary,
        category: data.category || "General",
        series: data.series || null, // 시리즈 메타데이터 추가
        thumbnail: firstImage || "",
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 2. 시리즈별로 그룹화된 데이터 가져오기
 */
export function getSeriesPosts() {
  const allPosts = getBlogPosts();
  const seriesMap: { [key: string]: any[] } = {};

  // 시리즈명이 있는 글들만 그룹화
  allPosts.forEach((post) => {
    if (post.series) {
      if (!seriesMap[post.series]) {
        seriesMap[post.series] = [];
      }
      seriesMap[post.series].push(post);
    }
  });

  // 그룹화된 데이터를 배열 형태로 변환
  return Object.keys(seriesMap).map((seriesName) => {
    const posts = seriesMap[seriesName];
    // 이미 getBlogPosts에서 정렬되어 있지만, 안전하게 다시 최신순 정렬
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      name: seriesName,
      posts: sortedPosts,
      count: sortedPosts.length,
      lastUpdated: sortedPosts[0].date,
      thumbnail: sortedPosts[0].thumbnail || "", // 가장 최신글의 썸네일을 시리즈 커버로 사용
    };
  });
}

/**
 * 3. 단일 포스트 데이터 가져오기
 */
export function getBlogPostData(id: string) {
  const fullPath = path.join(blogDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const firstImage = extractFirstImage(content);
  const summary = extractSummary(content, data.description);

  return {
    id,
    title: data.title || id,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: summary,
    category: data.category || "General",
    series: data.series || null,
    thumbnail: firstImage || "",
    content,
  };
}

export function getPostsBySeries(seriesName: string) {
  const allPosts = getBlogPosts();
  return allPosts
    .filter((post) => post.series === seriesName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}