'use client';

import { useState } from 'react';

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    // children 내부의 텍스트만 추출합니다.
    const codeElement = (children as any)?.props?.children;
    const codeText = typeof codeElement === 'string' ? codeElement : codeElement?.props?.children;

    if (codeText) {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 뒤 다시 원래대로
    }
  };

  return (
    <div className="relative group">
      {/* 복사 버튼 */}
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 z-10 p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700 hover:text-white"
        title="Copy code"
      >
        {copied ? (
          <span className="text-[10px] font-bold px-1 text-green-400">COPIED!</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>

      {/* 실제 코드 블록 (ReactMarkdown이 넣어줄 pre 태그) */}
      {children}
    </div>
  );
}