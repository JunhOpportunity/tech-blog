"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostData } from "@/app/lib/posts";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const getCleanSnippet = (content: string) => {
    return content
      .replace(/#+\s/g, "") // H1, H2 등 제목 기호 제거
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // 굵게 제거
      .replace(/(!\[.*?\]\(.*?\))/g, "") // 이미지 링크 제거
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // 링크 텍스트만 유지
      .replace(/(`{1,3})(.*?)\1/g, "$2") // 코드 블록 기호 제거
      .replace(/>\s/g, "") // 인용구 기호 제거
      .replace(/\n+/g, " ") // 줄바꿈을 공백으로 변경
      .trim()
      .substring(0, 160); // 160자까지만 자르기
  };

  const Highlight = ({ text, query }: { text: string; query: string }) => {
    if (!query.trim()) return <>{text}</>;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-yellow-200 text-slate-900 rounded-sm px-0.5"
            >
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
      // 검색 로직을 처리할 API 호출
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
              href={
                post.type === "blog"
                  ? `/blog/${post.id}`
                  : `/archive/${post.id}`
              }
              className="block p-6 border rounded-xl hover:border-blue-500 transition-colors bg-white shadow-sm mb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    post.type === "blog"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {post.type}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  {post.category}
                </span>
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
        <div className="text-center py-10 text-slate-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
