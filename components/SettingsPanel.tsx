"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SettingsPanelProps {
  isOpen: boolean;
  maxGrams: number;
  onChange: (val: number) => void;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function SettingsPanel({
  isOpen,
  maxGrams,
  onChange,
  onClose
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end bg-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close settings"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full rounded-t-[2rem] border-t border-white/10 bg-[#101010] px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 shadow-2xl shadow-black/40"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/15" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-accent">
                  Calibration
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Adjust max measurable weight
                </h2>
              </div>
              <button
                type="button"
                aria-label="Dismiss settings"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-muted">
                <span>Calibration ceiling</span>
                <span className="font-semibold text-white">{maxGrams}g</span>
              </div>
              <input
                type="range"
                min={200}
                max={500}
                step={5}
                value={maxGrams}
                onChange={(event) => onChange(Number(event.target.value))}
                className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
                aria-label="Maximum weight calibration"
              />
              <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.24em] text-muted">
                <span>200g</span>
                <span>500g</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-muted">
              Calibrate using a known weight (e.g., 100g coin). Increase if readings are too low, decrease if too high.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
