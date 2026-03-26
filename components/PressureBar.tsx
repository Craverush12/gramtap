"use client";

interface PressureBarProps {
  force: number;
  maxForce: number;
}

function resolveBarColor(percentage: number): string {
  if (percentage >= 85) {
    return "#ef4444";
  }

  if (percentage >= 60) {
    return "#eab308";
  }

  return "#3b82f6";
}

export default function PressureBar({ force, maxForce }: PressureBarProps) {
  const percentage =
    maxForce > 0 ? Math.min((force / maxForce) * 100, 100) : 0;
  const barColor = resolveBarColor(percentage);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
        <span>Pressure</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            transition: "width 0.1s ease-out, background-color 0.2s ease-out"
          }}
        />
      </div>
    </div>
  );
}
