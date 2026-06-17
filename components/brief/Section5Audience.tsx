"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";
import { AudienceSegment } from "@/types/brief";

const SEGMENT_FIELDS: { key: keyof AudienceSegment; label: string; rows?: number }[] = [
  { key: "portrait", label: "Портрет (кто этот человек?)", rows: 2 },
  { key: "age_gender", label: "Возраст и пол" },
  { key: "location", label: "Местоположение" },
  { key: "language", label: "Язык общения" },
  { key: "income_budget", label: "Доход / бюджет" },
  { key: "selection_criteria", label: "Критерии выбора", rows: 2 },
  { key: "how_they_search", label: "Как ищут подрядчика" },
  { key: "online_presence", label: "Онлайн-активность" },
  { key: "main_fear", label: "Главный страх / боль", rows: 2 },
  { key: "what_convinces_them", label: "Что убеждает принять решение", rows: 2 },
];

function SegmentCard({ title, segKey, data, onChange }: {
  title: string;
  segKey: "audience_segment_1" | "audience_segment_2";
  data: AudienceSegment;
  onChange: (field: keyof AudienceSegment, value: string) => void;
}) {
  return (
    <div className="brief-card p-5 border border-border">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-full bg-accent-soft flex items-center justify-center text-accent text-xs font-bold">
          {title[title.length - 1]}
        </div>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="space-y-4">
        {SEGMENT_FIELDS.map(f => (
          <div key={f.key}>
            <label className="brief-label">{f.label}</label>
            {f.rows ? (
              <textarea rows={f.rows} className="brief-input" value={data[f.key]} onChange={e => onChange(f.key, e.target.value)} />
            ) : (
              <input type="text" className="brief-input" value={data[f.key]} onChange={e => onChange(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Section5Audience() {
  const { data, setField, setNestedField, sectionCompletion } = useBrief();

  const T = ({ id, label, rows = 3, sub }: { id: keyof typeof data; label: string; rows?: number; sub?: string }) => (
    <div>
      <label className="brief-label">{label}</label>
      {sub && <p className="text-muted text-xs mb-2">{sub}</p>}
      <textarea rows={rows} className="brief-input" value={data[id] as string} onChange={e => setField(id, e.target.value)} />
    </div>
  );

  const F = ({ id, label }: { id: keyof typeof data; label: string }) => (
    <div>
      <label className="brief-label">{label}</label>
      <input type="text" className="brief-input" value={data[id] as string} onChange={e => setField(id, e.target.value)} />
    </div>
  );

  return (
    <SectionWrapper id="section-5" number={5} title="Целевая аудитория" subtitle="Кто ваши клиенты и как они принимают решения" completion={sectionCompletion[4]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SegmentCard
            title="Сегмент A"
            segKey="audience_segment_1"
            data={data.audience_segment_1}
            onChange={(field, value) => setNestedField(`audience_segment_1.${field}`, value)}
          />
          <SegmentCard
            title="Сегмент B"
            segKey="audience_segment_2"
            data={data.audience_segment_2}
            onChange={(field, value) => setNestedField(`audience_segment_2.${field}`, value)}
          />
        </div>

        <div className="gold-divider" />

        <T id="how_clients_find_you" label="Как клиенты сейчас находят вас?" rows={3} sub="Сарафан, выставки, Instagram, Google, tenders.sa, рекомендации..." />
        <T id="sales_funnel" label="Воронка продаж" rows={3} sub="Опишите путь от первого контакта до подписания договора" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="average_deal_cycle" label="Средний цикл сделки" />
          <F id="average_check_sar" label="Средний чек (SAR)" />
        </div>
      </div>
    </SectionWrapper>
  );
}
