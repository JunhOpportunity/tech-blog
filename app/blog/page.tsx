// app/blog/page.tsx
import { getBlogPosts } from "@/app/lib/blog";
import Link from "next/link";

export default function BlogListPage() {
  const allPosts = getBlogPosts();

  return (
    <div className="mx-auto space-y-12">
      <header className="border-b border-slate-100 pb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Blog</h1>
        <p className="text-slate-500 text-lg">
          기록하고 공유하며 함께 성장합니다.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {allPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <article className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                    No Image
                  </div>
                )}
              </div>

              {/* 텍스트 정보 */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {post.category}
                  </span>
                  <time className="text-xs text-slate-400">
                    {new Date(post.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
