"use client";

import { useEffect, useState } from "react";
import { subscribeToUserHabits, reconcileExpiredHabits } from "../firebase/firestore";
import { Habit } from "../types";

export function useHabits(uid: string | undefined) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setHabits([]);
      setLoading(false);
      return;
    }
    const unsubscribe = subscribeToUserHabits(uid, (data) => {
      setHabits(data);
      setLoading(false);
      reconcileExpiredHabits(data).catch(() => {
        /* best-effort; next load will retry */
      });
    });
    return unsubscribe;
  }, [uid]);

  return { habits, loading };
}
