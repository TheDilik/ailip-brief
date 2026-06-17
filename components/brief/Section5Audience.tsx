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

        <div>
          <label className="brief-label">Как клиенты сейчас находят вас?</label>
          <p className="text-muted text-xs mb-2">Сарафан, выставки, Instagram, Google, tenders.sa, рекомендации...</p>
          <textarea rows={3} className="brief-input" value={data.how_clients_find_you} onChange={e => setField("how_clients_find_you", e.target.value)} />
        </div>
        <div>
          <label className="brief-label">Воронка продаж</label>
          <p className="text-muted text-xs mb-2">Опишите путь от первого контакта до подписания договора</p>
          <textarea rows={3} className="brief-input" value={data.sales_funnel} onChange={e => setField("sales_funnel", e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="brief-label">Средний цикл сделки</label>
            <input type="text" className="brief-input" value={data.average_deal_cycle} onChange={e => setField("average_deal_cycle", e.target.value)} />
          </div>
          <div>
            <label className="brief-label">Средний чек (SAR)</label>
            <input type="text" className="brief-input" value={data.average_check_sar} onChange={e => setField("average_check_sar", e.target.value)} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
