import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Media Kit — PASAJERO STUDIO",
  description:
    "Audiencia, formatos de contenido y casos de trabajo de Pasajero Studio para marcas evaluando una colaboración.",
};

type PreviousWork = {
  id: string | number;
  title: string;
  category: string;
  year: string;
  description: string;
  href?: string;
};

export default async function MediaKitPage() {
  const payload = await getPayloadClient();

  const [global, siteSettings, { docs: artists }, { docs: films }] = await Promise.all([
    payload.findGlobal({ slug: "media-kit-section" }),
    payload.findGlobal({ slug: "site-settings" }),
    payload.find({
      collection: "artists",
      where: { status: { equals: "approved" } },
      limit: 100,
    }),
    payload.find({
      collection: "films",
      where: { status: { equals: "published" } },
      sort: "order",
      limit: 100,
    }),
  ]);

  const { sectionTitle, sectionNumber, intro, networkLabel, cta } = global;
  const headline = (global.headline ?? []).map((h) => h.line);
  const audience = {
    label: global.audience.label,
    metrics: global.audience.metrics ?? [],
  };
  const formats = global.formats ?? [];
  const email = siteSettings.contactEmail;

  const artistCount = artists.length;
  const disciplineCount = new Set(artists.flatMap((artist) => artist.disciplines)).size;

  const projects: PreviousWork[] = films.map((film) => ({
    id: film.id,
    title: film.title,
    category: film.category,
    year: film.year,
    description: film.description,
    href: film.videoUrl ?? undefined,
  }));

  return (
    <main id="main-content" className="relative pt-24">
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-baseline gap-4 mb-16 md:mb-24">
            <h1 className="text-sm md:text-base uppercase tracking-[0.2em] font-semibold text-foreground/60">
              {sectionTitle}
            </h1>
            <span className="text-sm md:text-base text-primary font-mono">
              ({sectionNumber})
            </span>
          </div>

          <div className="mb-20 md:mb-28 max-w-3xl">
            <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95]">
              {headline.map((line, i) => (
                <div key={i}>
                  {i === headline.length - 1 ? (
                    <>
                      {line.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="text-primary">{line.split(" ").at(-1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </h2>
            <p className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-xl">
              {intro}
            </p>
          </div>

          {/* Audience & reach */}
          <div className="mb-20 md:mb-28">
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-8">
              {audience.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/5">
              {audience.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-background p-8 flex flex-col gap-2"
                >
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
                    {metric.value}
                  </span>
                  <span className="text-xs text-muted uppercase tracking-[0.1em]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content formats */}
          <div className="mb-20 md:mb-28">
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-8">
              Formatos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
              {formats.map((format) => (
                <div key={format.title} className="bg-background p-8 flex flex-col gap-3">
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                    {format.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed max-w-sm">
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Previous work */}
          <div className="mb-20 md:mb-28">
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-8">
              Casos anteriores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
              {projects.map((project) => {
                const Wrapper = project.href ? "a" : "div";
                const wrapperProps = project.href
                  ? { href: project.href, target: "_blank" as const, rel: "noopener noreferrer" }
                  : {};

                return (
                  <Wrapper
                    key={project.id}
                    {...wrapperProps}
                    className="group bg-background p-8 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-[0.15em] text-muted font-semibold">
                          {project.category}
                        </span>
                        <span className="text-xs text-muted/60 font-mono">
                          {project.year}
                        </span>
                      </div>
                      {project.href && (
                        <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed max-w-sm">
                      {project.description}
                    </p>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Curated network proof */}
          <div className="mb-20 md:mb-28 border border-foreground/10 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-3">
                Red curada
              </h3>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                {artistCount} {networkLabel} {disciplineCount} disciplinas
              </p>
            </div>
            <a
              href="/directory"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] border border-foreground/20 rounded-full px-6 py-3 hover:border-primary hover:text-primary transition-colors shrink-0"
            >
              Ver directorio
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* CTA */}
          <div className="border-t border-foreground/10 pt-16 flex flex-col items-start gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {cta.headline}
              </h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-md">
                {cta.description}
              </p>
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 bg-primary text-background text-sm font-semibold uppercase tracking-[0.1em] rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              {cta.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
