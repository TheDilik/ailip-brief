"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBrief } from "@/lib/brief-context";

const SECTIONS = [
  "О компании", "Направления", "Позиционирование", "Конкуренты",
  "Аудитория", "Цели", "Контент", "Дизайн", "Технологии", "Бюджет",
];

export default function ProgressBar() {
  const { sectionCompletion, saveNow, lastSaved } = useBrief();
  const [activeSection, setActiveSection] = useState(0);
  const [visible, setVisible] = useState(false);

  const totalProgress = sectionCompletion.reduce((a, b) => a + b, 0) / sectionCompletion.length;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
      for (let i = 9; i >= 0; i--) {
        const el = document.getElementById(`section-${i + 1}`);
        if (el && window.scrollY >= el.offsetTop - 160) { setActiveSection(i); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{ y: visible ? 0 : -72, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-border"
    >
      {/* Thin progress line */}
      <div className="h-[2px] bg-border">
        <motion.div
          className="h-full bg-ink"
          style={{ width: `${totalProgress * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center gap-4">
        {/* Sections – desktop */}
        <div className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
          {SECTIONS.map((name, i) => {
            const pct = sectionCompletion[i] ?? 0;
            const isActive = activeSection === i;
            const isDone = pct >= 0.8;
            return (
              <button
                key={i}
                onClick={() => document.getElementById(`section-${i + 1}`)?.scrollIntoView({ behavior: "smooth" })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive ? "bg-ink text-white" : "text-muted hover:text-ink hover:bg-surface"
                }`}
              >
                <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                  isDone ? "bg-green-500 text-white" : isActive ? "bg-white/20" : "bg-border"
                }`}>
                  {isDone ? "✓" : i + 1}
                </span>
                {name}
              </button>
            );
          })}
        </div>

        {/* Mobile label */}
        <div className="lg:hidden flex-1 text-sm font-semibold text-ink">
          {SECTIONS[activeSection]}
          <span className="text-muted font-normal ml-1.5">{activeSection + 1} / 10</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {lastSaved && (
            <span className="text-faint text-[11px] hidden sm:block">
              Сохранено {lastSaved.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button onClick={saveNow} className="btn-ghost py-1 px-3 text-xs">
            Сохранить
          </button>
          <div className="min-w-[42px] text-right text-sm font-bold text-ink tabular-nums">
            {Math.round(totalProgress * 100)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
