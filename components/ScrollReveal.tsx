"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // 시작 상태 (투명도 0, 아래로 30px)
      whileInView={{ opacity: 1, y: 0 }} // 화면에 보일 때 상태
      viewport={{ once: true, margin: "-100px" }} // 한 번만 실행, 100px 정도 들어왔을 때 시작
      transition={{ duration: 0.8, ease: "easeOut" }} // 0.8초 동안 부드럽게
    >
      {children}
    </motion.div>
  );
}