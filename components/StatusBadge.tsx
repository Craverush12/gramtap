"use client";

import { AnimatePresence, motion } from "framer-motion";

interface StatusBadgeProps {
  status: "idle" | "measuring" | "stabilized";
}

const statusMap = {
  idle: {
    dotClassName: "bg-white/30",
    label: "Place object on screen"
  },
  measuring: {
    dotClassName: "bg-warning animate-pulse",
    label: "Measuring..."
  },
  stabilized: {
    dotClassName: "bg-success",
    label: "Stabilized ✓"
  }
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const current = statusMap[status];

  return (
    <div className="flex min-h-10 items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${current.dotClassName}`}
          />
          <span>{current.label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
