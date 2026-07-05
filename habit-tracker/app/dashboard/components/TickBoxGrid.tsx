"use client";

import { useState } from "react";
import { Habit } from "../../../lib/types";
import { getDateRange, getTickState } from "../../../lib/utils";
import { checkInToday } from "../../../lib/firebase/firestore";

interface TickBoxGridProps {
  habit: Habit;
}

const STATE_CLASSES: Record<string, string> = {
  checked: "border-ink bg-ink text-paper",
  missed: "border-void bg-transparent text-void line-through decoration-2",
  today: "border-teal bg-teal-soft text-ink cursor-pointer hover:bg-teal hover:text-paper animate-pulse",
  future: "border-dashed border-ink/20 bg-transparent text-ink/25",
};

export default function TickBoxGrid({ habit }: TickBoxGridProps) {
  const dates = getDateRange(habit.startDate, habit.endDate);
  const [stamping, setStamping] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleCheck(date: string, state: string) {
    if (state !== "today" || pending) return;
    setPending(true);
    setStamping(date);
    try {
      await checkInToday(habit);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {dates.map((date, i) => {
        const state = getTickState(date, habit);
        const dayNumber = i + 1;
        return (
          <button
            key={date}
            type="button"
            onClick={() => handleCheck(date, state)}
            disabled={state !== "today"}
            title={`Day ${dayNumber} · ${date}${state === "missed" ? " · missed" : ""}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${
              STATE_CLASSES[state]
            } ${stamping === date ? "animate-stamp" : ""}`}
          >
            {state === "checked" ? "✓" : dayNumber}
          </button>
        );
      })}
    </div>
  );
}
