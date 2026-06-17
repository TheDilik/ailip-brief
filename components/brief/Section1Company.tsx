"use client";

import SectionWrapper from "./SectionWrapper";
import { useBrief } from "@/lib/brief-context";
import { BriefFormData } from "@/types/brief";

const arabicStyle = { fontFamily: "'Noto Sans Arabic', var(--font-inter), sans-serif" };

function F({ id, label, type = "text", placeholder = "", rtl = false, required = false, value, onChange }: {
  id: keyof BriefFormData; label: string; type?: string; placeholder?: string; rtl?: boolean; required?: boolean;
  value: string; onChange: (id: keyof BriefFormData, val: string) => void;
}) {
  return (
    <div>
      <label className={`brief-label ${required ? "required" : ""}`}>{label}</label>
      <input
        type={type}
        dir={rtl ? "rtl" : undefined}
        className="brief-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        style={rtl ? arabicStyle : undefined}
      />
    </div>
  );
}

function T({ id, label, rows = 3, rtl = false, value, onChange }: {
  id: keyof BriefFormData; label: string; rows?: number; rtl?: boolean;
  value: string; onChange: (id: keyof BriefFormData, val: string) => void;
}) {
  return (
    <div>
      <label className="brief-label">{label}</label>
      <textarea
        rows={rows}
        dir={rtl ? "rtl" : undefined}
        className="brief-input"
        value={value}
        onChange={e => onChange(id, e.target.value)}
        style={rtl ? arabicStyle : undefined}
      />
    </div>
  );
}

export default function Section1Company() {
  const { data, setField, sectionCompletion } = useBrief();

  return (
    <SectionWrapper id="section-1" number={1} title="О компании" subtitle="Базовая информация о вашем бизнесе" completion={sectionCompletion[0]}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="company_name_en" label="Название компании (English)" required placeholder="e.g. Al-Maskan Construction Co." value={data.company_name_en} onChange={setField} />
          <F id="company_name_ar" label="اسم الشركة (عربي)" rtl placeholder="شركة المسكن للبناء" value={data.company_name_ar} onChange={setField} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="brand_name" label="Бренд / торговое название" placeholder="Maskan" value={data.brand_name} onChange={setField} />
          <F id="founded_year" label="Год основания" type="number" placeholder="2005" value={data.founded_year} onChange={setField} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <F id="employees_count" label="Кол-во сотрудников" placeholder="50–200" value={data.employees_count} onChange={setField} />
          <F id="cr_number" label="CR Number (Commercial Register)" placeholder="1010XXXXXX" value={data.cr_number} onChange={setField} />
          <F id="vat_number" label="VAT Number" placeholder="3XXXXXXXXXXXXXXXX3" value={data.vat_number} onChange={setField} />
        </div>

        <div className="gold-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <T id="legal_address" label="Юридический адрес" rows={2} value={data.legal_address} onChange={setField} />
          <T id="showroom_address" label="Адрес шоурума / офиса" rows={2} value={data.showroom_address} onChange={setField} />
        </div>

        <div className="gold-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <F id="contact_name" label="Контактное лицо" required placeholder="Иван Иванов / محمد العمري" value={data.contact_name} onChange={setField} />
          <F id="contact_position" label="Должность" placeholder="CEO / Генеральный директор" value={data.contact_position} onChange={setField} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <F id="phone_whatsapp" label="Телефон / WhatsApp" required type="tel" placeholder="+966 5X XXX XXXX" value={data.phone_whatsapp} onChange={setField} />
          <F id="email" label="Email" required type="email" placeholder="info@company.sa" value={data.email} onChange={setField} />
          <F id="website" label="Текущий сайт" type="url" placeholder="https://company.sa" value={data.website} onChange={setField} />
        </div>

        <F id="social_links" label="Ссылки на соцсети (Instagram, LinkedIn, Twitter/X)" placeholder="instagram.com/..., linkedin.com/company/..." value={data.social_links} onChange={setField} />
      </div>
    </SectionWrapper>
  );
}
