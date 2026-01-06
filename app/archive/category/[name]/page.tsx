// app/archive/category/[name]/page.tsx
import { getPostsByCategory } from "@/app/lib/posts";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const categories = getPostsByCategory();

  const categoryData = categories[decodedName];
  const posts = categoryData ? categoryData.posts : [];

  // 날짜 형식을 YYYY-MM-DD로 변환하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .replace(/\./g, "");
    // 결과 예: 2025. 11. 20. -> 2025-11-20
  };

  if (!categoryData)
    return <div className="p-8 text-center">카테고리를 찾을 수 없습니다.</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/archive"
          className="text-blue-500 hover:underline text-sm w-fit"
        >
          ← 아카이브 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mt-2">
          <span className="text-blue-600">{decodedName}</span> 학습 기록
        </h1>
        {/* 수정된 날짜 표시 영역 */}
        <p className="text-gray-500 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg w-fit">
          {formatDate(categoryData.startDate)} ~{" "}
          {formatDate(categoryData.endDate)}
          <span className="ml-2 text-blue-600 border-l pl-2 border-gray-300">
            약 {categoryData.durationMonths}개월
          </span>
        </p>
      </div>
      <div className="divide-y border-t">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/archive/${encodeURIComponent(post.id)}`}
            className="block py-5 group"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
