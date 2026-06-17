"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";
import { ColorRow, ReferenceRow, NegativeReferenceRow } from "@/types/brief";

const STYLES = [
  { id: "ultra_luxury", label: "Ultra Luxury", desc: "Rolls-Royce / Burj Al Arab", colors: ["#C9A84C", "#0D0D1A", "#F5F5F5"], emoji: "✦" },
  { id: "modern_minimalism", label: "Modern Minimalism", desc: "Apple / Muji-inspired", colors: ["#F0F0F0", "#1A1A1A", "#E0E0E0"], emoji: "◻" },
  { id: "middle_eastern", label: "Middle Eastern", desc: "Arabesque с современностью", colors: ["#1B4332", "#C9A84C", "#F5F0E8"], emoji: "☽" },
  { id: "architectural", label: "Architectural", desc: "Строгий, графичный, точный", colors: ["#2D2D2D", "#E8E8E8", "#4A4A4A"], emoji: "⬡" },
  { id: "organic_premium", label: "Organic Premium", desc: "Натуральные материалы, тепло", colors: ["#8B6B4A", "#F5ECD7", "#4A3728"], emoji: "◉" },
  { id: "tech_forward", label: "Tech Forward", desc: "BIM / умный дом / NEOM", colors: ["#00D4FF", "#0A0E1A", "#1E3A5F"], emoji: "⬟" },
];

const TYPOGRAPHY_OPTIONS = [
  { id: "modern_sans", label: "Modern Sans", preview: "Inter / Helvetica Neue" },
  { id: "classic_serif", label: "Classic Serif", preview: "Playfair Display / Garamond" },
  { id: "geometric", label: "Geometric Sans", preview: "Futura / Montserrat" },
  { id: "arabic_modern", label: "Arabic Modern", preview: "Cairo / Tajawal" },
  { id: "arabic_calligraphic", label: "Arabic Calligraphic", preview: "Amiri / Scheherazade" },
  { id: "trust_designer", label: "Доверяю дизайнеру", preview: "Оставляю выбор студии" },
];

