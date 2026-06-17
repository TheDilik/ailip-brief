"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const program = [
  { time: "10:00–11:00", title: "Бирюзовое управление по-русски" },
  { time: "11:00–12:00", title: "Искусственный интеллект для предпринимателя" },
  { time: "12:00–13:00", title: "Клиентократия: клиент — единственный босс" },
  { time: "13:00–14:30", title: "Обед + нетворкинг", isBreak: true },
  { time: "14:30–15:30", title: "Стратегическое мышление в эпоху хаоса" },
  { time: "15:30–16:30", title: "Семейный бизнес и франчайзинг" },
  { time: "16:30–17:00", title: "Призовой розыгрыш на сцене", isPrize: true },
];

function Countdown() {
  const [time, setTime] = useState({ days: "00", hours: "00", mins: "00" });

  useEffect(() => {
    const target = new Date("2026-07-08T10:00:00+03:00");
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
      });
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">
        До конференции
      </p>
      <div className="flex items-center gap-2">
        {[{ val: time.days, label: "дней" }, { val: time.hours, label: "часов" }, { val: time.mins, label: "минут" }].map(
          (item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="text-center">
                <div className="font-unbounded text-4xl font-black text-red-500 tracking-tighter leading-none">
                  {item.val}
                </div>
                <div className="text-[0.6rem] text-white/30 uppercase tracking-widest mt-1.5">{item.label}</div>
              </div>
              {i < 2 && (
                <div className="font-unbounded text-2xl font-black text-red-500/30 mb-4">:</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function Conference() {
  const [openFaq, setOpenFaq] = useState(false);

  return (
    <section id="conference" className="py-32 relative overflow-hidden">

      {/* ── Видео-фон ─── z-0 ──────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/conf-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Оверлеи поверх видео ────────────────────────────── */}
      {/* Основной тёмный слой */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundColor: 'rgba(8,8,8,0.80)' }} />
      {/* Левый градиент — для читаемости текста */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.3) 50%, transparent 100%)' }} />
      {/* Верхний переход */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 1, height: '160px', background: 'linear-gradient(to bottom, #080808, transparent)' }} />
      {/* Нижний переход */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 1, height: '160px', background: 'linear-gradient(to top, #080808, transparent)' }} />
      {/* Красный акцент */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse 50% 40% at 75% 60%, rgba(226,35,26,0.08), transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-8 relative z-[2]">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-white/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 inline-block" />
            Событие года
          </div>
          <h2 className="font-unbounded text-5xl md:text-8xl font-black tracking-tight leading-[1.0] mb-8">
            «Столица<br />семейного<br />бизнеса»
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { icon: "📅", text: "8 июля 2026, среда" },
              { icon: "📍", text: "ДС «Звёздный», Липецк" },
              { icon: "👥", text: "до 3 000 предпринимателей" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-white/60 text-sm"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-6">
            Главная деловая встреча Липецка: сильные спикеры, живой нетворкинг и финальный розыгрыш на сцене.{" "}
            <strong className="text-white">Для покупателей промптов вход — бесплатный.</strong>
          </p>

          <div className="inline-flex items-center gap-3 bg-red-500/[0.07] border border-red-500/20 rounded-xl px-5 py-4">
            <span className="text-xl">🎟️</span>
            <div>
              <p className="font-semibold text-sm">При покупке промптов — бесплатный вход</p>
              <p className="text-white/40 text-xs">Пакет «Вся команда» — 4 билета в подарок</p>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Program */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-unbounded text-sm font-bold mb-6 flex items-center gap-3">
              Программа
              <span className="text-[0.6rem] font-semibold tracking-widest text-yellow-500/60 border border-yellow-500/20 bg-yellow-500/[0.06] rounded-full px-2.5 py-1 uppercase">
                Черновик
              </span>
            </h3>
            <div className="flex flex-col">
              {program.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-white/[0.05] last:border-0 group hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors ${item.isBreak ? "opacity-40" : ""}`}
                >
                  <span className="text-[0.72rem] font-medium text-white/30 tracking-wide pt-0.5">{item.time}</span>
                  <span className={`text-sm font-medium group-hover:text-white transition-colors ${item.isPrize ? "text-yellow-400/80" : "text-white/60"}`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right col */}
          <div className="flex flex-col gap-5">
            <Countdown />

            {/* Speakers placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6"
            >
              <h3 className="font-unbounded text-sm font-bold mb-4 flex items-center gap-3">
                Спикеры
                <span className="text-[0.6rem] font-semibold tracking-widest text-white/30 border border-white/[0.1] rounded-full px-2.5 py-1 uppercase">
                  Скоро
                </span>
              </h3>
              <div className="flex gap-2.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/[0.04] border border-dashed border-white/[0.1] flex items-center justify-center text-white/20 text-lg"
                  >
                    ?
                  </div>
                ))}
              </div>
              <p className="text-[0.75rem] text-white/25 mt-3">Имена объявим после получения согласий</p>
            </motion.div>
          </div>
        </div>

        {/* Register form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="border border-white/[0.12] rounded-3xl p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 relative overflow-hidden"
          id="register"
          style={{ backgroundColor: '#111111' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div>
            <h3 className="font-unbounded text-2xl font-bold leading-snug tracking-tight mb-3">
              Зарегистрироваться<br />на конференцию
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Заполните форму — пришлём подтверждение и всю информацию о мероприятии.
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/30">Имя</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  required
                  className="border border-white/[0.15] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-red-500/40 transition-colors"
                  style={{ backgroundColor: '#1c1c1c' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/30">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 900 000-00-00"
                  required
                  className="border border-white/[0.15] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-red-500/40 transition-colors"
                  style={{ backgroundColor: '#1c1c1c' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/30">E-mail</label>
                <input
                  type="email"
                  placeholder="ivan@email.ru"
                  required
                  className="border border-white/[0.15] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-red-500/40 transition-colors"
                  style={{ backgroundColor: '#1c1c1c' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/30">Промпты</label>
                <select className="border border-white/[0.15] rounded-xl px-4 py-3.5 text-sm text-white/60 outline-none focus:border-red-500/40 transition-colors" style={{ backgroundColor: '#1c1c1c' }}>
                  <option value="no">Нет, только регистрируюсь</option>
                  <option value="yes">Да, уже купил(а)</option>
                  <option value="plan">Планирую купить</option>
                </select>
              </div>
            </div>
            <label className="flex items-start gap-3 text-xs text-white/30 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-red-600" />
              Даю согласие на обработку{" "}
              <a href="/privacy" className="text-red-400 hover:underline">персональных данных</a>
            </label>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(226,35,26,0.4)]"
            >
              Зарегистрироваться бесплатно
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
