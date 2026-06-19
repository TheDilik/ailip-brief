"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBrief } from "@/lib/brief-context";

const SECTION_NAMES = [
  "О компании", "Направления деятельности", "Позиционирование",
  "Конкурентный анализ", "Целевая аудитория", "Цели и KPI",
  "Структура и контент", "Дизайн и стиль", "Технические требования",
  "Бюджет и сроки",
];

export default function SubmissionSection({ onSuccess }: { onSuccess: (id: string) => void }) {
  const { data, setField, sectionCompletion, saveNow } = useBrief();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPct = Math.round(sectionCompletion.reduce((a, b) => a + b, 0) / sectionCompletion.length * 100);

  const SHEETS_URL = "https://script.google.com/macros/s/AKfycbyjiJ1FZXN1RdqnuMljsNG0Pklgp5NNIeN1OFHoeMyLn7VWWMA8VLmnQZns2gjVVCqBEA/exec";

  const handleSubmit = async () => {
    if (!data.contact_name || !data.email) {
      setError("Укажите имя и email в разделе 1 (О компании).");
      return;
    }
    setError("");
    setLoading(true);
    saveNow();
    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        const submissionId = json.submissionId;
        // Flatten all data for Google Sheets
        const flat: Record<string, string> = {
          id: submissionId,
          date: new Date().toISOString(),
          // Section 1
          company_name_en: data.company_name_en,
          company_name_ar: data.company_name_ar,
          brand_name: data.brand_name,
          founded_year: data.founded_year,
          employees_count: data.employees_count,
          cr_number: data.cr_number,
          vat_number: data.vat_number,
          legal_address: data.legal_address,
          showroom_address: data.showroom_address,
          contact_name: data.contact_name,
          contact_position: data.contact_position,
          phone_whatsapp: data.phone_whatsapp,
          email: data.email,
          website: data.website,
          social_links: data.social_links,
          // Section 2
          directions: data.directions.join(", "),
          other_directions: data.other_directions,
          // Section 3
          company_description: data.company_description,
          company_history: data.company_history,
          mission_vision: data.mission_vision,
          brand_values: data.brand_values,
          tagline_en: data.tagline_en,
          tagline_ar: data.tagline_ar,
          key_stats: data.key_stats.filter(s => s.value).map(s => `${s.label}: ${s.value}`).join(" | "),
          certificates_licenses: data.certificates_licenses,
          landmark_projects: data.landmark_projects,
          notable_clients: data.notable_clients,
          // Section 4
          competitors: data.competitors.filter(c => c.name).map(c => `${c.name} (${c.website})`).join(" | "),
          indirect_competitors: data.indirect_competitors,
          unique_selling_proposition: data.unique_selling_proposition,
          sales_argument: data.sales_argument,
          common_objections: data.common_objections,
          competitor_sites: data.competitor_sites.filter(s => s.url).map(s => s.url).join(" | "),
          // Section 5
          audience_segment_1: Object.entries(data.audience_segment_1).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`).join(" | "),
          audience_segment_2: Object.entries(data.audience_segment_2).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`).join(" | "),
          how_clients_find_you: data.how_clients_find_you,
          sales_funnel: data.sales_funnel,
          average_deal_cycle: data.average_deal_cycle,
          average_check_sar: data.average_check_sar,
          // Section 6
          goals_priority: Object.entries(data.goals_priority).filter(([,v]) => v > 0).map(([k,v]) => `${k}: ${v}`).join(" | "),
          monthly_leads_target: data.monthly_leads_target,
          success_criteria: data.success_criteria,
          // Section 7
          page_blocks: Object.entries(data.page_blocks).map(([k,v]) => `${k}: ${v}`).join(" | "),
          content_availability: Object.entries(data.content_availability).map(([k,v]) => `${k}: ${v}`).join(" | "),
          content_to_create: data.content_to_create,
          // Section 8
          visual_style: data.visual_style,
          colors: data.color_palette.filter(c => c.hex).map(c => `${c.role}: ${c.hex}`).join(" | "),
          typography: data.typography.join(", "),
          corporate_font: data.corporate_font,
          positive_references: data.positive_references.filter(r => r.url).map(r => r.url).join(" | "),
          negative_references: data.negative_references.filter(r => r.url).map(r => r.url).join(" | "),
          forbidden_elements: data.forbidden_elements,
          // Section 9
          languages: data.languages.join(", "),
          domain: data.domain,
          hosting_status: data.hosting_status,
          features: Object.entries(data.features).filter(([k,v]) => v && !k.endsWith("_comment")).map(([k,v]) => `${k}: ${v}`).join(" | "),
          cms: data.cms.join(", "),
          cms_other: data.cms_other,
          cms_manager: data.cms_manager,
          // Section 10
          budget: data.budget,
          content_production_budget: data.content_production_budget,
          marketing_budget: data.marketing_budget,
          desired_launch_date: data.desired_launch_date,
          hard_deadline: data.hard_deadline,
          deadline_reason: data.deadline_reason,
          launch_event: data.launch_event,
          timeline: data.timeline,
          additional_services: Object.entries(data.additional_services).filter(([k,v]) => v && !k.endsWith("_comment")).map(([k,v]) => `${k}: ${v}`).join(" | "),
          ideal_website_description: data.ideal_website_description,
          ksa_specifics: data.ksa_specifics,
          mistakes_to_avoid: data.mistakes_to_avoid,
          anything_else: data.anything_else,
          mvp_priority: data.mvp_priority,
          communication_preference: data.communication_preference.join(", "),
          update_frequency: data.update_frequency,
          client_name: data.client_name,
          client_signature_date: data.client_signature_date,
        };
        fetch(SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(flat),
        }).catch(() => {});
        onSuccess(submissionId);
        localStorage.removeItem("brief_pro_data");
      } else {
        setError(json.error || "Ошибка отправки.");
      }
    } catch {
      setError("Не удалось отправить. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">Финальный шаг</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-2">
              Почти готово
            </h2>
            <p className="text-muted">Проверьте заполненность и отправьте бриф</p>
          </div>

          {/* Progress overview */}
          <div className="brief-card p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted">Общая заполненность</span>
              <span className="text-2xl font-bold text-ink tabular-nums">{totalPct}%</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-ink rounded-full"
                style={{ width: `${totalPct}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {SECTION_NAMES.map((name, i) => {
                const pct = sectionCompletion[i] ?? 0;
                const isDone = pct >= 0.7;
                const isPartial = pct > 0 && !isDone;
                return (
                  <button
                    key={i}
                    onClick={() => document.getElementById(`section-${i + 1}`)?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-start gap-2 p-2.5 rounded-lg border border-border hover:border-border-strong hover:bg-surface text-left transition-all"
                  >
                    <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                      isDone ? "bg-green-500 text-white" : isPartial ? "bg-accent text-white" : "bg-surface text-faint"
                    }`}>
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span className="text-xs text-muted leading-tight">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signature */}
          <div className="brief-card p-6 mb-6">
            <h3 className="font-bold text-lg text-ink mb-4">Подпись и подтверждение</h3>
            <div className="h-px bg-border mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="brief-label required">Имя клиента</label>
                <input type="text" className="brief-input" placeholder="Полное имя / ФИО"
                  value={data.client_name} onChange={e => setField("client_name", e.target.value)} />
              </div>
              <div>
                <label className="brief-label required">Дата</label>
                <input type="date" className="brief-input"
                  value={data.client_signature_date} onChange={e => setField("client_signature_date", e.target.value)} />
              </div>
            </div>
            <p className="text-muted text-xs leading-relaxed">
              Подтверждаю достоверность предоставленных данных. Бриф будет использован для разработки коммерческого предложения.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-gold text-sm px-10 py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                  </svg>
                  <span>Отправляем...</span>
                </>
              ) : (
                <>
                  <span>Отправить бриф</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </>
              )}
            </button>
            <p className="text-xs text-muted">
              Копия придёт на {data.email || "ваш email"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
