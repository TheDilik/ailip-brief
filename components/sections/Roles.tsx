"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const roles = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M26 6l2 2-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Руководитель",
    sub: "CEO",
    desc: "Стратегия, решения, связи, поиск денег. Думает как собственник бизнеса.",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 16h10M11 20h6M16 8V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Финансовый директор",
    sub: "CFO",
    desc: "Учёт, налоги, касса, зарплата, контроль расходов.",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M8 20l6-10 4 6 3-4 5 8H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Коммерческий директор",
    sub: "Sales",
    desc: "Первые клиенты, переговоры, закрытие сделок.",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <rect x="7" y="5" width="18" height="22" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 12h10M11 16h7M11 20h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Продакт-менеджер",
    sub: "PM",
    desc: "MVP, требования, приоритеты фич. Превращает идею в продукт.",
  },
  {
    num: "05",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 10v6l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Технический директор",
    sub: "CTO",
    desc: "Технология и производство. Технический эксперт на старте.",
  },
  {
    num: "06",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M6 24V14l10-8 10 8v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="18" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: "Маркетолог",
    sub: "Growth",
    desc: "Трафик, лидогенерация, недорогие каналы.",
  },
  {
    num: "07",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M6 10h20v12a2 2 0 01-2 2H8a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 10l10 8 10-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Клиентский сервис",
    sub: "Support",
    desc: "Онбординг, техподдержка, обратная связь.",
  },
  {
    num: "08",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 26c0-4.4 3.6-8 8-8M14 26c0-4.4 3.6-8 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "HR & Офис-менеджер",
    sub: "HR",
    desc: "Подбор персонала, оргвопросы, адаптация новичков.",
  },
];

export default function Roles() {
  return (
    <section id="roles" className="py-32 bg-[#0f0f0f]">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-red-500 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Продукт
          </div>
          <h2 className="font-unbounded text-4xl md:text-5xl font-black tracking-tight mb-4">
            8 ролей — 8 экспертов в кармане
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            2 000 ₽ за роль · Полный пакет — 8 000 ₽ со скидкой 50%
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {roles.map((role, i) => (
            <motion.div
              key={role.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0.68, 0, 1.2] }}
              className={cn(
                "group relative bg-[#161616] border border-white/[0.06] rounded-2xl p-6",
                "flex flex-col gap-4 overflow-hidden",
                "transition-all duration-300 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
              )}
            >
              {/* Red top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-r from-red-500/20 to-transparent group-hover:h-14 transition-all duration-300" />

              <div className="flex items-start justify-between">
                <span className="font-unbounded text-[0.6rem] font-bold tracking-widest text-white/20">
                  {role.num}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:border-red-500/30 group-hover:text-red-400 transition-all duration-300">
                  {role.icon}
                </div>
              </div>

              <div>
                <h3 className="font-unbounded text-[0.8rem] font-bold leading-snug tracking-tight">
                  {role.title}
                  <br />
                  <span className="text-white/40 font-semibold">{role.sub}</span>
                </h3>
              </div>

              <p className="text-[0.83rem] text-white/40 leading-relaxed flex-1">{role.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="font-unbounded text-[0.95rem] font-black tracking-tight">2 000 ₽</span>
                <button
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-xs font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-200"
                  onClick={() => {}}
                >
                  Купить
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
