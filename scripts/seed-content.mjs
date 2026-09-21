import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const sql = neon(process.env.DATABASE_URL);

const uk = JSON.parse(readFileSync(new URL("../messages/uk.json", import.meta.url)));
const en = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url)));

const SECTIONS = ["hero", "about", "stats", "work", "services", "fit", "formats", "faq", "contact"];

// IMPORTANT: only inserts sections that don't have a row yet. Never overwrites
// existing content — admin edits (text, uploaded photos) must never be clobbered
// by re-running this script.
for (const section of SECTIONS) {
  const data = { uk: uk[section], en: en[section] };
  const result = await sql`
    INSERT INTO content (section, data, updated_at)
    VALUES (${section}, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (section) DO NOTHING
    RETURNING section
  `;
  console.log(result.length ? `seeded: ${section}` : `skipped (already exists): ${section}`);
}

console.log("done");
