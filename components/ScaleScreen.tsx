"use client";

import dynamic from "next/dynamic";
import {
  PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import DeviceGuard from "@/components/DeviceGuard";
import PressureBar from "@/components/PressureBar";
import StatusBadge from "@/components/StatusBadge";
import TareButton from "@/components/TareButton";
import UnitToggle from "@/components/UnitToggle";
import WeightDisplay from "@/components/WeightDisplay";
import { useForceTouch } from "@/hooks/useForceTouch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStabilizer } from "@/hooks/useStabilizer";
import type { Unit } from "@/lib/units";

const SettingsPanel = dynamic(() => import("@/components/SettingsPanel"), {
  ssr: false,
  loading: () => null
});

const InstructionsModal = dynamic(
  () => import("@/components/InstructionsModal"),
  {
    ssr: false,
    loading: () => null
  }
);

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.75l1.14 2.32a1 1 0 00.75.54l2.56.37-1.85 1.81a1 1 0 00-.29.89l.44 2.56L12 11.1l-2.3 1.21.44-2.56a1 1 0 00-.29-.89L8 6.98l2.56-.37a1 1 0 00.75-.54L12 3.75z"
      />
      <circle cx="12" cy="12" r="2.4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 12H3m18 0h-1.75M12 4.75V3m0 18v-1.75M6.88 6.88L5.64 5.64m12.72 12.72l-1.24-1.24M17.12 6.88l1.24-1.24M6.88 17.12l-1.24 1.24"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 10v6" />
      <circle cx="12" cy="7.2" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ScaleScreen() {
  const [unit, setUnit] = useLocalStorage<Unit>("unit", "g");
  const [maxGrams, setMaxGrams] = useLocalStorage<number>("maxGrams", 385);
  const [, setInstructionsSeen] = useLocalStorage<boolean>(
    "instructions_seen",
    false
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [bypassGuard, setBypassGuard] = useState(false);
  const [tare, setTare] = useState(0);

  const longPressTimerRef = useRef<number | null>(null);
  const longPressTriggeredRef = useRef(false);

  const { rawGrams, isSupported, isSafari, isTouching } = useForceTouch(maxGrams);
  const { stableGrams, status } = useStabilizer(rawGrams, isTouching);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem("instructions_seen");
      const hasSeenInstructions =
        storedValue !== null && JSON.parse(storedValue) === true;

      if (!hasSeenInstructions) {
        setShowInstructions(true);
      }
    } catch {
      setShowInstructions(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const displayGrams = useMemo(
    () => Math.max(0, stableGrams - tare),
    [stableGrams, tare]
  );

  const isOverload = rawGrams >= maxGrams * 0.95;

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTare = useCallback(() => {
    setTare(stableGrams);
  }, [stableGrams]);

  const handleResetTare = useCallback(() => {
    setTare(0);
  }, []);

  const handleDisplayPointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      longPressTriggeredRef.current = false;
      clearLongPressTimer();

      if (typeof window !== "undefined") {
        longPressTimerRef.current = window.setTimeout(() => {
          longPressTriggeredRef.current = true;
          setTare(0);
        }, 500);
      }
    },
    [clearLongPressTimer]
  );

  const handleDisplayPointerUp = useCallback(() => {
    clearLongPressTimer();

    if (!longPressTriggeredRef.current) {
      setTare(stableGrams);
    }
  }, [clearLongPressTimer, stableGrams]);

  const handleDisplayPointerCancel = useCallback(() => {
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  const handleAcknowledgeInstructions = useCallback(() => {
    setInstructionsSeen(true);
    setShowInstructions(false);
  }, [setInstructionsSeen]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.08),_transparent_28%)]" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-surface/90 p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex items-start justify-between">
          <button
            type="button"
            aria-label="Open calibration settings"
            onClick={() => setShowSettings(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <GearIcon />
          </button>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">
              GramTap
            </p>
            <h1 className="mt-2 text-lg font-semibold text-white">
              iPhone Weighing Scale
            </h1>
            <p className="mt-1 text-xs text-muted">
              Safari on iPhone 6S to XS
            </p>
          </div>

          <button
            type="button"
            aria-label="Open instructions"
            onClick={() => setShowInstructions(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <InfoIcon />
          </button>
        </div>

        <button
          type="button"
          onPointerDown={handleDisplayPointerDown}
          onPointerUp={handleDisplayPointerUp}
          onPointerCancel={handleDisplayPointerCancel}
          onPointerLeave={handleDisplayPointerCancel}
          className="mt-8 w-full rounded-[1.75rem] border border-white/10 bg-black/20 px-4 py-8 text-left transition hover:border-white/20"
        >
          <WeightDisplay
            grams={displayGrams}
            unit={unit}
            tare={tare}
            isOverload={isOverload}
          />
        </button>

        <div className="mt-6 flex justify-center">
          <StatusBadge status={status} />
        </div>

        <div className="mt-6">
          <PressureBar force={rawGrams} maxForce={maxGrams} />
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <TareButton
            onTare={handleTare}
            onReset={handleResetTare}
            hasTare={tare > 0}
          />
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs leading-6 text-muted">
          Place a conductive spoon or coin on the display, tare it out, then add your object and wait for a stabilized reading.
        </div>
      </div>

      {!bypassGuard && (!isSupported || !isSafari) ? (
        <DeviceGuard
          isSupported={isSupported}
          isSafari={isSafari}
          onContinueAnyway={() => setBypassGuard(true)}
        />
      ) : null}

      <SettingsPanel
        isOpen={showSettings}
        maxGrams={maxGrams}
        onChange={setMaxGrams}
        onClose={() => setShowSettings(false)}
      />

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onAcknowledge={handleAcknowledgeInstructions}
      />
    </div>
  );
}
