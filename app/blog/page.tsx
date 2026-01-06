// app/blog/page.tsx
import { getBlogPosts } from '@/app/lib/blog';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-500">생각을 정리하고 지식을 공유하는 공간입니다.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <article className="border rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white h-full flex flex-col">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {post.category}
              </span>
              <h2 className="text-2xl font-bold mt-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-3 line-clamp-3 flex-grow">
                {post.description}
              </p>
              <time className="text-sm text-gray-400 mt-6">
                {new Date(post.date).toLocaleDateString('ko-KR')}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}