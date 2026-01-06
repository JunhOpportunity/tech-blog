// src/app/page.tsx
import { getSortedPostsData } from "@/app/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">나의 학습 아카이브</h1>
      <div className="space-y-4">
        {allPosts.map(({ id, title, date, category }) => (
          <div key={id} className="border-b pb-4">
            <Link
              href={`/archive/${id}`}
              className="hover:text-blue-600 transition-colors"
            >
              <span className="text-sm text-blue-500 font-medium">
                {category}
              </span>
              <h2 className="text-xl font-semibold">{title}</h2>
            </Link>
            <p className="text-gray-500 text-sm">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
