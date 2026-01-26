import { getBlogPosts, getSeriesPosts } from "../lib/blog";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const allPosts = getBlogPosts();
  const seriesData = getSeriesPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="pb-10">
        <h1 className="text-4xl font-bold mb-2">
          Blog
        </h1>
        <p className="text-gray-500">
          지식의 파편을 모아 단단한 기록으로 남깁니다.
        </p>
      </header>
      <BlogClient allPosts={allPosts} seriesData={seriesData} />
    </div>
  );
}
