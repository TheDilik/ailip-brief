"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  completion?: number;
}

export default function SectionWrapper({ id, number, title, subtitle, children, completion = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const pct = Math.round(completion * 100);
  const status = pct >= 80 ? "done" : pct > 0 ? "partial" : "empty";

  return (
    <section id={id} ref={ref} className="relative py-14 px-4 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="section-badge">{number}</div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
                <span className={`completion-badge ${status}`}>
                  {status === "done" ? "✓ Готово" : status === "partial" ? `${pct}%` : "Не заполнен"}
                </span>
              </div>
              {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
            </div>
          </div>

          {/* Card */}
          <div className="brief-card p-6 md:p-8">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
