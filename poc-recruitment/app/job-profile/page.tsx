"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { JobProfile } from "@/lib/types";

function TagInput({
  label,
  hint,
  values,
  onChange,
}: {
  label: string;
  hint: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  };

  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <p className="mt-0.5 text-xs text-faint">{hint}</p>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="e.g. React"
          className="focus-ring w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint"
        />
        <button
          type="button"
          onClick={add}
          className="focus-ring shrink-0 rounded border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
        >
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span key={v} className="field-tag">
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                className="ml-1 text-signal-dark/60 hover:text-signal-dark"
                aria-label={`Remove ${v}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function WeightSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-ink">{label}</label>
        <span className="font-mono text-sm text-signal-dark">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-signal"
      />
    </div>
  );
}

export default function JobProfilePage() {
  const { jobProfile, setJobProfile, candidates } = useAppStore();
  const [form, setForm] = useState<JobProfile>(jobProfile);
  const [saved, setSaved] = useState(false);

  const totalWeight =
    form.weighting.skillsMatch +
    form.weighting.experience +
    form.weighting.education +
    form.weighting.location;

  const handleSave = () => {
    setJobProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <span className="field-tag">step 2 · job profile</span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Job profile setup
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Define the role and how candidates should be scored. Mandatory
        criteria carry a penalty when unmet; the weighting controls how much
        each factor contributes to the final match score.
      </p>

      <div className="mt-8 space-y-8 rounded-lg border border-line bg-surface p-6">
        <div>
          <label className="text-sm font-medium text-ink">Role title</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="e.g. Customer Support Associate"
            className="focus-ring mt-2 w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint"
          />
        </div>

        <TagInput
          label="Mandatory criteria"
          hint="Skills or requirements a candidate must have. Unmet criteria reduce the score."
          values={form.mandatoryCriteria}
          onChange={(v) => setForm({ ...form, mandatoryCriteria: v })}
        />

        <TagInput
          label="Preferred criteria"
          hint="Nice-to-have skills that boost the score but aren't required."
          values={form.preferredCriteria}
          onChange={(v) => setForm({ ...form, preferredCriteria: v })}
        />

        <div>
          <p className="text-sm font-medium text-ink">Scoring weights</p>
          <p className="mt-0.5 text-xs text-faint">
            Adjust how much each factor contributes.{" "}
            {totalWeight !== 100 && (
              <span className="text-amber">
                Current total: {totalWeight}% (auto-normalized when scoring)
              </span>
            )}
          </p>
          <div className="mt-4 space-y-4">
            <WeightSlider
              label="Skills match"
              value={form.weighting.skillsMatch}
              onChange={(v) =>
                setForm({ ...form, weighting: { ...form.weighting, skillsMatch: v } })
              }
            />
            <WeightSlider
              label="Experience"
              value={form.weighting.experience}
              onChange={(v) =>
                setForm({ ...form, weighting: { ...form.weighting, experience: v } })
              }
            />
            <WeightSlider
              label="Education"
              value={form.weighting.education}
              onChange={(v) =>
                setForm({ ...form, weighting: { ...form.weighting, education: v } })
              }
            />
            <WeightSlider
              label="Location"
              value={form.weighting.location}
              onChange={(v) =>
                setForm({ ...form, weighting: { ...form.weighting, location: v } })
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-faint">
          {candidates.length} candidate{candidates.length === 1 ? "" : "s"} will be rescored on save.
        </p>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-medium text-signal-dark">Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={!form.role}
            className="focus-ring rounded bg-signal px-5 py-3 text-sm font-semibold text-white hover:bg-signal-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save job profile
          </button>
          <Link
            href="/shortlist"
            className="focus-ring rounded border border-line px-5 py-3 text-sm font-medium text-ink hover:bg-canvas"
          >
            View shortlist
          </Link>
        </div>
      </div>
    </div>
  );
}