export default function Section8Design() {
  const { data, setField, sectionCompletion } = useBrief();

  const toggleTypo = (id: string) => {
    const typo = data.typography.includes(id)
      ? data.typography.filter(t => t !== id)
      : [...data.typography, id];
    setField("typography", typo);
  };

  const updateColor = (i: number, field: keyof ColorRow, value: string) => {
    const rows = data.color_palette.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setField("color_palette", rows);
  };

  const updatePosRef = (i: number, field: keyof ReferenceRow, value: string) => {
    const rows = data.positive_references.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setField("positive_references", rows);
  };

  const updateNegRef = (i: number, field: keyof NegativeReferenceRow, value: string) => {
    const rows = data.negative_references.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setField("negative_references", rows);
  };

  return (
    <SectionWrapper id="section-8" number={8} title="Дизайн и стиль" subtitle="Визуальное направление вашего сайта" completion={sectionCompletion[7]}>
      <div className="space-y-8">
        {/* Style selector */}
        <div>
          <label className="brief-label mb-4 block">Визуальный стиль</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STYLES.map(s => {
              const selected = data.visual_style === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setField("visual_style", selected ? "" : s.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selected ? "border-ink bg-surface shadow-card" : "border-border hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{s.emoji}</span>
                    {selected && <span className="text-accent text-xs font-semibold">✓ Выбрано</span>}
                  </div>
                  <div className="flex gap-1 mb-3">
                    {s.colors.map((c, i) => (
                      <div key={i} className="w-5 h-5 rounded-full border border-border" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-ink mb-0.5">{s.label}</div>
                  <div className="text-muted text-xs">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gold-divider" />

        {/* Color palette */}
        <div>
          <label className="brief-label mb-4 block">Цветовая палитра (если есть корпоративные цвета)</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th className="w-8">#</th>
                  <th>Роль</th>
                  <th className="w-32">HEX</th>
                  <th className="w-36">RGB</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {data.color_palette.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted text-xs text-center">{i + 1}</td>
                    <td>
                      <input type="text" className="brief-input py-2 text-sm" placeholder="Основной / Фон / Акцент..." value={row.role} onChange={e => updateColor(i, "role", e.target.value)} />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded border border-white/10 flex-shrink-0 cursor-pointer"
                          style={{ background: row.hex || "#333" }}
                          onClick={() => {
                            const inp = document.getElementById(`colorpicker-${i}`) as HTMLInputElement;
                            inp?.click();
                          }}
                        />
                        <input id={`colorpicker-${i}`} type="color" className="sr-only" value={row.hex || "#000000"}
                          onChange={e => updateColor(i, "hex", e.target.value)} />
                        <input type="text" className="brief-input py-2 text-sm font-mono" placeholder="#C9A84C" value={row.hex}
                          onChange={e => updateColor(i, "hex", e.target.value)} />
                      </div>
                    </td>
                    <td>
                      <input type="text" className="brief-input py-2 text-sm" placeholder="201,168,76" value={row.rgb} onChange={e => updateColor(i, "rgb", e.target.value)} />
                    </td>
                    <td>
                      <input type="text" className="brief-input py-2 text-sm" placeholder="Заголовки, CTA..." value={row.comment} onChange={e => updateColor(i, "comment", e.target.value)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gold-divider" />

        {/* Typography */}
        <div>
          <label className="brief-label mb-3 block">Типографика (можно несколько)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {TYPOGRAPHY_OPTIONS.map(t => {
              const checked = data.typography.includes(t.id);
              return (
                <label key={t.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  checked ? "border-ink bg-surface" : "border-border hover:border-border-strong"
                }`}>
                  <input type="checkbox" className="brief-checkbox mt-0.5" checked={checked} onChange={() => toggleTypo(t.id)} />
                  <div>
                    <div className="text-sm text-light">{t.label}</div>
                    <div className="text-xs text-muted">{t.preview}</div>
                  </div>
                </label>
              );
            })}
          </div>
          <div>
            <label className="brief-label">Корпоративный шрифт (если есть)</label>
            <input type="text" className="brief-input" placeholder="Например: Effra, GE Dinar, Brandon Grotesque..."
              value={data.corporate_font} onChange={e => setField("corporate_font", e.target.value)} />
          </div>
        </div>

        <div className="gold-divider" />

        {/* Positive references */}
        <div>
          <label className="brief-label mb-4 block">Сайты, которые нравятся (референсы «как хочу»)</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th className="w-6">#</th>
                  <th>URL</th>
                  <th>Что нравится</th>
                  <th>Что использовать</th>
                </tr>
              </thead>
              <tbody>
                {data.positive_references.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted text-xs text-center">{i + 1}</td>
                    {(["url", "what_liked", "what_to_use"] as (keyof ReferenceRow)[]).map(f => (
                      <td key={f}><input type="text" className="brief-input py-2 text-sm" value={row[f]} onChange={e => updatePosRef(i, f, e.target.value)} placeholder="—" /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Negative references */}
        <div>
          <label className="brief-label mb-4 block">Сайты, которые не нравятся (антиреференсы)</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th className="w-6">#</th>
                  <th>URL</th>
                  <th>Что не нравится</th>
                  <th>Чего избежать</th>
                </tr>
              </thead>
              <tbody>
                {data.negative_references.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted text-xs text-center">{i + 1}</td>
                    {(["url", "what_disliked", "what_to_avoid"] as (keyof NegativeReferenceRow)[]).map(f => (
                      <td key={f}><input type="text" className="brief-input py-2 text-sm" value={row[f]} onChange={e => updateNegRef(i, f, e.target.value)} placeholder="—" /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <label className="brief-label">Запрещённые элементы / чего категорически нельзя</label>
          <textarea rows={3} className="brief-input" value={data.forbidden_elements}
            onChange={e => setField("forbidden_elements", e.target.value)}
            placeholder="Например: нет стоковых фото людей, нет ярких кислотных цветов, нет флипающих баннеров..." />
        </div>
      </div>
    </SectionWrapper>
  );
}
