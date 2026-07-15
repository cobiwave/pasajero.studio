import { z } from "zod";
import rawContent from "@/data/content.json";

// ─── Schemas ────────────────────────────────────────────────────────────────

const LoaderContentSchema = z.object({
  words: z.array(z.string()),
});

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const NavFooterSchema = z.object({
  // location: z.string(),
  email: z.string(),
});

const NavContentSchema = z.object({
  items: z.array(NavItemSchema),
  footer: NavFooterSchema,
});

const HeroContentSchema = z.object({
  headline: z.array(z.string()),
  tagline: z.string(),
  subtitle: z.string(),
  comingSoon: z.string(),
});

const ProjectSchema = z.object({
  title: z.string(),
  category: z.string(),
  year: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  href: z.string().optional(),
  imageUrl: z.string().optional(),
});

const WorkContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  headline: z.array(z.string()),
  projects: z.array(ProjectSchema),
});

const PrincipleSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
});

const AboutContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  statement: z.array(z.string()),
  bio: z.array(z.string()),
  principles: z.array(PrincipleSchema),
});

const ArtistSchema = z.object({
  name: z.string(),
  disciplines: z.array(z.string()).min(1).max(3),
  location: z.string(),
  bio: z.string(),
  imageUrl: z.string().optional(),
  contactHref: z.string(),
  featured: z.boolean().optional(),
});

const DirectoryContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  headline: z.array(z.string()),
  intro: z.string(),
  artists: z.array(ArtistSchema),
});

const AudienceMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const AudienceSchema = z.object({
  label: z.string(),
  metrics: z.array(AudienceMetricSchema),
});

const ContentFormatSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const MediaKitCtaSchema = z.object({
  headline: z.string(),
  description: z.string(),
  label: z.string(),
});

const MediaKitContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  headline: z.array(z.string()),
  intro: z.string(),
  audience: AudienceSchema,
  formats: z.array(ContentFormatSchema),
  networkLabel: z.string(),
  cta: MediaKitCtaSchema,
});

const RoleSchema = z.object({
  period: z.string(),
  role: z.string(),
  company: z.string(),
  scope: z.string(),
});

const ExperienceContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  headline: z.array(z.string()),
  roles: z.array(RoleSchema),
  capabilitiesLabel: z.string(),
  capabilities: z.array(z.string()),
});

const SocialSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const FormContentSchema = z.object({
  nameLabel: z.string(),
  namePlaceholder: z.string(),
  emailLabel: z.string(),
  emailPlaceholder: z.string(),
  messageLabel: z.string(),
  messagePlaceholder: z.string(),
  submitLabel: z.string(),
});

const FooterContentSchema = z.object({
  copyright: z.string(),
  tagline: z.string(),
});

const ContactContentSchema = z.object({
  sectionTitle: z.string(),
  sectionNumber: z.string(),
  headline: z.array(z.string()),
  email: z.string().email(),
  socials: z.array(SocialSchema),
  form: FormContentSchema,
  footer: FooterContentSchema,
});

const SiteContentSchema = z.object({
  loader: LoaderContentSchema,
  nav: NavContentSchema,
  hero: HeroContentSchema,
  work: WorkContentSchema,
  about: AboutContentSchema,
  directory: DirectoryContentSchema,
  mediaKit: MediaKitContentSchema,
  experience: ExperienceContentSchema,
  contact: ContactContentSchema,
});

// ─── Inferred types (single source of truth) ────────────────────────────────

export type LoaderContent = z.infer<typeof LoaderContentSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
export type NavContent = z.infer<typeof NavContentSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type WorkContent = z.infer<typeof WorkContentSchema>;
export type Principle = z.infer<typeof PrincipleSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type DirectoryContent = z.infer<typeof DirectoryContentSchema>;
export type AudienceMetric = z.infer<typeof AudienceMetricSchema>;
export type ContentFormat = z.infer<typeof ContentFormatSchema>;
export type MediaKitContent = z.infer<typeof MediaKitContentSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type ExperienceContent = z.infer<typeof ExperienceContentSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type ContactContent = z.infer<typeof ContactContentSchema>;
export type SiteContent = z.infer<typeof SiteContentSchema>;

// ─── Parsed + validated export ───────────────────────────────────────────────
// Throws at startup if content.json doesn't match the schema above,
// so mismatches are caught at the boundary, not inside components.

const content = SiteContentSchema.parse(rawContent);

export default content;
