"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import {
  DEFAULT_JOB_PROFILE,
  JobProfile,
  ParsedCandidate,
  PendingCall,
} from "./types";
import { scoreCandidate } from "./mockParser";

type AppState = {
  candidates: ParsedCandidate[];
  jobProfile: JobProfile;
  pendingCalls: PendingCall[];
  addCandidates: (c: ParsedCandidate[]) => void;
  clearCandidates: () => void;
  setJobProfile: (p: JobProfile) => void;
  rescoreAll: () => void;
  sendToPendingCall: (candidateIds: string[]) => void;
  scheduleCall: (candidateId: string, when: string) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<ParsedCandidate[]>([]);
  const [jobProfile, setJobProfileState] = useState<JobProfile>(DEFAULT_JOB_PROFILE);
  const [pendingCalls, setPendingCalls] = useState<PendingCall[]>([]);

  const addCandidates = (newOnes: ParsedCandidate[]) => {
    setCandidates((prev) => {
      const merged = [...prev, ...newOnes];
      if (jobProfile.role) {
        return merged.map((c) => ({
          ...c,
          score: scoreCandidate(c, jobProfile),
          status: c.status === "parsed" ? "scored" : c.status,
        }));
      }
      return merged;
    });
  };

  const clearCandidates = () => setCandidates([]);

  const setJobProfile = (p: JobProfile) => {
    setJobProfileState(p);
    setCandidates((prev) =>
      prev.map((c) => ({
        ...c,
        score: scoreCandidate(c, p),
        status: c.status === "parsed" ? "scored" : c.status,
      }))
    );
  };

  const rescoreAll = () => {
    setCandidates((prev) =>
      prev.map((c) => ({ ...c, score: scoreCandidate(c, jobProfile) }))
    );
  };

  const sendToPendingCall = (candidateIds: string[]) => {
    setCandidates((prev) =>
      prev.map((c) =>
        candidateIds.includes(c.id) ? { ...c, status: "pending_call" } : c
      )
    );
    setPendingCalls((prev) => {
      const existingIds = new Set(prev.map((p) => p.candidateId));
      const additions = candidateIds
        .filter((id) => !existingIds.has(id))
        .map((id) => ({ candidateId: id, status: "Awaiting HR Virtual Call" as const }));
      return [...prev, ...additions];
    });
  };

  const scheduleCall = (candidateId: string, when: string) => {
    setPendingCalls((prev) =>
      prev.map((p) =>
        p.candidateId === candidateId
          ? { ...p, status: "Scheduled", scheduledFor: when }
          : p
      )
    );
  };

  const value = useMemo(
    () => ({
      candidates,
      jobProfile,
      pendingCalls,
      addCandidates,
      clearCandidates,
      setJobProfile,
      rescoreAll,
      sendToPendingCall,
      scheduleCall,
    }),
    [candidates, jobProfile, pendingCalls]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used within AppProvider");
  return ctx;
}
