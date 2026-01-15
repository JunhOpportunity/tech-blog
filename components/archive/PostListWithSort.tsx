'use client';

import { useState } from 'react';
import { PostData } from '@/app/lib/posts';
import Link from 'next/link';

export default function PostListWithSort({ initialPosts }: { initialPosts: PostData[] }) {
  // 기본 정렬 상태 (desc: 최신순, asc: 오래된순)
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc');

  // 정렬 로직
  const sortedPosts = [...initialPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="mt-8">
      {/* 정렬 버튼 영역 */}
      <div className="flex justify-end items-center gap-3 mb-6 text-sm">
        <button 
          onClick={() => setSortOrder('desc')}
          className={`transition-colors ${sortOrder === 'desc' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
        >
          최신순
        </button>
        <span className="text-slate-200">|</span>
        <button 
          onClick={() => setSortOrder('asc')}
          className={`transition-colors ${sortOrder === 'asc' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
        >
          오래된순
        </button>
      </div>

      {/* 정렬된 포스트 리스트 */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Link 
            key={post.id} 
            href={`/archive/${post.id}`}
            className="block p-5 border border-slate-100 rounded-xl bg-white hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">{post.title}</h3>
              <span className="text-xs text-slate-400">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}