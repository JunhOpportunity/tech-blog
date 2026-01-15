import { getPostsByCategory } from "@/app/lib/posts";
import Link from "next/link";
import PostList from "./PostList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const categories = getPostsByCategory();
  const categoryData = categories[decodedName];

  if (!categoryData)
    return <div className="p-8 text-center">카테고리를 찾을 수 없습니다.</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric", month: "2-digit", day: "2-digit",
    }).replace(/\. /g, "-").replace(/\./g, "");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <Link href="/archive" className="text-blue-500 hover:underline text-sm w-fit">
          ← 아카이브 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mt-2 justify-center flex">
          <span className="text-blue-600">{decodedName}</span> 학습 기록
        </h1>
        <p className="text-gray-500 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg w-fit mx-auto">
          {formatDate(categoryData.startDate)} ~ {formatDate(categoryData.endDate)}
          <span className="ml-2 text-blue-600 border-l pl-2 border-gray-300">
            약 {categoryData.durationMonths}개월
          </span>
        </p>
      </div>

      {/* 목록 부분을 클라이언트 컴포넌트로 교체 */}
      <PostList initialPosts={categoryData.posts} />
    </div>
  );
}
