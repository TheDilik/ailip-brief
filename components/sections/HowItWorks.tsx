"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Выберите роли", desc: "Одну или все восемь — берите то, что нужно прямо сейчас." },
  { num: "02", title: "Оплатите онлайн", desc: "Быстро и безопасно. Банковская карта, данные защищены." },
  { num: "03", title: "Получите PDF", desc: "Письмо с уникальной ссылкой придёт сразу после оплаты." },
  { num: "04", title: "Применяйте", desc: "Копируйте промпт в любой ИИ — и получайте ответ уровня эксперта." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-32 bg-[#0f0f0f]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-red-500 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Как это работает
          </div>
          <h2 className="font-unbounded text-4xl md:text-5xl font-black tracking-tight">
            4 шага до ИИ-команды
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[#161616] p-10 hover:bg-[#1c1c1c] transition-colors duration-300"
            >
              <div className="font-unbounded text-5xl font-black text-white/[0.07] group-hover:text-red-600/40 transition-colors duration-300 mb-8 tracking-tighter">
                {step.num}
              </div>
              <div className="w-6 h-0.5 bg-red-600 mb-5 group-hover:w-10 transition-all duration-300" />
              <h3 className="font-semibold text-base mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
