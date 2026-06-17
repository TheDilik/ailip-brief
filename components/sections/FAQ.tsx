"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { q: "Как оплатить?", a: "Оплата онлайн банковской картой через защищённый платёжный сервис. Принимаем Visa, Mastercard, МИР. PDF придут автоматически сразу после оплаты." },
  { q: "Что такое PDF с промптами?", a: "Документ с готовыми профессиональными запросами для ИИ. Скопировали промпт → вставили в ChatGPT или любой другой ИИ → получили ответ уровня опытного специалиста." },
  { q: "Какой ИИ нужен?", a: "Любой — ChatGPT (бесплатная версия подходит), Gemini, YandexGPT, GigaChat. Подписка не требуется." },
  { q: "Есть ли возврат?", a: "Возврат возможен до момента скачивания файла. После получения ссылки и скачивания PDF возврат не осуществляется — это цифровой товар." },
  { q: "Как попасть на конференцию?", a: "Купите любой набор промптов — билет входит в покупку. Пакет «Вся команда» — 4 билета. Подтверждение придёт на почту." },
  { q: "Нужны технические знания?", a: "Нет. Скопировал → вставил в ИИ → получил результат. Промпты созданы для людей без опыта работы с ИИ." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-[#0f0f0f]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-20 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-red-500 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Вопросы
            </div>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Часто<br />задают
            </h2>
          </div>

          {/* Right */}
          <div>
            {items.map((item, i) => (
              <div key={i} className="border-b border-white/[0.06] first:border-t">
                <button
                  className="w-full flex items-center justify-between py-6 text-left gap-5 group"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`text-sm font-semibold transition-colors ${open === i ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-250 ${open === i ? "bg-red-600 border-red-600" : "border-white/[0.1]"}`}>
                    <svg
                      className={`w-3 h-3 transition-transform duration-250 ${open === i ? "rotate-180 stroke-white" : "stroke-white/40"}`}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 4l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.68, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/40 text-sm leading-relaxed pb-6">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
