"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

function T({ id, label, rows = 3, sub, value, onChange }: { id: string; label: string; rows?: number; sub?: string; value: string; onChange: (id: any, v: string) => void }) {
  return (
    <div>
      <label className="brief-label">{label}</label>
      {sub && <p className="text-muted text-xs mb-2">{sub}</p>}
      <textarea rows={rows} className="brief-input" value={value} onChange={e => onChange(id, e.target.value)} />
    </div>
  );
}

function F({ id, label, rtl = false, placeholder = "", value, onChange }: { id: string; label: string; rtl?: boolean; placeholder?: string; value: string; onChange: (id: any, v: string) => void }) {
  return (
    <div>
      <label className="brief-label">{label}</label>
      <input type="text" dir={rtl ? "rtl" : undefined} className="brief-input" placeholder={placeholder}
        value={value} onChange={e => onChange(id, e.target.value)}
        style={rtl ? { fontFamily: "'Noto Sans Arabic', var(--font-inter), sans-serif" } : undefined} />
    </div>
  );
}

export default function Section3Positioning() {
  const { data, setField, sectionCompletion } = useBrief();

  const updateStat = (index: number, value: string) => {
    const stats = [...data.key_stats];
    stats[index] = { ...stats[index], value };
    setField("key_stats", stats);
  };

  return (
    <SectionWrapper id="section-3" number={3} title="Позиционирование" subtitle="Кто вы, что делаете, чем гордитесь" completion={sectionCompletion[2]}>
      <div className="space-y-6">
        <T id="company_description" label="Описание компании" rows={4} sub="Расскажите о компании в свободной форме — для главной страницы сайта" value={data.company_description} onChange={setField} />
        <T id="company_history" label="История компании" rows={3} sub="Как всё началось, ключевые вехи" value={data.company_history} onChange={setField} />
        <T id="mission_vision" label="Миссия и видение" rows={2} value={data.mission_vision} onChange={setField} />
        <T id="brand_values" label="Ценности бренда" rows={2} sub="3–5 ключевых ценностей" value={data.brand_values} onChange={setField} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="tagline_en" label="Слоган (English)" placeholder="Building Excellence Across the Kingdom" value={data.tagline_en} onChange={setField} />
          <F id="tagline_ar" label="الشعار (عربي)" rtl placeholder="نبني التميز في كل مكان" value={data.tagline_ar} onChange={setField} />
        </div>

        <div className="gold-divider" />

        {/* Key stats */}
        <div>
          <label className="brief-label mb-4 block">Ключевые цифры компании</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.key_stats.map((stat, i) => (
              <div key={stat.key} className="brief-card p-3 border border-white/8">
                <div className="text-xs text-muted mb-2">{stat.label}</div>
                <input
                  type="text"
                  className="brief-input py-2 text-lg font-playfair font-bold text-gold"
                  placeholder="—"
                  value={stat.value}
                  onChange={e => updateStat(i, e.target.value)}
                  style={{ fontSize: "18px" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="gold-divider" />

        <T id="landmark_projects" label="Знаковые проекты" rows={5} sub="Ваши самые гордые реализованные проекты — название, тип, масштаб, особенность" value={data.landmark_projects} onChange={setField} />
        <T id="notable_clients" label="Ключевые клиенты" rows={2} sub="Застройщики, госструктуры, крупные бренды" value={data.notable_clients} onChange={setField} />
        <T id="certificates_licenses" label="Сертификаты и лицензии" rows={2} sub="ISO, Aramco, MOMRA, Vision 2030, другие" value={data.certificates_licenses} onChange={setField} />
      </div>
    </SectionWrapper>
  );
}
