import PostCard from "@/components/PostCard";
import { getBlogPosts } from "../lib/blog";
export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="border-slate-100 pb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Blog</h1>
        <p className="text-slate-500 text-lg">
          기록하고 공유하며 함께 성장합니다.
        </p>
      </header>
      {/* 상단 탭 (Velog 스타일 필터) */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex gap-6 border-b-2 border-transparent">
          <button className="pb-2 text-lg font-bold text-slate-900 border-b-2 border-slate-900">트렌딩</button>
          <button className="pb-2 text-lg font-medium text-slate-400 hover:text-slate-600 transition-colors">최신</button>
        </div>
      </div>

      {/* 그리드 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}