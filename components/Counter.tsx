"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2, // 2초 동안 애니메이션
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}