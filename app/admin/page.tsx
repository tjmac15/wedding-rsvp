"use client";

import { useMemo, useState } from "react";

type Rsvp = {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  guests: number;
  plusOneName: string;
  dietary: string;
  message: string;
  updatedAt: string | null;
};

const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export default function Admin() {
  const [pw, setPw] = useState("");
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [invited, setInvited] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");

  async function load(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/rsvps", { headers: { "x-admin-password": pw } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRows(data.rsvps);
      setInvited(data.invited ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const r = rows ?? [];
    const yes = r.filter((x) => x.attending === "yes");
    return {
      responses: r.length,
      yes: yes.length,
      no: r.length - yes.length,
      pending: Math.max(0, invited.length - r.length),
      seats: yes.reduce((s, x) => s + (x.guests || 0), 0),
    };
  }, [rows, invited]);

  const visible = useMemo(() => {
    const term = q.toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (filter === "all" || r.attending === filter) &&
        (!term || `${r.name} ${r.email} ${r.plusOneName}`.toLowerCase().includes(term))
    );
  }, [rows, q, filter]);

  function exportCsv() {
    const head = ["Name", "Email", "Phone", "Attending", "Guests", "Guest name", "Dietary", "Message", "Updated"];
    const lines = [head, ...visible.map((r) => [
      r.name, r.email, r.phone, r.attending, r.guests, r.plusOneName, r.dietary, r.message, r.updatedAt ?? "",
    ])].map((l) => l.map(csvCell).join(","));
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  if (!rows) {
    return (
      <main className="admin" style={{ maxWidth: 420 }}>
        <h1>Guest list</h1>
        <form className="form" onSubmit={load}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label htmlFor="pw">Admin password</label>
            <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
          </div>
          <button className="btn" style={{ marginTop: 4 }} disabled={loading}>
            {loading ? "Loading…" : "View RSVPs"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin">
      <h1>Guest list</h1>
      <div className="stats">
        <div className="stat"><b>{stats.seats}</b><span>Seats confirmed</span></div>
        <div className="stat"><b>{stats.yes}</b><span>Attending</span></div>
        <div className="stat"><b>{stats.no}</b><span>Declined</span></div>
        <div className="stat"><b>{stats.responses}</b><span>Total responses</span></div>
        <div className="stat"><b>{stats.pending}</b><span>Not yet replied (of {invited.length})</span></div>
      </div>

      <div className="toolbar">
        <input placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
          <option value="all">All</option>
          <option value="yes">Attending</option>
          <option value="no">Declined</option>
        </select>
        <button className="btn btn-ghost" onClick={() => load()} disabled={loading}>Refresh</button>
        <button className="btn" onClick={exportCsv}>Export CSV</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Status</th><th>Guests</th><th>Guest name</th>
              <th>Contact</th><th>Dietary</th><th>Message</th><th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td><span className={`pill ${r.attending}`}>{r.attending === "yes" ? "Attending" : "Declined"}</span></td>
                <td>{r.guests}</td>
                <td>{r.plusOneName}</td>
                <td>{r.email}{r.phone && <><br />{r.phone}</>}</td>
                <td>{r.dietary}</td>
                <td style={{ maxWidth: 280 }}>{r.message}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : ""}
                </td>
              </tr>
            ))}
            {!visible.length && (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--ink-soft)" }}>No RSVPs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {invited.length > 0 && (() => {
        const answered = new Set((rows ?? []).map((r) => r.name.toLowerCase()));
        const pending = invited.filter((n) => !answered.has(n.toLowerCase()));
        return pending.length ? (
          <details style={{ marginTop: 22 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>Not yet replied ({pending.length})</summary>
            <p style={{ marginTop: 10, lineHeight: 1.9 }}>{pending.join(" · ")}</p>
          </details>
        ) : null;
      })()}
    </main>
  );
}