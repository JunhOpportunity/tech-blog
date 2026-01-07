'use client';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface HeatmapProps {
  data: { date: string; archiveCount: number; blogCount: number }[];
}

export default function ActivityHeatmap({ data }: HeatmapProps) {
  // 시작일: 1년 전, 종료일: 오늘
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div className="heatmap-container overflow-x-auto">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          
          const { archiveCount, blogCount } = value;
          if (blogCount > 0 && archiveCount > 0) return 'color-mixed'; // 둘 다 한 날
          if (blogCount > 0) return 'color-blog';      // 블로그만 쓴 날
          if (archiveCount > 0) return 'color-archive'; // 공부 기록만 있는 날
          return 'color-empty';
        }}
      />
      
      {/* 범례 및 스타일 */}
      <div className="flex justify-end gap-4 mt-4 text-xs font-medium">
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#e5e7eb] rounded-sm"></span> No Activity</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22c55e] rounded-sm"></span> Archive</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#3b82f6] rounded-sm"></span> Blog Post</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#a855f7] rounded-sm"></span> Mixed</div>
      </div>

      <style jsx global>{`
        .react-calendar-heatmap .color-empty { fill: #f3f4f6; }
        .react-calendar-heatmap .color-archive { fill: #22c55e; } /* 초록색 */
        .react-calendar-heatmap .color-blog { fill: #3b82f6; }    /* 파란색 */
        .react-calendar-heatmap .color-mixed { fill: #a855f7; }   /* 보라색 */
      `}</style>
    </div>
  );
}