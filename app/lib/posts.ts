import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/raw-github");

export interface PostData {
  id: string;
  title: string;
  date: string;
  created_at: string;
  category: string;
  content: string;
}

// lib/posts.ts

export function getPostsByCategory() {
  const allPosts = getSortedPostsData();
  const categories: Record<string, { 
    posts: typeof allPosts, 
    startDate: string, 
    endDate: string,
    durationMonths: number, // 학습 기간(개월) 추가
    isLearning: boolean     // 학습 중 여부 추가
  }> = {};

  allPosts.forEach((post) => {
    const category = post.category || 'General';
    if (!categories[category]) {
      categories[category] = {
        posts: [],
        startDate: post.created_at || post.date,
        endDate: post.date,
        durationMonths: 0,
        isLearning: false
      };
    }

    categories[category].posts.push(post);

    // 날짜 업데이트 로직 (생략 - 이전과 동일)
    const postDate = new Date(post.date);
    const postCreatedAt = new Date(post.created_at || post.date);
    
    if (postCreatedAt < new Date(categories[category].startDate)) {
      categories[category].startDate = post.created_at || post.date;
    }
    if (postDate > new Date(categories[category].endDate)) {
      categories[category].endDate = post.date;
    }
  });

  // 기간 계산 및 학습 중 상태 판별
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  Object.keys(categories).forEach(name => {
    const cat = categories[name];
    const start = new Date(cat.startDate);
    const end = new Date(cat.endDate);

    // 1. 개월 수 계산
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    cat.durationMonths = months <= 0 ? 1 : months + 1; // 최소 1개월로 표시

    // 2. 최근 일주일 이내 기록이 있다면 '학습 중'
    cat.isLearning = end >= oneWeekAgo;
  });

  return categories;
}
// 1. 이미지를 GitHub Raw URL로 바꾸는 유틸리티 함수
function fixImagePaths(
  content: string,
  owner: string,
  repo: string,
  path: string
) {
  // 현재 파일이 들어있는 폴더 경로 추출
  const directory = path.split("/").slice(0, -1).join("/");
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${directory}`;

  // 마크다운 이미지 문법 ![alt](path) 찾기 (상대 경로인 경우만)
  return content.replace(
    /!\[(.*?)\]\((?!http)(.*?)\)/g,
    (match, alt, imgPath) => {
      // 상대 경로 앞의 ./ 제거 후 절대 경로 URL 생성
      const cleanImgPath = imgPath.startsWith("./")
        ? imgPath.substring(2)
        : imgPath;
      return `![${alt}](${baseUrl}/${cleanImgPath})`;
    }
  );
}

export function getSortedPostsData(): PostData[] {
  // 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // gray-matter로 메타데이터와 본문 분리
      const { data, content } = matter(fileContents);
      const owner = "JunhOpportunity"; // 본인 아이디
      const repo = id.split("_")[0]; // 파일명 규칙에 따라 추출

      const fixedContent = fixImagePaths(content, owner, repo, data.path || "");

      // 1. 본문에서 첫 번째 H1 (# 제목) 찾기
      const h1Match = content.match(/^#\s+(.*)$/m);
      const extractedTitle = h1Match ? h1Match[1].trim() : data.title || id;

      // 2. 파일명에서 카테고리 추출 (파일명: 레포명_경로_README.md)
      const category = id.split("_")[0] || "General";

      return {
        id,
        title: extractedTitle, // 추출된 제목 사용
        date: data.date || "",
        created_at: data.created_at || "",
        category,
        content,
      } as PostData;
    });

  // 날짜 기준 최신순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
