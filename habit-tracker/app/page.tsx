"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function RootPage() {
  const { firebaseUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(firebaseUser ? "/dashboard" : "/login");
  }, [loading, firebaseUser, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <p className="font-mono text-sm text-ink-soft">loading…</p>
    </div>
  );
}
