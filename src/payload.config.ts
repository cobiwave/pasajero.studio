import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Disciplines } from "./collections/Disciplines";
import { Artists } from "./collections/Artists";
import { ArtistApplications } from "./collections/ArtistApplications";
import { Works } from "./collections/Works";
import { Films } from "./collections/Films";
import { PodcastEpisodes } from "./collections/PodcastEpisodes";

import { SiteSettings } from "./globals/SiteSettings";
import { Loader } from "./globals/Loader";
import { Nav } from "./globals/Nav";
import { Hero } from "./globals/Hero";
import { WorkSection } from "./globals/WorkSection";
import { AboutSection } from "./globals/AboutSection";
import { DirectorySection } from "./globals/DirectorySection";
import { MediaKitSection } from "./globals/MediaKitSection";
import { ContactSection } from "./globals/ContactSection";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: { user: Users.slug },
  editor: lexicalEditor({}),
  graphQL: { disable: true }, // regla dura del CLAUDE.md: no reintroducir GraphQL
  collections: [
    Users,
    Media,
    Disciplines,
    Artists,
    ArtistApplications,
    Works,
    Films,
    PodcastEpisodes,
  ],
  globals: [
    SiteSettings,
    Loader,
    Nav,
    Hero,
    WorkSection,
    AboutSection,
    DirectorySection,
    MediaKitSection,
    ContactSection,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        // Requerido por Supabase Storage (y la mayoría de S3-compatibles no-AWS), no por AWS S3 real.
        forcePathStyle: true,
      },
    }),
  ],
  db: postgresAdapter({
    // Supabase: usar la connection string del Session pooler (puerto 5432).
    // La de Transaction pooler (6543) no soporta prepared statements y rompe Drizzle.
    pool: { connectionString: process.env.DATABASE_URI },
    // Incondicional (no solo en producción): dev y prod pegan contra la MISMA
    // Supabase, no hay Postgres local separado. pushDevSchema() corre en
    // cualquier getPayload() con NODE_ENV !== "production" salvo que push
    // sea explícitamente false, y cada corrida deshabilita RLS en todas las
    // tablas de public al resincronizar el schema. Usar migraciones
    // explícitas: pnpm payload -- migrate:create <nombre> / pnpm payload -- migrate.
    push: false,
  }),
});
