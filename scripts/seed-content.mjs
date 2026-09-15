import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const sql = neon(process.env.DATABASE_URL);

const uk = JSON.parse(readFileSync(new URL("../messages/uk.json", import.meta.url)));
const en = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url)));

const SECTIONS = ["hero", "about", "stats", "work", "services", "fit", "formats", "faq", "contact"];

for (const section of SECTIONS) {
  const data = { uk: uk[section], en: en[section] };
  await sql`
    INSERT INTO content (section, data, updated_at)
    VALUES (${section}, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (section)
    DO UPDATE SET data = ${JSON.stringify(data)}::jsonb, updated_at = now()
  `;
  console.log(`seeded: ${section}`);
}

console.log("done");
