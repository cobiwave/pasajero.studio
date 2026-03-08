export interface LoaderContent {
  words: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavFooter {
  location: string;
  email: string;
}

export interface NavContent {
  items: NavItem[];
  footer: NavFooter;
}

export interface HeroContent {
  headline: string[];
  subtitle: string;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
}

export interface WorkContent {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  projects: Project[];
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface AboutContent {
  sectionTitle: string;
  sectionNumber: string;
  statement: string[];
  bio: string[];
  principles: Principle[];
}

export interface Role {
  period: string;
  role: string;
  company: string;
  scope: string;
}

export interface ExperienceContent {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  roles: Role[];
  capabilitiesLabel: string;
  capabilities: string[];
}

export interface Social {
  label: string;
  href: string;
}

export interface FormContent {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
}

export interface FooterContent {
  copyright: string;
  tagline: string;
}

export interface ContactContent {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  email: string;
  socials: Social[];
  form: FormContent;
  footer: FooterContent;
}

export interface SiteContent {
  loader: LoaderContent;
  nav: NavContent;
  hero: HeroContent;
  work: WorkContent;
  about: AboutContent;
  experience: ExperienceContent;
  contact: ContactContent;
}
