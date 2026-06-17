"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";
import { CompetitorRow, CompetitorSiteRow } from "@/types/brief";

export default function Section4Competitors() {
  const { data, setField, sectionCompletion } = useBrief();

  const updateCompetitor = (i: number, field: keyof CompetitorRow, value: string) => {
    const rows = data.competitors.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setField("competitors", rows);
  };

  const addCompetitor = () => setField("competitors", [...data.competitors, { name: "", website: "", strengths: "", weaknesses: "", our_advantage: "" }]);
  const removeCompetitor = (i: number) => setField("competitors", data.competitors.filter((_, idx) => idx !== i));

  const updateSite = (i: number, field: keyof CompetitorSiteRow, value: string) => {
    const rows = data.competitor_sites.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setField("competitor_sites", rows);
  };

  const T = ({ id, label, rows = 3, sub }: { id: keyof typeof data; label: string; rows?: number; sub?: string }) => (
    <div>
      <label className="brief-label">{label}</label>
      {sub && <p className="text-muted text-xs mb-2">{sub}</p>}
      <textarea rows={rows} className="brief-input" value={data[id] as string} onChange={e => setField(id, e.target.value)} />
    </div>
  );

  return (
    <SectionWrapper id="section-4" number={4} title="Конкурентный анализ" subtitle="Кто ваши конкуренты и чем вы лучше" completion={sectionCompletion[3]}>
      <div className="space-y-8">
        {/* Competitors table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="brief-label mb-0">Прямые конкуренты</label>
            <button onClick={addCompetitor} className="btn-ghost py-1 px-3 text-xs">+ Добавить</button>
          </div>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[700px]">
              <thead>
                <tr>
                  <th className="w-6">#</th>
                  <th>Название</th>
                  <th>Сайт</th>
                  <th>Сильные стороны</th>
                  <th>Слабые стороны</th>
                  <th>Наше преимущество</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {data.competitors.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted text-xs text-center">{i + 1}</td>
                    {(["name", "website", "strengths", "weaknesses", "our_advantage"] as (keyof CompetitorRow)[]).map(f => (
                      <td key={f}>
                        <input
                          type="text"
                          className="brief-input py-2 text-sm"
                          value={row[f]}
                          onChange={e => updateCompetitor(i, f, e.target.value)}
                          placeholder="—"
                        />
                      </td>
                    ))}
                    <td>
                      {data.competitors.length > 1 && (
                        <button onClick={() => removeCompetitor(i)} className="text-muted hover:text-red-400 text-sm transition-colors">✕</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <T id="indirect_competitors" label="Косвенные конкуренты" rows={2} sub="Компании, которые решают ту же проблему другим путём" />
        <T id="unique_selling_proposition" label="Уникальное торговое предложение (УТП)" rows={3} />
        <T id="sales_argument" label="Главный аргумент продаж" rows={2} sub="Почему клиент должен выбрать именно вас?" />
        <T id="common_objections" label="Типичные возражения клиентов" rows={3} sub="Что обычно говорят клиенты, когда сомневаются?" />

        {/* Competitor sites */}
        <div>
          <label className="brief-label mb-4 block">Сайты конкурентов — разбор</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th className="w-6">#</th>
                  <th>URL сайта</th>
                  <th>Что понравилось</th>
                  <th>Что не понравилось</th>
                </tr>
              </thead>
              <tbody>
                {data.competitor_sites.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted text-xs text-center">{i + 1}</td>
                    {(["url", "liked", "disliked"] as (keyof CompetitorSiteRow)[]).map(f => (
                      <td key={f}>
                        <input
                          type="text"
                          className="brief-input py-2 text-sm"
                          value={row[f]}
                          onChange={e => updateSite(i, f, e.target.value)}
                          placeholder="—"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
