// ═══════════════════════════════════════
// PROJECTS SECTION
// Alternating layout cards with desaturated images
// [ASSUMED FROM REF] — cards alternate image left/right
// ═══════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import type { Project, SectionMeta } from "@/lib/types";

interface ProjectsProps {
  meta: SectionMeta;
  projects: Project[];
}

export default function Projects({ meta, projects }: ProjectsProps) {
  return (
    <section id="projects" className="relative py-24">
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
          className="space-y-20"
        >
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-video overflow-hidden rounded border border-border bg-bg-surface transition-all duration-200 group-hover:border-border-strong ${
                      !isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <h3 className="font-sans text-display-md font-bold text-text-primary text-glow mb-4">
                      {project.title}
                    </h3>

                    <p className="font-sans text-body-md text-text-muted mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      className="inline-flex items-center font-mono text-label-xs text-text-primary tracking-[0.12em] uppercase hover:text-glow transition-all duration-200"
                    >
                      {project.linkLabel}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
