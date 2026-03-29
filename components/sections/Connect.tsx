// ═══════════════════════════════════════
// CONNECT SECTION
// Email CTA + social icon row
// ═══════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";
import Footer from "@/components/layout/Footer";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import type { ConnectData } from "@/lib/types";

interface ConnectProps {
  data: ConnectData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Connect({ data }: ConnectProps) {
  return (
    <section id="connect" className="relative snap-section py-12">
      <div className="w-full max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <span className="font-mono text-label-xs text-text-dim tracking-[0.2em] block mb-4">
              [05]
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="font-sans text-display-lg font-bold text-text-primary text-glow mb-4"
          >
            {data.title}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="font-sans text-body-lg text-text-muted mb-10"
          >
            {data.subtitle}
          </motion.p>

          <motion.div variants={staggerItem} className="mb-10">
            <Button
              variant="primary"
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2"
            >
              <Mail size={16} />
              {data.emailLabel}
            </Button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-6"
          >
            {data.socials.map((social) => {
              const IconComponent = iconMap[social.icon];
              if (!IconComponent) return null;

              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-text-muted hover:text-text-primary transition-colors duration-200 p-2"
                >
                  <IconComponent size={22} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Pin footer to the bottom of the final slide */}
      <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
        <Footer data={portfolioData.footer} />
      </div>
    </section>
  );
}
