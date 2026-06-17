"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

const PAGE_BLOCKS = [
  "Главная страница", "О компании", "Наши услуги (каталог)", "Портфолио проектов",
  "Отдельные страницы услуг", "Кейсы / case studies", "Команда", "Клиенты / партнёры",
  "Отзывы", "Блог / новости", "Сертификаты и лицензии", "Карьера / HR",
  "Контакты", "Форма заявки", "Калькулятор стоимости", "Онлайн-чат / WhatsApp кнопка",
  "Раздел Инвесторам", "ESG / Vision 2030", "Каталог мебели с фильтрами", "Личный кабинет клиента",
];

const CONTENT_TYPES = [
  "Тексты страниц (копирайтинг)", "Переводы на арабский язык",
  "Профессиональные фото компании/проектов", "3D-визуализации / рендеры",
  "Видеоролик о компании", "Видео о процессе производства",
  "Фото готовых объектов", "Документы, лицензии, сертификаты (PDF)",
  "Логотип и фирменный стиль", "Иконки и иллюстрации",
  "Отзывы клиентов (тексты)", "Список клиентов с логотипами",
];

const BLOCK_OPTIONS = ["Обязательно", "Желательно", "Не нужно"] as const;
const CONTENT_OPTIONS = ["Готов", "Нужно создать", "Частично готов"] as const;

export default function Section7Content() {
  const { data, setField, sectionCompletion } = useBrief();

  const setBlock = (block: string, val: string) =>
    setField("page_blocks", { ...data.page_blocks, [block]: val });

  const setContent = (type: string, val: string) =>
    setField("content_availability", { ...data.content_availability, [type]: val });

  const colorMap: Record<string, string> = {
    "Обязательно": "text-green-600",
    "Желательно": "text-accent",
    "Не нужно": "text-muted",
    "Готов": "text-green-600",
    "Нужно создать": "text-amber-400",
    "Частично готов": "text-accent",
  };

  return (
    <SectionWrapper id="section-7" number={7} title="Структура и контент" subtitle="Какие страницы нужны и что с материалами" completion={sectionCompletion[6]}>
      <div className="space-y-8">
        {/* Page blocks */}
        <div>
          <label className="brief-label mb-4 block">Страницы и блоки сайта</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th>Страница / блок</th>
                  {BLOCK_OPTIONS.map(o => <th key={o} className={`text-center ${colorMap[o]}`}>{o}</th>)}
                </tr>
              </thead>
              <tbody>
                {PAGE_BLOCKS.map(block => {
                  const val = data.page_blocks[block] || "";
                  return (
                    <tr key={block}>
                      <td className="text-sm">{block}</td>
                      {BLOCK_OPTIONS.map(opt => (
                        <td key={opt} className="text-center">
                          <input
                            type="radio"
                            className="brief-radio"
                            name={`block-${block}`}
                            checked={val === opt}
                            onChange={() => setBlock(block, opt)}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gold-divider" />

        {/* Content availability */}
        <div>
          <label className="brief-label mb-4 block">Наличие контента</label>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="brief-table min-w-[500px]">
              <thead>
                <tr>
                  <th>Тип контента</th>
                  {CONTENT_OPTIONS.map(o => <th key={o} className={`text-center ${colorMap[o]}`}>{o}</th>)}
                </tr>
              </thead>
              <tbody>
                {CONTENT_TYPES.map(type => {
                  const val = data.content_availability[type] || "";
                  return (
                    <tr key={type}>
                      <td className="text-sm">{type}</td>
                      {CONTENT_OPTIONS.map(opt => (
                        <td key={opt} className="text-center">
                          <input
                            type="radio"
                            className="brief-radio"
                            name={`content-${type}`}
                            checked={val === opt}
                            onChange={() => setContent(type, opt)}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <label className="brief-label">Что нужно создать с нуля?</label>
          <p className="text-muted text-xs mb-2">Уточните, какой контент вам нужно создать и есть ли ТЗ или референсы</p>
          <textarea rows={4} className="brief-input" value={data.content_to_create} onChange={e => setField("content_to_create", e.target.value)} />
        </div>
      </div>
    </SectionWrapper>
  );
}
