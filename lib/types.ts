// ═══════════════════════════════════════
// SHARED TYPESCRIPT INTERFACES
// ═══════════════════════════════════════

export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  description: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface Skill {
  id: string;
  number: string;
  name: string;
  description: string;
  category: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  linkLabel: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  dateRange: string;
  description: string;
  status: "IN PROGRESS" | "COMPLETED" | "DONE";
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface ConnectData {
  title: string;
  subtitle: string;
  email: string;
  emailLabel: string;
  socials: SocialLink[];
}

export interface SectionMeta {
  number: string;
  title: string;
  subtitle?: string;
}

export interface PortfolioData {
  siteTitle: string;
  siteDescription: string;
  navItems: NavItem[];
  hero: HeroData;
  skillsMeta: SectionMeta;
  skills: Skill[];
  projectsMeta: SectionMeta;
  projects: Project[];
  educationMeta: SectionMeta;
  education: EducationEntry[];
  connect: ConnectData;
  footer: FooterData;
}

export interface FooterData {
  copyright: string;
  tagline: string;
}
