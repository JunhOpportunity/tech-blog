import Link from "next/link";

interface SeriesProps {
  series: {
    name: string;
    count: number;
    lastUpdated: string;
    thumbnail: string;
  };
}

export default function SeriesCard({ series }: SeriesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\.$/, "");
  };

  return (
    <Link href={`/blog/series/${encodeURIComponent(series.name)}`} className="group">
      <div className="relative min-h-[320px] w-full bg-white rounded-r-2xl border-l-[16px] border-blue-600 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col overflow-hidden">
        
        {/* 배경 썸네일 (살짝 어둡게 처리하여 텍스트 가독성 확보) */}
        {/* {series.thumbnail && (
          <div className="absolute inset-0 z-0">
            <img 
              src={series.thumbnail} 
              alt={series.name} 
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
          </div>
        )} */}

        {/* 카드 콘텐츠 */}
        <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                Series Archive
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-4 leading-tight break-keep group-hover:text-blue-700 transition-colors">
              {series.name}
            </h3>
          </div>
          
          <div className="border-t border-slate-100 pt-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700">
                {series.count}개의 포스트
              </p>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-tighter">
                최신글 {formatDate(series.lastUpdated)}
              </p>
            </div>
            
            {/* 책장을 넘기는 듯한 아이콘 */}
            <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 책의 질감을 표현하는 오른쪽 끝 세로선 */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-slate-100" />
      </div>
    </Link>
  );
}