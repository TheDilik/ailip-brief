"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBrief } from "@/lib/brief-context";

const SECTION_NAMES = [
  "О компании", "Направления деятельности", "Позиционирование",
  "Конкурентный анализ", "Целевая аудитория", "Цели и KPI",
  "Структура и контент", "Дизайн и стиль", "Технические требования",
  "Бюджет и сроки",
];

export default function SubmissionSection({ onSuccess }: { onSuccess: (id: string) => void }) {
  const { data, setField, sectionCompletion, saveNow } = useBrief();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPct = Math.round(sectionCompletion.reduce((a, b) => a + b, 0) / sectionCompletion.length * 100);

  const handleSubmit = async () => {
    if (!data.contact_name || !data.email) {
      setError("Укажите имя и email в разделе 1 (О компании).");
      return;
    }
    setError("");
    setLoading(true);
    saveNow();
    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        onSuccess(json.submissionId);
        localStorage.removeItem("brief_pro_data");
      } else {
        setError(json.error || "Ошибка отправки.");
      }
    } catch {
      setError("Не удалось отправить. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">Финальный шаг</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-2">
              Почти готово
            </h2>
            <p className="text-muted">Проверьте заполненность и отправьте бриф</p>
          </div>

          {/* Progress overview */}
          <div className="brief-card p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted">Общая заполненность</span>
              <span className="text-2xl font-bold text-ink tabular-nums">{totalPct}%</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-ink rounded-full"
                style={{ width: `${totalPct}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {SECTION_NAMES.map((name, i) => {
                const pct = sectionCompletion[i] ?? 0;
                const isDone = pct >= 0.7;
                const isPartial = pct > 0 && !isDone;
                return (
                  <button
                    key={i}
                    onClick={() => document.getElementById(`section-${i + 1}`)?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-start gap-2 p-2.5 rounded-lg border border-border hover:border-border-strong hover:bg-surface text-left transition-all"
                  >
                    <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                      isDone ? "bg-green-500 text-white" : isPartial ? "bg-accent text-white" : "bg-surface text-faint"
                    }`}>
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span className="text-xs text-muted leading-tight">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signature */}
          <div className="brief-card p-6 mb-6">
            <h3 className="font-bold text-lg text-ink mb-4">Подпись и подтверждение</h3>
            <div className="h-px bg-border mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="brief-label required">Имя клиента</label>
                <input type="text" className="brief-input" placeholder="Полное имя / ФИО"
                  value={data.client_name} onChange={e => setField("client_name", e.target.value)} />
              </div>
              <div>
                <label className="brief-label required">Дата</label>
                <input type="date" className="brief-input"
                  value={data.client_signature_date} onChange={e => setField("client_signature_date", e.target.value)} />
              </div>
            </div>
            <p className="text-muted text-xs leading-relaxed">
              Подтверждаю достоверность предоставленных данных. Бриф будет использован для разработки коммерческого предложения.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-gold text-sm px-10 py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                  </svg>
                  <span>Отправляем...</span>
                </>
              ) : (
                <>
                  <span>Отправить бриф</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </>
              )}
            </button>
            <p className="text-xs text-muted">
              Копия придёт на {data.email || "ваш email"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
