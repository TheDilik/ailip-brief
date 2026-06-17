"use client";

import { motion } from "framer-motion";

const stagger = {
  container: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } },
};

export default function HeroSection() {
  const scrollDown = () =>
    document.getElementById("section-1")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none" />

      {/* Accent blob */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,26,255,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,26,255,0.04) 0%, transparent 70%)" }}
      />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-12 py-7">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-ink rounded-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </div>
          <span className="text-ink font-semibold text-sm tracking-tight">Studio Brief</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas text-sm text-muted"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
          </svg>
          ~20 минут
        </motion.div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-12 pb-20 pt-8">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={stagger.item} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">
              Строительство &amp; Производство мебели · KSA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={stagger.item}
            className="font-space font-bold tracking-tight leading-[0.95] mb-8"
            style={{ fontSize: "clamp(52px, 10vw, 120px)", letterSpacing: "-0.03em" }}
          >
            Бриф на<br />
            <span style={{ color: "var(--accent)" }}>разработку</span><br />
            премиального<br />
            сайта
          </motion.h1>

          {/* Divider row */}
          <motion.div variants={stagger.item} className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 max-w-xs bg-border" />
            <div className="flex gap-6">
              {["10 разделов", "100+ полей", "EN / AR"].map(t => (
                <span key={t} className="text-xs font-semibold text-muted uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div variants={stagger.item} className="flex items-center gap-4 flex-wrap">
            <button onClick={scrollDown} className="btn-gold rounded-xl px-8 py-4 text-sm">
              <span>Начать заполнение</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <span className="text-sm text-muted">Ваши данные сохраняются автоматически</span>
          </motion.div>
        </motion.div>

        {/* Bottom right decorative numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 right-8 md:right-12 text-right hidden md:block"
        >
          <div className="text-[120px] font-bold leading-none text-ink/[0.04] select-none" style={{ letterSpacing: "-0.05em" }}>
            01
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
