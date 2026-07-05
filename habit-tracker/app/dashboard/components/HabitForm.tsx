"use client";

import { useState, FormEvent } from "react";
import { Habit, HabitFormValues } from "../../../lib/types";
import { MAX_COMMITMENT_DAYS } from "../../../lib/utils";

interface HabitFormProps {
  initial?: Habit;
  onSubmit: (values: HabitFormValues) => Promise<void>;
  onCancel: () => void;
}

export default function HabitForm({ initial, onSubmit, onCancel }: HabitFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [commitmentDays, setCommitmentDays] = useState(initial?.commitmentDays ?? 30);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Give the habit a name.");
      return;
    }
    if (commitmentDays < 1 || commitmentDays > MAX_COMMITMENT_DAYS) {
      setError(`Commitment must be between 1 and ${MAX_COMMITMENT_DAYS} days.`);
      return;
    }

    setSaving(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), commitmentDays });
    } catch (err) {
      setError("Couldn't save — try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-lg border border-ink/10 bg-paper p-6 shadow-xl">
        <h2 className="font-display text-lg font-semibold text-ink">
          {initial ? "Edit habit" : "New commitment"}
        </h2>
        <p className="mt-1 font-mono text-xs text-ink-soft">
          {initial
            ? "Changing the duration recalculates your remaining tick boxes."
            : `Pick a duration up to ${MAX_COMMITMENT_DAYS} days — that's your ticket, punched once a day.`}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Habit name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning run"
              className="w-full rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-teal"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Notes (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does success look like?"
              rows={2}
              className="w-full resize-none rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-teal"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">
              Commitment duration (days)
            </label>
            <input
              type="number"
              min={1}
              max={MAX_COMMITMENT_DAYS}
              value={commitmentDays}
              onChange={(e) => setCommitmentDays(Number(e.target.value))}
              className="w-28 rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-teal"
            />
            <span className="ml-2 font-mono text-xs text-ink-soft">max {MAX_COMMITMENT_DAYS}</span>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-ink px-4 py-1.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : initial ? "Save changes" : "Start commitment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
