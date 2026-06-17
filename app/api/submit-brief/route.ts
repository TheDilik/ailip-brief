import { NextRequest, NextResponse } from "next/server";
import { generateEmailHTML, generateConfirmationHTML } from "@/lib/brief-email";
import { BriefFormData } from "@/types/brief";

function generateId(): string {
  return `BRIEF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

async function sendViaResend(to: string, subject: string, html: string, from: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend error: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const data: BriefFormData = await req.json();

    if (!data.email || !data.contact_name) {
      return NextResponse.json({ error: "Обязательные поля не заполнены" }, { status: 400 });
    }

    const submissionId = generateId();
    const studioEmail = process.env.STUDIO_EMAIL || "studio@example.com";
    const fromEmail = process.env.FROM_EMAIL || "brief@example.com";

    const studioHtml = generateEmailHTML(data, submissionId);
    const clientHtml = generateConfirmationHTML(data.client_name || data.contact_name, submissionId);

    if (process.env.RESEND_API_KEY) {
      await Promise.all([
        sendViaResend(
          studioEmail,
          `[Бриф #${submissionId}] ${data.company_name_en || data.company_name_ar || "Новый клиент"}`,
          studioHtml,
          fromEmail
        ),
        sendViaResend(
          data.email,
          `Ваш бриф получен · #${submissionId}`,
          clientHtml,
          fromEmail
        ),
      ]);
    } else {
      console.log("[Brief] No RESEND_API_KEY set — email skipped. ID:", submissionId);
    }

    return NextResponse.json({ success: true, submissionId });
  } catch (err) {
    console.error("[Brief submit]", err);
    return NextResponse.json({ error: "Ошибка отправки. Попробуйте ещё раз." }, { status: 500 });
  }
}
