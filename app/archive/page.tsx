// app/archive/page.tsx
import { getPostsByCategory, PostData } from "@/app/lib/posts";
import Link from "next/link";

export default function ArchivePage() {
  const categories = getPostsByCategory();

  // 카테고리 이름들을 가져와서, 각 카테고리의 endDate를 비교해 정렬합니다.
  const sortedCategoryNames = Object.keys(categories).sort((a, b) => {
    const dateA = new Date(categories[a].endDate).getTime();
    const dateB = new Date(categories[b].endDate).getTime();
    return dateB - dateA; // 내림차순 정렬 (최신이 위로)
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-2">Archive</h1>
        <p className="text-gray-500">
          지식의 파편들을 레포지토리별로 정리했습니다.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCategoryNames.map((name) => {
          const { posts, startDate, endDate, durationMonths, isLearning } =
            categories[name];
          const start = new Date(startDate).toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
          });
          const end = new Date(endDate).toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
          });

          return (
            <div
              key={name}
              className="relative border rounded-xl p-6 bg-white hover:border-blue-500 transition-all shadow-sm flex flex-col h-full group"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight uppercase">
                  {name}
                </h2>

                {/* 학습 중일 때만 주황색 태그 노출 (없으면 공간을 차지하지 않음) */}
                {isLearning && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase tracking-wider border border-orange-100 mt-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                    </span>
                    기록중 🔥
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {/* 기간 날짜 표시 */}
                  <div className="inline-flex items-center text-[11px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                    {start} — {end}
                  </div>
                  {/* 총 소요 기간 표시 */}
                  <span className="text-[11px] font-semibold text-blue-600">
                    약 {durationMonths}개월간 학습
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-4 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>총{" "}
                {posts.length}개의 기록
              </p>

              <ul className="space-y-2 mb-6 flex-grow">
                {posts.slice(0, 3).map((post: PostData) => (
                  <li
                    key={post.id}
                    className="text-sm text-slate-600 truncate opacity-80 group-hover:opacity-100 transition-opacity "
                  >
                    • {post.title}
                  </li>
                ))}
              </ul>

              <Link
                href={`/archive/category/${name}`}
                className="block text-center bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
              >
                학습 목록 전체보기
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
