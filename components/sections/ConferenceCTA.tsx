"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";

export default function ConferenceCTA() {
  return (
    <section className="relative w-full">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(30, 0, 0)"
        gradientBackgroundEnd="rgb(8, 8, 8)"
        firstColor="226, 35, 26"
        secondColor="160, 15, 10"
        thirdColor="255, 80, 50"
        fourthColor="80, 0, 0"
        fifthColor="200, 60, 30"
        pointerColor="255, 100, 60"
        size="70%"
        blendingValue="hard-light"
        containerClassName="!h-[620px] py-24"
        interactive={true}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1.2] }}
            className="pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                Событие года · Липецк
              </span>
            </div>
            <h2 className="font-unbounded font-black text-white leading-[1.0] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              8 июля 2026
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-3">
              ДС «Звёздный», Липецк
            </p>
            <p className="text-white/40 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Главная деловая конференция Липецка. До 3 000 предпринимателей. Сильные спикеры, нетворкинг и финальный розыгрыш на сцене.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-sm mb-10">
              <span className="text-xl">🎟️</span>
              <span className="text-white font-semibold text-sm md:text-base">
                Купите промпты — вход <span className="text-red-400">бесплатный</span>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#register" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0C0C0C] font-bold text-sm tracking-wide transition-all duration-300 hover:bg-red-50 hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                Зарегистрироваться
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
              <a href="#package" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white/80 font-semibold text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white">
                Купить промпты
              </a>
            </div>
          </motion.div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  );
}
