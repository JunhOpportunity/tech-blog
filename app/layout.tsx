import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">MyTechBlog</Link>
            <div className="space-x-6 text-sm font-medium">
              <Link href="/archive" className="hover:text-blue-600">Archive</Link>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <Link href="/timeline" className="hover:text-blue-600">Timeline</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}