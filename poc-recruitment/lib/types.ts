export type ParsedCandidate = {
  id: string;
  fileName: string;
  name: string;
  email: string;
  location: string;
  yearsExperience: number;
  salaryExpectation: number; // annual, in thousands
  education: string;
  skills: string[];
  experienceSummary: string;
  uploadedAt: string;
  score: number | null; // 0-100, null until scored against a job profile
  status: "parsed" | "scored" | "shortlisted" | "pending_call";
};

export type JobProfile = {
  role: string;
  mandatoryCriteria: string[];
  preferredCriteria: string[];
  weighting: {
    skillsMatch: number;
    experience: number;
    education: number;
    location: number;
  };
};

export const DEFAULT_JOB_PROFILE: JobProfile = {
  role: "",
  mandatoryCriteria: [],
  preferredCriteria: [],
  weighting: {
    skillsMatch: 40,
    experience: 30,
    education: 15,
    location: 15,
  },
};

export type CallStatus = "Awaiting HR Virtual Call" | "Scheduled";

export type PendingCall = {
  candidateId: string;
  status: CallStatus;
  scheduledFor?: string;
};
