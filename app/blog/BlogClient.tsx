"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import SeriesCard from "@/components/SeriesCard";

export default function BlogClient({ allPosts, seriesData }: { allPosts: any[], seriesData: any[] }) {
  const [activeTab, setActiveTab] = useState<"latest" | "series" | "category">("latest");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", ...Array.from(new Set(allPosts.map((post) => post.category)))];

  const filteredPosts = selectedCategory === "전체" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div>
      {/* 1. 상단 내비게이션 탭 */}
      <div className="flex gap-8 border-b border-slate-100 mb-12">
        {(["latest", "series", "category"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xl font-bold transition-all relative ${
              activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab === "latest" ? "최신 글" : tab === "series" ? "시리즈" : "카테고리"}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 2. 탭별 콘텐츠 영역 */}
      <div className="min-h-[400px]">
        {activeTab === "latest" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {allPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}

        {activeTab === "series" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {seriesData.map((series) => <SeriesCard key={series.name} series={series} />)}
          </div>
        )}

        {activeTab === "category" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}