"use client";

// ═══════════════════════════════════════
// PAGE — section orchestrator with slide tracking
// All data flows from portfolio.ts
// ═══════════════════════════════════════

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import Navbar from "@/components/layout/Navbar";
import DotGridBackground from "@/components/ui/DotGridBackground";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Connect from "@/components/sections/Connect";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Determine which full-page slide is currently active to feed background scaling math
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const routeMap = ["identity", "skills", "projects", "education", "connect"];
            const index = routeMap.indexOf(id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 } // Trigger precisely when slide takes over majority of viewport
    );

    const elements = document.querySelectorAll(".snap-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background dynamically reacts to activeSection integer */}
      <DotGridBackground currentSection={activeSection} isInverted={false} />
      
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
