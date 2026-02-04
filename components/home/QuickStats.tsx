import { getBlogPosts } from "@/app/lib/blog";
import { getPostsByCategory, getSortedPostsData } from "@/app/lib/posts";
import Counter from "../Counter";

export default function QuickStats() {
  const allBlogPosts = getBlogPosts();
  const allArchivePosts = getSortedPostsData();
  const categories = getPostsByCategory(); // 시리즈/카테고리 데이터

  const totalPosts = allBlogPosts.length + allArchivePosts.length;
  const totalSeries = Object.keys(categories).length;

  const stats = [
    { label: "Total Posts", value: totalPosts },
    { label: "Blog", value: allBlogPosts.length },
    { label: "Archive", value: allArchivePosts.length },
    { label: "Series", value: totalSeries }, // Learning Days 대신 Series 추가
  ];

  return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-100">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-[10px] font-[900] text-slate-400 uppercase tracking-[0.2em]">
              {stat.label}
            </span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {/* 숫자에만 카운트 애니메이션 적용 */}
              <Counter value={stat.value as number} />
            </span>
          </div>
        ))}
      </section>
  );
}
