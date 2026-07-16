"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

function ScheduleControl({
  candidateId,
  scheduledFor,
  onSchedule,
}: {
  candidateId: string;
  scheduledFor?: string;
  onSchedule: (id: string, when: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (scheduledFor) {
    return (
      <div className="rounded border border-signal/30 bg-signal-light px-3 py-2 text-xs font-medium text-signal-dark">
        Scheduled for {new Date(scheduledFor).toLocaleString()}
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="focus-ring w-full rounded bg-ink px-3 py-2 text-xs font-semibold text-white hover:bg-ink/90"
      >
        Schedule Call
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus-ring w-full rounded border border-line bg-surface px-2 py-1.5 text-xs text-ink"
      />
      <button
        onClick={() => {
          if (value) {
            onSchedule(candidateId, new Date(value).toISOString());
            setOpen(false);
          }
        }}
        disabled={!value}
        className="focus-ring shrink-0 rounded bg-signal px-3 py-1.5 text-xs font-semibold text-white hover:bg-signal-dark disabled:opacity-40"
      >
        Confirm
      </button>
    </div>
  );
}

export default function PendingCallsPage() {
  const { candidates, pendingCalls, scheduleCall } = useAppStore();

  const queue = pendingCalls
    .map((pc) => ({
      pc,
      candidate: candidates.find((c) => c.id === pc.candidateId),
    }))
    .filter((row) => row.candidate);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="field-tag">step 4 · HR virtual call queue</span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
            Pending virtual calls
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            HR sees only candidates who cleared the shortlist. Each package
            carries the parsed data and score forward — no re-entry needed.
          </p>
        </div>
        <button
          onClick={() => window.open("/pending-calls", "_blank", "noopener,width=920,height=800")}
          className="focus-ring shrink-0 rounded border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
        >
          Open in separate window ↗
        </button>
      </div>

      {queue.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="text-sm text-muted">
            No candidates are queued for a call yet.
          </p>
          <Link
            href="/shortlist"
            className="focus-ring mt-4 inline-block rounded bg-signal px-5 py-3 text-sm font-semibold text-white hover:bg-signal-dark"
          >
            Go to shortlist
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {queue.map(({ pc, candidate }) => {
            const c = candidate!;
            return (
              <div key={c.id} className="rounded-lg border border-line bg-surface p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {c.name}
                    </p>
                    <p className="data-key mt-0.5">{c.email}</p>
                  </div>
                  <span className="rounded border border-signal/30 bg-signal-light px-2 py-1 font-mono text-sm font-semibold text-signal-dark">
                    {c.score}
                  </span>
                </div>

                <div
                  className={`mt-3 inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium ${
                    pc.status === "Scheduled"
                      ? "bg-signal-light text-signal-dark"
                      : "bg-amber-light text-amber"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {pc.status}
                </div>

                <div className="mt-4 rounded border border-line bg-canvas p-3">
                  <p className="data-key">resume</p>
                  <p className="mt-1 truncate text-xs text-ink">{c.fileName}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="field-tag">exp: {c.yearsExperience}y</span>
                  <span className="field-tag">edu: {c.education}</span>
                  <span className="field-tag">loc: {c.location}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line bg-canvas px-2 py-0.5 text-[11px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {c.experienceSummary}
                </p>

                <div className="mt-4">
                  <ScheduleControl
                    candidateId={c.id}
                    scheduledFor={pc.scheduledFor}
                    onSchedule={scheduleCall}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
