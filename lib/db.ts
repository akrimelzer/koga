import { neon } from "@neondatabase/serverless";

export type Rsvp = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  guest_names: string;
  dietary: string;
  message: string;
};

export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function ensureTable(sql: ReturnType<typeof db>) {
  await sql`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      attending BOOLEAN NOT NULL,
      guests INT NOT NULL DEFAULT 1,
      guest_names TEXT NOT NULL DEFAULT '',
      dietary TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT ''
    )
  `;
}
