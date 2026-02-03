import { getBlogPosts } from "@/app/lib/blog";
import { getCombinedHeatmapData, getSortedPostsData } from "@/app/lib/posts";
import Link from "next/link";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import { Github, Mail } from "lucide-react";

export default function HomePage() {
  const latestBlog = getBlogPosts().slice(0, 2);
  const latestArchive = getSortedPostsData().slice(0, 4);
  const heatmapData = getCombinedHeatmapData();

  return (
    <div className="space-y-20 pb-20">
      <section className="pt-12 pb-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            기록하며 성장하는 개발자, <br />
            <span className="text-blue-600">김준호</span>입니다.
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            학습하며 마주한 고민과 해결 과정을 기록으로 남깁니다.{" "}
            <br className="hidden md:block" />
            정제된 생각은{" "}
            <Link
              href="/blog"
              className="text-slate-900 font-medium border-b-2 border-slate-200 hover:border-blue-500 transition-colors"
            >
              블로그
            </Link>
            에서, 공부 기록은{" "}
            <Link
              href="/archive"
              className="text-slate-900 font-medium border-b-2 border-slate-200 hover:border-blue-500 transition-colors"
            >
              아카이브
            </Link>
            에서 확인하실 수 있습니다.
          </p>

          <div className="flex items-center gap-5 mt-8">
            <a
              href="https://github.com/JunhOpportunity"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="mailto:twinjyjh5@gmail.com"
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-bold mb-4">Activity</h2>
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <ActivityHeatmap data={heatmapData} />
        </div>
      </section> */}

      <section className="grid md:grid-cols-2 gap-16">
        {/* --- 1. 최근 블로그 포스트 (정제된 글) --- */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
            >
              전체보기
            </Link>
          </div>

          <div className="space-y-8">
            {latestBlog.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block"
              >
                <article className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
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
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* --- 2. 최근 아카이브 기록 (날것의 기록) --- */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Latest Archive
            </h2>
            <Link
              href="/archive"
              className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
            >
              전체보기
            </Link>
          </div>

          <div className="space-y-1">
            {latestArchive.map((post) => (
              <Link
                key={post.id}
                href={`/archive/${encodeURIComponent(post.id)}`}
                className="group flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-xs font-mono">
                    #
                  </span>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors truncate">
                    {post.title}
                  </span>
                </div>
                <time className="text-[11px] font-mono text-slate-400 shrink-0 ml-4 uppercase">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
