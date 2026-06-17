"use client";

import { SparklesCore } from "@/components/ui/sparkles";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06]">

      {/* ── Sparkles AiLip banner ───────────────────────────── */}
      <div className="w-full bg-[#080808] flex flex-col items-center justify-center overflow-hidden pt-16 pb-4">
        {/* Big logo text */}
        <h2 className="font-unbounded font-black text-center text-white relative z-20 select-none"
          style={{ fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          Ai<span className="text-red-600">Lip</span>
        </h2>

        {/* Sparkles container */}
        <div className="w-full max-w-3xl h-28 relative -mt-2">
          {/* Red gradient lines above sparkles */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-400 to-transparent h-[4px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-400 to-transparent h-px w-1/4" />

          {/* Particles */}
          <SparklesCore
            id="ailip-footer-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={800}
            className="w-full h-full"
            particleColor="#E2231A"
            speed={2}
          />

          {/* Mask: sharp bottom fade */}
          <div className="absolute inset-0 w-full h-full bg-[#080808] [mask-image:radial-gradient(380px_160px_at_top,transparent_20%,white)]" />
        </div>

        <p className="text-white/20 text-xs tracking-widest uppercase font-medium mt-2 mb-8 relative z-20">
          Столица семейного бизнеса
        </p>
      </div>

      {/* ── Main footer links ───────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-t border-white/[0.06]">
          <div>
            <p className="text-white/25 text-xs leading-relaxed">
              г. Липецк · ailip.ru<br />Готовые ИИ-промпты для предпринимателей
            </p>
          </div>
          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/25 mb-4">Документы</h4>
            <div className="flex flex-col gap-3">
              {["Публичная оферта", "Политика конфиденциальности", "Согласие на ПДн"].map((l) => (
                <a key={l} href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/25 mb-4">Навигация</h4>
            <div className="flex flex-col gap-3">
              {[["#roles","Продукт"], ["#package","Пакет «Вся команда»"], ["#conference","Конференция 8 июля"], ["#faq","FAQ"]].map(([href, label]) => (
                <a key={label} href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/25 mb-4">Контакты</h4>
            <a href="mailto:info@ailip.ru" className="text-sm text-white/40 hover:text-white transition-colors block mb-4">
              info@ailip.ru
            </a>
            <div className="flex gap-2">
              {["TG", "VK"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center text-white/40 text-xs font-bold hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-5 border-t border-white/[0.04]">
          <p className="text-xs text-white/20">© 2026 AiLip. Все права защищены.</p>
          <p className="text-xs text-white/15">ИП [Реквизиты уточняются] · ОГРНИП [—] · ИНН [—]</p>
        </div>
      </div>

    </footer>
  );
}
