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
    <main id="main-content">
      <section>
        <div>
          {/* Header */}
          <div>
            <h1>
              {sectionTitle}
            </h1>
            <span>
              ({sectionNumber})
            </span>
          </div>

          <div>
            <h2>
              {headline.map((line, i) => (
                <div key={i}>
                  {i === headline.length - 1 ? (
                    <>
                      {line.split(" ").slice(0, -1).join(" ")}{" "}
                      <span>{line.split(" ").at(-1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </h2>
            <p>
              {intro}
            </p>
          </div>

          {/* Audience & reach */}
          <div>
            <h3>
              {audience.label}
            </h3>
            <div>
              {audience.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>
                    {metric.value}
                  </span>
                  <span>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content formats */}
          <div>
            <h3>
              Formatos
            </h3>
            <div>
              {formats.map((format) => (
                <div key={format.title}>
                  <h4>
                    {format.title}
                  </h4>
                  <p>
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Previous work */}
          <div>
            <h3>
              Casos anteriores
            </h3>
            <div>
              {projects.map((project) => {
                const Wrapper = project.href ? "a" : "div";
                const wrapperProps = project.href
                  ? { href: project.href, target: "_blank" as const, rel: "noopener noreferrer" }
                  : {};

                return (
                  <Wrapper key={project.id} {...wrapperProps}>
                    <div>
                      <div>
                        <span>
                          {project.category}
                        </span>
                        <span>
                          {project.year}
                        </span>
                      </div>
                      {project.href && <ArrowUpRight />}
                    </div>
                    <h4>
                      {project.title}
                    </h4>
                    <p>
                      {project.description}
                    </p>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Curated network proof */}
          <div>
            <div>
              <h3>
                Red curada
              </h3>
              <p>
                {artistCount} {networkLabel} {disciplineCount} disciplinas
              </p>
            </div>
            <a href="/directory">
              Ver directorio
              <ArrowUpRight />
            </a>
          </div>

          {/* CTA */}
          <div>
            <div>
              <h3>
                {cta.headline}
              </h3>
              <p>
                {cta.description}
              </p>
            </div>
            <a href={`mailto:${email}`}>
              <Mail />
              {cta.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
