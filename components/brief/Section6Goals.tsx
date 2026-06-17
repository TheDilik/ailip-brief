"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

const GOALS = [
  { id: "lead_generation", label: "Генерация лидов", sub: "Заявки через сайт" },
  { id: "brand_positioning", label: "Позиционирование бренда", sub: "Статус и узнаваемость" },
  { id: "new_markets", label: "Выход на новые рынки", sub: "Новые регионы или сегменты" },
  { id: "sales_support", label: "Поддержка продаж", sub: "Презентация для клиентов" },
  { id: "portfolio_showcase", label: "Портфолио", sub: "Демонстрация проектов" },
  { id: "investor_attraction", label: "Привлечение инвесторов", sub: "IR-функция сайта" },
  { id: "recruitment", label: "Найм сотрудников", sub: "HR-страница" },
  { id: "site_replacement", label: "Замена устаревшего сайта", sub: "Редизайн и ребрендинг" },
  { id: "vision_2030", label: "Vision 2030 / ESG", sub: "Соответствие стратегии KSA" },
];

export default function Section6Goals() {
  const { data, setField, sectionCompletion } = useBrief();

  const setGoal = (id: string, value: number) => {
    setField("goals_priority", { ...data.goals_priority, [id]: value });
  };

  const RATINGS = [1, 2, 3, 4, 5];
  const LABELS: Record<number, string> = { 1: "Низкий", 2: "Ниже среднего", 3: "Средний", 4: "Высокий", 5: "Критический" };

  return (
    <SectionWrapper id="section-6" number={6} title="Цели и KPI" subtitle="Расставьте приоритеты бизнес-задач для сайта" completion={sectionCompletion[5]}>
      <div className="space-y-6">
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="brief-table min-w-[500px]">
            <thead>
              <tr>
                <th>Цель</th>
                <th className="text-center" colSpan={5}>Приоритет (1 = низкий → 5 = критический)</th>
                <th className="text-center w-24">Выбрано</th>
              </tr>
            </thead>
            <tbody>
              {GOALS.map(goal => {
                const current = data.goals_priority[goal.id] || 0;
                return (
                  <tr key={goal.id}>
                    <td>
                      <div className="text-sm text-ink">{goal.label}</div>
                      <div className="text-muted text-xs">{goal.sub}</div>
                    </td>
                    {RATINGS.map(r => (
                      <td key={r} className="text-center px-1">
                        <button
                          onClick={() => setGoal(goal.id, current === r ? 0 : r)}
                          className={`rating-btn mx-auto ${current === r ? "active" : ""}`}
                          title={LABELS[r]}
                        >
                          {r}
                        </button>
                      </td>
                    ))}
                    <td className="text-center">
                      {current > 0 ? (
                        <span className="text-accent text-sm font-bold">{LABELS[current]}</span>
                      ) : (
                        <span className="text-muted text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="gold-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="brief-label">Целевое количество лидов в месяц</label>
            <input
              type="number"
              className="brief-input"
              placeholder="например: 30"
              value={data.monthly_leads_target}
              onChange={e => setField("monthly_leads_target", e.target.value)}
            />
          </div>
          <div />
        </div>

        <div>
          <label className="brief-label">Критерии успеха проекта</label>
          <p className="text-muted text-xs mb-2">Как вы поймёте, что сайт работает? Что должно измениться за 6 месяцев?</p>
          <textarea
            rows={4}
            className="brief-input"
            value={data.success_criteria}
            onChange={e => setField("success_criteria", e.target.value)}
            placeholder="Например: органический трафик вырастет до 1000 посетителей/мес., конверсия в заявку 2%+, 5 запросов через форму ежемесячно..."
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
