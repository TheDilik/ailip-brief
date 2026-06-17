"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

const LANGUAGE_OPTIONS = [
  { id: "en_required", label: "Английский обязателен" },
  { id: "ar_rtl_required", label: "Арабский (RTL) обязателен" },
  { id: "separate_ar_design", label: "Отдельный дизайн для арабской версии" },
  { id: "geo_autodetect", label: "Автоопределение языка по IP/браузеру" },
  { id: "manual_language_switch", label: "Ручное переключение языка" },
  { id: "separate_seo_urls", label: "Отдельные URL для SEO (en/, ar/)" },
];

const FEATURES = [
  { id: "online_request_form", label: "Форма онлайн-заявки" },
  { id: "whatsapp_button", label: "Кнопка WhatsApp / чат" },
  { id: "portfolio_filter", label: "Портфолио с фильтрацией" },
  { id: "furniture_catalog", label: "Каталог мебели" },
  { id: "project_3d_viewer", label: "3D-просмотр проектов" },
  { id: "cost_calculator", label: "Калькулятор стоимости" },
  { id: "crm_integration", label: "Интеграция с CRM" },
  { id: "analytics_ga4", label: "Google Analytics 4 / GTM" },
  { id: "seo_optimization", label: "SEO-оптимизация" },
  { id: "blog_cms", label: "Блог / новости (CMS)" },
  { id: "social_feed", label: "Лента Instagram/LinkedIn" },
  { id: "video_bg", label: "Видео на фоне главной" },
  { id: "map_integration", label: "Карта (Google Maps / Yandex)" },
  { id: "careers_section", label: "Раздел вакансии / HR" },
  { id: "live_chat", label: "Онлайн-чат (Intercom / Tawk)" },
  { id: "multilang_admin", label: "Многоязычная админ-панель" },
  { id: "client_cabinet", label: "Личный кабинет клиента" },
  { id: "payment_gateway", label: "Приём платежей онлайн" },
  { id: "ar_virtual_staging", label: "AR / виртуальный стейджинг" },
  { id: "pdf_generator", label: "Генерация коммерческих предложений (PDF)" },
  { id: "email_marketing", label: "Интеграция email-маркетинга" },
  { id: "speed_optimization", label: "Оптимизация скорости (Core Web Vitals)" },
  { id: "ssl_security", label: "SSL, защита от DDoS" },
  { id: "accessibility_wcag", label: "Доступность WCAG 2.1" },
];

const FEATURE_OPTIONS = ["Нужно", "Не нужно", "Обсудить"] as const;

const CMS_OPTIONS = [
  { id: "wordpress", label: "WordPress" },
  { id: "webflow", label: "Webflow" },
  { id: "next_custom", label: "Next.js (custom)" },
  { id: "strapi", label: "Strapi / Headless CMS" },
  { id: "sanity", label: "Sanity" },
  { id: "contentful", label: "Contentful" },
  { id: "trust_studio", label: "Доверяю студии" },
];

const colorMap: Record<string, string> = {
  "Нужно": "text-green-600",
  "Не нужно": "text-muted",
  "Обсудить": "text-accent",
};

export default function Section9Technical() {
  const { data, setField, sectionCompletion } = useBrief();

  const toggleLang = (id: string) => {
    const langs = data.languages.includes(id)
      ? data.languages.filter(l => l !== id)
      : [...data.languages, id];
    setField("languages", langs);
  };

  const toggleCms = (id: string) => {
    const cms = data.cms.includes(id)
      ? data.cms.filter(c => c !== id)
      : [...data.cms, id];
    setField("cms", cms);
  };

  const setFeature = (id: string, val: string) =>
    setField("features", { ...data.features, [id]: val });

  return (
    <SectionWrapper id="section-9" number={9} title="Технические требования" subtitle="Языки, функционал и предпочтения по CMS" completion={sectionCompletion[8]}>
      <div className="space-y-8">
        {/* Languages */}
        <div>
          <label className="brief-label mb-4 block">Языковые версии сайта</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {LANGUAGE_OPTIONS.map(opt => {
              const checked = data.languages.includes(opt.id);
              return (
                <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  checked ? "border-ink bg-surface" : "border-border hover:border-border-strong"
                }`}>
                  <input type="checkbox" className="brief-checkbox" checked={checked} onChange={() => toggleLang(opt.id)} />
                  <span className="text-sm text-ink">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="brief-label">Домен</label>
            <input type="text" className="brief-input" placeholder="company.sa / company.com" value={data.domain} onChange={e => setField("domain", e.target.value)} />
          </div>
          <div>
            <label className="brief-label">Хостинг</label>
            <select className="brief-input" value={data.hosting_status} onChange={e => setField("hosting_status", e.target.value)}>
              <option value="">— Выберите —</option>
              <option value="has">Есть свой хостинг / сервер</option>
              <option value="needs">Нужен хостинг (поможем выбрать)</option>
              <option value="no">Нет, рассмотрим варианты</option>
            </select>
          </div>
        </div>

        <div className="gold-divider" />

        {/* Features matrix */}
        <div>
          <label className="brief-label mb-4 block">Функционал сайта</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[400px]">
              <thead>
                <tr>
                  <th>Функция</th>
                  {FEATURE_OPTIONS.map(o => <th key={o} className={`text-center w-24 ${colorMap[o]}`}>{o}</th>)}
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map(feat => {
                  const val = data.features[feat.id] || "";
                  return (
                    <tr key={feat.id}>
                      <td className="text-sm">{feat.label}</td>
                      {FEATURE_OPTIONS.map(opt => (
                        <td key={opt} className="text-center">
                          <input type="radio" className="brief-radio" name={`feat-${feat.id}`}
                            checked={val === opt} onChange={() => setFeature(feat.id, opt)} />
                        </td>
                      ))}
                      <td>
                        <input type="text" className="brief-input py-1.5 text-xs" placeholder="—"
                          value={data.features[`${feat.id}_comment`] || ""}
                          onChange={e => setFeature(`${feat.id}_comment`, e.target.value)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gold-divider" />

        {/* CMS */}
        <div>
          <label className="brief-label mb-4 block">Предпочтение по CMS</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {CMS_OPTIONS.map(opt => {
              const checked = data.cms.includes(opt.id);
              return (
                <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  checked ? "border-ink bg-surface" : "border-border hover:border-border-strong"
                }`}>
                  <input type="checkbox" className="brief-checkbox" checked={checked} onChange={() => toggleCms(opt.id)} />
                  <span className="text-sm text-ink">{opt.label}</span>
                </label>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="brief-label">Другая CMS</label>
              <input type="text" className="brief-input" placeholder="Ghost, Notion, другое..." value={data.cms_other} onChange={e => setField("cms_other", e.target.value)} />
            </div>
            <div>
              <label className="brief-label">Кто будет управлять сайтом?</label>
              <textarea rows={2} className="brief-input" placeholder="IT-отдел / маркетолог / вы сами..." value={data.cms_manager} onChange={e => setField("cms_manager", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
