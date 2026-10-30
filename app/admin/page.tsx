import type { Metadata } from "next";
import { db, ensureTable, type Rsvp } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAdmin())) {
    const { error } = await searchParams;
    return (
      <main className="admin">
        <h1>Admin</h1>
        <form action={login} className="form login">
          <label className="field">
            <span>Passord</span>
            <input type="password" name="password" required autoFocus />
          </label>
          {error && <p className="error">Feil passord.</p>}
          <button type="submit">Logg inn</button>
        </form>
      </main>
    );
  }

  const sql = db();
  await ensureTable(sql);
  const rows = (await sql`SELECT * FROM rsvps ORDER BY created_at DESC`) as Rsvp[];
  const coming = rows.filter((r) => r.attending);
  const totalGuests = coming.reduce((sum, r) => sum + r.guests, 0);

  return (
    <main className="admin">
      <h1>Svar</h1>
      <p className="summary">
        {rows.length} svar · {coming.length} kommer ({totalGuests} gjester) ·{" "}
        {rows.length - coming.length} kommer ikke
      </p>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>E-post</th>
            <th>Kommer</th>
            <th>Antall</th>
            <th>Følge</th>
            <th>Mat</th>
            <th>Hilsen</th>
            <th>Mottatt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.attending ? "Ja" : "Nei"}</td>
              <td>{r.guests}</td>
              <td>{r.guest_names}</td>
              <td>{r.dietary}</td>
              <td>{r.message}</td>
              <td>{new Date(r.created_at).toLocaleString("nb-NO", { timeZone: "Europe/Oslo" })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={logout} style={{ marginTop: 32 }}>
        <button type="submit">Logg ut</button>
      </form>
    </main>
  );
}
