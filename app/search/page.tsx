"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // 1. Suspense 추가
import { PostData } from "@/app/lib/posts";
import Link from "next/link";

// 2. 검색 로직과 UI를 담은 별도의 컴포넌트
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const getCleanSnippet = (content: string) => {
    return content
      .replace(/#+\s/g, "")
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(!\[.*?\]\(.*?\))/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/(`{1,3})(.*?)\1/g, "$2")
      .replace(/>\s/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .substring(0, 160);
  };

  const Highlight = ({ text, query }: { text: string; query: string }) => {
    if (!query.trim()) return <>{text}</>;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `"${query}" 검색 결과` : "검색어를 입력하세요"}
      </h1>

      {loading ? (
        <div className="text-center py-10">검색 중...</div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          {results.map((post) => (
            <Link
              key={`${post.type}-${post.id}`}
              href={post.type === "blog" ? `/blog/${post.id}` : `/archive/${post.id}`}
              className="block p-6 border rounded-xl hover:border-blue-500 transition-colors bg-white shadow-sm mb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  post.type === "blog" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                }`}>
                  {post.type}
                </span>
                <span className="text-sm text-slate-400 font-medium">{post.category}</span>
              </div>

              <h2 className="text-xl font-bold mt-1">
                <Highlight text={post.title} query={query} />
              </h2>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                {getCleanSnippet(post.content)}...
              </p>
              <div className="text-xs text-slate-400 mt-4">{post.date}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}

// 3. 실제 export되는 페이지 컴포넌트 (Suspense 바운더리 설정)
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">검색 페이지 로딩 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}