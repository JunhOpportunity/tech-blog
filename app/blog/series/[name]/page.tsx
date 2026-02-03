import { getPostsBySeries } from "@/app/lib/blog";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";
import Link from "next/link";

// 1. 함수 앞에 async를 붙입니다.
// 2. params의 타입을 Promise로 정의합니다.
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const seriesName = decodeURIComponent(name);

  return {
    title: `${seriesName} 시리즈`,
    description: `${seriesName}에 관한 연재 게시글 모음입니다.`,
  };
}

export default async function SeriesDetailPage({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  
  // 3. params를 await로 기다려준 뒤 name을 가져옵니다.
  const { name } = await params;
  
  const seriesName = decodeURIComponent(name);
  const posts = getPostsBySeries(seriesName);

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500 mb-4">해당 시리즈를 찾을 수 없습니다.</p>
        <Link href="/blog" className="text-blue-600 underline">블로그로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-16 border-l-8 border-blue-600 pl-8 py-4">
        <Link 
          href="/blog" 
          className="text-sm font-bold text-blue-600 hover:underline mb-4 block"
        >
          ← 전체 목록 보기
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          <span className="text-slate-400 font-light text-2xl block mb-1">Series</span> 
          {seriesName}
        </h1>
        <p className="text-slate-500">
          이 시리즈에는 총 <b>{posts.length}개</b>의 포스트가 기록되어 있습니다.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}