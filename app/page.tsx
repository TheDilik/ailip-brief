"use client";

import { useState, useEffect } from "react";
import { BriefProvider } from "@/lib/brief-context";
import HeroSection from "@/components/brief/HeroSection";
import ProgressBar from "@/components/brief/ProgressBar";
import Section1Company from "@/components/brief/Section1Company";
import Section2Directions from "@/components/brief/Section2Directions";
import Section3Positioning from "@/components/brief/Section3Positioning";
import Section4Competitors from "@/components/brief/Section4Competitors";
import Section5Audience from "@/components/brief/Section5Audience";
import Section6Goals from "@/components/brief/Section6Goals";
import Section7Content from "@/components/brief/Section7Content";
import Section8Design from "@/components/brief/Section8Design";
import Section9Technical from "@/components/brief/Section9Technical";
import Section10Budget from "@/components/brief/Section10Budget";
import SubmissionSection from "@/components/brief/SubmissionSection";
import SuccessScreen from "@/components/brief/SuccessScreen";

function RestorePrompt({ onRestore, onDismiss }: { onRestore: () => void; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4">
      <div className="brief-card p-4 flex items-center gap-4 shadow-card-hover">
        <div className="text-2xl">💾</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-light font-inter">Найдено сохранение</div>
          <div className="text-xs text-muted">Продолжить с места остановки?</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onRestore} className="btn-gold py-1.5 px-3 text-xs rounded-lg">Да</button>
          <button onClick={onDismiss} className="btn-ghost py-1.5 px-3">Нет</button>
        </div>
      </div>
    </div>
  );
}

function BriefPage() {
  const [submissionId, setSubmissionId] = useState("");
  const [showRestore, setShowRestore] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("brief_pro_data");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.company_name_en || parsed.email || parsed.contact_name) {
          setShowRestore(true);
        }
      } catch {}
    }
  }, []);

  if (submissionId) return <SuccessScreen submissionId={submissionId} />;

  return (
    <main className="relative min-h-screen bg-bg">

      <ProgressBar />
      <HeroSection />

      <div className="relative z-10">
        <Section1Company />
        <Section2Directions />
        <Section3Positioning />
        <Section4Competitors />
        <Section5Audience />
        <Section6Goals />
        <Section7Content />
        <Section8Design />
        <Section9Technical />
        <Section10Budget />
        <SubmissionSection onSuccess={setSubmissionId} />
      </div>

      <footer className="relative z-10 border-t border-border py-8 px-4 bg-canvas">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span className="font-semibold text-ink">Studio Brief</span>
          <span>Premium Construction &amp; Furniture · KSA</span>
          <span>Данные хранятся локально до отправки</span>
        </div>
      </footer>

      {showRestore && (
        <RestorePrompt
          onRestore={() => setShowRestore(false)}
          onDismiss={() => {
            localStorage.removeItem("brief_pro_data");
            setShowRestore(false);
          }}
        />
      )}
    </main>
  );
}

export default function Page() {
  return (
    <BriefProvider>
      <BriefPage />
    </BriefProvider>
  );
}
