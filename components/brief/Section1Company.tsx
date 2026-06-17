"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";

export default function Section1Company() {
  const { data, setField, sectionCompletion } = useBrief();

  const F = ({ id, label, type = "text", placeholder = "", rtl = false, required = false }: {
    id: keyof typeof data; label: string; type?: string; placeholder?: string; rtl?: boolean; required?: boolean;
  }) => (
    <div>
      <label className={`brief-label ${required ? "required" : ""}`}>{label}</label>
      <input
        type={type}
        dir={rtl ? "rtl" : undefined}
        className="brief-input"
        placeholder={placeholder}
        value={data[id] as string}
        onChange={e => setField(id, e.target.value)}
        style={rtl ? { fontFamily: "'Noto Sans Arabic', var(--font-inter), sans-serif" } : undefined}
      />
    </div>
  );

  const T = ({ id, label, rows = 3, rtl = false }: {
    id: keyof typeof data; label: string; rows?: number; rtl?: boolean;
  }) => (
    <div>
      <label className="brief-label">{label}</label>
      <textarea
        rows={rows}
        dir={rtl ? "rtl" : undefined}
        className="brief-input"
        value={data[id] as string}
        onChange={e => setField(id, e.target.value)}
        style={rtl ? { fontFamily: "'Noto Sans Arabic', var(--font-inter), sans-serif" } : undefined}
      />
    </div>
  );

  return (
    <SectionWrapper id="section-1" number={1} title="О компании" subtitle="Базовая информация о вашем бизнесе" completion={sectionCompletion[0]}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="company_name_en" label="Название компании (English)" required placeholder="e.g. Al-Maskan Construction Co." />
          <F id="company_name_ar" label="اسم الشركة (عربي)" rtl placeholder="شركة المسكن للبناء" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="brand_name" label="Бренд / торговое название" placeholder="Maskan" />
          <F id="founded_year" label="Год основания" type="number" placeholder="2005" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <F id="employees_count" label="Кол-во сотрудников" placeholder="50–200" />
          <F id="cr_number" label="CR Number (Commercial Register)" placeholder="1010XXXXXX" />
          <F id="vat_number" label="VAT Number" placeholder="3XXXXXXXXXXXXXXXX3" />
        </div>

        <div className="gold-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <T id="legal_address" label="Юридический адрес" rows={2} />
          <T id="showroom_address" label="Адрес шоурума / офиса" rows={2} />
        </div>

        <div className="gold-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="contact_name" label="Контактное лицо" required placeholder="Иван Иванов / محمد العمري" />
          <F id="contact_position" label="Должность" placeholder="CEO / Генеральный директор" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <F id="phone_whatsapp" label="Телефон / WhatsApp" required type="tel" placeholder="+966 5X XXX XXXX" />
          <F id="email" label="Email" required type="email" placeholder="info@company.sa" />
          <F id="website" label="Текущий сайт" type="url" placeholder="https://company.sa" />
        </div>

        <F id="social_links" label="Ссылки на соцсети (Instagram, LinkedIn, Twitter/X)" placeholder="instagram.com/..., linkedin.com/company/..." />
      </div>
    </SectionWrapper>
  );
}
