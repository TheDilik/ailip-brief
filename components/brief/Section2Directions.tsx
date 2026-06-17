"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

const DIRECTIONS = [
  { id: "residential_construction", label: "Жилое строительство" },
  { id: "commercial_construction", label: "Коммерческое строительство" },
  { id: "industrial_construction", label: "Промышленное строительство" },
  { id: "hospitality", label: "Гостиничный сектор (Hospitality)" },
  { id: "general_contractor", label: "Генеральный подрядчик" },
  { id: "architecture_design", label: "Архитектурное проектирование" },
  { id: "bim_modeling", label: "BIM-моделирование" },
  { id: "project_management", label: "Управление проектами" },
  { id: "interior_fit_out", label: "Interior Fit-Out" },
  { id: "facade_works", label: "Фасадные работы" },
  { id: "landscape", label: "Ландшафтный дизайн" },
  { id: "custom_furniture", label: "Мебель на заказ" },
  { id: "cabinet_furniture", label: "Корпусная мебель" },
  { id: "soft_furniture", label: "Мягкая мебель" },
  { id: "kitchens", label: "Кухни" },
  { id: "office_furniture", label: "Офисная мебель" },
  { id: "outdoor_furniture", label: "Уличная мебель" },
  { id: "decor_accessories", label: "Декор и аксессуары" },
  { id: "furniture_import", label: "Импорт мебели" },
  { id: "interior_design", label: "Дизайн интерьеров" },
];

const GROUPS = [
  { title: "🏗️ Строительство", ids: ["residential_construction", "commercial_construction", "industrial_construction", "hospitality", "general_contractor"] },
  { title: "📐 Проектирование", ids: ["architecture_design", "bim_modeling", "project_management", "interior_fit_out", "facade_works", "landscape"] },
  { title: "🛋️ Мебель", ids: ["custom_furniture", "cabinet_furniture", "soft_furniture", "kitchens", "office_furniture", "outdoor_furniture", "decor_accessories", "furniture_import", "interior_design"] },
];

export default function Section2Directions() {
  const { data, setField, sectionCompletion } = useBrief();

  const toggle = (id: string) => {
    const dirs = data.directions.includes(id)
      ? data.directions.filter(d => d !== id)
      : [...data.directions, id];
    setField("directions", dirs);
  };

  const hasOther = data.directions.includes("other");

  return (
    <SectionWrapper id="section-2" number={2} title="Направления деятельности" subtitle="Выберите все применимые направления" completion={sectionCompletion[1]}>
      <div className="space-y-8">
        {GROUPS.map(group => (
          <div key={group.title}>
            <div className="text-xs font-semibold text-muted tracking-widest uppercase mb-4">{group.title}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {group.ids.map(id => {
                const dir = DIRECTIONS.find(d => d.id === id)!;
                const checked = data.directions.includes(id);
                return (
                  <label
                    key={id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      checked
                        ? "border-border-strong bg-accent-soft text-ink"
                        : "border-border text-muted hover:border-border-strong hover:text-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="brief-checkbox"
                      checked={checked}
                      onChange={() => toggle(id)}
                    />
                    <span className="text-sm font-medium">{dir.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Other */}
        <div>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-white/8 hover:border-gold/20 cursor-pointer transition-all mb-3"
            style={undefined}>
            <input type="checkbox" className="brief-checkbox" checked={hasOther} onChange={() => toggle("other")} />
            <span className="text-sm font-inter text-muted">Другое направление</span>
          </label>
          {hasOther && (
            <input
              type="text"
              className="brief-input"
              placeholder="Укажите другое направление деятельности..."
              value={data.other_directions}
              onChange={e => setField("other_directions", e.target.value)}
            />
          )}
        </div>

        {data.directions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs text-muted">Выбрано:</span>
            {data.directions.map(id => {
              const d = DIRECTIONS.find(x => x.id === id);
              return (
                <span key={id} className="px-2 py-0.5 rounded-full bg-accent-soft text-accent text-xs font-semibold">
                  {d?.label || id}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
