// ═══════════════════════════════════════
// PORTFOLIO DATA — ALL CONTENT AS TYPED CONFIG
// [ASSUMED FROM REF] — content inferred from visual references
// ═══════════════════════════════════════

import type { PortfolioData } from "@/lib/types";

export const portfolioData: PortfolioData = {
  siteTitle: "Pushkar Jha — Portfolio",
  siteDescription:
    "ML & Data Science Undergraduate. Data-driven developer & researcher building intelligent systems.",

  navItems: [
    { id: "identity", number: "01", label: "IDENTITY", href: "#identity" },
    { id: "skills", number: "02", label: "SKILLS", href: "#skills" },
    { id: "projects", number: "03", label: "PROJECTS", href: "#projects" },
    { id: "education", number: "04", label: "EDUCATION", href: "#education" },
    { id: "connect", number: "05", label: "CONNECT", href: "#connect" },
  ],

  hero: {
    greeting: "Hi, I'm",
    name: "PUSHKAR JHA",
    role: "ML & DATA SCIENCE UNDERGRADUATE",
    description:
      "Data-driven developer & researcher in progress",
    primaryCta: {
      label: "MY PROJECTS",
      href: "#projects",
    },
    secondaryCta: {
      label: "GET IN TOUCH",
      href: "#connect",
    },
  },

  skillsMeta: {
    number: "02",
    title: "SKILLS & EXPERTISE",
    subtitle: "> Technologies I actively work with",
  },

  skills: [
    {
      id: "c",
      number: "01",
      name: "C",
      description: "SYSTEM PROGRAMMING, DATA STRUCTURES, ALGORITHMS",
      category: "LANGUAGES",
      percentage: 90,
    },
    {
      id: "java",
      number: "02",
      name: "JAVA",
      description: "OOPS CONCEPTS, APPLICATION DEVELOPMENT",
      category: "LANGUAGES",
      percentage: 85,
    },
    {
      id: "frontend",
      number: "03",
      name: "FRONTEND",
      description: "REACT, NEXT.JS, MODERN WEB TECH",
      category: "WEB DEV",
      percentage: 88,
    },
    {
      id: "uiux",
      number: "04",
      name: "UI/UX",
      description: "USER INTERFACE, USER EXPERIENCE DESIGN",
      category: "DESIGN",
      percentage: 82,
    },
    {
      id: "aftereffects",
      number: "05",
      name: "AFTER EFFECTS",
      description: "MOTION GRAPHICS, VISUAL EFFECTS, ANIMATION",
      category: "DESIGN",
      percentage: 80,
    },
    {
      id: "photoshop",
      number: "06",
      name: "PHOTOSHOP / CANVA",
      description: "GRAPHIC DESIGN, IMAGE EDITING, VISUAL CONTENT",
      category: "DESIGN",
      percentage: 85,
    },
    {
      id: "decision",
      number: "07",
      name: "DECISION MAKING",
      description: "STRATEGIC THINKING, PROBLEM SOLVING, LEADERSHIP",
      category: "SOFT SKILLS",
      percentage: 95,
    },
  ],

  projectsMeta: {
    number: "03",
    title: "PROJECT MODULE",
    subtitle: "Selected works and case studies",
  },

  projects: [
    {
      id: "visionaid",
      title: "VISIONAID",
      description:
        "An AI-powered assistive wearable system designed to enhance environmental awareness for visually impaired individuals. It integrates real-time object detection, intelligent feedback systems, and adaptive navigation support using computer vision technologies.",
      tags: ["AI", "Computer Vision", "Wearable", "Accessibility"],
      image: "/projects/VisionAid.jpg",
      link: "#",
      linkLabel: "VIEW PROJECT →",
    },
    {
      id: "sweepx",
      title: "SWEEPX",
      description:
        "SweepX is a map-based, gamified platform that turns real-world cleanliness into interactive quests. Users report trash locations, which are converted into location-based cleanup missions with points and rewards.",
      tags: ["Gamification", "Maps", "React", "Node.js"],
      image: "/projects/SweepX.jpg",
      link: "#",
      linkLabel: "VIEW PROJECT →",
    },
    {
      id: "portfolio",
      title: "MY PORTFOLIO",
      description:
        "A performance-optimized interactive developer portfolio featuring modular architecture, refined motion design, and a monochrome anti-gravity aesthetic built with Next.js and Framer Motion.",
      tags: ["Next.js", "Framer Motion", "TypeScript", "Design"],
      image: "/projects/Portfolio.jpg",
      link: "#",
      linkLabel: "VIEW PROJECT →",
    },
  ],

  educationMeta: {
    number: "04",
    title: "EDUCATION LOGS",
    subtitle: "Academic timeline and credentials",
  },

  education: [
    {
      id: "ggsipu",
      institution: "Guru Gobind Singh Indraprastha University, New Delhi",
      degree: "B.TECH IN COMPUTER SCIENCE (DATA SCIENCE)",
      dateRange: "2025 — 2029",
      description:
        "Pursuing a focused curriculum in data science, machine learning, and software engineering with hands-on project-based learning.",
      status: "IN PROGRESS",
    },
    {
      id: "jnv",
      institution: "Jawahar Navodaya Vidyalaya (JNV), Delhi-2",
      degree: "SECONDARY SCHOOLING (10TH & 12TH)",
      dateRange: "2018 — 2024",
      description:
        "Completed secondary and senior secondary education with a strong foundation in science and mathematics.",
      status: "COMPLETED",
    },
  ],

  connect: {
    title: "CONNECT",
    subtitle: "Let's build something extraordinary together.",
    email: "pushkarjha.dev@gmail.com",
    emailLabel: "SEND AN EMAIL",
    socials: [
      {
        id: "github",
        label: "GitHub",
        href: "https://github.com/pushkarjha",
        icon: "github",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/pushkarjha",
        icon: "linkedin",
      },
      {
        id: "twitter",
        label: "Twitter",
        href: "https://twitter.com/pushkarjha",
        icon: "twitter",
      },
    ],
  },

  footer: {
    copyright: "© 2025 Pushkar Jha. All rights reserved.",
    tagline: "Built with precision. Designed in the void.",
  },
};
