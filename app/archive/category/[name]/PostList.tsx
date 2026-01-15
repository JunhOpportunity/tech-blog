'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostData } from '@/app/lib/posts';

export default function PostList({ initialPosts }: { initialPosts: PostData[] }) {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc'); // 학습 기록은 과거순(asc)이 기본인 경우가 많음

  const sortedPosts = [...initialPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      {/* 정렬 버튼 */}
      <div className="flex justify-end gap-3 mb-4 text-sm font-medium">
        <button 
          onClick={() => setSortOrder('desc')}
          className={sortOrder === 'desc' ? 'text-blue-600' : 'text-gray-400'}
        >
          최신순
        </button>
        <span className="text-gray-200">|</span>
        <button 
          onClick={() => setSortOrder('asc')}
          className={sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'}
        >
          오래된순
        </button>
      </div>

      <div className="divide-y ">
        {sortedPosts.map((post) => (
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