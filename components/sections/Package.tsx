"use client";

import { motion } from "framer-motion";

export default function Package() {
  return (
    <section id="package" className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(226,35,26,0.12),transparent)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-red-500 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Лучшее предложение
            </div>
            <h2 className="font-unbounded text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-3">
              Вся команда<br />за <span className="text-red-500">8 000 ₽</span>
            </h2>
            <p className="text-white/30 text-sm line-through mb-4">вместо 16 000 ₽ · скидка 50%</p>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
              Все 8 ролей в одном пакете. PDF с промптами отправляем на почту сразу после оплаты.
            </p>

            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(226,35,26,0.45)] hover:-translate-y-0.5">
              Купить весь пакет
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-white/25 text-xs mt-4">Мгновенная доставка на e-mail · Онлайн-оплата</p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {[
              {
                title: "4 билета на конференцию",
                desc: "8 июля 2026, ДС «Звёздный» — для вас и вашей команды",
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                    <rect x="4" y="14" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 20h32M14 14V8a6 6 0 0112 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "8 PDF-файлов",
                desc: "Готовые промпты с инструкцией — применяйте с первого дня",
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                    <path d="M8 8h24v24H8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 16h12M14 20h8M14 24h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-red-500/20 transition-colors duration-200"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Role chips */}
            <div className="flex flex-wrap gap-2 p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
              {["CEO", "CFO", "Sales", "PM", "CTO", "Growth", "Support", "HR"].map((role) => (
                <span
                  key={role}
                  className="font-unbounded text-[0.6rem] font-bold tracking-widest text-white/40 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
