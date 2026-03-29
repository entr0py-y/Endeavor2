// ═══════════════════════════════════════
// SKILLS SECTION
// Skill rows with progress bars
// [ASSUMED FROM REF] — layout with number, name, description, category, percentage
// ═══════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ProgressBar from "@/components/ui/ProgressBar";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import type { Skill, SectionMeta } from "@/lib/types";

interface SkillsProps {
  meta: SectionMeta;
  skills: Skill[];
}

export default function Skills({ meta, skills }: SkillsProps) {
  return (
    <section id="skills" className="relative snap-section py-12">
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
          className="space-y-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={staggerItem}
              className="group"
            >
              <div className="flex items-start gap-4 mb-2">
                {/* Section number */}
                <span className="font-mono text-label-xs text-text-dim tracking-[0.2em] mt-1 shrink-0">
                  [{skill.number}]
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="font-sans text-display-md font-bold text-text-primary">
                      {skill.name}
                    </h3>
                    <div className="flex items-baseline gap-3 shrink-0">
                      <span className="font-mono text-label-xs text-text-muted tracking-[0.12em] uppercase hidden sm:block">
                        {skill.category}
                      </span>
                      <span className="font-mono text-body-sm text-text-primary">
                        {skill.percentage}%
                      </span>
                    </div>
                  </div>

                  <p className="font-mono text-label-xs text-text-muted tracking-[0.12em] uppercase mb-3">
                    {skill.description}
                  </p>

                  <ProgressBar percentage={skill.percentage} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
