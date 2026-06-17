"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

const BUDGETS = [
  { id: "under_15k", label: "до 15,000 SAR", desc: "Базовый landing page / одностраничник", tier: "starter" },
  { id: "15k_30k", label: "15,000 – 30,000 SAR", desc: "Корпоративный сайт с блогом и портфолио", tier: "basic" },
  { id: "30k_60k", label: "30,000 – 60,000 SAR", desc: "Многоязычный сайт с CRM-интеграцией", tier: "standard" },
  { id: "60k_100k", label: "60,000 – 100,000 SAR", desc: "Премиальный сайт с каталогом и кабинетом", tier: "premium" },
  { id: "100k_200k", label: "100,000 – 200,000 SAR", desc: "Флагманский сайт c AI-функциями", tier: "enterprise" },
  { id: "200k_plus", label: "200,000+ SAR", desc: "Digital-экосистема уровня NEOM / Aramco", tier: "ultra" },
  { id: "discuss", label: "Обсудим", desc: "Хочу услышать предложение студии", tier: "discuss" },
];

const TIMELINES = [
  { id: "express", label: "⚡ Экспресс", desc: "4–6 недель", sub: "+40% к стоимости" },
  { id: "standard", label: "⚖️ Стандарт", desc: "8–12 недель", sub: "Оптимальное качество" },
  { id: "premium", label: "🏆 Premium", desc: "3–5 месяцев", sub: "Максимальная проработка" },
  { id: "no_limit", label: "∞ Без ограничений", desc: "Качество важнее срока", sub: "Стратегический подход" },
];

const ADDITIONAL_SERVICES = [
  "Стратегия цифрового маркетинга", "SEO-аудит и оптимизация",
  "Google Ads / реклама в поиске", "Meta / Instagram / LinkedIn таргет",
  "Создание контента (тексты)", "Переводы (EN / AR / RU)",
  "Фотосъёмка объектов и команды", "Продакшн видеоролика",
  "3D-визуализация проектов", "Дизайн-система / UI Kit",
  "Брендинг / айдентика", "Создание презентаций (PDF/PPT)",
  "Интеграция с 1C / SAP", "CRM-настройка (Salesforce, HubSpot)",
  "Email-маркетинг / рассылки", "Мобильное приложение",
  "Поддержка и обновления (12 мес.)", "Аналитика и дашборды",
  "Обучение команды работе с CMS", "Ежемесячное SMM-обслуживание",
];

const SVC_OPTIONS = ["Нужно", "Не нужно"] as const;

const COMMUNICATION = [
  { id: "whatsapp", label: "📱 WhatsApp" },
  { id: "zoom", label: "💻 Zoom / Meet" },
  { id: "email", label: "📧 Email" },
  { id: "meetings", label: "🤝 Личные встречи" },
];

