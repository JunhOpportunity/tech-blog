import { getBlogPosts } from "@/app/lib/blog"; 
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import TableOfContents from "@/components/TableOfContents";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === decodedId);

  if (!post) return <div>포스트를 찾을 수 없습니다.</div>;

  return (
    <div className="relative max-w-7xl mx-auto px-4 md:px-8">
    
    {/* 2. 본문 영역: mx-auto로 중앙 고정 */}
    <article className="max-w-3xl mx-auto py-8 lg:py-12 min-w-0">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 font-medium">
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>

    {/* 3. 목차 영역 수정본 */}
    {/* inset-y-0을 추가하여 부모(전체 컨테이너)의 높이만큼 aside가 늘어나게 합니다. */}
    <aside className="hidden xl:block absolute inset-y-0 left-[calc(50%+24rem)] w-64">
      <div className="sticky top-24 pt-12"> {/* pt-12로 본문 시작점과 높이를 맞춤 */}
        <TableOfContents content={post.content} />
      </div>
    </aside>
  </div>
  );
}

