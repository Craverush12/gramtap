"use client";

import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { formatWeight, type Unit, unitLabel } from "@/lib/units";

interface WeightDisplayProps {
  grams: number;
  unit: Unit;
  tare: number;
  isOverload: boolean;
}

export default function WeightDisplay({
  grams,
  unit,
  tare,
  isOverload
}: WeightDisplayProps) {
  const spring = useSpring(grams, {
    stiffness: 180,
    damping: 24,
    mass: 0.8
  });
  const [displayValue, setDisplayValue] = useState(grams);

  useEffect(() => {
    spring.set(grams);
  }, [grams, spring]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(latest);
  });

  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
      <motion.div
        layout
        className="w-full"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOverload ? (
          <motion.div
            className="font-[family-name:var(--font-mono)] text-[clamp(4rem,17vw,7rem)] font-bold tracking-tight text-danger animate-pulse"
            initial={{ scale: 0.96, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
          >
            MAX
          </motion.div>
        ) : (
          <div className="font-[family-name:var(--font-mono)] text-[clamp(4rem,17vw,7rem)] font-bold tracking-tight text-white">
            {formatWeight(displayValue, unit)}
          </div>
        )}

        <div className="mt-2 text-sm uppercase tracking-[0.4em] text-muted">
          {isOverload ? "Reduce pressure" : unitLabel(unit)}
        </div>
      </motion.div>

      {tare > 0 ? (
        <div className="mt-5 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          TARE ON
        </div>
      ) : null}
    </div>
  );
}
