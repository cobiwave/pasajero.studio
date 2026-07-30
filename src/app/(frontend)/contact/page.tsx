import FilmGrain from "@/components/FilmGrain";
import ContactSection from "@/components/ContactSection";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — PASAJERO STUDIO",
  description:
    "Get in touch with Pasajero Studio, the audiovisual studio behind a curated network of skate, surf, music, film, and photography artists from Buenos Aires.",
};

export default async function ContactPage() {
  const payload = await getPayloadClient();

  const [contactSection, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "contact-section" }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);

  return (
    <main id="main-content" className="relative pt-24">
      <ContactSection
        sectionTitle={contactSection.sectionTitle}
        sectionNumber={contactSection.sectionNumber}
        headline={(contactSection.headline ?? []).map((h) => h.line)}
        email={siteSettings.contactEmail}
        socials={(contactSection.socials ?? []).map((s) => ({ label: s.label, href: s.href }))}
        form={contactSection.form}
        footer={contactSection.footer}
      />
      <FilmGrain />
    </main>
  );
}
