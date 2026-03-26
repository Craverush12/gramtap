"use client";

import { AnimatePresence, motion } from "framer-motion";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
}

const steps = [
  "Place iPhone flat on a hard surface, screen facing up",
  "Put a metal spoon or large coin flat on the screen as a conductor",
  "Tap TARE to zero out the spoon weight",
  "Place your object on top of the spoon",
  "Wait for “Stabilized ✓” before reading the weight"
];

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

export default function InstructionsModal({
  isOpen,
  onClose,
  onAcknowledge
}: InstructionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close instructions"
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
                  How To Use GramTap
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Turn your iPhone into a digital scale
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  Turn your iPhone into a digital scale — instantly, in your browser.
                </p>
              </div>
              <button
                type="button"
                aria-label="Dismiss instructions"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-6 text-white/90">{step}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onAcknowledge}
              className="mt-6 w-full rounded-2xl bg-accent px-5 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-lg shadow-accent/20 transition hover:bg-blue-400"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
