import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// NOTA: payload migrate:create generó automáticamente un "CREATE TABLE" de
// las 43 tablas porque este es el primer migration file del proyecto (no
// existía historial de migraciones — el schema hasta ahora se sincronizó
// con push automático de Drizzle). Esas tablas ya existen en la DB real
// (creadas por push), así que ese SQL autogenerado se reemplazó a mano por
// el fix real que motivó esta migración: habilitar RLS sin policies en
// todas las tablas de public, que Supabase reportó expuestas vía PostgREST
// con permisos default para anon/authenticated. El JSON snapshot que
// acompaña este archivo no se tocó: representa fielmente el schema actual
// (coincide con lo que push ya creó) y sigue sirviendo de base para el
// diff del próximo migrate:create.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about_section" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_bio" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_principles" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_statement" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "artist_applications" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "artist_applications_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "artists" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "artists_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section_headline" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section_socials" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section_headline" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section_join_form_headline" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "films" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "films_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "films_tags" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "loader" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "loader_words" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_audience_metrics" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_formats" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_headline" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_items" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_migrations" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_preferences" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_preferences_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes_rels" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_section" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_section_headline" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "works" ENABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_rels" ENABLE ROW LEVEL SECURITY;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_bio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_principles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_section_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "artist_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "artist_applications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "artists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "artists_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section_headline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_section_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section_headline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_section_join_form_headline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "films" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "films_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "films_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "loader" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "loader_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_audience_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_formats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_kit_section_headline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_migrations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_preferences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_preferences_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_section_headline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_rels" DISABLE ROW LEVEL SECURITY;
  `)
}
