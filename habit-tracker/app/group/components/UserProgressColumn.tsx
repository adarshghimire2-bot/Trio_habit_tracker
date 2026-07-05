import { AppUser, Habit } from "../../../lib/types";
import { computeProgress } from "../../../lib/utils";
import ProgressBar from "../../../components/ProgressBar";

const HEADER_BORDER: Record<string, string> = {
  teal: "border-t-teal",
  amber: "border-t-amber",
  plum: "border-t-plum",
};

const DOT: Record<string, string> = {
  teal: "bg-teal",
  amber: "bg-amber",
  plum: "bg-plum",
};

export default function UserProgressColumn({ user, habits }: { user: AppUser; habits: Habit[] }) {
  const activeHabits = habits.filter((h) => h.ownerId === user.uid);

  return (
    <div className={`flex-1 rounded-lg border border-ink/10 border-t-4 bg-white/50 p-5 ${HEADER_BORDER[user.colorTag]}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${DOT[user.colorTag]}`} />
        <h2 className="font-display text-base font-semibold text-ink">{user.displayName}</h2>
      </div>

      {activeHabits.length === 0 && (
        <p className="font-mono text-xs text-ink-soft">No commitments on record yet.</p>
      )}

      <div className="space-y-5">
        {activeHabits.map((habit) => {
          const progress = computeProgress(habit);
          return (
            <div key={habit.id}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-medium text-ink">{habit.title}</h3>
                {habit.status === "completed" && (
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    done
                  </span>
                )}
              </div>
              {habit.description && (
                <p className="mt-0.5 text-xs text-ink-soft">{habit.description}</p>
              )}
              <div className="mt-2">
                <ProgressBar {...progress} accent={user.colorTag} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
