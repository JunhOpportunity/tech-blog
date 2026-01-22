import Link from "next/link";
import { PostData } from "@/app/lib/posts";

export default function PostCard({ post }: { post: PostData }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <Link href={`/blog/${post.id}`} className="group">
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-md border border-slate-100">
        {/* 1. 썸네일 영역 (이미지가 없을 경우 대비) */}
        <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl bg-gradient-to-br from-slate-50 to-slate-200">
              {post.title.charAt(0)}
            </div>
          )}
        </div>

        {/* 2. 콘텐츠 영역 */}
        <div className="flex flex-col flex-1 p-5">
          {" "}
          <h2 className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-3 mb-5 flex-1 leading-relaxed">
          {post.description || post.content.replace(/[#*`]/g, "")}
          </p>
          <div className="text-[12px] font-medium text-slate-400 mt-auto">
            {formatDate(post.date)}
          </div>
        </div>

        {/* 3. 하단 유저 정보 영역 */}
        {/* <div className="px-4 py-3 border-t border-slate-50 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
              <img src="/profile.png" alt="user" className="w-full h-full" />
            </div>
            <span className="text-[12px] font-medium text-slate-700">by <b className="text-slate-900">Junho</b></span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>
            <span className="text-[12px] font-bold">{post.likes || 0}</span>
          </div>
        </div> */}
      </div>
    </Link>
  );
}
