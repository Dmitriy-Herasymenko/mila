import { neon } from "@neondatabase/serverless";

export type EditableSection =
  | "hero"
  | "marquee"
  | "about"
  | "stats"
  | "work"
  | "services"
  | "fit"
  | "formats"
  | "faq";

export const EDITABLE_SECTIONS: EditableSection[] = [
  "hero",
  "marquee",
  "about",
  "stats",
  "work",
  "services",
  "fit",
  "formats",
  "faq",
];

function getClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}

export async function ensureSchema() {
  const sql = getClient();
  await sql`
    CREATE TABLE IF NOT EXISTS content (
      section text PRIMARY KEY,
      data jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS images (
      id serial PRIMARY KEY,
      mime text NOT NULL,
      data bytea NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}

export async function saveImage(mime: string, bytes: Buffer): Promise<number> {
  const sql = getClient();
  const rows = await sql`
    INSERT INTO images (mime, data)
    VALUES (${mime}, ${bytes})
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function getImage(id: number): Promise<{ mime: string; data: Buffer } | null> {
  const sql = getClient();
  const rows = await sql`SELECT mime, data FROM images WHERE id = ${id}`;
  const row = rows[0] as { mime: string; data: Buffer } | undefined;
  return row ?? null;
}

export async function getSectionRow(section: EditableSection) {
  const sql = getClient();
  const rows = await sql`SELECT data FROM content WHERE section = ${section}`;
  return (rows[0]?.data as { uk: unknown; en: unknown } | undefined) ?? null;
}

export async function getAllSections(): Promise<Record<string, { uk: unknown; en: unknown }>> {
  const sql = getClient();
  const rows = await sql`SELECT section, data FROM content`;
  const result: Record<string, { uk: unknown; en: unknown }> = {};
  for (const row of rows as { section: string; data: { uk: unknown; en: unknown } }[]) {
    result[row.section] = row.data;
  }
  return result;
}

export async function getContentOverridesForLocale(
  locale: "uk" | "en",
): Promise<Partial<Record<EditableSection, unknown>>> {
  try {
    const all = await getAllSections();
    const overrides: Partial<Record<EditableSection, unknown>> = {};
    for (const section of EDITABLE_SECTIONS) {
      const row = all[section];
      if (row && row[locale] !== undefined) {
        overrides[section] = row[locale];
      }
    }
    return overrides;
  } catch (error) {
    console.error("Failed to load content overrides from DB, falling back to static messages", error);
    return {};
  }
}

export async function upsertSection(section: EditableSection, data: { uk: unknown; en: unknown }) {
  const sql = getClient();
  await sql`
    INSERT INTO content (section, data, updated_at)
    VALUES (${section}, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (section)
    DO UPDATE SET data = ${JSON.stringify(data)}::jsonb, updated_at = now()
  `;
}
