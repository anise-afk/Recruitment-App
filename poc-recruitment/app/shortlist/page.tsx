"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ParsedCandidate } from "@/lib/types";

function scoreTone(score: number) {
  if (score >= 75) return "text-signal-dark bg-signal-light border-signal/30";
  if (score >= 50) return "text-amber bg-amber-light border-amber/30";
  return "text-rose bg-rose-light border-rose/30";
}

function toCsv(candidates: ParsedCandidate[]): string {
  const headers = [
    "name",
    "email",
    "location",
    "years_experience",
    "salary_expectation_k",
    "education",
    "skills",
    "score",
  ];
  const rows = candidates.map((c) =>
    [
      c.name,
      c.email,
      c.location,
      c.yearsExperience,
      c.salaryExpectation,
      c.education,
      c.skills.join("; "),
      c.score ?? "",
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export default function ShortlistPage() {
  const { candidates, jobProfile, sendToPendingCall } = useAppStore();
  const [minExperience, setMinExperience] = useState(0);
  const [locationFilter, setLocationFilter] = useState("all");
  const [maxSalary, setMaxSalary] = useState(120);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const locations = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.location))).sort(),
    [candidates]
  );

  const filtered = useMemo(() => {
    return candidates
      .filter((c) => c.yearsExperience >= minExperience)
      .filter((c) => locationFilter === "all" || c.location === locationFilter)
      .filter((c) => c.salaryExpectation <= maxSalary)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }, [candidates, minExperience, locationFilter, maxSalary]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shortlist.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendToCall = () => {
    if (selected.size === 0) return;
    sendToPendingCall(Array.from(selected));
    setSelected(new Set());
  };

  if (candidates.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <span className="field-tag">step 3 · shortlist</span>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
          No candidates yet
        </h1>
        <p className="mt-2 text-sm text-muted">
          Upload resumes and configure a job profile to see scored candidates here.
        </p>
        <Link
          href="/upload"
          className="focus-ring mt-6 inline-block rounded bg-signal px-5 py-3 text-sm font-semibold text-white hover:bg-signal-dark"
        >
          Upload resumes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="field-tag">step 3 · shortlist</span>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Shortlist results
          </h1>
          <p className="mt-1 text-sm text-muted">
            {jobProfile.role
              ? `Scored against: ${jobProfile.role}`
              : "No job profile set — showing unscored candidates."}
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="focus-ring rounded border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
        >
          Export shortlist (CSV)
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-3">
        <div>
          <label className="data-key">Min. years experience</label>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={15}
              value={minExperience}
              onChange={(e) => setMinExperience(Number(e.target.value))}
              className="w-full accent-signal"
            />
            <span className="font-mono text-sm text-ink">{minExperience}y</span>
          </div>
        </div>
        <div>
          <label className="data-key">Location</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            <option value="all">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="data-key">Max. salary expectation</label>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              type="range"
              min={20}
              max={120}
              value={maxSalary}
              onChange={(e) => setMaxSalary(Number(e.target.value))}
              className="w-full accent-signal"
            />
            <span className="font-mono text-sm text-ink">${maxSalary}k</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-canvas text-xs text-faint">
            <tr>
              <th className="w-10 px-4 py-3"></th>
              <th className="px-4 py-3 font-medium">Candidate</th>
              <th className="px-4 py-3 font-medium">Experience</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Salary</th>
              <th className="px-4 py-3 font-medium">Skills</th>
              <th className="px-4 py-3 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => toggle(c.id)}
                    className="accent-signal"
                    aria-label={`Select ${c.name}`}
                  />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="data-key mt-0.5">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">{c.yearsExperience}y</td>
                <td className="px-4 py-3 text-muted">{c.location}</td>
                <td className="px-4 py-3 text-muted">${c.salaryExpectation}k</td>
                <td className="px-4 py-3">
                  <div className="flex max-w-[220px] flex-wrap gap-1">
                    {c.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                    {c.skills.length > 3 && (
                      <span className="text-[11px] text-faint">
                        +{c.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex min-w-[2.5rem] justify-center rounded border px-2 py-0.5 font-mono text-xs font-semibold ${scoreTone(
                      c.score ?? 0
                    )}`}
                  >
                    {c.score ?? "—"}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-faint">
                  No candidates match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-faint">
          {selected.size} selected of {filtered.length} shown
        </p>
        <button
          onClick={handleSendToCall}
          disabled={selected.size === 0}
          className="focus-ring rounded bg-signal px-5 py-3 text-sm font-semibold text-white hover:bg-signal-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send to Pending Virtual Call
        </button>
      </div>
    </div>
  );
}
