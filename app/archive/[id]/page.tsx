import { getSortedPostsData } from "@/app/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// 1. 모든 포스트의 ID를 미리 생성 (SSG 최적화)
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 브라우저에서 들어온 %20 등을 실제 공백 문자로 디코딩합니다.
  const decodedId = decodeURIComponent(id);

  const posts = getSortedPostsData();
  // 디코딩된 ID로 파일을 찾습니다.
  const post = posts.find((p: any) => p.id === decodedId);

  if (!post) {
    return (
      <div className="p-8">
        <h1 className="text-red-500 font-bold">포스트를 찾을 수 없습니다.</h1>
        <p>요청된 ID (인코딩됨): {id}</p>
        <p>변환된 ID (디코딩됨): {decodedId}</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-gray-500">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </header>

      <div className="prose prose-slate lg:prose-xl max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
