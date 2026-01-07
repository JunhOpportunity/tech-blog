"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 메뉴 항목 정의
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Archive", href: "/archive" },
  ];

  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
                J
              </div>
              <span className="font-bold text-xl tracking-tight">
                JunhOpportunity
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-4">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
          {children}
        </main>

        <footer className="mt-24 border-t border-slate-100 bg-white/50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              {/* 1. 브랜드 및 소개 */}
              <div className="space-y-4 max-w-sm">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:rotate-12">
                    J
                  </div>
                  <span className="font-bold text-lg tracking-tight">
                    JunhOpportunity
                  </span>
                </Link>
                <p className="text-sm text-slate-500 leading-relaxed">
                  어제보다 더 나은 오늘을 위해 고민하고 기록합니다. 공부한 모든
                  것은 아카이브에, 정제된 생각은 블로그에 담고 있습니다.
                </p>
              </div>

              {/* 2. 빠른 링크 및 소셜 */}
              <div className="grid grid-cols-2 gap-12 sm:gap-24">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Sitemap
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/blog"
                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/archive"
                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Archive
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/timeline"
                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Timeline
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Connect
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="https://github.com/JunhOpportunity"
                        target="_blank"
                        className="text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:your-email@example.com"
                        className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Email
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. 저작권 표시 */}
            <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-tighter">
                © 2026 JUNHOPPORTUNITY ALL RIGHTS RESERVED.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-300">
                <span>BUILT WITH NEXT.JS 15</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span>TAILWIND CSS 4.0</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
