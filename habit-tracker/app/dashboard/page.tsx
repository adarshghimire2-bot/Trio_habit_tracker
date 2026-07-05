"use client";

import AuthGuard from "../../components/AuthGuard";
import Navbar from "../../components/Navbar";
import HabitList from "./components/HabitList";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <HabitList />
      </main>
    </AuthGuard>
  );
}
