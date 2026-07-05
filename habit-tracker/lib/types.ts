export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  colorTag: "teal" | "amber" | "plum";
  createdAt?: number;
}

export type HabitStatus = "active" | "completed";

export interface Habit {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  commitmentDays: number; // 1–90
  startDate: string; // "YYYY-MM-DD" (UTC)
  endDate: string; // "YYYY-MM-DD" (UTC), inclusive
  checkIns: Record<string, boolean>; // key: "YYYY-MM-DD"
  status: HabitStatus;
  createdAt: number;
  updatedAt: number;
}

export interface HabitFormValues {
  title: string;
  description: string;
  commitmentDays: number;
}

export interface HabitProgress {
  checked: number;
  total: number;
  percent: number;
}