export default function Section10Budget() {
  const { data, setField, sectionCompletion } = useBrief();

  const setSvc = (svc: string, val: string) =>
    setField("additional_services", { ...data.additional_services, [svc]: val });

  const toggleComm = (id: string) => {
    const cp = data.communication_preference.includes(id)
      ? data.communication_preference.filter(c => c !== id)
      : [...data.communication_preference, id];
    setField("communication_preference", cp);
  };

  const T = ({ id, label, rows = 3, sub, placeholder = "" }: { id: keyof typeof data; label: string; rows?: number; sub?: string; placeholder?: string }) => (
    <div>
      <label className="brief-label">{label}</label>
      {sub && <p className="text-muted text-xs mb-2">{sub}</p>}
      <textarea rows={rows} className="brief-input" placeholder={placeholder} value={data[id] as string} onChange={e => setField(id, e.target.value)} />
    </div>
  );

  const F = ({ id, label, type = "text", placeholder = "" }: { id: keyof typeof data; label: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="brief-label">{label}</label>
      <input type={type} className="brief-input" placeholder={placeholder} value={data[id] as string} onChange={e => setField(id, e.target.value)} />
    </div>
  );

  const tierColors: Record<string, string> = {
    starter: "border-border",
    basic: "border-border",
    standard: "border-border",
    premium: "border-border",
    enterprise: "border-border",
    ultra: "border-ink border-2",
    discuss: "border-border",
  };

  return (
    <SectionWrapper id="section-10" number={10} title="Бюджет, сроки и финальные вопросы" subtitle="Последний шаг — расскажите о бюджете и сроках" completion={sectionCompletion[9]}>
      <div className="space-y-8">
        {/* Budget */}
        <div>
          <label className="brief-label mb-4 block">Бюджет на разработку сайта</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {BUDGETS.map(b => {
              const selected = data.budget === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setField("budget", selected ? "" : b.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${tierColors[b.tier]} ${
                    selected ? "bg-surface shadow-card" : "hover:border-border-strong bg-canvas"
                  }`}
                >
                  <div className="text-sm font-bold text-ink mb-1">{b.label}</div>
                  <div className="text-muted text-xs leading-relaxed">{b.desc}</div>
                  {selected && <div className="mt-2 text-accent text-xs font-semibold">✓ Выбрано</div>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="content_production_budget" label="Бюджет на создание контента" placeholder="Фото, видео, тексты, переводы..." />
          <F id="marketing_budget" label="Маркетинговый бюджет (после запуска)" placeholder="Google Ads, SEO, SMM..." />
        </div>

        <div className="gold-divider" />

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="desired_launch_date" label="Желаемая дата запуска" type="date" />
          <div>
            <label className="brief-label">Жёсткий дедлайн?</label>
            <div className="flex gap-4 mt-2">
              {["yes", "no"].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" className="brief-radio" checked={data.hard_deadline === v} onChange={() => setField("hard_deadline", v)} />
                  <span className="text-sm text-ink">{v === "yes" ? "Да, жёсткий срок" : "Нет, гибкий"}</span>
                </label>
              ))}
            </div>
            {data.hard_deadline === "yes" && (
              <input type="text" className="brief-input mt-3" placeholder="Причина дедлайна..." value={data.deadline_reason} onChange={e => setField("deadline_reason", e.target.value)} />
            )}
          </div>
        </div>

        <F id="launch_event" label="Событие, к которому приурочен запуск" placeholder="Выставка Big 5, открытие шоурума, тендер..." />

        {/* Timeline */}
        <div>
          <label className="brief-label mb-4 block">Темп разработки</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIMELINES.map(t => {
              const selected = data.timeline === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setField("timeline", selected ? "" : t.id)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selected ? "border-ink bg-surface shadow-card" : "border-border hover:border-border-strong bg-canvas"
                  }`}
                >
                  <div className="text-xl mb-2">{t.label.split(" ")[0]}</div>
                  <div className="text-sm font-bold text-ink">{t.label.slice(t.label.indexOf(" ") + 1)}</div>
                  <div className="text-muted text-xs mt-1">{t.desc}</div>
                  <div className="text-accent text-xs mt-1">{t.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gold-divider" />

        {/* Additional services */}
        <div>
          <label className="brief-label mb-4 block">Дополнительные услуги</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[400px]">
              <thead>
                <tr>
                  <th>Услуга</th>
                  {SVC_OPTIONS.map(o => <th key={o} className="text-center w-24">{o}</th>)}
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {ADDITIONAL_SERVICES.map(svc => {
                  const val = data.additional_services[svc] || "";
                  return (
                    <tr key={svc}>
                      <td className="text-sm">{svc}</td>
                      {SVC_OPTIONS.map(opt => (
                        <td key={opt} className="text-center">
                          <input type="radio" className="brief-radio" name={`svc-${svc}`} checked={val === opt} onChange={() => setSvc(svc, opt)} />
                        </td>
                      ))}
                      <td>
                        <input type="text" className="brief-input py-1.5 text-xs" placeholder="—"
                          value={data.additional_services[`${svc}_comment`] || ""}
                          onChange={e => setSvc(`${svc}_comment`, e.target.value)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gold-divider" />

        {/* Final questions */}
        <T id="ideal_website_description" label="Опишите идеальный сайт своей мечты" rows={5}
          sub="Если бы деньги и время не имели значения — каким бы был ваш сайт?"
          placeholder="Расскажите свободно — стиль, ощущение, что он должен передавать клиентам..." />
        <T id="ksa_specifics" label="Специфика рынка KSA" rows={3}
          sub="Культурные особенности, локальные требования, Vision 2030, Nitaqat, Saudization..."
          placeholder="Например: важен арабский язык для государственных клиентов, нет смешанных фото..." />
        <T id="mistakes_to_avoid" label="Ошибки прошлого / чего избежать" rows={3}
          placeholder="Что не сработало на прошлом сайте? Что хотите сделать иначе?" />
        <T id="anything_else" label="Что ещё важно нам знать?" rows={3}
          placeholder="Любая информация, которая поможет нам лучше понять ваш бизнес..." />
        <T id="mvp_priority" label="MVP — что запустить в первую очередь?" rows={2}
          placeholder="Если нужно запустить быстро — какие 3 страницы / функции критичны?" />

        <div className="gold-divider" />

        {/* Communication */}
        <div>
          <label className="brief-label mb-3 block">Предпочтительный способ коммуникации</label>
          <div className="flex flex-wrap gap-3 mb-5">
            {COMMUNICATION.map(c => {
              const checked = data.communication_preference.includes(c.id);
              return (
                <label key={c.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  checked ? "border-ink bg-surface text-ink" : "border-border text-muted hover:border-border-strong hover:text-ink"
                }`}>
                  <input type="checkbox" className="brief-checkbox" checked={checked} onChange={() => toggleComm(c.id)} />
                  <span className="text-sm">{c.label}</span>
                </label>
              );
            })}
          </div>
          <div>
            <label className="brief-label">Частота обновлений / статусных встреч</label>
            <select className="brief-input" value={data.update_frequency} onChange={e => setField("update_frequency", e.target.value)}>
              <option value="">— Выберите —</option>
              <option value="daily">Ежедневно</option>
              <option value="twice_week">2 раза в неделю</option>
              <option value="weekly">Еженедельно</option>
              <option value="biweekly">Раз в 2 недели</option>
              <option value="as_needed">По необходимости</option>
            </select>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
