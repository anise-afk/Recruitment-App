"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { mockParseResume } from "@/lib/mockParser";

export default function UploadPage() {
  const { candidates, addCandidates, clearCandidates } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const accepted = Array.from(files).filter((f) =>
      /\.(pdf|csv)$/i.test(f.name)
    );
    if (accepted.length === 0) return;

    setIsParsing(true);
    // Simulate parsing latency for a folder of resumes.
    setTimeout(() => {
      const parsed = accepted.map((f) => mockParseResume(f));
      addCandidates(parsed);
      setIsParsing(false);
    }, 650);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <span className="field-tag">step 1 · upload</span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Upload resumes
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Upload a batch of resumes as PDF files, or a single CSV export from
        your ATS. Each file is parsed into structured candidate fields below.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`focus-ring mt-8 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-14 text-center transition-colors ${
          isDragging
            ? "border-signal bg-signal-light"
            : "border-line bg-surface hover:border-signal/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.csv"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-lg">
          ↑
        </span>
        <p className="mt-4 text-sm font-medium text-ink">
          Drag resumes here, or click to browse
        </p>
        <p className="mt-1 text-xs text-faint">Accepts .pdf and .csv files</p>
      </div>

      {isParsing && (
        <p className="mt-4 text-sm text-signal-dark">
          Parsing resumes into structured fields…
        </p>
      )}

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">
          Parsed candidates{" "}
          <span className="text-muted">({candidates.length})</span>
        </h2>
        {candidates.length > 0 && (
          <button
            onClick={clearCandidates}
            className="focus-ring rounded border border-line px-3 py-1.5 text-xs font-medium text-muted hover:bg-canvas"
          >
            Clear all
          </button>
        )}
      </div>

      {candidates.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-line bg-surface px-6 py-10 text-center text-sm text-faint">
          No resumes parsed yet. Upload files above to see structured fields here.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {candidates.map((c) => (
            <div key={c.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {c.name}
                  </p>
                  <p className="data-key mt-0.5">{c.fileName}</p>
                </div>
                {c.score !== null && (
                  <span className="font-mono text-sm font-semibold text-signal-dark">
                    {c.score}
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {c.experienceSummary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="field-tag">exp: {c.yearsExperience}y</span>
                <span className="field-tag">edu: {c.education}</span>
                <span className="field-tag">loc: {c.location}</span>
                <span className="field-tag">
                  salary: ${c.salaryExpectation}k
                </span>
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
            </div>
          ))}
        </div>
      )}

      {candidates.length > 0 && (
        <div className="mt-8 flex justify-end gap-3">
          <Link
            href="/job-profile"
            className="focus-ring rounded bg-signal px-5 py-3 text-sm font-semibold text-white hover:bg-signal-dark"
          >
            Continue to job profile
          </Link>
        </div>
      )}
    </div>
  );
}
