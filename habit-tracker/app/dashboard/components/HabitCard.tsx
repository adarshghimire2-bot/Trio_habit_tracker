"use client";

import { useState } from "react";
import { Habit } from "../../../lib/types";
import { computeProgress } from "../../../lib/utils";
import { deleteHabit, updateHabitDetails } from "../../../lib/firebase/firestore";
import ProgressBar from "../../../components/ProgressBar";
import TickBoxGrid from "./TickBoxGrid";
import HabitForm from "./HabitForm";

export default function HabitCard({ habit }: { habit: Habit }) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const progress = computeProgress(habit);

  async function handleDelete() {
    await deleteHabit(habit.id);
  }

  return (
    <div className="relative rounded-lg border border-dashed border-ink/25 bg-white/50 p-5">
      {habit.status === "completed" && (
        <span className="absolute right-4 top-4 rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper">
          Completed
        </span>
      )}

      <div className="flex items-start justify-between gap-4 pr-16">
        <div>
          <h3 className="font-display text-base font-semibold text-ink">{habit.title}</h3>
          {habit.description && (
            <p className="mt-0.5 text-sm text-ink-soft">{habit.description}</p>
          )}
          <p className="mt-1 font-mono text-[11px] text-ink-soft">
            {habit.startDate} → {habit.endDate} · {habit.commitmentDays}-day ticket
          </p>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar {...progress} accent="teal" />
      </div>

      <div className="mt-4">
        <TickBoxGrid habit={habit} />
      </div>

      <div className="mt-4 flex gap-4 border-t border-ink/10 pt-3">
        <button
          onClick={() => setEditing(true)}
          className="text-xs font-medium text-ink-soft hover:text-ink"
        >
          Edit
        </button>
        {confirmingDelete ? (
          <span className="flex items-center gap-2 text-xs">
            <span className="text-ink-soft">Delete this ticket?</span>
            <button onClick={handleDelete} className="font-medium text-red-600 hover:underline">
              Yes, delete
            </button>
            <button onClick={() => setConfirmingDelete(false)} className="text-ink-soft hover:text-ink">
              Cancel
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirmingDelete(true)}
            className="text-xs font-medium text-ink-soft hover:text-red-600"
          >
            Delete
          </button>
        )}
      </div>

      {editing && (
        <HabitForm
          initial={habit}
          onCancel={() => setEditing(false)}
          onSubmit={async (values) => {
            await updateHabitDetails(habit, values);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}
