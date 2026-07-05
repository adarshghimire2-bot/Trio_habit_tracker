"use client";

const TRACK_BG: Record<string, string> = {
  teal: "bg-teal/15",
  amber: "bg-amber/15",
  plum: "bg-plum/15",
};

const FILL_BG: Record<string, string> = {
  teal: "bg-teal",
  amber: "bg-amber",
  plum: "bg-plum",
};

interface ProgressBarProps {
  checked: number;
  total: number;
  percent: number;
  accent?: "teal" | "amber" | "plum";
}

export default function ProgressBar({ checked, total, percent, accent = "teal" }: ProgressBarProps) {
  return (
    <div>
      <div className={`h-2 w-full overflow-hidden rounded-full ${TRACK_BG[accent]}`}>
        <div
          className={`h-full rounded-full ${FILL_BG[accent]} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1.5 flex items-baseline justify-between font-mono text-[11px] text-ink-soft">
        <span>
          {checked}/{total} days
        </span>
        <span>{percent}%</span>
      </div>
    </div>
  );
}
