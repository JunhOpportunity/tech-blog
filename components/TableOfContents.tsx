'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingRegex = /^(#{1,2})\s+(.*)/gm; 
    const matches = Array.from(content.matchAll(headingRegex));
    
    const items = matches.map((match) => {
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '');
        
      return { 
        id, 
        text, 
        level: match[1].length
      };
    });
    
    setToc(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24 self-start hidden lg:block w-64 ml-10 shrink-0">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">On This Page</p>
      <ul className="space-y-3 border-l border-slate-100">
        {toc.map((item) => (
          <li 
            key={item.id} 
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            className={`text-sm transition-all border-l-2 -ml-[2px] ${
              activeId === item.id 
                ? 'border-blue-500 text-blue-600 font-medium' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <a href={`#${item.id}`} className="block py-1 pl-4">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}