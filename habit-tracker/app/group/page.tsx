"use client";

import AuthGuard from "../../components/AuthGuard";
import Navbar from "../../components/Navbar";
import { useGroupHabits } from "../../lib/hooks/useGroupHabits";
import UserProgressColumn from "./components/UserProgressColumn";

export default function GroupPage() {
  const { users, habits, loading } = useGroupHabits();

  return (
    <AuthGuard>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-ink">Group board</h1>
        <p className="mt-1 font-mono text-xs text-ink-soft">
          Everyone&apos;s tickets, out in the open.
        </p>

        {loading && <p className="mt-8 font-mono text-sm text-ink-soft">loading…</p>}

        {!loading && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {users.map((user) => (
              <UserProgressColumn key={user.uid} user={user} habits={habits} />
            ))}
          </div>
        )}
      </main>
    </AuthGuard>
  );
}
