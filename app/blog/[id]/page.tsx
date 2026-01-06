// app/blog/[id]/page.tsx
import { getBlogPosts } from '@/app/lib/blog'; // blog 전용 로더 사용
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === decodedId);

  if (!post) return <div>포스트를 찾을 수 없습니다.</div>;

  return (
    <article className="max-w-4xl mx-auto p-8">
      <header className="mb-12 text-center">
        {/* 블로그는 카테고리를 좀 더 강조하는 편입니다 */}
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          {post.category}
        </span>
        <h1 className="text-5xl font-black mt-4 mb-6">{post.title}</h1>
        
        {/* 요약문이 있다면 출력 */}
        {post.description && (
          <p className="text-xl text-gray-600 mb-6 italic">"{post.description}"</p>
        )}
        
        <div className="text-gray-400 text-sm">
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })} 작성
        </div>
      </header>

      {/* 마크다운 본문 */}
      <div className="prose prose-slate lg:prose-xl max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}