"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/upload", label: "Upload Resumes" },
  { href: "/job-profile", label: "Job Profile" },
  { href: "/shortlist", label: "Shortlist" },
  { href: "/pending-calls", label: "Pending Calls" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-signal text-[13px] font-semibold text-white">
            H
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Hirestream
          </span>
          <span className="field-tag ml-1 hidden sm:inline-flex">poc build</span>
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
