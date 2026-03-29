// ═══════════════════════════════════════
// PAGE — section orchestrator only (no logic)
// All data flows from portfolio.ts
// ═══════════════════════════════════════

import { portfolioData } from "@/data/portfolio";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/layout/ParticleBackground";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Connect from "@/components/sections/Connect";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar items={portfolioData.navItems} />

      <main className="relative z-10 snap-container">
        <Hero data={portfolioData.hero} />

        <Skills
          meta={portfolioData.skillsMeta}
          skills={portfolioData.skills}
        />

        <Projects
          meta={portfolioData.projectsMeta}
          projects={portfolioData.projects}
        />

        <Education
          meta={portfolioData.educationMeta}
          education={portfolioData.education}
        />

        <Connect data={portfolioData.connect} />
      </main>

    </>
  );
}
