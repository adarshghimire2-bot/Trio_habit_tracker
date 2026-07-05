"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ACCENT_DOT: Record<string, string> = {
  teal: "bg-teal",
  amber: "bg-amber",
  plum: "bg-plum",
};

export default function Navbar() {
  const { profile, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  const linkClass = (path: string) =>
    `text-sm font-medium tracking-wide transition-colors ${
      pathname === path ? "text-ink" : "text-ink-soft hover:text-ink"
    }`;

  return (
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            The Ledger
          </span>
          <nav className="flex gap-6">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              My habits
            </Link>
            <Link href="/group" className={linkClass("/group")}>
              Group board
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {profile && (
            <span className="flex items-center gap-2 font-mono text-xs text-ink-soft">
              <span className={`h-2 w-2 rounded-full ${ACCENT_DOT[profile.colorTag]}`} />
              {profile.displayName}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="rounded border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
