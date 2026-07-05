"use client";

import { useEffect, useState } from "react";
import { subscribeToAllHabits, subscribeToUsers } from "../firebase/firestore";
import { AppUser, Habit } from "../types";

export function useGroupHabits() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let usersLoaded = false;
    let habitsLoaded = false;

    const checkLoaded = () => {
      if (usersLoaded && habitsLoaded) setLoading(false);
    };

    const unsubUsers = subscribeToUsers((data) => {
      setUsers(data);
      usersLoaded = true;
      checkLoaded();
    });

    const unsubHabits = subscribeToAllHabits((data) => {
      setHabits(data);
      habitsLoaded = true;
      checkLoaded();
    });

    return () => {
      unsubUsers();
      unsubHabits();
    };
  }, []);

  return { users, habits, loading };
}
