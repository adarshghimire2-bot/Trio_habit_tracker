"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useHabits } from "../../../lib/hooks/useHabits";
import { createHabit } from "../../../lib/firebase/firestore";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";

export default function HabitList() {
  const { firebaseUser } = useAuth();
  const { habits, loading } = useHabits(firebaseUser?.uid);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">My habits</h1>
          <p className="mt-1 font-mono text-xs text-ink-soft">
            {habits.length} open ticket{habits.length === 1 ? "" : "s"}
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          + New commitment
        </button>
      </div>

      {loading && <p className="font-mono text-sm text-ink-soft">loading…</p>}

      {!loading && habits.length === 0 && (
        <div className="rounded-lg border border-dashed border-ink/20 p-10 text-center">
          <p className="font-body text-sm text-ink-soft">
            No commitments punched yet. Start one — 90 days, max.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>

      {adding && firebaseUser && (
        <HabitForm
          onCancel={() => setAdding(false)}
          onSubmit={async (values) => {
            await createHabit(firebaseUser.uid, values);
            setAdding(false);
          }}
        />
      )}
    </div>
  );
}
