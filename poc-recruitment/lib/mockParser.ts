import { JobProfile, ParsedCandidate } from "./types";

const FIRST_NAMES = [
  "Ana", "Miguel", "Priya", "Wei", "Fatima", "Carlos", "Sofia", "Daniel",
  "Grace", "Youssef", "Hana", "Liam", "Noor", "Diego", "Aiko", "Samuel",
];
const LAST_NAMES = [
  "Reyes", "Santos", "Kapoor", "Chen", "Al-Farsi", "Mendoza", "Cruz",
  "Okafor", "Lim", "Tanaka", "Bautista", "Silva", "Park", "Villanueva",
];
const LOCATIONS = [
  "Davao City, PH", "Manila, PH", "Cebu City, PH", "Singapore",
  "Remote - APAC", "Bangkok, TH", "Ho Chi Minh City, VN", "Jakarta, ID",
];
const EDUCATION = [
  "BS Computer Science", "BS Information Technology", "BS Business Administration",
  "MS Data Science", "BA Communications", "BS Industrial Engineering",
];
const SKILL_POOL = [
  "React", "Node.js", "TypeScript", "Python", "SQL", "AWS", "Docker",
  "Project Management", "Customer Support", "Sales Operations", "Excel",
  "Recruiting", "Payroll", "Java", "Kubernetes", "Figma", "Copywriting",
  "Bookkeeping", "Logistics", "Salesforce",
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickMany<T>(arr: T[], count: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Simulates parsing a resume file into structured fields.
 * In a production build this is where a document-parsing + NLP pipeline
 * (e.g. Textract, a resume-parsing API, or an LLM extraction call) would run.
 */
export function mockParseResume(file: { name: string }): ParsedCandidate {
  const seed = hashString(file.name + Date.now().toString());
  const rand = seededRandom(seed);

  const firstName = pick(FIRST_NAMES, rand);
  const lastName = pick(LAST_NAMES, rand);
  const skillCount = 3 + Math.floor(rand() * 4);

  return {
    id: `cand_${seed}_${Math.floor(rand() * 10000)}`,
    fileName: file.name,
    name: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}`.toLowerCase() + "@example.com",
    location: pick(LOCATIONS, rand),
    yearsExperience: 1 + Math.floor(rand() * 12),
    salaryExpectation: 25 + Math.floor(rand() * 60), // in thousands
    education: pick(EDUCATION, rand),
    skills: pickMany(SKILL_POOL, skillCount, rand),
    experienceSummary: `${1 + Math.floor(rand() * 4)} roles across ${pick(
      ["fintech", "BPO", "retail", "healthcare", "logistics", "SaaS"],
      rand
    )} companies, most recently as a ${pick(
      ["Senior Associate", "Team Lead", "Specialist", "Coordinator", "Analyst"],
      rand
    )}.`,
    uploadedAt: new Date().toISOString(),
    score: null,
    status: "parsed",
  };
}

/**
 * Simulates weighted scoring of a candidate against a job profile.
 * Mandatory criteria that aren't met apply a hard penalty; preferred
 * criteria and the configured weighting shape the rest of the score.
 */
export function scoreCandidate(
  candidate: ParsedCandidate,
  profile: JobProfile
): number {
  const skillsLower = candidate.skills.map((s) => s.toLowerCase());

  const mandatoryMet = profile.mandatoryCriteria.filter((c) =>
    skillsLower.some((s) => s.includes(c.toLowerCase()) || c.toLowerCase().includes(s))
  ).length;
  const mandatoryTotal = profile.mandatoryCriteria.length || 1;
  const mandatoryRatio = profile.mandatoryCriteria.length
    ? mandatoryMet / mandatoryTotal
    : 1;

  const preferredMet = profile.preferredCriteria.filter((c) =>
    skillsLower.some((s) => s.includes(c.toLowerCase()) || c.toLowerCase().includes(s))
  ).length;
  const preferredRatio = profile.preferredCriteria.length
    ? preferredMet / profile.preferredCriteria.length
    : 0.5;

  const experienceScore = Math.min(candidate.yearsExperience / 8, 1);
  const educationScore = candidate.education.startsWith("MS") ? 1 : 0.75;
  const locationScore = candidate.location.includes("PH") || candidate.location.includes("Remote")
    ? 1
    : 0.6;

  const w = profile.weighting;
  const totalWeight = w.skillsMatch + w.experience + w.education + w.location || 1;

  const skillsComponent = (mandatoryRatio * 0.7 + preferredRatio * 0.3) * w.skillsMatch;
  const experienceComponent = experienceScore * w.experience;
  const educationComponent = educationScore * w.education;
  const locationComponent = locationScore * w.location;

  const raw =
    (skillsComponent + experienceComponent + educationComponent + locationComponent) /
    totalWeight;

  const mandatoryPenalty = profile.mandatoryCriteria.length
    ? 1 - (1 - mandatoryRatio) * 0.5
    : 1;

  return Math.round(Math.min(raw * 100, 100) * mandatoryPenalty);
}
