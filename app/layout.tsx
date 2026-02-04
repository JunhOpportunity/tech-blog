import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ScrollToTop from "@/components/ScrollTop";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://junhopportunity.vercel.app"
      : "http://localhost:3000"
  ),
  title: {
    default: "Junho's 기술 블로그",
    template: "%s | Junho's Dev Log",
  },
  description:
    "어제보다 더 나은 오늘을 위해 기록하는 주니어 개발자의 기술 블로그입니다.",
  keywords: [
    "Next.js",
    "NestJS",
    "TypeScript",
    "Design Patterns",
    "개발 블로그",
  ],
  authors: [{ name: "Junho" }],
  openGraph: {
    title: "Junho's Dev Log",
    description: "성장 기록과 기술 지식을 공유하는 공간입니다.",
    url: "https://junhopportunity.vercel.app",
    siteName: "Junho's Dev Log",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junho's Dev Log",
    description: "주니어 개발자 Junho의 성장 기록",
    images: ["/og-image.png"],
  },
  icons:{

    icon: "/icon.png",
    shortcut: "/icon-16x16.png",
    apple: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <ScrollToTop />
        <Navbar /> {/* 2. 클라이언트 컴포넌트로 분리한 내비게이션 배치 */}
        <main className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
          {children}
        </main>
        <footer className="mt-8 border-t border-slate-100 bg-white/50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
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

              <div className="grid grid-cols-2 gap-12 sm:gap-24">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Sitemap
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/blog"
                        className="text-sm text-slate-600 hover:text-blue-600"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/archive"
                        className="text-sm text-slate-600 hover:text-blue-600"
                      >
                        Archive
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/timeline"
                        className="text-sm text-slate-600 hover:text-blue-600"
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
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:your-email@example.com"
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        Email
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
