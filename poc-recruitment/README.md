# Hirestream — Bulk Hiring Solution (POC)

A proof-of-concept recruitment automation site built with **Next.js 14 (App Router)**, **TypeScript**, and **TailwindCSS**. Resume parsing, scoring, and candidate storage are all simulated with mock data and in-memory state — there is no backend.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page — headline, pipeline overview, "Start Screening" CTA |
| `/upload` | Upload resumes (PDF/CSV) → mock-parsed into structured candidate fields |
| `/job-profile` | Define role, mandatory/preferred criteria, and scoring weights |
| `/shortlist` | Ranked candidate table with filters, CSV export, and "Send to Pending Virtual Call" |
| `/pending-calls` | Queue of shortlisted candidates awaiting an HR virtual call, with mock scheduling |

## How the mock pipeline works

- **`lib/mockParser.ts`** — `mockParseResume()` deterministically fabricates structured fields (name, skills, education, experience, etc.) for each uploaded file name, standing in for a real parsing/NLP service. `scoreCandidate()` computes a weighted 0–100 score against the active job profile.
- **`lib/store.tsx`** — a React Context provider (`AppProvider`) holds candidates, the job profile, and the pending-call queue in memory for the session, and re-scores candidates whenever the job profile changes.
- **`lib/types.ts`** — shared types for `ParsedCandidate`, `JobProfile`, and `PendingCall`.

## Swapping in real integrations

This POC is structured so the mock layer can be replaced without touching the UI:

- Replace `mockParseResume` with a call to a resume-parsing API/LLM extraction pipeline that returns the same `ParsedCandidate` shape.
- Replace the in-memory `AppProvider` state with API calls to a persistence layer (database + REST/GraphQL API).
- Replace the mock `datetime-local` scheduler in `/pending-calls` with a real calendar integration (e.g. Google Calendar / Outlook API).
