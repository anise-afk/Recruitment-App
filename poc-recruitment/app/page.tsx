import Link from "next/link";

const STEPS = [
  {
    key: "upload",
    title: "Upload in bulk",
    body: "Drop a folder of resumes — CSV or PDF — and let the pipeline read every file at once.",
  },
  {
    key: "parse",
    title: "Parse to structured fields",
    body: "Skills, education, experience, and contact details are extracted from free-form text into clean, filterable fields.",
  },
  {
    key: "score",
    title: "Score against your profile",
    body: "Mandatory and preferred criteria, weighted the way you choose, produce a 0–100 match score per candidate.",
  },
  {
    key: "route",
    title: "Route to HR calls",
    body: "Shortlisted candidates move straight into a queue awaiting a virtual screening call — no manual re-entry.",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="field-tag">workflow.status = "ready"</span>
            <h1 className="mt-5 font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[56px]">
              Bulk Hiring Solution
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
              Turn a folder of resumes into a ranked, ready-to-call shortlist.
              Automated parsing and weighted scoring replace the manual
              first pass, so HR only spends time on candidates who clear
              the bar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/upload"
                className="focus-ring rounded bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-dark"
              >
                Start Screening
              </Link>
              <Link
                href="/job-profile"
                className="focus-ring rounded border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-canvas"
              >
                Configure a job profile
              </Link>
            </div>
            <p className="mt-4 text-xs text-faint">
              Proof-of-concept build — resume parsing and scoring are simulated with mock data.
            </p>
          </div>

          {/* Signature element: unstructured resume text resolving into structured field-tags */}
          <div className="rounded-lg border border-line bg-canvas p-5">
            <div className="data-key mb-2">source: candidate_042.pdf</div>
            <div className="rounded border border-line bg-surface p-4 font-mono text-[12px] leading-relaxed text-muted">
              <p>Ana Reyes — Davao City, PH</p>
              <p>5 yrs experience, BS Info Technology.</p>
              <p>Worked across fintech &amp; BPO teams as</p>
              <p>Senior Associate. React, Node.js, SQL, AWS.</p>
            </div>
            <div className="my-3 flex items-center gap-2 text-faint">
              <span className="h-px flex-1 bg-line" />
              <span className="text-xs">parsed into</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="field-tag">name: Ana Reyes</span>
              <span className="field-tag">location: Davao City</span>
              <span className="field-tag">experience: 5y</span>
              <span className="field-tag">education: BS IT</span>
              <span className="field-tag">skills: React, Node, SQL, AWS</span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded border border-signal/30 bg-signal-light px-3 py-2">
              <span className="data-key text-signal-dark">match_score</span>
              <span className="font-mono text-lg font-semibold text-signal-dark">87</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-xl font-semibold text-ink">
          How the pipeline works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <span className="data-key">{`step[${i}]`}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Ready to screen your first batch?
            </p>
            <p className="mt-1 text-sm text-muted">
              Upload resumes, set your job profile, and get a ranked shortlist in minutes.
            </p>
          </div>
          <Link
            href="/upload"
            className="focus-ring rounded bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-dark"
          >
            Start Screening
          </Link>
        </div>
      </section>
    </div>
  );
}
