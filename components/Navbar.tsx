"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function SearchInput() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const onClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSearch} className="relative group flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력하세요..."
        className="w-48 md:w-64 pl-10 pr-10 py-2 bg-slate-100/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all outline-none"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      </div>
      {value && (
        <button type="button" onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </form>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Archive", href: "/archive" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">J</div>
          <span className="font-bold text-xl tracking-tight">JunhOpportunity</span>
        </Link>
        <SearchInput />
        <div className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}