import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getBlogPosts } from "./blog";
import { getGithubCommits } from "./github";

const postsDirectory = path.join(process.cwd(), "content/archive");

export interface PostData {
  id: string;
  title: string;
  date: string;
  created_at: string;
  category: string;
  content: string;
  isLearning?: boolean;
  type?: "blog" | "archive";
}

// 1. 이미지를 중앙 리포지토리(knowledge-database)의 Raw URL로 변환
function fixImagePaths(content: string, category: string, fileName: string) {
  const owner = "JunhOpportunity";
  const repo = "knowledge-database"; // 중앙 리포지토리 이름 고정
  // 중앙 리포지토리 구조가 content/archive/카테고리/파일.md 이므로 경로 설정
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/content/archive/${category}`;

  return content.replace(
    /!\[(.*?)\]\((?!http)(.*?)\)/g,
    (match, alt, imgPath) => {
      const cleanImgPath = imgPath.startsWith("./")
        ? imgPath.substring(2)
        : imgPath;
      return `![${alt}](${baseUrl}/${cleanImgPath})`;
    }
  );
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];

  // 카테고리 폴더 리스트를 가져옵니다 (예: ['코딩테스트', 'React', ...])
  const categories = fs.readdirSync(postsDirectory);
  let allPostsData: PostData[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category);

    // 디렉토리인 경우에만 내부 md 파일들을 읽습니다.
    if (fs.statSync(categoryPath).isDirectory()) {
      const fileNames = fs.readdirSync(categoryPath);

      fileNames.forEach((fileName) => {
        if (fileName.endsWith(".md")) {
          const id = `${category}/${fileName.replace(/\.md$/, "")}`;
          const fullPath = path.join(categoryPath, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");

          const { data, content } = matter(fileContents);

          // 이미지 경로 수정 로직 적용
          const fixedContent = fixImagePaths(content, category, fileName);

          allPostsData.push({
            id,
            title: data.title || fileName.replace(/\.md$/, ""),
            date: data.date || "",
            created_at: data.created_at || data.date || "",
            category: category, // 폴더명을 카테고리로 사용
            content: fixedContent,
          } as PostData);
        }
      });
    }
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// --- 아래 함수들은 기존 로직을 유지하면서 위에서 바뀐 getSortedPostsData를 호출하여 정상 작동합니다 ---

export function getPostDataWithNav(id: string) {
  const allPosts = getSortedPostsData();

  // 1. 현재 포스트를 먼저 찾습니다.
  const currentPost = allPosts.find((p) => p.id === id);
  if (!currentPost) return null;

  // 2. 현재 포스트와 '같은 카테고리'에 있는 글들만 필터링합니다.
  const categoryPosts = allPosts.filter(
    (p) => p.category === currentPost.category
  );

  // 3. 같은 카테고리 내에서 현재 글의 위치(index)를 찾습니다.
  const postIndex = categoryPosts.findIndex((p) => p.id === id);

  // 4. 같은 카테고리 배열 안에서만 앞뒤를 결정합니다.
  // 최신순 정렬이므로 index + 1이 과거글(이전), index - 1이 최신글(다음)입니다.
  const prevPost =
    postIndex < categoryPosts.length - 1 ? categoryPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? categoryPosts[postIndex - 1] : null;

  return {
    post: currentPost, // 전체 데이터를 반환
    prevPost: prevPost ? { id: prevPost.id, title: prevPost.title } : null,
    nextPost: nextPost ? { id: nextPost.id, title: nextPost.title } : null,
  };
}

export function getPostsByCategory() {
  const allPosts = getSortedPostsData();
  const categories: Record<string, any> = {};

  allPosts.forEach((post) => {
    const category = post.category || "General";
    if (!categories[category]) {
      categories[category] = {
        posts: [],
        startDate: post.date,
        endDate: post.date,
        durationMonths: 0,
        isLearning: false,
      };
    }

    categories[category].posts.push(post);

    if (new Date(post.date) < new Date(categories[category].startDate)) {
      categories[category].startDate = post.date;
    }
    if (new Date(post.date) > new Date(categories[category].endDate)) {
      categories[category].endDate = post.date;
    }
  });

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  Object.keys(categories).forEach((name) => {
    const cat = categories[name];
    const start = new Date(cat.startDate);
    const end = new Date(cat.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    cat.durationMonths = months <= 0 ? 1 : months + 1;
    cat.isLearning = end >= oneWeekAgo;
  });

  return categories;
}

// 히트맵 관련 함수들 (기존 유지)
export function getCombinedHeatmapData() {
  const allArchive = getSortedPostsData();
  const allBlog = getBlogPosts();
  const dataMap: Record<string, any> = {};

  allArchive.forEach((post) => {
    const date = post.date.split("T")[0];
    if (!dataMap[date]) dataMap[date] = { date, archiveCount: 0, blogCount: 0 };
    dataMap[date].archiveCount += 1;
  });

  allBlog.forEach((post) => {
    const date = post.date.split("T")[0];
    if (!dataMap[date]) dataMap[date] = { date, archiveCount: 0, blogCount: 0 };
    dataMap[date].blogCount += 1;
  });

  return Object.values(dataMap);
}

export async function getFinalHeatmapData() {
  const archivePosts = getSortedPostsData();
  const blogPosts = getBlogPosts();
  const githubCommits = await getGithubCommits();
  const dataMap: Record<string, any> = {};

  Object.entries(githubCommits).forEach(([date, count]) => {
    dataMap[date] = { date, count: count as number, type: "commit" };
  });

  archivePosts.forEach((p) => {
    const date = p.date.split("T")[0];
    dataMap[date] = {
      date,
      count: (dataMap[date]?.count || 0) + 1,
      type: "archive",
    };
  });

  blogPosts.forEach((p) => {
    const date = p.date.split("T")[0];
    dataMap[date] = {
      date,
      count: (dataMap[date]?.count || 0) + 1,
      type: "blog",
    };
  });

  return Object.values(dataMap);
}
