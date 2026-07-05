import { Habit, HabitProgress } from "./types";

export const MAX_COMMITMENT_DAYS = 90;

/** Today's date as "YYYY-MM-DD", anchored to UTC so all three users share one clock. */
export function todayUTCString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Add `days` to a "YYYY-MM-DD" string, returning a new "YYYY-MM-DD" string, in UTC. */
export function addDaysUTC(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Inclusive list of "YYYY-MM-DD" strings from start to end. */
export function getDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  let cur = start;
  let guard = 0;
  while (cur <= end && guard < 1000) {
    dates.push(cur);
    cur = addDaysUTC(cur, 1);
    guard += 1;
  }
  return dates;
}

export function computeEndDate(startDate: string, commitmentDays: number): string {
  return addDaysUTC(startDate, commitmentDays - 1);
}

/** Only counts check-ins that fall within the habit's own date range, so a shortened
 *  commitment doesn't get credit for dates outside its current window. */
export function computeProgress(habit: Habit): HabitProgress {
  const dates = getDateRange(habit.startDate, habit.endDate);
  const checked = dates.filter((d) => habit.checkIns?.[d]).length;
  const total = habit.commitmentDays;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  return { checked, total, percent };
}

export function isHabitExpired(habit: Habit): boolean {
  return todayUTCString() > habit.endDate;
}

export function canCheckInToday(habit: Habit): boolean {
  const today = todayUTCString();
  if (today < habit.startDate || today > habit.endDate) return false;
  return !habit.checkIns?.[today];
}

/** Day-state used to render each tick box. */
export type TickState = "checked" | "missed" | "today" | "future";

export function getTickState(date: string, habit: Habit): TickState {
  const today = todayUTCString();
  if (habit.checkIns?.[date]) return "checked";
  if (date === today) return "today";
  if (date < today) return "missed";
  return "future";
}
