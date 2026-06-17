import { BriefFormData } from "@/types/brief";

export function generateEmailHTML(data: BriefFormData, submissionId: string): string {
  const row = (label: string, value: string | undefined, rtl = false) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#888;font-size:13px;width:200px;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#F5F5F5;font-size:13px" ${rtl ? 'dir="rtl"' : ""}>${value || "—"}</td></tr>`
      : "";

  const section = (title: string, content: string) => `
    <div style="margin:24px 0">
      <div style="padding:12px 20px;background:linear-gradient(135deg,#9B7A2E,#C9A84C);border-radius:8px 8px 0 0">
        <span style="color:#0D0D1A;font-weight:700;font-size:15px;letter-spacing:0.05em">${title}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.2);border-top:none;border-radius:0 0 8px 8px">
        ${content}
      </table>
    </div>`;

  const directions = data.directions.join(", ") || "—";
  const goals = Object.entries(data.goals_priority)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${k}: ${v}/5`)
    .join(", ") || "—";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Бриф #${submissionId}</title></head>
<body style="background:#0D0D1A;font-family:Arial,sans-serif;margin:0;padding:20px">
  <div style="max-width:800px;margin:0 auto">
    <div style="text-align:center;padding:40px 20px;border-bottom:1px solid rgba(201,168,76,0.3)">
      <div style="font-size:32px;color:#C9A84C;font-weight:700;letter-spacing:0.1em">БРИФ</div>
      <div style="color:#888;margin-top:8px;font-size:14px">Строительство & Производство мебели · Kingdom of Saudi Arabia</div>
      <div style="margin-top:12px;color:#F5F5F5;font-size:13px">ID: <strong style="color:#C9A84C">${submissionId}</strong></div>
    </div>

    ${section("1. О компании", `
      ${row("Название (EN)", data.company_name_en)}
      ${row("Название (AR)", data.company_name_ar, true)}
      ${row("Бренд", data.brand_name)}
      ${row("Год основания", data.founded_year)}
      ${row("Кол-во сотрудников", data.employees_count)}
      ${row("CR Number", data.cr_number)}
      ${row("VAT Number", data.vat_number)}
      ${row("Юр. адрес", data.legal_address)}
      ${row("Адрес шоурума", data.showroom_address)}
      ${row("Контактное лицо", data.contact_name)}
      ${row("Должность", data.contact_position)}
      ${row("WhatsApp", data.phone_whatsapp)}
      ${row("Email", data.email)}
      ${row("Сайт", data.website)}
      ${row("Соцсети", data.social_links)}
    `)}

    ${section("2. Направления деятельности", `
      ${row("Направления", directions)}
      ${row("Другое", data.other_directions)}
    `)}

    ${section("3. Позиционирование", `
      ${row("Описание компании", data.company_description)}
      ${row("История компании", data.company_history)}
      ${row("Миссия и видение", data.mission_vision)}
      ${row("Ценности бренда", data.brand_values)}
      ${row("Слоган (EN)", data.tagline_en)}
      ${row("Слоган (AR)", data.tagline_ar, true)}
      ${row("Ключевые проекты", data.landmark_projects)}
      ${row("Клиенты", data.notable_clients)}
      ${row("Сертификаты", data.certificates_licenses)}
    `)}

    ${section("4. Конкурентный анализ", `
      ${row("УТП", data.unique_selling_proposition)}
      ${row("Аргумент продаж", data.sales_argument)}
      ${row("Возражения", data.common_objections)}
      ${row("Косвенные конкуренты", data.indirect_competitors)}
      <tr><td colspan="2" style="padding:8px 12px;color:#888;font-size:12px">Конкуренты:<br>
        ${data.competitors.filter(c => c.name).map(c => `<strong style="color:#F5F5F5">${c.name}</strong> (${c.website}) — Сильные: ${c.strengths}; Слабые: ${c.weaknesses}; Наше преим.: ${c.our_advantage}`).join("<br>")}
      </td></tr>
    `)}

    ${section("5. Целевая аудитория", `
      ${row("Как находят клиенты", data.how_clients_find_you)}
      ${row("Воронка продаж", data.sales_funnel)}
      ${row("Средний цикл сделки", data.average_deal_cycle)}
      ${row("Средний чек (SAR)", data.average_check_sar)}
    `)}

    ${section("6. Цели и KPI", `
      ${row("Цели (приоритет)", goals)}
      ${row("Лидов в месяц (цель)", data.monthly_leads_target)}
      ${row("Критерии успеха", data.success_criteria)}
    `)}

    ${section("8. Дизайн и стиль", `
      ${row("Визуальный стиль", data.visual_style)}
      ${row("Типографика", data.typography.join(", "))}
      ${row("Корпоративный шрифт", data.corporate_font)}
      ${row("Запрещённые элементы", data.forbidden_elements)}
    `)}

    ${section("9. Технические требования", `
      ${row("Языки", data.languages.join(", "))}
      ${row("Домен", data.domain)}
      ${row("Хостинг", data.hosting_status)}
      ${row("CMS", data.cms.join(", "))}
    `)}

    ${section("10. Бюджет и сроки", `
      ${row("Бюджет", data.budget)}
      ${row("Бюджет на контент", data.content_production_budget)}
      ${row("Маркетинговый бюджет", data.marketing_budget)}
      ${row("Желаемая дата запуска", data.desired_launch_date)}
      ${row("Жёсткий дедлайн", data.hard_deadline)}
      ${data.hard_deadline === "yes" ? row("Причина дедлайна", data.deadline_reason) : ""}
      ${row("Темп разработки", data.timeline)}
      ${row("Описание идеального сайта", data.ideal_website_description)}
      ${row("Специфика KSA", data.ksa_specifics)}
      ${row("Ошибки, которых избежать", data.mistakes_to_avoid)}
      ${row("Дополнительно", data.anything_else)}
    `)}

    ${section("Подпись", `
      ${row("Клиент", data.client_name)}
      ${row("Дата", data.client_signature_date)}
    `)}

    <div style="text-align:center;padding:30px;color:#888;font-size:12px;border-top:1px solid rgba(201,168,76,0.2);margin-top:24px">
      Отправлено через систему брифования · ${new Date().toLocaleString("ru-RU")}
    </div>
  </div>
</body>
</html>`;
}

export function generateConfirmationHTML(clientName: string, submissionId: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0D0D1A;font-family:Arial,sans-serif;padding:40px;color:#F5F5F5">
  <div style="max-width:600px;margin:0 auto;text-align:center">
    <div style="font-size:48px;color:#C9A84C;margin-bottom:16px">✦</div>
    <h1 style="color:#C9A84C;font-size:28px;margin-bottom:8px">Спасибо, ${clientName || "уважаемый клиент"}!</h1>
    <p style="color:#888;margin-bottom:24px">Ваш бриф <strong style="color:#C9A84C">#${submissionId}</strong> успешно получен.</p>
    <p style="color:#F5F5F5;font-size:15px">Мы свяжемся с вами в течение <strong style="color:#C9A84C">24 часов</strong> для обсуждения деталей.</p>
    <div style="margin-top:32px;padding:20px;border:1px solid rgba(201,168,76,0.3);border-radius:12px;background:rgba(201,168,76,0.05)">
      <p style="color:#888;font-size:13px">Kingdom of Saudi Arabia · Premium Construction & Furniture</p>
    </div>
  </div>
</body>
</html>`;
}
