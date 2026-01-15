import { NextRequest, NextResponse } from 'next/server';
import { getSortedPostsData } from '@/app/lib/posts';
import { getBlogPosts } from '@/app/lib/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) return NextResponse.json([]);

  const archivePosts = getSortedPostsData();
  const blogPosts = getBlogPosts();

  const combined = [
    ...archivePosts.map((p) => ({ ...p, type: 'archive' })),
    ...blogPosts.map((p) => ({ ...p, type: 'blog' })),
  ];

  const filtered = combined.filter(
    (post) =>
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}