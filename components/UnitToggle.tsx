"use client";

import type { Unit } from "@/lib/units";

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

const units: Unit[] = ["g", "oz", "kg"];

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
      {units.map((option) => {
        const isActive = option === unit;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-w-14 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
              isActive
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-muted hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
