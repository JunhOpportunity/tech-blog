import Link from "next/link";

export default function FeaturedSeriesCard() {
  return (
    <section>
      <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-12 md:p-16 text-white shadow-2xl transition-all duration-500 hover:shadow-blue-500/10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-[0.15em]">
                Main Series
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Design Patterns
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[1.15] tracking-tight">
              유연한 소프트웨어를 위한 <br />
              <span className="text-blue-500">디자인 패턴</span>의 세계
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 font-medium">
              단순히 코드를 짜는 것을 넘어, 확장 가능하고 유지보수가 쉬운{" "}
              <br className="hidden md:block" />
              좋은 설계를 위한 패턴들을 하나씩 깊이 있게 탐구합니다.
            </p>

            <Link
              href="/blog?tab=series"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
            >
              시리즈 구경하러 가기
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-64 h-64 border-4 border-blue-500/20 rounded-[3rem] rotate-12 flex items-center justify-center group-hover:rotate-6 transition-transform duration-700">
              <div className="w-48 h-48 bg-blue-600/10 rounded-[2rem] -rotate-12 flex items-center justify-center blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center font-black text-6xl text-blue-500/30 select-none">
                DP
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/30 transition-colors"></div>
        <div className="absolute -left-10 -top-10 w-[200px] h-[200px] bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none"></div>
      </div>
    </section>
  );
}
