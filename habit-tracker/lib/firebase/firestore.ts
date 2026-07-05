import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { AppUser, Habit, HabitFormValues } from "../types";
import { computeEndDate, isHabitExpired, todayUTCString } from "../utils";

const HABITS = "habits";
const USERS = "users";

// ---------- Users ----------

export function subscribeToUsers(callback: (users: AppUser[]) => void): Unsubscribe {
  return onSnapshot(collection(db, USERS), (snap) => {
    const users = snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Omit<AppUser, "uid">) }));
    callback(users);
  });
}

// ---------- Habits: writes ----------

export async function createHabit(ownerId: string, values: HabitFormValues): Promise<void> {
  const startDate = todayUTCString();
  const endDate = computeEndDate(startDate, values.commitmentDays);
  const now = Date.now();

  await addDoc(collection(db, HABITS), {
    ownerId,
    title: values.title.trim(),
    description: values.description.trim() || null,
    commitmentDays: values.commitmentDays,
    startDate,
    endDate,
    checkIns: {},
    status: "active",
    createdAt: now,
    updatedAt: now,
  });
}

/** Edits title/description/commitmentDays. Changing commitmentDays recomputes endDate
 *  from the ORIGINAL startDate — it does not restart the habit. */
export async function updateHabitDetails(habit: Habit, values: HabitFormValues): Promise<void> {
  const endDate = computeEndDate(habit.startDate, values.commitmentDays);
  await updateDoc(doc(db, HABITS, habit.id), {
    title: values.title.trim(),
    description: values.description.trim() || null,
    commitmentDays: values.commitmentDays,
    endDate,
    status: todayUTCString() > endDate ? "completed" : "active",
    updatedAt: Date.now(),
  });
}

export async function deleteHabit(habitId: string): Promise<void> {
  await deleteDoc(doc(db, HABITS, habitId));
}

/** Marks today's box as checked. Only valid while today falls within the habit's
 *  active window and today hasn't already been checked — enforced here and, for
 *  ownership + shape, again in firestore.rules. */
export async function checkInToday(habit: Habit): Promise<void> {
  const today = todayUTCString();
  const updatedCheckIns = { ...habit.checkIns, [today]: true };
  const status = today >= habit.endDate ? "completed" : "active";
  await updateDoc(doc(db, HABITS, habit.id), {
    checkIns: updatedCheckIns,
    status,
    updatedAt: Date.now(),
  });
}

/** Lazily flips expired-but-still-"active" habits to "completed" on load. */
export async function reconcileExpiredHabits(habits: Habit[]): Promise<void> {
  const stale = habits.filter((h) => h.status === "active" && isHabitExpired(h));
  await Promise.all(
    stale.map((h) => updateDoc(doc(db, HABITS, h.id), { status: "completed", updatedAt: Date.now() }))
  );
}

// ---------- Habits: live queries ----------

export function subscribeToUserHabits(uid: string, callback: (habits: Habit[]) => void): Unsubscribe {
  const q = query(collection(db, HABITS), where("ownerId", "==", uid), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const habits = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Habit, "id">) }));
    callback(habits);
  });
}

export function subscribeToAllHabits(callback: (habits: Habit[]) => void): Unsubscribe {
  const q = query(collection(db, HABITS), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const habits = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Habit, "id">) }));
    callback(habits);
  });
}

export async function getAllHabitsOnce(): Promise<Habit[]> {
  const snap = await getDocs(collection(db, HABITS));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Habit, "id">) }));
}
