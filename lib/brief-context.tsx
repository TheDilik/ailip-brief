"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { BriefFormData, initialBriefData } from "@/types/brief";

const STORAGE_KEY = "brief_pro_data";
const SAVE_INTERVAL = 30_000;

interface BriefContextType {
  data: BriefFormData;
  setField: <K extends keyof BriefFormData>(key: K, value: BriefFormData[K]) => void;
  setNestedField: (path: string, value: unknown) => void;
  saveNow: () => void;
  lastSaved: Date | null;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  sectionCompletion: number[];
}

const BriefContext = createContext<BriefContextType | null>(null);

export function useBrief() {
  const ctx = useContext(BriefContext);
  if (!ctx) throw new Error("useBrief must be used within BriefProvider");
  return ctx;
}

function computeCompletion(data: BriefFormData): number[] {
  const filled = (v: string | undefined) => Boolean(v && v.trim());
  const sections = [
    // Section 1
    [data.company_name_en, data.contact_name, data.email, data.phone_whatsapp].filter(filled).length / 4,
    // Section 2
    data.directions.length > 0 ? 1 : 0,
    // Section 3
    [data.company_description, data.tagline_en].filter(filled).length / 2,
    // Section 4
    data.competitors.filter(c => c.name).length / 6,
    // Section 5
    [data.audience_segment_1.portrait, data.how_clients_find_you].filter(filled).length / 2,
    // Section 6
    Object.values(data.goals_priority).filter(v => v > 0).length / 5,
    // Section 7
    Object.keys(data.page_blocks).length / 10,
    // Section 8
    data.visual_style ? 1 : 0,
    // Section 9
    data.languages.length > 0 ? 1 : 0,
    // Section 10
    data.budget ? 1 : 0,
  ];
  return sections.map(s => Math.min(1, s));
}

export function BriefProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BriefFormData>(initialBriefData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(prev => ({ ...prev, ...parsed }));
      }
    } catch {}
    setRestored(true);
  }, [restored]);

  const saveNow = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    } catch {}
  }, [data]);

  useEffect(() => {
    if (!restored) return;
    const timer = setInterval(saveNow, SAVE_INTERVAL);
    return () => clearInterval(timer);
  }, [saveNow, restored]);

  const setField = useCallback(<K extends keyof BriefFormData>(key: K, value: BriefFormData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const setNestedField = useCallback((path: string, value: unknown) => {
    const parts = path.split(".");
    setData(prev => {
      const next = { ...prev } as Record<string, unknown>;
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...(cur[parts[i]] as Record<string, unknown>) };
        cur = cur[parts[i]] as Record<string, unknown>;
      }
      cur[parts[parts.length - 1]] = value;
      return next as BriefFormData;
    });
  }, []);

  const sectionCompletion = computeCompletion(data);

  return (
    <BriefContext.Provider value={{ data, setField, setNestedField, saveNow, lastSaved, submitted, setSubmitted, sectionCompletion }}>
      {children}
    </BriefContext.Provider>
  );
}
