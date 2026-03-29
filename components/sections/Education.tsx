// ═══════════════════════════════════════
// EDUCATION SECTION
// Vertical timeline with left line, right content
// [ASSUMED FROM REF] — timeline with status badges
// ═══════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import type { EducationEntry, SectionMeta } from "@/lib/types";

interface EducationProps {
  meta: SectionMeta;
  education: EducationEntry[];
}

export default function Education({ meta, education }: EducationProps) {
  return (
    <section id="education" className="relative py-24">
      <div className="w-full max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <SectionHeader meta={meta} />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-border-strong" />

          <div className="space-y-12 pl-8 md:pl-14">
            {education.map((entry) => (
              <motion.div
                key={entry.id}
                variants={staggerItem}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 md:-left-14 top-2 w-2 h-2 rounded-full bg-accent-primary" />
                {/* Second dot for alignment with the timeline */}
                <div className="absolute -left-[33px] md:-left-[57px] top-2 w-[10px] h-[10px] rounded-full border border-border-strong bg-bg-base" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                  <div className="flex-1">
                    <h3 className="font-sans text-body-lg font-bold text-text-primary mb-1">
                      {entry.institution}
                    </h3>
                    <p className="font-mono text-label-xs text-text-muted tracking-[0.12em] uppercase mb-2">
                      {entry.degree}
                    </p>
                    <p className="font-sans text-body-sm text-text-muted max-w-lg">
                      {entry.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-body-sm text-text-muted">
                      {entry.dateRange}
                    </span>
                    <span
                      className={`font-mono text-label-xs tracking-[0.12em] uppercase px-2 py-1 border rounded ${
                        entry.status === "IN PROGRESS"
                          ? "text-text-primary border-border-strong"
                          : "text-text-muted border-border"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>

                {/* Separator between entries */}
                <div className="mt-8 w-full h-px bg-border" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
