import { getPostDataWithNav, getSortedPostsData } from "@/app/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function ArchivePostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // slug는 ['코딩테스트', '4주차'] 배열로 들어옵니다. 이를 "코딩테스트/4주차"로 합칩니다.
  const decodedId = slug.map((part) => decodeURIComponent(part)).join("/");

  const data = getPostDataWithNav(decodedId);

  if (!data) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-red-500 font-bold">포스트를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  const { post, prevPost, nextPost } = data;

  return (
    // 1. 전체 컨테이너: relative를 주어 aside의 absolute 위치 기준점을 잡습니다.
    <div className="relative max-w-7xl mx-auto px-4 md:px-8">
      {/* 2. 본문 영역: mx-auto로 화면 정중앙에 고정합니다. */}
      <article className="max-w-3xl mx-auto py-8 lg:py-12 min-w-0">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            {post.isLearning && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Active Learning
              </span>
            )}
          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          <time className="text-slate-400 text-sm font-mono uppercase">
            Updated:{" "}
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        {/* 마크다운 본문 */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* 하단 내비게이션 카드 */}
        <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between">
          {prevPost ? (
            <Link
              href={`/archive/${prevPost.id}`}
              className="flex-1 group p-5 border rounded-2xl hover:border-orange-500 transition-all bg-white dark:bg-slate-900 shadow-sm"
            >
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                Previous Record
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-orange-600 truncate mt-1">
                ← {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link
              href={`/archive/${nextPost.id}`}
              className="flex-1 group p-5 border rounded-2xl hover:border-orange-500 transition-all bg-white dark:bg-slate-900 shadow-sm text-right"
            >
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                Next Record
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-orange-600 truncate mt-1">
                {nextPost.title} →
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </footer>
      </article>

      {/* 3. 목차 영역: 본문과 겹치지 않게 우측 여백에 절대 위치로 배치 */}
      <aside className="hidden xl:block absolute inset-y-0 left-[calc(50%+24rem)] w-64">
        <div className="sticky top-24 pt-12">
          {/* h1, h2만 추출하도록 수정된 TOC 컴포넌트 */}
          <TableOfContents content={post.content} />
        </div>
      </aside>
    </div>
  );
}
